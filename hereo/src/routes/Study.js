/* eslint-disable no-unused-vars */
// src/Main.js
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import MainHeader from "../components/MainHeader";

function Study() {
	let navigate = useNavigate();

	return (
		<Container>
      <MainHeader/>
			 강의 영상 보는 곳
		</Container>
	);
}

// 스타일 컴포넌트 정의
const Container = styled.div`
	text-align: center;
	justify-content: center;
`;
export default Study;
