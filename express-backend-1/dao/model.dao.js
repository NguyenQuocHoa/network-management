const connection = require("../mysql");
const Common = require("./common");

/**
 * @name: class ModelDAO
 * @description: abstract class fro dao
 * @author: Hoa Nguyen Quoc
 * @created : 2022/07/18
 */
class ModelDAO {
    /**
     * @name: getDataListWithField
     * @description: get list object from database
     * @author: Hoa Nguyen Quoc
     * @created : 2022/07/18
     * @param: {objectName} object name for query
     * @param: {fieldsQuery} field for query
     * @param: {fieldSearch} field for search
     * @param: {format} function callback format data
     * @param: {result} function callback get data
     * @param: {kw} keyword for search
     * @return: {result} callback
     */
    static getDataListWithField(objectName, fieldsQuery, fieldSearch, format, result, kw = null) {
        const fields = fieldsQuery.join(",");
        let sql = `SELECT ${fields} FROM ${objectName}`;
        if (kw != null) {
            sql += ` WHERE ${fieldSearch} LIKE '%${kw}%'`;
        }
        connection.query(sql, (err, objs) => result(err, Common.convertObjects(objs, format)));
    }

    /**
     * @name: getDataList
     * @description: get list object from database
     * @author: Hoa Nguyen Quoc
     * @created : 2022/07/18
     * @param: {objectName} object name for query
     * @param: {fieldSearch} field for search
     * @param: {format} function callback format data
     * @param: {result} function callback get data
     * @param: {kw} keyword for search
     * @return: {result} callback
     */
    static getDataList(objectName, fieldSearch, format, result, kw = null) {
        let sql = `SELECT * FROM ${objectName}`;
        if (kw != null && fieldSearch !== null) {
            sql += ` WHERE ${fieldSearch} LIKE '%${kw}%'`;
        }
        connection.query(sql, (err, objs) => result(err, Common.convertObjects(objs, format)));
    }

    /**
     * @name: getDataListWithSql
     * @description: get list object from database
     * @author: Hoa Nguyen Quoc
     * @created : 2022/07/18
     * @param: {format} function callback format data
     * @param: {sql} sql string for query
     * @param: {result} function callback get data
     * @return: {result} callback
     */
    static getDataListWithSql(format, sql, result) {
        connection.query(sql, (err, objs) => result(err, Common.convertObjects(objs, format)));
    }

    /**
     * @name: getObjectById
     * @description: get obj by id
     * @author: Hoa Nguyen Quoc
     * @created : 2022/07/18
     * @param: {objectName} object name for query
     * @param: {format} function callback format data
     * @param: {result} function callback get data
     * @param: {objId} id of object want to get
     * @return: {result} callback
     */
    static getObjectById(objectName, format, result, objId) {
        let sql = `SELECT * FROM ${objectName} WHERE id = ${objId} AND isDelete = 0`;
        connection.query(sql, (err, objs) => {
            if (err) {
                result(err, null);
            } else if (objs?.length === 1) {
                result(null, format(objs[0]));
            } else {
                result(null, null);
            }
        });
    }

    /**
     * @name: getObjectByIdWithField
     * @description: get obj by id
     * @author: Hoa Nguyen Quoc
     * @created : 2022/07/18
     * @param: {objectName} object name for query
     * @param: {fieldsQuery} field for query
     * @param: {format} function callback format data
     * @param: {result} function callback get data
     * @param: {objId} id of object want to get
     * @return: {result} callback
     */
    static getObjectByIdWithField(objectName, fieldsQuery, format, result, objId) {
        const fields = fieldsQuery.join(",");
        let sql = `SELECT ${fields} FROM ${objectName} WHERE id = ${objId}`;
        connection.query(sql, (err, objs) => {
            if (err) {
                result(err, null);
            } else if (objs?.length === 1) {
                result(null, format(objs[0]));
            } else {
                result(null, null);
            }
        });
    }

    /**
     * @name: getObjectByIdWithSql
     * @description: get obj by id
     * @author: Hoa Nguyen Quoc
     * @created : 2022/07/18
     * @param: {format} function callback format data
     * @param: {sql} sql string for query
     * @param: {result} function callback get data
     * @return: {result} callback
     */
    static getObjectByIdWithSql(format, sql, result) {
        connection.query(sql, (err, objs) => {
            if (err) {
                result(err, null);
            } else if (objs?.length === 1) {
                result(null, format(objs[0]));
            } else {
                result(null, null);
            }
        });
    }

    /**
     * @name: insertObjectWithSql
     * @description: insert obj
     * @author: Hoa Nguyen Quoc
     * @created : 2023/07/09
     * @param: {format} function callback format data
     * @param: {sql} sql string for query
     * @param: {result} function callback get data
     * @return: {result} callback
     */
    static insertObjectWithSql(format, sql, result) {
        connection.query(sql, (err, objs) => {
            if (err) {
                result(err, null);
            } else if (objs?.affectedRows) {
                result(null, objs.affectedRows);
            } else {
                result(null, null);
            }
        });
    }

    /**
     * @name: updateObjectByIdWithSql
     * @description: update obj by id
     * @author: Hoa Nguyen Quoc
     * @created : 2023/07/09
     * @param: {sql} sql string for query
     * @param: {result} function callback get data
     * @return: {result} callback
     */
    static updateObjectByIdWithSql(sql, result) {
        connection.query(sql, (err, objs) => {
            if (err) {
                result(err, null);
            } else if (objs?.affectedRows) {
                result(null, objs.affectedRows);
            } else {
                result(null, null);
            }
        });
    }

    /**
     * @name: deleteObjectByIdWithSql
     * @description: delete obj by id
     * @author: Hoa Nguyen Quoc
     * @created : 2023/07/09
     * @param: {format} function callback format data
     * @param: {sql} sql string for query
     * @param: {result} function callback get data
     * @return: {result} callback
     */
    static deleteObjectByIdWithSql(format, sql, result) {
        connection.query(sql, (err, objs) => {
            if (err) {
                result(err, null);
            } else if (objs?.length === 1) {
                result(null, format(objs[0]));
            } else {
                result(null, null);
            }
        });
    }
}

module.exports = ModelDAO;
