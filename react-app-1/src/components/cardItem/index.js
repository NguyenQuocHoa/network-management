import React from "react";
import { Row, Button, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import "./styles.css";

const { Title } = Typography;

const CardItem = ({ jobId, bgColor, Icon, title }) => {
    const navigate = useNavigate();
    const onButtonClick = () => {
        navigate(`${title.toLowerCase()}`, { state: { id: jobId } });
    };

    return (
        <Row className="card-container" justify="center">
            <Row
                justify="center"
                align="middle"
                style={{ backgroundColor: bgColor }}
                className="card-custom"
            >
                <Button
                    className="btn-card"
                    icon={<Icon />}
                    onClick={onButtonClick}
                ></Button>
            </Row>
            <Title level={5}>{title}</Title>
        </Row>
    );
};

export default CardItem;
