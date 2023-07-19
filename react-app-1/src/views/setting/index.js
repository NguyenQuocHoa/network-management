import React, { useState, useEffect } from "react";
import { Button, Form, Input, Row, Col, Spin } from "antd";
import { SaveOutlined, LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar";
import { getAccountById, updateAccountById } from "../../../src/utils/services/account";
import { checkJwtToken, checkUnauthorized } from "../../utils/util";
import { URL_LOGIN } from "../../../src/utils/constant";
import "./styles.css";

const Setting = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [accountPayload, setAccountPayload] = useState({});

    const onValuesChange = (fieldData) => {
        setAccountPayload({ ...accountPayload, ...fieldData });
    };

    const onFinish = () => {
        if (accountPayload.id) {
            updateAccountById(accountPayload.id, accountPayload)
                .then(() => {
                    getAccount(accountPayload.id);
                })
                .catch((err) => {
                    checkErr(err);
                });
        }
    };

    const getAccount = (accountId) => {
        setIsLoading(true);
        getAccountById(accountId)
            .then(({ data }) => {
                setAccountPayload(data);
                form.setFieldsValue({ ...data });
                setTimeout(() => {
                    setIsLoading(false);
                }, 300);
            })
            .catch((err) => {
                checkErr(err);
            });
    };

    const toLoginPage = () => {
        localStorage.removeItem("jwt_token");
        localStorage.removeItem("order-active");
        localStorage.removeItem("accountId");
        localStorage.removeItem("teamId");
        navigate(URL_LOGIN);
    };

    const checkErr = (err) => {
        if (!checkUnauthorized(err)) {
            navigate(URL_LOGIN);
            return;
        }
    };

    useEffect(() => {
        if (!checkJwtToken()) {
            navigate(URL_LOGIN);
            return;
        }

        let accountId = localStorage.getItem("accountId");
        if (accountId) {
            getAccount(accountId);
        }
    }, []);

    return (
        <>
            <Navbar bgColor="main-content-white">
                <Spin spinning={isLoading} size="large">
                    <Row className="row-action-top" justify="space-between">
                        <Col xs={24}>
                            <Form
                                form={form}
                                layout="vertical"
                                onValuesChange={onValuesChange}
                                onFinish={onFinish}
                                className="form-setting-detail"
                            >
                                <Form.Item name="username" label="Username 1">
                                    <Input placeholder="Please input username" disabled />
                                </Form.Item>
                                <Form.Item name="password" label="Password" required>
                                    <Input.Password placeholder="Please input password" />
                                </Form.Item>
                                <Form.Item>
                                    <Row justify="center">
                                        <Col xs={24}>
                                            <Button
                                                htmlType="submit"
                                                type="primary"
                                                icon={<SaveOutlined />}
                                                className="btn-save"
                                            >
                                                SAVE ACCOUNT
                                            </Button>
                                        </Col>
                                    </Row>
                                    <Row justify="center">
                                        <Col xs={24}>
                                            <Button
                                                type="primary"
                                                icon={<LogoutOutlined />}
                                                className="btn-logout"
                                                onClick={toLoginPage}
                                            >
                                                LOGOUT
                                            </Button>
                                        </Col>
                                    </Row>
                                </Form.Item>
                            </Form>
                        </Col>
                    </Row>
                </Spin>
            </Navbar>
        </>
    );
};

export default Setting;
