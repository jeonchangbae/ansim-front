import React from 'react';

function HomeReview() {
    return (
        <>
            <p className={"title"}>쉼터 이용 후기</p>
            <div className={"contents_container"}>
                <div className={"review_box"}>
                    <div className={"star_box"}>
                        <img className={"star"} src="/img/star.svg" alt="star"/>
                        <img className={"star"} src="/img/star.svg" alt="star"/>
                        <img className={"star"} src="/img/star.svg" alt="star"/>
                        <img className={"star"} src="/img/star.svg" alt="star"/>
                        <img className={"star"} src="/img/star.svg" alt="star"/>
                    </div>
                    <p className={"review_text"}>이용후기 좋아요아주 좋아요이용후기 좋아요아주 좋아요이용후기 좋아요아주 좋아요이용후기 좋아요아주 좋아요이용후기 좋아요아주
                        좋아요이용후기 좋아요아주 좋아요이용후기
                        좋아요아주 좋아요</p>
                </div>
                <div className={"review_box"}>
                    <div className={"star_box"}>
                        <img className={"star"} src="/img/star.svg" alt="star"/>
                        <img className={"star"} src="/img/star.svg" alt="star"/>
                        <img className={"star"} src="/img/star.svg" alt="star"/>
                        <img className={"star"} src="/img/star.svg" alt="star"/>
                        <img className={"star"} src="/img/star.svg" alt="star"/>
                    </div>
                    <p className={"review_text"}>이용후기 좋아요아주 좋아요이용후기 좋아요아주 좋아요이용후기 좋아요아주 좋아요이용후기 좋아요아주 좋아요이용후기 좋아요아주
                        좋아요이용후기 좋아요아주 좋아요이용후기
                        좋아요아주 좋아요</p>
                </div>
            </div>
        </>
    );
}

export default HomeReview;