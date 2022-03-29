import React, {useEffect, useState} from 'react';
import axios from "axios";

function HomePolicies(props) {
    // const checkInPoliciesUrl = "http://localhost:8080/book/v1/home_policy/check_in";
    // const checkOutPoliciesUrl = "http://localhost:8080/book/v1/home_policy/check_out";
    const checkInPoliciesUrl = "/book/v1/home_policy/check_in";
    const checkOutPoliciesUrl = "/book/v1/home_policy/check_out";
    const [checkInPolicies, setCheckInPolicies] = useState([]);
    const [checkOutPolicies, setCheckOutPolicies] = useState([]);

    useEffect(() => {
        axios.get(checkInPoliciesUrl).then(res => {
            setCheckInPolicies(res.data);
        })
        axios.get(checkOutPoliciesUrl).then(res => {
            setCheckOutPolicies(res.data);
        })
    }, [])

    return (
        <>
            <p className={"title"}>알아두어야 할 사항</p>
            <div className={"contents_container"}>
                <div className={"row"}>
                    <div className={"policy_box"}>
                        <p className={"policy_title"}>체크인 정책</p>
                        <ul>
                            {
                                props.homePolicies && checkInPolicies.map(checkInPolicy => (
                                    props.homePolicies.includes(checkInPolicy.id) ?
                                        <li key={checkInPolicy.id}>{checkInPolicy.homePolicy}</li> : null
                                ))
                            }
                        </ul>
                    </div>
                    <div className={"policy_box"}>
                        <p className={"policy_title"}>체크아웃 정책</p>
                        <ul>
                            {
                                props.homePolicies && checkOutPolicies.map(checkOutPolicy => (
                                    props.homePolicies.includes(checkOutPolicy.id) ?
                                        <li key={checkOutPolicy.id}>{checkOutPolicy.homePolicy}</li> : null
                                ))
                            }
                        </ul>
                    </div>
                    <div className={"policy_box"}>
                        <p className={"policy_title"}>쉼터 생활 규칙</p>
                        <p className={"policy_custom"}>{props.homePolicyCustom}</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default HomePolicies;