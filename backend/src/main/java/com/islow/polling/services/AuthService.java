package com.islow.polling.services;

import javax.security.auth.login.AccountNotFoundException;

import org.apache.commons.lang3.StringUtils;
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
import com.islow.polling.dto.RegisterUserDto;
import com.islow.polling.dto.ResponseModel;
import com.islow.polling.models.User;
import com.islow.polling.provider.JwtTokenProvider;
import com.islow.polling.repository.UserRepository;

@Service
public class AuthService {

	@Autowired
	private UserRepository userRepository;

//	@Autowired
//	private PasswordEncoder passwordEncoder;

	@Autowired
	private CustomUserDetailService customUserDetailService;

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private JwtTokenProvider jwtTokenProvider;

	@Transactional
	public User getUserByUsername(String username) throws AccountNotFoundException {
		return userRepository.findById(username).orElseThrow(() -> new AccountNotFoundException("Account not found"));
	}

	@Transactional
	public ResponseModel<String> addUser(RegisterUserDto userDto) {
		String username = userDto.getUsername();
		String password = userDto.getPassword();
		String fullName = userDto.getFullName();
		String email = userDto.getEmail();

		if (StringUtils.isBlank(username)) {
			return ResponseModel.failed("Username is required.");
		} else if (StringUtils.isBlank(password)) {
			return ResponseModel.failed("Password is required.");
		} else if (StringUtils.isBlank(fullName)) {
			return ResponseModel.failed("Fullname is required.");
		} else if (StringUtils.isBlank(email)) {
			return ResponseModel.failed("Email is required.");
		} else {
			if (userRepository.existsById(userDto.getUsername())) {
				return ResponseModel.failed("The username is taken.");
			} else if (userRepository.existsByEmail(userDto.getEmail())) {
				return ResponseModel.failed("The email is taken.");
			} else if (!userDto.getEmail().matches("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$")) {
				return ResponseModel.failed("The email is invalid.");
			} else if (password.length() < 6 || password.length() > 20) {
				return ResponseModel.failed("Password length must be between 6 - 20.");
			} else {
				User user = new User();
				user.setEmail(email);
				user.setFullName(fullName);
				user.setUsername(username);
				user.setPassword("{noop}" + password);

				user = userRepository.save(user);
				return ResponseModel.success("Success");
			}
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
			return ResponseModel.failed("Wrong credential." + ex.getMessage() + username + " " + password);
		}
	}
}