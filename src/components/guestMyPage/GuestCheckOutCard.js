import React from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";

function GuestCheckOutCard({ reservation }) {
    return (
        <>
            <h3>체크아웃</h3>
            <Card sx={{ maxWidth: 1000 }}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {reservation.userName}님의 체크아웃 일정입니다.
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        <div>{reservation.shelter_name}</div>
                        <div>{reservation.shelter_location}</div>
                        <div>{reservation.roomName}</div>
                        <div>
                            체크아웃 예정 날짜 : {reservation.checkOutDate}
                        </div>
                    </Typography>
                </CardContent>
                <Button variant="contained" color="error">
                    체크 아웃 하기
                </Button>
            </Card>
        </>
    );
}

export default GuestCheckOutCard;
