package com.care_buddy.pet_service.data;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PetRepository extends JpaRepository<Pet,Integer> {
}
