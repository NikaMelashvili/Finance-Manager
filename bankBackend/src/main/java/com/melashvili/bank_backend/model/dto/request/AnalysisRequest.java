package com.melashvili.bank_backend.model.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AnalysisRequest {

    @JsonProperty("income")
    private Double income;

    @JsonProperty("savings")
    private Double savings;

    @JsonProperty("credit_usage")
    private Double creditUsage;

    @JsonProperty("load_balance")
    private Double loadBalance;

    @JsonProperty("monthly_spending")
    private Double monthlySpending;

    @JsonProperty("investment_portfolio")
    private Double investmentPortfolio;

    @JsonProperty("risk_appetite")
    private String riskAppetite;

    @JsonProperty("age")
    private Integer age;

    @JsonProperty("employment_status")
    private String employmentStatus;

    @JsonProperty("education_level")
    private String educationLevel;

    @JsonProperty("credit_score")
    private Integer creditScore;

    @JsonProperty("debt_to_income_ratio")
    private Double debtToIncomeRatio;

    @JsonProperty("monthly_essentials")
    private Double monthlyEssentials;

    @JsonProperty("monthly_discretionary")
    private Double monthlyDiscretionary;

    @JsonProperty("long_term_goal")
    private String longTermGoal;

}
