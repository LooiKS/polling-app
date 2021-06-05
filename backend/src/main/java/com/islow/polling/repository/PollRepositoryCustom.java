package com.islow.polling.repository;

import com.islow.polling.models.Poll;

import java.util.List;

public interface PollRepositoryCustom {
    List<Poll> findPolls(String username);
    Poll findPollByPollId(String pollId);
}
