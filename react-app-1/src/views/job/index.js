import React, { useState } from "react";
import { Row } from "antd";
import {
    EditOutlined,
    CodeOutlined,
    MedicineBoxOutlined,
    TrophyOutlined,
    RocketOutlined,
    BankOutlined,
    BookOutlined,
    UserOutlined,
    MoreOutlined,
} from "@ant-design/icons";
import Navbar from "../../components/navbar";
import CardItem from "../../components/cardItem";

const Job = () => {
    const [jobs, setJobs] = useState([
        {
            id: 1,
            bgColor: "#f1f0ff",
            icon: () => (
                <EditOutlined className="icon-card icon-color-purpose" />
            ),
            title: "Designer",
        },
        {
            id: 2,
            bgColor: "#fff6e7",
            icon: () => (
                <CodeOutlined className="icon-card icon-color-orange" />
            ),
            title: "Developer",
        },
        {
            id: 3,
            bgColor: "#f4f9e8",
            icon: () => (
                <MedicineBoxOutlined className="icon-card icon-color-green" />
            ),
            title: "Doctor",
        },
        {
            id: 4,
            bgColor: "#e6fafd",
            icon: () => (
                <TrophyOutlined className="icon-card icon-color-sea-green" />
            ),
            title: "Gym Trainer",
        },
        {
            id: 5,
            bgColor: "#faf1ff",
            icon: () => (
                <RocketOutlined className="icon-card icon-color-light-purpose" />
            ),
            title: "Electrician",
        },
        {
            id: 6,
            bgColor: "#fff0f1",
            icon: () => <BankOutlined className="icon-card icon-color-red" />,
            title: "Manager",
        },
        {
            id: 7,
            bgColor: "#ebf7ff",
            icon: () => <BookOutlined className="icon-card icon-color-blue" />,
            title: "Teacher",
        },
        {
            id: 8,
            bgColor: "#ffe9fe",
            icon: () => <UserOutlined className="icon-card icon-color-pink" />,
            title: "Sales man",
        },
        {
            id: 9,
            bgColor: "#f4f4f4",
            icon: () => <MoreOutlined className="icon-card icon-color-gray" />,
            title: "More",
        },
    ]);
    return (
        <>
            <Navbar>
                <h1>Job page</h1>
                <Row justify="space-between">
                    {jobs.map((job) => (
                        <CardItem
                            key={job.id}
                            jobId={job.id}
                            bgColor={job.bgColor}
                            Icon={job.icon}
                            iconColor={job.iconColor}
                            title={job.title}
                        />
                    ))}
                </Row>
            </Navbar>
        </>
    );
};

export default Job;
