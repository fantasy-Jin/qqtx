<script setup>
import { message } from "ant-design-vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { tocreateTeam } from "../service/teamsApi.js";
// for表单
const username = ref("");
const password = ref("");

// 定义时间数据
const minDate = new Date()
//onSubmit 点击之后发起请求获取数据
const router = useRouter();
const onSubmit = async (values) => {
  console.log("submit", values);
  values["status"] = parseInt(status.value);
  values.expireTime =  new Date(values.expireTime)
  console.log(values.expireTime);
  // console.log(password.value);
  if(status.value == 2) {
    console.log(status.value);
    if(password.value.length < 4) {
      // console.log(toString(password.value));
      password.value = "";
      return message.error("请输入密码");
    }
  }
  values["password"] = password.value;
  // console.log(date.value);
  const onTeam = await tocreateTeam(values);
  console.log(onTeam);
  if (onTeam.code === 200) {
    message.success("创建成功");
    router.back();
  } else {
    message.error("创建失败");
  }
};

// 时间选择器
const result = ref("");
const showPicker = ref(false);
const onConfirm = ({ selectedValues }) => {
  result.value = selectedValues.join("/");
  showPicker.value = false;
};

// 获取数据
const status = ref(0);
const Teamdescription = ref("");
const maxNum = ref(3);
const Team = {
  description: "",
  expireTime: "",
  maxNum: 0,
  name: "",
  password: "",
  status: 0,
  userId: 0,
};


</script>

<template>
  <div class="userTeam">
    <van-form @submit="onSubmit" class="tofrom">
      <van-cell-group inset>
        <van-field
          v-model="username"
          name="name"
          label="队伍名"
          placeholder="队伍名"
          :rules="[{ required: true, message: '请填写队伍名' }]"
        />

        <!-- 时间选择器 -->
        <van-field
          v-model="result"
          is-link
          readonly
          name="expireTime"
          label="过期时间"
          placeholder="点击选择时间"
          @click="showPicker = true"
        />
        <van-popup v-model:show="showPicker" position="bottom">
          <van-date-picker @confirm="onConfirm" @cancel="showPicker = false" :min-date="minDate"/>
        </van-popup>
      </van-cell-group>
      <!-- 最大人数-->
      <van-cell-group inset>
        <div class="tostepper">
          <van-field name="maxNum" label="最大人数" class="onstepper">
            <template #input>
              <van-stepper v-model="maxNum" min="3" max="10" />
            </template>
          </van-field>
        </div>
      </van-cell-group>
      <!-- 队伍状态 -->
      <van-cell-group inset>
        <div class="tochecked">
          <van-radio-group
            v-model="status"
            direction="horizontal"
            name="status"
          >
            <span>队伍状态: &nbsp;&nbsp;</span>
            <van-radio name="0">公开</van-radio>
            <van-radio name="1">私密</van-radio>
            <van-radio name="2">加密</van-radio>
          </van-radio-group>
        </div>
        <van-field
          v-model="password"
          type="digit"
          label="设置密码"
          v-if="status == 2"
        />
      </van-cell-group>

      <!-- 队伍描述 -->
      <van-cell-group inset>
        <van-field
          v-model="Teamdescription"
          name="description"
          rows="1"
          autosize
          label="队伍描述"
          type="textarea"
          placeholder="请输入描述"
        />
      </van-cell-group>
      <div class="primary">
        <van-button round type="primary" style="width: 90%" native-type="submit"
          >创建队伍</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<style scoped>
.tofrom {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.tostepper {
  margin: 0 auto;
}

.tochecked {
  display: flex;
  margin: 1px 0 1px 16px;
  font-size: 13px;
}

.primary {
  margin-top: 10px;
  text-align: center;
}
</style>
