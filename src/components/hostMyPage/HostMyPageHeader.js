import { Button } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../images/logo.jpg'

function HostMyPageHeader() {
    const navigate = useNavigate();
    return (  
        <div className='header'>
            <div className='header__logo'>
                <img src={logo} alt='logo.jpg'/>
            </div>
            
            <div className='header__signup'>
                <Button variant='outlined'>채팅 확인</Button>
                <Button variant='outlined'>메세지 확인</Button>
                <Button variant='outlined' onClick={()=>navigate('/host')}>본인 계정</Button>
                
            </div>
        </div>
    );
}

export default HostMyPageHeader;