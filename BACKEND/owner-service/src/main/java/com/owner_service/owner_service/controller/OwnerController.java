package com.owner_service.owner_service.controller;

import com.owner_service.owner_service.data.Owner;
import com.owner_service.owner_service.service.OwnerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class OwnerController {

    @Autowired
    OwnerService ownerService;

    // Login endpoint
    @PostMapping(path = "/owners/login")
    public ResponseEntity<?> loginUser(@RequestBody Owner owner) {
        if (owner.getUsername() == null || owner.getPassword() == null) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("Username or password cannot be empty");
        }

        Owner requestedOwner = ownerService.findOwnerByUsername(owner.getUsername());

        if (requestedOwner == null) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body("User not found");
        }

        if (!owner.getPassword().equals(requestedOwner.getPassword())) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body("Incorrect password");
        }

        requestedOwner.setPassword(null);
        return ResponseEntity.ok(requestedOwner);
    }

    // Create owner
    @PostMapping(path = "/owners")
    public ResponseEntity<?> createUser(@RequestBody Owner owner) {
        Owner existingOwner = ownerService.findOwnerByUsername(owner.getUsername());
        if (existingOwner != null) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body("Username already exists");
        }

        Owner createdOwner = ownerService.createOwner(owner);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(createdOwner);
    }

    // Get pets of owner
    @GetMapping(path = "/owners/{id}/pets")
    public ResponseEntity<?> getPetsOfOwner(@PathVariable int id) {
        List<?> pets = ownerService.getPetsOfOwner(id);
        return ResponseEntity.ok(pets); // Always return 200, empty list allowed
    }

    // Get appointments of owner
    @GetMapping(path = "/owners/{id}/appointments")
    public ResponseEntity<?> getAppointmentsOfOwner(@PathVariable int id) {
        List<?> appointments = ownerService.getAppointmentsOfOwner(id);
        return ResponseEntity.ok(appointments); // Always return 200, empty list allowed
    }

    // Get appointments count
    @GetMapping(path = "/owners/{id}/appointments/count")
    public ResponseEntity<?> getAppointmentsCountOfOwner(@PathVariable int id) {
        Long count = ownerService.getAppointmentsCountOfOwner(id);
        return ResponseEntity.ok(count);
    }

    // Get pets count
    @GetMapping(path = "/owners/{id}/pets/count")
    public ResponseEntity<?> getPetsCountOfOwner(@PathVariable int id) {
        Long count = ownerService.getPetsCountOfOwner(id);
        return ResponseEntity.ok(count);
    }

    // Get today's appointments
    @GetMapping(path = "/owners/{id}/appointments/today")
    public ResponseEntity<?> getAppointmentsTodayOfOwner(@PathVariable int id) {
        List<?> appointments = ownerService.getAppointmentsTodayOfOwner(id);
        if (appointments == null) {
            appointments = List.of();
        }
        return ResponseEntity.ok(appointments);
    }

}
