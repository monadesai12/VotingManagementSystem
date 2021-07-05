package com.vms.Service;

import java.util.List;

import com.vms.Entity.Election;
import com.vms.ExceptionHandaling.ElectionNotFoundException;

public interface ElectionService {

	public List<Election> getAllElections();
	public Election getElectionById(int id) throws ElectionNotFoundException;
	public Boolean deleteElection(int id) throws ElectionNotFoundException;
	public Election addElection(Election c);
	public List<Election> viewAllElectionFlagService();
	public List<Election> getElectionByPositionName(String name);
	public Election updateElection(Election Election,int id) throws ElectionNotFoundException;
	//public Election annouceResult(Election Election, int id) throws ElectionNotFoundException;
	Election annouceResult(int id) throws ElectionNotFoundException;
	List<Election> viewResultByUser();
}