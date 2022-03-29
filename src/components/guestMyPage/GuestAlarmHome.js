import axios from 'axios';
import React, { useEffect, useState } from 'react';
import BtnSlider from '../main/BtnSlider';
import './GuestAlarmHome.css';

function GuestAlarmHome() {
    const guestAlarmHomeUrl = "http://localhost:3005/shelterdata";
    const [slideIndex, setSlideIndex] = useState(1)
    const [userAlarmHome, setUserAlarmHome] = useState([]);

    useEffect(()=>{
        axios.get(guestAlarmHomeUrl)
        .then(res=>{
            setUserAlarmHome(res.data)
            console.log(res.data)
        });
    },[])

    const nextSlide = () => {
        if(slideIndex !== userAlarmHome.length){
            setSlideIndex(slideIndex + 1)
        } 
        else if (slideIndex === userAlarmHome.length){
            setSlideIndex(1)
        }
    }

    const prevSlide = () => {
        if(slideIndex !== 1){
            setSlideIndex(slideIndex - 1)
        }
        else if (slideIndex === 1){
            setSlideIndex(userAlarmHome.length)
        }
    }

    return (
        <>
        <h2>알림 등록한 숙소들</h2>
            <div className="guestAlarmHome-slider">
                {
                userAlarmHome.map((obj, index) => (
                        <div
                        key={obj.id}
                        className={slideIndex === index + 1 ? "slide active-anim" : "slide"}
                        >
                            <img 
                            src={process.env.PUBLIC_URL + `/img/${obj.imageName}`} alt="shelter.jpg"/>
                            <div className='alarmhome__info'>
                                <h2>{obj.shleter_name}</h2>
                                <h2>{obj.shelter_location}</h2>
                                <h2>{obj.shelter_point}</h2>
                            </div>
                        </div>
                ))}
                <BtnSlider moveSlide={nextSlide} direction={"next"} />
                <BtnSlider moveSlide={prevSlide} direction={"prev"}/>
            </div>
        </>
    )
}

export default GuestAlarmHome;