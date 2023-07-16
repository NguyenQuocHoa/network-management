import React from "react";
import { Space, Row, Col, Switch, Avatar, Button } from "antd";
import { FileDoneOutlined, EditOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import "./styles.css";

const TimeKeepingItem = ({
    timeKeepingId,
    staffName,
    phone,
    isCheck,
    description,
    idsChange,
    setIdsChange,
}) => {
    const navigate = useNavigate();

    const changeStatusTimeKeeping = (checked, timeKeepingId) => {
        let ids = [...idsChange.filter((id) => id !== timeKeepingId)];
        setIdsChange([...ids, { id: timeKeepingId, isCheck: checked ? 1 : 0 }]);
    };

    const toDetailPage = (timeKeepingId) => {
        navigate(`/time-keepings/${timeKeepingId}`, {
            state: { timeKeepingId },
        });
    };

    return (
        <Space className="time-keeping-item-space-container">
            <Row gutter={[16, 6]}>
                <Col xs={24}>
                    <Row justify="space-between" align="middle">
                        <Col xs={20}>
                            <Row gutter={16}>
                                <Col xs={5} className="col-avatar">
                                    <Avatar
                                        style={{ backgroundColor: "#87d068" }}
                                        icon={<FileDoneOutlined />}
                                        size="large"
                                    />
                                </Col>
                                <Col xs={19}>
                                    <div className="user-name">{staffName}</div>
                                    {phone && <p className="text-description">{phone}</p>}
                                    {description && (
                                        <p className="text-description">{description}</p>
                                    )}
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={4}>
                            <Row>
                                <Switch
                                    defaultChecked={isCheck}
                                    onChange={(checked) =>
                                        changeStatusTimeKeeping(checked, timeKeepingId)
                                    }
                                />
                                <Button
                                    type="primary"
                                    shape="circle"
                                    className="btn-edit"
                                    icon={<EditOutlined />}
                                    onClick={() => toDetailPage(timeKeepingId)}
                                />
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Space>
    );
};

export default TimeKeepingItem;
