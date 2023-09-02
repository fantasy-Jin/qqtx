<script setup>
import {HeartTwoTone, SmileTwoTone} from "@ant-design/icons-vue";
const props = defineProps({
  users:{
    type:Array,
    default:[]
  }
})

</script>

<template>
  <div class="user-card-list">
    <div v-for="(user, index) in users" :key="index" class="user-card">
      <div class="user-avatar">
        <img :src="user.avatarUrl" alt="User Avatar"/>
      </div>
      <div class="user-details">
        <div class="user-name">{{ user.username }}</div>

        <span class="user-tags" v-for="item in user.tag">
              <van-tag plain type="primary">{{ item }}</van-tag>
            </span>
        <p class="user-bio">{{ user.userProfile }}</p>
        <div class="user-contact">
          <span class="tip">联系我：</span>
          <a :href="'mailto:' + user.email">Email</a>
          <a :href="'tel:' + user.phone">Phone</a>
        </div>
      </div>
      <van-divider>
        <a-space>
          <a-tooltip placement="topLeft" title="哎呦不错！给ta点赞" color="#70b5ff">
          <heart-two-tone two-tone-color="#70b5ff"/>
          </a-tooltip>
        </a-space>
      </van-divider>
    </div>
  </div>
</template>

<style scoped>

.user-card-list {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

}

.user-card {
  box-sizing: border-box;
  display: flex;
  align-items: center;

  margin: 10px;
}

.user-avatar img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
}

.user-details {
  flex: 1;
  margin-left: 15px;
}

.user-name {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 5px;
}

.user-tags {
  color: #888;
  margin: 5px 5px 5px 0;
}

.user-bio {
  margin: 2px 0;
  font-size: 0.9rem;
  color: #b0b5c3;
}

.user-contact a {
  margin-top: 0.3rem;
  display: inline-block;
  margin-right: 10px;
  text-decoration: none;
  color: #009ef7;
}
.user-card-list:last-child{
  margin-bottom: 30px;
}
.tip {
  color: #999;
  font-size: 0.8rem;
}
</style>
