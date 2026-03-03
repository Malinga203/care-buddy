package com.care_buddy.pet_service.data;


import jakarta.persistence.*;

@Entity
@Table(name ="pet")
public class Pet {

    @Id
    @Column(name="id")
    @GeneratedValue( strategy= GenerationType.IDENTITY)
    private int id;

    @Column(name ="name")
    private String name;

    @Column(name ="age")
    private String age;

    @Column(name ="type")
    private String type;

    @Column(name ="Breed")
    private String Breed;

    @Column(name ="ownerID")
    private Integer ownerID;


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

    public String getAge(){
        return age;
    }
    public void setAge(String age){this.age = age;
    }

    public String getType(){
        return type;
    }
    public void setType(String type){
        this.type = type;
    }

    public String getBreed(){
        return Breed;
    }
    public void setBreed(String Breed){
        this.Breed = Breed;
    }

    public int getOwnerID(){
        return ownerID;
    }
    public void setOwnerID(int ownerID){
        this.ownerID = ownerID;
    }
}

