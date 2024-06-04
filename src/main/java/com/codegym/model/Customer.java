package com.codegym.model;

import jakarta.persistence.*;
import lombok.Data;


@Entity
@Data
@Table(name = "customer")
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String email;

    private String gender;

    private String address;

    private Integer age;

    private String phoneNumber;

}
