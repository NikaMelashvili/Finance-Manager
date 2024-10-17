package com.melashvili.bank_backend.model.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "financial_data")
public class FinancialData {
    @Id
    private Long id;
    private Long personalNumber;
    private String name;
    private Double income;
}
