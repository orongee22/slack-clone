import React, { FC, useCallback } from "react";
import useSWR from "swr/esm";
import fetcher from "@utils/fetcher";
import axios from "axios";
import { Redirect } from "react-router-dom";

const Workspace: FC = ({ children }) => {
  const { data, error, revalidate } = useSWR("http://localhost:3095/api/users", fetcher);

  const handleLogout = useCallback(() => {
    axios.post("http://localhost:3095/api/users/logout", null, { withCredentials: true })
      .then(() => {
        revalidate(); // data null 처리
      });
  }, []);

  console.log("data ======", data);
  if(!data){
    return <Redirect to={"/login"}/>
  }
  return (
    <div>
      <button onClick={handleLogout}>로그아웃</button>
      {children}
    </div>
  );
};

export default Workspace;