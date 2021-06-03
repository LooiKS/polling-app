package com.islow.polling.dto;

public class ResponseModel<T> {
	private T data;
	private String status;
	private String message;
	private String errorMessage;

	public ResponseModel(T data, String status, String message, String errorMessage) {
		super();
		this.data = data;
		this.status = status;
		this.message = message;
		this.errorMessage = errorMessage;
	}

	public T getData() {
		return data;
	}

	public void setData(T data) {
		this.data = data;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public String getErrorMessage() {
		return errorMessage;
	}

	public void setErrorMessage(String errorMessage) {
		this.errorMessage = errorMessage;
	}

	public static <R> ResponseModel<R> success(R data) {
		return new ResponseModel<R>(data, "success", null, null);
	}

	public static <R> ResponseModel<R> failed(String errorMessage) {
		return new ResponseModel<R>(null, "failed", null, errorMessage);
	}
}