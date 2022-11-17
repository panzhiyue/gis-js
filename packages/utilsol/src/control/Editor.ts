import Control from "ol/control/Control"
import EditorState from "../editor/EditorState"
import EditorType from "../editor/EditorType"
import EditorBLL from "../editor/EditorBLL"
import { VectorHelper } from "src/editor";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";

/**
 * 编辑器选项信息
 */
export interface EditorItemInfo {
    //唯一号
    id: string | number,
    //父节点唯一号,如果是一级节点则为"0"
    parentId: string | number,
    //是否显示为分割线,如果为true，以下信息可不填，没有这个属性则默认为false
    isLine: boolean,
    //不允许激活时的文本
    disableTitle: string,
    //允许激活时的文本
    enableTitle: string,
    //被激活时的文本
    selectedTitle: string,
    //类型
    type: EditorType,
    //始终不允许被激活
    cannotSel: boolean,
    //状态
    state: EditorState,
    //name
    name: string
}

export interface EditorControlOptions {
    target: HTMLElement,
    layer: VectorLayer<VectorSource>
}

/**
 * 编辑控件 
 */
class EditorControl extends Control {
    protected itemInfos_: EditorItemInfo[];
    protected active_: EditorType;
    protected isEdit_: boolean;
    protected bll_: EditorBLL;
    protected layer_: VectorLayer<VectorSource>;
    constructor(opt_options: EditorControlOptions) {
        super({
            element: document.createElement("div"),
            target: opt_options.target
        });
        let options = Object.assign({ id: "Editor", className: "Editor" }, opt_options);

        this.element.id = options.id;
        this.element.className = options.className;

        this.itemInfos_ = null;

        /**
         *  激活的功能
         *  @type {module:EMap/Edit/EditType}
         */
        this.active_ = null;

        /**
         * 是否开始编辑
         * @type {boolean}
         */
        this.isEdit_ = false;

        this.layer_ = options.layer;
    }

    /**
     * 绑定地图
     * @param {module:ol/Map} map 地图
     */
    setMap(map) {
        super.setMap(map);
        this.init();
        if (map) {
            map.render();
        }
    }

    /**
     * 初始化 
     */
    init() {
        let helper = new VectorHelper({ map: this.getMap(), layer: this.layer_ })
        this.bll_ = new EditorBLL({ map: this.getMap(), helper: helper });
        helper.setEditorBLL(this.bll_);
        helper.setEditorControl(this);
        this.initHTML();
        this.initEvent();
    }

    /**
     * 初始化事件 
     */
    initEvent() {
        //编辑时禁用双击放大
        this.getMap()?.on("dblclick", function () {
            if (this.isEdit == true) {
                return false;
            }
        }.bind(this));
    }

    /**
     * 初始化html页面 
     */
    initHTML() {
        this.element.innerHTML = "";
        let ul = document.createElement("ul");
        ul.onmousedown = function (event) {
            event.preventDefault();
            event.stopPropagation();
        }
        this.element.appendChild(ul);
        let itemInfos = this.itemInfos_;
        for (let i = 0; i < itemInfos.length; i++) {
            if (itemInfos[i].parentId == "0") {
                for (let j = 0; j < itemInfos.length; j++) {
                    if (itemInfos[j].parentId == itemInfos[i].id) {
                        let li = document.createElement("li");
                        if (itemInfos[j].cannotSel == true) {
                            li.className = "selItem cannotSel";
                        } else {
                            //li.className =  /*itemInfos[j].enSel ? "selItem enSel" : "selItem unSel";*/
                            if (itemInfos[j].state == EditorState.HIDE) {
                                li.className = "selItem hide";
                            } else if (itemInfos[j].state == EditorState.SELECTED) {
                                li.className = "selItem active";
                            } else if (itemInfos[j].state == EditorState.ENABLE) {
                                li.className = "selItem enSel";
                            } else if (itemInfos[j].state == EditorState.DISABLE) {
                                li.className = "selItem unSel";
                            }
                        }

                        li.setAttribute("type", itemInfos[j].type);
                        li.dataset.type = itemInfos[j].type;
                        li.onclick = this.itemClick.bind(this);
                        ul.appendChild(li);

                        let circle = document.createElement("span");
                        circle.className = "circle " + itemInfos[j].name;
                        li.appendChild(circle);

                        let name = document.createElement("span");
                        name.className = "name";
                        if (itemInfos[j].state == EditorState.SELECTED) {
                            name.innerHTML = itemInfos[j].selectedTitle;
                        } else if (itemInfos[j].state == EditorState.ENABLE) {
                            name.innerHTML = itemInfos[j].enableTitle;
                        } else if (itemInfos[j].state == EditorState.DISABLE) {
                            name.innerHTML = itemInfos[j].disableTitle;
                        }
                        li.appendChild(name);
                    }
                }
                if (itemInfos[i].isLine) {
                    let li = document.createElement("li");
                    li.className = "line";
                    ul.appendChild(li);
                }
            }
        }
    }

    /**
     * 编辑项点击事件
     * @param {any} event
     */
    itemClick(event) {
        let type = event.currentTarget.dataset.type;
        let itemInfo = this.getItemInfoByType(type);
        if (!itemInfo) {
            console.log("没有找到编辑项！");
            return;
        }

        for (let i = 0; i < this.itemInfos_.length; i++) {
            if (this.itemInfos_[i].state == EditorState.SELECTED) {
                this.itemInfos_[i].state = EditorState.ENABLE
            }
        }

        if (itemInfo.state == EditorState.ENABLE) {
            itemInfo.state = EditorState.SELECTED;
        } else if (itemInfo.state == EditorState.SELECTED) {
            itemInfo.state = EditorState.ENABLE;
        }

        if (itemInfo.type == EditorType.START) {
            if (itemInfo.state == EditorState.SELECTED) {
                this.updateItemState(itemInfo.type, EditorState.HIDE);
                this.updateItemState(
                    EditorType.STOP,
                    EditorState.ENABLE
                );
                this.setIsEdit(true);
                this.updateItemState(
                    EditorType.SELECT,
                    EditorState.ENABLE
                );
                this.updateItemState(
                    EditorType.CREATE,
                    EditorState.ENABLE
                );
            }
        } else if (itemInfo.type == EditorType.STOP) {
            if (itemInfo.state == EditorState.SELECTED) {
                this.updateItemState(itemInfo.type, EditorState.HIDE);
                this.updateItemState(
                    EditorType.START,
                    EditorState.ENABLE
                );
                this.setIsEdit(false);
                this.updateItemState(
                    EditorType.SELECT,
                    EditorState.DISABLE
                );
            }
        } else {
            if (this.getIsEdit() != true) {
                alert("还未选择开始编辑图斑！");
                return;
            }

            if (itemInfo.cannotSel == true) {
                return;
            }
        }

        this.initHTML();
        this.bll_.setActive(this.getActive());
    }

    /**
     * 根据类型获取编辑项信息
     * @param type 编辑类型
     * @return 编辑项信息
     */
    getItemInfoByType(type: EditorType): EditorItemInfo {
        for (let i = 0; i < this.itemInfos_.length; i++) {
            let itemInfo = this.itemInfos_[i];
            if (itemInfo.type == type) {
                return itemInfo;
            }
        }
        return null;
    }


    /**
     * 还原 
     */
    restore() {
        this.active_ = null;
        this.isEdit_ = false;
        this.initHTML();
    }



    /**
     * 设置编辑项信息
     * @param itemInfos
     */
    setItemInfos(itemInfos: EditorItemInfo[]) {
        this.itemInfos_ = itemInfos;
    }

    /**
     * 获取编辑项信息集合
     * @return 
     */
    getItemInfos(): EditorItemInfo[] {
        return this.itemInfos_;
    }

    /**
     * 更新编辑项状态
     * @param type
     * @param itemState
     */
    updateItemState(type: EditorType, itemState: EditorState) {
        let itemInfo = this.getItemInfoByType(type);
        if (itemInfo) {
            itemInfo.state = itemState;
        } else {
            console.log("警告:没有找到" + type + "对应的编辑项");
        }

    }

    /**
     * 更新编辑项集合状态
     * @param types 
     * @param state
     */
    updateItemsState(types: EditorType[], state: EditorState) {
        for (let i = 0; i < types.length; i++) {
            this.updateItemState(types[i], state);
        }
    }

    /**
     * 获取是否正在编辑
     * @returns 是否在编辑
     */
    getIsEdit(): boolean {
        return this.isEdit_;
    }

    /**
     * 设置是否编辑
     * @param isEdit 是否编辑
     */
    setIsEdit(isEdit: boolean) {
        this.isEdit_ = isEdit;
    }

    /**
     * 获取激活的类型
     * @return 激活的类型
     */
    getActive(): EditorType {
        for (let i = 0; i < this.itemInfos_.length; i++) {
            let itemInfo = this.itemInfos_[i];
            if (itemInfo.state == EditorState.SELECTED) {
                return itemInfo.type;
            }
        }
        return null;
    }
}
export default EditorControl;











