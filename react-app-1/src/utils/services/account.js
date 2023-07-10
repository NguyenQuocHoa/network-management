import axios from "../axios";

export const getAccounts = async () => {
    return await axios.get(`/accounts`);
};

export const getAccountByUsername = async (params) => {
    return await axios.post(`/accounts/login`, {
        ...params,
    });
};

export const getAccountById = async (id) => {
    return await axios.get(`/accounts/${id}`);
};

export const insertAccount = async (params) => {
    return await axios.post(`/accounts/insert`, {
        ...params,
    });
};

export const updateAccountById = async (id, params) => {
    return await axios.put(`/accounts/update/${id}`, {
        ...params,
    });
};

export const deleteAccountById = async (id) => {
    return await axios.delete(`/accounts/delete/${id}`);
};
