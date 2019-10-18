package com.example.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.service.Services;
import com.example.util.PlayersVO;

@RestController
@CrossOrigin(origins="http://localhost:4200",allowedHeaders="*")
public class Controllers {
	
	@Autowired
	private Services ser;

	@GetMapping(path = "/test")
	public String test() {
		System.out.println("TEST SUCCESS");
		return "Test Success";

	}
	@GetMapping(path = "/getP")
	public List<PlayersVO> getP() {
		List<PlayersVO> vo = ser.getP();
		return vo;
	}
	
	@GetMapping(path = "/getPId")
	public PlayersVO getPId( @RequestParam(value = "id") int id) {
		PlayersVO vo = ser.getPId(id);
		return vo;
	}
	
	@PostMapping(path = "/editP", produces = { MediaType.APPLICATION_JSON_VALUE,
			MediaType.APPLICATION_XML_VALUE })
	public String editP( @RequestBody PlayersVO vo) {
		String s = ser.editP(vo);
		return s;
	}
	
	@PostMapping(path = "/saveP", produces = { MediaType.APPLICATION_JSON_VALUE,
			MediaType.APPLICATION_XML_VALUE })
	public String saveP( @RequestBody PlayersVO vo) {
		String s = ser.saveP(vo);
		return s;
	}
	
	@GetMapping(path = "/delP")
	public String delP( @RequestParam(value = "id") int id) {
		String s = ser.delP(id);
		return s;
	}

}
