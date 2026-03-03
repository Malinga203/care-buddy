package com.petcare.medicalrecords.controller;

import com.petcare.medicalrecords.entity.MedicalRecord;
import com.petcare.medicalrecords.service.MedicalRecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/medical-records")
@CrossOrigin(origins = "http://localhost:5173")
public class MedicalRecordController {

    @Autowired
    private MedicalRecordService service;

    @GetMapping
    public ResponseEntity<List<MedicalRecord>> getAllRecords() {
        List<MedicalRecord> records = service.getAllRecords();
        return ResponseEntity.ok(records);
    }

    @GetMapping("/{id}")
    public ResponseEntity<MedicalRecord> getRecordById(@PathVariable Long id) {
        Optional<MedicalRecord> record = service.getRecordById(id);
        return record.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/pet/{petId}")
    public ResponseEntity<List<MedicalRecord>> getRecordsByPetId(@PathVariable Long petId) {
        List<MedicalRecord> records = service.getRecordsByPetId(petId);
        return ResponseEntity.ok(records);
    }

    @GetMapping("/doctor/{doctorName}")
    public ResponseEntity<List<MedicalRecord>> getRecordsByDoctorName(@PathVariable String doctorName) {
        List<MedicalRecord> records = service.getRecordsByDoctorName(doctorName);
        return ResponseEntity.ok(records);
    }

    @GetMapping("/search")
    public ResponseEntity<List<MedicalRecord>> searchByPetName(@RequestParam String petName) {
        List<MedicalRecord> records = service.searchByPetName(petName);
        return ResponseEntity.ok(records);
    }

    @PostMapping
    public ResponseEntity<MedicalRecord> createRecord(@RequestBody MedicalRecord record) {
        MedicalRecord savedRecord = service.createRecord(record);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedRecord);
    }

    @PutMapping("/{id}")
    public ResponseEntity<MedicalRecord> updateRecord(@PathVariable Long id, @RequestBody MedicalRecord recordDetails) {
        try {
            MedicalRecord updatedRecord = service.updateRecord(id, recordDetails);
            return ResponseEntity.ok(updatedRecord);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRecord(@PathVariable Long id) {
        try {
            service.deleteRecord(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}