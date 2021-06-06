package com.islow.polling.repository;

import com.islow.polling.models.Poll;
import com.islow.polling.models.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PollRepository extends CrudRepository<Poll, Long> {
    Poll findPollById(Long pollId);

    List<Poll> findAllByCreatedBy(User user);
}
