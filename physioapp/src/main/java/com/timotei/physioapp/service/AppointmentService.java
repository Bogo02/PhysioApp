package com.timotei.physioapp.service;

import com.timotei.physioapp.enums.AppointmentStatus;
import com.timotei.physioapp.model.Appointment;
import com.timotei.physioapp.model.Therapist;
import com.timotei.physioapp.model.User;
import com.timotei.physioapp.repository.AppointmentRepository;
import com.timotei.physioapp.repository.ServiceRepository;
import com.timotei.physioapp.repository.TherapistRepository;
import com.timotei.physioapp.repository.UserRepository;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class AppointmentService {
    private final AppointmentRepository appointmentRepository;
    private final UserRepository userRepository;
    private final TherapistRepository therapistRepository;
    private final ServiceRepository serviceRepository;

    public AppointmentService(AppointmentRepository appointmentRepository,
                              UserRepository userRepository,
                              TherapistRepository therapistRepository,
                              ServiceRepository serviceRepository) {
        this.appointmentRepository = appointmentRepository;
        this.userRepository = userRepository;
        this.therapistRepository = therapistRepository;
        this.serviceRepository = serviceRepository;
    }

    public Appointment bookAppointment(String patientEmail, Long therapistId, Long serviceId, LocalDateTime date, String notes) {
        User patient = userRepository.findByEmail(patientEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Therapist therapist = therapistRepository.findById(therapistId)
                .orElseThrow(() -> new RuntimeException("Therapist not found"));
        com.timotei.physioapp.model.Service service = serviceRepository.findById(serviceId)
                .orElseThrow(() -> new RuntimeException("Service not found"));

        Appointment appointment = new Appointment();
        appointment.setPatient(patient);
        appointment.setTherapist(therapist);
        appointment.setService(service);
        appointment.setAppointmentDate(date);
        appointment.setStatus(AppointmentStatus.PENDING);
        appointment.setNotes(notes);

        return appointmentRepository.save(appointment);
    }

    public List<Appointment> getAppointmentsForPatient(String patientEmail) {
        User patient = userRepository.findByEmail(patientEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return appointmentRepository.findByPatientId(patient.getId());
    }

    public List<Appointment> getAppointmentsForTherapist(String therapistEmail) {
        User user = userRepository.findByEmail(therapistEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return appointmentRepository.findByTherapistId(user.getId());
    }

    public Appointment cancelAppointment(Long appointmentId, String patientEmail) {
        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));
        if (!appointment.getPatient().getEmail().equals(patientEmail)) {
            throw new RuntimeException("Not authorized");
        }
        appointment.setStatus(AppointmentStatus.CANCELLED);
        return appointmentRepository.save(appointment);
    }
    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }

    public Appointment confirmAppointment(Long appointmentId) {
        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));
        appointment.setStatus(AppointmentStatus.CONFIRMED);
        return appointmentRepository.save(appointment);
    }

    public Appointment completeAppointment(Long appointmentId) {
        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));
        appointment.setStatus(AppointmentStatus.COMPLETED);
        return appointmentRepository.save(appointment);
    }

}