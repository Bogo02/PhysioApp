package com.timotei.physioapp.repository;

import com.timotei.physioapp.model.Service;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ServiceRepository extends JpaRepository<Service, Long> {
}