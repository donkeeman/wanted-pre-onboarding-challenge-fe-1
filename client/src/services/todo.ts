import axios from "axios";

type todoReqData = {
    title: string;
    content: string;
};

const token = window.localStorage.getItem("token");
const headers = {
    headers: {
        Authorization: `Bearer ${token}`,
    },
};

const getTodos = async () => {
    const result = await axios.get(axios.defaults.baseURL + "/todos", headers);
    return result;
};

const getTodoById = async (id: string) => {
    const result = await axios.get(
        axios.defaults.baseURL + `/todos/${id}`,
        headers
    );
    return result;
};

const createTodo = async (reqData: todoReqData) => {
    const result = await axios.post(
        axios.defaults.baseURL + "/todos",
        reqData,
        headers
    );
    return result;
};

const updateTodo = async (id: string, reqData: todoReqData) => {
    const result = await axios.put(
        axios.defaults.baseURL + `/todos/${id}`,
        reqData,
        headers
    );
    return result;
};

const deleteTodo = async (id: string) => {
    const result = await axios.delete(
        axios.defaults.baseURL + `/todos/${id}`,
        headers
    );
    return result;
};

export { getTodos, getTodoById, createTodo, updateTodo, deleteTodo };
