package com.example.demo;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.text.ParseException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class ChatController {

	@GetMapping("/getSkypeChats")
	public List<Text> getSkypeChats() throws IOException {
		List<String> lines = Files.readAllLines(Paths.get("D:\\Docs\\convo.txt"), StandardCharsets.UTF_8);

		Text t = null;
		List<Text> list = new ArrayList<>();

		for (String line : lines) {
			if (line.contains("================")) {
				break;
			}
			line = line.trim();
			if (!line.isEmpty()) {
				if (line.endsWith("M:")) {
					int l = line.length() - 9;
					t = new Text();
					t.setName(line.substring(0, l));
					t.setTime(line.substring(l));
					t.setText(new ArrayList<>());
					list.add(t);
				} else {
					t.getText().add(line);
				}
			}
		}
		System.out.println(list);
		return list;
	}

	@GetMapping("/getAppChats")
	public List<Chat> getAppChats() throws IOException, ParseException {

		List<String> fileLines = Files.readAllLines(Paths.get("D:\\Docs\\Chat1.txt"), StandardCharsets.UTF_8);
		fileLines.removeAll(Arrays.asList("", null));
		Chat chats = null;
		List<Text> texts = null;
		Set<Chat> chatList = new HashSet<>();
		for (int i = 0; i < fileLines.size(); i++) {

			DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MM/d/yy");

			String line1 = fileLines.get(i);
			line1 = line1.trim();
			String today1 = line1.substring(0, line1.indexOf(','));
			LocalDate localDate1 = LocalDate.parse(today1, formatter);
			if (i == 0) {
				chats = new Chat();
				chats.setDate(localDate1);
				texts = new ArrayList<>();
				chats.setTextList(texts);
			}

			else if (i != 0 || i > 0) {
				String line0 = fileLines.get(i - 1);
				line0 = line0.trim();
				String today0 = line0.substring(0, line0.indexOf(','));
				LocalDate localDate0 = LocalDate.parse(today0, formatter);
				if (localDate0.isBefore(localDate1)) {
					chats = new Chat();
					chats.setDate(localDate1);
					texts = new ArrayList<>();
					chats.setTextList(texts);
				}
			}
			String line = fileLines.get(i);
			line = line.trim();
			String today = line.substring(0, line.indexOf(','));
			String time = line.substring(line.indexOf(',') + 1, line.indexOf('-') - 1);
			String name = line.substring(line.indexOf('-') + 1, line.indexOf(": "));
			String text = line.substring(line.indexOf(": ") + 2);
			// convert String to LocalDate
			LocalDate localDate = LocalDate.parse(today, formatter);
			if (localDate.equals(chats.getDate())) {
				Text t = new Text();
				t.setTime(time);
				t.setName(name);
				t.setText(Arrays.asList(text));
				// System.out.println(t);
				texts.add(t);
				chats.setTextList(texts);
				chatList.add(chats);
				// System.out.println(chats);
			}
		}
		List<Chat> collect = chatList.stream().sorted((a, b) -> a.getDate().compareTo(b.getDate()))
				.collect(Collectors.toList());

		for (Chat chat1 : collect) {
			System.out.println(chat1);
		}

		return collect;

	}
}
