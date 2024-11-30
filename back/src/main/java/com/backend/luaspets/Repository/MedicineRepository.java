package com.backend.luaspets.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.luaspets.Model.Medicine;

public interface MedicineRepository extends JpaRepository<Medicine,Integer> {
    
}
