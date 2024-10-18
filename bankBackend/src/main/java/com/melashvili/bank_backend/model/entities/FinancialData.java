package com.melashvili.bank_backend.model.entities;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "user_data")
public class FinancialData {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty("id")
    private Long id;

    @Column(name = "income")
    @JsonProperty("income")
    private Double income;

    @Column(name = "savings")
    @JsonProperty("savings")
    private Double savings;

    @Column(name = "credit_usage")
    @JsonProperty("credit_usage")
    private Double creditUsage;

    @Column(name = "load_balance")
    @JsonProperty("load_balance")
    private Double loadBalance;

    @Column(name = "monthly_spending")
    @JsonProperty("monthly_spending")
    private Double monthlySpending;

    @Column(name = "investment_portfolio")
    @JsonProperty("investment_portfolio")
    private Double investmentPortfolio;

    @Column(name = "risk_appetite")
    @JsonProperty("risk_appetite")
    private String riskAppetite;

    @Column(name = "age")
    @JsonProperty("age")
    private Integer age;

    @Column(name = "employment_status")
    @JsonProperty("employment_status")
    private String employmentStatus;

    @Column(name = "education_level")
    @JsonProperty("education_level")
    private String educationLevel;

    @Column(name = "credit_score")
    @JsonProperty("credit_score")
    private Integer creditScore;

    @Column(name = "debt_to_income_ratio")
    @JsonProperty("debt_to_income_ratio")
    private Double debtToIncomeRatio;

    @Column(name = "monthly_essentials")
    @JsonProperty("monthly_essentials")
    private Double monthlyEssentials;

    @Column(name = "monthly_discretionary")
    @JsonProperty("monthly_discretionary")
    private Double monthlyDiscretionary;

    @Column(name = "long_term_goal")
    @JsonProperty("long_term_goal")
    private String longTermGoal;
}
