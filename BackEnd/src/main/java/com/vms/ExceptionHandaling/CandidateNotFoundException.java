package com.vms.ExceptionHandaling;

public class CandidateNotFoundException extends Exception {
	

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public CandidateNotFoundException() {
	}
	
	public CandidateNotFoundException(String message) {
		super(message);
	}
	
	
}