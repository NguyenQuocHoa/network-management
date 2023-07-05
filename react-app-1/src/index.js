import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Login from "./views/user/login";
import SignUp from "./views/user/signUp";
import Home from "./views/home";
import Job from "./views/job";
import Dashboard from "./views/dashboard";
import Notify from "./views/notify";
import Setting from "./views/setting";
import JobCategory from "./views/job/jobCategory";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <HashRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="user/login" element={<Login />} />
                <Route path="user/signup" element={<SignUp />} />
                <Route path="/home" element={<Home />} />
                <Route path="/job" element={<Job />} />
                <Route path="/job/:id" element={<JobCategory />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/notify" element={<Notify />} />
                <Route path="/setting" element={<Setting />} />
            </Routes>
        </HashRouter>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
