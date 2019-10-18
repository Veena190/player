package com.example.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.util.PlayersVO;

@Service
public interface Services {
	
	public List<PlayersVO> getP();

	public PlayersVO getPId(int id);

	public String saveP(PlayersVO vo);

	public String editP(PlayersVO vo);

	public String delP(int id);

}
