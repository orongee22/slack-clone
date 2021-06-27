import React, { useCallback, useState } from "react";
import useInput from "@hooks/useInput";

import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import { Button, Error, Form, Header, Input, Label, LinkContainer } from "@pages/Login/style";
import useSWR from "swr/esm";
import fetcher from "@utils/fetcher";


const Login = () => {
  const {data, error, revalidate} = useSWR('http://localhost:3095/api/users', fetcher);
  const [email, ,setEmail ] = useInput("");
  const [password, , setPassword] = useInput("");

  const [loginError, setLoginError] = useState("");

  const handleChangePassword = useCallback((e) => {
    setPassword(e.target.value);
  }, []);

  const handleChangeEmail = useCallback((e)=>{
    setEmail(e.target.value);
  },[]);


  const handleSubmit = useCallback((e) => {
    e.preventDefault();

    setLoginError(""); // 요청 보내기 전 미리 초기화
    console.log(email);
    console.log(password);

    // 비동기 api 요청
    axios.post("http://localhost:3095/api/users/login", {
      email, password
    })
      .then((response) => {
        console.log(response.data);
        revalidate();

      })
      .catch((error) => {
        console.log(error.response);
        setLoginError(error.response?.data?.statusCode === 401);
      })
      .finally(() => {
        console.log(data);
      });
  }, [email, password]);

  if(data === undefined){
    return <div>...로딩 중</div>;
  }

  // 로그인 성공 후 data 받아왔다면 channel 로 이동
  if(data){
    return <Redirect to={"/workspace/channel"} />
  }

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
        <Button onClick={handleSubmit}>로그인</Button>
      </Form>
      <LinkContainer>
        <Link to="/signup">회원가입 하러가기</Link>
      </LinkContainer>
    </div>
  );
};

export default Login;