<script setup>
import {ref} from "vue";
import useUserStore from "../pinia/userStore.js";
import {storeToRefs} from "pinia";
import {updateAva, updatePassword, updateUsers} from "../service/userapi.js";
import {message} from "ant-design-vue";
import {Toast} from "vant";
import myAxios from "../service/myaxios.js";

const userStore = useUserStore();
const {userInfo} = storeToRefs(userStore);
const open = ref(false);
const newData = ref("");
const tipLabel = ref("信息");
const updateFile = ref('')
// 弹窗
const updateInfo = (val) => {
  open.value = true;
  switch (val) {
    case 'username' :
      tipLabel.value = '名称';
      updateFile.value = val
      break;
    case 'gender' :
      tipLabel.value = '性别';
      updateFile.value = val
      break;
    case 'userProfile' :
      tipLabel.value = '简介';
      updateFile.value = val
      break;
    case 'phone' :
      tipLabel.value = '电话';
      updateFile.value = val
      break;
    case 'email' :
      tipLabel.value = '邮箱';
      updateFile.value = val
      break;
    case 'password' :
      tipLabel.value = '密码';
      updateFile.value = val
      break;
    default:
      message.error("错误")
  }
  // console.log(val)
}
// 发起请求 // 按钮
const updateSub = async () => {
  if (updateFile.value !=='password'&&newData.value === '') {
    message.error("请输入内容");
    return;
  }
  if (updateFile.value === '') {
    message.error("错误");
    return;
  }

  switch (updateFile.value) {
    case 'username' :
      if (newData.value.length > 6) {
        message.error("长度不对");
        newData.value = '';
        return;
      }
      break;
    case 'gender' :
      if (newData.value !== '男' && newData.value !== '女') {
        message.error("内容不对");
        newData.value = '';
        return;
      }
      if (newData.value === '男') {
        newData.value = 0;
      }
      if (newData.value === '女') {
        newData.value = 1;
      }
      break;
    case 'userProfile' :
      if (newData.value.length > 100) {
        message.error("长度不对");
        newData.value = '';
        return;
      }
      break;
    case 'phone' :
      const phoneRegex = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
      if (!phoneRegex.test(newData.value)) {
        message.error("格式不对");
        newData.value = '';
        return;
      }
      break;
    case 'email' :
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      if (!emailRegex.test(newData.value)) {
        message.error("格式不对！");
        newData.value = '';
        return;
      }
      break;
    case 'password':
      return updateUserPassword()
    default:
      message.error("错误")
  }
  const users = userInfo.value
  users[updateFile.value] = newData.value;
  const res = await updateUsers(users)
  newData.value = ''
  if (res === null) {
    message.error("失败");
    return
  }
  message.success("更新成功");

}

// 上传图片
const fileList = ref([
  {url: "", isImage: true},
  // Uploader 根据文件后缀来判断是否为图片文件
  // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明

]);

// 上传前校验文件
const beforeRead = (file) => {
  if (file.type !== 'image/jpeg') {
    message.error('请上传 jpg 格式图片');
    return false;
  }
  return true;
};
// 上传
const afterRead = (file) => {
  const formData = new FormData();
  // 要把数据变成file格式
  formData.append('file', file.file);
  updateAva(formData).then(res => {
    if (res === null) {
      return message.error("上传失败！")
    }
    userStore.getCurrentUser()
    message.success("更新成功！")
  });

}
// 修改密码
const oldPassword = ref("")
const newPassword = ref("")
const updateUserPassword = () =>{
  const pattern = /^[A-Za-z0-9!@#$%^&*()\-_=+\[\]{}|;:'",.<>/?]{8,18}$/;
  if(!pattern.test(oldPassword.value)||!pattern.test(newPassword.value)){
    return message.error("密码长度8~18！！");
  }
  updatePassword(oldPassword.value,newPassword.value).then(res=>{
    if(res==null){
      return message.error("修改失败！！")
    }
    message.success("成功")
  })
}
</script>

<template>
  <van-cell-group>
    <!--    <van-uploader :after-read="uploadFile" />-->
    <van-uploader multiple :before-read="beforeRead" :after-read="afterRead">
      <template #default>
        <van-cell class="item" title="头像">
          <template #right-icon>
            <a-avatar :src="userInfo.avatarUrl" :size="64"/>
            <van-icon name="arrow" class="cell-icon"/>
          </template>
        </van-cell>
      </template>
    </van-uploader>

    <van-cell
        class="item"
        title="名称"
        :value="userInfo.username ?? '未设置'"
        @click="updateInfo('username')"
    >
      <template #right-icon>
        <van-icon name="arrow" class="cell-icon"/>
      </template>
    </van-cell>
    <van-cell
        class="item"
        title="性别"
        :value="userInfo.gender===0 ?'男':'女'"
        @click="updateInfo('gender')"
    >
      <template #right-icon>
        <van-icon name="arrow" class="cell-icon"/>
      </template>
    </van-cell>
    <van-cell
        class="item"
        title="简介"
        :value="userInfo?.userProfile?? '未设置'"
        @click="updateInfo('userProfile')"
    >
      <template #right-icon>
        <van-icon name="arrow" class="cell-icon"/>
      </template>
    </van-cell>
    <van-cell
        class="item"
        title="电话"
        :value="userInfo.phone ?? '未设置'"
        @click="updateInfo('phone')"
    >
      <template #right-icon>
        <van-icon name="arrow" class="cell-icon"/>
      </template>
    </van-cell>
    <van-cell class="item"
              title="邮箱"
              :value="userInfo.email?? '未设置'"
              @click="updateInfo('email')"
    >
      <template #right-icon>
        <van-icon name="arrow" class="cell-icon"/>
      </template>
    </van-cell>
    <van-cell class="item" title="标签">
      <template #right-icon>
        <span class="tip">去修改</span>
        <van-icon name="arrow" class="cell-icon"/>
      </template>
    </van-cell>
    <van-cell class="item" title="密码" @click="updateInfo('password')">
      <template #right-icon>
        <span class="tip">去修改</span>
        <van-icon name="arrow" class="cell-icon"/>
      </template>
    </van-cell>
  </van-cell-group>
  <!-- 抽屉-->
  <a-drawer
      v-model:open="open"
      class="custom-class"
      root-class-name="root-class-name"
      :root-style="{ color: 'blue' }"
      height="320"
      title="修改用户信息"
      placement="top"
  >
    <a-form>
      <a-form-item :label="tipLabel" v-if="updateFile!=='password'">
        <a-input v-model:value="newData" placeholder="输入要修改的值"/>
      </a-form-item>
      <div class="password" v-else>
        <a-form-item :label="tipLabel"   :rules="[{ required: true, message: 'Please input your password!' }]">
          <a-input-password v-model:value="oldPassword" placeholder="输入旧密码"/>
        </a-form-item>
        <a-form-item :label="tipLabel"   :rules="[{ required: true, message: 'Please input your password!' }]">
          <a-input-password  v-model:value="newPassword" placeholder="输入新密码"/>
        </a-form-item>
      </div>

      <a-form-item>
        <a-button @click="updateSub" type="primary">修改</a-button>
      </a-form-item>
    </a-form>
  </a-drawer>
</template>

<style scoped>
.item {
  padding: 20px;
  display: flex;
  align-items: center;
}

:deep(.van-uploader) {
  width: 100%;
}

:deep(.van-uploader__wrapper) {
  display: block !important;
}

:deep(.van-cell__value), .tip {
  font-size: 16px;
  vertical-align: top;
  margin-right: 5px;
  color: #5E6278;
}

:deep(.cell-icon) {
  color: #888;
//margin-top: 3px; height: 22px; vertical-align: top;
  text-align: center;
  line-height: 22px;
}
</style>
