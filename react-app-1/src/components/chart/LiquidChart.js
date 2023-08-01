import React from "react";
import { Liquid } from "@ant-design/plots";
import "./styles.css";

const LiquidChart = ({ percent, teamName, isMain = false }) => {
    const config = {
        percent: percent,
        outline: {
            border: 4,
            distance: 8,
        },
        wave: {
            length: 128,
        },
    };
    return (
        <div className={!isMain ? "liquid-chart-container" : "liquid-chart-container-large"}>
            <Liquid {...config} />
            {teamName && <span className="team-name">{teamName}</span>}
        </div>
    );
};

export default LiquidChart;
