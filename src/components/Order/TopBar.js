import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const TopBar= () => {

    return (
        <div>
        <BarWrap>
            <ButtonWrap> 
                <LinkWrap to="/start">
                    <RestartButtonWrap>돌아가기</RestartButtonWrap>
                </LinkWrap>
            </ButtonWrap>

            <InnerBarWrap>장바구니</InnerBarWrap>
        </BarWrap>
        </div>               
    );
};

export default TopBar;

const BarWrap = styled.div`
  display: flex;
  border-bottom: 2px solid black;
  background-color: #E9E9FE;
  padding: 5px;
`;

const InnerBarWrap = styled.div`
  margin-left: 90px;
  margin-top: 5px;
  text-shadow: 1px 1px 2px #493e3e;
  font-size: 15px;
  font-weight: bold;
  color: black;
`;

const LinkWrap = styled(Link)`
  width: 70px;
  text-decoration: none;
`;

const ButtonWrap = styled.div`
  display: flex;
  text-align: center;
  font-weight: bold;
  font-size: 12px;
`;

const RestartButtonWrap = styled.div`
  background-color: black;
  color: white;
  padding: 8px 0;
  border-radius: 8px;
  font-weight: bold;
  font-size: 12px;
  text-align: center;
`;

