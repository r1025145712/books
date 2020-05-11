<template>
  <div class="home">
    <div class="module">
      <div class="module-header">
        <svg @click="handleback" class="icon" aria-hidden="true">
          <use xlink:href="#iconfanhui" />
        </svg>
        <van-search v-model="value" shape="round" show-action placeholder="请输入搜索关键词" @search="onSearch">
          <div slot="action" @click="onSearch">搜索</div>
        </van-search>
      </div>
      <div class="jieguo" v-if="bj1">╮(╯_╰)╭ ~暂无搜索结果</div>
      <div class="module2" v-if="bj2">
        <div class="module2-slide" v-for="item in booksdata" :key="item.id">
          <router-link class="module2-slide-a" tag="a" :to="{name:'details',query:{id:item._id}}">
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
  </div>
</template>
<script>
import {} from "@components/function/index.js";
import { mapState, mapMutations } from "vuex";
import {booksSearchlApi2} from "@api/books"
import Vue from 'vue'
import { Toast } from 'vant';
Vue.use(Toast);
export default {
  name: "collect",
  data() {
    return {
        value:"",
        booksdata:[],
        bj2:false,
        bj1:false
    };
  },
  created() {
    document.title = this.$route.meta.title;
    this.handleList();
  },
  computed: {
    ...mapState({
      collect: state => state.books.collect
    })
  },
  methods: {
    async handleList() {},
    handleback() {
      this.$router.back();
    },
    async onSearch(){
        if(this.value==""){
            Toast('请输入内容');
        }else{
             let data = await booksSearchlApi2(this.value)
        if(data.data.status==1){
            this.bj2=true;
             this.bj1=false;
            this.booksdata=data.data.list
        }else{
             this.bj1=true;
             this.bj2=false
            this.booksdata=[]
        }
        }
       
    }
  }
};
</script>
<style scoped>
.van-search {
    padding: 0 .1rem;
    width: 3.2rem;
}
.van-search .van-cell{
        padding:.05rem .08rem .05rem 0;
        font-size: .14rem;
        line-height: .24rem;
}
.jieguo{
    height:2rem;
    line-height:2rem;
    text-align:center;
    margin-top: .2rem;
     background: #fff;
}
.module-header {
    background: #fff;
  height: 0.45rem;
  display: flex;
  justify-content: left;
     position: fixed;
    width: 100%;
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
.module2 {
   padding-top:.55rem ;
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
