import axios from "../axios";

export const getTeams = async () => {
    return await axios.get(`/teams`);
};

export const getTeamById = async (id) => {
    return await axios.get(`/teams/${id}`);
};

export const insertTeam = async (params) => {
    return await axios.post(`/teams/insert`, {
        ...params,
    });
};

export const updateTeamById = async (id, params) => {
    return await axios.put(`/teams/update/${id}`, {
        ...params,
    });
};

export const deleteTeamById = async (id) => {
    return await axios.delete(`/teams/delete/${id}`);
};
