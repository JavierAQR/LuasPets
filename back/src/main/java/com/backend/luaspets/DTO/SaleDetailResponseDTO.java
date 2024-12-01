package com.backend.luaspets.DTO;

import java.math.BigDecimal;

import lombok.Data;

@Data
public class SaleDetailResponseDTO {
    private Integer idDetail;
    private Integer quantity;
    private BigDecimal unitPrice;
    private String productName;
    private String userFullName;
}
