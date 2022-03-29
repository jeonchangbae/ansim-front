import React, {useEffect, useRef, useState} from 'react';
import {Box, Modal, TextField} from "@mui/material";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

function RoomReservation(props) {
    // const reservationUrl = "http://localhost:8080/book/v1/reservation";
    const reservationUrl = "/book/v1/reservation";
    // const headCountUrl = "http://localhost:8080/book/v1/reservation/head_count";
    const headCountUrl = "/book/v1/reservation/head_count";
    const now = new Date(Date.now());
    const [handelReservationModal, setHandelReservationModal] = useState(false);
    const [handelChangeDateModal, setHandelChangeDateModal] = useState(false);
    const [homeRoom, setHomeRoom] = useState({});
    const [checkIn, setCheckIn] = useState(new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours()));
    const [checkOut, setCheckOut] = useState(new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, now.getHours()));
    const [headCount, setHeadCount] = useState([]);
    const memo = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        props.home.rooms && props.home.rooms.map(room => {
            axios.post(headCountUrl, {
                roomId: room.id,
                checkIn: new Date(checkIn + 1000 * 60 * 60 * 9),
                checkOut: new Date(checkOut + 1000 * 60 * 60 * 9)
            }).then(res => {
                headCount[props.home.rooms.indexOf(room)] = res.data;
                setHeadCount(headCount);
                console.log(headCount);
            });
        })
    }, [props.home.rooms, handelChangeDateModal, headCount])

    const openReservationModal = (room) => {
        setHandelReservationModal(true);
        setHomeRoom({
            homeId: props.home.homeId,
            roomId: room.id,
            homeName: props.home.homeName,
            homeAddress: props.home.homeAddress,
            roomName: room.roomName,
            checkIn: String(checkIn.getFullYear()) + "년 " + String(checkIn.getMonth() + 1) + "월 " + String(checkIn.getDate()) + "일 " + String(checkIn.getHours()) + "시",
            checkOut: String(checkOut.getFullYear()) + "년 " + String(checkOut.getMonth() + 1) + "월 " + String(checkOut.getDate()) + "일 " + String(checkOut.getHours()) + "시"
        });
    }

    const closeReservationModal = () => {
        setHandelReservationModal(false);
    }

    const openChangeDateModal = () => {
        setHandelChangeDateModal(true);

    }

    const closeChangeDateModal = () => {
        setHandelChangeDateModal(false);
    }

    const okReservation = () => {
        axios.post(reservationUrl, {
            homeId: props.home.homeId,
            roomId: homeRoom.roomId,
            userId: 1,
            checkIn: new Date(checkIn + 1000 * 60 * 60 * 9),
            checkOut: new Date(checkOut + 1000 * 60 * 60 * 9),
            guestToHost: memo.current.value
        }).then(res => {
            if (res.data.code === 1) {
                alert("예약이 성공하였습니다.");
                // navigate("/");
            } else {
                alert("서버 오류로 예약이 실패하였습니다.");
            }
        })
    }

    const dayOptions = () => {
        let pickDayOptionForm = [];
        for (let i = 0; i < 24; i++) {
            pickDayOptionForm.push(<option key={i} value={i}>{i}</option>)
        }
        return pickDayOptionForm;
    }

    const changeCheckInHour = () => {
            checkIn.setHours(document.getElementById("checkInHour").value);
    }

    const changeCheckOutHour = () => {
        checkOut.setHours(document.getElementById("checkOutHour").value);
    }

    return (
        <>
            <p className={"title"}>예약 가능 여부</p>
            <div className={"contents_container"}>
                <div className={"row center"}>
                    <div>
                        <p className={"reservation_content_1"}>체크인 날짜</p>
                        <p className={"reservation_content_2"}>{checkIn.getFullYear()}년 {checkIn.getMonth() + 1}월 {checkIn.getDate()}일</p>
                        <p className={"reservation_content_3"}>{checkIn.getHours()}:00 ~</p>
                    </div>
                    <div>
                        <p className={"reservation_content_1"}>체크아웃 날짜</p>
                        <p className={"reservation_content_2"}>{checkOut.getFullYear()}년 {checkOut.getMonth() + 1}월 {checkOut.getDate()}일</p>
                        <p className={"reservation_content_3"}>~ {checkOut.getHours()}:00</p>
                    </div>
                    <div>
                        <p className={"reservation_content_1"}>인원</p>
                        <p className={"reservation_content_2"}>청소년 1명</p>
                    </div>
                    <button className={"reservation_change_button"} onClick={() => openChangeDateModal()}>검색 변경
                    </button>
                </div>

                <Modal
                    className="reservation_modal_container"
                    open={handelChangeDateModal}
                    onClose={closeChangeDateModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box className={"reservation_modal_box"}>
                        <div className={"row"}>
                            <div className={"day_pick_box"}>
                                <p className={"reservation_modal_text"}>체크인 날짜 변경</p>
                                <div className={"day_pick_inner_box"}>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DatePicker
                                            label="날짜 선택"
                                            openTo="day"
                                            views={['day', 'month', 'year']}
                                            value={checkIn}
                                            onChange={(newValue) => {
                                                setCheckIn(newValue);
                                            }}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </LocalizationProvider>
                                    <br/>
                                    <p>시간 선택</p>
                                    <select id={"checkInHour"} className={"hour_select"}
                                            onChange={() => changeCheckInHour()}>
                                        {dayOptions()}
                                    </select>
                                </div>
                            </div>
                            <div className={"day_pick_box"}>
                                <p className={"reservation_modal_text"}>체크아웃 날짜 변경</p>
                                <div className={"day_pick_inner_box"}>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DatePicker
                                            label="날짜 선택"
                                            openTo="day"
                                            views={['day', 'month', 'year']}
                                            value={checkOut}
                                            onChange={(newValue) => {
                                                setCheckOut(newValue);
                                            }}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </LocalizationProvider>
                                    <br/>
                                    <p>시간 선택</p>
                                    <select id={"checkOutHour"} className={"hour_select"}
                                            onChange={() => changeCheckOutHour()}>
                                        {dayOptions()}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </Box>
                </Modal>

                <table className={"reservation_table"}>
                    <thead>
                    <tr>
                        <th className={"table_room_name"}>객실 이름</th>
                        <th className={"table_room_gender"}>입실 가능 성별</th>
                        <th className={"table_room_max_head_count"}>정원</th>
                        <th className={"table_room_available"}>남은 자리</th>
                        <th className={"table_room_button"}>예약</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        props.home.rooms && props.home.rooms.map(room => (
                            <tr key={room.id}>
                                <td>{room.roomName}</td>
                                <td>{room.gender}</td>
                                <td>{room.maxHeadCount}</td>
                                <td id={"test_id"}>{headCount[props.home.rooms.indexOf(room)] ? room.maxHeadCount - headCount[props.home.rooms.indexOf(room)] : 0}</td>
                                <td>
                                    <button className={"reservation_room_button"}
                                            onClick={() => openReservationModal(room)}>예약 하기
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>

            <Modal
                className="reservation_modal_container"
                open={handelReservationModal}
                onClose={closeReservationModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className={"reservation_modal_box"}>
                    <div>
                        <p className={"reservation_modal_text"}>예약을 확정하시겠습니까?</p>
                        <p className={"reservation_modal_text"}>예약 확정 후 본인 확인이 완료되면 체크인하여 입실할 수 있습니다.</p>
                    </div>
                    <div>
                        <table className={"reservation_table"}>
                            <thead>
                            <tr>
                                <td>숙소 이름</td>
                                <td>숙소 주소</td>
                                <td>객실 이름</td>
                                <td>체크인 날짜</td>
                                <td>체크아웃 날짜</td>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>{homeRoom.homeName}</td>
                                <td>{homeRoom.homeAddress}</td>
                                <td>{homeRoom.roomName}</td>
                                <td>{homeRoom.checkIn}</td>
                                <td>{homeRoom.checkOut}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className={"center"}>
                        <p className={"reservation_modal_text"}>호스트에게 별도 문의사항</p>
                        <textarea className={"reservation_modal_input"} ref={memo}/>
                    </div>
                    <div className={"center"}>
                        <button className={"reservation_room_button"} onClick={() => okReservation()}>예약 확정</button>
                    </div>
                </Box>
            </Modal>
        </>
    );
}

export default RoomReservation;