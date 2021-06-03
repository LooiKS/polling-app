package com.islow.polling.dto;

import java.util.Date;
import com.islow.polling.models.Poll;

public class PollDto {
	
	private Long id;
	private String question;
	private String createdBy;
	private Date createdDt;
	private Date expiryDt;

	public PollDto() {
	}

	public PollDto(Poll poll) {
		this.id = poll.getId();
		this.question = poll.getQuestion();
		this.createdBy = poll.getCreatedBy().getUsername();
		this.createdDt = poll.getCreatedDt();
		this.expiryDt = poll.getExpiryDt();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getQuestion() {
		return question;
	}

	public void setQuestion(String question) {
		this.question = question;
	}

	public String getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}

	public Date getCreatedDt() {
		return createdDt;
	}

	public void setCreatedDt(Date createdDt) {
		this.createdDt = createdDt;
	}

	public Date getExpiryDt() {
		return expiryDt;
	}

	public void setExpiryDt(Date expiryDt) {
		this.expiryDt = expiryDt;
	}

}