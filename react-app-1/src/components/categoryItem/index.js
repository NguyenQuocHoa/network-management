import React from "react";
import { Space, Row, Col, Button, Typography } from "antd";
import {
    UsergroupAddOutlined,
    CommentOutlined,
    MedicineBoxOutlined,
    HomeOutlined,
    UserOutlined,
    RedEnvelopeOutlined,
} from "@ant-design/icons";
import "./styles.css";

const { Title, Text } = Typography;

const CategoryItem = ({ name, numberItem, type, linkUrl }) => {
    const getColor = () => {
        switch (type) {
            case 1:
                return "color-custom-orange";
            case 2:
                return " color-custom-green";
            case 3:
                return "color-custom-sea-blue";
            case 4:
                return "color-custom-purpose";
            case 5:
                return "color-custom-red";
            case 6:
                return "color-custom-blue";
            default:
                return "";
        }
    };
    const getIcon = () => {
        switch (type) {
            case 1:
                return (
                    <UsergroupAddOutlined className="icon-custom color-custom-orange" />
                );
            case 2:
                return (
                    <CommentOutlined className="icon-custom color-custom-green" />
                );
            case 3:
                return (
                    <MedicineBoxOutlined className="icon-custom color-custom-sea-blue" />
                );
            case 4:
                return (
                    <HomeOutlined className="icon-custom color-custom-purpose" />
                );
            case 5:
                return (
                    <UserOutlined className="icon-custom color-custom-red" />
                );
            case 6:
                return (
                    <RedEnvelopeOutlined className="icon-custom color-custom-blue" />
                );
            default:
                return null;
        }
    };
    return (
        <Space className="category-item-space-container">
            <Button className="btn-custom">
                <Row gutter={[0, 8]}>
                    <Col xs={24}>
                        <Row>{getIcon()}</Row>
                        <Row>
                            <Title level={5} className="text-name">
                                {name}
                            </Title>
                        </Row>
                        <Row align="bottom">
                            <Title
                                level={2}
                                className={`number-item ${getColor()}`}
                            >
                                {numberItem}
                            </Title>
                            <Text className="text-items">Items</Text>
                        </Row>
                    </Col>
                </Row>
            </Button>
        </Space>
    );
};

export default CategoryItem;
