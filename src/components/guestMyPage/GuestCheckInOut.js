import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GuestCheckInCard from "./GuestCheckInCard";
import "./GuestCheckInOut.css";
import GuestCheckOutCard from './GuestCheckOutCard';

function GuestCheckInOut() {
    const guestReservationUrl = "http://localhost:3006/userReservation";

    const [userReservation, setUserReservation] = useState([]);

    useEffect(()=>{
        axios.get(guestReservationUrl)
        .then(res=>{
            setUserReservation(res.data);
            console.log(res.data)
        });
    },[]);

    return (
        <>
        <div className='guestReservation'>
        {
            userReservation.map((reservation)=>(
                <GuestCheckInCard key={reservation.id} reservation={reservation}/>
                
            ))
        }
    </div>
    <div className='guestReservation'>
    {
        userReservation.map((reservation)=>(
            <GuestCheckOutCard key={reservation.id} reservation={reservation}/>
        ))
    }
</div>
</>
    );
}

export default GuestCheckInOut;
