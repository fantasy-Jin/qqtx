<template>
  <div class="chatIndex">
    <van-empty description="还没有加入任何队伍！" v-if="myJoinList.length <= 0">
      <router-link class="link" to="/team"
        >加入队伍！进入队伍聊天室</router-link
      >
    </van-empty>
    <div class="teamList" v-else>
      <van-cell-group>
        <template v-for="item in myJoinList" :key="item.id">
          <van-cell title="房间" @click="toChat(item.id, item.name)">
            <template #title>
              <div class="room">
                <div class="pic">
                  <img :src="item?.picCover" alt="" />
                </div>
                <div class="text">
                  <div class="name">{{ item.name }}聊天室</div>
                  <div class="message">
                    {{ item?.description }}
                  </div>
                </div>
              </div>
            </template>
            <template #right-icon>
              <span class="tip"> 加入聊天 </span>
            </template>
          </van-cell>
        </template>
      </van-cell-group>
    </div>
  </div>
</template>
<script setup>
import { useRouter } from "vue-router";
import { myjoin } from "../service/teamsApi.js";
import { onMounted, ref } from "vue";
import { message } from "ant-design-vue";

const router = useRouter();
const toChat = (id, name) => {
  console.log(id, name);
  router.push({
    path: "/mainchat",
    query: {
      teamId: id,
      teamName: name,
      teamType: 2,
    },
  });
};
// 获取加入的房间
const myJoinList = ref([]);
onMounted(async () => {
  const res = await myjoin();
  if (res == null) {
    message.error("加载失败");
  }
  myJoinList.value = res.data?.records;
  console.log(myJoinList.value);
});
</script>
<style scoped>
.teamList {
  padding-top: 12px;
}

.link {
  color: #70b5ff;
}
.room {
  display: flex;
  width: 100%;
  align-items: center;
}
.pic {
  width: 70px;
  height: 70px;
  //padding: 8px;
  margin-right: 8px;
  overflow: hidden;
}
.pic img {
  width: 100%;
  border-radius: 4px;
  overflow: hidden;
  vertical-align: top;
}
.text {
  flex: 1;
}
.text .name {
  font-size: 1.1rem;
  font-weight: bold;
  margin-bottom: 6px;
}
.message {
  font-size: 0.9rem;
  color: #666;
  margin-top: 6px;
}
.tip {
  color: #999;
  font-size: 0.6rem;
  text-align: right;
  margin-top: 20px;
}
</style>
