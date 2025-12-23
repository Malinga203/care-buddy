package com.medical_record.medical_record.data;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MedicalRecordRepository extends JpaRepository<MedicalRecord,Long> {
    List<MedicalRecord> findByPetId(Long petId);

    List<MedicalRecord> findByDoctorName(String doctorName);

    List<MedicalRecord> findByPetNameContainingIgnoreCase(String petName);


}
