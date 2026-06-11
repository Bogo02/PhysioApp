package com.timotei.physioapp.dto;

import lombok.Data;

@Data
public class AddTherapistRequest {
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String specialty;
    private String bio;
}