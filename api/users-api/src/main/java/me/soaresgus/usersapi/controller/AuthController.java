package me.soaresgus.usersapi.controller;

import jakarta.validation.Valid;
import me.soaresgus.usersapi.dto.request.LoginRequest;
import me.soaresgus.usersapi.dto.request.RegisterRequest;
import me.soaresgus.usersapi.dto.response.AuthResponse;
import me.soaresgus.usersapi.dto.response.UserResponse;
import me.soaresgus.usersapi.service.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<UserResponse> register(@Valid @RequestBody RegisterRequest request) {
        UserResponse response = authService.register(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        AuthResponse response = authService.login(request);
        return ResponseEntity.ok(response);
    }

}
