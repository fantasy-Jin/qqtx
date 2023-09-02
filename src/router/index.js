import HomeIndex from "../page/HomeIndex.vue";
import {createRouter, createWebHashHistory} from "vue-router"
import app from "../App.vue";
import Login from "../page/Login.vue";
import Register from "../page/Register.vue";
import useUserStore from "../pinia/userStore.js";
import {storeToRefs} from "pinia";
import {getUser} from "../service/userapi.js";
import TeamIndex from "../page/TeamIndex.vue";
import UserIndex from "../page/UserIndex.vue";
import SearchIndex from "../page/SearchIndex.vue";
import UpdateUser from "../page/UpdateUser.vue";
import ChatIndex from "../page/ChatIndex.vue";
import ChatMain from "../page/ChatMain.vue";
import TagsUpdate from "../page/TagsUpdate.vue";
import addTeam from "../page/addTeam.vue"


const routes = [
  { path: "/login", component: Login, name: "login",meta: {hideTabBar: true,title:"登陆", }},
  { path: "/", component: HomeIndex, name: "home-index" ,meta: {title:"首页", }},
  { path: "/register", component: Register, name: "register", meta: {hideTabBar: true, title:"注册",}},
  { path: "/team", component: TeamIndex, name: "team",meta: { title:"队伍",} },
  { path: "/user", component: UserIndex, name: "user",title:"个人",meta: { title:"个人",hideTab:true} },
  { path: "/search", component: SearchIndex, name: "search",meta: { title:"标签搜索"} },
  { path: "/update", component: UpdateUser, name: "update",meta: { title:"修改信息"} },
  { path: "/chat", component: ChatIndex, name: "chat",meta: { title:"聊天室"} },
  { path: "/mainchat", component: ChatMain, name: "chatMain",meta: { title:"聊天房间",hideTabBar: true, } },
  { path: "/tags", component: TagsUpdate, name: "TagsUpdate",meta: { title:"标签修改",} },
  { path: "/addTeam", component: addTeam, name: "addTeam",meta: { title:"创建队伍",} },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes, // `routes: routes` 的缩写
});
// 路由守卫
router.beforeEach(async (to, from) => {
  const userStore = useUserStore()
  const {userInfo,isLogin,TabTitle} = storeToRefs(userStore)
  // 判断 状态管理库有没有登陆 user 信息
  if(!isLogin.value){
    // 没有就发请求获取当前登陆用户的信息
    await getUser().then(res=>{
      // 判断是否获取到
      // 如果获取到代表之前登陆了
      // 把信息存进 store
      if(res!==null){
        userInfo.value = res
        isLogin.value = true
      }
    })
  }
  // 动态切换标题栏
  if(to.meta?.title){
    TabTitle.value =to.meta?.title
  }
  if(!isLogin.value&& to.name !== 'login'&& to.name !== 'register'){
    return { name: 'login' }
  }
})
export default router;
