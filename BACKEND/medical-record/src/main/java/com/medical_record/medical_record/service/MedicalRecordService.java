package com.medical_record.medical_record.service;

import com.medical_record.medical_record.data.MedicalRecord;
import com.medical_record.medical_record.data.MedicalRecordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class MedicalRecordService {
    @Autowired
    private MedicalRecordRepository repository;

    public List<MedicalRecord> getAllRecords() {
        return repository.findAll();
    }

    public Optional<MedicalRecord> getRecordById(Long id) {
        return repository.findById(id);
    }

    public List<MedicalRecord> getRecordsByPetId(Long petId) {
        return repository.findByPetId(petId);
    }

    public List<MedicalRecord> getRecordsByDoctorName(String doctorName) {
        return repository.findByDoctorName(doctorName);
    }

    public List<MedicalRecord> searchByPetName(String petName) {
        return repository.findByPetNameContainingIgnoreCase(petName);
    }

    public MedicalRecord createRecord(MedicalRecord record) {
        return repository.save(record);
    }

    public MedicalRecord updateRecord(Long id, MedicalRecord recordDetails) {
        MedicalRecord record = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Medical Record not found with id: " + id));

        record.setPetId(recordDetails.getPetId());
        record.setPetName(recordDetails.getPetName());
        record.setDoctorName(recordDetails.getDoctorName());
        record.setVisitDate(recordDetails.getVisitDate());
        record.setDiagnosis(recordDetails.getDiagnosis());
        record.setSymptoms(recordDetails.getSymptoms());
        record.setTreatment(recordDetails.getTreatment());
        record.setPrescription(recordDetails.getPrescription());
        record.setNotes(recordDetails.getNotes());
        record.setNextVisitDate(recordDetails.getNextVisitDate());

        return repository.save(record);
    }

    public void deleteRecord(Long id) {
        MedicalRecord record = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Medical Record not found with id: " + id));
        repository.delete(record);
    }


}
