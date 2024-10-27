package com.backend.luaspets.Food;

import org.springframework.data.jpa.repository.JpaRepository;

/* El Jpa Crea los metodos para hacer el CRUD */
public interface FoodRepository extends JpaRepository<Food,Integer> {

    
}
