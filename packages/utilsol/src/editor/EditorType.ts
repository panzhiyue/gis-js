
/**
 * 编辑器类型枚举
 */
enum EditorType {
    START = "开始编辑",
    STOP = "结束编辑",
    SELECT = "选取图斑",
    CREATE = "创建图斑",
    CUTTING = "切割图斑",
    EDIT = "编辑图斑",
    MERGE = "合并图斑",
    DELETE = "删除图斑",
    SAVE = "保存图斑",
    CANCEL = "取消操作"
}

export default EditorType;


/**
 * 获取与输入相反的类型集合
 * @param types 输入的类型集合
 * @return  与输入相反的类型集合
 */
export function getReverse(types: EditorType[]): EditorType[] {
    let reverse: any = [];
    for (let i in EditorType) {

        if (types.indexOf(EditorType[i]) == -1) {
            reverse.push(EditorType[i]);
        }
    }
    return reverse;
}