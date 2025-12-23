package com.doctor_service.doctor_service.data;

import jakarta.persistence.*;

@Entity
@Table(name = "Doctor")
public class Doctor {

    // Annotation to indicate that it is a primary key
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    //Annotation to represent the column name
    @Column(name = "id")
    private int id;

    @Column(name ="name")
    private String name;

    @Column(name ="specialization")
    private String specialization;

    @Column(name ="email")
    private String email;

    @Column(name ="telephone")
    private String telephone;

    public int getId(){
        return id;
    }
    public void setId(int id){
        this.id = id;
    }

    public String getName(){
        return name;
    }
    public void setName(String name){
        this.name = name;
    }

    public String getSpecialization(){
        return specialization;
    }
    public void setSpecialization(String specialization){
        this.specialization = specialization;
    }

    public String getTelephone(){
        return telephone;
    }
    public void setTelephone(String telephone){
        this.telephone = telephone;
    }

    public String getEmail(){
        return email;
    }
    public void setEmail(String email){
        this.email = email;
    }
}
