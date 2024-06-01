import { atom, atomFamily } from "recoil";

export const isLoggedIn = atom({
    key: "isLoggedIn",
    default: false,
});

export const mobileNavActive = atom({
    key: "isMobileNavActive",
    default: true,
});

export const userData = atom({
    key: "userDataInfo",
    default: {
        email: "",
        userName: "",
        userTodos: [],
    },
});

export const todoCheckedState = atomFamily({
    key: "todoCheckedState",
    default: false,
});

export const todoDataState = atomFamily({
    key: "todoDataState",
    default: {
        title: "",
        completed: false,
        createdAt: "",
    },
});

export const loginAuth = atom({
    key: "loginAuth",
    default: {
        email: "",
        password: "",
    },
});

export const signupAuth = atom({
    key: "signupAuth",
    default: {
        userName: "",
        email: "",
        password: "",
        passwordConfirm: "",
    },
});

export const modalState = atom({
    key: "modalState",
    default: false,
});

export const todoInputBarState = atom({
    key: "todoInputBarState",
    default: "",
});
