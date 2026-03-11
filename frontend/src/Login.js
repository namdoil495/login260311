import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

// 토큰내용 번역할 때 사용
function Login() {
  // 이메일,비번,토큰변수만들어줌
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(null);
  //   아무것도 없다면 토근은 null값을 가진다. 다른건 빈값
  //   로그인 성공할때에 토큰을 받아야 한다.

  const sendToken = async (token) => {
    console.log(token);
    try {
      const res = await axios.post("http://localhost:5000/login", {
        token: token,
      });
      console.log(res);
    } catch (err) {
      alert("로그인 실패");
      console.log(err);
    }
  };

  const handleSuccess = async (res) => {
    // google 에서 발급받은 jwt token
    const google_token = res.credential;
    console.log(google_token);
    await sendToken(google_token); // 토근값을 백엔드로 넘기는 asyns 와 await 추가함
    // 토큰확인용 이거 실제서비스할때에는 주석처리
    const decoded = jwtDecode(google_token);
    console.log(decoded);
    // 구글도큰을 내 백엔드에서 한번더 암호화하는 것이 안전하다.
  };
  const handleError = () => {
    alert("로그인에 실패하였습니다.");
  };

  return (
    <>
      <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
    </>
  );
}

export default Login;
