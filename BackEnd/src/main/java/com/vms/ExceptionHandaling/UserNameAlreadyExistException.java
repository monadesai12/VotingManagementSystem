package com.vms.ExceptionHandaling;

public class UserNameAlreadyExistException extends Exception{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public UserNameAlreadyExistException(String msg)
	{
		super(msg);
	}

}
