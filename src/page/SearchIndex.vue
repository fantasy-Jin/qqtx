<script setup>
import {h, ref, watch} from 'vue';
import {SearchOutlined, SmileOutlined} from '@ant-design/icons-vue';
import {UserTagsList} from "../constants/SearchTagList.js"
import {tagSearch} from "../service/userapi.js";
import UserList from "../components/UserList.vue";
import {message} from "ant-design-vue";
// 搜索值
const SearchValue = ref([]);
// 搜索建议
const options = [{value: "java"}]
// 多选框的已经选择值
const activeIds = ref([]);
const activeIndex = ref(0)
// 多选框的预选的值
const tagList = UserTagsList
// 处理数据放进搜索建议
tagList.map(e => {
  e.children.forEach((item, index) => {
    options.push({
      value: item.text
    })
  })
})
// 选择标签的事件
const selVal = (val) => {
  // 搜索框的值
  // 用户选择的值
  SearchValue.value = activeIds?._rawValue
}
// 监听搜索框
const handleChange = ()=>{
  if(SearchValue.value.length<=0){
    isSearchRes.value= false
  }
}
// 清空内容
const clearData = () => {
  SearchValue.value = []
  activeIds.value = []
}
// 提示关闭处理
const visible = ref(true);
const handleClose = () => {
  visible.value = false;
};

// 搜索
// 用户列表数据
const userList = ref([])
let isSearchRes = ref(false)
let msg = ref("可从下面选择标签去搜索，也可以手动输入")
const onSearch = async () => {
  const res = await tagSearch(SearchValue.value)

  if (res?.records.length > 0) {
    userList.value = jsonTag(res.records)
    isSearchRes.value= true
    message.success("搜索成功");
    msg.value = "搜索用户成功，清空搜索框可重新选择标签"
  }else{
    message.error('没有符合的用户！');
  }

}

const jsonTag = (obj) => {
  return obj.map((e) => {
    e.tag = JSON.parse(e.tag);
    return e;
  });
};

</script>

<template>
  <div class="search">
    <div class="inputBox">
      <a-select
          v-model:value="SearchValue"
          mode="tags"
          style="width: 100%"
          showSearch
          placeholder="搜索你想知道的标签"
          @change="handleChange"
          :options="options"
      ></a-select>
      <div class="btn">
        <a-button type="primary" :icon="h(SearchOutlined)" @click="onSearch"></a-button>
      </div>
    </div>
    <div class="tip">
      <a-alert
          :message="msg"
          type="info"
          show-icon
          closable
          :after-close="handleClose"
      >
        <template #icon>
          <smile-outlined/>
        </template>
      </a-alert>
    </div>
    <div class="contentBox" v-if="!isSearchRes">
      <div class="selectBox">
        <van-tree-select
            v-model:active-id="activeIds"
            :items="tagList"
            @click-item="selVal"
            v-model:main-active-index="activeIndex"
        />
      </div>
      <div class="sub">
        <a-button class="sub_btn" size="large" @click="clearData">重置</a-button>
        <a-button class="sub_btn" type="primary" @click="onSearch" size="large">搜索</a-button>
      </div>
    </div>

    <div class="user-list" v-else>
      <UserList :users="userList"/>
    </div>
  </div>

</template>

<style scoped>
.search {
  padding-bottom: 30px;
}

.inputBox {
  display: flex;
  align-content: center;
  justify-content: center;
  padding: 0 10px;
}

.tip {
  padding: 20px 10px;
}

.btn {
  margin: 0 5px;
}

.sub {
  margin-top: 30px;
  display: flex;
  justify-content: space-around;
}

.sub_btn {
  width: 10rem;
}

</style>
