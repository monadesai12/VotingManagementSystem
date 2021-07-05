package com.vms.Repository;

import java.time.LocalDateTime;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.vms.Entity.Candidate;

@Repository("candidaterepo")
public interface CandidateRepository extends JpaRepository<Candidate, Integer>{

	//Candidate withdraw
	@Transactional
	@Modifying
	@Query("UPDATE Candidate c SET c.withdrawCandidateFlag ='Y', c.withDrawAt=?2  where c.candidateId=?1")
	public void withdrawbyId(Integer id, LocalDateTime withDrawAt);
	
	
	@Query("SELECT c from Candidate c WHERE c.withdrawCandidateFlag ='N'")
	public List<Candidate> viewAllCandidates();

	
	@Transactional
	@Modifying
	@Query("UPDATE Candidate c SET c.votes=?2 where c.candidateId=?1")
	public void addVote(int id,int count);
	
	@Transactional
	@Modifying
	@Query("select c from Candidate c where c.candidateConfirmation='CONFIRM' OR c.candidateConfirmation='PENDING' AND c.withdrawCandidateFlag ='N'")
	public List<Candidate> findAllCandidates();
	

	@Query("select c from Candidate c where c.candidateId =?1 AND c.candidateConfirmation='CONFIRM'")
	public Candidate findCandidateById(int candidateId);

	
	@Transactional
	@Query("Select c from Candidate c where c.election.electionId =?1 AND c.candidateConfirmation='CONFIRM' ")
	public List<Candidate> candidateByElectionId(int electionId);
	
	@Transactional
	@Query("Select c from Candidate c where c.election.electionId =?1 AND c.candidateConfirmation='CONFIRM'")
	public List<Candidate> candidateFindByElectionId(int electionId,LocalDateTime l1);
	
	//nilam
	
	@Transactional
	@Modifying
	@Query("UPDATE Candidate c set c.candidateConfirmation='CANCEL', c.candidateDeletedAt=?2 where c.candidateId=?1 AND c.candidateConfirmation='PENDING'")
	public int deleteCandidate(int candidateId,LocalDateTime candidateDeletedAt);

	@Query("select c from Candidate c where c.partyName LIKE %?1% AND c.candidateConfirmation='CONFIRM'")
	public List<Candidate> findByCandidatePartyName(String partyName);


	@Transactional
	@Modifying
	@Query("UPDATE Candidate c set c.candidateConfirmation='CONFIRM' where c.candidateId=?1 AND c.candidateConfirmation='PENDING'")
	public int confirmCandidate(int candidateId);

	
	// count 
	
	@Query("SELECT COUNT(c) FROM Candidate c where c.candidateConfirmation ='CONFIRM'")
	public  Long countCandidates();

}