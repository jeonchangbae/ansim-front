import React from 'react';
import './Banner.css';
import bgImg from '../../images/background3.jpg'

function Banner() {
  return (
    <div  >
        <div className='banner__img'>
            {/* <img src='http://links.papareact.com/0fm' alt='banner'/> */}
              <img src={bgImg} alt='banner'/>
            {/* <div className='banner__text'>
            <p>Not sure where to go? Ansim.</p>
            <button>Come here</button>
            </div> */}
        </div>


    </div>
  )
}

export default Banner