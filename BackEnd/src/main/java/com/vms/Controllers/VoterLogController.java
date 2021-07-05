package com.vms.Controllers;

import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vms.Entity.Candidate;
import com.vms.Entity.Election;
import com.vms.Service.CandidateService;
import com.vms.Service.ElectionService;
import com.vms.Service.VoterLogService;

@CrossOrigin
@RestController
@RequestMapping("/voting")

public class VoterLogController {
	@Autowired
	CandidateService cser;
	@Autowired
	ElectionService eser;
	@Autowired
	VoterLogService vser;

//.........................................view All Election....................................................
	
	@GetMapping("viewAllElection")
	public List<Election> viewAll() {
		List<Election> e = eser.viewAllElectionFlagService();
		return e;
	}

//.........................................Give Vote...........................................................
	
	@PutMapping("/giveVote")
	public  String giveVote(@RequestBody Candidate candidate) {
		return cser.updateCandidate(candidate);
		
	}


//.........................................View All results..........................................................
	
	
	@GetMapping("/allResults")
	public List<Candidate> getResult(){
		List<Candidate> cl=cser.viewAllCandidate();
		Collections.sort(cl,new Comparator<Candidate>() {

			@Override
			public int compare(Candidate o1, Candidate o2) {
				return o2.getVotes()-o1.getVotes();
			}
		});
		return cl;
	}
	
//.........................................Candidate By election Id..........................................................
	
	@GetMapping("/candidateByElectionId/{electionId}")
	public List<Candidate> getCandidate(@PathVariable("electionId") int electionId){
		List<Candidate> c=  vser.viewCandidateByElectionId( electionId);
		return c;
	}
	
//.........................................result by Election Id..........................................................
		
	@GetMapping("/resultByEId/{electionId}")
	public List<Candidate> getResultByElection(@PathVariable("electionId") int electionId){
		List<Candidate> cl=  vser.viewCandidateByElectionId( electionId);
		Collections.sort(cl,new Comparator<Candidate>() {

			@Override
			public int compare(Candidate o1, Candidate o2) {
				return o2.getVotes()-o1.getVotes();
			}
		});
		return cl;
	}
	
	// count all users voted
	@GetMapping("/countvoters")
	public Long countVoter() {
		return vser.countVoter();
	}
	
	// get winner by election ID
	@GetMapping("/winnerByEId/{electionId}")
	public Candidate getWinnerByElection(@PathVariable("electionId") int electionId){
		List<Candidate> cl=  vser.viewCandidateByElectionId( electionId);
		Collections.sort(cl,new Comparator<Candidate>() {

			@Override
			public int compare(Candidate o1, Candidate o2) {
				return o2.getVotes()-o1.getVotes();
			}
		}); 
		return cl.get(0);
	}
}
/*
 * @GetMapping("/allResults") public LinkedHashMap<Candidate, Integer>
 * getResults() { LinkedHashMap<Candidate, Integer> lm = new
 * LinkedHashMap<Candidate, Integer>(); ArrayList<Candidate> cl =
 * (ArrayList<Candidate>) cser.getAllCandidate(); Collections.sort(cl, new
 * Comparator<Candidate>() {
 * 
 * @Override public int compare(Candidate o1, Candidate o2) { return
 * o2.getVotes() - o1.getVotes(); } }); for (Candidate i : cl) { int votes =
 * i.getVotes(); lm.put(i, votes); } return lm; }
 */