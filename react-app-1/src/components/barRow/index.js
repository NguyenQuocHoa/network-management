import React from "react";
import { Row, Col, Divider } from "antd";
import CollapseCard from "../collapseCard";
import SwitchCard from "../switchCard";
import "./styles.css";

const getCollapse = (type) => {
    switch (type) {
        case 0:
            return ["Edit Profile", "Change Password", "Privacy"];
        case 2:
            return ["Language", "Country"];
        default:
            return [];
    }
};

const BarRow = ({ Icon, title, type, isDiv = true, isColl = true, isSwitch }) => {
    const [switches, setSwitches] = React.useState([
        { title: "Notifications", checked: true },
        { title: "App Notifications", checked: false },
    ]);

    const onChange = (isCheck, index) => {
        const switchList = [...switches];
        switchList[index].checked = isCheck;
        setSwitches(switchList);
    };

    return (
        <Row className="bar-row-space-container" justify="center" align="middle">
            <Col xs={3} className="icon-custom">
                <Icon />
            </Col>
            <Col xs={21}>
                <h2> {title}</h2>
            </Col>
            {isDiv && <Divider />}
            {isSwitch && <SwitchCard switches={switches} onChange={onChange} />}
            {isColl && <CollapseCard titles={getCollapse(type)} />}
        </Row>
    );
};

export default BarRow;
