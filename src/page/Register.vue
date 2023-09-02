<script setup>
import { ref } from "vue";
import { register, login } from "../service/userapi";
import { storeToRefs } from "pinia";
import useUserStore from "../pinia/userStore.js";
import { useRouter } from "vue-router";
const router = useRouter();
const onSubmit = async (value) => {
  const res = await register(value);
  const reslogin = await login({
    userAccount: userAccount.value,
    userPassword: userPassword.value,
  });
  console.log(res);

  if (res === null) {
    return;
  }
  const userStore = useUserStore();
  const { userInfo, isLogin } = storeToRefs(userStore);
  userInfo.value = res;
  isLogin.value = true;
  await router.replace({ path: "/" });
};

const userAccount = ref("");
const userPassword = ref("");
const checkPassword = ref("");
</script>

<template>
  <div class="register">
    <div class="title">
      <h1 class="title">莫愁前路无知己</h1>
    </div>
    <van-form @submit="onSubmit" class="login-box">
      <van-cell-group inset class="login-title">
        <p class="tip">账户</p>
        <van-field
          class="input_box"
          size="large"
          v-model="userAccount"
          name="userAccount"
          placeholder="请填写用户名"
          :rules="[{ validator: asyncValidatorAcc, required: true }]"
        />
        <p class="tip">密码</p>
        <van-field
          class="input_box"
          v-model="userPassword"
          type="password"
          name="userPassword"
          placeholder="请填写密码"
          :rules="[{ validator: asyncValidatorAcc, required: true }]"
        />
        <p class="tip">重新输入密码</p>
        <van-field
          class="input_box"
          v-model="checkPassword"
          type="password"
          name="checkPassword"
          placeholder="请重新填写密码"
          :rules="[{ validator: asyncValidatorAcc, required: true }]"
        />
      </van-cell-group>
      <!-- flex布局 -->
      <van-button class="btn_sub" block native-type="submit">
        <router-link to="/login">注册</router-link></van-button
      >
      <span class="a_router">已有账户</span><router-link class="a_router" to="/login">去登录</router-link>
    </van-form>
    
  </div>
</template>

<style scoped>
/* css样式初始化 */
html {
  height: 100%;
}

/*重置body属性*/
body {
  padding: 0;
  margin: 0;
  height: 100%;
}

#appLogin {
  height: 100%;
}

a {
  text-decoration: none;
}

/* css样式 */

.register {
  display: flex;
  width: 100%;
  height: 100%;
  padding: 10px;
  flex-direction: column;
  align-items: center;
  flex: 0.3;
  box-sizing: border-box;
  background: url("../assets/image/1.jpg");
  background-size: auto auto;
}
.login-box {
  padding: 4px;
  width: 90%;
}

.title {
  color: #70b5ff;
  font-size: calc(1.3rem + 0.6vw);
}

.a_router {
  font-weight: 600;
  color: #009ef7;
  font-size: 1.15rem;
}

.tip {
  color: #70b5ff;
  font-weight: 600;
  font-size: 1.075rem;
}
.layout {
  width: 100%;
  display: flex;
  justify-content: space-around;
}

/* 修改 vant 里的输入框 */
.input_box {
  width: 100%;
  background-color: #f5f8fa;
  border-color: #f5f8fa;
  color: #5e6278;
  transition: color 0.2s ease, background-color 0.2s ease;
  margin-top: 20px;
  border-radius: 0.475rem;
}
:deep(.van-field__control) {
  color: #5e6278;
  font-size: 1.15rem;
}
.input_box:active,
.input_box:focus {
  background-color: #eef3f7;
  border-color: #eef3f7;
  color: #5e6278;
  transition: color 0.2s ease, background-color 0.2s ease;
}

/* 修改 vant 里的placeholder */
:deep(.van-field__control::-webkit-input-placeholder) {
  font-weight: 600;
}

/* 按钮 */
.btn_sub {
  width: 90%;
  margin: 30px auto 0;
  padding: calc(0.825rem + 1px) calc(1.75rem + 1px);
  color: #009ef7;
  border-color: #f1faff;
  background-color: #f1faff;
  font-size: 1.15rem;
  border-radius: 0.475rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
.btn_sub:hover {
  color: #ffffff;
  border-color: #009ef7;
  background-color: #009ef7 !important;
}
.layout {
  margin-top: 10px;
  padding: 8px;
  text-align: right;
}
.footer {
  position: absolute;
  bottom: 2rem;
  color: pink;
}
</style>
