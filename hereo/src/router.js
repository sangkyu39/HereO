/* eslint-disable no-unused-vars */
import React from "react";
//로딩할 모든 페이지들을 routes에서 가져오기
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./routes/Main.js";

function router() {
	return (
		<div>
			<Routes>
				<Route path="/" element={<Main />} />
			</Routes>
		</div>
	);
}

export default router;
