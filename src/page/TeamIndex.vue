<template>
  <div class="team-list">
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
    <van-tabs>
      <van-tab title="推荐队伍">
        <TeamList :Teams="Teams" />
      </van-tab>
      <van-tab title="我的队伍">
        <TeamList :Teams="joinVals" />
      </van-tab>
    </van-tabs>
    <!-- 悬浮创建队伍 -->
    <div>
      <van-floating-bubble
        axis="xy"
        icon="chat"
        magnetic="x"
        @offset-change="onOffsetChange"
        @click="createTeam"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import {
  searchteam,
  Teamlist,
  myjoin,
  tojoin,
  tocreateTeam,
} from "../service/teamsApi.js";
import TeamList from "../components/TeamList.vue";
import { useRouter } from "vue-router";

// 响应数据获取res
const pageNum = ref(1);
const pageSize = ref(10);
const Teams = ref([]);
const Teamlistuse = async () => {
  const userList = await Teamlist(pageNum.value, pageSize.value);
  Teams.value = userList.records;
};

onMounted(() => {
  // 发送请求获取用户列表
  Teamlistuse();
  onjoin();
});
const searchVal = ref("");
const teamss = ref([]);
const onSearch = async () => {
  const res = await searchteam(searchVal.value);
  // console.log(res);
  teamss.value = res.data.records;
  Teams.value = teamss.value;
};

// 加入我的队伍
const joinVals = ref([]);
// onjoin需要调用
const onjoin = async () => {
  const joinres = await myjoin();
  joinVals.value = joinres.data.records;
  // console.log(joinVals.value);
};

//悬浮创建队伍
const onOffsetChange = (offset) => {
  showToast(`x: ${offset.x.toFixed(0)}, y: ${offset.y.toFixed(0)}`);
};

const router = useRouter();
const createTeam = () => {
  router.push("/addTeam");
};
</script>

<style scoped>
.team-list {
  margin-bottom: 40px;
}

.team-list {
  padding: 20px 0;
  display: flex;
  flex-direction: column;
}

.team-card {
  margin: 5px;
  display: flex;
  align-items: center;
  /* background-color: #f0f0f0; */
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.team-avatar {
  width: 80px;
  height: 80px;
  object-fit: cover;
  /* border-radius: 50%; */
  margin: 10px;
}

.team-info {
  flex: 1;
  padding: 2px;
}

.team-name {
  font-size: 16px;
  font-weight: 700;
  margin: 0;
}

.team-description {
  font-size: 13px;
  margin: 5px 0;
}

.team-members {
  font-size: 12px;
  color: #888;
  margin: 0;
}

.team-cover {
  width: 120px;
  height: 80px;
  object-fit: cover;
}

.onjoin {
  margin-right: 8px;
}

.join {
  margin: 3px 0 5px 0;
  color: #f8f3d4;
  font-size: 16px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  background-color: #00b8a9;
  border-radius: 10%;
}
</style>
