import React, { useCallback, useState } from "react";
import useInput from "@hooks/useInput";

import axios from "axios";
import { Link } from "react-router-dom";
import { Button, Error, Form, Header, Input, Label, LinkContainer } from "@pages/Login/style";


const Login = () => {
  const [email, handleChangeEmail, setEmail] = useInput("");
  const [nickname, handleChangeNickname, setNickname] = useInput("");
  const [password, , setPassword] = useInput("");

  const [loginError, setLoginError] = useState("");

  const handleChangePassword = useCallback((e) => {
    setPassword(e.target.value);
  }, []);


  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    console.log(email, password);
    console.log("서버로 로그인하기");
    setLoginError(""); // 요청 보내기 전 미리 초기화

    // 비동기 api 요청
    axios.post("/api/users/login", {
      email, password
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error.response);
        setLoginError(error.response.data);
      })
      .finally(() => {
      });
  }, [email, nickname, password]);

  return (
    <div id="container">
      <Header>Slack</Header>
      <Form onSubmit={handleSubmit}>
        <Label id="email-label">
          <span>이메일 주소</span>
          <div>
            <Input
              type="email"
              name="email"
              value={email}
              onChange={handleChangeEmail} />
          </div>
        </Label>
        <Label id="password">
          <span>비밀번호</span>
          <Input
            type="password"
            name="password"
            value={password}
            onChange={handleChangePassword} />
          {loginError && <Error>이메일과 비밀번호 조합이 일치하지 않습니다.</Error>}
        </Label>
        <Button type="submit">로그인</Button>
      </Form>
      <LinkContainer>
        <Link to="/signup">회원가입 하러가기</Link>
      </LinkContainer>
    </div>
  );
};

export default Login;