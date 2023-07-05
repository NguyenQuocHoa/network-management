import React from "react";
import { Space, Row, Col, Button } from "antd";
import {
    CalendarFilled,
    MoneyCollectFilled,
    EditFilled,
    EnvironmentFilled,
    HomeFilled,
} from "@ant-design/icons";
import "./styles.css";

const getIcon = (desType) => {
    switch (desType) {
        case 1:
            return (
                <CalendarFilled className="icon-custom color-custom-green" />
            );
        case 2:
            return (
                <MoneyCollectFilled className="icon-custom color-custom-blue-sea" />
            );
        case 3:
            return <EditFilled className="icon-custom color-custom-purpose" />;
        case 4:
            return (
                <EnvironmentFilled className="icon-custom color-custom-orange" />
            );
        case 5:
            return <HomeFilled className="icon-custom color-custom-blue" />;
        default:
            return null;
    }
};

const CardJob = ({ jobId, jobDes }) => {
    return (
        <Space className="card-job-space-container">
            <Button className="btn-custom">
                {jobDes.map((jobDes) => (
                    <CardItem
                        key={jobDes.id}
                        desType={jobDes.desType}
                        description={jobDes.description}
                    />
                ))}
            </Button>
        </Space>
    );
};

const CardItem = ({ description, desType }) => {
    return (
        <Row gutter={8} align="middle" className="card-item">
            <Col>{getIcon(desType)}</Col>
            <Col xs={20} className="card-item-text">
                <span>{description}</span>
            </Col>
        </Row>
    );
};

export default CardJob;
