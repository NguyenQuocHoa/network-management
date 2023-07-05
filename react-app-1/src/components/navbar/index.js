import React, { useState, useEffect } from "react";
import { Row, Col, Button } from "antd";
import {
    CompassFilled,
    MedicineBoxFilled,
    DashboardFilled,
    BellFilled,
    SettingFilled,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./styles.css";

const Navbar = ({ children, bgColor }) => {
    const navigate = useNavigate();
    const [navbar, setNavbar] = useState([]);

    useEffect(() => {
        let orderActive = localStorage.getItem("order-active")
            ? localStorage.getItem("order-active")
            : 0;
        setNavbar(
            initialNavbar().map((navbar, index) => ({
                ...navbar,
                isActive: index === +orderActive,
            }))
        );
    }, []);

    const initialNavbar = () => {
        return [
            {
                icon: <CompassFilled className="icon-custom" />,
                href: "/home",
                isActive: false,
            },
            {
                icon: <MedicineBoxFilled className="icon-custom" />,
                href: "/job",
                isActive: false,
            },
            {
                icon: <DashboardFilled className="icon-custom" />,
                href: "/dashboard",
                isActive: false,
            },
            {
                icon: <BellFilled className="icon-custom" />,
                href: "/notify",
                isActive: false,
            },
            {
                icon: <SettingFilled className="icon-custom" />,
                href: "/setting",
                isActive: false,
            },
        ];
    };

    const onIconClick = (order, href) => {
        let navbarList = [...navbar.map((nav) => ({ ...nav, isActive: false }))];
        navbarList[order].isActive = true;
        localStorage.setItem("order-active", order);
        navigate(href);
    };

    return (
        <Row justify="space-evenly" className={`main-layout ${bgColor}`}>
            <Col xs={24} className="main-content">
                {children}
            </Col>
            <Col xs={24} className="main-nav">
                <Row justify="space-evenly" align="bottom">
                    {navbar.map((nav, index) => (
                        <Col key={index}>
                            <Button
                                className={`btn-navbar ${nav.isActive ? "navbar-active" : ""}`}
                                shape="circle"
                                icon={nav.icon}
                                onClick={() => onIconClick(index, nav.href)}
                            ></Button>
                        </Col>
                    ))}
                </Row>
            </Col>
        </Row>
    );
};

export default Navbar;
