package com.vms.Entity;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Table(name="voter_logs")
@Entity
public class VoterLogs implements Serializable{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int voterLogId;
	
	@ManyToOne
	@JoinColumn(name="id")
    private User user;
	
	@ManyToOne
	@JoinColumn(name="electionId")
    private Election election;
	
	@ManyToOne
	@JoinColumn(name="CanidateId")
	private Candidate candidate;

	public VoterLogs() {
		super();
	}

	public VoterLogs(int voterLogId, User user, Election election, Candidate candidate) {
		super();
		this.voterLogId = voterLogId;
		this.user = user;
		this.election = election;
		this.candidate = candidate;
	}

	public int getVoterLogId() {
		return voterLogId;
	}

	public void setVoterLogId(int voterLogId) {
		this.voterLogId = voterLogId;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Election getElection() {
		return election;
	}

	public void setElection(Election election) {
		this.election = election;
	}

	public Candidate getCandidate() {
		return candidate;
	}

	public void setCandidate(Candidate candidate) {
		this.candidate = candidate;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	@Override
	public String toString() {
		return "VoterLogs [voterLogId=" + voterLogId + ", user=" + user + ", election=" + election + ", candidate="
				+ candidate + "]";
	}
	
}