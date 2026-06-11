package com.timotei.physioapp.controller;

import com.timotei.physioapp.dto.BookAppointmentRequest;
import com.timotei.physioapp.model.Appointment;
import com.timotei.physioapp.service.AppointmentService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/appointments")
@CrossOrigin(origins = "*")
public class AppointmentController {
    private final AppointmentService appointmentService;

    public AppointmentController(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }

    @PostMapping("/book")
    public ResponseEntity<Appointment> book(@RequestBody BookAppointmentRequest request, Authentication auth) {
        Appointment appointment = appointmentService.bookAppointment(
                auth.getName(),
                request.getTherapistId(),
                request.getServiceId(),
                request.getAppointmentDate(),
                request.getNotes()
        );
        return ResponseEntity.ok(appointment);
    }

    @GetMapping("/my")
    public ResponseEntity<List<Appointment>> getMyAppointments(Authentication auth) {
        return ResponseEntity.ok(appointmentService.getAppointmentsForPatient(auth.getName()));
    }

    @PutMapping("/{id}/cancel")
    public ResponseEntity<Appointment> cancel(@PathVariable Long id, Authentication auth) {
        return ResponseEntity.ok(appointmentService.cancelAppointment(id, auth.getName()));
    }

    @GetMapping("/therapist")
    public ResponseEntity<List<Appointment>> getTherapistAppointments(Authentication auth) {
        return ResponseEntity.ok(appointmentService.getAppointmentsForTherapist(auth.getName()));
    }
    @GetMapping("/all")
    public ResponseEntity<List<Appointment>> getAllAppointments() {
        return ResponseEntity.ok(appointmentService.getAllAppointments());
    }

    @PutMapping("/{id}/confirm")
    public ResponseEntity<Appointment> confirm(@PathVariable Long id) {
        return ResponseEntity.ok(appointmentService.confirmAppointment(id));
    }

    @PutMapping("/{id}/complete")
    public ResponseEntity<Appointment> complete(@PathVariable Long id) {
        return ResponseEntity.ok(appointmentService.completeAppointment(id));
    }
}