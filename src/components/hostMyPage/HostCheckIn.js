import axios from 'axios';
import React,{useState,useEffect} from 'react'
import HostCheckInCard from './HostCheckInCard';
import './HostCheckIn.css';

function HostCheckIn() {
    const checkInGuestsUrl = "http://localhost:3006/checkInGuests";
    const [checkInGuest, setCheckInGuest] = useState([]);

    useEffect(()=>{
        axios.get(checkInGuestsUrl)
        .then(res=>{
            setCheckInGuest(res.data)
        });
    },[])
  return (
    <div className='hostCheckInPage'>
        {
            checkInGuest.map((guest)=>(
                <HostCheckInCard key={guest.id} guest={guest} />
            ))
        }
    </div>
  )
}

export default HostCheckIn