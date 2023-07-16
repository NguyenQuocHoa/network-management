const ModelDAO = require("./model.dao");
const connection = require("../mysql");

/**
 * @name: class Staff
 * @description: dao for model staff
 * @author: Hoa Nguyen Quoc
 * @created : 2023/07/09
 */
class StaffDAO {
    /**
     * @name: getStaffs
     * @description: get list staff from database
     * @author: Hoa Nguyen Quoc
     * @created : 2023/07/09
     * @param: {result} function callback get data
     * @param: {kw} keyword for search
     * @return: {result} callback
     */
    static getStaffs = (result, kw = null) => {
        ModelDAO.getDataList("staff", null, StaffDAO.convertObject, result, kw, true);
    };

    /**
     * @name: getStaffById
     * @description: get staff by id
     * @author: Hoa Nguyen Quoc
     * @created : 2023/07/09
     * @param: {result} function callback get data
     * @param: {staffId} id of object want to get
     * @return: {result} callback
     */
    static getStaffById = (result, staffId) => {
        ModelDAO.getObjectById("staff", StaffDAO.convertObject, result, staffId);
    };

    /**
     * @name: insertStaff
     * @description: insert staff by id
     * @author: Hoa Nguyen Quoc
     * @created : 2023/07/09
     * @param: {result} function callback get data
     * @param: {staff} staff object want to insert
     * @return: {result} callback
     */
    static insertStaff = (result, staff) => {
        let sql = `INSERT INTO staff (staffName, dob, phone, teamId, description, isActive, isDelete)
                    VALUES ('${staff.staffName}', '${staff.dob}', '${staff.phone}', ${
            staff.teamId
        }, '${staff.description ?? `${staff.description}`}', ${staff.isActive}, 0);`;
        ModelDAO.insertObjectWithSql(sql, result);
    };

    /**
     * @name: updateStaffById
     * @description: update staff by id
     * @author: Hoa Nguyen Quoc
     * @created : 2023/07/09
     * @param: {result} function callback get data
     * @param: {staff} staff object want to update
     * @return: {result} callback
     */
    static updateStaffById = (result, staffId, staff) => {
        let sql = `UPDATE staff SET staffName = '${staff.staffName}', dob = '${staff.dob}', 
        phone = '${staff.phone}', teamId = ${staff.teamId}, description = '${staff.description}', 
        isActive = ${staff.isActive} WHERE id = ${staffId}`;
        ModelDAO.updateObjectByIdWithSql(sql, result);
    };

    /**
     * @name: updateStaffStatus
     * @description: update staff status by id
     * @author: Hoa Nguyen Quoc
     * @created : 2023/07/09
     * @param: {result} function callback get data
     * @param: {staff} staff object want to update
     * @return: {result} callback
     */
    static updateStaffStatus = (result, lstStaff) => {
        let lstSql = "";
        lstStaff.forEach((staff) => {
            lstSql += `UPDATE staff SET isActive = ${staff.isActive} WHERE id = ${staff.id};`;
        });
        ModelDAO.updateObjectByIdWithSqlList(lstSql, result);
    };

    /**
     * @name: deleteStaffById
     * @description: delete staff by id
     * @author: Hoa Nguyen Quoc
     * @created : 2023/07/09
     * @param: {result} function callback get data
     * @param: {staff} staff object want to delete
     * @return: {result} callback
     */
    static deleteStaffById = (result, staffId) => {
        let sql = `UPDATE staff SET isDelete = 1 WHERE id = ${staffId}`;
        ModelDAO.updateObjectByIdWithSql(sql, result);
    };

    /**
     * @name: convertObject
     * @description: convert raw object to exact format object
     * @author: Hoa Nguyen Quoc
     * @created : 2023/07/09
     * @param: {obj} object want to convert
     * @return: {obj} object after convert
     */
    static convertObject = (obj) => {
        return {
            id: obj.id,
            staffName: obj.staffName,
            dob: obj.dob,
            phone: obj.phone,
            teamId: obj.teamId,
            description: obj.description,
            isActive: obj.isActive,
        };
    };
}

module.exports = StaffDAO;
