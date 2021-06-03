package com.islow.polling.dto;

import com.islow.polling.models.Choice;

public class ChoiceDto {
	private Long id;
	private String answer;
	
	public ChoiceDto() {
	}

	public ChoiceDto(Choice choice) {
		this.id = choice.getId();
		this.answer = choice.getAnswer();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getAnswer() {
		return answer;
	}

	public void setAnswer(String answer) {
		this.answer = answer;
	}

}