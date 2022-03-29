/*global kakao*/
import React, {useEffect} from 'react'

function Location(props) {

    useEffect(() => {
        var container = document.getElementById('reservation_map_box');
        var options = {
            center: new kakao.maps.LatLng(props.coordinateX , props.coordinateY),
            level: 3
        };

        var map = new kakao.maps.Map(container, options);
        var markerPosition  = new kakao.maps.LatLng(props.coordinateX , props.coordinateY);
        var marker = new kakao.maps.Marker({
            position: markerPosition
        });
        marker.setMap(map);
    }, [props])


    return (
        <div id="reservation_map_box" className={"reservation_map_box"}></div>
    )
}

export default Location;