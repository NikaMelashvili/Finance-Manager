package com.melashvili.bank_backend.services;

import com.melashvili.bank_backend.model.dto.response.FinanceDataResponse;
import com.melashvili.bank_backend.model.entities.FinancialData;
import com.melashvili.bank_backend.model.entities.User;
import com.melashvili.bank_backend.model.mapper.FinanceMapper;
import com.melashvili.bank_backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class FinanceService {

    private UserRepository userRepository;

    @Autowired
    public void setUserRepository(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<FinanceDataResponse> getFinanceData(String email) {
        User user = userRepository.findByEmail(email);

        List<FinanceDataResponse> financeDataResponses = new ArrayList<>();

        if (!user.getFinancialDataList().isEmpty()) {
            for (FinancialData financialData : user.getFinancialDataList()) {
                FinanceDataResponse financeDataResponse = FinanceMapper.mapToResponse(financialData);
                financeDataResponses.add(financeDataResponse);
            }
            return financeDataResponses;
        }
        return null;
    }
}
