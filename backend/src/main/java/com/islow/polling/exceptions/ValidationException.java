package com.islow.polling.exceptions;

public class ValidationException extends Exception{
	
	public ValidationException(String errorMessage){
		super(errorMessage);
	}
}