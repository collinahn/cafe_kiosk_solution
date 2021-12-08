import React from "react";
import styled from "styled-components";
import  { useState } from "react";
import Buttonx from "../../assets/image/Buttonx.svg";
import "../../assets/css/CancelOrder.css";

export default function CancelOrder() {

  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  if(modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

    return (
      <div>      
      <ButtonWrap>          
          <CancelButtonWrap onClick={toggleModal} className="btn-modal">주문 취소하기</CancelButtonWrap>          
      </ButtonWrap>


      {/*주문 취소하기 버튼 눌렀을 때, 주방에서 접수를 했으면 '이미 준비중인 상품입니다.'
      주방에서 아직 접수를 안 했으면, '결제가 취소되었습니다.'*/}
      
      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            
            <h2>결제가</h2>
            <h2>취소되었습니다.</h2>
            
            <img className="close-modal" onClick={toggleModal}
              style={{width: "25px", height: "25px"
              }}
              src={Buttonx}
              id="Buttonx"
              alt="Buttonx"
            /> 
            
          </div>
        </div>
      )}
        
    </div>
    );
  }



const ButtonWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-weight: bold;
  font-size: 12px;

`;

const CancelButtonWrap = styled.div`
  background-color: rgba(0, 0, 0, 0.1);
  width: 130px;
  color: black;
  padding: 3.5px 0;
  border-radius: 40px;
  margin-top: 5px;
  display: flex;
  justify-content: center;
  text-align: center;
  font-weight: bold;
  font-size: 12px;
`;
