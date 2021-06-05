package com.islow.polling.repository;

import org.springframework.data.repository.CrudRepository;

import com.islow.polling.models.Choice;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChoiceRepository extends CrudRepository<Choice, Long>{
}
