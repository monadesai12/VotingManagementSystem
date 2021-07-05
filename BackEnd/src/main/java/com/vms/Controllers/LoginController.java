package com.vms.Controllers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.vms.Entity.User;
import com.vms.ExceptionHandaling.UserNameAlreadyExistException;
import com.vms.Repository.UserRepository;
import com.vms.Service.MapValidationErrorService;
import com.vms.Service.UserDetailsServiceImpl;
import javax.validation.Valid;

@CrossOrigin
@RestController
public class LoginController {
	
	@Autowired
	UserDetailsServiceImpl userDetailsService;
	
	@Autowired
	MapValidationErrorService mapValidationErrorService;
	
	@Autowired
	UserRepository userRepository;

    @GetMapping("/")
    public String mainPage() {
    	return "Main Page";
    }
    
    @GetMapping("/user")
    @PreAuthorize("hasRole('ROLE_USER')")
    public String customerPage() {
    	return "Users Page";
    }
    
    @GetMapping("/admin")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public String adminPage() {
    	return "Admin Page";
    }
    
    @PreAuthorize("hasRole('ROLE_CANDIDATE')")
    @GetMapping("/candidate")
    public String managerPage() {
    	return "Candidate Page";
    }
    
    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody User user, BindingResult result) throws UserNameAlreadyExistException
    {	ResponseEntity <?> errorMessage =mapValidationErrorService.mapValidationError(result);
	    if(errorMessage!=null) return errorMessage;
	    
	    if (userRepository.existsByUsername(user.getUsername())) {
	    	
	            throw new UserNameAlreadyExistException("Username Already Exist !");
	     }
	    if (userRepository.existsByadharCardNumber(user.getAdharCardNumber())) {
            throw new UserNameAlreadyExistException("Aadharcard number is already registered");
          }
    	String msg = userDetailsService.registerUser(user);
    	return new ResponseEntity<String>(msg, HttpStatus.CREATED);
	 
    }
 
}


