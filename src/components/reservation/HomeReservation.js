import React, {useEffect, useState} from 'react';
import './Reservation.css'
import HomeView from "./HomeView";
import HomeInformation from "./HomeInformation";
import RoomReservation from "./RoomReservation";
import HomePolicies from "./HomePolicies";
import HomeFacilities from "./HomeFacilities";
import {useParams} from "react-router-dom";
import axios from "axios";
import HomeReview from "./HomeReview";

function HomeReservation() {
    // const getHomeUrl = "http://localhost:8080/book/v1/home/";
    const getHomeUrl = "/book/v1/home/";
    const [home, setHome] = useState({});
    const {id} = useParams();

    useEffect(() => {
        axios.get(getHomeUrl + id).then(res => {
            setHome(res.data);
        })
    }, []);

    return (
        <>
            <div className='header_section'>
                <p className={"reservation_header"}> 숙소 예약하기</p>
            </div>

            <div className={"container"}>
                <HomeView coordinateX={home.coordinateX} coordinateY={home.coordinateY} images={home.images}/>
                <HomeInformation information={home.homeInformation}/>
                <RoomReservation home={home}/>
                <HomePolicies homePolicies={home.homePolicies} homePolicyCustom={home.homePolicyCustom}/>
                <HomeFacilities homeFacilities={home.homeFacilities}/>
                <HomeReview/>
            </div>
        </>
    );
}

export default HomeReservation;