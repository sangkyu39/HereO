/* eslint-disable no-unused-vars */
import React from "react";
//로딩할 모든 페이지들을 routes에서 가져오기
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Chat from "./routes/Chat.js";
import Home from "./routes/Home.js";
import Head from "./components/ChatHeader.js";

function router() {
	return (
		<div>
			<Routes>
				<Route path="/chat" element={<Chat />} />
				<Route path="/" element={<Home />} />
			</Routes>
		</div>
	);
}

export default router;
