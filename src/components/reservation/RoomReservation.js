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
            checkIn: String(checkIn.getFullYear()) + "??? " + String(checkIn.getMonth() + 1) + "??? " + String(checkIn.getDate()) + "??? " + String(checkIn.getHours()) + "???",
            checkOut: String(checkOut.getFullYear()) + "??? " + String(checkOut.getMonth() + 1) + "??? " + String(checkOut.getDate()) + "??? " + String(checkOut.getHours()) + "???"
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
                alert("????????? ?????????????????????.");
                // navigate("/");
            } else {
                alert("?????? ????????? ????????? ?????????????????????.");
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
            <p className={"title"}>?????? ?????? ??????</p>
            <div className={"contents_container"}>
                <div className={"row center"}>
                    <div>
                        <p className={"reservation_content_1"}>????????? ??????</p>
                        <p className={"reservation_content_2"}>{checkIn.getFullYear()}??? {checkIn.getMonth() + 1}??? {checkIn.getDate()}???</p>
                        <p className={"reservation_content_3"}>{checkIn.getHours()}:00 ~</p>
                    </div>
                    <div>
                        <p className={"reservation_content_1"}>???????????? ??????</p>
                        <p className={"reservation_content_2"}>{checkOut.getFullYear()}??? {checkOut.getMonth() + 1}??? {checkOut.getDate()}???</p>
                        <p className={"reservation_content_3"}>~ {checkOut.getHours()}:00</p>
                    </div>
                    <div>
                        <p className={"reservation_content_1"}>??????</p>
                        <p className={"reservation_content_2"}>????????? 1???</p>
                    </div>
                    <button className={"reservation_change_button"} onClick={() => openChangeDateModal()}>?????? ??????
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
                                <p className={"reservation_modal_text"}>????????? ?????? ??????</p>
                                <div className={"day_pick_inner_box"}>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DatePicker
                                            label="?????? ??????"
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
                                    <p>?????? ??????</p>
                                    <select id={"checkInHour"} className={"hour_select"}
                                            onChange={() => changeCheckInHour()}>
                                        {dayOptions()}
                                    </select>
                                </div>
                            </div>
                            <div className={"day_pick_box"}>
                                <p className={"reservation_modal_text"}>???????????? ?????? ??????</p>
                                <div className={"day_pick_inner_box"}>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DatePicker
                                            label="?????? ??????"
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
                                    <p>?????? ??????</p>
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
                        <th className={"table_room_name"}>?????? ??????</th>
                        <th className={"table_room_gender"}>?????? ?????? ??????</th>
                        <th className={"table_room_max_head_count"}>??????</th>
                        <th className={"table_room_available"}>?????? ??????</th>
                        <th className={"table_room_button"}>??????</th>
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
                                            onClick={() => openReservationModal(room)}>?????? ??????
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
                        <p className={"reservation_modal_text"}>????????? ?????????????????????????</p>
                        <p className={"reservation_modal_text"}>?????? ?????? ??? ?????? ????????? ???????????? ??????????????? ????????? ??? ????????????.</p>
                    </div>
                    <div>
                        <table className={"reservation_table"}>
                            <thead>
                            <tr>
                                <td>?????? ??????</td>
                                <td>?????? ??????</td>
                                <td>?????? ??????</td>
                                <td>????????? ??????</td>
                                <td>???????????? ??????</td>
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
                        <p className={"reservation_modal_text"}>??????????????? ?????? ????????????</p>
                        <textarea className={"reservation_modal_input"} ref={memo}/>
                    </div>
                    <div className={"center"}>
                        <button className={"reservation_room_button"} onClick={() => okReservation()}>?????? ??????</button>
                    </div>
                </Box>
            </Modal>
        </>
    );
}

export default RoomReservation;