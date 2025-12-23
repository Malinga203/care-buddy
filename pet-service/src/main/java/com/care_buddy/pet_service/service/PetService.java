package com.care_buddy.pet_service.service;

import com.care_buddy.pet_service.data.Pet;
import com.care_buddy.pet_service.data.PetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Optional;

@Service
public class PetService {

    @Autowired
    private PetRepository petrepo;

    @Autowired
    private RestTemplate restTemplate;


    public Pet addPet(Pet pt) {

        return petrepo.save(pt);
    }

    public List<Pet> getAllPets() {
        return petrepo.findAll();
    }

    public void deletePet(int id)
    {
        petrepo.deleteById(id);
    }

    public Pet updatePet(Pet pet)
    {
        return petrepo.save(pet);
    }

    public List<Pet> getPetsOfOwner(int ownerID)
    {
        return petrepo.findByOwnerID(ownerID);
    }

    public Pet getPetById(int id)
    {
        Optional<Pet> byId = petrepo.findById(id);
        if (byId.isPresent()) {
            return byId.get();
        } else {
            return null;
        }
    }

    public long getAllPetsCount()
    {
        return petrepo.count();
    }

    public long getPetsCountOfOwner(int id)
    {
        return petrepo.countById(id);
    }

    public List<?> getMedicalRecords(int id)
    {
        String url = "http://localhost:8085//medical-record-service/pets/" + id + "/medical-records";

        // Make GET request and return response as List
        List<?> medicalRecords = restTemplate.getForObject(url, List.class);
        return medicalRecords;
    }


}
