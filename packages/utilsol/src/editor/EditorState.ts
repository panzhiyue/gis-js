/**
 * 编辑器编辑项选择状态 
 */
enum EditState {

    /**
     * 不允许被激活
     */
    DISABLE = "disable",
    /**
     * 允许被激活
     */
    ENABLE = "enable",
    /**
     * 被激活
     */
    SELECTED = "selected",
    /**
     * 隐藏
     */
    HIDE = "hide"
}

export default EditState;