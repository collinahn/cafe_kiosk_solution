import React, { useState } from "react";
import styled from "styled-components";
import useInput from "../../Hooks/useInput";
import axios from "axios";

let pwd = "1234";
axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://127.0.0.1:5000";
export default function AddMenu() {
  const [disabled, setDisabled] = useState(false);
  const [showPopupMenu, setShowPopupMenu] = useState(false);
  const [itemname, onChangeItemName] = useInput("");
  const [itemCode, onChangeItemCode] = useInput("");
  const [itemPrice, onChangeItemPrice] = useInput("");
  const [itemClass, onChangeItemClass] = useInput("");
  const [finishTime, onChangeFinishTime] = useInput("");
  const [thumbnail, onChangeThumbnail] = useInput("");
  const [password, onChangePassword] = useInput("");

  const onSubmitForm = async (e) => {
    setDisabled(true);
    e.preventDefault();
    await new Promise((r) => setTimeout(r, 1000));
    if (pwd === password) {
      axios
        .post(
          "/admin/",
          {
            code: itemCode,
            name: itemname,
            category: itemClass,
            price: itemPrice,
            time: finishTime,
            avail: true,
            url: thumbnail,
            init: true,
          },
          { withCredentials: true },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          console.log(response);
          alert("등록되었습니다");
          setShowPopupMenu(false);
        })
        .catch((err) => {
          alert("Error!");
          console.error(err);
        });
      // alert("등록되었습니다");
      setDisabled(false);
      setShowPopupMenu(false);
    } else {
      alert("비밀번호가 일치하지 않습니다");
      setDisabled(false);
    }
  };
  // [Itemname, itemCode, itemPrice, category, time, password]

  const togglePopup = () => {
    if (showPopupMenu) {
      setShowPopupMenu(false);
    } else {
      setShowPopupMenu(true);
    }
  };
  return (
    <>
      {showPopupMenu ? (
        <ToggledBackgroundWrap>
          <ToggleWrap>
            <TitleWrap>상품 추가하기</TitleWrap>
            <FormWrap onSubmit={onSubmitForm}>
              <Input
                type="text"
                onChange={onChangeItemName}
                placeholder="상품명"
              />
              <Input
                type="text"
                onChange={onChangeItemCode}
                placeholder="상품코드"
              />
              <Input
                type="text"
                onChange={onChangeItemClass}
                placeholder="카테고리"
              />
              <Input
                type="number"
                onChange={onChangeItemPrice}
                placeholder="단가"
              />
              <Input
                type="number"
                onChange={onChangeFinishTime}
                placeholder="예상완료 시간(분)"
              />
              <br />
              <LabelForInput htmlFor="thumbnails">사진 업로드</LabelForInput>
              <br />
              <input
                type="file"
                name="thumbnail"
                id="thumbnails"
                style={{ display: "none" }}
                onChange={onChangeThumbnail}
              />
              <Input
                type="password"
                onChange={onChangePassword}
                placeholder="관리자 비밀번호"
              />
              <br />
              <BottomWrap>
                {!itemname ||
                !itemCode ||
                !itemClass ||
                !itemPrice ||
                !finishTime ||
                !thumbnail ||
                !password ? (
                  <>
                    <ErrorMessageWrap>
                      모든 입력칸을 채워주세요
                    </ErrorMessageWrap>
                    <CancelButtonWrap onClick={togglePopup}>
                      취소
                    </CancelButtonWrap>
                    <NotReadyButtonWrap disabled={true}>
                      완료
                    </NotReadyButtonWrap>
                  </>
                ) : (
                  <>
                    <SpaceWrap>dd</SpaceWrap>
                    <CancelButtonWrap onClick={togglePopup}>
                      취소
                    </CancelButtonWrap>
                    <ReadyButtonWrap disabled={disabled}>완료</ReadyButtonWrap>
                  </>
                )}
              </BottomWrap>
            </FormWrap>
          </ToggleWrap>
        </ToggledBackgroundWrap>
      ) : null}
      <AddButtonWrap onClick={togglePopup}>추가하기</AddButtonWrap>
    </>
  );
}

const SpaceWrap = styled.div`
  visibility: hidden;
`;

const BottomWrap = styled.div`
  margin: 10px 0;
`;

const CancelButtonWrap = styled.button`
  background-color: #202070;
  border: none;
  font-size: 15px;
  color: white;
  border-radius: 10px;
  padding: 10px 20.5px;
  margin: 0 10px 0 50px;
  opacity: 0.6;
`;

const AddButtonWrap = styled.button`
  margin: 0 auto;
  margin-top: 100px;
  display: block;
  background-color: black;
  border: none;
  font-size: 15px;
  color: white;
  border-radius: 10px;
  padding: 10px 20.5px;
`;

const NotReadyButtonWrap = styled.button`
  background-color: gray;
  border: none;
  font-size: 15px;
  color: white;
  border-radius: 10px;
  padding: 10px 20.5px;
`;

const ReadyButtonWrap = styled.button`
  background-color: black;
  border: none;
  font-size: 15px;
  color: white;
  border-radius: 10px;
  padding: 10px 20.5px;
`;

const ErrorMessageWrap = styled.div`
  color: red;
  font-weight: 400;
`;

const LabelForInput = styled.label`
  padding: 5px 10px;
  background-color: #ff6600;
  border-radius: 4px;
  color: white;
  cursor: pointer;
`;

const Input = styled.input`
  width: 183px;
  height: 32px;
  margin-bottom: 5px;
  padding-left: 10px;
  background-color: #dedef7;
  box-shadow: inset 0px 3px 3px #aaa;
  border: none;
  border-radius: 10px;
  &:focus {
    outline: none;
  }
`;

const FormWrap = styled.form`
  margin-top: 15px;
  text-align: center;
`;

const TitleWrap = styled.div`
  width: 142px;
  height: 32px;
  border-radius: 18px;
  background-color: #493e3e;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  color: white;
  margin: 0 auto;
  margin-top: 16px;
  padding-top: 10px;
`;

const ToggledBackgroundWrap = styled.div`
  bottom: 60px;
  position: absolute;
  left: 44px;
  display: flex;
  justify-content: center;
`;
const ToggleWrap = styled.div`
  background-color: white;
  width: 299px;
  border-radius: 30px;
  border: 5px solid #383843;
  z-index: 1;
`;

// const AddMenuWrap = styled.div`
//   padding-top: 15px;
//   display: flex;
//   flex-wrap: wrap;
//   justify-content: center;
//   border: 2px solid black;
//   border-top: none;
//   border-bottom: none;
// `;

// const EmptyMenuWrap = styled.div`
//   width: 86px;
//   height: 81px;
//   background-color: #f6f6ff;
//   border: 1px solid #493e3e;
//   box-shadow: inset 0px 3px 3px #aaa;
//   border-radius: 10px;
//   text-align: center;
//   margin: 0 3px 15px 3px;
// `;

// const EmptyMenuItemNameWrap = styled.p`
//   font-weight: bold;
//   font-size: 24px;
//   margin-top: 27px;
// `;
