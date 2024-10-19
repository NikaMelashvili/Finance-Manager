package com.melashvili.bank_backend.services;

import com.melashvili.bank_backend.model.dto.request.AnalysisRequest;
import com.melashvili.bank_backend.model.dto.response.AnalysisResponse;
import com.melashvili.bank_backend.model.entities.FinancialData;
import com.melashvili.bank_backend.model.entities.User;
import com.melashvili.bank_backend.model.mapper.FinanceMapper;
import com.melashvili.bank_backend.repositories.UserRepository;
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

    private int numberOfFinancialData;

    private static final Double PERCENT = 7.5;

    @Autowired
    public void setUserRepository(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public AnalysisResponse dataAnalysis(String email) {
        AnalysisResponse analysisResponse = new AnalysisResponse();
        FinancialData financialData = new FinancialData();

        List<AnalysisRequest> requests = buildAnalysisRequests(email);

        Double mds = callModel(requests);

        String message = "Based on your previous " + numberOfFinancialData + " month Financial Data your average monthly discretionary amount is " + mds;

        return null;
    }

    private List<AnalysisRequest> buildAnalysisRequests(String email) {
        List<AnalysisRequest> analysisRequests = new ArrayList<>();

        User user = userRepository.findByEmail(email);
        List<FinancialData> userFinancialData = user.getFinancialData();

        if (userFinancialData != null) {
            if (userFinancialData.size() > 1) {
                for (FinancialData financialData : userFinancialData) {
                    analysisRequests.add(FinanceMapper.mapToRequest(financialData));
                }
            } else {
                FinancialData financialData = userFinancialData.get(0);
                analysisRequests.add(FinanceMapper.mapToRequest(financialData));
            }
        }

        return analysisRequests;
    }

    private Double callModel(List<AnalysisRequest> analysisRequests) {

        List<Double> analysisResponses = new ArrayList<>();
        Double averageValue = 0.0;

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
            for (Double analysisResponse : analysisResponses) {
                averageValue += analysisResponse;
            }
        }

        return averageValue;
    }

    private Double predictions(AnalysisRequest analysisRequest) {
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<AnalysisRequest> request = new HttpEntity<>(analysisRequest, httpHeaders);

        return restTemplate.exchange(
                modelApi,
                HttpMethod.POST,
                request,
                Double.class
        ).getBody();
    }

}
