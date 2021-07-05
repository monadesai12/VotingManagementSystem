package com.vms.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.vms.Entity.User;

@Repository
public interface UserRepository  extends JpaRepository<User,Long>{
	
	Optional<User> findByUsername(String username);

	  Boolean existsByUsername(String username);
	  
	  Boolean existsByadharCardNumber(String adharCardNumber);
	  
		  
	  // monika 
	  @Transactional
		@Modifying
		@Query("UPDATE User p set p.deleteUserFlag='Y', p.userDeletedAt=?2  where p.id=?1")
		public int deleteVoter(Long id, LocalDateTime userDeletedAt);
		
		@Query("select p from User p where p.deleteUserFlag= 'N' AND p.role = 'ROLE_USER'")
		List<User> findAllUser();
		
		@Query("select a from User a where a.id = ?1 AND a.deleteUserFlag = 'N'")
		public User finduserByid(Long id);
		
		//count
		@Query("SELECT COUNT(u) FROM User u where u.deleteUserFlag = 'N' AND u.role = 'ROLE_USER' ")
		public  Long countUsers();


}
