package com.backend.luaspets.Controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.luaspets.DTO.SaleRequest;
import com.backend.luaspets.DTO.SaleDetailResponse;
import com.backend.luaspets.DTO.SaleResponse;
import com.backend.luaspets.Model.Sale;
import com.backend.luaspets.Services.SaleService;
import com.backend.luaspets.User.User;
import com.backend.luaspets.User.UserRepository;

@RestController
@RequestMapping("/sales")
@CrossOrigin(origins = { "http://localhost:4200" })
public class SaleController {
    

    @Autowired
    private SaleService saleService;

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public ResponseEntity<List<SaleResponse>> getAllSales() {
        List<Sale> sales = saleService.getAllSales();
        List<SaleResponse> responseList = sales.stream().map(sale -> {
            SaleResponse response = new SaleResponse();
            response.setIdSale(sale.getIdSale());
            response.setUserId(sale.getUser().getId()); // Asumiendo que tienes un método getUser()
            response.setSaleDate(sale.getSaleDate());
            response.setTotalAmount(sale.getTotalAmount());
            response.setSaleStatus(sale.getSaleStatus());
            return response;
        }).collect(Collectors.toList());

        return ResponseEntity.ok(responseList);
    }

    @GetMapping("/{saleId}")
    public ResponseEntity<List<SaleDetailResponse>> getSaleDetails(@PathVariable Integer saleId) {
        List<SaleDetailResponse> saleDetail = saleService.getSaleDetailsById(saleId);
        return ResponseEntity.ok(saleDetail);
    }

    @PostMapping("/create")
    public ResponseEntity<SaleResponse> createSale(@RequestBody SaleRequest saleDTO) {
    User user = userRepository.findById(saleDTO.getUserId())
        .orElseThrow(() -> new IllegalArgumentException("User not found"));
    
    Sale sale = saleService.createSale(user, saleDTO.getSaleDetails());

    // Mapear entidad a DTO
    SaleResponse response = new SaleResponse();
    response.setIdSale(sale.getIdSale());
    response.setUserId(user.getId()); // Si necesitas devolver este dato
    response.setSaleDate(sale.getSaleDate());
    response.setTotalAmount(sale.getTotalAmount());
    response.setSaleStatus(sale.getSaleStatus());

    return ResponseEntity.status(HttpStatus.CREATED).body(response);
}

}
