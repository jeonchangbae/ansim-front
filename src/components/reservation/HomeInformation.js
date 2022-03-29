import React from 'react';

function HomeInformation(props) {
    return (
        <>
            <p className={"title"}>쉼터 설명</p>
            <div className={"contents_container"}>
                <p className={"home_information"}>{props.information}</p>
            </div>
        </>
    );
}

export default HomeInformation;