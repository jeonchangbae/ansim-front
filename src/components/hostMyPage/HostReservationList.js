import React, { useState, useEffect } from "react";
import GuestProfile from "../guestMyPage/GuestProfile";
import axios from "axios";
import { Card, CardContent, Typography, Button } from "@mui/material";

function HostReservationList() {
    const guestUrl = "";
    const [userProfile, setUserProfile] = useState([]);

    useEffect(() => {
        axios.get(guestUrl).then((res) => {
            setUserProfile(res.data);
            console.log(res.data);
        });
    }, []);
    return ( 
        <>
        <h3>예약번호</h3>
            <Card sx={{ maxWidth: 1000 }}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                    <div className="guest_reservation_profile">
                    {userProfile.map((guest) => (
                        <GuestProfile key={guest.id} guest={guest} />
                    ))}
                </div>
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                    </Typography>
                </CardContent>
                <Button variant="contained">
                    본인 확인 완료
                </Button>
            </Card>
            </>
     );
}

export default HostReservationList;