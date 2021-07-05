package com.vms.Controllers;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vms.Entity.Election;
import com.vms.ExceptionHandaling.ElectionNotFoundException;
import com.vms.Service.ElectionService;
import com.vms.Service.ElectionServiceImpl;
import com.vms.Service.MapValidationErrorService;

@CrossOrigin
@RestController
@RequestMapping("/election")
public class ElectionController {

	@Autowired
	private ElectionServiceImpl es;
	
//	@PostMapping("createElection")
//	public Election createElectionController(@Valid @RequestBody Election Election) {
//		
//		return es.addElection(Election);		
//	}
//	
	@Autowired
	private MapValidationErrorService mapValidationErrorService;
	
//.........................................Create Election....................................................
	
	@PostMapping("createElection")
	public ResponseEntity<?> createElectionController(@Valid @RequestBody Election Election, BindingResult result) {
		ResponseEntity <?> errorMessage =mapValidationErrorService.mapValidationError(result);
	    if(errorMessage!=null) return errorMessage;
    	es.addElection(Election);
    	return new ResponseEntity<String>("Election Created", HttpStatus.CREATED);
				
	}

//.........................................View Specific Election by id....................................................
	
	@GetMapping("viewElectionById/{id}")
	public Election viewElectionByIdController(@PathVariable("id") int id) throws ElectionNotFoundException{
		Election a = es.getElectionById(id);
		return a;
	}
	
//	@DeleteMapping("deleteElectionById/{id}")
//	public String deleteElectionByIdController(@PathVariable("id") int id) throws ElectionNotFoundException{
//		if(es.deleteElection(id))
//			return "Record deleted Successfully";
//		else
//			return "Can not delete record";
//	}
	
//.........................................Delete Election by id....................................................
	
	@PutMapping("deleteElectionById/{id}")
	public String deleteElectionByIdController(@PathVariable("id") int id) throws ElectionNotFoundException{
		if(es.deleteElection(id))
			return "Record deleted Successfully";
		else
			return "Can not delete record";
	}
	
//.........................................Update Election by id....................................................
	
	@PutMapping("updateElection/{id}")
	public ResponseEntity<?> updateElectionController(@Valid @RequestBody Election Election , BindingResult result, @PathVariable("id") int id) throws ElectionNotFoundException {
		ResponseEntity <?> errorMessage =mapValidationErrorService.mapValidationError(result);
	    if(errorMessage!=null) return errorMessage;
    	es.updateElection(Election, id);
    	return new ResponseEntity<String>("Election Updated", HttpStatus.OK);
				
	}

	
//	  @GetMapping("listAllElectionAll") 
//	  public List<Election>listAllElectionController()
//	  {
//		  return es.getAllElections(); 
//	  }
	 
//.........................................View All Election....................................................
	
	@GetMapping("listAllElection")
	public List<Election> listAllElectionFlagController(){
		return es.viewAllElectionFlagService();
	}
	

	@PutMapping("AnnounceResult/{id}")
	public ResponseEntity<?>  AnnounceResult(@PathVariable("id") int id) throws ElectionNotFoundException{
		es.annouceResult(id);
		return new ResponseEntity<String>("Result Announced.", HttpStatus.OK);
	}
	
	 @GetMapping("ViewResultByUser") 
	  public List<Election> ViewResultByUser()
	  {
		  return es.viewResultByUser(); 
	  }
	
//.........................................View Specific Election by name....................................................
	
	@GetMapping("viewElectionByName/{name}")
	public List<Election> viewElectionByNameController(@PathVariable("name") String name){
		List<Election> a = es.getElectionByPositionName(name);
		return a;
	}
	
	// count all election
	@GetMapping("/countpositions")
	public Long countPosition() {
		return es.countPositions();
	}
}