package com.backend.luaspets.Model;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.Builder;

@Entity
@DiscriminatorValue("accessory") // Valor que se usará para diferenciar el tipo de producto en la tabla
@Builder  
public class Accessories extends Product{

}

