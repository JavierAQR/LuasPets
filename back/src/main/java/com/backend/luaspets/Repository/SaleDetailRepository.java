package com.backend.luaspets.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.luaspets.Model.SaleDetail;

public interface SaleDetailRepository extends JpaRepository<SaleDetail, Integer>{
    
}
