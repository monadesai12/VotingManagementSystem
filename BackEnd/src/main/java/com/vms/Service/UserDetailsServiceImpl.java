package com.vms.Service;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.vms.Entity.User;
import com.vms.Repository.UserRepository;

@Service
public class UserDetailsServiceImpl  implements UserDetailsService {
	
	  @Autowired
	  UserRepository userRepository;
	  
	  @Override
	  @Transactional
	  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
	    User user = userRepository.findByUsername(username)
	        .orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + username));

	    return UserDetailsImpl.build(user);
	  }
	  
	  public String registerUser(User user)
	  {		
		  BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
			String hashedPassword = passwordEncoder.encode(user.getPassword());
			User u = new User();
			u.setId(user.getId());
			u.setUsername(user.getUsername());
			u.setPassword(hashedPassword);
			u.setRole("ROLE_USER");
			u.setAddress(user.getAddress());
			u.setAdharCardNumber(user.getAdharCardNumber());
			u.setAge(user.getAge());
			u.setFirstName(user.getFirstName());
			u.setLastName(user.getLastName());
			u.setGender(user.getGender());
			u.setPincode(user.getPincode());
			u.setMobileNumber(user.getMobileNumber());
			u.setEmail(user.getEmail());
		    userRepository.save(u);
		    return "User Registered Successfully";
		    
	  }
	  
	  

}
