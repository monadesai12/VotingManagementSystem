package com.vms.Repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.vms.Entity.VoterLogs;

@Repository
public interface VoterLogsRepo extends JpaRepository<VoterLogs, Integer>{

	@Query("select c from VoterLogs c where c.user.id=?1 AND c.election.electionId=?2")
	public List<VoterLogs> alreadyExist(Long id, int electionId);
	
	//count
	
	@Query("SELECT COUNT(v) FROM VoterLogs v")
	public Long countvoters();
	
}