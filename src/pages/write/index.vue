<template>
  <div>
    <div class="el-top">
      <span class="title">新建作品</span>
    </div>
    <div class="el-main">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="作品名称：" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="作品分类：" prop="region">
          <el-select v-model="ruleForm.region" placeholder="请选择">
            <el-option label="男频" value="男频"></el-option>
            <el-option label="女频" value="女频"></el-option>
          </el-select>
          <el-select v-model="ruleForm.classify" placeholder="请选择">
            <el-option label="都市" value="都市"></el-option>
            <el-option label="言情" value="言情"></el-option>
            <el-option label="玄幻" value="玄幻"></el-option>
            <el-option label="科幻" value="科幻"></el-option>
            <el-option label="历史" value="历史"></el-option>
            <el-option label="武侠" value="武侠"></el-option>
            <el-option label="游戏" value="游戏"></el-option>
            <el-option label="二次元" value="二次元"></el-option>
            <el-option label="竞技" value="竞技"></el-option>
            <el-option label="青春" value="青春"></el-option>
             <el-option label="悬疑" value="悬疑"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="作品简介：" prop="desc" >
          <el-input type="textarea" :rows="3" v-model="ruleForm.desc" placeholder="请填写对作品的大致介绍，字数300字以内"></el-input>
        </el-form-item>
         <el-form-item label="作者的话：" :rows="3" prop="zuozhe">
          <el-input type="textarea" v-model="ruleForm.zuozhe" placeholder="请输入内容"></el-input>
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
import img1 from "@img/logo.png"
import { submitApi } from "@api/books";
export default {
  name: "write",
  data() {
    return {
      ruleForm: {
        userid:"",
        name: "",
        region: "",
        desc: "",
        classify:[],
        zuozhe:"",
        status:"连载中",
        booksImg:img1,
        autu:"无尘",
        day:"",
        total:0,
        click:0,
        collect:0,
        upperShelf:false
      },
      rules: {
        name: [
          { required: true, message: "请输入作品名称", trigger: "blur" },
          { min: 2, max: 10, message: "长度在 2 到 10 个字符", trigger: "blur" }
        ],
        desc: [{ required: true, message: "请填写作品简介", trigger: "blur" }],
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
          var now = new Date();
          var year = now.getFullYear();      　　 //年
          var month = now.getMonth() + 1;     //月
          var day = now.getDate();
          this.ruleForm.day=year+"-"+month+"-"+day;  
          this.handleSumit(this.ruleForm);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    async handleSumit(ruleForm){
       let data = await submitApi(ruleForm);

        if (data.data.status == 1) {
        this.$message({
          message: data.data.info,
          type: 'success'
        })
         this.$router.push("/home/manage");
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

