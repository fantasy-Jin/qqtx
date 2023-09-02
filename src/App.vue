<template>
  <div class="app">
    <van-nav-bar
      :title="TabTitle"
      v-if="!route.meta.hideTabBar && !route.meta.hideTab"
    >
      <template #right>
        <van-icon name="search" @click="toSearch" size="18" />
      </template>
      <template #left>
        logo
        <!--        <van-icon name="search" size="18" />-->
      </template>
    </van-nav-bar>
    <van-tabbar v-model="activeTab" route v-if="!route.meta.hideTabBar">
      <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="friends-o" to="/team">队伍</van-tabbar-item>
      <van-tabbar-item icon="friends-o" to="/chat">聊天</van-tabbar-item>
      <van-tabbar-item icon="user-o" to="/user">个人</van-tabbar-item>
    </van-tabbar>
    <router-view></router-view>
  </div>
</template>
<script setup>
import { useRoute, useRouter } from "vue-router";
import { ref, watch } from "vue";
import useUserStore from "./pinia/userStore.js";
import { storeToRefs } from "pinia";
const activeTab = ref(0);

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();
const { TabTitle } = storeToRefs(userStore);
const toSearch = () => {
  router.push("/search");
};
</script>
<style>
.app {
  max-width: 760px;
  height: 100vh;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;
  overflow-y: auto;
}
</style>
