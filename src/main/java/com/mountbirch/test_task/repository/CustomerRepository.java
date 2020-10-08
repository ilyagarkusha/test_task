package com.mountbirch.test_task.repository;

import com.mountbirch.test_task.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;


public interface CustomerRepository extends JpaRepository<Customer, Long> {
}
