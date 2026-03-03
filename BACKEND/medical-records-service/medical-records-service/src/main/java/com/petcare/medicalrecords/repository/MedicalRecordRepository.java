package com.petcare.medicalrecords.repository;

import com.petcare.medicalrecords.entity.MedicalRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface MedicalRecordRepository extends JpaRepository<MedicalRecord, Long> {

    List<MedicalRecord> findByPetId(Long petId);

    List<MedicalRecord> findByDoctorName(String doctorName);

    List<MedicalRecord> findByPetNameContainingIgnoreCase(String petName);
}