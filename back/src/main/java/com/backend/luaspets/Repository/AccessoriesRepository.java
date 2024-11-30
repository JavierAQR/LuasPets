package com.backend.luaspets.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.luaspets.Model.Accessories;


public interface AccessoriesRepository extends JpaRepository<Accessories,Integer> {
    
}
