package com.islow.polling.repository;

import org.springframework.data.repository.CrudRepository;

import com.islow.polling.models.Vote;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VoteRepository extends CrudRepository<Vote, Long>{
}
