package com.mountbirch.test_task.service;

import com.mountbirch.test_task.model.Customer;

import java.util.List;

public interface CustomerService {

    List<Customer> getCustomers();

    void saveCustomer(Customer customer);

    Customer getCustomer(long theId);

    void deleteCustomer(long theId);
}
