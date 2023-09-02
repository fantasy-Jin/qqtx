<script setup>
import {UserTagsList} from "../constants/SearchTagList.js"
import {onMounted, ref} from "vue";
import {SmileOutlined} from "@ant-design/icons-vue";
import {message} from "ant-design-vue";
import useUserStore from "../pinia/userStore.js";
import {storeToRefs} from "pinia";
import {updateTags} from "../service/userapi.js";

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
let UpdateVal = ref([]);
let oldVal = ref([]);
let id =null;

onMounted(()=>{
  const userStore = useUserStore();
  const {userInfo }= storeToRefs(userStore);
  oldVal.value =JSON.parse(userInfo.value.tag)
  id =userInfo.value.id
})
const selVal = (val) => {
  UpdateVal.value = [...activeIds?._rawValue]
  // console.log(activeIds?._rawValue)
}
// 监听输入框
const inputVal = ref("")
const addTags = ()=>{
  if(inputVal.value ===''){
    return message.error("请输入标签")
  }
  // console.log(inputVal.value)
  UpdateVal.value.push(inputVal.value)
  inputVal.value= ''
  // SearchValue.value.push(...inputVal)
}
const closeTag = (tag) => {
  UpdateVal.value.splice(UpdateVal.value.indexOf(tag), 1);

};
const closeOldTag = (tag) => {
  oldVal.value.splice(UpdateVal.value.indexOf(tag), 1);
};
const subTags = ()=>{
  // console.log(UpdateVal.value);
  if(UpdateVal.value.length>10){
    return message.error("最多10个标签")
  }
  let result = UpdateVal.value.concat(oldVal.value).filter(function(item, index, arr) {
    return arr.indexOf(item) === index;
  });
  if(result.length===0){
    return message.error("为空！！")
  }
   updateTags(result).then(res=>{
     if(res.code ===200){
       message.success("成功")
       // TODO 刷新，
     }
   })

}
const activeNames = ref(['1','2'])
</script>

<template>
<div class="content">
  <div class="update">
    <a-alert message="输入或选择你想要的标签" type="success" show-icon>
      <template #icon><smile-outlined /></template>
    </a-alert>
    <div class="checked-tag">
      <van-collapse v-model="activeNames">
        <van-collapse-item title="原来的标签" name="1">
          <template  v-for="(item,index) in oldVal" :key="item">
            <a-tag class="tag" closable @close="closeOldTag(item)" >{{item}}</a-tag>
          </template>
        </van-collapse-item>
        <van-collapse-item title="已经选择的标签" name="2">
          <template  v-for="(item,index) in UpdateVal" :key="item">

            <a-tag class="tag" closable @close="closeTag(item)" >{{item}}</a-tag>
          </template>
        </van-collapse-item>

      </van-collapse>
    </div>
  </div>

  <div class="inputBox">
    <a-input-search
        v-model:value="inputVal"
        placeholder="输入你想定义的标签"
        size="large"
        @search="addTags"
    >
      <template #enterButton>
        <a-button>添加</a-button>
      </template>
    </a-input-search>
  </div>
  <div class="selectBox">
    <van-tree-select
        v-model:active-id="activeIds"
        :items="tagList"
        @click-item="selVal"
        v-model:main-active-index="activeIndex"
    />

  </div>
  <div class="btn_sub">
  <a-button  style="width: 70%" type="primary" size="large" @click="subTags">修改</a-button>
  </div>
</div>
</template>

<style scoped>
.content {
  height: auto;
  margin-bottom: 50px;
}
.update{
  padding: 10px;
}
.inputBox{
  padding: 10px;
}
.checked-tag{
  margin: 15px 0;
  //height: 80px;
}

.tag{
  margin: 5px;
}
.selectBox{
  margin: 20px 0;
}
.btn_sub{
  //margin: 10px auto;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  width: 100%;
  padding: 15px;
}
</style>
