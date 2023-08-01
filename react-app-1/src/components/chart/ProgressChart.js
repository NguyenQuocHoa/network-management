import React from "react";
import { Progress } from "antd";
import "./styles.css";

const ProgressChart = ({ percent, teamName, isMain = false }) => {
    return (
        <div className="progress-chart-container">
            <Progress
                type="circle"
                percent={percent}
                format={(percent) => (
                    <span className="span-percent">{`${teamName} => ${percent}%`}</span>
                )}
            />
        </div>
    );
};

export default ProgressChart;
