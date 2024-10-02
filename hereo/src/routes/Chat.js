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
        width: 80%;  /* Adjust the width to fit the image inside the circle */
        height: 80%;  /* Adjust the height to fit the image inside the circle */
        object-fit: contain;  /* Ensure the image maintains its aspect ratio */
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
    background-color: ${(props) => (props.sender === "me" ? "#007bff" : "#e9ecef")}; /* Blue for me, light grey for others */
    color: ${(props) => (props.sender === "me" ? "white" : "black")};
    border: ${(props) => (props.sender === "me" ? "none" : "solid 1px #dee2e6")};
    word-wrap: break-word;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
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