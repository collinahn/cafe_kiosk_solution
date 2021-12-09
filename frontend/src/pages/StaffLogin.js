import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logo from "../assets/image/Logo.svg";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://127.0.0.1:5000";
export default function Login({ props, name }) {
  const history = useHistory();
  const [Id, setId] = useState("");
  const [Password, setPassword] = useState("");

  const joinHandler = (e) => {
    e.preventDefault();
    try {
      const data = { id: Id, pw: Password, actor: "staff" };
      axios
        .post("/auth/", JSON.stringify(data), {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          console.log(JSON.stringify(res));
          console.log("res.data.accessToken : " + res.data);
          console.log(res.data);
          axios.defaults.headers.common["Authorization"] = "Bearer " + res.data;
          history.push("/staff");
        })
        .catch((ex) => {
          console.log("login request fail: " + ex);
        })
        .finally(() => console.log("login request end"));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    console.log("LoginPage render ...");
  }, []);

  const onIdHandler = (event) => {
    setId(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  return (
    <>
      <TitleWrap>
        <img
          style={{ width: "48px", height: "50px", margin: "18px 10px 15px 0" }}
          src={Logo}
          id="Logo"
          alt="Logo"
        />
        <NameWrap>
          ABC COFFEE-
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;manager
        </NameWrap>
      </TitleWrap>
      <LoginWrap>
        <Form onSubmit={joinHandler}>
          <label>
            &nbsp;&nbsp;&nbsp;아이디:&nbsp;&nbsp;
            <Input type="text" value={Id} onChange={onIdHandler}></Input>
          </label>
          <label style={{ marginTop: "10px" }}>
            비밀번호:&nbsp;&nbsp;
            <Input
              type="password"
              value={Password}
              onChange={onPasswordHandler}
            ></Input>
          </label>
          <LoginButtonWrap type="submit">입장하기</LoginButtonWrap>
        </Form>
      </LoginWrap>
      <LinkWrap to="/start">
        <ButtonWrap>초기 페이지로 이동</ButtonWrap>
      </LinkWrap>
    </>
  );
}

const LoginWrap = styled.div`
  margin-top: 60px;
  display: flex;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
`;

const Input = styled.input`
  width: 183px;
  height: 32px;
  margin-bottom: 5px;
  background-color: white;
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: "2px solid black";
  &:focus {
    outline: none;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  text-align: center;
`;

const LinkWrap = styled(Link)`
  width: 290px;
  text-decoration: none;
`;

const LoginButtonWrap = styled.button`
  width: 290px;
  text-decoration: none;
  background-color: black;
  color: white;
  padding: 12px 0;
  border-radius: 40px;
  margin: 40px 50px 0 50px;
  display: flex;
  justify-content: center;
  text-align: center;
  font-weight: bold;
  font-size: 20px;
`;

const ButtonWrap = styled.div`
  background-color: white;
  color: #c4c4c4;
  padding: 5px 0;
  margin-top: 10px;
  text-decoration: underline;
  text-align: center;
  font-weight: bold;
  font-size: 15px;
`;

const TitleWrap = styled.div`
  margin-top: 130px;
  display: flex;
  justify-content: center;
`;

const NameWrap = styled.p`
  text-shadow: 1px 1px 2px #493e3e;
  font-size: 36px;
  font-weight: bold;
  margin: 18px 0 10px 0;
  color: #493e3e;
`;
