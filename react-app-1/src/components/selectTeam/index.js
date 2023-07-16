import React, { useState, useEffect } from "react";
import { Select } from "antd";
import { getTeams } from "../../utils/services/team";

const SelectTeam = ({ handleSelected, teamId = null }) => {
    const [options, setOptions] = useState([]);
    const handleChange = (value) => {
        handleSelected({ teamId: value });
    };

    const getListTeamAction = () => {
        getTeams().then(({ data }) => {
            setOptions([
                { value: null, label: "--NONE--" },
                ...data.map((team) => ({
                    value: team.id,
                    label: team.teamName,
                })),
            ]);
        });
    };

    useEffect(() => {
        getListTeamAction();
    }, []);

    return (
        <Select
            value={teamId}
            style={{
                width: "100%",
            }}
            onChange={handleChange}
            options={options}
        />
    );
};
export default SelectTeam;
