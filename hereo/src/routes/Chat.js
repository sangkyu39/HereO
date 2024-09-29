/* eslint-disable no-unused-vars */
// src/Main.js
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import ChatHeader from "../components/ChatHeader.js";
import styled from "styled-components";

function Chat() {
	let navigate = useNavigate();
	const [messages, setMessages] = useState([
		{
			text: "주임원사입니다.",
			sender: "ai",
		},
		{
			text: "알지?",
			sender: "ai",
		},
	]);
	const [inputValue, setInputValue] = useState("");
	const [textareaHeight, setTextareaHeight] = useState(40); // 기본 높이를 40px로 설정
	const [isSending, setIsSending] = useState(false); // 메시지 전송 중 여부
	const chatEndRef = useRef(null);
	const textareaRef = useRef(null); // Textarea에 대한 ref 추가

	const handleInputChange = (e) => {
		setInputValue(e.target.value);
		// textarea 높이를 동적으로 변경
		setTextareaHeight(Math.min(100, e.target.scrollHeight)); // 최대 높이 100px로 제한
	};

	const handleSendMessage = () => {
		if (inputValue.trim()) {
			// 'me' 메시지 추가
			setIsSending(true); // 메시지 전송 중 상태로 변경
			setMessages((prevMessages) => {
				const newMessages = [...prevMessages, { text: inputValue, sender: "me" }];
				setInputValue(""); // 입력란 초기화
				setTextareaHeight(40); // 전송 후 높이를 초기화

				// AI 응답 추가
				setTimeout(() => {
					replyMessage(newMessages);
				}, 300); // 1초 후 AI 응답

				return newMessages; // 업데이트된 메시지 목록 반환
			});
		}
	};

	// AI의 응답을 추가하는 함수
	const replyMessage = (currentMessages) => {
		// 랜덤으로 선택될 문구 배열
		const responses = [
			"네잇!",
			"너잇!!!",
			"주임원삽니다.",
			"성민이, 머리 알지, 정리해",
			"나가면, 뭐 해야해",
			"말 나오기 전에,,",
			"ㅇㅋ..잘 쉬고",
			"가을의 시작.. 근데 무지 덥당..",
			"휴가 복귀 전달 사항",
			"긴급 전파 사항",
			"좋은 기운 받길 나래..",
			"밥 먹고 오면 1시간이면 되지?",
			"이발,, 해야겠지?,,",
			"복귀 보고시간 좀 준수하자!",
			"두발 확실히 정리 후 복귀 할 수 있도록",
			"음주 귀영. 안돼. 알지",
			"성민이 너잇!!!!!",
		];

		// responses 배열에서 랜덤하게 하나 선택
		const randomResponse = responses[Math.floor(Math.random() * responses.length)];

		// 선택된 랜덤 문구를 메시지에 추가
		setMessages([...currentMessages, { text: randomResponse, sender: "ai" }]);

		// 메시지 전송 완료 후 입력창 활성화
		setIsSending(false);
	};

	const handleKeyPress = (e) => {
		if (e.key === "Enter" && !e.shiftKey) {
			// Shift + Enter로 줄바꿈 지원
			e.preventDefault();
			handleSendMessage();
		}
	};
	// 포커스 해줌
	useEffect(() => {
		chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
		textareaRef.current.focus();
	}, [messages]);

	useEffect(() => {
		textareaRef.current.focus();
	}, []);

	return (
		<Container>
			<ChatHeader />
			{/* 채팅창 */}
			<ChatContainer className="chatDiv">
				<MessageList>
					{messages.map((msg, index) => (
						<MessageItem key={index} sender={msg.sender}>
							{/* 보낸이가 ai인 경우 */}
							{msg.sender !== "me" && (
								<AvatarContainer>
									<Avatar>
										<AvatarText>주</AvatarText>
									</Avatar>
									<AvatarLabel>주임원사</AvatarLabel>
								</AvatarContainer>
							)}
							<MessageBubble sender={msg.sender}>{msg.text}</MessageBubble>
						</MessageItem>
					))}
					<div ref={chatEndRef} /> {/* 마지막 메시지를 위한 참조 */}
				</MessageList>
			</ChatContainer>

			{/* 입력창 */}
			<InputContainer>
				<Textarea
					ref={textareaRef} // Textarea에 ref 연결
					onChange={handleInputChange}
					onKeyDown={handleKeyPress}
					value={inputValue}
					placeholder="메시지를 입력하세요..."
					disabled={isSending} // 전송 중일 때 비활성화
					height={textareaHeight}
				/>
				<SendButton
					onClick={handleSendMessage}
					type="button"
					value=">"
					disabled={isSending} // 전송 중일 때 버튼 비활성화
				/>
			</InputContainer>
		</Container>
	);
}

// 스타일 컴포넌트 정의
const Container = styled.div`
	display: flex;
	flex-direction: column;
	height: 100vh;
`;

const ChatContainer = styled.div`
	flex: 1;
	overflow-y: auto;
	padding: 10px;
`;

const MessageList = styled.div`
	display: flex;
	flex-direction: column;
`;

const MessageItem = styled.div`
	display: flex;
	align-self: ${(props) => (props.sender === "me" ? "flex-end" : "flex-start")};
	margin: 5px;
	align-items: flex-start;
`;

const AvatarContainer = styled.div`
	margin-right: 10px;
	text-align: center;
`;

const Avatar = styled.div`
	width: 40px;
	height: 40px;
	border-radius: 50%;
	background-color: black;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const AvatarText = styled.span`
	color: white;
	font-size: 18px;
`;

const AvatarLabel = styled.div`
	color: black;
	font-size: 12px;
`;

const MessageBubble = styled.div`
	text-align: left;
	display: flex;
	padding: 5px 10px;
	border-radius: 5px;
	background-color: ${(props) => (props.sender === "me" ? "#20A090" : "white")};
	color: ${(props) => (props.sender === "me" ? "white" : "black")};
	border: ${(props) => (props.sender === "me" ? "" : "solid 2px black")};
	word-wrap: break-word;
`;

const InputContainer = styled.div`
	display: flex;
	border-top: 2px solid rgba(0, 117, 255, 0.5);
	padding: 10px;
	align-items: center;
	background-color: white;
`;

const Textarea = styled.textarea`
	flex-grow: 1;
	border: none;
	padding: 10px;
	resize: none;
	outline: none;
	height: ${(props) => `${props.height}px`};
	overflow: hidden;
	border-radius: 5px;
`;

const SendButton = styled.input`
	width: 50px;
	height: 50px;
	border: none;
	background-color: blue;
	color: white;
	border-radius: 5px;
	cursor: pointer;
	margin-left: 10px;
`;

export default Chat;
