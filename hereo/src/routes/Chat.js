/* eslint-disable no-unused-vars */
// src/Main.js
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import logo from "../assets/logo.svg";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";

function ChatHeader() {
	let navigate = useNavigate();

	return (
		<Header>
			<HeaderContent
				onClick={() => {
					navigate("/");
				}}>
				<Row>
					<LogoContainer>
						<Logo src={logo} alt="logo" />
					</LogoContainer>
					<div
						className="col"
						style={{ textAlign: "center", display: "flex", alignItems: "center", flex: 1 }}>
						<Title>HERE O</Title>
					</div>
				</Row>
			</HeaderContent>
		</Header>
	);
}

const Header = styled.div`
	text-align: center;
	border-bottom: 2px solid #007bff; /* Blue color for border */
	margin-bottom: 0.5rem;
	background-color: #f8f9fa; /* Light background for header */
	box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1); /* Subtle shadow */
`;

const HeaderContent = styled.div`
	padding: 10px;
	width: 95%;
	margin: 0 auto;
`;

const Row = styled.div`
	display: flex;
	align-items: center;
`;

const LogoContainer = styled.div`
	width: 60px;
	text-align: left;
	display: flex;
`;

const Logo = styled.img`
	height: 3rem;
	margin: 0;
`;

const Title = styled.h1`
	margin: 0;
	font-size: 2rem;
	font-weight: 700;
	color: #007bff; /* Blue color for title */
`;

function Chat() {
	const [idx, setIdx] = useState(0);
	let navigate = useNavigate();
	const [messages, setMessages] = useState([
		{
			text: "안녕하세요. MilMedAi 히오이에요.",
			sender: "ai",
		},
		{
			text: "현재 앓고 있는 통증이나 궁금한 사항에 대해 편하게 질문하세요.",
			sender: "ai",
		},
		{
			text: "히얼이를 통해 의무대 예약 시 상담 내용을 군의관님께 참고자료로 보내드릴거에요",
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
			"언제부터 통증이 시작되었나요? 갑자기 발생했나요?",
			"통증이 어디로 뻗나요? 다른 부위에 통증은 없나요? 또한 부은 흔적이 있나요?",
			"얼마나 심하게 아픈가요? 통증이 없는 것을 0점, 상상할 수 있는 최대의 통증을 10점이라고 생각했을 때, 환자분의 통증은 몇 점인가요?",
			"통증의 양상은 어떤가요?'칼로 찌르는 듯이 아프다', '전기가 통하듯이 찌릿하다','누르는 듯이 아프다','뻐근하다','욱신거린다','멍멍하다'",
			"결론\n훈련 도중 발목을 접질러 발목이 붓고 통증이 4점 정도에 찌릿한 느낌이 드는군요.\n\n 발목 염좌(발목 인대 손상)가 의심돼요. 정도에 따라 일반적으로 3단계를 구분해요. 1도 염좌는 인대 섬유의 파열없이 섬유 주위 조직만 손상된 상태, 2단계는 인대의 부분 파열이 일어난 상태, 3도 염좌는 인대의 완전 파열로 연결 상태가 끊어진 것이에요.\n정확한 진단을 위해 군의관님을 만나보는게 좋을 것 같아요. 예약 체계 안내해 드릴게요.\n\n 자가진단 \n\n1. 손상부위가 부었나요?\n 2. 멍이 있나요? / 만졌을 때 통증이 있나요?\n 발목 염좌 자가치료 및 대처법 \n가벼운 발목염좌는 충분한 휴식 상태에서 다친 부위를 하루 3~4회, 한번에 20~30분씩 냉찜해해주고, 압박 붕대 등으로 적절히 압박하여 심장보다 높이 위치해주면 증세가 완화돼요. 이러한 응급처치는 손상 직후부터 48시간 동안 해주는 것이 좋아요. \n\n증상이 심하다면 빠른 시간 내 진료를 받아봐요.",
		];

		// responses 배열에서 랜덤하게 하나 선택
		const randomResponse = responses[idx];
		setIdx(idx + 1);
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
										<img src={logo} alt="logo" />
									</Avatar>
									<AvatarLabel>HereO</AvatarLabel>
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
					disabled={isSending} // 전송 중일 때 버튼 비활성화
				>
					&#9658;
				</SendButton>
			</InputContainer>
		</Container>
	);
}

// 스타일 컴포넌트 정의
const Container = styled.div`
	display: flex;
	flex-direction: column;
	height: 100vh;
	background-color: #f0f4f8; /* Light blue background */
`;

const ChatContainer = styled.div`
	flex: 1;
	overflow-y: auto;
	padding: 20px;
	background-color: #ffffff; /* White background for chat area */
	box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
	border-radius: 10px;
	margin: 10px;
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
	max-width: 70%; /* Limit message width */
`;

const AvatarContainer = styled.div`
	margin-right: 10px;
	text-align: center;
`;

const Avatar = styled.div`
	width: 40px;
	height: 40px;
	border-radius: 50%;
	display: flex;
	justify-content: center;
	align-items: center;
	overflow: hidden; /* Ensure the image fits within the circle */

	img {
		width: 80%; /* Adjust the width to fit the image inside the circle */
		height: 80%; /* Adjust the height to fit the image inside the circle */
		object-fit: contain; /* Ensure the image maintains its aspect ratio */
	}
`;

const AvatarLabel = styled.div`
	color: black;
	font-size: 12px;
	margin-top: 5px;
`;

const MessageBubble = styled.div`
	text-align: left;
	display: flex;
	padding: 10px 15px;
	border-radius: 15px;
	background-color: ${(props) =>
		props.sender === "me" ? "#007bff" : "#e9ecef"}; /* Blue for me, light grey for others */
	color: ${(props) => (props.sender === "me" ? "white" : "black")};
	border: ${(props) => (props.sender === "me" ? "none" : "solid 1px #dee2e6")};
	word-wrap: break-word;
	box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    white-space: pre-wrap;
`;

const InputContainer = styled.div`
	display: flex;
	border-top: 1px solid #dee2e6;
	padding: 10px;
	align-items: center;
	background-color: #ffffff;
	box-shadow: 0px -2px 4px rgba(0, 0, 0, 0.1);
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
	background-color: #f8f9fa;
	box-shadow: inset 0px 1px 2px rgba(0, 0, 0, 0.1);
	font-size: 16px;
`;

const SendButton = styled.button`
	width: 50px;
	height: 50px;
	border: none;
	background-color: #007bff;
	color: white;
	border-radius: 50%;
	cursor: pointer;
	margin-left: 10px;
	font-size: 20px;
	display: flex;
	justify-content: center;
	align-items: center;
	box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);

	&:hover {
		background-color: #0056b3;
	}
`;

export default Chat;
