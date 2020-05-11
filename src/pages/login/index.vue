<template>
  <div class="register">
    <div class="logo">
      <img src="@img/logo.png" alt="首页" />
      <div>小森阅读</div>
    </div>
    <div class="home">
      <div id="change-login" class="change-login">
        <div>
          <a href="javascript:void(0);" :class="flag+' '+'passport-account'" @click="handleSwitch2">
            <span>账号登录</span>
          </a>
          <a id="choose-uc-login" href="javascript:void(0);" @click="handleSwitch" :class="sign">
            <span>账号注册</span>
          </a>
        </div>
      </div>
      <el-form
        :label-position="labelPosition"
        class="login"
        label-width="80px"
        :model="formData"
        :rules="rules"
        ref="form"
      >
        <el-form-item label="账号:" prop="name">
          <el-input v-model="formData.name"></el-input>
        </el-form-item>
        <el-form-item label="密码:" prop="region">
          <el-input type="password" v-model="formData.region" show-password>></el-input>
        </el-form-item>
        <el-button type="primary" class="btn" @click="handleLogin" v-if="box==true" round>登录</el-button>
        <el-button type="primary" class="btn" @click="handleRegister" v-if="box==false" round>注册</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
import { loginApi, userApi } from "@api/user";
export default {
  name: "login",
  data() {
    var validatePass = (rule, value, callback) => {
      var str = value;
      var reg = new RegExp(/^(?![^a-zA-Z]+$)(?!\D+$)/);
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (value.length < 6) {
        callback(new Error("密码不得少于6位"));
      } else {
        if (reg.test(str)) {
          callback();
        } else {
          callback(new Error("密码必须包含数字和字母"));
        }
      }
    };
    return {
      labelPosition: "rigth",
      formData: {
        name: "",
        region: "",
        type: "",
        identity: 1
      },
      rules: {
        name: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { min: 6, max: 16, message: "账号长度在 6 到 16 个字符", trigger: "blur" }
        ],
        // region: [{ required: true, message: "请输入密码", trigger: "change" }]
        region: [{ validator: validatePass, trigger: "blur" }]
      },
      box: true,
      flag: "select",
      sign: ""
    };
  },
  methods: {
    handleSwitch() {
      this.box = false;
      this.sign = "select";
      this.flag = "";
    },
    handleSwitch2() {
      this.box = true;
      this.sign = "";
      this.flag = "select";
    },
    async handleLogin() {
      let data = await loginApi(this.formData.name, this.formData.region);
      if (data.data.code == 1) {
        if (this.$cookies.get("token")) {
          sessionStorage.setItem("id", data.data.data._id);
          sessionStorage.setItem("name", data.data.data.name);
          sessionStorage.setItem("urlPic", data.data.data.urlPic);
          sessionStorage.setItem("sign",true)
          this.$message({
            message: data.data.info,
            type: "success"
          });
          this.$router.push("/home");
        }
      } else {
        this.$message.error(data.data.info);
      }
    },
    async handleRegister() {
      let data = await userApi(
        this.formData.name,
        this.formData.region,
        this.formData.identity
      );
      if (data.data.status == 1) {
        this.$message({
          message: data.data.info,
          type: "success"
        });
        this.box = true;
        this.sign = "";
        this.flag = "select";
      } else {
        this.$message.error(data.data.info);
      }
    }
  }
};
</script>
<style scoped>
.register {
  height: 100%;
  background: url("../../../public/img/loginbg.png");
}
.logo {
  width: 400px;
  display: flex;
  align-items: center;
  position: absolute;
  top: 35px;
  left: 140px;
}
.logo > img {
  width: 60px;
  height: 60px;
}
.logo > div {
  font-size: 60px;
  color: #727171;
  font-family: "LiSu";
  letter-spacing: 1px;
}
.home {
  width: 300px;
  height: 320px;
  position: absolute;
  left: 62%;
  top: 150px;
  background: #fff;
  border-radius: 4px;
  padding: 20px;
  -webkit-box-shadow: 0 10px 20px 0px rgba(0, 0, 0, 0.05);
  -moz-box-shadow: 0 10px 20px 0px rgba(0, 0, 0, 0.05);
  box-shadow: 0 10px 20px 0px rgba(0, 0, 0, 0.05);
}
#change-login {
  height: 74px;
  font-size: 20px;
  text-align: center;
  border-bottom: 1px solid #ececec;
  border-top-right-radius: 3px;
  border-top-left-radius: 3px;
}
#change-login > div {
  position: static;
  padding: 25px 0 12px;
}
.change-login div {
  position: relative;
  top: 10px;
  z-index: 10;
  left: 20px;
  display: inline-block;
  *display: inline;

  *zoom: 1;
}
#change-login a.select {
  color: #2468f2;
  text-decoration: none;
}

#change-login a {
  display: inline-block;
  width: 120px;
  height: 36px;
  border-right: none;
  position: relative;
  font-family: PingFangSC-Medium;
  font-size: 18px;
  color: #191c3d;
  line-height: 36px;
  text-decoration: none;
}
.change-login .passport-account {
  margin-right: 10px;
  padding-right: 10px;
  border-right: 1px solid #a1a6b7;
}
#change-login a.select::after {
  content: " ";
  display: block;
  width: 100%;
  height: 2px;
  background: #2468f2;
  margin-top: 12px;
}
.login {
  margin-top: 40px;
}
.login .btn {
  width: 200px;
  margin-left: 70px;
}
</style>
<style>
 .el-form-item.is-required:not(.is-no-asterisk)>.el-form-item__label:before {
    content: '' !important;
}
</style>
