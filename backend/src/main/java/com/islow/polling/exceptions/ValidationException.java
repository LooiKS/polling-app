package com.islow.polling.exceptions;

public class ValidationException extends Exception{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -9186410680454542954L;

	public ValidationException(String errorMessage){
		super(errorMessage);
	}
}