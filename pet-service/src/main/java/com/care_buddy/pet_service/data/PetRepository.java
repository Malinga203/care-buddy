package com.care_buddy.pet_service.data;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PetRepository extends JpaRepository<Pet,Integer> {

    public List<Pet> findByOwnerID(int ownerID);

    @Query("Select COUNT(p) from Pet p where ownerID = ?1")
    public Long countById(int id);
}
