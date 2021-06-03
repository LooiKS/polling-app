package com.islow.polling.repository;

import org.springframework.data.repository.CrudRepository;

import com.islow.polling.models.Poll;

public interface PollRepository extends CrudRepository<Poll, Long>{	
}