import React, { useState } from "react";
import Navbar from "../../components/navbar";
import NotifyItem from "../../components/notifyItem";

// type:
// 0: system
// 1: message
// 2: mail
// 3: job

const Notify = () => {
    const [notifies, setNotifies] = useState([
        {
            id: 1,
            message: "Reminder: You have 1 invitation tonight at 17pm",
            linkNotify: "/abcd",
            type: 0,
            minutesAgo: "2h 17min ago",
            isView: false,
        },
        {
            id: 2,
            message: "Reminder: You have 1 invitation tonight at 17pm",
            linkNotify: "/abcd",
            type: 1,
            minutesAgo: "2h 17min ago",
            isView: false,
        },
        {
            id: 3,
            message: "Reminder: You have 1 invitation tonight at 17pm",
            linkNotify: "/abcd",
            type: 2,
            minutesAgo: "2h 17min ago",
            isView: false,
        },
        {
            id: 4,
            message: "Reminder: You have 1 invitation tonight at 17pm",
            linkNotify: "/abcd",
            type: 3,
            minutesAgo: "2h 17min ago",
            isView: false,
        },
    ]);
    return (
        <>
            <Navbar bgColor="main-content-gray">
                <h1>Notify page</h1>
                {notifies.map((notify) => (
                    <NotifyItem
                        key={notify.id}
                        message={notify.message}
                        linkNotify={notify.linkNotify}
                        type={notify.type}
                        minutesAgo={notify.minutesAgo}
                        isView={notify.isView}
                    />
                ))}
            </Navbar>
        </>
    );
};

export default Notify;
