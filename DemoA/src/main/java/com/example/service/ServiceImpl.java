package com.example.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.dao.PlayersDAO;
import com.example.util.PlayersDTO;
import com.example.util.PlayersVO;

@Service
public class ServiceImpl implements Services {
	
	@Autowired
	private PlayersDAO playersDAO;

	@Override
	public List<PlayersVO> getP() {

		List<PlayersVO> vo = new ArrayList<>();
		List<PlayersDTO> dto = playersDAO.findAll();
		for (PlayersDTO playersDTO : dto) {
			PlayersVO v = new PlayersVO();
			v.setId(playersDTO.getId());
			v.setName(playersDTO.getName());
			vo.add(v);
			System.out.println(v.getName());
		}
		return vo;
	}

	@Override
	public PlayersVO getPId(int id) {
		Optional<PlayersDTO> dto = playersDAO.findById(id);
		PlayersVO v = new PlayersVO();
		v.setId(dto.get().getId());
		v.setName(dto.get().getName());
		return v;
	}

	@Override
	public String editP(PlayersVO vo) {
		PlayersDTO dto = new PlayersDTO();
		dto.setId(vo.getId());
		dto.setName(vo.getName());
		dto.setImage(vo.getImage());
		Optional<PlayersDTO> d = playersDAO.findById(dto.getId());
		if(d.isPresent()) {
			playersDAO.save(dto);
			return "Success";
		}
		return "No Player found with ID: "+vo.getId();
	}
	
	@Override
	public String saveP(PlayersVO vo) {
		PlayersDTO dto = new PlayersDTO();
		dto.setId(vo.getId());
		dto.setName(vo.getName());
		Optional<PlayersDTO> d = playersDAO.findById(dto.getId());
		if(d.isPresent()) {
			return "Insertion of Duplicate ID!";
		}
		playersDAO.save(dto);
		return "Success";
	}

	@Override
	public String delP(int id) {
		Optional<PlayersDTO> dto = playersDAO.findById(id);
		if(dto.isPresent()) {
			playersDAO.deleteById(id);
			return "Success";
		}
		return "Player Not found with "+dto.get().getName();
	}

	
	

}
