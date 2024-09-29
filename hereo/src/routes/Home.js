/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import MainHeader from "../components/MainHeader";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function Home() {
	const [showModal, setShowModal] = useState(false);
	let navigate = useNavigate();

	const onChat = (e) => {
		navigate("/chat");
	};

	const handleShow = () => setShowModal(true);
	const handleClose = () => setShowModal(false);
	const handleConfirm = () => {
		// 신고 처리 로직 추가
		setShowModal(false);
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
				<SubInfoDiv
					onClick={() => {
						navigate("/study");
					}}>
					<SubText>STUDY</SubText>
				</SubInfoDiv>
				<SubInfoDiv onClick={handleShow}>
					<SubText>신고</SubText>
				</SubInfoDiv>
			</Row>

			<ModalComponent show={showModal} handleClose={handleClose} handleConfirm={handleConfirm} />
		</Container>
	);
}

function ModalComponent({ show, handleClose, handleConfirm }) {
	return (
		<Modal
			show={show}
			onHide={handleClose}
			centered
			size="sm"
			aria-labelledby="contained-modal-title-vcenter">
			<Modal.Header closeButton>
				<Modal.Title>신고</Modal.Title>
			</Modal.Header>
			<Modal.Body>신고하시겠습니까?</Modal.Body>
			<Modal.Footer>
				<Button variant="primary" onClick={handleConfirm}>
					확인
				</Button>
				<Button variant="secondary" onClick={handleClose}>
					취소
				</Button>
			</Modal.Footer>
		</Modal>
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
	width: 70%; /* 기본 가로 크기 설정 */
	padding-top: 70%; /* 1:1 비율을 만듭니다 */
	position: relative; /* 내부 콘텐츠의 위치를 올바르게 설정합니다 */

	/* 작은 화면일 경우 width 조정 */
	@media (min-width: 768px) {
		width: 30%; /* 가로 크기를 더 줄입니다 */
		padding-top: 30%; /* 비율을 맞춥니다 */
	}
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
	border: 2px solid black;
	justify-content: center;
	align-items: center;

	&:hover {
		background-color: black;
		color: white;
		border: none;
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

	&:hover {
		background-color: black;
		color: white;
		border: none;
		cursor: pointer;
	}
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
