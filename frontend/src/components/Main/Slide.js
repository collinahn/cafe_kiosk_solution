import React from "react";
import Slider from "react-slick";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function SimpleSlider({ menuArray }) {
  const settings = {
    dots: true,
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 3,
    arrows: false,
  };
  return (
    <div>
      <StyledSlider {...settings}>
        {menuArray.length > 0 ? (
          menuArray.map((menu, idx) => (
            <>
              <SliderWrap key={idx}>
                <WordsWrap key={idx}>{menu.itemName}</WordsWrap>
              </SliderWrap>
            </>
          ))
        ) : (
          <>
            <EmptyWrap />
          </>
        )}
      </StyledSlider>
    </div>
  );
}

const StyledSlider = styled(Slider)`
  .slick-slide div {
    margin: 5px;
    width: 101px;
  }

  .slick-list {
    display: block;
    margin: 0 auto;
    padding-bottom: 25px;
  }
`;

const EmptyWrap = styled.div`
  height: 88px;
  visibility: hidden;
  appearance: none;
`;

const SliderWrap = styled.div`
  height: 88px;
  background-color: #c7c7dd;
  display: flex;
  justify-content: center;
`;

const WordsWrap = styled.p`
  margin-top: 25px;
`;
