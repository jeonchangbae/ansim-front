import React from 'react'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import './InfoCard.css';
import {useNavigate} from 'react-router-dom';

function InfoCard({shelter, homeFacilities}) {
    const navigate = useNavigate();

    return (
        <div className='list_container'>
            <div className=''>
                <img src={`img/${shelter.image}`} layout='fill' objectFit='cover' className='rounded-2xl'
                     alt='roomImg'/>
            </div>

            <div className='card_info'>
                <div className='card_info-category'>
                    <h4>{shelter.homeName}</h4>
                    <p>{shelter.homeCategoryName}</p>
                    <FavoriteBorderIcon/>
                </div>
                <p>{shelter.homeAddress}</p>
                <p>{shelter.maxHeadCount}</p>
                <div className='card_bottom'>
                    <p>
                        {
                            homeFacilities.map(homeFacility => (
                                <img className={"info_facility_icon"} key={homeFacility} src={`/img/facility${homeFacility}.svg`} alt={homeFacility}/>
                            ))
                        }
                    </p>
                    <button onClick={() => navigate(`/home_reservation/${shelter.homeId}`)}>예약 가능 옵션 보기</button>
                </div>
            </div>
        </div>
    )
}

export default InfoCard