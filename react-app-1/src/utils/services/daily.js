import axios from "../axios";

export const getDailies = async () => {
    return await axios.get(`/dailies`);
};

export const getDailyById = async (id) => {
    return await axios.get(`/dailies/${id}`);
};

export const updateDailyById = async (id, params) => {
    return await axios.put(`/dailies/update/${id}`, {
        ...params,
    });
};
