package com.timotei.physioapp.repository;

import com.timotei.physioapp.model.Therapist;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface TherapistRepository extends JpaRepository<Therapist, Long> {
    Optional<Therapist> findByUserId(Long userId);
}