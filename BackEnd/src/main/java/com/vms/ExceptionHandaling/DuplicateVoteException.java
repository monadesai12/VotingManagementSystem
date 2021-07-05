package com.vms.ExceptionHandaling;

public class DuplicateVoteException extends Exception {
	public DuplicateVoteException(String s) {
		super(s);
	}

}
