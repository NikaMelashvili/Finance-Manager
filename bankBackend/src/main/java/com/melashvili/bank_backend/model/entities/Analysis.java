package com.melashvili.bank_backend.model.entities;

import com.melashvili.bank_backend.model.base.AppEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "analysis")
public class Analysis extends AppEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "predicted_discretionary_income")
    private String pdi;

    @Column(name = "message")
    private String message;
}
