<template>
  <div class="home">
    <div class="module1">
      <div class="module-header">
        <svg @click="handleback" class="icon" aria-hidden="true">
          <use xlink:href="#iconfanhui" />
        </svg>
        <h1>完本</h1>
      </div>
      <div class="module">
        <div class="module-header2">
          <h3 class="module-title">最新完本</h3>
        </div>
        <div class="module-slide">
          <router-link
            v-for="item in newda"
            :key="item._id"
            class="module-slide-a"
            tag="a"
            :to="{name:'details',query:{id:item._id}}"
          >
            <img :src="item.booksImg" alt="图片" />
            <p>{{item.booksName}}</p>
          </router-link>
          <div class="wanben" v-if="bj">暂无完本</div>
        </div>
      </div>
      <div class="module2">
        <div class="module-header2">
          <h3 class="module-title">热门完本</h3>
          <a href="#/user/collect">
            更多
            <i class="el-icon-arrow-right" />
          </a>
        </div>
         <div class="wanben2" v-if="bj2">暂无完本</div>
        <div class="module2-slide" v-for="item in remen" :key="item.id">
              
          <router-link class="module2-slide-a" tag="a"  :to="{name:'details',query:{id:item._id}}">
            <img :src="item.booksImg" alt />
            <div class="books-jianjie">
              <h4 class="book-title">{{item.booksName}}</h4>
              <p class="book-desc">{{item.booksdesc}}</p>
              <div class="book-meta">
                <div class="auth">
                  <i class="el-icon-user"></i>
                  <span>{{item.booksAuth}}</span>
                </div>
                <div class="tag">
                  <el-tag size="mini" type="success">{{item.booksclassify}}</el-tag>
                  <el-tag size="mini" type="danger">{{item.booksStatus}}</el-tag>
                  <el-tag size="mini">{{item.booksTotal|many}}</el-tag>
                </div>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
    <Btm/>
  </div>
</template>
<script>
import {} from "@components/function/index.js";
import { booksLZ } from "@api/books";
import { mapState, mapMutations } from "vuex";
import Btm from "@common/btm"
export default {
  name: "oldbooks",
   components:{
        Btm,
    },
  data() {
    return {
        bj:false,
        bj2:false,
      remen: [],
      newda: []
    };
  },
  created() {
    document.title = this.$route.meta.title;
    this.handleList();
  },
  computed: {
    ...mapState({
     status: state => state.books.sort
    })
  },
  methods: {
    async handleList() {
      let page = 1;
      let limit = 10;
      let sort = "已完结";
      let remenlz = "热门";
      let data = await booksLZ(page, limit, sort, remenlz,this.status);
      if (data.data.status == 1) {
           this.bj2=false;
        this.remen = data.data.list.slice(0, 4);
      }else{
           this.bj2=true;
      }
      let newlz = "最新";
      let newdata = await booksLZ(page, limit, sort, newlz,this.status);
      if (newdata.data.status == 1) {
        this.newda = newdata.data.list;
        this.newda = this.newda.slice(0, 6);
         this.bj=false;
      }else{
          this.bj=true;
      }
    },
    handleback(){
      this.$router.push("/user")
    }
  }
};
</script>
<style scoped>
.home{
    background: #F6F7F9;
}
.wanben{
    width: 100%;
    text-align: center;
    line-height: 1.3rem;
}
.wanben2{
     height: 1.2rem;
       text-align: center;
    line-height: 1.2rem;
}
.module-header {
  height: 0.45rem;
  display: flex;
    position: fixed;
    width: 100%;
    background:#fff; 
  justify-content: left;
  align-items: center;
  border-bottom: 1px solid #f0f1f2;
}
.module-header .icon {
  margin: 0.1rem 0.18rem;
  color: #33373d;
}
.module-header h1 {
  font-size: 0.16rem;
  color: #33373d;
}
.module-title {
  padding-left: 0.2rem;
}
.module-header2 {
  display: flex;
  justify-content: space-between;
  height: 0.4rem;
  align-items: center;
}
.module-header2 a {
  margin-right: 0.1rem;
  width: 0.5rem;
  font-size: 0.14rem;
  color: #969ba3;
}
.module-title::before {
  display: inline-block;
  box-sizing: border-box;
  width: 0.1rem;
  height: 1em;
  content: "";
  vertical-align: -0.22ex;
  color: transparent;
  border-left: 2px solid #ed424b;
}
.module {
  background: #fff;
  min-height: 1.7rem;
    padding-top:.45rem ;
  overflow: hidden;
}
.module-slide {
  height: 1.3rem;
  display: flex;
  justify-content: space-between;
  overflow-x: auto;
  margin: 0 0.1rem;
}
.module-slide-a {
  width: 0.8rem;
  height: 1.3rem;
  padding: 0.06rem;
  flex-shrink: 0;
  display: flex;
  margin-left: 0.1rem;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.module-slide img {
  display: block;
  width: 0.66rem;
  height: 0.88rem;
  margin-bottom: 0.1rem;
}
.module-slide-a p {
  font-size: 0.12rem;
  color: #33373d;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.module2 {
  margin-top: 0.1rem;
  min-height: 3rem;
  background: #fff;
}
.module2-slide {
  padding: 0.1rem 0 0.1rem 0.2rem;
  height: 1.2rem;
}
.module2-slide-a {
  display: block;
  height: 1rem;
  border-bottom: 1px solid #ddd;
}
.module2-slide img {
  display: block;
  width: 0.66rem;
  height: 0.88rem;
  margin-right: 0.06rem;
  background: #ccc;
  float: left;
}
.module2-slide .books-jianjie {
  width: 2.6rem;
  height: 0.88rem;
  float: left;
}
.book-title {
  font-size: 0.16rem;
  height: 0.2rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.book-desc {
  margin: 0.06rem 0;
   min-height: 0.3rem;
  color: #969ba3;
  font-size: 0.14rem;
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}
.book-meta .el-icon-user {
  width: 0.18rem;
  height: 0.18rem;
  line-height: 0.18rem;
}
.book-meta {
  height: 0.2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.1rem;
}
.book-meta .auth {
  display: flex;
  align-items: center;
}
.book-meta .auth span {
  font-size: 0.14rem;
  color: #969ba3;
  margin-left: 0.04rem;
}
.el-tag {
  margin-right: 0.06rem;
  height: 0.2rem;
}
</style>
