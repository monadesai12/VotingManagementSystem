package com.vms.Controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.vms.Service.UserDetailsServiceImpl;
import com.vms.jwt.AuthEntryPointJwt;
import com.vms.jwt.AuthTokenFilter;

	@Configuration
	@EnableWebSecurity
	@EnableGlobalMethodSecurity(
			// securedEnabled = true,
			// jsr250Enabled = true,
			prePostEnabled = true)
	public class SecurityConfigurer extends WebSecurityConfigurerAdapter {
		@Autowired
		UserDetailsServiceImpl userDetailsService;

		@Autowired
		private AuthEntryPointJwt unauthorizedHandler;

		@Bean
		public AuthTokenFilter authenticationJwtTokenFilter() {
			return new AuthTokenFilter();
		}

		@Override
		public void configure(AuthenticationManagerBuilder authenticationManagerBuilder) throws Exception {
			authenticationManagerBuilder.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());
		}

		@Bean
		@Override
		public AuthenticationManager authenticationManagerBean() throws Exception {
			return super.authenticationManagerBean();
		}

		@Bean
		public PasswordEncoder passwordEncoder() {
			return new BCryptPasswordEncoder();
		}

		@Override
		protected void configure(HttpSecurity http) throws Exception {
			http.cors().and().csrf().disable()
				.exceptionHandling().authenticationEntryPoint(unauthorizedHandler).and()
				.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
				.authorizeRequests().antMatchers("/auth/**").permitAll()
				.antMatchers("/api/test/**").permitAll()
//				.antMatchers("/","/register","/listAllVoters","/deletevoter/{id}","/voting/allResults","/election/listAllElection","/candidate/nominate",
//						"/election/listAllElection","/election/deleteElectionById/{id}","/voting/allResults","/voting/candidateByElectionId/{electionId}","/voting/giveVote","/voting/resultByEId/{electionId}"
//						,"/election/deleteElectionById/{id}","/listAllVoters","/withdraw/{id}","/viewCandidatebyId/{candidateId}","/candidate/nominate","/updateUser/{id}","/viewvoterByid/{id}"
//						,"/election/listAllElection","/election/viewElectionById/{id}","/election/deleteElectionById/{id}","/election/createElection","/election/updateElection/{id}"
//						,"/candidate/getcandidatebyid/{id}",
//		                   "/candidate/viewAllCandidate",
//		                   "/candidate/confirmcandidate/{candidateId}",
//		                   "/candidate/cancelcandidate/{candidateId}"
//		                   ,"/candidate/viewCandidateById/{candidateId}"
//		                   ,"/candidate/cancelcandidate/{candidateId}",
//		                   "/election/AnnounceResult/{id}","/election/ViewResultByUser",
//		                   "/candidate/nominate","/updateUser/{id}","/viewvoterByid/{id}","/countusers","/candidate/countcandidates","/election/countpositions","/voting/countvoters","/voting/winnerByEId/{electionId}"
				.antMatchers("/","/register"	).permitAll()
				.anyRequest().authenticated();
			http.addFilterBefore(authenticationJwtTokenFilter(), UsernamePasswordAuthenticationFilter.class);
			//http.addFilterBefore(authenticationJwtTokenFilter(), UsernamePasswordAuthenticationFilter.class);
		}
	}

