package com.islow.polling.controllers;

import com.islow.polling.dto.PollChoiceDto;
import com.islow.polling.dto.ResponseModel;
import com.islow.polling.exceptions.ValidationException;
import com.islow.polling.models.User;
import com.islow.polling.services.AuthService;
import com.islow.polling.services.PollService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.security.auth.login.AccountNotFoundException;
import java.util.List;

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

    @GetMapping("")
    public ResponseModel<List<PollChoiceDto>> findPolls(Authentication authentication) throws AccountNotFoundException {
        User user = authService.getUserByUsername(authentication.getName());
        return ResponseModel.success(pollService.findPolls(user.getUsername()));
    }

}
