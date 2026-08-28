package me.soaresgus.usersapi.service;

import me.soaresgus.usersapi.dto.request.LoginRequest;
import me.soaresgus.usersapi.dto.request.RegisterRequest;
import me.soaresgus.usersapi.dto.response.AuthResponse;
import me.soaresgus.usersapi.dto.response.UserResponse;
import me.soaresgus.usersapi.entity.User;
import me.soaresgus.usersapi.exception.EmailAlreadyExistsException;
import me.soaresgus.usersapi.exception.InvalidCredentialsException;
import me.soaresgus.usersapi.repository.UserRepository;
import me.soaresgus.usersapi.security.JwtService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService
    ) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    @Transactional
    public UserResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.email())) {
            throw new EmailAlreadyExistsException();
        }

        String hashedPassword = passwordEncoder.encode(request.password());
        User user = new User(request.email(), hashedPassword);
        User savedUser = userRepository.save(user);

        return new UserResponse(savedUser.getId(), savedUser.getEmail());
    }

    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.email())
                .filter(foundUser -> passwordEncoder.matches(request.password(), foundUser.getPassword()))
                .orElseThrow(InvalidCredentialsException::new);

        String token = jwtService.generateToken(user.getId(), user.getEmail());
        return new AuthResponse(token);
    }

}
