import React from "react";
import { Button, Form, Input, Row, Typography } from "antd";
import { LoginOutlined, UserOutlined, KeyOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "../styles.css";
const { Title } = Typography;

const Login = () => {
    const navigate = useNavigate();

    const onFinish = (values) => {
        // console.log("Success:", values);
        // validate here
        navigate("/home");
    };

    const onFinishFailed = (errorInfo) => {
        // console.log("Failed:", errorInfo);
    };

    return (
        <div className="container-space container-login">
            <Row justify="center" className="title-login">
                <Title>binoad</Title>
            </Row>

            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
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

                <Row justify="center">
                    <Button type="primary" htmlType="submit" className="btn-login" size="large">
                        <LoginOutlined />
                    </Button>
                </Row>
            </Form>
        </div>
    );
};

export default Login;
