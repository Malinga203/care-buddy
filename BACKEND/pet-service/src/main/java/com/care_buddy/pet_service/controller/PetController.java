package com.care_buddy.pet_service.controller;

import com.care_buddy.pet_service.data.Pet;
import com.care_buddy.pet_service.service.PetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class PetController {

    @Autowired
    private PetService petService;

    // Add pet
    @PostMapping("/pets")
    public ResponseEntity<?> addPet(@RequestBody Pet pet) {
        Pet createdPet = petService.addPet(pet);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdPet);
    }

    // Get all pets
    @GetMapping("/pets")
    public ResponseEntity<?> getAllPets() {
        List<Pet> pets = petService.getAllPets();
        if (pets == null || pets.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("No pets found");
        }
        return ResponseEntity.ok(pets);
    }

    // Get pet by ID
    @GetMapping("/pets/{id}")
    public ResponseEntity<?> getPetById(@PathVariable int id) {
        Pet pet = petService.getPetById(id);
        if (pet == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Pet not found with id " + id);
        }
        return ResponseEntity.ok(pet);
    }

    // Update pet
    @PutMapping("/pets")
    public ResponseEntity<?> updatePet(@RequestBody Pet pet) {
        if (pet.getId() == 0) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Pet ID is required for update");
        }

        Pet updatedPet = petService.updatePet(pet);
        if (updatedPet == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Pet not found");
        }

        return ResponseEntity.ok(updatedPet);
    }

    // Delete pet
    @DeleteMapping("/pets/{id}")
    public ResponseEntity<?> deletePet(@PathVariable int id) {
        try {
            petService.deletePet(id);
            return ResponseEntity.ok("Pet deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Pet not found with id " + id);
        }
    }

    // Get pets of an owner
    @GetMapping("/owners/{id}/pets")
    public ResponseEntity<?> getPetsOfOwner(@PathVariable int id) {
        List<Pet> pets = petService.getPetsOfOwner(id);
        return ResponseEntity.ok(pets);
    }

    // Get total pets count
    @GetMapping("/pets/count")
    public ResponseEntity<?> getAllPetsCount() {
        Long count = petService.getAllPetsCount();
        return ResponseEntity.ok(count);
    }

    // Get pets count of an owner
    @GetMapping("/owners/{id}/pets/count")
    public ResponseEntity<?> getPetsCountOfOwner(@PathVariable int id) {
        Long count = petService.getPetsCountOfOwner(id);
        return ResponseEntity.ok(count);
    }

    // Get medical records of a pet
    @GetMapping("/pets/{id}/medical-records")
    public ResponseEntity<?> getMedicalRecords(@PathVariable("id") int petId) {

        List<?> records = petService.getMedicalRecords(petId);

        if (records == null) {
            records = List.of();
        }

        return ResponseEntity.ok(records);
    }

}
