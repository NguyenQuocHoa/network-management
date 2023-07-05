import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import CardJob from "../../../components/cardJob";
import Navbar from "../../../components/navbar";

const JobCategory = () => {
    const { state } = useLocation();
    console.log("state", state);
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        setJobs([
            {
                id: 1,
                name: "Sr,UI/UX Designer - Ban, India",
                jobDes: [
                    {
                        id: "0011",
                        description: "4 - 5 years experience",
                        desType: 1,
                    },
                    {
                        id: "0012",
                        description: "PhotoShop, Illustrator, Crop...",
                        desType: 3,
                    },
                    {
                        id: "0013",
                        description: "Ban, India",
                        desType: 4,
                    },
                    {
                        id: "0014",
                        description: "Lorem ipsum Design Studio",
                        desType: 5,
                    },
                ],
            },
            {
                id: 2,
                name: "Sr,UI/UX Designer - Ban, India",
                jobDes: [
                    {
                        id: "0021",
                        description: "4 - 5 years experience",
                        desType: 1,
                    },
                    {
                        id: "0022",
                        description: "$3500 - $8000 PA",
                        desType: 2,
                    },
                    {
                        id: "0023",
                        description: "PhotoShop, Illustrator, Crop...",
                        desType: 3,
                    },
                    {
                        id: "0024",
                        description: "Ban, India",
                        desType: 4,
                    },
                    {
                        id: "0025",
                        description: "Lorem ipsum Design Studio",
                        desType: 5,
                    },
                ],
            },
        ]);
    }, []);

    return (
        <>
            <Navbar bgColor="main-content-gray">
                <h1>Job page category page</h1>
                {jobs.length > 0 &&
                    jobs.map((job) => (
                        <CardJob jobId={job.id} jobDes={job.jobDes} />
                    ))}
            </Navbar>
        </>
    );
};

export default JobCategory;
