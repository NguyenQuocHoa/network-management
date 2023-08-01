import React, { useState, useEffect } from "react";
import { Row, Col, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar";
import LiquidChart from "../../components/chart/LiquidChart";
import ProgressChart from "../../components/chart/ProgressChart";
import { getReportTimeKeepings } from "../../utils/services/timeKeeping";
import { checkJwtToken, checkUnauthorized } from "../../utils/util";
import { URL_LOGIN } from "../../../src/utils/constant";
import "./styles.css";

const Dashboard = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [percentAll, setPercentAll] = useState(0);
    const [lstReportPerTeam, setLstReportPerTeam] = useState([]);

    useEffect(() => {
        if (!checkJwtToken()) {
            navigate(URL_LOGIN);
            return;
        }
        getReportTimeKeepingsAction();
    }, []);

    const getReportTimeKeepingsAction = () => {
        setIsLoading(true);
        getReportTimeKeepings()
            .then(({ data }) => {
                console.log(data);
                if (data) {
                    setPercentAll(data.percentAll);
                    setLstReportPerTeam([...data.percentPerTeam]);
                }
                setTimeout(() => {
                    setIsLoading(false);
                }, 300);
            })
            .catch((err) => {
                checkErr(err);
            });
    };

    const checkErr = (err) => {
        if (!checkUnauthorized(err)) {
            navigate(URL_LOGIN);
            return;
        }
    };

    return (
        <>
            <Navbar bgColor="main-content-blue">
                <Spin spinning={isLoading} size="large">
                    <LiquidChart percent={percentAll} teamName="ALL TEAM" />
                    <Row gutter={[16, 16]} className="container-dashboard">
                        {lstReportPerTeam.length > 0 &&
                            lstReportPerTeam.map((team) => (
                                <Col xs={12} key={team.teamId}>
                                    <ProgressChart
                                        percent={team.percent}
                                        teamName={team.teamName}
                                    />
                                </Col>
                            ))}
                        {/* <Col xs={12}>
                            <ProgressChart percent={75} teamName="Team 2" />
                        </Col>
                        <Col xs={12}>
                            <ProgressChart percent={75} teamName="Team 3" />
                        </Col>
                        <Col xs={12}>
                            <ProgressChart percent={90} teamName="Team 4" />
                        </Col>
                        <Col xs={12}>
                            <ProgressChart percent={75} teamName="Team 5" />
                        </Col>
                        <Col xs={12}>
                            <ProgressChart percent={40} teamName="Team 6" />
                        </Col> */}
                    </Row>
                </Spin>
            </Navbar>
        </>
    );
};

export default Dashboard;
