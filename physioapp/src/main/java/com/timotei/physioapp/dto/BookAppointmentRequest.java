package com.timotei.physioapp.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class BookAppointmentRequest {
    private Long therapistId;
    private Long serviceId;
    private LocalDateTime appointmentDate;
    private String notes;
}