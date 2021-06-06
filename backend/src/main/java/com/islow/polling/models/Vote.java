package com.islow.polling.models;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;

@Entity
@Table(name = "Vote")
public class Vote implements Serializable {

	private static final long serialVersionUID = 1046424549533999024L;

	@Id()
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "ID")
	private Long id;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "POLL_ID")
	private Poll pollID;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "CHOICE_ID")
	private Choice choiceID;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "VOTED_BY")
	private User votedBy;

	@CreationTimestamp
	@Column(name = "VOTED_DT")
	private Date votedDt;


	public Vote() {
	}

	public Vote(Poll pollID,Choice choiceID, User votedBy) {
		super();
		this.pollID = pollID;
		this.choiceID = choiceID;
		this.votedBy = votedBy;
	}
	

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Poll getPollID() {
		return pollID;
	}

	public void setPollID(Poll pollID) {
		this.pollID = pollID;
	}
	
	public Choice getChoiceID() {
		return choiceID;
	}
	
	public void setChoiceID(Choice choiceID) {
		this.choiceID = choiceID;
	}
	
	public User getVotedBy() {
		return votedBy;
	}
	
	public void setVotedBy(User votedBy) {
		this.votedBy = votedBy;
	}
	

	
	public Date getVotedDt() {
		return votedDt;
	}

	public void setVotedDt(Date votedDt) {
		this.votedDt = votedDt;
	}

}