<template>
  <div class="home">
    <!--  搜索框-->
    <van-search
        v-model="searchVal"
        show-action
        placeholder="请输入搜索用户名"
        @search="onSearch"
    >
      <template #action>
        <div @click="onSearch">搜索</div>
      </template>
    </van-search>
    <van-pull-refresh v-model="loading" @refresh="onRefresh" head-height="100">
      <van-empty
          image="error"
          v-if="users.length === 0 || !users"
          description="没有数据"
      />
    <!--  用户列表     -->
      <a-spin :spinning="spinning"  tip="加载中...">
      <UserList :users="users"/>
      </a-spin>
    </van-pull-refresh>
    <!-- 悬浮按钮   -->
    <div class="float_btn">
      <a-float-button-group tooltip="更多功能" trigger="click" :style="{ right: '24px',bottom:'60px' }">
        <template #icon>
          <AppstoreTwoTone two-tone-color="#70b5ff"/>
        </template>
        <a-float-button tooltip="刷新页面" @click="reLoad">
          <template #icon>
            <van-icon name="replay" color="#009ef7"/>
            <!--            <UndoOutlined style="{color: #009ef7}"/>-->
          </template>
        </a-float-button>
        <a-float-button tooltip="匹配模式" @click="MatchUser">
          <template #icon>
            <smile-two-tone/>
          </template>
        </a-float-button>
        <a-float-button tooltip="搜索标签" @click="toSearch">
          <template #icon>
            <TagTwoTone two-tone-color="#70b5ff"/>
          </template>
        </a-float-button>
      </a-float-button-group>
    </div>
  </div>
</template>

<script setup>
import {AppstoreTwoTone, SmileTwoTone, TagTwoTone} from '@ant-design/icons-vue'
import {onMounted, ref} from "vue";
import {getUserList, matchUser, userSearch} from "../service/userapi.js";
import {showConfirmDialog, showFailToast} from "vant";
import UserList from "../components/UserList.vue";
import {useRouter} from "vue-router";
import {message} from "ant-design-vue";

const router = useRouter();
// 用户列表数据
const users = ref([]);
// 分页查询
// 页数配置
let pageSize = ref(10);
let pageNum = ref(1);
const totalPage = ref(0)
// 加载动画
const spinning = ref(false);
// 生命周期发送请求
onMounted(() => {
  // 发送请求获取用户列表
  getUsers(pageNum.value, pageSize.value);
});
// 获取用户列表
const getUsers = async (pageNum, pageSize) => {
  const userList = await getUserList(pageNum, pageSize);
  if(userList?.records.length>0){
    message.success("加载成功")
    const allPageNum = userList.total / pageSize;
    totalPage.value = Math.ceil(allPageNum);
    // console.log(totalPage.value);
    users.value = jsonTag(userList?.records);
  }else{
    message.error( "数据为空")
  }
};

// 搜索
const searchVal = ref("");
const onSearch = async () => {
  spinning.value =true

  let inputText = searchVal.value.replace(/\s/g, "");
  if (inputText=== "") {
    if (users.value.length === 0) {
      await getUsers(pageNum.value, pageSize.value);
    } else {
      showFailToast("请输入文字！");
    }
    spinning.value =false

    return;
  }
  const searchRes = await userSearch(inputText);
  if (searchRes.length > 0) {
    message.success('搜索成功！');
    users.value = jsonTag(searchRes);
  }else{
    message.error("搜索结果为空！")
  }
  spinning.value =false
};

// 下拉刷新
const loading = ref(false);
const onRefresh = () => {
  spinning.value =true
  pageNum.value++;
  if (pageNum.value > totalPage.value) {
    message.error('没有更多数据！');
    loading.value = false
    pageNum.value = 1
    spinning.value =false
    return;
  }
  if(isMatchMode.value){
    getMatchUser()
    loading.value = false;
    spinning.value =false
    return;
  }
  getUsers(pageNum.value, pageSize.value).then(() => {
    loading.value = false;
  });
  spinning.value =false
};

// 悬浮按钮的点击
const toSearch = ()=>{
  router.push("/search")
}
// 匹配用户
const isMatchMode = ref(false)
const MatchUser = ()=>{
  showConfirmDialog({
    title: '匹配伙伴',
    message:
        '是否匹配与你兴趣大致相同的伙伴？',
  })
      .then(() => {
        // on confirm
        spinning.value =true
        pageNum.value =1
        getMatchUser()
      })
}

const getMatchUser = async ()=>{
 const userData = await matchUser(pageNum.value, pageSize.value)
 if(userData!==null){
   isMatchMode.value =true
   message.success("匹配成功")
   users.value = jsonTag(userData.data.records)

 }else{
   message.error("匹配失败")
 }
  spinning.value =false
}
// 刷新页面
const reLoad = ()=>{
  pageNum.value =1
  getUsers(pageNum.value, pageSize.value);
}

// json 标签
const jsonTag = (obj) => {
  return obj.map((e) => {
    e.tag = JSON.parse(e.tag);
    return e;
  });
};
</script>

<style scoped>
.home {
  box-sizing: border-box;
  overflow: hidden;
  padding-bottom: 42px;
}


.user-avatar img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
}


.user-contact a {
  margin-top: 0.3rem;
  display: inline-block;
  margin-right: 10px;
  text-decoration: none;
  color: #009ef7;
}


</style>
