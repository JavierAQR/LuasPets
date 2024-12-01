package com.backend.luaspets.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.luaspets.Model.Sale;

public interface SaleRepository extends JpaRepository<Sale, Integer> {
    
}
