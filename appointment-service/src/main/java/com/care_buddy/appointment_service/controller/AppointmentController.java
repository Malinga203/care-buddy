package com.care_buddy.appointment_service.controller;

import com.care_buddy.appointment_service.data.Appointment;
import com.care_buddy.appointment_service.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
public class AppointmentController {

    @Autowired
    private AppointmentService aptService;

    // Add appointment
    @PostMapping("/appointments")
    public ResponseEntity<?> addAppointment(@RequestBody Appointment apt) {

        Appointment createdApt = aptService.addAppointment(apt);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdApt);
    }

    // Get all appointments
    @GetMapping("/appointments")
    public ResponseEntity<?> getAllAppointments() {
        List<Appointment> appointments = aptService.getAllAppointments();
        return ResponseEntity.ok(appointments);
    }

    // Delete appointment
    @DeleteMapping("/appointments/{id}")
    public ResponseEntity<?> deleteAppointment(@PathVariable int id) {
        try {
            aptService.deleteAppointment(id);
            return ResponseEntity.ok("Appointment deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Appointment not found with id " + id);
        }
    }

    // Update appointment
    @PutMapping("/appointments")
    public ResponseEntity<?> updateAppointment(@RequestBody Appointment apt) {

        Appointment updatedApt = aptService.updateAppointment(apt);
        if (updatedApt == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Appointment not found");
        }

        return ResponseEntity.ok(updatedApt);
    }

    // Get appointments of an owner
    @GetMapping("/owners/{id}/appointments")
    public ResponseEntity<?> getAppointmentsOfOwner(@PathVariable int id) {
        List<Appointment> appointments = aptService.getAppointmentsOfOwner(id);
        return ResponseEntity.ok(appointments);
    }

    // Get total appointments count
    @GetMapping("/appointments/count")
    public ResponseEntity<?> getAppointmentCount() {
        long count = aptService.getAppointmentCount();
        return ResponseEntity.ok(count);
    }

    // Get today's appointments
    @GetMapping("/appointments/today")
    public ResponseEntity<List<Appointment>> getTodayAppointments() {
        List<Appointment> appointments = aptService.getTodayAppointments();
        if (appointments == null) {
            appointments = List.of();
        }
        return ResponseEntity.ok(appointments);
    }

    // Get appointment count of owner
    @GetMapping("/owners/{id}/appointments/count")
    public ResponseEntity<?> getAppointmentsCountOfOwner(@PathVariable int id) {
        Long count = aptService.getAppointmentsCountOfOwner(id);
        return ResponseEntity.ok(count);
    }

    // Get today's appointments of owner
    @GetMapping("/owners/{id}/appointments/today")
    public ResponseEntity<List<Appointment>> getAppointmentsTodayOfOwner(@PathVariable int id) {
        List<Appointment> appointments = aptService.getAppointmentsTodayOfOwner(id);
        if (appointments == null) {
            appointments = List.of();
        }
        return ResponseEntity.ok(appointments);
    }
}
