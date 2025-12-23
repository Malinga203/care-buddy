package com.owner_service.owner_service.service;

import com.owner_service.owner_service.data.Owner;
import com.owner_service.owner_service.data.OwnerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
public class OwnerService {
    @Autowired
    OwnerRepository ownerRepo;

    @Autowired
    RestTemplate restTemplate;
    public Owner createOwner( Owner owner )
    {
        return ownerRepo.save(owner);
    }

    public Owner findOwnerByUsername(String username) {
        return ownerRepo.findOwnerByUsername(username);
    }

    public List<?> getPetsOfOwner(int ownerId) {
        String url = "http://localhost:8084/pet-service/owners/" + ownerId + "/pets";


        // Make GET request and return response as List
        List<?> pets = restTemplate.getForObject(url, List.class);
        return pets;
    }

    public List<?> getAppointmentsOfOwner(int ownerId) {
        String url = "http://localhost:8082/appointment-service/owners/" + ownerId + "/appointments";


        // Make GET request and return response as List
        List<?> appointments = restTemplate.getForObject(url, List.class);
        return appointments;
    }

    public Long getAppointmentsCountOfOwner(int ownerId) {
        String url = "http://localhost:8082/appointment-service/owners/" + ownerId + "/appointments/count";


        // Make GET request and return response as List
        Long appointments = restTemplate.getForObject(url, Long.class);
        return appointments;
    }

    public Long getPetsCountOfOwner(int ownerId) {
        String url = "http://localhost:8084/pet-service/owners/" + ownerId + "/pets/count";

        // Make GET request and return response as List
        Long pets = restTemplate.getForObject(url, Long.class);
        return pets;
    }

    public List<?> getAppointmentsTodayOfOwner(int ownerId) {
        String url = "http://localhost:8082/appointment-service/owners/" + ownerId + "/appointments/today";


        // Make GET request and return response as List
        List<?> appointments = restTemplate.getForObject(url, List.class);
        return appointments;
    }

}
