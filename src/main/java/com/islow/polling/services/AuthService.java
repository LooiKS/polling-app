package com.islow.polling.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.islow.polling.configuration.CustomUserDetailService;
import com.islow.polling.dto.JwtToken;
import com.islow.polling.dto.ResponseModel;
import com.islow.polling.models.User;
import com.islow.polling.provider.JwtTokenProvider;
import com.islow.polling.repository.UserRepository;

@Service
public class AuthService {

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private CustomUserDetailService customUserDetailService;

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private JwtTokenProvider jwtTokenProvider;

	@Transactional
	public ResponseModel<User> addUser(User user) {
		if (userRepository.existsByEmail(user.getEmail())) {
			return ResponseModel.failed("The username is taken");
		} else if (userRepository.existsByEmail(user.getEmail())) {
			return ResponseModel.failed("The email is taken");
		} else {
			user.setPassword(passwordEncoder.encode(user.getPassword()));
			user = userRepository.save(user);
			return ResponseModel.success(user);
		}
	}
	
	@Transactional
	public ResponseModel<JwtToken> login(String username, String password) {
		try {
			UserDetails user = customUserDetailService.loadUserByUsername(username);
			UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(user, password);
			Authentication authentication = authenticationManager.authenticate(authToken);
			SecurityContextHolder.getContext().setAuthentication(authentication);
			return ResponseModel.success(new JwtToken(jwtTokenProvider.createToken(username)));
		} catch (Exception ex) {
			return ResponseModel.failed("Wrong credential.");
		}
	}
}