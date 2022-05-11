import nodeResolve from 'rollup-plugin-node-resolve'
import vue from 'rollup-plugin-vue'
import pkg from "./package.json";
import less from "rollup-plugin-less"
import externals from "rollup-plugin-node-externals";
// 入口
const input = 'src/index.js'
// 插件
const plugins = [ // 顺序无严格要求，目前观察buble需要放在vue下面
    externals({
        deps: true
    }),
    nodeResolve(),
    vue(),
    // less({
    //     output: "lib/style.css"
    // }),
]

// 外链 - 外部依赖的名称，放在该处的npm包不会参与打包
const external = Object.keys(pkg.dependencies || {});

export default [{
    input,
    // 出口
    output: [{
            format: "cjs",
            file: pkg.main,
            exports: "auto",
            name: 'vueol', // 此处修改为希望包挂在window上的名称
            sourcemap: false
        },
        {
            format: "es",
            file: pkg.module,
            name: 'vueol', // 此处修改为希望包挂在window上的名称
            sourcemap: false
        },
    ],
    plugins,
    external
}, ]