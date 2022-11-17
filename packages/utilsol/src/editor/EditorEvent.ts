import BaseEvent from "ol/events/Event"
import EditorType from "./EditorType";

export enum EditorEventType {

}

/**
 * 编辑器事件
 */
class EditorEvent extends BaseEvent {
    private editType: EditorType;
    private result: any;

    /**
     * @param type Type.
     * @param editType 编辑类型.
     * @param result 结果.
     */
    constructor(type: string, editType: EditorType, result: any) {
        super(type);

        //编辑类型
        this.editType = editType;

        //返回结果
        this.result = result;
    }
}

export default EditorEvent;