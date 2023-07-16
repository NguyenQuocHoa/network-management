import React from "react";
import { Space, Row, Col, Switch, Avatar, Button } from "antd";
import { UserOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import "./styles.css";

const AccountItem = ({
    accountId,
    username,
    description,
    isActive,
    idsChange,
    setIdsChange,
    deleteAccount,
}) => {
    const navigate = useNavigate();

    const changeStatusAccount = (checked, accountId) => {
        let ids = [...idsChange.filter((id) => id !== accountId)];
        setIdsChange([...ids, { id: accountId, isActive: checked }]);
    };

    const toDetailPage = (accountId) => {
        navigate(`/accounts/${accountId}`, {
            state: { accountId },
        });
    };

    return (
        <Space className="account-item-space-container">
            <Row gutter={[16, 6]}>
                <Col xs={24}>
                    <Row justify="space-between" align="middle">
                        <Col xs={20}>
                            <Row gutter={16}>
                                <Col xs={5} className="col-avatar">
                                    <Avatar
                                        style={{ backgroundColor: "#87d068" }}
                                        icon={<UserOutlined />}
                                        size="large"
                                    />
                                </Col>
                                <Col xs={19}>
                                    <div className="user-name">{username}</div>
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
                                <Switch
                                    defaultChecked={isActive}
                                    onChange={(checked) => changeStatusAccount(checked, accountId)}
                                />
                                <Button
                                    type="primary"
                                    shape="circle"
                                    className="btn-edit"
                                    icon={<EditOutlined />}
                                    onClick={() => toDetailPage(accountId)}
                                />
                                <Button
                                    type="danger"
                                    shape="circle"
                                    className="btn-delete"
                                    icon={<DeleteOutlined />}
                                    onClick={() => deleteAccount(accountId)}
                                />
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Space>
    );
};

export default AccountItem;
