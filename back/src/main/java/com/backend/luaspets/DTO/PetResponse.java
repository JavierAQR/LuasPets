package com.backend.luaspets.DTO;

import lombok.Data;

@Data
public class PetResponse {
    
    Integer id;
    String userName;
    String name;
    String species;
    String breed;
    String size;
    Double weight;
    Integer age;
    String gender;

}
