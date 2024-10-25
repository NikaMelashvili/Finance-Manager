package com.melashvili.bank_backend.controller;

import com.melashvili.bank_backend.model.dto.response.UserResponseDTO;
import com.melashvili.bank_backend.services.JwtService;
import com.melashvili.bank_backend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/rest/profile")
public class ProfileController {

    private UserService userService;

    private JwtService jwtService;

    @Autowired
    public void setUserService(UserService userService) {
        this.userService = userService;
    }

    @Autowired
    public void setJwtService(JwtService jwtService) {
        this.jwtService = jwtService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserResponseDTO> getProfile(@PathVariable Long id) {
        UserResponseDTO user = userService.getUser(id);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/byEmail")
    public ResponseEntity<UserResponseDTO> getProfileByEmail(
            @RequestParam String email,
            @RequestHeader("Authorization") String authHeader) {

        String token = authHeader.substring(7);

        if (!jwtService.validateToken(token)){
            return ResponseEntity.status(401).build();
        }

        UserResponseDTO user = userService.getUserByEmail(email);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }
}
