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
	padding: 15px;
`;

const HeaderContent = styled.div`
	display: inline-block;
	padding: 10px;
	width: 95%;
`;

const Row = styled.div`
	display: flex;
	align-items: center;
`;

const LogoContainer = styled.div`
	width: 80px;
	text-align: left;
	padding: 0;
	display: flex;
`;

const Logo = styled.img`
	height: 5rem;
	margin: 0;
`;

const Title = styled.h1`
	margin: 0;
	width: 100%;
`;

export default ChatHeader;
