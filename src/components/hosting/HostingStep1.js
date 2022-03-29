
import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import idea from '../../images/idea.png';
import HostingHeader from './HostingHeader';

function HostingStep1({test, setTest}) {
    const navigate = useNavigate();
    // const catUrl = "http://localhost:8080/book/v1/home_category/list";
    const catUrl = "/book/v1/home_category/list";
    const [homeCategory, setHomeCategory] = useState([]);
    const [homeName, setHomeName] = useState('');
    const [selectCat, setSelectCat] = useState([]);
    const [homeHostPhone, setHomeHostPhone] = useState('');
    const [homeHostEmail, setHomeHostEmail] = useState('');
    const [city, setCity] = useState('');

    useEffect(()=>{
        axios.get(catUrl)
        .then(res =>{
            setHomeCategory(res.data)
            console.log(res.data)
        });
    },[]);

    
    const handleChange = (event) => {
        setCity(event.target.value);
    };
    const handleCatClick =(e)=>{
        setSelectCat(e.target.id);
        console.log(selectCat);
    }

    const handleClick =()=>{
        setTest({
            ...test,
            city : city,
            homeCategoryId : selectCat,
            homeName : homeName ,
            homeHostPhone : homeHostPhone,
            homeHostEmail : homeHostEmail
        })
        navigate('/hosting2');
    }


    return (  
        <>
        <HostingHeader />
        <div className='hostingDate'>
            <div className='hostingDate__title'>
                <h2> 숙소 유형 선택</h2>
            </div>
            <div className='hostingDate__container'>
                {
                    homeCategory.map((item)=>(
                        <Button 
                        variant='outlined' 
                        key={item.id}
                        id={item.id}
                        onClick={handleCatClick}
                        > {item.homeCategoryName}</Button>
                    ))
                }
            </div>
            <div className='hostingname'>
                <h2> 숙소 이름 입력 </h2>
            </div>
            <div className='hostingname__input'>
                <input placeholder='숙소 이름 입력'
                onChange={({target : {value}})=>setHomeName(value)}></input>
                <div className='hostingname__info'>
                    <img src={idea} alt="idea.png"/>
                    <h4>숙소 이름이 필요한 이유</h4>
                    <h4>숙소 이름은 저희 사이트에
                        표시되는 명칭 이자 ID가 됩니다.
                        필수로 입력 부탁 드립니다

                        이름은 중복 입력이 불가능 합니다.
                        만약 중복이라면 ? 

                        이름과 함께 지역을 기재 해주세요
                    </h4>
                    <h4 style={{color :'red'}}> 예) 안심 쉼터 부산</h4>
                </div>
            </div>
            <h2>호스트 정보 입력</h2>
            <h4>호스트 전화번호 입력</h4>
            <div className='hostingPhone__input'>
            <input placeholder='호스트 전화번호 인풋'
                onChange={({target : {value}})=>setHomeHostPhone(value)}></input>
            </div>
            <h4>호스트 이메일 입력</h4>
            <div className='hostingEmail__input'>
            <input placeholder='호스트 이메일 입력 인풋'
                onChange={({target : {value}})=>setHomeHostEmail(value)}></input>
            </div>
        </div>
        <div className='hostinglocation'>
            <div className='choice__city'>
                <h2> 숙소 위치 입력</h2>
                <h4> 지역</h4>
                <FormControl sx={{ m: 3, minWidth: 500 }}>
                    <InputLabel >city</InputLabel>
                    <Select
                        value={city}
                        onChange={handleChange}
                    >
                        <MenuItem value={'부산'}>부산</MenuItem>
                        <MenuItem value={'서울'}>서울</MenuItem>
                        <MenuItem value={'대전'}>대전</MenuItem>
                        <MenuItem value={'대구'}>대구</MenuItem>
                        <MenuItem value={'강원'}>강원</MenuItem>
                        <MenuItem value={'전남'}>전남</MenuItem>
                        <MenuItem value={'제주'}>제주</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <div>
                <h2> 우편 번호</h2>
                <input />
            </div>
            <div>
                <h2> 도로명 주소 또는 지번 주소</h2>
                <input />
            </div>
            <div>
                <h2> 건물 이름 또는 번호, 층수</h2>
                <input />
            </div>
            <div className='hosting_map'>
                <h1> 지도 표시</h1>
                <div className='map_box'>
                
                </div>
            </div>
            <div className='hostingstep1__button'>
                <Button variant='container' onClick={handleClick} >다음단계</Button>
            </div>
        </div>
        </>
    );
}

export default HostingStep1;