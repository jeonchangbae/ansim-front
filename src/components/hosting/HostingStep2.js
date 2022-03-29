import {Button} from '@mui/material';
import axios from 'axios';
import React, {useEffect, useRef, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import HostingHeader from './HostingHeader';

import './HostingStep2.css';
import RoomForm from './RoomForm';

function HostingStep2({test, setTest}) {

    const facUrl = "/book/v1/home_facility/list";
    // const facUrl = "http://localhost:8080/book/v1/home_facility/list";
    
    const navigate = useNavigate();
    const [rooms, setRooms] = useState([]);
    const [facility, setFacility] = useState([]);
    const [selectFacility, setSelectFacility] = useState([]);
    const shelterImage = useRef();
    const [shelterImages, setShelterImages] = useState([]);
    const [count, setCount] = useState(0);


    useEffect(() => {
        axios.get(facUrl)
            .then(res => {
                setFacility(res.data)
                console.log(res.data)
            })
    }, [])

    const handleClick = () => {
        for (let i = 0; i < count; i++) {
            rooms.push({
                roomName: document.getElementById("roomName" + i).value,
                singleBed: document.getElementById("roomSingleBed" + i).value,
                doubleBed: document.getElementById("roomDoubleBed" + i).value,
                bedding: document.getElementById("roomBedding" + i).value,
                gender: document.getElementById("roomGender" + i).value,
                maxHeadCount: document.getElementById("roomHeadCount" + i).value
            })
        }
        console.log(rooms)
        setTest(
            {
                ...test,
                rooms: rooms,
                facility: selectFacility,
                images: shelterImages
            })
        console.log(test);
        navigate('/hosting3');
    }


    const checkedItemHandler = (e) => {
        if (e.target.checked) {
            setSelectFacility([...selectFacility, e.target.id]);
            console.log(selectFacility);
        } else if (e.target.checked === false && selectFacility.find(item => item === e.target.id)) {
            setSelectFacility(selectFacility.filter(item => item !== e.target.id));
            console.log(selectFacility);
        }
    };

    const uploadImg = () => {
        if (shelterImage.current.value.substr("C:\\fakepath\\".length) !== "" && !shelterImages.includes(shelterImage.current.value.substr("C:\\fakepath\\".length))) {
            setShelterImages([
                ...shelterImages,
                shelterImage.current.value.substr("C:\\fakepath\\".length)
            ]);
        }
    }

    const delImg = (item) => {
        if (window.confirm("사진을 삭제하시겠습니까?")) {
            setShelterImages(shelterImages.filter(image => image !== item));
        }
    }

    const createRoomForm = (count) => {
        const roomForms = []
        for (let i = 0; i < count; i++) {
            roomForms.push(<RoomForm key={i} i={i}/>)
        }
        return roomForms
    }


    return (
        <div className='hostingstep2'>

            <HostingHeader/>
            <h2> 숙소 시설 정보 입력</h2>
            <div className='shleterFacility__container'>
                <h5>게스트가 숙소 에서 이용 할 수 있는 시설을 선택해 주세요</h5>
                {
                    facility.map((item) => (
                        <label key={item.id}>
                            <input type="checkbox" id={item.id}
                                   onChange={checkedItemHandler}
                            />
                            {item.homeFacilityName}
                        </label>
                    ))
                }
            </div>
            <div className='shelterFacility__room'>
                <h2> 숙소 객실 정보 입력</h2>
                <div className='room__choice'>
                    <h3> 객실 선택</h3>
                    <p>{count}</p>
                    <button onClick={() => setCount(count + 1)}>up</button>
                    <button onClick={() => count > 0 ? setCount(count - 1) : setCount(0)}>down</button>
                    {createRoomForm(count)}

                </div>
                <div className='line'>
                </div>
                <div className='room__photo'>
                    <h3>우리 숙소를 나타낼 수 있는 사진을 올려주세요</h3>
                    <div className='upload_img'>
                        {
                            shelterImages.map(item => (
                                <img key={item} alt="" src={`/img/${item}`} onClick={() => delImg(item)}/>
                            ))
                        }
                    </div>
                    <input type="file" id="image" ref={shelterImage}/>
                    <Button variant='contained' onClick={uploadImg}>사진 업로드</Button>
                </div>
            </div>
            <div className='hostingstep2__button'>
                <Button variant='contained' onClick={() => navigate('/hosting1')}>이전단계</Button>
                <Button variant='contained' onClick={handleClick}>다음단계</Button>
            </div>
        </div>
    );
}

export default HostingStep2;