package com.islow.polling.repository;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.islow.polling.models.User;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<User, String>{
	boolean existsByEmail(String email);
	Optional<User> findByUsername(String username);
}
