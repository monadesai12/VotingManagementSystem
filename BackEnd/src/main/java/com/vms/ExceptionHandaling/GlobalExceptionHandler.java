package com.vms.ExceptionHandaling;

import javax.servlet.http.HttpServletRequest;
import javax.validation.ConstraintViolationException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class GlobalExceptionHandler {
	
	@ExceptionHandler(CandidateNotFoundException.class)
	@ResponseStatus(value = HttpStatus.NOT_FOUND)
	@ResponseBody
	public ErrorInfo handleCandidateNotFoundException(CandidateNotFoundException e, HttpServletRequest request) {
	
		
		ErrorInfo error = new ErrorInfo();    // create instance of ErrorInfo
		error.setUrl(request.getRequestURI());   
		error.setMessage(e.getMessage()); 
		
		return error;
	}
     

	@ResponseStatus(value = HttpStatus.BAD_REQUEST)
	@ExceptionHandler(ConstraintViolationException.class)
	public ResponseEntity<String> handleConstraintViolationException(ConstraintViolationException e)
	{
		return new ResponseEntity<>("Validation error on path paramter " + e.getMessage(), HttpStatus.BAD_REQUEST);
	}
	
	
	@ResponseStatus(value = HttpStatus.BAD_REQUEST)
	@ExceptionHandler(BindException.class)
	public ResponseEntity<String> handleBindException(BindException e)
	{
		return new ResponseEntity<>("Bind error on path paramter", HttpStatus.BAD_REQUEST);
	}
	
	@ExceptionHandler(UserNameAlreadyExistException.class)
	@ResponseStatus(value = HttpStatus.BAD_REQUEST)
	@ResponseBody
	public ErrorInfo handleUserNameAlreadyExist(UserNameAlreadyExistException e, HttpServletRequest request) {
	
		
		ErrorInfo error = new ErrorInfo();    // create instance of ErrorInfo
		error.setUrl(request.getRequestURI());   
		error.setMessage(e.getMessage()); 
		
		return error;
	}
     
	
	
	
}