<template>
    <div class="chapter">
         <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item class="chapter_name" label="章节名称：" prop="name">
          <el-input v-model="ruleForm.name" placeholder="示例，第一章 猛虎下山"  ></el-input>
        </el-form-item>
        <el-form-item label="正文：" prop="desc" >
          <el-input type="textarea" style="white-space:pre" maxlength="10000" show-word-limit :rows="9" v-model="ruleForm.desc" ></el-input>
        </el-form-item>
       <el-form-item label="作者的话："  prop="zuozhe">
          <el-input type="textarea" v-model="ruleForm.zuozhe" placeholder="这里输入你想对读者说的话吧！"></el-input>
        </el-form-item>  
        <el-form-item>
          <el-button type="primary" @click="submitdraft('ruleForm')">保存草稿</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')">立即发布</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>
<script>
import {addArticle,bookMergeApi,bookInsertApi,booksList2Api,bookDraftApi,booksTotal} from "@api/books"
export default {
  name: "newChapter",
  data() {
       return {
      ruleForm: {
        name: "",
        desc: "",
        zuozhe:"",
        day:"",
        sizelength:""
      },
      booksTotal:Number,
       booksdata:[],
       id:"",
      rules: {
        name: [
          { required: true, message: "请输入章节名称", trigger: "blur" },
          { min: 1, max: 20, message: "长度在 1 到 16 个字符", trigger: "blur" }
        ],
        desc: [{ required: true, message: "请填写正文", trigger: "blur" },
         { min: 1, max: 10000, message: "正文内容不得少于1000字", trigger: "blur" }],
      }
    };
    },
     created(){
    this.handlebooks()
  },
    methods: {
      async handlebooks(){
          this.id=this.$route.query.id;
          let data = await booksList2Api(this.id)
          this.booksdata=data.data.list[0] 
      },
      submitdraft(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.draft();
          } else {
           this.$message.error(this.rules.desc[1].message);
            return false;
          }
        });
      },
       submitForm(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.fubu();
          } else {
           this.$message.error(this.rules.desc[1].message);
            return false;
          }
        });
       
      },
       async fubu(){
          var now = new Date();
          var year = now.getFullYear();      　　 //年
          var month = now.getMonth() + 1;     //月
          var day = now.getDate();            //日
          var hh = now.getHours();            //时
          var mm = now.getMinutes();          //分
          var ss = now.getSeconds(); 
          this.ruleForm.day=year+"-"+month+"-"+day+" "+hh+":"+mm+":"+ss;
         var desc=this.ruleForm.desc.replace(/\s+/g,"");   
          this.ruleForm.sizelength = desc.length;
         let data = await bookInsertApi(this.ruleForm,this.booksdata._id,this.booksdata.booksName);
           if(data.data.status==1){
          this.$message({
          message: data.data.info,
          type: 'success'
          })
          this.booksTotal=Number(data.data.list[0].sizelength)
          this.gain();
        } else{
           this.$message.error(data.data.info);
        }
      },
        async draft(){
          var now = new Date();
          var year = now.getFullYear();      　　 //年
          var month = now.getMonth() + 1;     //月
          var day = now.getDate();            //日
          var hh = now.getHours();            //时
          var mm = now.getMinutes();          //分
          var ss = now.getSeconds(); 
          this.ruleForm.day=year+"-"+month+"-"+day+" "+hh+":"+mm+":"+ss;
          var desc=this.ruleForm.desc.replace(/\s+/g,"");   
          this.ruleForm.sizelength = desc.length;
         let data = await bookDraftApi(this.ruleForm,this.booksdata._id);
           if(data.data.status==1){
          this.$message({
          message: data.data.info,
          type: 'success'
          })
          this.gain2();
        } else{
           this.$message.error(data.data.info);
        }
      },
      async gain(){
        let data = await booksTotal(this.booksTotal,this.booksdata._id)
          this.$router.push({
            name:"oldtext",
            query: {
            id: this.id}});
      },
      async gain2(){
         this.$router.push({
            name:"draft",
            query: {
            id: this.id
         }
         }
         );
      }
    }
};
</script>
<style scoped>
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
.chapter{
  margin-top:30px;
}
</style>

