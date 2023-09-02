<script setup>
import { UserOutlined, AntDesignOutlined } from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import { ref } from "vue";
import { tojoin } from "../service/teamsApi.js";
import { Dialog } from "vant";

const props = defineProps({
  Teams: {
    type: Array,
    default: [],
  },
});
// 加入我的队伍
const iid = ref("");
const joinVals = ref([]);
const show = ref(false);
const passwordnumber = ref("");

// onjoin需要调用
//按钮点击之后调用函数,id和status， 0是公开房，1是私密房，2是密码房
const joinTeam = async (id, status) => {
  //判断是不是密码房间，如果是就输入密码
  if (status === 2) {
    show.value = true;
    iid.value = id;
  }
  const joinres = await tojoin(id, null);
  console.log(joinres);
  //加入公开房间
  if (joinres !== null) {
    message.success("成功");
  } else {
    message.error("失败");
  }
};

const toconfirm = async () => {
  if (passwordnumber.value.length < 4) {
    message.error("失败");
    passwordnumber.value = "";
  } else {
    //密码房加入调入加入房间函数
    const onconfirm = await tojoin(iid.value, passwordnumber.value);                                  
    console.log(onconfirm); 
    if(onconfirm.code === 200) {
      message.success("成功");
    }else{
      message.error("失败");
    }
  }
};
</script>

<template>
  <div v-for="(team, index) in Teams" :key="index" class="team-card">
    <img :src="team?.picCover" alt="Team Avatar" class="team-avatar" />
    <div class="team-info">
      <h3 class="team-name">{{ team.name }}</h3>
      <p class="team-description">队伍描述:{{ team.description }}</p>
      <p class="team-members">
        最大人数:{{ team.hasJoinNum }} / {{ team.maxNum }}
      </p>
      <p class="team-status" v-if="team.status === 0">
        <van-tag type="primary">公开</van-tag>
      </p>
      <p class="team-status" v-else-if="team.status === 1">
        <van-tag type="warning">私有</van-tag>
      </p>
      <p class="team-status" v-else-if="team.status === 2">
        <van-tag type="success">加密</van-tag>
      </p>
    </div>

    <div class="onjoin">
      <div class="join_btn">
        <a-button v-if="!team.hasJoin" @click="joinTeam(team.id, team.status)"
          >加入队伍</a-button
        >
        <a-button v-else>队伍详情</a-button>
      </div>
      <div>
        <a-avatar-group>
          <a-avatar :src="team.createUser?.avatarUrl" />
          <a-avatar style="background-color: #f56a00">K</a-avatar>
          <a-tooltip title="队伍成员" placement="top">
            <a-avatar style="background-color: #87d068">
              <template #icon>
                <UserOutlined />
              </template>
            </a-avatar>
          </a-tooltip>
          <a-avatar style="background-color: #1890ff">
            <template #icon>
              <AntDesignOutlined />
            </template>
          </a-avatar>
        </a-avatar-group>
      </div>
    </div>
    <div>
      <van-dialog
        v-model:show="show"
        title="标题"
        show-cancel-button
        @confirm="toconfirm()"
      >
        <van-field v-model="passwordnumber" type="number" label="房价密码" />
      </van-dialog>
    </div>
  </div>
</template>

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

:deep(.van-overlay) {
  background: rgba(0, 0, 0, 0.1);
}
</style>
