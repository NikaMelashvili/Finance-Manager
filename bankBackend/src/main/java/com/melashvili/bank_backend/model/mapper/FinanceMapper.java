package com.melashvili.bank_backend.model.mapper;

import com.melashvili.bank_backend.model.dto.request.AnalysisRequest;
import com.melashvili.bank_backend.model.entities.FinancialData;
import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Component;

@Getter
@Setter
@Component
public class FinanceMapper {

    public static AnalysisRequest mapToRequest(FinancialData financialData) {
        AnalysisRequest analysisRequest = new AnalysisRequest();

        analysisRequest.setIncome(financialData.getIncome());
        analysisRequest.setSavings(financialData.getSavings());
        analysisRequest.setCreditUsage(financialData.getCreditUsage());
        analysisRequest.setLoadBalance(financialData.getLoadBalance());
        analysisRequest.setMonthlySpending(financialData.getMonthlySpending());
        analysisRequest.setInvestmentPortfolio(financialData.getInvestmentPortfolio());
        analysisRequest.setAge(financialData.getAge());
        analysisRequest.setEmploymentStatus(financialData.getEmploymentStatus());
        analysisRequest.setEducationLevel(financialData.getEducationLevel());
        analysisRequest.setCreditScore(financialData.getCreditScore());
        analysisRequest.setDebtToIncomeRatio(financialData.getDebtToIncomeRatio());
        analysisRequest.setMonthlyEssentials(financialData.getMonthlyEssentials());
        analysisRequest.setRiskAppetite(financialData.getRiskAppetite());
        analysisRequest.setLongTermGoal(financialData.getLongTermGoal());

        return analysisRequest;
    }
}