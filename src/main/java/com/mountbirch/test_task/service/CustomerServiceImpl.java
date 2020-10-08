package com.mountbirch.test_task.service;

import com.mountbirch.test_task.model.Customer;
import com.mountbirch.test_task.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;


@Service
public class CustomerServiceImpl implements CustomerService {

    private CustomerRepository customerRepository;

    @Autowired
    public CustomerServiceImpl(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }


    @Override
    public List<Customer> getCustomers() {
        return customerRepository.findAll();
    }

    @Override
    public void saveCustomer(Customer customer) {
        customerRepository.save(customer);
    }

    @Override
    public Customer getCustomer(long theId) {
        return customerRepository.getOne(theId);
    }

    @Override
    public void deleteCustomer(long theId) {
        customerRepository.deleteById(theId);
    }
}
