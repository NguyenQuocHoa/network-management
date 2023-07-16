import React from "react";
import { Space, Row, Col, Switch, Avatar, Button } from "antd";
import { UserSwitchOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import "./styles.css";

const StaffItem = ({
    staffId,
    staffName,
    phone,
    description,
    isActive,
    idsChange,
    setIdsChange,
    deleteStaff,
}) => {
    const navigate = useNavigate();

    const changeStatusStaff = (checked, staffId) => {
        let ids = [...idsChange.filter((id) => id !== staffId)];
        setIdsChange([...ids, { id: staffId, isActive: checked }]);
    };

    const toDetailPage = (staffId) => {
        navigate(`/staffs/${staffId}`, {
            state: { staffId },
        });
    };

    return (
        <Space className="staff-item-space-container">
            <Row gutter={[16, 6]}>
                <Col xs={24}>
                    <Row justify="space-between" align="middle">
                        <Col xs={20}>
                            <Row gutter={16}>
                                <Col xs={5} className="col-avatar">
                                    <Avatar
                                        style={{ backgroundColor: "#87d068" }}
                                        icon={<UserSwitchOutlined />}
                                        size="large"
                                    />
                                </Col>
                                <Col xs={19}>
                                    <div className="user-name">{staffName}</div>
                                    <p className="text-phone">{phone}</p>
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
                                    onChange={(checked) => changeStatusStaff(checked, staffId)}
                                />
                                <Button
                                    type="primary"
                                    shape="circle"
                                    className="btn-edit"
                                    icon={<EditOutlined />}
                                    onClick={() => toDetailPage(staffId)}
                                />
                                <Button
                                    type="danger"
                                    shape="circle"
                                    className="btn-delete"
                                    icon={<DeleteOutlined />}
                                    onClick={() => deleteStaff(staffId)}
                                />
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Space>
    );
};

export default StaffItem;
