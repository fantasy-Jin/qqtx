import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite';
import {VantResolver} from 'unplugin-vue-components/resolvers';
import {AntDesignVueResolver} from 'unplugin-vue-components/resolvers';

export default defineConfig({
    // server: {
    //     proxy: {
    //         '/api': { // 请求接口中要替换的标识
    //             // target: 'http://59.110.12.230:8080/',
    //             target: 'http://127.0.0.1:8080/', /// 代理地址
    //             secure :true,
    //             changeOrigin: true, // 是否允许跨域
    //             rewrite: (path) => path.replace(/^\/api/, '') // api标志替换为''
    //         }
    //     }
    // },
    plugins: [
        vue(),
        Components({
            resolvers: [
                VantResolver(),
                AntDesignVueResolver(
                    {
                importStyle: false, // css in js
                }),
            ],

        }),
    ],
})
