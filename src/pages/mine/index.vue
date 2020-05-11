<template>
  <div>
    <div class="el-top">
      <span class="title">基本信息</span>
    </div>
    <div class="el-main">
      <div class="el-main">
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
          <el-form-item label="创建时间：" prop="name">
            <div class="el-input">{{ruleForm.registerTime|date}}</div>
          </el-form-item>
          <el-form-item label="笔名：" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item class="btmxiu">
            <el-button type="primary" size="small" @click="submitForm('ruleForm')">保存修改</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import { useridApi,userDataApi } from "@api/user";
import { uploadApi,booksAuthApi } from "@api/books";
import { date } from "@components/function/index.js";
export default {
  name: "news",
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
    async handleList() {
      let id = sessionStorage.getItem("id");
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
        this.$message({
          message: data.data.info,
          type: "success"
        });
         this.gian();
        this.reload();
      } else {
        this.$message.error(data.data.info);
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
.el-top {
  background: #fff;
  font-size: 16px;
  line-height: 50px;
  padding-left: 30px;
  position: relative;
  margin-bottom: 5px;
  color: #333;
}
.title {
  font-size: 16px;
  color: #333;
}
.el-main {
  background-color: #fff;
  padding-bottom: 5px;
  padding: 20px 30px 0;
}
.demo-ruleForm {
  display: flex;
  justify-content: space-around;
  flex-direction: column;
}
.el-main img {
  margin: 0;
}
.el-input {
  width: 200px;
}
.el-upload {
  display: inline-block;
  text-align: center;
  cursor: pointer;
  outline: none;
  position: relative;
  left: 10px;
  width: 140px;
  height: 40px;
}
.button-upload {
  position: absolute;
  left: 10px;
  color: #4dbdea;
  font-size: 14px;
  text-align: center;
  cursor: pointer;
}
.el-upload__input {
  display: block;
  opacity: 0;
  width: 120px;
  height: 32px;
  position: absolute;
  left: 10px;
}
.btmxiu {
  margin-left: 100px;
}
</style>

