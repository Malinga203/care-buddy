package com.doctor_service.doctor_service.controller;

import com.doctor_service.doctor_service.data.Doctor;
import com.doctor_service.doctor_service.service.DoctorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class DoctorController {

    @Autowired
    private DoctorService doctorService;

    // Add doctor
    @PostMapping(path = "/doctors")
    public ResponseEntity<?> addDoctor(@RequestBody Doctor doctor) {
        Doctor createdDoctor = doctorService.addDoctor(doctor);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdDoctor);
    }

    // Get all doctors
    @GetMapping(path = "/doctors")
    public ResponseEntity<?> getAllDoctors() {
        List<Doctor> doctors = doctorService.getAllDoctors();
        return ResponseEntity.ok(doctors);
    }

    // Update doctor
    @PutMapping(path = "/doctors")
    public ResponseEntity<?> updateDoctor(@RequestBody Doctor doctor) {
        Doctor updatedDoctor = doctorService.updateDoctor(doctor);
        if (updatedDoctor == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Doctor not found");
        }

        return ResponseEntity.ok(updatedDoctor);
    }

    // Delete doctor
    @DeleteMapping(path = "/doctors/{id}")
    public ResponseEntity<?> deleteDoctor(@PathVariable int id) {
        try {
            doctorService.deleteDoctor(id);
            return ResponseEntity.ok("Doctor deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Doctor not found with id " + id);
        }
    }

    // Get doctor count
    @GetMapping(path = "/doctors/count")
    public ResponseEntity<?> getDoctorsCount() {
        long count = doctorService.getDoctorCount();
        return ResponseEntity.ok(count);
    }
}
