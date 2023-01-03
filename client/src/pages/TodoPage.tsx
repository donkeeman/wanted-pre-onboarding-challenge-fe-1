import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    getTodos,
    getTodoById,
    createTodo,
    updateTodo,
    deleteTodo,
} from "../services/todo";

const TodoPage = () => {
    const [todos, setTodos] = useState<any[]>([]);
    const [todoData, setTodoData] = useState({ title: "", content: "" });
    const [todoById, setTodoById] = useState({
        title: "",
        content: "",
        createdAt: "",
        updatedAt: "",
        id: "",
    });
    const [showEdit, setShowEdit] = useState(false);
    const [editTodoData, setEditTodoData] = useState({
        title: "",
        content: "",
    });
    const navigate = useNavigate();

    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        const token = window.localStorage.getItem("token");
        if (!token) {
            window.alert("토큰이 없거나 유효하지 않습니다. 로그인해 주세요.");
            navigate("/auth");
        } else {
            getTodoHandler();
        }
    }, []);

    const getTodoHandler = async () => {
        const { data } = await getTodos();
        setTodos(data.data);
    };

    const todoByIdHandler = async (id: string) => {
        const { data } = await getTodoById(id);
        if (data) {
            setTodoById(data.data);
        }
    };

    const createTodoHandler = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();
        const result = await createTodo(todoData);
        if (result) {
            setTodoData({ title: "", content: "" });
            if (formRef.current) {
                formRef.current.reset();
            }
            getTodoHandler();
        }
    };

    const clearEdit = () => {
        setShowEdit(false);
        setEditTodoData({ title: "", content: "" });
    };

    const updateTodoHandler = async (
        id: string,
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();
        const { data } = await updateTodo(id, editTodoData);
        if (data) {
            clearEdit();
            getTodoHandler();
            setTodoById(data.data);
        }
    };

    const deleteTodoHandler = async (id: string) => {
        const { data } = await deleteTodo(id);
        if (data) {
            setTodoById({
                title: "",
                content: "",
                createdAt: "",
                updatedAt: "",
                id: "",
            });
            getTodoHandler();
        }
    };

    const todoInputHandler = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        if (showEdit) {
            setEditTodoData({
                ...editTodoData,
                [event.target.id]: event.target.value,
            });
        } else {
            setTodoData({ ...todoData, [event.target.id]: event.target.value });
        }
    };

    const logoutHandler = () => {
        window.localStorage.removeItem("token");
        navigate("/auth");
    };

    return (
        <div style={{ display: "flex" }}>
            <div style={{ flex: 1 }}>
                <button onClick={logoutHandler}>로그아웃</button>
                {todos.length > 0 ? (
                    <ul>
                        {todos.map((todo) => (
                            <li
                                key={todo.id}
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                    todoByIdHandler(todo.id);
                                }}
                            >
                                <strong>{todo.title}</strong>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>아직 Todo가 없어요.</p>
                )}
                <form
                    onSubmit={createTodoHandler}
                    ref={formRef}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "50%",
                    }}
                >
                    <label htmlFor="title">제목</label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        onChange={todoInputHandler}
                    />
                    <label htmlFor="content">내용</label>
                    <textarea
                        name="content"
                        id="content"
                        onChange={todoInputHandler}
                    />
                    <button disabled={!(todoData.title && todoData.content)}>
                        Todo 추가
                    </button>
                </form>
            </div>
            <div style={{ flex: 1 }}>
                {todoById.title && (
                    <>
                        <strong>제목: {todoById.title}</strong>
                        <p>내용: {todoById.content}</p>
                        <p>작성일: {todoById.createdAt}</p>
                        <p>수정일: {todoById.updatedAt}</p>
                        {showEdit ? (
                            <>
                                <form
                                    onSubmit={(event) => {
                                        updateTodoHandler(todoById.id, event);
                                    }}
                                    ref={formRef}
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        width: "50%",
                                    }}
                                >
                                    <label htmlFor="title">제목</label>
                                    <input
                                        type="text"
                                        name="title"
                                        id="title"
                                        onChange={todoInputHandler}
                                    />
                                    <label htmlFor="content">내용</label>
                                    <textarea
                                        name="content"
                                        id="content"
                                        onChange={todoInputHandler}
                                    />
                                    <button
                                        disabled={
                                            !(
                                                editTodoData.title &&
                                                editTodoData.content
                                            )
                                        }
                                    >
                                        Todo 수정
                                    </button>
                                    <button type="button" onClick={clearEdit}>
                                        수정 취소
                                    </button>
                                </form>
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={() => {
                                        setShowEdit(true);
                                    }}
                                >
                                    수정
                                </button>
                                <button
                                    onClick={() => {
                                        deleteTodoHandler(todoById.id);
                                    }}
                                >
                                    삭제
                                </button>
                            </>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default TodoPage;
