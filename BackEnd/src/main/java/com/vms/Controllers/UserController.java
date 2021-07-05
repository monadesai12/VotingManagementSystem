package com.vms.Controllers;

import org.jboss.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.vms.Entity.User;
import com.vms.ExceptionHandaling.ElectionNotFoundException;
import com.vms.ExceptionHandaling.UserNotFoundException;
import com.vms.Service.UserServiceOperation;

import java.util.List;


@CrossOrigin
@RestController
public class UserController {
	
	@Autowired
	UserServiceOperation userService;
	
	static Logger logger = Logger.getLogger(UserController.class.getName());

//...........................View List of all Voters....................................................
	
    @GetMapping("/listAllVoters")
	  private List<User> getAllVoterList(){
		  logger.info("List of All Voters");
		return userService.getAllVoters();
	  }
  
//..........................search particular voter........................................................
    
    @GetMapping("viewvoterByid/{id}")
    	public User getuserByid(@PathVariable("id") Long id)
    	{
    		logger.info("Getting voter info by id");
    		return userService.getuserByid(id);
    	}


//...........................delete voter by id.............................................................
    @PutMapping("/deletevoter/{id}")
    public String deletevoter(@PathVariable("id") Long id) throws UserNotFoundException{
		if(userService.deletevoter(id))
			return "User(Voter) deleted Successfully";
		else
			return "Unable to delete User";
	}
       

//...........................................................................................................

		@PutMapping("/updateUser/{id}")
		public String UpdateUserProfile(@RequestBody User user, @PathVariable Long id) {
			return userService.updateUser(user, id);
		}
		
		// count total users registered
		@GetMapping("/countusers")
	    public Long countTotalVoters() {
	    	return userService.countTotalUsers();
	    }
}