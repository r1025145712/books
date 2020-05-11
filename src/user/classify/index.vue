<template>
  <div>
    <div class="module">
      <div class="module-header">
        <svg @click="handleback" class="icon" aria-hidden="true">
          <use xlink:href="#iconfanhui" />
        </svg>
        <h1>分类</h1>
      </div>
      <div class="home-con">
      <div class="classify">
        <div class="classify-down">
          <div class="classify-box">
            <div class="classify-menu">频道</div>
            <div class="classify-list">
              <span
                v-for="(item,index) in tabs"
                @click="handleclick(item,index)"
                :class="{active:num==index}"
                :key="index"
              >{{item}}</span>
            </div>
          </div>
          <div class="classify-box">
            <div class="classify-menu">分类</div>
            <div class="classify-list">
              <span
                v-for="(item,index) in tabs2"
                @click="handleclick2(item,index)"
                :class="{active:num2==index}"
                :key="index"
              >{{item}}</span>
            </div>
          </div>
          <div class="classify-box">
            <div class="classify-menu">状态</div>
            <div class="classify-list">
              <span
                v-for="(item,index) in tabs3"
                @click="handleclick3(item,index)"
                :class="{active:num3==index}"
                :key="index"
              >{{item}}</span>
            </div>
          </div>
        </div>
      </div>
      <div
        class="kong"
        v-if="bj"
      >
        <span class="">抱歉，没有该类型书籍</span>
      </div>
      <div  class="module2">
        <div class="module2-slide" v-for="item in classifydata" :key="item.id">
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
    </div>
  </div>
</template>
<script>
import {} from "@components/function/index.js";
import { mapState, mapMutations } from "vuex";
import { booksStatusApi } from "@api/books";
export default {
  name: "editlist",
  data() {
    return {
        bj:false,
      num: "0",
      num2: "0",
      num3: "0",
      tabs: ["全部", "男频", "女频"],
      tabs2: [
        "全部",
        "都市",
        "言情",
        "玄幻",
        "科幻",
        "历史",
        "武侠",
        "游戏",
        "二次元",
        "竞技",
        "青春",
        "悬疑"
      ],
      tabs3: ["全部", "连载中", "已完结"],
      arr: {
        region: "",
        classify: "",
        status: ""
      },
      classifydata: []
    };
  },
  created() {
    document.title = this.$route.meta.title;
    this.handleList();
  },
  computed: {
    ...mapState({
      newbooks: state => state.books.newbooks
    })
  },
  methods: {
    async handleclick(item, index) {
      this.num = index;
      if (item == "全部") {
        this.arr.region = "";
      } else {
        this.arr.region = item;
      }
      let data = await booksStatusApi(
        this.arr.region,
        this.arr.classify,
        this.arr.status
      );
        if(data.data.status==1){
            this.bj=false;
            this.classifydata = data.data.list.slice(0, 10);
        }else{
            this.classifydata=[]
            this.bj=true;
        }
    },
    async handleclick2(item, index) {
      this.num2 = index;
      if (item == "全部") {
        this.arr.classify = "";
      } else {
        this.arr.classify = item;
      }
      let data = await booksStatusApi(
        this.arr.region,
        this.arr.classify,
        this.arr.status
      );
        if(data.data.status==1){
            this.bj=false;
            this.classifydata = data.data.list.slice(0, 10);
        }else{
            this.classifydata=[]
            this.bj=true;
        }
    },
    async handleclick3(item, index) {
      this.num3 = index;
      if (item == "全部") {
        this.arr.status = "";
      } else {
        this.arr.status = item;
      }
      let data = await booksStatusApi(
        this.arr.region,
        this.arr.classify,
        this.arr.status
      );
        if(data.data.status==1){
            this.bj=false;
            this.classifydata = data.data.list.slice(0, 10);
        }else{
            this.classifydata=[]
            this.bj=true;
        }
    },
    async handleList() {
      let data = await booksStatusApi(
        this.arr.region,
        this.arr.classify,
        this.arr.status
      );
        if(data.data.status==1){
            this.bj=false;
            this.classifydata = data.data.list.slice(0, 10);
        }else{
            this.classifydata=[]
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
.home-con{
    padding-top: .45rem;
}
.kong{
    height: .3rem;
    display: flex;
    justify-content: center;
    align-items: center;
}
.module-header {
  height: 0.45rem;
  display: flex;
  justify-content: left;
    position: fixed;
    width: 100%;
    background:#fff; 
  align-items: center;
  border-bottom: 1px solid #f0f1f2;
}
.module-header .icon {
  margin: 0.1rem 0.18rem;
  color: #33373d;
  width: 0.2rem;
  height: 0.2rem;
}
.module-header h1 {
  font-size: 0.16rem;
  color: #33373d;
}
.classify {
  height: 2rem;
  margin-bottom: 0.1rem;
  border-bottom: 1px solid #f0f1f2;
}
.classify-down {
  padding: 0.18rem;
}
.classify-box {
  display: flex;
}
.classify-menu {
  font-size: 0.16rem;
  width: 0.4rem;
  height: 0.24rem;
  line-height: 0.24rem;
}
.classify-box:nth-child(2) {
  margin-top: 0.1rem;
}
.classify-box:nth-child(2) .classify-list {
  height: 1rem;
}
.classify-list {
  width: 3.2rem;
  display: flex;
  margin-left: 0.06rem;
  flex-direction: row;
  flex-wrap: wrap;
}
.classify-list span {
  display: block;
  color: #bbb;
  width: 0.64rem;
  height: 0.24rem;
  line-height: 0.24rem;
  font-size: 0.13rem;
  text-align: center;
  border-radius: 0.4rem;
  margin-right: 0.08rem;
  border: 1px solid #bbb;
}
.classify-list .active {
  color: #ee5048;
  border: 1px solid #ee5048;
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
