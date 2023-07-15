import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Login from "./views/user/login";
import Home from "./views/home";
import Account from "./views/account";
import InsertAccount from "./views/account/insert";
import UpdateAccount from "./views/account/update";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <HashRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="user/login" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/accounts" element={<Account />} />
                <Route path="/accounts/create" element={<InsertAccount />} />
                <Route path="/accounts/:id" element={<UpdateAccount />} />
            </Routes>
        </HashRouter>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
