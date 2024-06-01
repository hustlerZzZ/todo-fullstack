/* eslint-disable react/prop-types */
import { FaTrash } from "react-icons/fa6";
import { GrCheckbox, GrCheckboxSelected } from "react-icons/gr";
import Cookies from "js-cookie";
import { FaPencilAlt } from "react-icons/fa";
import { useRecoilState, useSetRecoilState } from "recoil";
import { todoCheckedState, todoDataState, userData } from "../atoms/atom";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function formatDate(data) {
    const formattedDate = data.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    const formattedTime = data.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
    });

    const formattedDateTime = `${formattedDate} at ${formattedTime}`;

    return formattedDateTime;
}

function Todo({ todo }) {
    const setUserData = useSetRecoilState(userData);
    const [checked, setChecked] = useRecoilState(todoCheckedState(todo));
    const [todoData, setTodoData] = useRecoilState(todoDataState(todo));

    const token = Cookies.get("authToken");

    async function handleCheck() {
        try {
            const response = await axios.patch(
                `http://127.0.0.1:5555/api/v1/todo/updateTodo/${todo}`,
                { completed: !checked },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = response.data;

            if (data.status === "success") {
                setChecked((curr) => !curr);

                toast("Todo updated successfully! ✅", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            }
        } catch (err) {
            console.log(`http://127.0.0.1:5555/api/v1/todo/getTodo/${todo}`);
            console.error("Failed to update the todo:", err);
        }
    }

    async function deleteTodo() {
        try {
            const response = await axios.delete(
                `http://127.0.0.1:5555/api/v1/todo/deleteTodo/${todo}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = response.data;

            if (data.status === "success") {
                setUserData((prevState) => ({
                    ...prevState,
                    userTodos: prevState.userTodos.filter(
                        (curr) => curr !== todo
                    ),
                }));

                toast("Todo deleted successfully! ✅", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            }
        } catch (err) {
            console.error("Failed to delete the todo:", err);
        }
    }

    useEffect(
        function () {
            async function fetchTodo() {
                try {
                    const response = await axios.get(
                        `http://127.0.0.1:5555/api/v1/todo/getTodo/${todo}`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );

                    setChecked(response.data.todo.completed);

                    setTodoData({
                        title: response.data.todo.title,
                        completed: response.data.todo.completed,
                        createdAt: response.data.todo.createdAt,
                    });
                } catch (err) {
                    console.log(
                        `http://127.0.0.1:5555/api/v1/todo/getTodo/${todo}`
                    );
                    console.error("Failed to fetch the todo:", err);
                }
            }

            fetchTodo();
        },
        [setTodoData, todo, token, setChecked]
    );

    return (
        <div className="flex justify-between items-center">
            <div className="text-white flex gap-4 items-center">
                <div>
                    {!checked ? (
                        <GrCheckbox
                            onClick={handleCheck}
                            className="cursor-pointer"
                        />
                    ) : (
                        <GrCheckboxSelected onClick={handleCheck} />
                    )}
                </div>
                <div>
                    <div className="flex gap-3 justify-center items-center">
                        <h2
                            className={`font-semibold text-lg ${
                                checked ? "line-through" : ""
                            }`}
                        >
                            {todoData.title}
                        </h2>
                        <span className="mt-1">{checked ? "✅" : ""}</span>
                    </div>
                    <h3 className="text-sm">
                        {formatDate(new Date(todoData.createdAt))}{" "}
                    </h3>
                </div>
            </div>
            <div className="flex gap-4">
                <div className="bg-white p-2 rounded-md">
                    <FaTrash
                        className="text-gray-800 cursor-pointer"
                        onClick={deleteTodo}
                    />
                </div>
                <div className="bg-white p-2 rounded-md cursor-pointer">
                    <FaPencilAlt />
                </div>
            </div>
        </div>
    );
}

export default Todo;
