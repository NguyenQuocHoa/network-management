import React from "react";
import { Space, Row, Col, Switch, Avatar, Button } from "antd";
import { UserOutlined, EditOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import "./styles.css";

const AccountItem = ({ accountId, username, description, isActive, idsChange, setIdsChange }) => {
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
                        <Col xs={16}>
                            <Row gutter={16}>
                                <Col xs={6} className="col-avatar">
                                    <Avatar
                                        style={{ backgroundColor: "#87d068" }}
                                        icon={<UserOutlined />}
                                        size="large"
                                    />
                                </Col>
                                <Col xs={16}>
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
                            <Switch
                                defaultChecked={isActive}
                                onChange={(checked) => changeStatusAccount(checked, accountId)}
                            />
                        </Col>
                        <Col xs={4}>
                            <Button
                                type="primary"
                                shape="circle"
                                icon={<EditOutlined />}
                                onClick={() => toDetailPage(accountId)}
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Space>
    );
};

export default AccountItem;
