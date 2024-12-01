package com.backend.luaspets.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.luaspets.Model.Sale;
import com.backend.luaspets.Model.SaleDetail;

public interface SaleDetailRepository extends JpaRepository<SaleDetail, Integer>{
    List<SaleDetail> findBySale(Sale sale);
}
