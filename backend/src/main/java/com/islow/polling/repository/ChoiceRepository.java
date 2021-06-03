package com.islow.polling.repository;

import org.springframework.data.repository.CrudRepository;

import com.islow.polling.models.Choice;

public interface ChoiceRepository extends CrudRepository<Choice, Long>{
}