package com.melashvili.bank_backend.repositories;

import com.melashvili.bank_backend.model.entities.FinancialData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FinancialDataRepository extends JpaRepository<FinancialData, Long> {
}
