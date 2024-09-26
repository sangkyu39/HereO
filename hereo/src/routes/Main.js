import React, { useEffect, useRef, useState } from "react";
import logo from "../assets/logo.svg";

function Main() {
	const [messages, setMessages] = useState([
		{
			text: "안뇽",
			sender: "ai",
		},
		{
			text: "일단 말해봐",
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
			"서성민은 유명한 꿀벌이라는데",
			"동희야 꿀 그만 빨아",
			"전역이 오냐? ㅋㅋ",
			"슬슬 전역할 때 됐는데",
			"휴가 나가고 싶다 (어제 휴가 복귀함)",
			"너잇!",
			"좋은데?",
			"진짜 운동하기?",
			"곧 전역이라는데?",
			"건조장으로 집합할 수 있도록",
			"돌돌천",
		];

		// responses 배열에서 랜덤하게 하나 선택
		const randomResponse = responses[Math.floor(Math.random() * responses.length)];

		// 선택된 랜덤 문구를 메시지에 추가
		setMessages([...currentMessages, { text: randomResponse, sender: "ai" }]);

		// 메시지 전송 완료 후 입력창 활성화
		setIsSending(false);

		// 입력창에 focus
    setTimeout(() => {
      textareaRef.current.focus();
    }, 300);

	};

	const handleKeyPress = (e) => {
		if (e.key === "Enter" && !e.shiftKey) {
			// Shift + Enter로 줄바꿈 지원
			e.preventDefault();
			handleSendMessage();
		}
	};

	useEffect(() => {
		chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	return (
		<div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
			<div style={{ textAlign: "center", padding: "15px" }}>
				<div style={{ display: "inline-block", padding: "10px", width: "95%" }}>
					<div className="row" style={{ display: "flex", alignItems: "center" }}>
						<div
							style={{
								width: "80px",
								textAlign: "left",
								padding: "0",
								display: "flex",
							}}>
							<img style={{ height: "5rem", margin: "0" }} src={logo} alt="logo" />
						</div>
						<div
							className="col"
							style={{
								textAlign: "center",
								display: "flex",
								alignItems: "center",
								flex: 1,
							}}>
							<h1 style={{ margin: "0", width: "100%" }}>HERE O</h1>
						</div>
					</div>
				</div>
			</div>

			{/* 채팅창 */}
			<div
				style={{
					flex: 1, // 남은 공간을 모두 차지
					overflowY: "auto", // 채팅이 많아지면 스크롤 가능
					padding: "10px",
				}}
				className="chatDiv">
				<div
					style={{
						display: "flex",
						flexDirection: "column",
					}}>
					{messages.map((msg, index) => (
						<div
							key={index}
							style={{
								display: "flex",
								alignSelf: msg.sender === "me" ? "flex-end" : "flex-start",
								margin: "5px",
								alignItems: "flex-start", // 세로 정렬
							}}>
							{/* 보낸이가 ai인 경우 */}
							{msg.sender !== "me" && (
								<div style={{ marginRight: "10px", textAlign: "center" }}>
									<div
										style={{
											width: "40px",
											height: "40px",
											borderRadius: "50%",
											backgroundColor: "black",
											display: "flex",
											justifyContent: "center",
											alignItems: "center",
										}}>
										<span style={{ color: "white", fontSize: "18px" }}>A</span>
									</div>
									<div style={{ color: "black", fontSize: "12px" }}>{msg.sender}</div>
								</div>
							)}
							<div
								style={{
									textAlign: "left",
									display: "flex",
									padding: "5px 10px", // 여백 추가
									borderRadius: "5px",
									backgroundColor: msg.sender === "me" ? "#20A090" : "white",
									color: msg.sender === "me" ? "white" : "black",
									border: msg.sender === "me" ? "" : "solid 2px black",
									wordWrap: "break-word",
								}}>
								{msg.text}
							</div>
						</div>
					))}
					<div ref={chatEndRef} /> {/* 마지막 메시지를 위한 참조 */}
				</div>
			</div>

			{/* 입력창 */}
			<div
				style={{
					display: "flex",
					borderTop: "2px solid rgba(0, 117, 255, 0.5)",
					padding: "10px",
					alignItems: "center", // 세로 가운데 정렬
					backgroundColor: "white",
				}}>
				<textarea
					ref={textareaRef} // Textarea에 ref 연결
					style={{
						flexGrow: 1, // 버튼을 제외한 남은 공간을 꽉 채움
						border: "none",
						padding: "10px",
						resize: "none", // 크기 조정 불가
						outline: "none",
						height: `${textareaHeight}px`, // 동적 높이 설정
						overflow: "hidden", // 스크롤바 숨기기
						borderRadius: "5px",
					}}
					onChange={handleInputChange}
					onKeyPress={handleKeyPress}
					value={inputValue}
					placeholder="메시지를 입력하세요..."
					disabled={isSending} // 전송 중일 때 비활성화
				/>
				<input
					style={{
						width: "50px", // 일정한 크기로 고정
						height: "50px",
						border: "none",
						backgroundColor: "blue",
						color: "white",
						borderRadius: "5px",
						cursor: "pointer",
						marginLeft: "10px", // 버튼과 입력창 사이에 여백 추가
					}}
					onClick={handleSendMessage}
					type="button"
					value=">"
					disabled={isSending} // 전송 중일 때 버튼 비활성화
				/>
			</div>
		</div>
	);
}

export default Main;
