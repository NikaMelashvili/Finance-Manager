package com.melashvili.bank_backend.services;

import com.melashvili.bank_backend.model.dto.request.FinanceRequest;
import com.melashvili.bank_backend.repositories.FinancialDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FinanceService {

    private FinancialDataRepository financialDataRepository;

    @Autowired
    public void setFinancialDataRepository(FinancialDataRepository financialDataRepository) {
        this.financialDataRepository = financialDataRepository;
    }

    public void addRecord(FinanceRequest financeRequest) {
        // TODO
    }
}
