package com.backend.luaspets.Controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.luaspets.Model.Services;
import com.backend.luaspets.Services.ServiceService;

@RestController
@RequestMapping("/services")
@CrossOrigin(origins = { "http://localhost:4200" })
public class ServiceController {
    
    private final ServiceService servicesService;

    @Autowired
    public ServiceController(ServiceService servicesService){
        this.servicesService = servicesService;
    }

    @GetMapping
    public ResponseEntity<List<Services>> getAllServices(){
        List<Services> service = servicesService.getAllServices();
        return ResponseEntity.ok(service);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Services> getServicesById(@PathVariable Integer id){
        Optional<Services> service = servicesService.getServicesById(id);
        return service.map(ResponseEntity::ok)
                            .orElseGet(()-> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @PostMapping
    public ResponseEntity<Services> createService(@RequestBody Services service) {
        try {
            Services newService = servicesService.saveServices(service);
            return ResponseEntity.status(HttpStatus.CREATED).body(newService);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(null); //Servicio ya existe
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }
    

    @PutMapping("/{id}")
    public ResponseEntity<Services> updateService(@PathVariable Integer id, @RequestBody Services serviceDetails) {
        try {
            Services updatedServices = servicesService.updateServices(id, serviceDetails);
            return ResponseEntity.ok(updatedServices);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    // Endpoint para eliminar un producto por su ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteService(@PathVariable Integer id) {
        try {
            servicesService.deleteServices(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }



}
