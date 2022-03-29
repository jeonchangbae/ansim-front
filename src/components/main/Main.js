import axios from 'axios'
import React,{useEffect, useState} from 'react'
import Banner from './Banner'
import SmallCard from './SmallCard';
import './Main.css';
import LargeCard from './LargeCard';
import Header from './Header';
import Search from './Search';

function Main({exploreData, cardsData}) {
    
    const smallcardUrl = "http://localhost:8080/book/v1/home/list";
    // const smallcardUrl = "book/v1/home/list";
    const [smallCard, setSmallCard] = useState([]);

    useEffect(()=>{
        axios.get(smallcardUrl)
        .then(res=>{
            setSmallCard(res.data)
            console.log(smallCard)
        });
    },[]);

  return (
    <div>
        <Search />
        <Banner />
        <div className='smallCard_text'>
            <h2>Explore Nearby</h2>
        </div>
        <div className='smallCard'>
        {
            smallCard.map((item) =>(
                    <SmallCard key={item.id} id={item.homeId} image={item.image} homeName={item.homeName} shelter_location={item.shelter_location}
                    />
                )).slice(0,4)
        }
        </div>
        <div className='largeCard'>
            <LargeCard 
            img = "https://links.papareact.com/4cj"
            title="The Safty Home"
            description="Wishlists curated by Ansim"
            buttonText="Get Inspired"
            />
        </div>
    </div>
  )
}

export default Main 
