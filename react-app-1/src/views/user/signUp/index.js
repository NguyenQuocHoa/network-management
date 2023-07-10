import React, { useState } from "react";
import { Button, Form, Input, Row, DatePicker } from "antd";
import {
    UserAddOutlined,
    UserOutlined,
    KeyOutlined,
    MailOutlined,
    GiftOutlined,
    LoadingOutlined,
    CameraOutlined,
} from "@ant-design/icons";
import { message, Upload } from "antd";
import "../styles.css";

const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
};

const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";

    if (!isJpgOrPng) {
        message.error("You can only upload JPG/PNG file!");
    }

    const isLt2M = file.size / 1024 / 1024 < 2;

    if (!isLt2M) {
        message.error("Image must smaller than 2MB!");
    }

    return isJpgOrPng && isLt2M;
};

const SignUp = () => {
    const onFinish = (values) => {
        // console.log("Success:", values);
    };

    const onFinishFailed = (errorInfo) => {
        // console.log("Failed:", errorInfo);
    };

    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState();

    const handleChange = (info) => {
        if (info.file.status === "uploading") {
            setLoading(true);
            return;
        }

        if (info.file.status === "done") {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, (url) => {
                setLoading(false);
                setImageUrl(url);
            });
        }
    };

    const uploadButton = <div>{loading ? <LoadingOutlined /> : <CameraOutlined />}</div>;

    return (
        <div className="container-space container-sign-up">
            <Row justify="center">
                <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    beforeUpload={beforeUpload}
                    onChange={handleChange}
                >
                    {imageUrl ? (
                        <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
                    ) : (
                        uploadButton
                    )}
                </Upload>
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

                <Form.Item
                    name="email"
                    rules={[
                        {
                            type: "email",
                            required: true,
                            message: "Please input your email!",
                        },
                    ]}
                >
                    <Input
                        size="large"
                        placeholder="E-mail"
                        bordered={false}
                        className="input-have-bb"
                        prefix={<MailOutlined />}
                    />
                </Form.Item>

                <Form.Item
                    name="dob"
                    rules={[
                        {
                            required: true,
                            message: "Please input your dob!",
                        },
                    ]}
                >
                    <DatePicker
                        size="large"
                        placeholder="Date of Birth"
                        bordered={false}
                        className="input-have-bb"
                        suffixIcon={<GiftOutlined style={{ fontSize: 16 }} />}
                    />
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

export default SignUp;
