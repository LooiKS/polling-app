package com.islow.polling.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.islow.polling.models.User;
import com.islow.polling.dto.JwtToken;
import com.islow.polling.dto.LoginUserDto;
import com.islow.polling.dto.RegisterUserDto;
import com.islow.polling.dto.ResponseModel;
import com.islow.polling.services.AuthService;

@RestController
@RequestMapping("/auth")
public class AuthController {

	@Autowired
	private AuthService authService;
	
	@PostMapping("login")
	public ResponseModel<JwtToken> login(@RequestBody LoginUserDto user) {
		return authService.login(user.getUsername(), user.getPassword());		
	}
	
	@PostMapping("register")
	public ResponseModel<String> register(@RequestBody RegisterUserDto user) {
		return authService.addUser(user);
	}
}