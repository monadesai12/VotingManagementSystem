package com.vms.Service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vms.Entity.Election;
import com.vms.ExceptionHandaling.ElectionNotFoundException;
import com.vms.Repository.ElectionRepository;


@Service("ElectionService")
public class ElectionServiceImpl implements ElectionService{

	@Autowired 
	private ElectionRepository ed;
	
	@Override
	public List<Election> getAllElections() {
		return ed.findAll();
	}

	@Override
	public Election getElectionById(int id) throws ElectionNotFoundException {
		Election a = ed.findById(id).orElseThrow(() -> new ElectionNotFoundException("Election not found for this id :: " + id));
		return ed.findElectionById(id);
	}

//	@Override
//	public Boolean deleteElection(int id) throws ElectionNotFoundException {
//		Election a = ed.findById(id).orElseThrow(() -> new ElectionNotFoundException("Election not found for this id :: " + id));
//		ed.deleteById(id);
//		if(a == null)
//			return false;
//		else
//			return true;
//
//	}

	
	@Override
	public Boolean deleteElection(int id) throws ElectionNotFoundException {
		LocalDateTime ldt = LocalDateTime.now();
		Election a = ed.findById(id).orElseThrow(() -> new ElectionNotFoundException("Election not found for this id :: " + id));
		ed.deleteElection(id, ldt);
		if(a == null)
			return false;
		else
			return true;
	}
	@Override
	public Election addElection(Election c) {
		Election e = ed.saveAndFlush(c);
		if(e == null) {
			 new ElectionNotFoundException("Can not create Election Position ");
		}
		return e;
	}

	@Override
	public List<Election> getElectionByPositionName(String name) {
		// TODO Auto-generated method stub
		return ed.findElectionByName(name);
	}

	@Override
	public Election updateElection(Election Election, int id) throws ElectionNotFoundException {
		Election b = ed.findById(id).orElseThrow(() -> new ElectionNotFoundException("Election not found for this id :: " + id));
		Election a = ed.findElectionById(id);
		Election.setElectionId(a.getElectionId());
		ed.save(Election);
		return Election;
	}

	@Override
	public List<Election> viewAllElectionFlagService() {
		// TODO Auto-generated method stub
		return ed.viewAllElectionFlag();
	}
	
	@Override
	public Election annouceResult(int id) throws ElectionNotFoundException {
		Election b = ed.findById(id).orElseThrow(() -> new ElectionNotFoundException("Election not found for this id :: " + id));
		Election a = ed.findElectionById(id);
	
		//Election.setElectionId(a.getElectionId());
		a.setAnnouceResult("Y");
		ed.save(a);
		return a;
	}

	@Override
	public List<Election> viewResultByUser() {
		// TODO Auto-generated method stub
		return ed.viewResultByUser();
	}
	
	public Long countPositions() {
		return ed.countPosition();
	}
}