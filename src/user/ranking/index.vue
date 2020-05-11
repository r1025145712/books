<template>
  <div>
    <div class="module">
      <div class="module-header">
        <svg @click="handleback" class="icon" aria-hidden="true">
          <use xlink:href="#iconfanhui" />
        </svg>
        <h1>排行榜</h1>
      </div>
      <div class="module2">
        <div class="rank-menu">
          <div
            v-for="(item,index) in tabs"
            :key="index"
            @click="handleclick(item,index)"
            :class="{active:num==index}"
          >{{item}}</div>
        </div>
        <div class="rank-con">
          <div v-if="bj">
            <div class="module2-slide" v-for="item in bang" :key="item.id">
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
                  </div>
                </div>
              </router-link>
            </div>
          </div>
          <div v-if="bj2" class="noLogs">
            <img src="@img/shu.png" alt />
            <p>暂时没有此榜的书籍</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {} from "@components/function/index.js";
import { mapState, mapMutations } from "vuex";
export default {
  name: "hotlist",
  data() {
    return {
      bj: true,
      bj2: false,
      num: "0",
      tabs: ["热门榜", "收藏榜", "新书榜", "打赏榜", "书单榜"],
      bang:{

      }
    };
  },
  created() {
    document.title = this.$route.meta.title;
    this.handleList();
  },
  computed: {
    ...mapState({
      remendata: state => state.books.remendata,
       collect: state => state.books.collect,
        newbooks: state => state.books.newbooks,
    })
  },
  methods: {
    handleclick(item, index) {
      this.num = index;
      if (item == "打赏榜" || item == "书单榜") {
       this.bj=false;
        this.bj2 = true;
      } else {
        this.bj2 = false;
      };
      if(item=="热门榜"){
          if(this.remendata!=[]){
              this.bang=this.remendata;
               this.bj=true;
               this.bj2 = false;
          }else{
                this.bj2 = true;
          }
          
      };
      if(item=="收藏榜"){
           if(this.collect!=[]){
              this.bang=this.collect;
                this.bj=true;
               this.bj2 = false;
          }else{
                this.bj2 = true;
          }
      };
       if(item=="新书榜"){
           if(this.newbooks!=[]){
              this.bang=this.newbooks;
                this.bj=true;
               this.bj2 = false;
          }else{
                this.bj2 = true;
          }
       }
    },
    handleList() {
         this.bang=this.remendata;
    },
   handleback(){
      this.$router.push("/user")
    }
  }
};
</script>
<style scoped>
.module-header {
  height: 0.45rem;
  display: flex;
  justify-content: left;
  align-items: center;
    position: fixed;
    width: 100%;
    background:#fff; 
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
  min-height: 3rem;
  padding-top:.45rem ;
  background: #fff;
}
.rank-menu {
  position: fixed;
  height: 10rem;
  overflow: hidden;
  width: 0.8rem;
  background: #f0f1f2;
}
.rank-menu div {
  height: 0.5rem;
  text-align: center;
  line-height: 0.5rem;
}
.active {
  background: #fff;
}
.rank-con {
  padding-left: 0.8rem;
  width: 100%;
  min-height: 5rem;
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
  width: 2rem;
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

.noLogs {
  text-align: center;
  font-size: 0.14rem;
  color: #999;
  height: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.noLogs img {
  width: 1rem;
  height: 0.64rem;
  display: block;
  margin-bottom: 0.1rem;
}
</style>
