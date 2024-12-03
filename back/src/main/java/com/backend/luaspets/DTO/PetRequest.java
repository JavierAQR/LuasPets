package com.backend.luaspets.DTO;

import lombok.Data;

@Data
public class PetRequest {

    Integer userId;
    String name;
    String species;
    String breed;
    String size;
    Double weight;
    Integer age;
    String gender;
}
