import React from 'react';
import './LargeCard.css';

function LargeCard({img, title, description, buttonText}) {
  return (
    <div className='largeCard__container'>
        <div className='largeCard__img'>
            <img src={img} alt='large_imge'/>
        </div>
        <div className='largeCard__text'>
            <h3>{title}</h3>
            <p>{description}</p>

            <button className='largeCard__button'>{buttonText}</button>
        </div>
    </div>
  )
}

export default LargeCard