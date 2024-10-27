package com.backend.luaspets.Food;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.math.BigDecimal;

/* Primer Paso */
/* Poner nombre de la base de datos  y un atributo que no se repita y que no sea el id */
@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name="products_food", uniqueConstraints = {@UniqueConstraint(columnNames = {"name"})})
public class Food{
    @Id
    @GeneratedValue
    Integer id;
    @Column(nullable = false)
    String name;
    String brand;
    String description;
    BigDecimal price;
    Integer stock;
    String category;
    String image_url;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    LocalDate expiration_date;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    LocalDate created_at;
}
