<script setup>
import useUserStore from "../pinia/userStore.js";
import {storeToRefs} from "pinia";
import {showConfirmDialog} from "vant";
import {ref} from "vue";
import {logout} from "../service/userapi.js";
import {useRouter} from "vue-router";
import {
  AppstoreFilled,
  EditOutlined,
  ManOutlined,
  RightCircleFilled,
  SmileTwoTone,
  TagsFilled,
  TagsOutlined,
  WomanOutlined
} from "@ant-design/icons-vue"
import dayjs from "dayjs";
import {dateDiffInDays} from "../utils/myDayUtils.js";

const userInfos = ref({
  id: 0,
  username: "",
  gender: 0,
  avatarUrl: "",
  tag: "",
  email: "",
  phone: "",
  createTime: "",
  userProfile: "",
});
const userStore = useUserStore();
const {userInfo} = storeToRefs(userStore);
userInfos.value = userInfo.value;

const tag = userInfos.value.tag;
const newTag = JSON.parse(tag);

const router = useRouter()
const userLogout = () => {
  // dialog 对话弹窗
  showConfirmDialog({
    title: '退出登陆',
    message:
        '确认要退出登陆吗？',
  })
      .then(() => {
        logout();
        router.push("/login")
        // on confirm
      })
      .catch(() => {
        // on cancel
      });
};
// 加入时间
const joinTime = userInfos.value.createTime
const joinDays = dateDiffInDays(dayjs(joinTime).$d, new Date())
 // 调至更新信息
const toUpdate = ()=>{
  router.push("/update")
}
</script>

<template>
  <div class="big-box">
    <div class="content">
      <div class="head-portrait">
        <a-card style="width: 100%" class="cord-user">
          <div class="user-card">
            <div class="top">
              <div class="ava">
                <img :src="userInfos.avatarUrl" alt=""/>
              </div>
              <div class="user-info">
                <div class="username">
                  {{ userInfos.username }}
                </div>
                <div class="userProfile">
                  <EditOutlined/>
                  {{ userInfos.userProfile }}
                </div>
              </div>
              <div class="updateInfo">
                <a-button @click="toUpdate">编辑信息</a-button>
              </div>
            </div>

            <div class="bom">
              <div class="tag">
                <TagsOutlined style="margin-right: 8px"/>
                <a-tag color="blue" :bordered="false" class="new-tag">
                  <template #icon v-if="userInfos.gender===1">
                    <WomanOutlined/>
                    女生
                  </template>
                  <template #icon v-else>
                    <ManOutlined/>
                    男生
                  </template>
                </a-tag>
                <a-tag color="#70b5ff" :bordered="false" v-for="item in newTag" class="new-tag">{{
                    item
                  }}
                </a-tag>

              </div>
              <div class="join-time">
                加入青青同行：
                {{ joinDays }}天了
                <smile-two-tone two-tone-color="#eb2f96"/>
              </div>
            </div>
          </div>
        </a-card>
      </div>
      <div class="Information">
        <van-cell title="我加入的队伍" icon="friends">
          <!-- 使用 right-icon 插槽来自定义右侧图标 -->
          <template #right-icon>
            <van-icon name="arrow" class="cell-icon"/>
          </template>
        </van-cell>
        <van-cell title="队伍管理">
          <template #title>
            <div class="left-icon">
              <AppstoreFilled/>
            </div>
            <span class="custom-title">队伍管理</span>
          </template>
          <!-- 使用 right-icon 插槽来自定义右侧图标 -->
          <template #right-icon>
            <van-icon name="arrow" class="cell-icon"/>
          </template>
        </van-cell>
        <van-cell title="标签修改">
          <!-- 使用 right-icon 插槽来自定义右侧图标 -->
          <template #title>
            <div class="left-icon">
              <TagsFilled/>
            </div>
            <span class="custom-title">标签修改</span>
          </template>
          <template #right-icon>
            <van-icon name="arrow" class="cell-icon"/>
          </template>
        </van-cell>
        <van-cell title="修改信息" icon="manager">
          <!-- 使用 right-icon 插槽来自定义右侧图标 -->
          <template #right-icon>
            <van-icon name="arrow" class="cell-icon"/>
          </template>
        </van-cell>
        <van-cell title="设置" icon="setting">
          <!-- 使用 right-icon 插槽来自定义右侧图标 -->
          <template #right-icon>
            <van-icon name="arrow" class="cell-icon"/>
          </template>
        </van-cell>
        <van-cell title="退出登录" class="custom-title" @click="userLogout">
          <!-- 使用 right-icon 插槽来自定义右侧图标 -->
          <template #title>
            <div class="left-icon">
              <RightCircleFilled/>
            </div>
            <span class="custom-title">退出登录</span>
          </template>

          <template #right-icon>
            <van-icon name="arrow" class="cell-icon"/>
          </template>
        </van-cell>
      </div>
    </div>
  </div>
</template>

<style scoped>
.big-box {
  width: 100%;
  height: 100%;
}

.content {
  position: relative;
}

.top {
  display: flex;
  align-items: center;
}

.cord-user {
  position: relative;
  top: 35px;
}

.head-portrait {
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  width: 100%;
  background: url(../assets/image/uername.jpg);
  background-size: cover;
}

.join-time {
  margin-top: 4px;
  font-size: 12px;
  color: #555;
}

.ava {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: solid 2px pink;
  overflow: hidden;
}

.ava img {
  width: 100%;
  height: 100%;
}

.user-info {
  margin-left: 20px;
}

.username {
  font-size: 24px;
  font-weight: 700;
  margin: 4px 0;
}

.userProfile {
  color: #999;
  margin: 5px 0;
}
.updateInfo{
  flex: 1;
  text-align: right;
  vertical-align: middle;
  color: #4096ff;
}
.tag {
  padding: 4px;
}

.new-tag {
  margin: 0 4px;
}

.Information {
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
  padding-top: 50px;
}

.join-time {
  width: 100%;
  text-align: right;
  margin-top: 6px;
}

.custom-title {
  margin-right: 4px;
  vertical-align: middle;
}

.cell-icon {
  font-size: 16px;
  line-height: inherit;
}

.left-icon {
  display: inline-block;
  margin-right: 6px;
  vertical-align: middle;
  padding-bottom: 2px;
}

:deep(.van-cell__title span) {
  vertical-align: middle;
}

:deep(.ant-card-body) {
  padding: 20px 20px 10px 20px !important;
}
:deep(.ant-btn-default){
  color: #009ef7;
  border-color:#009ef7;
}
</style>
