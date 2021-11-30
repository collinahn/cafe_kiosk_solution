import React from "react";
import Slider from "react-slick";
import styled from "styled-components";

export default function SimpleSlider({ menuArray }) {
  const settings = {
    dots: true,
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 3,
  };

  return (
    <div>
      <StyledSlider {...settings}>
        {menuArray.map((menu) => (
          <>
            {menu.price > 0 && (
              <SliderWrap>
                <WordsWrap>{menu.name}</WordsWrap>
              </SliderWrap>
            )}
          </>
        ))}
      </StyledSlider>
    </div>
  );
}

const StyledSlider = styled(Slider)`
  .slick-slide div {
    margin: 5px;
    box-shadow: 2px 2px 2px;
    width: 101px;
  }
  .slick-list {
    display: block;
    margin: 0 auto;
    margin-bottom: 25px;
  }
`;

const SliderWrap = styled.div`
  height: 88px;
  background-color: #c7c7dd;
  display: flex;
  justify-content: center;
  text-align: center;
`;

const WordsWrap = styled.p`
  margin-top: 25px;
`;
