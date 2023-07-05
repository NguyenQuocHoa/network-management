import React from "react";
import { Row, Button } from "antd";
import {
    UserOutlined,
    NotificationOutlined,
    PlusSquareOutlined,
    LogoutOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar";
import BarRow from "../../components/barRow";

const Setting = () => {
    const navigate = useNavigate();

    const onLogout = () => {
        navigate("/user/login");
    };

    return (
        <>
            <Navbar>
                <h1 style={{ fontWeight: "bold" }}>Settings</h1>
                <BarRow Icon={() => <UserOutlined />} title="Account" type={0} />
                <BarRow
                    Icon={() => <NotificationOutlined />}
                    title="Notification"
                    isColl={false}
                    isSwitch
                />
                <BarRow Icon={() => <PlusSquareOutlined />} title="More" isDiv={false} type={2} />
                <Row justify="center">
                    <Button icon={<LogoutOutlined />} onClick={onLogout}>
                        Logout
                    </Button>
                </Row>
            </Navbar>
        </>
    );
};

export default Setting;
