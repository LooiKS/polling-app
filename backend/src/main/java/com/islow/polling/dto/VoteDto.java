package com.islow.polling.dto;

import java.util.Date;

import com.islow.polling.models.Choice;
import com.islow.polling.models.Poll;
import com.islow.polling.models.User;
import com.islow.polling.models.Vote;


public class VoteDto {
	private Long id;
	private Long pollID;
	private Long choiceID;
	private String votedBy;
	private Date votedDt;
	
	public VoteDto() {
	}
	
	public VoteDto(Vote vote) {
		this.id = vote.getId();
		this.pollID = vote.getPollID().getId();
		this.choiceID = vote.getChoiceID().getId();
		this.votedBy = vote.getVotedBy().getUsername();
		this.votedDt = vote.getVotedDt();
	}
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}
	
	public Long getPollID() {
		return pollID;
	}
	
	public void setPollID(Long pollID) {
		this.pollID = pollID;
	}
	
	public Long getChoiceID() {
		return choiceID;
	}
	
	public void setChoiceID(Long choiceID) {
		this.choiceID = choiceID;
	}
	
	public String getVotedBy() {
		return votedBy;
	}
	
	public void setVotedBy(String votedBy) {
		this.votedBy = votedBy;
	}
	
	
	public Date getVotedDt() {
		return votedDt;
	}

	public void setVotedDt(Date votedDt) {
		this.votedDt = votedDt;
	}
}

