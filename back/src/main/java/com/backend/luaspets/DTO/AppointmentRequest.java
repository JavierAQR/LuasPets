package com.backend.luaspets.DTO;

import java.time.LocalDate;
import java.time.LocalTime;

import lombok.Data;

@Data
public class AppointmentRequest {
    
    Integer userId;
    Integer petId;
    Integer serviceId;
    String status;
    LocalDate appointmentDate;
    LocalTime startTime;
    LocalTime endTime;
    
}
