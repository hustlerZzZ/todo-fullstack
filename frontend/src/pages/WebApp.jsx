import { useRecoilState } from "recoil";
import { modalState, todoInputBarState, userData } from "../atoms/atom";
import Todo from "./Todo";
import Cookies from "js-cookie";
import Modal from "../components/Modal";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function WebApp() {
    const [{ userName, userTodos }, setUserData] = useRecoilState(userData);
    const [activeModal, setModalState] = useRecoilState(modalState);
    const [inputBarValue, setInputBarValue] = useRecoilState(todoInputBarState);

    const token = Cookies.get("authToken");

    async function handleSubmit() {
        if (inputBarValue.length === 0) {
            toast("Kindly fill something ❌", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            return;
        }

        const res = await axios.post(
            "http://localhost:5555/api/v1/todo/newTodo",
            { title: inputBarValue },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        const data = res.data;

        if (data.status === "success") {
            setUserData((prevState) => ({
                ...prevState,
                userTodos: [...prevState.userTodos, data.newTodo._id],
            }));

            toast("Todo created successfully! ✅", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            setModalState(false);
        } else {
            toast("Todo creation failed! ❌", {
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
    }

    return (
        <>
            <main className="bg-gray-700 relative">
                <ToastContainer />
                {activeModal && (
                    <Modal type="todo">
                        <div className="flex flex-col gap-8 mt-14 justify-center items-center">
                            <div className="flex flex-col gap-2">
                                <label
                                    htmlFor="todo"
                                    className="text-black text-xl font-semibold text-center"
                                >
                                    Todo
                                </label>
                                <input
                                    type="text"
                                    id="todo"
                                    className="focus:outline-none py-1 h-10 px-2 w-72 rounded font-semibold bg-slate-600 text-white"
                                    placeholder="What's your goal today...."
                                    value={inputBarValue}
                                    onChange={(e) =>
                                        setInputBarValue(e.target.value)
                                    }
                                    required
                                />
                            </div>

                            <div className="flex gap-4">
                                <button
                                    className="bg-red-500 text-white font-semibold py-1.5 px-4 text-lg rounded-md"
                                    onClick={() => setModalState(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="bg-blue-500 text-white font-semibold py-1.5 px-4 text-lg rounded-md"
                                    onClick={handleSubmit}
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </Modal>
                )}
                <div
                    className={`flex flex-col gap-4 pt-8 max-w-[800px] mx-auto ${
                        activeModal ? "blur-lg transition-all" : ""
                    }`}
                >
                    <div className="mx-8 text-xl text-white flex justify-between items-center">
                        <div>
                            <h1 className="font-medium">
                                Hello,{" "}
                                <span className="italic font-semibold">
                                    {userName}
                                </span>{" "}
                                👋
                            </h1>
                        </div>

                        <button
                            className="bg-blue-500 text-white py-1.5 px-4 text-lg rounded-md"
                            onClick={() => setModalState(true)}
                        >
                            Add Task
                        </button>
                    </div>

                    <div className="mt-8 flex flex-col gap-4">
                        {userTodos.length !== 0 ? (
                            userTodos.map((todo) => (
                                <Todo todo={todo} key={todo} />
                            ))
                        ) : (
                            <div className="text-center">
                                <h2 className="text-white font-bold italic text-xl">
                                    Time to add some goal&apos;s & achive them.
                                </h2>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </>
    );
}

export default WebApp;
