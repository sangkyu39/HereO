/* eslint-disable no-unused-vars */
// src/Main.js
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import logo from "../assets/logo.svg";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import MainHeader from "../components/MainHeader";

function Home() {
	let navigate = useNavigate();

	const onChat = (e) => {
		navigate("/chat");
	};
	return (
		<Container>
			<MainHeader />
			<AspectRatioBox>
				<ChatDiv onClick={onChat}>
					<ChatText>CHAT</ChatText>
				</ChatDiv>
			</AspectRatioBox>
			<Row>
				<SubInfoDiv>
					<SubText>INFO</SubText>
				</SubInfoDiv>
				<SubInfoDiv>
					<SubText>119</SubText>
				</SubInfoDiv>
			</Row>
		</Container>
	);
}

// 스타일 컴포넌트 정의
const Container = styled.div`
	text-align: center;
	justify-content: center;
`;

const Row = styled.div`
	padding: 0 10% 0 10%;
	display: flex;
	align-items: center;
`;

const AspectRatioBox = styled.div`
	display: inline-block;
	width: 70%; /* 가로 크기를 설정합니다 */
	padding-top: 70%; /* 1:1 비율을 만듭니다 */
	position: relative; /* 내부 콘텐츠의 위치를 올바르게 설정합니다 */
`;

const ChatText = styled.span`
	display: inline-block;
	font-family: Pretendard;
	font-size: 5rem;
	font-style: normal;
	font-weight: 700;
	line-height: normal;
	letter-spacing: -0.02rem;
`;
const ChatDiv = styled.div`
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	display: flex;
	border-radius: 10px;
	border: 1.5px solid black;
	justify-content: center;
	align-items: center;

	&:hover {
		background-color: lightgray;
		cursor: pointer;
	}
`;

const SubInfoDiv = styled.div`
	margin: auto;
	display: inline-block;
	margin-top: 1rem;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 38%;
	height: 6rem;
	border-radius: 10px;
	border: 1px solid black;
`;

const SubText = styled.span`
	display: inline-block;
	font-family: Pretendard;
	font-size: 2rem;
	font-style: normal;
	font-weight: 700;
	line-height: normal;
	letter-spacing: -0.02rem;
`;

export default Home;
