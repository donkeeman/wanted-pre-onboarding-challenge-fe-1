import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, signup } from "../services/auth";

const AuthPage = () => {
    // true: 로그인, false: 회원가입
    const [isLoginState, setLoginState] = useState(true);
    const [reqData, setReqData] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    useEffect(() => {
        const token = window.localStorage.getItem("token");
        if (token) {
            navigate("/");
        }
    });
    const authInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setReqData({ ...reqData, [event.target.id]: event.target.value });
    };

    const loginHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const loginResult = await login(reqData);
        if (loginResult) {
            window.localStorage.setItem("token", loginResult.data.token);
            navigate("/");
        }
    };

    const signupHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const signupResult = await signup(reqData);
        if (signupResult) {
            window.alert("성공적으로 회원가입되었습니다.");
            setLoginState(true);
        }
    };

    return (
        <form onSubmit={isLoginState ? loginHandler : signupHandler}>
            <label htmlFor="email">이메일</label>
            <input
                type="email"
                name="email"
                id="email"
                onChange={authInputHandler}
                pattern=".+@.+\..+"
                title="'@'와 '.'가 포함된 올바른 형식의 이메일 주소를 입력해 주세요."
            />
            <label htmlFor="password">비밀번호</label>
            <input
                type="password"
                name="password"
                id="password"
                onChange={authInputHandler}
                pattern=".{8,}"
                title="비밀번호는 8자 이상 입력해 주세요."
            />
            <button disabled={!(reqData.email && reqData.password)}>
                {isLoginState ? "로그인" : "회원가입"}
            </button>
            <button
                type="button"
                onClick={() => {
                    setLoginState(!isLoginState);
                }}
            >
                {isLoginState ? "회원가입하기" : "로그인하기"}
            </button>
        </form>
    );
};

export default AuthPage;
