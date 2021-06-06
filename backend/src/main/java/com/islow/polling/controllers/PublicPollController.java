package com.islow.polling.controllers;


import com.islow.polling.dto.PollChoiceDto;
import com.islow.polling.dto.PollChoiceVoteDto;
import com.islow.polling.dto.ResponseModel;
import com.islow.polling.services.PollService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/public")
public class PublicPollController {

    @Autowired
    private PollService pollService;

    @GetMapping("/polls")
//    public ResponseModel<List<PollChoiceDto>> findPublicPolls() {
//        return ResponseModel.success(pollService.findAllPollsWithoutLogin());
  public ResponseModel<List<PollChoiceVoteDto>> findPublicPolls() {

        return ResponseModel.success(pollService.findAllPollsWithoutLogin());
    }
}
