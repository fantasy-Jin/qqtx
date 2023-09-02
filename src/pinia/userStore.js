import { defineStore } from 'pinia'
import {getUser} from "../service/userapi.js";

// 你可以对 `defineStore()` 的返回值进行任意命名，但最好使用 store 的名字，同时以 `use` 开头且以 `Store` 结尾。(比如 `useUserStore`，`useCartStore`，`useProductStore`)
// 第一个参数是你的应用中 Store 的唯一 ID。
const useUserStore = defineStore('userInfo', {
    state: () => ({
        userInfo:{},
        isLogin : false,
        TabTitle: "青春同行"
    }),
    actions:{
        async getCurrentUser() {
         const res =  await getUser()
            if(res!==null){
                this.userInfo = res
                this.isLogin = true
            }
        }
    }
})
export default useUserStore
