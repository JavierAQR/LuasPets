package com.backend.luaspets.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.luaspets.Model.Services;

public interface ServiceRepository extends JpaRepository<Services, Integer> {

}
