package com.backend.luaspets.Controller;

import java.util.List;

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

import com.backend.luaspets.DTO.PetRequest;
import com.backend.luaspets.DTO.PetResponse;
import com.backend.luaspets.Model.Pet;
import com.backend.luaspets.Services.PetService;

@RestController
@RequestMapping("/pets")
@CrossOrigin(origins = { "http://localhost:4200" })
public class PetController {
    
    @Autowired
    private PetService petService;

    @GetMapping
    public ResponseEntity<List<PetResponse>> getAllPets() {
        List<Pet> pets = petService.getAllPets();
        List<PetResponse> responses = pets.stream().map(pet -> {
            PetResponse response = new PetResponse();
            
            response.setId(pet.getId());
            response.setUserId(pet.getOwner().getId());
            response.setUserName(pet.getOwner().getFullName());
            response.setName(pet.getName());
            response.setSpecies(pet.getSpecies());
            response.setBreed(pet.getBreed());
            response.setSize(pet.getSize());
            response.setWeight(pet.getWeight());
            response.setAge(pet.getAge());
            response.setGender(pet.getGender());
            return response;
        }).toList();

        return ResponseEntity.ok(responses);
    }

    // Obtener una mascota por ID
    @GetMapping("/{id}")
    public ResponseEntity<PetResponse> getPetById(@PathVariable Integer id) {
        PetResponse response = petService.getPetById(id);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/create")
    public ResponseEntity<PetResponse> createPet(@RequestBody PetRequest request){

        PetResponse response = new PetResponse();
        Pet pet = petService.createPet(request);
        
        response.setId(pet.getId());
        response.setUserId(request.getUserId());
        response.setUserName(pet.getOwner().getFullName());
        response.setName(request.getName());
        response.setSpecies(request.getSpecies());
        response.setBreed(request.getBreed());
        response.setSize(request.getSize());
        response.setWeight(request.getWeight());
        response.setAge(request.getAge());
        response.setGender(request.getGender());

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    // Obtener todas las mascotas de un usuario
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<PetResponse>> getPetsByUserId(@PathVariable Integer userId) {
        List<Pet> pets = petService.getPetsByUserId(userId);
        List<PetResponse> responses = pets.stream().map(pet -> {
            PetResponse response = new PetResponse();
            response.setId(pet.getId());
            response.setUserName(pet.getOwner().getFullName());
            response.setName(pet.getName());
            response.setSpecies(pet.getSpecies());
            response.setBreed(pet.getBreed());
            response.setSize(pet.getSize());
            response.setWeight(pet.getWeight());
            response.setAge(pet.getAge());
            response.setGender(pet.getGender());
            return response;
        }).toList();

        return ResponseEntity.ok(responses);
    }

    // Actualizar los campos de una mascota por su ID
    @PutMapping("/{petId}")
    public ResponseEntity<PetResponse> updatePet(@PathVariable Integer petId, @RequestBody PetRequest request) {
        Pet updatedPet = petService.updatePet(petId, request);

        PetResponse response = new PetResponse();
        response.setId(updatedPet.getId());
        response.setUserId(updatedPet.getOwner().getId());
        response.setUserName(updatedPet.getOwner().getFullName());
        response.setName(updatedPet.getName());
        response.setSpecies(updatedPet.getSpecies());
        response.setBreed(updatedPet.getBreed());
        response.setSize(updatedPet.getSize());
        response.setWeight(updatedPet.getWeight());
        response.setAge(updatedPet.getAge());
        response.setGender(updatedPet.getGender());

        return ResponseEntity.ok(response);
    }

    // Eliminar una mascota por su ID
    @DeleteMapping("/{petId}")
    public ResponseEntity<Void> deletePetById(@PathVariable Integer petId) {
        petService.deletePetById(petId);
        return ResponseEntity.noContent().build();
    }

}
