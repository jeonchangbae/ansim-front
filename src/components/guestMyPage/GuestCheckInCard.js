import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

function GuestCheckInCard({ reservation }) {
    return (
        <>
            <h3>체크인</h3>
            <Card sx={{ maxWidth: 1000 }}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        환영합니다. {reservation.userName}님 체크인이 완료
                        되었습니다.
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        <div>{reservation.shelter_name}</div>
                        <div>{reservation.shelter_location}</div>
                        <div>{reservation.roomName}</div>
                        <div>체크인 된 날짜 : {reservation.checkInDate}</div>
                    </Typography>
                </CardContent>
            </Card>
        </>
    );
}

export default GuestCheckInCard;
