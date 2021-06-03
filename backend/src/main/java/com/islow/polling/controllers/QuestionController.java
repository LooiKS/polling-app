package com.islow.polling.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.islow.polling.models.User;
import com.islow.polling.dto.ResponseModel;
import com.islow.polling.repository.UserRepository;

@RestController
@RequestMapping("/questions")
public class QuestionController {

	@Autowired
	private UserRepository userRepository;
	
	/*
	 * 
	 * IMPORTANT !!!
	 * THIS IS ONLY FOR TESTING JWT PURPOSE,
	 * USER-RELATED STUFF SHOULD BE CHANGED TO QUESTIONS-RELATED.
	 * 
	 * */

	@GetMapping("")
	public ResponseModel<Iterable<User>> addUser() {
		return ResponseModel.success(userRepository.findAll());
	}
}
