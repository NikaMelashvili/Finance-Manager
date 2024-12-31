package com.melashvili.bank_backend.model.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FinancialDataRequest {
    private Double income;

    private Double savings;

    private Double creditUsage;

    private Double loadBalance;

    private Double monthlySpending;

    private Double investmentPortfolio;

    private String riskAppetite;

    private Integer age;

    private String employmentStatus;

    private String educationLevel;

    private Integer creditScore;

    private Double debtToIncomeRatio;

    private Double monthlyEssentials;

    private Double monthlyDiscretionary;

    private String longTermGoal;

}
