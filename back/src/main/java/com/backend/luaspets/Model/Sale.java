package com.backend.luaspets.Model;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.backend.luaspets.User.User;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "sale")
@Data // Lombok generará getters, setters, toString, etc.
public class Sale {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idSale;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;  // Relación con la entidad User

    @Column(name = "sale_date", nullable = false, updatable = false)
    private LocalDateTime saleDate = LocalDateTime.now();

    @Column(name = "total_amount", nullable = false)
    private BigDecimal totalAmount;

    @Column(name = "sale_status", nullable = false)
    private String saleStatus = "PENDIENTE"; // Ejemplo de estado inicial

}
