package com.vms.Repository;

import java.time.LocalDateTime;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.vms.Entity.Election;
@Repository("ElectionRepository")
public interface ElectionRepository extends JpaRepository<Election, Integer> {

	@Transactional
	@Modifying
	@Query("UPDATE Election p SET p.deletedFlag='Y', p.electionDeletedAt=?2  where p.electionId=?1")
	public void deleteElection(int id, LocalDateTime electionDeletedAt);
	
	@Query("select a from Election a where a.deletedFlag = 'N'")
	public List<Election> viewAllElectionFlag();
	
	@Query("select a from Election a where a.electionId = ?1 AND a.deletedFlag = 'N'")
	public Election findElectionById(int id);
	
	@Query("select a from Election a where a.positionName LIKE %?1% AND a.deletedFlag = 'N'")
	public List<Election> findElectionByName(String Name);
	
	@Query("select a from Election a where a.deletedFlag = 'N' AND a.annouceResult = 'Y'")
	public List<Election> viewResultByUser();
	
	//count
	@Query("SELECT COUNT(e) FROM Election e where e.deletedFlag = 'N' ")
	public Long countPosition();



}