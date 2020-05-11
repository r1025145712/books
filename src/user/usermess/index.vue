<template>
  <div class="mine">
    <div class="details-header">
      <div class="module-header">
        <svg @click="handleback" class="icon" aria-hidden="true">
          <use xlink:href="#iconfanhui" />
        </svg>
        <h1>修改信息</h1>
      </div>
    </div>
    <div class="message-con">
      <el-form
          :model="ruleForm"
          :inline="true"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="头像：" prop="name">
            <el-avatar :src="ruleForm.urlPic"></el-avatar>
            <div tabindex="0" class="el-upload el-upload--text">
              <span class="button-upload">修改头像</span>
              <input
                type="file"
                @change="hanldadd"
                ref="upload"
                name="file"
                class="el-upload__input"
              />
            </div>
          </el-form-item>
          <el-form-item label="用户名：" prop="name" class="item-top">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item class="btmxiu">
            <el-button type="primary" size="small" @click="submitForm('ruleForm')">保存修改</el-button>
          </el-form-item>
        </el-form>
    </div>
  </div>
</template>
<script>
import Vue from 'vue';
import { Toast } from 'vant';

Vue.use(Toast);
import { useridApi,userDataApi } from "@api/user";
import { uploadApi,booksAuthApi } from "@api/books";
export default {
  name: "usermess",
 data() {
    return {
      ruleForm: {}
    };
  },
   inject:['reload'],
  created() {
    this.handleList();
  },
  methods: {
     handleback() {
      this.$router.back();
    },
    async handleList() {
      let id = sessionStorage.getItem("userid");
      let data = await useridApi(id);
      this.ruleForm = data.data.list[0];
    },
    async hanldadd() {
      let fd = new FormData();
      fd.append("booksLogo", this.$refs.upload.files[0]); //传文件
      let data = await uploadApi(fd);
      this.ruleForm.urlPic = data.data.urlImage;
    },
    async submitForm() {
      let data = await userDataApi(this.ruleForm);
      if (data.data.status == 1) {
       Toast(data.data.info);
         this.gian();
          sessionStorage.setItem("name",this.ruleForm.name);
           sessionStorage.setItem("urlPic",this.ruleForm.urlPic);
        this.$router.push("/user/mine")
      } else {
         Toast(data.data.info);
      }
    },
    async gian(){
      let data = await booksAuthApi(this.ruleForm);
       sessionStorage.setItem("name", this.ruleForm.name);
    }
  }
};
</script>
<style scoped>
.mine {
  height: 100%;
}
.details-header {
  display: flex;
  justify-content: space-between;
  z-index: 10;
  background: #fff;
  border-bottom: 1px solid #ebedf0;
}
.module-header {
  height: 0.45rem;
  display: flex;
  justify-content: left;
  align-items: center;
}
.module-header .icon {
  margin: 0.1rem 0.18rem;
  color: #33373d;
}
.module-header h1 {
  font-size: 0.16rem;
  color: #33373d;
}
.el-upload {
  display: inline-block;
  text-align: center;
  cursor: pointer;
  outline: none;
  position: relative;
  left: .1rem;
  width: 1.4rem;
  height:.4rem;
}
.button-upload {
  position: absolute;
  left:.1rem;
  color: #4dbdea;
  font-size: .14rem;
  text-align: center;
  cursor: pointer;
}
.el-upload__input {
  display: block;
  opacity: 0;
  width: 1.2rem;
  height: .32rem;
  position: absolute;
  left: .1rem;
}
.btmxiu {
  margin-left: 1rem;
}
.el-form-item {
    margin-bottom: 0;
   padding-top: .1rem;
     width: 100%;
}
</style>

