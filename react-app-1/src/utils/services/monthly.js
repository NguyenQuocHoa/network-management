import axios from "../axios";

export const getMonthlies = async () => {
    return await axios.get(`/monthlies`);
};

export const getMonthlyById = async (id) => {
    return await axios.get(`/monthlies/${id}`);
};

export const insertMonthly = async (params) => {
    return await axios.post(`/monthlies/insert`, {
        ...params,
    });
};

export const updateMonthlyById = async (id, params) => {
    return await axios.put(`/monthlies/update/${id}`, {
        ...params,
    });
};

export const deleteMonthlyById = async (id) => {
    return await axios.delete(`/monthlies/delete/${id}`);
};
