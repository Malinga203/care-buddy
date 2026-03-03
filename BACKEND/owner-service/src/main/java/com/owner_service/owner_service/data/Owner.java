package com.owner_service.owner_service.data;

import jakarta.persistence.*;

@Entity
@Table(name="owner")
public class Owner {

    @Id
    @Column(name = "ownerId")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int ownerId;
    @Column(name = "name")
    private String name;
    @Column(name = "username",unique = true)
    private String username;
    @Column(name = "password")
    private String password;


    public int getOwnerId() {
        return ownerId;
    }

    public void setOwnerId(int userId) {
        this.ownerId = userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }


}
