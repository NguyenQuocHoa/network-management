import React from "react";
import { Row, Col, Switch } from "antd";
import "./styles.css";

const SwitchCard = ({ switches, onChange }) => {
    return (
        <Row className="switch-card-container">
            <Col xs={24}>
                {switches.length > 0 &&
                    switches.map((swit, index) => (
                        <Row key={swit.title} style={{ padding: 10 }}>
                            <Col xs={20}>{swit.title}</Col>
                            <Col xs={4}>
                                <Switch
                                    className="color-switch"
                                    checked={swit.checked}
                                    onChange={(checked) => onChange(checked, index)}
                                />
                            </Col>
                        </Row>
                    ))}
            </Col>
        </Row>
    );
};

export default SwitchCard;
