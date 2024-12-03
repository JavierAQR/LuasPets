package com.backend.luaspets.DTO;

import java.util.List;

import lombok.Data;

@Data
public class SaleRequest {
    
    private Integer userId;
    private List<SaleDetailRequest> saleDetails;

}
