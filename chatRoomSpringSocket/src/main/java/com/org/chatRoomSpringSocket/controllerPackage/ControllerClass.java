package com.org.chatRoomSpringSocket.controllerPackage;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.org.chatRoomSpringSocket.dto.Message;

@RestController
public class ControllerClass {

	@MessageMapping("/message") 	//if u want to send message you have to send to this url
	@SendTo("/topic/return-to")		// Message will be received to those who has subscribed to this url
	public Message getContent(@RequestBody Message message) {
		try {
			Thread.sleep(100);
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		System.out.println(message);
		return message;
	}
}
