package com.medical_record.medical_record.data;

import java.time.LocalDate;
import java.time.LocalDateTime;
import jakarta.persistence .*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "medicalRecords")
public class MedicalRecord {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        @Column(name = "pet_id", nullable = false)
        private Integer petId;

        @Column(name = "pet_name", length = 100)
        private String petName;

        @Column(name = "doctor_name", nullable = false, length = 100)
        private String doctorName;

        @Column(name = "visit_date", nullable = false)
        private LocalDate visitDate;

        @Column(name = "diagnosis", nullable = false, columnDefinition = "TEXT")
        private String diagnosis;

        @Column(name = "symptoms", columnDefinition = "TEXT")
        private String symptoms;

        @Column(name = "treatment", nullable = false, columnDefinition = "TEXT")
        private String treatment;

        @Column(name = "prescription", columnDefinition = "TEXT")
        private String prescription;

        @Column(name = "notes", columnDefinition = "TEXT")
        private String notes;

        @Column(name = "next_visit_date")
        private LocalDate nextVisitDate;

        @Column(name = "created_at", updatable = false)
        private LocalDateTime createdAt;

        @Column(name = "updated_at")
        private LocalDateTime updatedAt;

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDate getNextVisitDate() {
        return nextVisitDate;
    }

    public void setNextVisitDate(LocalDate nextVisitDate) {
        this.nextVisitDate = nextVisitDate;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public String getPrescription() {
        return prescription;
    }

    public void setPrescription(String prescription) {
        this.prescription = prescription;
    }

    public String getTreatment() {
        return treatment;
    }

    public void setTreatment(String treatment) {
        this.treatment = treatment;
    }

    public String getSymptoms() {
        return symptoms;
    }

    public void setSymptoms(String symptoms) {
        this.symptoms = symptoms;
    }

    public String getDiagnosis() {
        return diagnosis;
    }

    public void setDiagnosis(String diagnosis) {
        this.diagnosis = diagnosis;
    }

    public LocalDate getVisitDate() {
        return visitDate;
    }

    public void setVisitDate(LocalDate visitDate) {
        this.visitDate = visitDate;
    }

    public String getDoctorName() {
        return doctorName;
    }

    public void setDoctorName(String doctorName) {
        this.doctorName = doctorName;
    }

    public String getPetName() {
        return petName;
    }

    public void setPetName(String petName) {
        this.petName = petName;
    }

    public Integer getPetId() {
        return petId;
    }

    public void setPetId(Integer petId) {
        this.petId = petId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @PrePersist
        protected void onCreate() {
            createdAt = LocalDateTime.now();
            updatedAt = LocalDateTime.now();
        }

        @PreUpdate
        protected void onUpdate() {
            updatedAt = LocalDateTime.now();
        }


    }
