import React from "react";
import { Collapse } from "antd";

const { Panel } = Collapse;

const CollapseCard = ({ titles, children, onChange }) => {
    const onCollapseChange = (key) => {
        // console.log(key);
    };
    const text = "this is text";

    return (
        <Collapse defaultActiveKey={[titles[0]]} onChange={onCollapseChange}>
            {titles.length > 0 &&
                titles.map((title) => (
                    <Panel header={title} key={title}>
                        <p>{text}</p>
                    </Panel>
                ))}
        </Collapse>
    );
};

export default CollapseCard;
