/**
 * 编辑返回代码
 */
enum EditCode {
    /**
     * 执行成功
     */
    SUCCESS = 200,

    /**
     * 程序没问题,执行结果可能不是期望的,也许需要弹出提示信息
     */
    WRANING = 201,

    /**
     * 还被锁着
     */
    LOCK = 202,

    /**
     * 程序错误,例如传入的参数不是指定类型
     */
    ERROR = 204
};

export default EditCode;