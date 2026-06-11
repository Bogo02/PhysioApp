package com.timotei.physioapp.controller;

import com.timotei.physioapp.model.Therapist;
import com.timotei.physioapp.repository.TherapistRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/therapists")
@CrossOrigin(origins = "*")
public class TherapistController {
    private final TherapistRepository therapistRepository;

    public TherapistController(TherapistRepository therapistRepository) {
        this.therapistRepository = therapistRepository;
    }

    @GetMapping
    public ResponseEntity<List<Therapist>> getAllTherapists() {
        return ResponseEntity.ok(therapistRepository.findAll());
    }
}