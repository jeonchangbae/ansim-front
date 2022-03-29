import {FormControl, InputLabel, MenuItem, Select, TextField} from '@mui/material';
import React, {useState} from 'react';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import './RoomForm.css';

function RoomForm({i}) {
    const [gender, setGender] = useState('');
    const [roomName, setRoomName] = useState('');
    const [bedCounter, setBedCounter] = useState(0);
    const [bed2Counter, setBed2Counter] = useState(0);
    const [blanketCounter, setBlanketCounter] = useState(0);
    const [peopleCounter, setPeopleCounter] = useState(0);


    const handleGenderChange = (event) => {
        setGender(event.target.value);
    }

    const handleBedIncrement = () => {
        setBedCounter(bedCounter + 1);
    }
    const handleBedDecrement = () => {
        if (bedCounter <= 0) {
            setBedCounter(0);
        } else {
            setBedCounter(bedCounter - 1);
        }
    }
    const handleBed2Increment = () => {
        setBed2Counter(bed2Counter + 1);
    }
    const handleBed2Decrement = () => {
        if (bed2Counter <= 0) {
            setBed2Counter(0);
        } else {
            setBed2Counter(bed2Counter - 1);
        }
    }
    const handleBlanketIncrement = () => {
        setBlanketCounter(blanketCounter + 1);
    }
    const handleBlanketDecrement = () => {
        if (blanketCounter <= 0) {
            setBlanketCounter(0);
        } else {
            setBlanketCounter(blanketCounter - 1);
        }
    }
    const handlePeoPleIncrement = () => {
        setPeopleCounter(peopleCounter + 1);
    }
    const handlePeoPleDecrement = () => {
        if (peopleCounter <= 0) {
            setPeopleCounter(0);
        } else {
            setPeopleCounter(peopleCounter - 1);
        }
    }

    return (
        <div className='roomOption'>
            <div>
                <h3> 객실 이름 </h3>
                <TextField
                    id={`roomName${i}`}
                    label="객실 이름"
                    variant="outlined"
                    className='roomname'
                    value={roomName}
                    onChange={({target: {value}}) => setRoomName(value)}/>

                <h4>객실 에는 어떤 침대가 제공 되나요?</h4>
                <h5>싱글 침대</h5>
                <div className='bed__count'>
                    <RemoveCircleOutlineIcon name="dec" onClick={handleBedDecrement}/>
                    <input id={`roomSingleBed${i}`} className="inputNumber" type="number" value={bedCounter}/>
                    <AddCircleOutlineIcon name="inc" onClick={handleBedIncrement}/>
                </div>
                <h5>2층 침대</h5>
                <div className='bed2__count'>
                    <RemoveCircleOutlineIcon name="dec" onClick={handleBed2Decrement}/>
                    <input id={`roomDoubleBed${i}`} className="inputNumber" type="number" value={bed2Counter}/>
                    <AddCircleOutlineIcon name="inc" onClick={handleBed2Increment}/>
                </div>
                <h5>이불 지원</h5>
                <div className='blanket__count'>
                    <RemoveCircleOutlineIcon name="dec" onClick={handleBlanketDecrement}/>
                    <input id={`roomBedding${i}`} className="inputNumber" type="number" value={blanketCounter}/>
                    <AddCircleOutlineIcon name="inc" onClick={handleBlanketIncrement}/>
                </div>

                <h3> 이객실 에 선택 가능한 인원은 몇명인가요?</h3>
                <FormControl sx={{m: 2, minWidth: 700}}>
                    <InputLabel>남/녀 성별 선택</InputLabel>
                    <Select
                        id={`roomGender${i}`}
                        value={gender}
                        onChange={handleGenderChange}
                    >
                        <MenuItem value={'male'}>남성</MenuItem>
                        <MenuItem value={'female'}>여성</MenuItem>
                    </Select>
                </FormControl>
                <h3>이 객실에는 숙박 가능한 인원은 몇명인가요?</h3>
                <div className='people__count'>
                    <RemoveCircleOutlineIcon name="dec" onClick={handlePeoPleDecrement}/>
                    <input id={`roomHeadCount${i}`} className="inputNumber" type="number" value={peopleCounter}/>
                    <AddCircleOutlineIcon name="inc" onClick={handlePeoPleIncrement}/>
                </div>
            </div>
        </div>
    );
}

export default RoomForm;