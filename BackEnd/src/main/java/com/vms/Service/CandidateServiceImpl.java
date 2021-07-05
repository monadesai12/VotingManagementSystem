package com.vms.Service;

import java.io.Console;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vms.Entity.Candidate;
import com.vms.Entity.Election;
import com.vms.Entity.User;
import com.vms.Entity.VoterLogs;
import com.vms.Repository.CandidateRepository;
import com.vms.Repository.ElectionRepository;
import com.vms.Repository.UserRepository;
import com.vms.Repository.VoterLogsRepo;

@Service("candidateservice")
public class CandidateServiceImpl implements CandidateService{
	
	@Autowired
	private CandidateRepository crepo;
	
	@Autowired
	private UserRepository urepo;
	
	@Autowired
	private ElectionRepository erepo;
	
	@Autowired
	private VoterLogsRepo vrepo;

	@Override
	public String nominateforElection(Candidate candidate) {
		crepo.saveAndFlush(candidate);
		return "Nominated Successfully";
	}

	@Override
	public String withdrawFromElection(Integer id) {
		LocalDateTime deletedat = LocalDateTime.now();
		crepo.withdrawbyId(id,deletedat);
		return "Withdrawn Successfully" ;
	}

	@Override
	public String updateProfile(Candidate candidate) {
		crepo.saveAndFlush(candidate);
		return "Profile updated Successfully";
	}

	@Override
	public Candidate getCandidatebyId(Integer id) {
		Optional<Candidate> optional = crepo.findById(id);
		return optional.get();
		
	}
	
	// nilam
	
	@Override
	public List<Candidate> viewAllCandidate() {
		return crepo.viewAllCandidates();
	}
	

	@Override
	public String updateCandidate(Candidate candidate) {
		int id=candidate.getCandidateId();
		Candidate c=crepo.getById(id);
		int vote=c.getVotes();
		
		
		User u=urepo.findById(candidate.getUser().getId()).get();
		
		System.out.println(u.getId());
		Election e=erepo.findById(candidate.getElection().getElectionId()).get();
		List<VoterLogs> v2=vrepo.alreadyExist(u.getId(), e.getElectionId());
		
		if(v2.size()==1) {
			return "alredy voted";
		}
		else {
		c.setVotes(vote + 1);
		crepo.save(c);
		
		VoterLogs v=new VoterLogs();
		v.setUser(u);
		v.setElection(e);
		v.setCandidate(c);
		vrepo.save(v);
		return "voted successful";
		}
		
	}
	

	public Candidate findByCandidateId(int candidateId) {
		
		return (Candidate) crepo.findCandidateById(candidateId);
	}

	
	//nilam
	public List<Candidate> getAllCandidate() {
		
		List<Candidate> clist=new ArrayList<Candidate>();
		crepo.findAllCandidates()
		.forEach(clist1 -> clist.add(clist1));
		return clist;
	}

	
	public List<Candidate> findByCandidatePartyNameSer(String partyName)
	{
		return crepo.findByCandidatePartyName(partyName);
	}
	
	public String deleteCandidate(int candidateId) {
		
		LocalDateTime ldt = LocalDateTime.now();
		Optional<Candidate> cand= crepo.findById(candidateId);
		crepo.deleteCandidate(candidateId, ldt);
		return "candidate deleted......";
	}
	
	public String confirmCandidates(int candidateId) {
		Optional<Candidate> cands= crepo.findById(candidateId);
		crepo.confirmCandidate(candidateId);
//		int flag=0;
//		if()
		return "candidate confirmed......";
	}
	
	// count
	public Long countTotalCandidates() {
		return crepo.countCandidates();
	}
	
}

