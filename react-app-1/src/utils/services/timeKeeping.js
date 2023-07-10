import axios from "../axios";

export const getTimeKeepings = async () => {
    return await axios.get(`/timeKeepings`);
};

export const getTimeKeepingByTeamId = async (teamId) => {
    return await axios.get(`/timeKeepings/getByTeam/teamId=${teamId}`);
};

export const updateTimeKeepingById = async (id, params) => {
    return await axios.put(`/timeKeepings/update/${id}`, {
        ...params,
    });
};
