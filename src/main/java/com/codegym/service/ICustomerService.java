package com.codegym.service;

import com.codegym.model.Customer;

import java.util.Optional;

public interface ICustomerService  {

    Optional<Customer> findById(Long id);

    void save(Customer customer);

    void deleteById(Long id);

    Iterable<Customer> findAll();
}
