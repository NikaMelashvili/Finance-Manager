package com.melashvili.bank_backend.repositories;

import com.melashvili.bank_backend.model.entities.Analysis;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AnalysisRepository extends JpaRepository<Analysis, Long> {
}
