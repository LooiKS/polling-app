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
@Table(name = "POLL")
public class Poll implements Serializable {

	private static final long serialVersionUID = 1046424549533999025L;

	@Id()
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "ID")
	private Long id;

	@Column(name = "QUESTION")
	private String question;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "CREATED_BY")
	private User createdBy;

	@CreationTimestamp
	@Column(name = "CREATED_DT")
	private Date createdDt;

	@Column(name = "EXPIRY_DT")
	private Date expiryDt;

	public Poll() {
		
	}

	public Poll(String question, User createdBy, Date expiryDt) {
		super();
		this.question = question;
		this.createdBy = createdBy;
		this.expiryDt = expiryDt;
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

	public User getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(User createdBy) {
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