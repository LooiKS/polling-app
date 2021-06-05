package com.islow.polling.repository;

import com.islow.polling.models.Poll;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PollRepository extends CrudRepository<Poll, Long>, PollRepositoryCustom {
}
