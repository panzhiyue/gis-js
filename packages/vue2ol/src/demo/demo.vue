<template>
  <div>
    <!-- @slot 这是默认插槽 -->
    <slot></slot>

    <!-- @slot 这是插槽2 -->
    <slot name="slot2"></slot>

    <!-- @slot 这是插槽3
            @binding {object} icon icon of the menu item
            @binding {string} text text of the menu item
     -->
    <slot name="sloat3" :icon="row.item.icon" :text="row.item.text"></slot>

    <!--
    我是在template里面的事件
    @event click
    @property {object} demo - example
    @property {number} called - test called
  -->
    <button @click="$emit('click', test)"></button>
  </div>
</template>
<script>
//https://vue-styleguidist.github.io/docs/Docgen.html#custom-tags
/**
 * 这是一个示例
 * @displayName 我替换了原本的组件显示名称demo
 * @since 我是从什么时候添加进来的？
 * @version 1.0
 */
export default {
  name: 'Demo',
  props: {
    /**
     * 属性一:我是一个字符串，默认值为#333
     */
    attr1: {
      type: String,
      default: '#333',
    },

    /**
     * 属性二:我是一个字符串,默认值是img,有效值为img,cia
     * @values img|cia
     */
    attr2: {
      type: String,
      default: 'img',
    },

    /**
     * 属性三:我是一个本弃用的属性，大家快去使用属性二吧
     * @deprecated 大家快去使用属性二吧
     */
    attr3: {
      type: String,
      default: 'img',
    },

    /**
     */
    attr4: {
      type: String,
      default: 'img',
    },

    /**
     * 3333
     * @typeName ol/Map
     */
    attr5: {
      type: Object,
      default: null,
    },

    /**
     * 我是谁？我是干什么的？想知道就看下下面的链接吧
     *
     * @see https://vue-styleguidist.github.io/docs/Documenting.html#available-tags
     * @link https://vue-styleguidist.github.io/docs/GettingStarted.html#_1-install
     */
    attr6: {
      type: String,
      default: 'img',
    },
  },
  mounted() {
    /**
     * 我是成功事件
     * @event success
     */
    this.$emit('success')

    /**
     * 我是修改事件
     *
     * @property {number} newValue new value set
     * @property {number} oldValue value that was set before the change
     */
    this.$emit('change', newValue, oldValue)
  },
  methods: {
    /**
     * 我是方法一:没有爸爸的允许我不能让人看见我
     * @param {Object} args 我是参数
     * @param {String} [args.name] 我是参数args的name属性
     */
    func1(args) {},

    /**
     * 我是方法二:爸爸带我出去见世面啦
     * @public
     * @param {Object} args 我是参数
     * @param {String} [args.name] 我是参数args的name属性
     * @return {String} 我把name返回啦
     */
    func2(args) {
      return args.name
    },

    /**
     * 我是方法三:爸爸把我名字改了
     * @public
     * @param {Object} args 我是参数
     * @param {String} [args.name] 我是参数args的name属性
     * @return {String} 我把name返回啦
     *
     * @example
     * ```js
     * 让我教教你我要怎么用
     * ```
     */
    func3(args) {
      return args.name
    },
  },
}
</script>
