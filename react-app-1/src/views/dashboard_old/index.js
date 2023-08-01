import React, { useState } from "react";
import { Row } from "antd";
import Navbar from "../../components/navbar";
import CategoryItem from "../../components/categoryItem";

const Dashboard = () => {
    const [categories, setCategories] = useState([
        {
            id: 1,
            name: "Community",
            numberItem: 52,
            type: 1,
            linkUrl: "/abcd",
            isShow: true,
        },
        {
            id: 2,
            name: "Forums",
            numberItem: 32,
            type: 2,
            linkUrl: "/abcd",
            isShow: true,
        },
        {
            id: 3,
            name: "Jobs",
            numberItem: 94,
            type: 3,
            linkUrl: "/abcd",
            isShow: true,
        },
        {
            id: 4,
            name: "Housing",
            numberItem: 21,
            type: 4,
            linkUrl: "/abcd",
            isShow: true,
        },
        {
            id: 5,
            name: "Personals",
            numberItem: 12,
            type: 5,
            linkUrl: "/abcd",
            isShow: true,
        },
        {
            id: 6,
            name: "Sale",
            numberItem: 41,
            type: 6,
            linkUrl: "/abcd",
            isShow: true,
        },
    ]);

    return (
        <>
            <Navbar bgColor="main-content-gray">
                <h1>Dashboard page</h1>
                <Row justify="space-between">
                    {categories.map((category) => (
                        <CategoryItem
                            key={category.id}
                            name={category.name}
                            numberItem={category.numberItem}
                            type={category.type}
                            linkUrl={category.linkUrl}
                        />
                    ))}
                </Row>
            </Navbar>
        </>
    );
};

export default Dashboard;
