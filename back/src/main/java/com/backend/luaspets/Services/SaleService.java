package com.backend.luaspets.Services;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.luaspets.DTO.SaleDetailRequest;
import com.backend.luaspets.DTO.SaleDetailResponse;
import com.backend.luaspets.Model.Product;
import com.backend.luaspets.Model.Sale;
import com.backend.luaspets.Model.SaleDetail;
import com.backend.luaspets.Repository.AccessoriesRepository;
import com.backend.luaspets.Repository.FoodRepository;
import com.backend.luaspets.Repository.MedicineRepository;
import com.backend.luaspets.Repository.SaleDetailRepository;
import com.backend.luaspets.Repository.SaleRepository;
import com.backend.luaspets.User.User;

import jakarta.transaction.Transactional;

@Service
public class SaleService {

    @Autowired
    private SaleRepository saleRepository;

    @Autowired
    private SaleDetailRepository saleDetailRepository;

    @Autowired
    private FoodRepository foodRepository;

    @Autowired
    private MedicineRepository medicineRepository;

    @Autowired
    private AccessoriesRepository accessoriesRepository;

    public List<Sale> getAllSales() {
        return saleRepository.findAll();
    }

    public List<SaleDetailResponse> getSaleDetailsById(Integer saleId) {
        Sale sale = saleRepository.findById(saleId)
            .orElseThrow(() -> new RuntimeException("Venta no encontrada: " + saleId));
        
        // Mapear los detalles de la venta a DTOs
        return sale.getSaleDetail().stream().map(detail -> {
            SaleDetailResponse dto = new SaleDetailResponse();
            dto.setIdDetail(detail.getIdDetail());
            dto.setQuantity(detail.getQuantity());
            dto.setUnitPrice(detail.getUnitPrice());
            dto.setProductId(detail.getProduct().getId());
            dto.setProductName(detail.getProduct().getName()); // Asumiendo que Product tiene un método getName()
            dto.setUserFullName(sale.getUser().getFullName()); // Asumiendo que User tiene un método getFullName()
            return dto;
        }).collect(Collectors.toList());
    }

    @Transactional
    public Sale createSale(User user, List<SaleDetailRequest> saleDetailsDTO) {
        // Crear la venta
        Sale sale = new Sale();
        sale.setUser(user);
        sale.setSaleDate(LocalDateTime.now());
        sale.setSaleStatus("COMPLETADO");
        BigDecimal totalAmount = BigDecimal.ZERO;

        List<SaleDetail> saleDetails = new ArrayList<>();

        for (SaleDetailRequest dto : saleDetailsDTO) {
            Product product = resolveProduct(dto.getProductId()); // Buscar el producto correcto
            if (product == null) {
                throw new IllegalArgumentException("Product with ID " + dto.getProductId() + " not found.");
            }

            // Validar stock
            if (product.getStock() < dto.getQuantity()) {
                throw new IllegalArgumentException(
                        "Not enough stock for product with ID " + dto.getProductId() + ".");
            }

            // Reducir stock
            product.setStock(product.getStock() - dto.getQuantity());

            // Crear detalle de venta
            SaleDetail detail = new SaleDetail();
            detail.setSale(sale);
            detail.setProduct(product);
            detail.setQuantity(dto.getQuantity());
            detail.setUnitPrice(product.getPrice());
            saleDetails.add(detail);

            // Sumar al monto total
            totalAmount = totalAmount.add(product.getPrice().multiply(BigDecimal.valueOf(dto.getQuantity())));
        }

        sale.setTotalAmount(totalAmount);

        // Guardar la venta y los detalles
        saleRepository.save(sale);
        saleDetailRepository.saveAll(saleDetails);

        return sale;
    }

    private Product resolveProduct(Integer productId) {
        Product product = foodRepository.findById(productId).orElse(null);
        if (product == null) {
            product = medicineRepository.findById(productId).orElse(null);
        }
        if (product == null) {
            product = accessoriesRepository.findById(productId).orElse(null);
        }
        return product;
    }
}
