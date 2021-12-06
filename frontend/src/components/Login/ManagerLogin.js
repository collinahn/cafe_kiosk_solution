import React, { useEffect } from "react";
import styled from "styled-components";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

axios.defaults.withCredentials = true;

export default function ManagerLogin(props) {
  const [Id, setId] = useState("");
  const [Password, setPassword] = useState("");

  const joinHandler = (e) => {
    e.preventDefault();
    try {
      const data = { Id, Password };
      axios
        .post("http://127.0.0.1:5000/auth", JSON.stringify(data), {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          console.log("res.data.accessToken : " + res.data);
          axios.defaults.headers.common["Authorization"] = "Bearer " + res.data;
          props.loginCallBack(true);
          props.history.push("/main");
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
  });

  const onIdHandler = (event) => {
    setId(event.currentTarget.value);
    console.log("Id", Id);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
    console.log("Password", Password);
  };

  // const onSubmitHandler = (event) => {
  //   event.preventDefault();
  //   console.log("Id", Id);
  //   console.log("Password", Password);
  // };

  return (
    <div>
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
    </div>
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
  flex-direction: column; ;
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
