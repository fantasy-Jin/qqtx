<script setup>
import {ref} from "vue";
import {login} from "../service/userapi";
import useUserStore from "../pinia/userStore.js";
import {storeToRefs} from "pinia";
import {useRouter} from "vue-router";
import {showFailToast, showToast} from 'vant';
const router = useRouter()
const onSubmit = async (value) => {
  const res = await login(value);
  if(res===null){
    return;
  }
  const userStore = useUserStore()
  const {userInfo,isLogin} = storeToRefs(userStore)
  userInfo.value = res
  isLogin.value =true
  await router.replace({path: '/'})
};
// 失败的表单提交
const onFailed = (val) =>{
  showFailToast('检查是否输入正确！！');
}
const userAccount = ref("");
const userPassword = ref("");

// 校验函数可以返回 Promise，实现异步校验
// 校验账户
// https://c.runoob.com/front-end/854/
// 帐号是否合法(字母开头，允许5-16字节，允许字母数字下划线)：
//  ^[a-zA-Z][a-zA-Z0-9_]{4,15}$
const asyncValidatorAcc = (val) =>
    new Promise((resolve) => {
      const pattern = /^[a-zA-Z][a-zA-Z0-9_]{4,15}$/
      if(!pattern.test(val)){
        showToast({
          message: '账号字母开头,长度为5-16！！',
          position: 'top',
        })
      }else{
        resolve(true)
      }
    });
// 密码
// 允许字母、数字和特殊字符，长度为8到18位的字符串
// ^[A-Za-z0-9!@#$%^&*()-_=+\\[\\]{}|;:'",.<>/?]{8,18}$
const asyncValidatorPsw = (val) =>
    new Promise((resolve) => {
      const pattern = /^[A-Za-z0-9!@#$%^&*()\-_=+\[\]{}|;:'",.<>/?]{8,18}$/;
      if(!pattern.test(val)){
        showToast({
          message: '密码长度8~18！！',
          position: 'top',
        })
      }else{
        resolve(true)
      }
    });
</script>

<template>
  <div class="box">
  <div class="login">
    <div>
      <h2 class="title">莫愁前路无知己</h2>
      <span>没有账户?</span><router-link class="a_router" to="/register">去注册</router-link>
    </div>
    <div class="login-box">
      <van-form @submit="onSubmit"  @failed="onFailed">
        <van-cell-group size="large" inset class="login-title">
          <p class="tip">账户</p>
          <van-field
              class="input_box"
              size="large"
              v-model="userAccount"
              name="userAccount"
              placeholder="请输入用户名"
              :rules="[{ validator:asyncValidatorAcc,required:true}]"
          />
          <p class="tip">密码</p>
          <van-field
              class="input_box"
              v-model="userPassword"
              type="password"
              name="userPassword"
              placeholder="请输入密码"
              :rules="[{ validator:asyncValidatorPsw,required:true}]"
          />
        </van-cell-group>
        <van-button class="btn_sub" block native-type="submit"> 登陆</van-button>
        <div class="layout">
          <p class="tip" >忘记密码</p>
        </div>
      </van-form>
    </div>
    <footer class="footer">©2020 - 2023 By 青春同行</footer>
  </div>
  </div>
</template>

<style scoped>

.login{
  display: flex;
  margin: 0 auto;
  width: 100%;
  height: 100%;
  padding: 40px 10px;
  flex-direction: column;
  align-items: center;
  flex: .3;
  box-sizing: border-box;
  background: url("../assets/image/1.jpg");
  background-size: auto auto;
}
.login-box{
  padding: 8px;
  width: 90%;
  margin-top: 60px;
}
.title{
  color: #70b5ff;
  font-size: calc(1.3rem + 0.6vw);
}
.tip{
  color: #70b5ff;
  font-weight: 600;
  font-size: 1.075rem;
  margin-top: 1rem;
}
.title~span{
  font-size: 1.15rem;
  color: #B5B5C3;
}
.a_router{
  font-weight: 600;
  color: #009EF7;
  font-size: 1.15rem;

}
/* 修改 vant 里的输入框 */
.input_box{
  width: 100%;
  background-color: #F5F8FA;
  border-color: #F5F8FA;
  color: #5E6278;
  transition: color 0.2s ease, background-color 0.2s ease;
  margin-top: 20px;
  border-radius: 0.475rem;
}
:deep(.van-field__control){
  color: #5E6278;
  font-size: 1.15rem;
}
.input_box:active,.input_box:focus{
  background-color: #eef3f7;
  border-color: #eef3f7;
  color: #5E6278;
  transition: color 0.2s ease, background-color 0.2s ease;

}
/* 修改 vant 里的placeholder */
:deep(.van-field__control::-webkit-input-placeholder){
  font-weight: 600;
}
/* 按钮 */
.btn_sub{
  width: 90%;
  margin: 30px auto 0;
  padding: calc(0.825rem + 1px) calc(1.75rem + 1px);
  color: #009EF7;
  border-color: #F1FAFF;
  background-color: #F1FAFF;
  font-size: 1.15rem;
  border-radius: 0.475rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
.btn_sub:hover{
  color: #FFFFFF;
  border-color: #009EF7;
  background-color: #009EF7 !important;
}
.layout{
  margin-top: 10px;
  padding: 8px;
  text-align: right;
}
.footer{
  position: absolute;
  bottom: 2rem;
  color: pink;
}
</style>
