package com.care_buddy.appointment_service.data;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AppointmentRepository extends JpaRepository<Appointment,Integer> {
    public List<Appointment> findByOwnerId(int ownerId);

    @Query("Select COUNT(a) from Appointment a where a.date = CURRENT_DATE and a.time >= CURRENT_TIME ")
    public Integer getAppointmentsCount();

    @Query("Select a from Appointment a where a.date = CURRENT_DATE and a.time >= CURRENT_TIME ")
    public List<Appointment> getTodayAppointments();

    @Query("Select COUNT(a) from Appointment a where a.date = CURRENT_DATE and a.time >= CURRENT_TIME  and ownerId = ?1")
    public Long getAppointmentsCountOfOwner(int ownerId);

    @Query("Select a from Appointment a where a.date = CURRENT_DATE and a.time >= CURRENT_TIME  and ownerId = ?1")
    public List<Appointment> getAppointmentsTodayOfOwner(int ownerId);


}
