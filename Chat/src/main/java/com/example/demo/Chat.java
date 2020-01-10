package com.example.demo;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;

public class Chat implements Serializable {

	private static final long serialVersionUID = 1L;

	private LocalDate date;

	private List<Text> textList;

	public LocalDate getDate() {
		return date;
	}

	public void setDate(LocalDate date) {
		this.date = date;
	}

	public List<Text> getTextList() {
		return textList;
	}

	public void setTextList(List<Text> textList) {
		this.textList = textList;
	}

	@Override
	public String toString() {
		return "Chat1 [date=" + date + ", textList=" + textList + "]";
	}

}
