import axios from "../axios";

export const getStaffs = async () => {
    return await axios.get(`/staffs`);
};

export const getStaffById = async (id) => {
    return await axios.get(`/staffs/${id}`);
};

export const insertStaff = async (params) => {
    return await axios.post(`/staffs/insert`, {
        ...params,
    });
};

export const updateStaffById = async (id, params) => {
    return await axios.put(`/staffs/update/${id}`, {
        ...params,
    });
};

export const updateStaffStatus = async (params) => {
    return await axios.put(`/staffs/update-status/`, {
        lstStaff: [...params],
    });
};

export const deleteStaffById = async (id) => {
    return await axios.delete(`/staffs/delete/${id}`);
};
