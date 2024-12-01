package com.backend.luaspets.DTO;

import java.util.List;

import lombok.Data;

@Data
public class SaleDTO {
    
    private Integer userId;
    private List<SaleDetailDTO> saleDetails;

}
