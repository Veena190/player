package com.example.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.util.PlayersDTO;

@Repository
public interface PlayersDAO extends JpaRepository<PlayersDTO, Integer> {
	
	List<PlayersDTO> findAll();

}
