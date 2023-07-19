import React, { useState, useEffect } from "react";
import { Button, Form, Input, Row, Switch, Typography, Spin } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../../components/navbar";
import SelectTeam from "../../../components/selectTeam";
import {
    getAccountById,
    updateAccountById,
    insertAccount,
} from "../../../../src/utils/services/account";
import { checkJwtToken, checkUnauthorized } from "../../../utils/util";
import { URL_LOGIN } from "../../../../src/utils/constant";
import "../styles.css";

const { TextArea } = Input;
const { Title } = Typography;

const AccountDetail = ({ isEdit }) => {
    const location = useLocation();
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
        } else {
            insertAccount(accountPayload)
                .then(({ data }) => {
                    toDetailPage(data.accountId);
                    getAccount(data.accountId);
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

    const toDetailPage = (accountId) => {
        navigate(`/accounts/${accountId}`, {
            state: { accountId },
        });
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
        let accountId = location?.state?.accountId;
        if (!accountId) {
            setAccountPayload({ isActive: 1 });
            return;
        }
        if (accountId) {
            getAccount(accountId);
        }
    }, []);

    return (
        <Navbar bgColor="main-content-gray">
            <Spin spinning={isLoading} size="large">
                <Form
                    form={form}
                    layout="vertical"
                    onValuesChange={onValuesChange}
                    onFinish={onFinish}
                    className="form-account-detail"
                >
                    <Row justify="center">
                        {isEdit ? (
                            <Title type="warning" level={2}>
                                UPDATE ACCOUNT
                            </Title>
                        ) : (
                            <Title type="success" level={2}>
                                INSERT ACCOUNT
                            </Title>
                        )}
                    </Row>
                    <Form.Item name="username" label="Username" required>
                        <Input placeholder="Please input username" disabled={isEdit} />
                    </Form.Item>
                    <Form.Item name="password" label="Password" required>
                        <Input.Password placeholder="Please input password" />
                    </Form.Item>
                    <Form.Item name="teamId" label="Team">
                        <SelectTeam
                            teamId={accountPayload.teamId}
                            handleSelected={onValuesChange}
                        />
                    </Form.Item>
                    <Form.Item name="description" label="Description">
                        <TextArea rows={4} maxLength={255} placeholder="Please input description" />
                    </Form.Item>
                    <Form.Item name="isActive" className="input-checkbox">
                        <Row justify="end">
                            <Switch
                                checkedChildren="active"
                                unCheckedChildren="inactive"
                                checked={accountPayload.isActive}
                                onChange={(checked) =>
                                    setAccountPayload({
                                        ...accountPayload,
                                        isActive: checked ? 1 : 0,
                                    })
                                }
                            ></Switch>
                        </Row>
                    </Form.Item>
                    <Form.Item>
                        <Row justify="center">
                            <Button htmlType="submit" type="primary">
                                SAVE ACCOUNT
                            </Button>
                        </Row>
                    </Form.Item>
                </Form>
            </Spin>
        </Navbar>
    );
};
export default AccountDetail;
