import React, {useEffect, useState} from 'react';
import Location from "./Location";

function HomeView(props) {
    const [imgUrl, setImgUrl] = useState("");

    const clickImage = (e) => {
        setImgUrl(e.target.src);
    }

    useEffect(() => {
        if (props.images) {
            setImgUrl(`/img/${props.images[0]}`)
        }
    }, [props])

    return (
        <>
            <p className={"title"}>안심 청소년 쉼터</p>
            <div className={"image_container"}>
                <div className={"map_container"}>
                    <p className={"map_title"}>위치 지도 보기</p>
                    <Location coordinateX={props.coordinateX} coordinateY={props.coordinateY}/>
                </div>
                <div className={"home_image_box"}>
                    <img className={"home_image"} src={imgUrl} alt=""/>
                </div>
                <div className={"home_images_box"}>
                    {
                        props.images && props.images.map(image => (
                            <img key={image} className={"home_images"} src={`/img/${image}`} alt={image} onClick={clickImage}/>
                        ))
                    }
                </div>
            </div>
        </>
    );
}

export default HomeView;