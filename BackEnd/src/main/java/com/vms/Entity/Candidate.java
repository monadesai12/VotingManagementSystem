package com.vms.Entity;

import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

import org.hibernate.annotations.CreationTimestamp;

@Entity
@Table(name="candidate")
public class Candidate {
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int candidateId;
	
	@NotBlank(message="Symbol is mandatory")
	private String symbol;
    
	@NotBlank(message = "Party name should not be blank")
	@Pattern(regexp = "[a-zA-z ]*", message = "Name should contain only character")
	private String partyName;
	
	private int votes=0;
	
	@CreationTimestamp
	private LocalDateTime createdat;
	
	private LocalDateTime withDrawAt;
	
	//private int electionId;
	
	//private int userId;
	
	private String candidateConfirmation="PENDING";
	
	private LocalDateTime candidateDeletedAt;
	
	private String withdrawCandidateFlag = "N";
	
	@ManyToOne
	@JoinColumn(name="id")
    private User user;
	
	@ManyToOne
	@JoinColumn(name="electionId")
    private Election election;
	
	public Candidate() {
	
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

	public int getCandidateId() {
		return candidateId;
	}

	public void setCandidateId(int candidateId) {
		this.candidateId = candidateId;
	}

	public String getSymbol() {
		return symbol;
	}

	public void setSymbol(String symbol) {
		this.symbol = symbol;
	}

	public String getPartyName() {
		return partyName;
	}

	public void setPartyName(String partyName) {
		this.partyName = partyName;
	}

	public int getVotes() {
		return votes;
	}

	public void setVotes(int votes) {
		this.votes = votes;
	}

	public LocalDateTime getCreatedat() {
		return createdat;
	}

	public void setCreatedat(LocalDateTime createdat) {
		this.createdat = createdat;
	}

	
	public String getWithdrawCandidateFlag() {
		return withdrawCandidateFlag;
	}

	public void setWithdrawCandidateFlag(String withdrawCandidateFlag) {
		this.withdrawCandidateFlag = withdrawCandidateFlag;
	}

	public LocalDateTime getWithDrawAt() {
		return withDrawAt;
	}

	public void setWithDrawAt(LocalDateTime withDrawAt) {
		this.withDrawAt = withDrawAt;
	}

	public String getCandidateConfirmation() {
		return candidateConfirmation;
	}

	public void setCandidateConfirmation(String candidateConfirmation) {
		this.candidateConfirmation = candidateConfirmation;
	}

	

	public LocalDateTime getCandidateDeletedAt() {
		return candidateDeletedAt;
	}

	public void setCandidateDeletedAt(LocalDateTime candidateDeletedAt) {
		this.candidateDeletedAt = candidateDeletedAt;
	}

	@Override
	public String toString() {
		return "Candidate [candidateId=" + candidateId + ", symbol=" + symbol + ", partyName=" + partyName + ", votes="
				+ votes +"]";
	}

	public Candidate(int candidateId, String symbol,
			@NotBlank(message = "Party name should not be blank") @Pattern(regexp = "[a-zA-z]*", message = "Name should contain only character") String partyName,
			int votes, LocalDateTime createdat, LocalDateTime withDrawAt, String candidateConfirmation,
			LocalDateTime candidateDeletedAt, String withdrawCandidateFlag, User user, Election election) {
		super();
		this.candidateId = candidateId;
		this.symbol = symbol;
		this.partyName = partyName;
		this.votes = votes;
		this.createdat = createdat;
		this.withDrawAt = withDrawAt;
		this.candidateConfirmation = candidateConfirmation;
		this.candidateDeletedAt = candidateDeletedAt;
		this.withdrawCandidateFlag = withdrawCandidateFlag;
		this.user = user;
		this.election = election;
	}
	
	
	
	
	
}