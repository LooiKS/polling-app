package com.islow.polling.dto;

import java.util.List;

public class PollChoiceVoteDto {

	private PollDto poll;
	private List<ChoiceDto> choices;
	private List<VoteDto> votes;

	public PollChoiceVoteDto() {
	}

	public PollChoiceVoteDto(PollDto poll, List<ChoiceDto> choices, List<VoteDto> votes) {
		this.poll = poll;
		this.choices = choices;
		this.votes = votes;
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
	
	public List<VoteDto> getVotes() {
		return votes;
	}

	public void setVotes(List<VoteDto> votes) {
		this.votes = votes;
	}

}