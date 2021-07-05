package com.vms;

import static org.mockito.Mockito.times;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;

import com.vms.Entity.User;
import com.vms.Repository.UserRepository;
import com.vms.Service.UserDetailsServiceImpl;


public class AuthTest {
	
	@Mock //- mock bean
	private UserRepository userRepository;
	
	@Autowired
	@InjectMocks // mock bean injection
	private UserDetailsServiceImpl userDetailsServiceImpl;
	
	private User user;
	
	@BeforeEach
	public void setUp() {
	MockitoAnnotations.openMocks(this); //invoke mock
	//user=new User("Soniya","Mishra",21, "8652595538","F","223412341234","abc def","400070","soniya@gmail.com","soni","soni123",null,null,null,null);
	}
	
	@AfterEach
	public void tearDown() {
	userRepository.deleteAll();
	}
	
    @Test
    public void createEmployeeTest()
    {
    	user=new User("Soniya","Mishra",21, "8652595538","F","223412341234","abc def","400070","soniya@gmail.com","soni","soni123",null,null,null,null);
    	
         
      String msg = userDetailsServiceImpl.registerUser(user);
         
       
    }
}
