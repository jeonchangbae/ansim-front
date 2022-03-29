import React from 'react';
import './EditHome.css'

function EditHome(props) {
    return (
        <>
            <div className='header_section'>
                <p className={"reservation_header"}> 숙소 정보 변경</p>
            </div>

            <div className={"container"}>
                <p className={"title"}>숙소 열기 닫기</p>
                <div className={"contents_container"}>
                    <p className={"home_status_title"}>숙소 상태</p>
                    <div className={"home_status"}>
                        <div>
                            <input type={"radio"} name={"home_status"} value={"open"}/>
                            <span>열기</span>
                            <p>숙소 열기를 하시면 게스트가 숙소를 검색하고 예약 할 수 있습니다.</p>
                        </div>
                        <div>
                            <input type={"radio"} name={"home_status"} value={"close"}/>
                            <span>닫기</span>
                            <p>숙소 닫기를 하시면 열기를 하기 전까지 예약이 불가능 합니다.</p>
                        </div>
                        <div className={"home_status_button_box"}>
                            <button>저장하기</button>
                        </div>
                    </div>
                </div>

                <p className={"title"}>숙소 정보 변경</p>
                <div className={"contents_container"}>
                    <div className={"row"}>
                        <div className={"edit_home_small_title"}>숙소 유형</div>
                        <div className={"edit_home_small_content"}>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default EditHome;