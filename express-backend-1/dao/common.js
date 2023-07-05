/**
 * @name: class Common
 * @description: include all helper method for dao
 * @author: Hoa Nguyen Quoc
 * @created : 2022/07/17
 */
class Common {
    /**
     * @name: convertObjects
     * @description: convert list raw object to exact format object
     * @author: Hoa Nguyen Quoc
     * @created : 2022/07/17
     * @param: {objs} list objects want to convert
     * @param: {callback} function callback convert object
     * @return: {objs} list object after convert
     */
    static convertObjects = (objs, callback) => {
        if (!objs?.length) {
            return null;
        }
        return objs.map((obj) => callback(obj));
    };
}

module.exports = Common;
