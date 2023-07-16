import React, { useState, useEffect } from "react";
import { Select } from "antd";
import { getStaffs } from "../../utils/services/staff";

const SelectStaff = ({ handleSelected, leaderId = null }) => {
    const [options, setOptions] = useState([]);
    const handleChange = (value) => {
        handleSelected({ leaderId: value });
    };

    const getListStaffAction = () => {
        getStaffs().then(({ data }) => {
            setOptions([
                { value: null, label: "--NONE--" },
                ...data.map((staff) => ({
                    value: staff.id,
                    label: staff.staffName,
                })),
            ]);
        });
    };

    useEffect(() => {
        getListStaffAction();
    }, []);

    return (
        <Select
            value={leaderId}
            style={{
                width: "100%",
            }}
            onChange={handleChange}
            options={options}
        />
    );
};
export default SelectStaff;
