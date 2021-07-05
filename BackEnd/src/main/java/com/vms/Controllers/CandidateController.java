package com.vms.Controllers;

import java.util.List;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vms.Entity.Candidate;
import com.vms.ExceptionHandaling.CandidateNotFoundException;
import com.vms.Service.CandidateServiceImpl;
import com.vms.Service.MapValidationErrorService;

@CrossOrigin
@RestController
@RequestMapping("/candidate")
public class CandidateController {
	
	private Logger logger = LoggerFactory.getLogger(CandidateController.class);
	
	@Autowired
	private CandidateServiceImpl cservice;
	
	@Autowired
	private MapValidationErrorService mapValidationErrorService;
	
//	
//	@PostMapping("/nominate")
//	public String nominate(@Valid @RequestBody Candidate candidate) {
//		return cservice.nominateforElection(candidate);
//	}
	
//.......................Nominate As Candidate......................................................................
		
//	@PostMapping("/nominate")
//	public ResponseEntity<?> nominate(@Valid @RequestBody Candidate candidate, BindingResult result) {
//		ResponseEntity <?> errorMessage =mapValidationErrorService.mapValidationError(result);
//	    if(errorMessage!=null) return errorMessage;
//    	cservice.nominateforElection(candidate);
//    	return new ResponseEntity<String>("Nominated Successfully", HttpStatus.CREATED);			
//	}
	
	@PostMapping("/nominate")
	public ResponseEntity<?> nominate(@Valid @RequestBody Candidate candidate, BindingResult result) {
		List<Candidate> list = cservice.viewAllCandidate();
		boolean flag = false;
		for(Candidate c : list) {
			if(c.getUser().getId()== candidate.getUser().getId()) {
				flag = true;
			}
		}
		
		if(flag== true) {
			return new ResponseEntity<String>("You can Nominate only Once", HttpStatus.BAD_REQUEST);
		}else {
		
		ResponseEntity <?> errorMessage =mapValidationErrorService.mapValidationError(result);
	    if(errorMessage!=null) return errorMessage;
    	String s =cservice.nominateforElection(candidate);
    	return new ResponseEntity<String>(s, HttpStatus.CREATED);			
     }
	}
	
//	
	
//.......................Update Profile of  Candidate......................................................................
	
	
	@PutMapping("/updateprofile")
	public String updateProfile(@Valid  @RequestBody Candidate candidate) {
		return cservice.updateProfile(candidate);
		
	}
	
//.......................Get All details of Particular Candidate - (user)......................................................................
	
	@GetMapping("/getcandidatebyid/{id}")
	public Candidate getCandidatebyId(@Valid @PathVariable Integer id) throws CandidateNotFoundException {
		
			logger.info("Find Candidate by id");
			try
			{
				return cservice.getCandidatebyId(id);
			}
			catch(Exception exception)
			{
				throw new CandidateNotFoundException("Invalid Candidate Id");
			}
		
	}

//.......................Withdraw Candidate from election......................................................................
	
	@PutMapping("/withdraw/{id}")
	public String withdraw(@Valid @PathVariable Integer id) throws CandidateNotFoundException {
		logger.info("Withdraw from Election");
		try{
			cservice.getCandidatebyId(id);
		}catch(Exception exception) {
		
			throw new CandidateNotFoundException("Enter an existing candidate id to be withdrawn ");
		}
		return cservice.withdrawFromElection(id);
	}
	
//.......................View All Candidate as user......................................................................
	
	@GetMapping("/viewcandidates")
	public List<Candidate> viewAllCandidates(){
		return cservice.viewAllCandidate();
	}
	
//.......................View all candidate by admin......................................................................
	
	@GetMapping("/viewAllCandidate")
	public List<Candidate> getAllCandidates1()
	{
		return cservice.getAllCandidate();	
	}
	
//.......................View Specific Candidate by id by admin......................................................................
	
	@GetMapping("/viewAllCandidate/{candidateId}")
	public Candidate getAllCandidatesById(@PathVariable("candidateId") int candidateId)
	{
		return cservice.findByCandidateId(candidateId);	
	}
	
		
	//......................View Candidate by Party Name............................................................
		
		@GetMapping("/view/candidatePartyName/{partyName}")
		public List<Candidate> findByCandidatePartyNameCon(@PathVariable("partyName")String partyName)
		{
			return cservice.findByCandidatePartyNameSer(partyName);
			
		}
		
	//.......................Delete Candidate......................................................................
		
		@PutMapping("/cancelcandidate/{candidateId}")
		public String deletedCandidate(@PathVariable("candidateId")int candidateId){
			cservice.deleteCandidate(candidateId);
				return "Can not delete record";
		}
		
	////.......................Confirmation of Candidate................................................................
		
		@PutMapping("/confirmcandidate/{candidateId}")
		public String confirmCandidate(@PathVariable("candidateId")int candidateId){
			cservice.confirmCandidates(candidateId);
				return "candidate successfull.....";
		}
		
	// count all controller
		@GetMapping("/countcandidates")
		public Long countCandidate() {
			return cservice.countTotalCandidates();
		}
	
	
}