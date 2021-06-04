package com.islow.polling.repository;

import com.islow.polling.models.Poll;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import java.util.List;

@Repository
public interface PollRepository extends CrudRepository<Poll, Long> {
    List<Poll> findPolls(String username);
}
