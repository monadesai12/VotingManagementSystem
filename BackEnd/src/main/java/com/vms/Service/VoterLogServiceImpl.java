package com.vms.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vms.Entity.Candidate;
import com.vms.Entity.VoterLogs;
import com.vms.Repository.CandidateRepository;
import com.vms.Repository.VoterLogsRepo;

@Service
public class VoterLogServiceImpl implements VoterLogService {
	Integer vote = 0;
	Map<Integer, Integer> result = new HashMap<Integer, Integer>();
	@Autowired
	private VoterLogsRepo vdao;

	@Autowired
	private CandidateRepository crepo;
	
	@Override
	public long getCount() {
		Map<Integer, Integer> m = new HashMap<Integer, Integer>();
		long c = vdao.count();
		return c;
	}

	@Override
	public List<VoterLogs> getAllVotes() {
		return vdao.findAll();
	}

	@Override
	public VoterLogs giveVote(VoterLogs v) {
		vdao.saveAndFlush(v);
		return v;
	}

	@Override
	public List<Candidate> viewCandidateByElectionId(int electionId) {
		LocalDateTime l1 = LocalDateTime.now();
		System.out.println(l1);
		return crepo.candidateFindByElectionId(electionId,l1);
		
		
	}

	// count
	
	@Override
	public Long countVoter() {
		return vdao.countvoters();
	}

}