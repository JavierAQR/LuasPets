package com.backend.luaspets.Accesories;
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

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/accessories")
@CrossOrigin(origins = { "http://localhost:4200" })
public class AccessoriesController {

    private final AccessoriesService accessoriesService;

    @Autowired
    public AccessoriesController(AccessoriesService accessoriesService) {
        this.accessoriesService = accessoriesService;
    }

    // Endpoint para obtener todos los productos
    @GetMapping
    public ResponseEntity<List<Accessories>> getAllFood() {
        List<Accessories> accessories = accessoriesService.getAllAccessories();
        return ResponseEntity.ok(accessories);
    }

    // Endpoint para obtener un producto por su ID
    @GetMapping("/{id}")
    public ResponseEntity<Accessories> getAccessoriesById(@PathVariable Integer id) {
        Optional<Accessories> accessories = accessoriesService.getAccessoriesById(id);
        return accessories.map(ResponseEntity::ok)
                   .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    // Endpoint para agregar un nuevo producto
    @PostMapping
    public ResponseEntity<Accessories> createAccessories(@RequestBody Accessories accessories) {
        try {
            Accessories newAccessories = accessoriesService.saveAccessories(accessories);
            return ResponseEntity.status(HttpStatus.CREATED).body(newAccessories);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(null); // Producto ya existe
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    // Endpoint para actualizar un producto existente
    @PutMapping("/{id}")
    public ResponseEntity<Accessories> updateAccessories(@PathVariable Integer id, @RequestBody Accessories accessoriesDetails) {
        try {
            Accessories updatedAccessories = accessoriesService.updateAccessories(id, accessoriesDetails);
            return ResponseEntity.ok(updatedAccessories);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    // Endpoint para eliminar un producto por su ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAccessories(@PathVariable Integer id) {
        try {
            accessoriesService.deleteAccessories(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
