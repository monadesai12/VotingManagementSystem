package com.vms.Entity;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonBackReference;


@Entity
@Table(name = "election")
public class Election implements Serializable{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int electionId;
	
	@NotBlank(message = "Position name should not be blank")
	@Pattern(regexp = "^[a-zA-Z ]+$", message="Position Name should only contain alphabets")
	@Column(unique = true)
	private String positionName;
	
	@NotBlank(message = "Position description should not be blank")
	private String description;
	
	@NotNull(message = "Please provide an election date.")
	private LocalDateTime electionDate;
	
	@NotNull(message = "Please a start nomination date.")
	private LocalDateTime startNominationDate;
	
	@NotNull(message = "Please provide a end nomination date.")
	private LocalDateTime endNominationDate;
	
	@CreationTimestamp
	private LocalDateTime electionCreatedAt;
	private LocalDateTime electionDeletedAt;
	private String deletedFlag="N";
	
	private String annouceResult="N";
	
    @JsonBackReference("candidate")
	@OneToMany(mappedBy = "election", fetch = FetchType.LAZY,cascade = CascadeType.ALL)
	private List<Candidate> candidate;
	
		public Election() {
		super();
		// TODO Auto-generated constructor stub
	}

		public int getElectionId() {
			return electionId;
		}

		public void setElectionId(int electionId) {
			this.electionId = electionId;
		}

		public String getPositionName() {
			return positionName;
		}

		public void setPositionName(String positionName) {
			this.positionName = positionName;
		}

		public String getDescription() {
			return description;
		}

		public void setDescription(String description) {
			this.description = description;
		}

		public LocalDateTime getElectionDate() {
			return electionDate;
		}

		public void setElectionDate(LocalDateTime electionDate) {
			this.electionDate = electionDate;
		}

		public LocalDateTime getStartNominationDate() {
			return startNominationDate;
		}

		public void setStartNominationDate(LocalDateTime startNominationDate) {
			this.startNominationDate = startNominationDate;
		}

		public LocalDateTime getEndNominationDate() {
			return endNominationDate;
		}

		public void setEndNominationDate(LocalDateTime endNominationDate) {
			this.endNominationDate = endNominationDate;
		}

		public LocalDateTime getElectionDeletedAt() {
			return electionDeletedAt;
		}

		public void setElectionDeletedAt(LocalDateTime electionDeletedAt) {
			this.electionDeletedAt = electionDeletedAt;
		}

		public String getDeletedFlag() {
			return deletedFlag;
		}

		public void setDeletedFlag(String deletedFlag) {
			this.deletedFlag = deletedFlag;
		}
		
		
		
		public String getAnnouceResult() {
			return annouceResult;
		}

		public void setAnnouceResult(String annouceResult) {
			this.annouceResult = annouceResult;
		}

		public Election(int electionId, @NotBlank(message = "Position name should not be blank") String positionName,
				@NotBlank(message = "Position description should not be blank") String description,
				@NotNull(message = "Please provide an election date.") LocalDateTime electionDate,
				@NotNull(message = "Please a start nomination date.") LocalDateTime startNominationDate,
				@NotNull(message = "Please provide a end nomination date.") LocalDateTime endNominationDate,
				LocalDateTime electionCreatedAt, LocalDateTime electionDeletedAt, String deletedFlag) {
			super();
			this.electionId = electionId;
			this.positionName = positionName;
			this.description = description;
			this.electionDate = electionDate;
			this.startNominationDate = startNominationDate;
			this.endNominationDate = endNominationDate;
			this.electionCreatedAt = electionCreatedAt;
			this.electionDeletedAt = electionDeletedAt;
			this.deletedFlag = deletedFlag;
		}
		
		


}
