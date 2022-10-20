import { getListeners, getAttrs } from "../utils/index";
export default {
  data() {
    return {
      listeners_: null,
      attrs_: null,
    };
  },
  beforeMount() {
    this.listeners_ = getListeners(this);
    this.attrs_ = getAttrs(this);
  },
};
