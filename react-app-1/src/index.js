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
import Team from "./views/team";
import InsertTeam from "./views/team/insert";
import UpdateTeam from "./views/team/update";
import Staff from "./views/staff";
import InsertStaff from "./views/staff/insert";
import UpdateStaff from "./views/staff/update";
import Monthly from "./views/monthly";
import InsertMonthly from "./views/monthly/insert";
import UpdateMonthly from "./views/monthly/update";
import TimeKeeping from "./views/timeKeeping";
import UpdateTimeKeeping from "./views/timeKeeping/update";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <HashRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="user/login" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/accounts" element={<Account />} />
                <Route path="/accounts/insert" element={<InsertAccount />} />
                <Route path="/accounts/:id" element={<UpdateAccount />} />
                <Route path="/teams" element={<Team />} />
                <Route path="/teams/insert" element={<InsertTeam />} />
                <Route path="/teams/:id" element={<UpdateTeam />} />
                <Route path="/staffs" element={<Staff />} />
                <Route path="/staffs/insert" element={<InsertStaff />} />
                <Route path="/staffs/:id" element={<UpdateStaff />} />
                <Route path="/monthlies" element={<Monthly />} />
                <Route path="/monthlies/insert" element={<InsertMonthly />} />
                <Route path="/monthlies/:id" element={<UpdateMonthly />} />
                <Route path="/time-keepings" element={<TimeKeeping />} />
                <Route path="/time-keepings/:id" element={<UpdateTimeKeeping />} />
            </Routes>
        </HashRouter>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
