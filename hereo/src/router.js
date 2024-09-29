/* eslint-disable no-unused-vars */
import React from "react";
//로딩할 모든 페이지들을 routes에서 가져오기
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Chat from "./routes/Chat.js";
import Home from "./routes/Home.js";
import Study from "./routes/Study.js";
import Head from "./components/ChatHeader.js";
// 챗 기능 / 영상 강의 기능 / 신고 기능 / 유저 정보
function router() {
	return (
		<div>
			<Routes>
				<Route path="/chat" element={<Chat />} />
				<Route path="/" element={<Home />} />
				<Route path="/study" element={<Study />} />
			</Routes>
		</div>
	);
}

export default router;
