package com.doctor_service.doctor_service.service;

import com.doctor_service.doctor_service.data.Doctor;
import com.doctor_service.doctor_service.data.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
public class DoctorService {

    @Autowired
    private DoctorRepository doctorRepository;

    // create
    public Doctor addDoctor(Doctor doctor) {
        return doctorRepository.save(doctor);
    }

    // read all
    public List<Doctor> getAllDoctors() {
        return doctorRepository.findAll();
    }

    // update
    public Doctor updateDoctor( Doctor doctor) {
        return doctorRepository.save(doctor);
    }

    // delete
    public void deleteDoctor(int id) {
        doctorRepository.deleteById(id);

    }

    public long getDoctorCount()
    {
        return doctorRepository.count();
    }

}
