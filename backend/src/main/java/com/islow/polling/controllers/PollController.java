package com.islow.polling.controllers;

import javax.security.auth.login.AccountNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.islow.polling.models.User;
import com.islow.polling.dto.PollChoiceDto;
import com.islow.polling.dto.ResponseModel;
import com.islow.polling.exceptions.ValidationException;
import com.islow.polling.services.AuthService;
import com.islow.polling.services.PollService;

@RestController
@RequestMapping("/polls")
public class PollController {

	@Autowired
	private PollService pollService;

	@Autowired
	private AuthService authService;

	@PostMapping("")
	public ResponseModel<PollChoiceDto> addPoll(@RequestBody PollChoiceDto pollChoiceDto,
			Authentication authentication) throws AccountNotFoundException {
		User user = authService.getUserByUsername(authentication.getName());
		try {
			return ResponseModel.success(pollService.addPoll(pollChoiceDto, user));
		} catch (ValidationException e) {
			return ResponseModel.failed(e.getMessage());
		}
	}
}
