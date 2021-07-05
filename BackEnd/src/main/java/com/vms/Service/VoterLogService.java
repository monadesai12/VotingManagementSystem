package com.vms.Service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.vms.Entity.Candidate;
import com.vms.Entity.VoterLogs;

@Service
public interface VoterLogService {

	public VoterLogs giveVote(VoterLogs v);
	public long getCount();
	public List<VoterLogs> getAllVotes();
	//public Candidate getResult();
	public List<Candidate> viewCandidateByElectionId(int electionId);
	
	//count
	public Long countVoter();
}