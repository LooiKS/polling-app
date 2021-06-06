package com.islow.polling.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.islow.polling.dto.JwtToken;
import com.islow.polling.dto.LoginUserDto;
import com.islow.polling.dto.RegisterUserDto;
import com.islow.polling.dto.ResponseModel;
import com.islow.polling.exceptions.ValidationException;
import com.islow.polling.services.AuthService;

@RestController
@RequestMapping("/auth")
public class AuthController {

	@Autowired
	private AuthService authService;

	@PostMapping("login")
	public ResponseModel<JwtToken> login(@RequestBody LoginUserDto user) {
		try {
			return ResponseModel.success(authService.login(user.getUsername(), user.getPassword()));
		} catch (ValidationException ex) {
			return ResponseModel.failed(ex.getMessage());
		}
	}

	@PostMapping("register")
	public ResponseModel<String> register(@RequestBody RegisterUserDto user) {
		try {
			return ResponseModel.success(authService.addUser(user));
		} catch (ValidationException ex) {
			return ResponseModel.failed(ex.getMessage());
		}
	}
}