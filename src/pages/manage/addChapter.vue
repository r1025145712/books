<template>
  <div>
    <div class="el-top">
        <span class="title" @click="manage">作品管理</span>
        <i class="el-breadcrumb__separator el-icon-arrow-right"></i>
        <span class="opus">{{booksdata.booksName}}</span>
      </div>
      <div class="el-main">
        <el-menu
          :default-active="$route.path"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
        >
          <el-menu-item index="/home/chapter/newChapter">新建章节</el-menu-item>
         <el-menu-item index="/home/chapter/oldtext" >已发布章节</el-menu-item>
          <el-menu-item index="/home/chapter/draft" >草稿箱</el-menu-item>
         <el-menu-item index="/home/chapter/bookmessage" >作品信息</el-menu-item>
        </el-menu>
        <router-view v-if="sign"> </router-view>
     </div>
  </div>
</template>
<script>
import {booksList2Api} from "@api/books"
import NewChapter from "./newChapter"
export default {

  name: "addChapter",
    components:{
        NewChapter
    },
    provide(){
      return {
        reload:this.reload
      }
    },
  data() {
      return {
        sign:true,
        activeIndex: '',
        booksdata:[],
      };
    },
     created() {
    this.handlebooks();
  },
    methods: {
      reload(){
        this.sign=false;
        this.$nextTick(function(){
          this.sign=true;
        })
      },
         manage(){
        this.$router.push("/home/manage")
      },
      handleSelect(key, keyPath) {
        let key1=key.split("/")
         this.$router.push({
            name:key1[3],
            query: {
            id: this.id
         }
         }
         );
      },
      async handlebooks(){
          this.id=this.$route.query.id||JSON.parse(sessionStorage.getItem('books'));
          let data = await booksList2Api(this.id)
          this.booksdata=data.data.list[0];
      },
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
.el-breadcrumb__separator{
  margin:0 6px;
  color:#aaa;
}
.title {
  font-size: 16px;
  color: #333;
}
.title:hover{
  cursor: pointer;
  color:#21ade5;
}
.opus{
  color:#aaa;
}
.el-main {
  background-color: #fff;
  padding-bottom: 5px;
  padding: 10px 20px 20px 20px;
}
</style>

