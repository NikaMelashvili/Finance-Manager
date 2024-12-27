package com.melashvili.bank_backend.model.dto.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FinanceDataResponse {

    private Double income;

    private Double savings;

    private Double creditUsage;

    private Double loadBalance;

    private Double monthlySpending;

    private Double investmentPortfolio;

    private Integer creditScore;

    private Double debtToIncomeRatio;

    private Double monthlyEssentials;

    private Double monthlyDiscretionary;
}
