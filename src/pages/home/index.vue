<template>
  <div class="home">
    <el-container>
      <el-header>
        <div class="toubu">
          <div class="logo">
            <img src="@img/logo.png" alt="首页" />
            <div>小森阅读</div>
            <div class="yuan"></div>
            <span v-if="author">作家专区</span>
            <span v-if="admin">管理员专区</span>
          </div>
          <div class="mine">
            <el-avatar :src="img"></el-avatar>
            <div
              style="user-select:none;"
              slot="reference"
              v-click-outside="hanlemove"
              @click="hanleQuit"
            >{{name}}</div>
          </div>
        </div>
        <div v-if="message" class="text">
          <div @click="hanleclick" class="item">基本信息</div>
          <div @click="handlemdf" class="item">修改密码</div>
          <div @click="hanleout" class="item">退出</div>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <Nav v-if="author" />
          <Admin v-if="admin" />
        </el-aside>
        <el-main class="loading-area">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
    <el-dialog title="修改密码" :visible.sync="dialogVisible" width="30%">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="原密码：" prop="password">
          <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码：" prop="pass">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码：" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script >
const clickOutside = {
  // 初始化指令
  bind(el, binding, vnode) {
    function clickHandler(e) {
      // 这里判断点击的元素是否是本身，是本身，则返回
      if (el.contains(e.target)) {
        return false;
      }
      // 判断指令中是否绑定了函数
      if (binding.expression) {
        // 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
        binding.value(e);
      }
    }
    // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
    el.__vueClickOutside__ = clickHandler;
    document.addEventListener("click", clickHandler);
  },
  update() {},
  unbind(el, binding) {
    // 解除事件监听
    document.removeEventListener("click", el.__vueClickOutside__);
    delete el.__vueClickOutside__;
  }
};

import Nav from "./nav";
import Admin from "./admin";
import { useridApi, userpassword } from "@api/user";
export default {
  name: "shouye",

  created() {
    this.handleUser();
  },
  components: {
    Nav,
    Admin
  },
  directives: { clickOutside },
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
          if (this.ruleForm.checkPass !== "") {
            this.$refs.ruleForm.validateField("checkPass");
          }
          callback();
        } else {
          callback(new Error("密码必须包含数字和字母"));
        }
      }
    };
    var validatePass3 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入原密码"));
      } else {
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value == this.ruleForm.password) {
        callback(new Error("原密码不能与新密码相同!"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        pass: "",
        checkPass: "",
        password: ""
      },
      rules: {
        password: [{ validator: validatePass3, trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }]
      },
      dialogVisible: false,
      author: true,
      admin: false,
      message: false,
      name: "",
      img: "",
      id: "",
      username: ""
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.passwordmdf();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    async passwordmdf() {
      let data = await userpassword(
        this.ruleForm.password,
        this.ruleForm.pass,
        this.username
      );
      if (data.data.code == 1) {
        this.$message({
          message: data.data.info,
          type: "success"
        });
        sessionStorage.removeItem("id");
        sessionStorage.removeItem("name");
        sessionStorage.removeItem("urlPic");
        this.$cookies.remove("token");
        this.$router.push("/login");
      }
    },
    handlemdf() {
      this.dialogVisible = true;
    },
    hanleclick() {
      this.$router.push({
        //编程时导航
        name: "mine",
        query: {
          id: this.id
        }
      });
    },
    hanleout() {
      sessionStorage.removeItem("id");
      sessionStorage.removeItem("name");
      sessionStorage.removeItem("urlPic");
       sessionStorage.removeItem("sign");
      this.$cookies.remove("token");
      this.$router.push("/login");
    },
    async handleUser() {
      this.id = sessionStorage.getItem("id");
      let data = await useridApi(this.id);
      this.name = data.data.list[0].name;
      this.img = data.data.list[0].urlPic;
      this.username = data.data.list[0].username;
      if (data.data.list[0].identity == 2) {
        if(sessionStorage.getItem("sign")=="true"){
            this.$router.push("/home/admin");
             sessionStorage.setItem("sign",false)
        }
        this.author = false;
        this.admin = true;  
      } else if (data.data.list[0].identity == 1) {
        this.author = true;
        this.admin = false;
      }
    },
    hanleQuit() {
      if (this.message === false) {
        this.message = true;
      } else {
        this.message = false;
      }
    },
    hanlemove() {
      this.message = false;
    }
  }
};
</script>

<style scoped>
.home {
  height: 100%;
}
/* 头部 */
.el-header {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  color: #333;
  text-align: center;
  line-height: 60px;
}
.toubu {
  margin: auto 168px;
}
.logo {
  float: left;
  width: 400px;
  display: flex;
  align-items: center;
}
.logo > img {
  width: 50px;
  height: 50px;
}
.yuan {
  margin-left: 15px;
  width: 5px;
  height: 5px;
  border-radius: 5px;
  background: #ddd;
}
.logo > div {
  font-size: 30px;
  color: #727171;
  font-family: "LiSu";
  letter-spacing: 1px;
}
.logo span {
  height: 60px;
  text-indent: 15px;
  color: #57c1eb;
  font-size: 20px;
  line-height: 64px;
  font-family: "SimHei";
}
.mine {
  width: 110px;
  height: 60px;
  float: right;
  display: flex;
  align-items: center;
}
.mine > div {
  width: 56px;
  height: 60px;
  font-size: 14px;
  color: #333;
  margin-left: 10px;
}
.el-container:nth-child(1) {
  height: 100%;
  background: #f0f3f5;
}
.el-container:nth-child(2) {
  margin: auto 168px;
  margin-top: 16px;
}

.el-aside {
  background-color: #fff;
  color: #333;
  text-align: center;
  height: 600px;
}
.el-main {
  background-color: #f0f3f5;
  color: #333;
  margin-left: 14px;
  height: 600px;
  padding: 0;
}
.text {
  font-size: 13px;
  width: 100px;
  height: 80px;
  position: absolute;
  top: 65px;
  right: 180px;
  background: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 100;
  padding: 10px 0;
}
.item {
  height: 30px;
  line-height: 30px;
  text-align: center;
  user-select: none;
  cursor: pointer;
}
.item:hover {
  background: #e9f7fc;
  color: #57c1eb;
}
</style>