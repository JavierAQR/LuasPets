package com.backend.luaspets.DTO;


import java.time.LocalDate;
import java.time.LocalTime;

import lombok.Data;

@Data
public class AppointmentResponse {
    
    Integer id;
    Integer userId;
    String status;
    String petName;
    LocalDate appointmentDate;
    LocalTime startTime;
    LocalTime endTime;
    String serviceName;

}
