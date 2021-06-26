import React, { useCallback, useState } from "react";
import { Button, Error, Form, Header, Input, Label, LinkContainer } from "./styles";
import useInput from "@hooks/useInput";
import axios from "axios";


const SignUp = () => {
  const [email, handleChangeEmail, setEmail] = useInput("");
  const [nickname, handleChangeNickname, setNickname] = useInput("");
  const [password, , setPassword] = useInput("");
  const [passwordCheck, , setPasswordCheck] = useInput("");
  const [mismatchError, setMismatchError] = useState(false);

  const handleChangePassword = useCallback((e) => {
    setPassword(e.target.value);
    setMismatchError(e.target.value !== passwordCheck);
  }, [passwordCheck]);

  const handleChangePasswordCheck = useCallback((e) => {
    setPasswordCheck(e.target.value);
    setMismatchError(e.target.value !== password); // 기존 password 랑 같은지 비교하기
  }, [passwordCheck]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    console.log(email, nickname, password, passwordCheck);
    if (!mismatchError && nickname) {
      console.log("서버로 회원가입하기");

      // 비동기 api 요청
      axios.post("http://loalhost:3095/api/users", {
        email, nickname, password
      })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error.response);
        })
        .finally(() => {
        });
    }
  }, [email, nickname, password, passwordCheck]);

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
        <Label id="nickname-label">
          <span>닉네임</span>
          <Input
            type="text"
            name="nickname"
            value={nickname}
            onChange={handleChangeNickname} />
        </Label>
        <Label id="password">
          <span>비밀번호</span>
          <Input
            type="password"
            name="password"
            value={password}
            onChange={handleChangePassword} />
        </Label>
        <Label id="password-check-label">
          <span>비밀번호 확인</span>
          <div>
            <Input
              type="password"
              id="password-check"
              name="password-check"
              value={passwordCheck}
              onChange={handleChangePasswordCheck}
            />
          </div>
          {mismatchError && <Error>비밀번호가 일치하지 않습니다.</Error>}
          {!nickname && <Error>닉네임을 입력해주세요.</Error>}
          {/*{signUpError && <Error>{signUpError}</Error>}*/}
          {/*{signUpSuccess && <Success>회원가입되었습니다! 로그인해주세요.</Success>}*/}
        </Label>
        <Button type="submit">회원가입</Button>
      </Form>
      <LinkContainer>
        이미 회원이신가요?&nbsp;
        {/*<Link to="/login">로그인 하러가기</Link>*/}
      </LinkContainer>
    </div>
  );
};

export default SignUp;