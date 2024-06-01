/* eslint-disable react/prop-types */
import { IoClose } from "react-icons/io5";
import { useSetRecoilState } from "recoil";
import { modalState } from "../atoms/atom";

function Modal({ children, type }) {
    const setModalState = useSetRecoilState(modalState);
    const styles = type === "todo" ? "w-[450px] h-72" : "w-[450px] h-96";

    return (
        <div
            className={`bg-white absolute inset-0 m-auto p-4 rounded-xl ${styles}`}
        >
            <button
                onClick={() => setModalState(false)}
                className="flex justify-end absolute right-4 top-4"
            >
                <IoClose className="text-4xl text-gray-600 font-bold" />
            </button>
            <div>{children}</div>
        </div>
    );
}

export default Modal;
