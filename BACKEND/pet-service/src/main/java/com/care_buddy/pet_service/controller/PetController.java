package com.care_buddy.pet_service.controller;


import com.care_buddy.pet_service.data.Pet;
import com.care_buddy.pet_service.service.PetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class PetController {

    @Autowired
    private PetService petService;


    //add
    @PostMapping(path ="/pets")
    public Pet addPet(@RequestBody Pet pet) { return petService.addPet(pet);}


    // get all
    @GetMapping(path ="/pets")
    public List<Pet> getAllPets() {
        return petService.getAllPets();
    }



}

