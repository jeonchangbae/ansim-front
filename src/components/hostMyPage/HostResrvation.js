import React, { useState } from "react";
import "./HostReservation.css";
import { Tab, Tabs } from "@mui/material";
import HostReservationList from "./HostReservationList";
import HostCheckOutCard from "./HostCheckOutCard";
import HostCheckIn from "./HostCheckIn";

function HostReservation() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
      setValue(newValue);
    };


  return (
      <div className="host_reservation_body">
          <Tabs
                      className='tabs'
                      value={value}
                      onChange={handleChange}
                  >
                      <Tab style={{fontSize : '20px', color : '#043a25', fontWeight : 'bold'}} label="예약목록" />
                      <Tab style={{fontSize : '20px', color : '#043a25', fontWeight : 'bold'}} label="체크인" />
                      <Tab style={{fontSize : '20px', color : '#043a25', fontWeight : 'bold'}} label="체크아웃" />
                  </Tabs>

                  {value === 0 && <HostReservationList /> }
                  {value === 1 && <HostCheckIn /> }
                  {value === 2 && <HostCheckOutCard /> }
      </div>
  );
}

export default HostReservation;
