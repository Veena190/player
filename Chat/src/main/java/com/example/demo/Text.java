package com.example.demo;

import java.io.Serializable;
import java.util.List;

public class Text implements Serializable {

	private static final long serialVersionUID = 1L;

	private String name;
	private String time;
	private List<String> text;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getTime() {
		return time;
	}

	public void setTime(String time) {
		this.time = time;
	}

	public List<String> getText() {
		return text;
	}

	public void setText(List<String> text) {
		this.text = text;
	}

	@Override
	public String toString() {
		return "\nText [name=" + name + ", time=" + time + ", text=" + text + "]";
	}
}
