import React, {useEffect, useState} from 'react';
import axios from "axios";

function HomeFacilities(props) {
    // const homeFacilitiesUrl = "http://localhost:8080/book/v1/home_facility/list";
    const homeFacilitiesUrl = "/book/v1/home_facility/list";
    const [homeFacilities, setHomeFacilities] = useState([]);

    const checkFacility = (id, homeFacilityName) => {
        return (
            <div key={id} className={"facility_box"}>
                <img className={"facility_icon"} src={`/img/facility${id}.svg`} alt={homeFacilityName}/>
                <p className={"facility_text"}>{homeFacilityName}</p>
            </div>
        )
    }

    useEffect(() => {
        axios.get(homeFacilitiesUrl).then(res => {
            setHomeFacilities(res.data);
        })
    }, [])

    return (
        <>
            <p className={"title"}>쉼터 시설 정보</p>
            <div className={"contents_container"}>
                <div className={"row"}>
                    {
                        props.homeFacilities && homeFacilities.map(homeFacility => (
                            props.homeFacilities.includes(homeFacility.id) ? checkFacility(homeFacility.id, homeFacility.homeFacilityName) : null
                        ))
                    }
                </div>
            </div>
        </>
    );
}

export default HomeFacilities;