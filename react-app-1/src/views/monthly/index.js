import React, { useState, useEffect } from "react";
import { Row, Col, Button, Spin } from "antd";
import { SaveOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar";
import MonthlyItem from "../../components/monthlyItem";
import { getMonthlies } from "../../../src/utils/services/monthly";
import { checkJwtToken, checkUnauthorized } from "../../utils/util";
import { URL_LOGIN } from "../../../src/utils/constant";
import "./styles.css";

const Monthly = () => {
    const navigate = useNavigate();
    const [lstMonthly, setLstMonthly] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!checkJwtToken()) {
            navigate(URL_LOGIN);
            return;
        }
        getMonthlyListAction();
    }, []);

    const getMonthlyListAction = () => {
        setIsLoading(true);
        getMonthlies()
            .then(({ data }) => {
                if (data.length > 0) {
                    setLstMonthly([...data]);
                }
                setTimeout(() => {
                    setIsLoading(false);
                }, 300);
            })
            .catch((err) => {
                checkErr(err);
            });
    };

    const toInsertMonthlyPage = () => {
        navigate("/monthlies/insert");
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
                                className="btn-insert"
                                onClick={toInsertMonthlyPage}
                            >
                                INSERT MONTHLY
                            </Button>
                        </Col>
                    </Row>
                    {lstMonthly.map((monthly) => (
                        <MonthlyItem
                            key={monthly.id}
                            monthlyId={monthly.id}
                            workMonth={monthly.workMonth}
                            description={monthly.description}
                        />
                    ))}
                    <Row className="row-action-bottom" justify="space-between">
                        <Col xs={24}>
                            <Button
                                type="primary"
                                icon={<SaveOutlined />}
                                className="btn-insert"
                                onClick={toInsertMonthlyPage}
                            >
                                INSERT MONTHLY
                            </Button>
                        </Col>
                    </Row>
                </Spin>
            </Navbar>
        </>
    );
};

export default Monthly;
