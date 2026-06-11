package com.timotei.physioapp.controller;

import com.timotei.physioapp.dto.AddTherapistRequest;
import com.timotei.physioapp.enums.Role;
import com.timotei.physioapp.model.Therapist;
import com.timotei.physioapp.model.User;
import com.timotei.physioapp.repository.TherapistRepository;
import com.timotei.physioapp.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminController {
    private final UserRepository userRepository;
    private final TherapistRepository therapistRepository;
    private final PasswordEncoder passwordEncoder;

    public AdminController(UserRepository userRepository, TherapistRepository therapistRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.therapistRepository = therapistRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/therapists")
    public ResponseEntity<?> addTherapist(@RequestBody AddTherapistRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            return ResponseEntity.badRequest().body("Email already in use");
        }
        User user = new User();
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(
                request.getPassword() != null && !request.getPassword().isEmpty()
                        ? request.getPassword() : "password123"
        ));
        user.setRole(Role.THERAPIST);
        userRepository.save(user);

        Therapist therapist = new Therapist();
        therapist.setUser(user);
        therapist.setSpecialty(request.getSpecialty());
        therapist.setBio(request.getBio());
        therapistRepository.save(therapist);

        return ResponseEntity.ok("Therapist added successfully");
    }

    @PostMapping("/admins")
    public ResponseEntity<?> addAdmin(@RequestBody AddTherapistRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            return ResponseEntity.badRequest().body("Email already in use");
        }
        User user = new User();
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(
                request.getPassword() != null && !request.getPassword().isEmpty()
                        ? request.getPassword() : "password123"
        ));
        user.setRole(Role.ADMIN);
        userRepository.save(user);

        return ResponseEntity.ok("Admin added successfully");
    }
}