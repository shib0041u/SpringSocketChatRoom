/**
 * 
 */
$(document).ready(e=>{
	$("#login").click(()=>
	{
		let name = $("#name-value").val();
		localStorage.setItem("name",name)
		
		connect();
		sendFirstMessage();
		
	}
	);

	$("#send-btn").click(()=>
	{
		sendMessage();
		$('#message-value').val('');
		$('#message-value').focus();
	}
	);
	$("#logout").click(()=>
	{
		let jsonOb ={
		name: "System",
		content: localStorage.getItem("name")+" has left the chat"
		}
		stompClient.send("/chatRoomSpringSocket/message",{},JSON.stringify(jsonOb));
		localStorage.removeItem("name");
		if(stompClient!=null){
			stompClient.disconnect();
			$("#chat-room").addClass('d-none');
			$("#name-form").removeClass('d-none');
			console.log(stompClient);
		}
		
	}
	);
})
var stompClient=null;



function connect(){
	let socket = new SockJS("/server1");
	stompClient = Stomp.over(socket);
	stompClient.connect({},function(frame){
		console.log("Connected "+ frame);
		$("#name-form").addClass('d-none');
		$("#chat-room").removeClass('d-none');
		
		
		//stomp subscribe
		stompClient.subscribe("/topic/return-to",function(response){
			showMessage(JSON.parse(response.body));
			
			
		})
	})
	
}
function showMessage(message){
	let date = new Date();
	$("#message-container-table").prepend(`<tr><td><b> ${message.name}: </b>${message.content}<sub>@${date.getHours()+":"+date.getMinutes()}</sub><br><br></td></tr>`);
};
function sendFirstMessage(){
	let jsonOb ={
		name: "System",
		content: localStorage.getItem("name")+" has joined the chat room."
	}
	setTimeout(()=>stompClient.send("/chatRoomSpringSocket/message",{},JSON.stringify(jsonOb)), 100);
	};
function sendMessage(){
	let jsonOb ={
		name: localStorage.getItem("name"),
		content: $("#message-value").val()
	}
	stompClient.send("/chatRoomSpringSocket/message",{},JSON.stringify(jsonOb));
};