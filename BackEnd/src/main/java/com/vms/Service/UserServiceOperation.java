package com.vms.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.vms.Entity.Election;
import com.vms.Entity.User;
import com.vms.ExceptionHandaling.ElectionNotFoundException;
import com.vms.ExceptionHandaling.UserNotFoundException;
import com.vms.Repository.UserRepository;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class UserServiceOperation {

		@Autowired
		UserRepository userRepository;
		
		
		public List<User> getAllVoters() {
			List<User> user=new ArrayList<User>();
			userRepository.findAllUser().forEach(user1 -> user.add(user1));
			return user;
		
		}
		
		public Boolean deletevoter(Long id) throws UserNotFoundException {
			LocalDateTime userDeletedAt = LocalDateTime.now();
			User user = userRepository.findById(id).orElseThrow(() -> new UserNotFoundException("Election not found for this id :: " + id));
			userRepository.deleteVoter(id, userDeletedAt);
			if(user == null)
				return false;
			else
				return true;
		}
		

		public User getuserByid(Long id) {
			return userRepository.finduserByid(id);
		}
		
		public String updateUser(User user , Long id) {

			
			
				User u1 = userRepository.finduserByid(id);
				if(!(user.getFirstName()== null))
					u1.setFirstName(user.getFirstName());
					
					if(!(user.getLastName()== null))
						u1.setLastName(user.getLastName());
					
					if(!(user.getAddress()== null))
						u1.setAddress(user.getAddress());
					
					if(!(user.getMobileNumber()== null))
						u1.setMobileNumber(user.getMobileNumber());
					
					
					if(!(user.getPincode()== null))
						u1.setPincode(user.getPincode());
					
					if(!(user.getEmail()==null))
				     	u1.setEmail(user.getEmail());
					
				userRepository.save(u1);
				return "Updated Successfully";
				
			}
		
		public Long countTotalUsers() {
			return userRepository.countUsers();
		
		}
			
		
	}

		
		



