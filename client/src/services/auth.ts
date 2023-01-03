import axios from "axios";

type authReqData = {
    email: string;
    password: string;
};

const header = {
    headers: {
        "Content-Type": "application/json",
    },
};

const login = async (reqData: authReqData) => {
    try {
        const result = await axios.post(
            axios.defaults.baseURL + "/users/login",
            reqData,
            header
        );
        return result;
    } catch (error) {
        window.alert("로그인에 실패하였습니다. 다시 시도해 주세요.");
        return;
    }
};

const signup = async (reqData: authReqData) => {
    try {
        const result = await axios.post(
            axios.defaults.baseURL + "/users/create",
            reqData,
            header
        );
        return result;
    } catch (error) {
        window.alert("회원가입에 실패하였습니다. 다시 시도해 주세요.");
        return;
    }
};

export { login, signup };
