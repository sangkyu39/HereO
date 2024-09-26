import React, { useEffect, useRef, useState } from "react";
import logo from "../assets/logo.svg";

function Main() {
	const [messages, setMessages] = useState([
		{
			text: "일단아무렇게나쓴아주엄청나게길고긴문장이다. 하지만 이걸로는 부족하기 때문에 더 길게 쓰고 띄어쓰기를 섞어서 쓴 글이다. 과연 잘 나올까",
			sender: "ai",
		},
		{
			text: "안녕하세요",
			sender: "ai",
		},
	]);
	const [inputValue, setInputValue] = useState("");
	const [textareaHeight, setTextareaHeight] = useState(40); // 기본 높이를 40px로 설정
	const chatEndRef = useRef(null);

	const handleInputChange = (e) => {
		setInputValue(e.target.value);
		// textarea 높이를 동적으로 변경
		setTextareaHeight(Math.min(100, e.target.scrollHeight)); // 최대 높이 100px로 제한
	};

	const handleSendMessage = () => {
		if (inputValue.trim()) {
			setMessages([...messages, { text: inputValue, sender: "me" }]);
			setInputValue(""); // 입력란 초기화
			setTextareaHeight(40); // 전송 후 높이를 초기화
		}
	};

	const handleKeyPress = (e) => {
		if (e.key === "Enter" && !e.shiftKey) { // Shift + Enter로 줄바꿈 지원
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
							<img
								style={{ height: "5rem", margin: "0" }}
								src={logo}
								alt="logo"
							/>
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
									backgroundColor: msg.sender === "me" ? "#dcf8c6" : "blue",
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
				/>
			</div>
		</div>
	);
}

export default Main;
