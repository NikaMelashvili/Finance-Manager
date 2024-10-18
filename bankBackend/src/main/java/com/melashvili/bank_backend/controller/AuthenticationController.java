package com.melashvili.bank_backend.controller;

import com.melashvili.bank_backend.model.dto.request.AuthenticationRequest;
import com.melashvili.bank_backend.model.dto.request.RegisterRequest;
import com.melashvili.bank_backend.model.dto.response.AuthenticationResponse;
import com.melashvili.bank_backend.services.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.security.auth.login.AccountException;
import java.io.IOException;
import java.nio.file.AccessDeniedException;

@RestController
@RequestMapping("/rest/authentication")
public class AuthenticationController {

    private AuthenticationService service;

    @Autowired
    public void setAuthenticationService(AuthenticationService authenticationService) {
        this.service = authenticationService;
    }

    @PostMapping("/register")
    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest request)
            throws IOException, AccountException {
        AuthenticationResponse authResponse = service.register(request);
        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, authResponse.getCookie().toString())
                .body(authResponse);
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request) {
        AuthenticationResponse authResponse = service.authenticate(request);
        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, authResponse.getCookie().toString())
                .body(authResponse);
    }
}
