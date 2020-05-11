<template>
  <div>
    <div class="module-header">
      <svg @click="handleback" class="icon" aria-hidden="true">
        <use xlink:href="#iconfanhui" />
      </svg>
      <h1 v-if="bj2">账号密码注册</h1>
      <h1  v-if="bj1">账号密码登录</h1>
      <div class="icon"></div>
    </div>
    <div class="userhome">
      <van-cell-group>
        <van-field
          v-model="name"
          label="账号"
          placeholder="请输入账号"
        />
        <van-field v-model="password" type="password"  clearable label="密码"  placeholder="请输入密码" />
      </van-cell-group>
       <span class="login" @click="handlezhuce"  v-if="bj2">点击注册</span>
        <span class="login" @click="handleLogin"  v-if="bj1">点击登录</span>
        <span class="tishi" @click="handleqiehuan" v-if="bj1">账号密码注册</span>
         <span class="tishi" @click="handleqiehuan2" v-if="bj2">账号密码登录</span>
    </div>
  </div>
</template>
<script>
import { Toast } from 'vant';
import Vue from 'vue'
Vue.use(Toast);
import {userApi,loginApi} from "@api/user"
export default {
  name: "mine",
  data() {
    return {
      bj1:true,
      bj2:false,
      name: "",
      password: "",
      identity:0,
    };
  },
  components: {},
  created() {
    document.title = this.$route.meta.title;
  },
  methods: {
    handleqiehuan(){
      this.bj1=false;
      this.bj2=true;
    },
    handleqiehuan2(){
        this.bj2=false;
      this.bj1=true;
    },
    handleback() {
      this.$router.push("/user")
    },
     async handleLogin() {
      let data = await loginApi(this.name, this.password);
      if (data.data.code == 1) {
        if (this.$cookies.get("token")) {
          sessionStorage.setItem("userid", data.data.data._id);
          sessionStorage.setItem("name", data.data.data.name);
          sessionStorage.setItem("urlPic", data.data.data.urlPic);
          this.$router.push("/user/mine");
        }
      } else {
       Toast.fail(data.data.info);
      }
    },
    async handlezhuce(){
        let data =await userApi(this.name,this.password,this.identity)
         if (data.data.status == 1) {
        Toast( data.data.info);
      } else {
          Toast(data.data.info);
      }
    }
  }
};
</script>
<style scoped>
.module-header {
  height: 0.45rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #f0f1f2;
}
.module-header .icon {
  margin: 0.1rem 0.18rem;
  color: #33373d;
  width: 0.2rem;
  height: 0.2rem;
}
.module-header h1 {
  font-size: 0.16rem;
  color: #33373d;
}
.userhome{
  margin-top: .1rem;
}
.login{
  display: block;
  width: 3.4rem;
  height: .4rem;
  margin:  0 auto;
  background: #1989FA;
  border-radius: .2rem;
  color: #fff;
  text-align: center;
  line-height: .4rem;
  margin-top: .2rem;
}
.tishi{
    display: block;
    padding: .2rem;
    text-align: center;
    color: #c29b61;
}
</style>

