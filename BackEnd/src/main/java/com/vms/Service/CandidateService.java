package com.vms.Service;

import java.time.LocalDateTime;
import java.util.List;


import com.vms.Entity.Candidate;

public interface CandidateService {
	
	public String nominateforElection(Candidate candidate);
	public String withdrawFromElection(Integer id);
	public String updateProfile(Candidate candidate);
	public Candidate getCandidatebyId(Integer id);
	public List<Candidate> viewAllCandidate();
	public List<Candidate> getAllCandidate();
	public String updateCandidate(Candidate candidate);
	
	
}