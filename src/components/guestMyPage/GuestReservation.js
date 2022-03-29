import axios from 'axios';
import React, { useEffect, useState } from 'react';
import GuestProfile from './GuestProfile';
import './GuestReservation.css';
import GuestAlarmHome from './GuestAlarmHome';
import GuestRecentReservation from './GuestRecentReservation';
import GuestPreviousRservation from './GuestPreviousReservation';

function GuestReservation() {
    const guestUrl = "http://localhost:3006/userProfile";
    const guestReservationUrl = "http://localhost:3006/userReservation";
    const guestPreviousReservationUrl = "http://localhost:3006/userPreviousReservation";


    const [userProfile, setUserProfile] = useState([]);
    const [userReservation, setUserReservation] = useState([]);
    const [userPreviousReservation, setUserPreviousReservation] = useState([]);

    useEffect(()=>{
        axios.get(guestUrl)
        .then(res=>{
            setUserProfile(res.data);
            console.log(res.data);
        });
    },[]);

    useEffect(()=>{
        axios.get(guestReservationUrl)
        .then(res=>{
            setUserReservation(res.data);
            console.log(res.data)
        });
    },[]);

    useEffect(()=>{
        axios.get(guestPreviousReservationUrl)
        .then(res=>{
            setUserPreviousReservation(res.data);
            console.log(res.data)
        });
    },[]);

    return (
        <>
        <div className='guest__info'>
            <div className='guestProfile'>
                {
                    userProfile.map((guest)=>(
                        <GuestProfile key={guest.id} guest={guest}/>
                        ))
                }
            </div>
            <div className='guestReservation'>
                {
                    userReservation.map((reservation)=>(
                        <GuestRecentReservation key={reservation.id} reservation={reservation}/>
                    ))
                }
            </div>
        </div>
        <div className='guestAlarm__home'>
            <GuestAlarmHome />
        </div>
        <div className='guestReservation'>
                {
                    userPreviousReservation.map((reservation)=>(
                        <GuestPreviousRservation key={reservation.id} reservation={reservation}/>
                    ))
                }
            </div>
        </>
    );
}

export default GuestReservation;