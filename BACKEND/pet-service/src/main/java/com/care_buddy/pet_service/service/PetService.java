package com.care_buddy.pet_service.service;

import com.care_buddy.pet_service.data.Pet;
import com.care_buddy.pet_service.data.PetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PetService {

    @Autowired
    private PetRepository petrepo;


    public Pet addPet(Pet pt) {

        return petrepo.save(pt);
    }

    public List<Pet> getAllPets() {
        return petrepo.findAll();
    }



}
