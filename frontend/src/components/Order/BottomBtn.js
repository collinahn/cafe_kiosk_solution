import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const BottomBtn= () => {

    return (
        
            <ButtonWrap>
                <LinkWrap to="/complete">
                    <PayButtonWrap>카드로 결제하기</PayButtonWrap>
                </LinkWrap>
            </ButtonWrap>
                                                  
    );
};

export default BottomBtn;

const LinkWrap = styled(Link)`
  width: 100%;
  text-decoration: none;
`;

const ButtonWrap = styled.div`
  text-align: center;
  font-weight: bold;
  font-size: 12px;
`;

const PayButtonWrap = styled.div`
  background-color: #DADCFF;
  color: black;
  padding: 18px 0;
  text-shadow: 1px 1px 2px #493e3e;
  font-size: 15px;
  font-weight: bold;
  color: black;
`;
