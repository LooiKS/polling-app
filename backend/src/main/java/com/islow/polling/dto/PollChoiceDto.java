package com.islow.polling.dto;

import java.util.List;

public class PollChoiceDto {

	private PollDto poll;
	private List<ChoiceDto> choices;

	public PollChoiceDto() {
	}

	public PollChoiceDto(PollDto poll, List<ChoiceDto> choices) {
		this.poll = poll;
		this.choices = choices;
	}

	public PollDto getPoll() {
		return poll;
	}

	public void setPoll(PollDto poll) {
		this.poll = poll;
	}

	public List<ChoiceDto> getChoices() {
		return choices;
	}

	public void setChoices(List<ChoiceDto> choices) {
		this.choices = choices;
	}

}