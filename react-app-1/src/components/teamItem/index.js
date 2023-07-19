import React from "react";
import { Space, Row, Col, Switch, Avatar, Button } from "antd";
import { TeamOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import "./styles.css";

const TeamItem = ({
    teamId,
    teamName,
    description,
    isActive,
    idsChange,
    setIdsChange,
    deleteTeam,
}) => {
    const navigate = useNavigate();

    const changeStatusTeam = (checked, teamId) => {
        let ids = [...idsChange.filter((id) => id !== teamId)];
        setIdsChange([...ids, { id: teamId, isActive: checked }]);
    };

    const toDetailPage = (teamId) => {
        navigate(`/teams/${teamId}`, {
            state: { teamId },
        });
    };

    return (
        <Space className="team-item-space-container">
            <Row gutter={[16, 6]}>
                <Col xs={24}>
                    <Row justify="space-between" align="middle">
                        <Col xs={20}>
                            <Row gutter={16}>
                                <Col xs={5} className="col-avatar">
                                    <Avatar
                                        style={{ backgroundColor: "#87d068" }}
                                        icon={<TeamOutlined />}
                                        size="large"
                                    />
                                </Col>
                                <Col xs={19}>
                                    <div className="user-name">{teamName}</div>
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
                                    onChange={(checked) => changeStatusTeam(checked, teamId)}
                                />
                                <Button
                                    type="primary"
                                    shape="circle"
                                    className="btn-edit"
                                    icon={<EditOutlined />}
                                    onClick={() => toDetailPage(teamId)}
                                />
                                <Button
                                    type="danger"
                                    shape="circle"
                                    className="btn-delete"
                                    icon={<DeleteOutlined />}
                                    onClick={() => deleteTeam(teamId)}
                                />
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Space>
    );
};

export default TeamItem;
