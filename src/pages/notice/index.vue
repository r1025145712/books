<template>
  <div>
    <div class="el-top">
      <span class="title">公告编写</span>
    </div>
    <div class="el-main">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="新闻标题：" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="新闻内容：" prop="desc" >
          <el-input type="textarea" :rows="14" v-model="ruleForm.desc" ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { addArticle } from "@api/news";
export default {
  name: "notice",
  data() {
    return {
      ruleForm: {
        userid:"",
        name: "",
        desc: "",
        day:"",
      },
      rules: {
        name: [
          { required: true, message: "请填写新闻标题", trigger: "blur" },
          { min: 2, max: 10, message: "长度在 2 到 10 个字符", trigger: "blur" }
        ],
        desc: [{ required: true, message: "请填写新闻内容", trigger: "blur" }],
      }
    };
  },
  created(){
    this.handleUser()
  },
  methods: {
    handleUser(){
        this.ruleForm.userid=sessionStorage.getItem('id');
        this.ruleForm.autu=sessionStorage.getItem('name');
    },
     submitForm(formName) {
       this.$refs[formName].validate(valid => {
        if (valid) {
          this.ruleForm.day= new Date().getTime();
          this.handleSumit(this.ruleForm);
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    async handleSumit(ruleForm){
       let data = await addArticle(ruleForm);
        if (data.data.status == 1) {
        this.$message({
          message: data.data.info,
          type: 'success'
        })
         this.$router.push("/home/noticelist");
        }
        else{
          this.$message.error(data.data.info);
        }
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
.el-form-item__label{
  padding: 0 ;
}
.el-input{
  width:300px;
}
.el-select {
    width: 162px;
    height: 32px;
    margin-right:20px; 
}
 .el-form-item.is-required:not(.is-no-asterisk)>.el-form-item__label:before {
    content: '' !important;
}
</style>

