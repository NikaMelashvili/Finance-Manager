package com.melashvili.bank_backend.services;

import com.melashvili.bank_backend.model.dto.request.AnalysisRequest;
import com.melashvili.bank_backend.model.dto.response.AnalysisResponse;
import com.melashvili.bank_backend.model.dto.response.ModelResponse;
import com.melashvili.bank_backend.model.entities.Analysis;
import com.melashvili.bank_backend.model.entities.FinancialData;
import com.melashvili.bank_backend.model.entities.User;
import com.melashvili.bank_backend.model.mapper.FinanceMapper;
import com.melashvili.bank_backend.repositories.AnalysisRepository;
import com.melashvili.bank_backend.repositories.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

@Service
public class AnalysisService {

    @Value("${model.api}")
    private String modelApi;

    private UserRepository userRepository;

    private AnalysisRepository analysisRepository;

    private int numberOfFinancialData;

    private static final Double PERCENT = 8.0;

    @Autowired
    public void setUserRepository(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Autowired
    public void setAnalysisRepository(AnalysisRepository analysisRepository) {
        this.analysisRepository = analysisRepository;
    }

    public AnalysisResponse dataAnalysis(String email) {
        AnalysisResponse analysisResponse = new AnalysisResponse();

        List<AnalysisRequest> requests = buildAnalysisRequests(email);

        Double mds = callModel(requests);

        String message = "Based on your previous " + numberOfFinancialData + " month Financial Data your average monthly discretionary amount is " + mds + " GEL";
        analysisResponse.setPdi(mds.toString());
        analysisResponse.setMessage(message);

        saveAnalysis(analysisResponse, email);

        return analysisResponse;
    }

    @Transactional(rollbackOn = Throwable.class)
    protected void saveAnalysis(AnalysisResponse analysisResponse, String email) {
        Analysis analysis = new Analysis();
        analysis.setPdi(analysisResponse.getPdi());
        analysis.setMessage(analysisResponse.getMessage());

        analysisRepository.save(analysis);

        User user = userRepository.findByEmail(email);
        user.setAnalysis(analysis);

        userRepository.save(user);
    }

    private List<AnalysisRequest> buildAnalysisRequests(String email) {
        User user = userRepository.findByEmail(email);
        List<FinancialData> userFinancialData = user.getFinancialDataList();

        if (userFinancialData.isEmpty()) {
            throw new RuntimeException("No financial data found for user");
        }

        return userFinancialData.stream()
                .map(FinanceMapper::mapToRequest)
                .toList();
    }

    private Double callModel(List<AnalysisRequest> analysisRequests) {

        List<Double> analysisResponses = new ArrayList<>();
        double averageValue;

        if (analysisRequests.size() > 1) {
            for (AnalysisRequest analysisRequest : analysisRequests) {
                Double prediction = predictions(analysisRequest);
                analysisResponses.add(prediction);
                this.numberOfFinancialData++;
            }
        } else if (analysisRequests.size() == 1) {
            Double prediction = predictions(analysisRequests.get(0));
            analysisResponses.add(prediction);
            this.numberOfFinancialData = 1;
        } else {
            throw new RuntimeException("No requests found in the list");
        }

        int size = analysisResponses.size();
        if (size == 1) {
            return analysisResponses.get(0);
        } else {
            Double tempValue = 0.0;

            for (Double analysisResponse : analysisResponses) {
                tempValue += analysisResponse;
            }
            averageValue = tempValue / size;
        }

        return averageValue;
    }

    private Double predictions(AnalysisRequest analysisRequest) {
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<AnalysisRequest> request = new HttpEntity<>(analysisRequest, httpHeaders);

        ModelResponse response = restTemplate.exchange(
                modelApi,
                HttpMethod.POST,
                request,
                ModelResponse.class
        ).getBody();

        return response != null ? response.getPredicted_discretionary_income() : 0.0;
    }

}
