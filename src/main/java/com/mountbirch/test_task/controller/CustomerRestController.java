package com.mountbirch.test_task.controller;

import com.mountbirch.test_task.exceptions.CustomerNotFoundException;
import com.mountbirch.test_task.model.Customer;
import com.mountbirch.test_task.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class CustomerRestController {

    private CustomerService customerService;

    @Autowired
    public CustomerRestController(CustomerService customerService) {
        this.customerService = customerService;
    }

    @GetMapping("/customers")
    public List<Customer> getCustomers() {
        return customerService.getCustomers();
    }

    @GetMapping("/customers/{customerId}")
    public Customer getCustomer(@PathVariable int customerId) throws CustomerNotFoundException {

        Customer customer = customerService.getCustomer(customerId);

        if(customer == null) {
            throw new CustomerNotFoundException("Customer id not found - " + customerId);
        }

        return customer;
    }

    @PostMapping("/customers")
    public Customer addCustomer(@RequestBody Customer customer) {

        customer.setId(0L);
        customerService.saveCustomer(customer);

        return customer;
    }

    @PutMapping("/customers/")
    public Customer updateCustomer(@RequestBody Customer customer)  {

        customerService.saveCustomer(customer);

        return customer;
    }


    @DeleteMapping("/customers/{customerId}")
    public String deleteCustomer(@PathVariable int customerId) throws CustomerNotFoundException {

        Customer customer = customerService.getCustomer(customerId);

        if(customer == null) {
            throw new CustomerNotFoundException("Customer id not found - " + customerId);
        }

        customerService.deleteCustomer(customerId);

        return "Deleted customer id - " + customerId;
    }
}
