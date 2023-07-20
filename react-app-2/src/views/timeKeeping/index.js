import React, { useState, useEffect } from "react";
import { Row, Col, Button, Spin } from "antd";
import { SaveOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar";
import TimeKeepingItem from "../../components/timeKeepingItem";
import {
    getTimeKeepingByTeamId,
    updateTimeKeepingStatus,
} from "../../../src/utils/services/timeKeeping";
import { checkJwtToken, checkUnauthorized } from "../../utils/util";
import { URL_LOGIN } from "../../../src/utils/constant";
import "./styles.css";

const TimeKeeping = () => {
    const navigate = useNavigate();
    const [idsChange, setIdsChange] = useState([]);
    const [lstTimeKeeping, setLstTimeKeeping] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!checkJwtToken()) {
            navigate(URL_LOGIN);
            return;
        }
        getTimeKeepingListAction();
    }, []);

    const getTimeKeepingListAction = () => {
        const teamId = localStorage.getItem("teamId");
        if (!teamId) {
            return;
        }
        setIsLoading(true);
        getTimeKeepingByTeamId(teamId)
            .then(({ data }) => {
                if (data.length > 0) {
                    setLstTimeKeeping([...data]);
                }
                setTimeout(() => {
                    setIsLoading(false);
                }, 300);
            })
            .catch((err) => {
                checkErr(err);
            });
    };

    const updateTimeKeepingStatusAction = () => {
        if (idsChange?.length === 0) {
            return;
        }
        setIsLoading(true);
        updateTimeKeepingStatus(idsChange).then(() => getTimeKeepingListAction());
    };

    const checkErr = (err) => {
        if (!checkUnauthorized(err)) {
            navigate(URL_LOGIN);
            return;
        }
    };

    return (
        <>
            <Navbar bgColor="main-content-gray">
                <Spin spinning={isLoading} size="large">
                    <Row className="row-action-top" justify="space-between">
                        <Col xs={24}>
                            <Button
                                type="primary"
                                icon={<SaveOutlined />}
                                className="btn-save"
                                onClick={updateTimeKeepingStatusAction}
                            >
                                SAVE TIME KEEPING
                            </Button>
                        </Col>
                    </Row>
                    {lstTimeKeeping.map((timeKeeping) => (
                        <TimeKeepingItem
                            key={timeKeeping.id}
                            timeKeepingId={timeKeeping.id}
                            staffName={timeKeeping.staffName}
                            phone={timeKeeping.phone}
                            isCheck={timeKeeping.isCheck}
                            description={timeKeeping.description}
                            idsChange={idsChange}
                            setIdsChange={setIdsChange}
                        />
                    ))}
                    <Row className="row-action-bottom" justify="space-between">
                        <Col xs={24}>
                            <Button
                                type="primary"
                                icon={<SaveOutlined />}
                                className="btn-save"
                                onClick={updateTimeKeepingStatusAction}
                            >
                                SAVE TIME KEEPING
                            </Button>
                        </Col>
                    </Row>
                </Spin>
            </Navbar>
        </>
    );
};

export default TimeKeeping;
