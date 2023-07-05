import React from "react";
import { Row, Col, Button } from "antd";
import {
    SettingOutlined,
    MessageOutlined,
    MailOutlined,
    SolutionOutlined,
} from "@ant-design/icons";
import "./styles.css";

const NotifyItem = ({ message, linkNotify, type, minutesAgo, isView }) => {
    const getIcon = () => {
        switch (type) {
            case 0:
                return (
                    <SettingOutlined className="icon-custom icon-custom-setting" />
                );
            case 1:
                return (
                    <MessageOutlined className="icon-custom icon-custom-message" />
                );
            case 2:
                return (
                    <MailOutlined className="icon-custom icon-custom-mail" />
                );
            case 3:
                return (
                    <SolutionOutlined className="icon-custom icon-custom-job" />
                );
            default:
                return null;
        }
    };
    return (
        <Row className="notify-item-space-container">
            <Button className="btn-notify-item">
                <Row gutter={10}>
                    <Col>{getIcon()}</Col>
                    <Col style={{ height: "100%" }} xs={20}>
                        <Row className="text-message">{message}</Row>
                        <Row className="text-minutes">{minutesAgo}</Row>
                    </Col>
                </Row>
            </Button>
        </Row>
    );
};

export default NotifyItem;
