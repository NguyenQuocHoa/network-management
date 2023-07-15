import React, { useState } from "react";
import { Button, Form, Input, Row, Col, Switch } from "antd";
import {
    UserAddOutlined,
    UserOutlined,
    KeyOutlined,
    ProfileOutlined,
    CheckOutlined,
} from "@ant-design/icons";
import "./styles.css";

const AccountDetail = () => {
    const onFinish = (values) => {
        // console.log("Success:", values);
    };

    const onFinishFailed = (errorInfo) => {
        // console.log("Failed:", errorInfo);
    };

    return (
        <div className="container-space container-sign-up">
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Row justify="center">
                    <h2>EDIT INFO ACCOUNT</h2>
                </Row>
                <Form.Item
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: "Please input your username!",
                        },
                    ]}
                >
                    <Input
                        size="large"
                        placeholder="Username"
                        bordered={false}
                        className="input-have-bb"
                        prefix={<UserOutlined />}
                    />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: "Please input your password!",
                        },
                    ]}
                >
                    <Input.Password
                        size="large"
                        placeholder="Password"
                        bordered={false}
                        className="input-have-bb"
                        prefix={<KeyOutlined />}
                    />
                </Form.Item>

                <Form.Item name="email">
                    <Input
                        size="large"
                        placeholder="Description"
                        bordered={false}
                        className="input-have-bb"
                        prefix={<ProfileOutlined />}
                    />
                </Form.Item>

                <Form.Item name="isActive" className="input-checkbox">
                    <Row justify="space-between">
                        <Col className="pl13">
                            <CheckOutlined />
                        </Col>
                        <Col>
                            <Switch style={{ backgroundColor: "#4ad862" }} defaultChecked></Switch>
                        </Col>
                    </Row>
                </Form.Item>

                <Row justify="center">
                    <Button type="primary" htmlType="submit" className="btn-login" size="large">
                        <UserAddOutlined />
                    </Button>
                </Row>
            </Form>
        </div>
    );
};

export default AccountDetail;
