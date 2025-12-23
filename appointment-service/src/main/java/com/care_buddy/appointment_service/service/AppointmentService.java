package com.care_buddy.appointment_service.service;

import com.care_buddy.appointment_service.data.Appointment;
import com.care_buddy.appointment_service.data.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository aptRepo;

    public Appointment addAppointment(Appointment apt)
    {
        return aptRepo.save(apt);
    }

    public List<Appointment> getAllAppointments()
    {
        return aptRepo.findAll();
    }

    public void deleteAppointment(int id)
    {
        aptRepo.deleteById(id);
    }

    public Appointment updateAppointment(Appointment apt)
    {
        return aptRepo.save(apt);
    }

    public List<Appointment> getAppointmentsOfOwner(int id)
    {
        return aptRepo.findByOwnerId(id);
    }

    public long getAppointmentCount()
    {
        return aptRepo.getAppointmentsCount();
    }

    public List<Appointment> getTodayAppointments()
    {
        return aptRepo.getTodayAppointments();
    }

    public Long getAppointmentsCountOfOwner(int id)
    {
        return aptRepo.getAppointmentsCountOfOwner(id);
    }

    public List<Appointment> getAppointmentsTodayOfOwner(int id)
    {
        return aptRepo.getAppointmentsTodayOfOwner(id);
    }
}
