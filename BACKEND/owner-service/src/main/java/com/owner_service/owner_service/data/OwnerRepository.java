package com.owner_service.owner_service.data;

import org.springframework.data.jpa.repository.JpaRepository;

public interface OwnerRepository extends JpaRepository<Owner,Integer> {

    public Owner findOwnerByUsername(String username);

}
