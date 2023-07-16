import React from "react";
import moment from "moment";
import { Space, Row, Col, Avatar, Button } from "antd";
import { CalendarOutlined, EditOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import "./styles.css";

const MonthlyItem = ({ monthlyId, workMonth, description }) => {
    const navigate = useNavigate();
    const date = moment(workMonth);

    const toDetailPage = (monthlyId) => {
        navigate(`/monthlies/${monthlyId}`, {
            state: { monthlyId },
        });
    };

    return (
        <Space className="monthly-item-space-container">
            <Row gutter={[16, 6]}>
                <Col xs={24}>
                    <Row justify="space-between" align="middle">
                        <Col xs={20}>
                            <Row gutter={16}>
                                <Col xs={5} className="col-avatar">
                                    <Avatar
                                        style={{ backgroundColor: "#87d068" }}
                                        icon={<CalendarOutlined />}
                                        size="large"
                                    />
                                </Col>
                                <Col xs={19}>
                                    <div className="user-name">
                                        {moment(workMonth).month()} - {moment(workMonth).year()}
                                    </div>
                                    <p className="text-description">
                                        {description !== null && description !== undefined
                                            ? description
                                            : ""}
                                    </p>
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={4}>
                            <Row>
                                <Button
                                    type="primary"
                                    shape="circle"
                                    className="btn-edit"
                                    icon={<EditOutlined />}
                                    onClick={() => toDetailPage(monthlyId)}
                                />
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Space>
    );
};

export default MonthlyItem;
