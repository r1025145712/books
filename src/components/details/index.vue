<template>
  <div class="details">
    <div class="details-header">
      <div class="module-header">
        <svg @click="handleback" class="icon" aria-hidden="true">
          <use xlink:href="#iconfanhui" />
        </svg>
        <h1>作品详情</h1>
      </div>
      <div class="header-right">
        <a href="#/user">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#iconzhuye" />
          </svg>
        </a>
        <a href="#/user/search">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#iconsousuo" />
          </svg>
        </a>
      </div>
    </div>
    <div class="book-info-wrapper">
      <img :src="booksdata.booksImg" class="book-bg-image" />
      <div class="book-info-box">
        <div class="book-cover">
          <img :src="booksdata.booksImg" alt />
        </div>
        <div class="book-cell">
          <h4>{{booksdata.booksName}}</h4>
          <p class="item-row">{{booksdata.booksAuth}} | {{booksdata.booksclassify}}</p>
          <p class="item-row">
            点击：
            <span>{{booksdata.booksclick|many}}</span>
          </p>
          <p class="item-row">
            字数：
            <span>{{booksdata.booksTotal|many}}</span>
          </p>
          <p class="item-row">
            状态：
            <span>{{booksdata.booksStatus}}</span>
          </p>
        </div>
      </div>
      <div class="book-btn">
        <span class="btn" @click="handleshu" ref="bookshelf">{{bookshelf}}</span>
        <span class="btn1" @click="handleread">{{read}}</span>
      </div>
      <div class="books-desc">
        <p>{{booksdata.booksdesc}}</p>
      </div>
      <div class="books-text">
        <div class="cell" v-if="bj2">暂无章节</div>
        <div class="cell" v-if="bj" @click="handlemulu">
          <span class="cell-ml">目录</span>
          <span class="cell-lz">
            连载至
            <i>{{bookstitle}}</i>
          </span>
          <span class="cell-lz">更新于{{booksdate|time}}</span>
          <i class="el-icon-arrow-right"></i>
        </div>
      </div>
    </div>
    <div class="module-header2">
      <h3 class="module-title">书评区</h3>
      <a @click="showPopup">写书评</a>
    </div>
    <div class="booksping">
      <div class="clear item" v-for="item in booksp3" :key="item._id">
        <div class="item-img">
          <img :src="item.img" alt />
        </div>
        <div class="item-div">
          <div class="item-name">{{item.name}}</div>
          <p class="item-con">{{item.textarea}}</p>
          <div class="item-date">{{item.readtime|time2}}</div>
        </div>
      </div>
      <div class="gengduo" @click="jumpbooks" >更多书评({{booksp.length}}条)</div>
    </div>
    <div class="kongbai">
      <Btm />
    </div>
    <van-popup v-model="show" closeable position="bottom" :style="{ height: '30%' }">
      <div class="fabiao">发表评论</div>
      <el-input
        type="textarea"
        placeholder="写下你的评论，最多500字"
        v-model="textarea"
        maxlength="500"
        rows="4"
        show-word-limit
      ></el-input>
      <span class="fabu" @click="fabu">发布</span>
    </van-popup>
  </div>
</template>
<script>
import Btm from "@common/btm";
import {} from "@components/function";
import { booksList2Api } from "@api/books";
import Vue from 'vue';
import { Toast } from 'vant';
Vue.use(Toast);
import {
  commentapi,
  addArticle,
  modifyCollect,
  collectInfo,
  modifyCollect2,
  addbooksping
} from "@api/article";
export default {
  name: "detail",
  components: {
    Btm
  },
  data() {
    return {
      textarea: "",
      show: false,
      index: "0",
      bj: true,
      bj2: false,
      read: "开始阅读",
      bookshelf: "加入书架",
      id: "",
      userid: "",
      img:"",
      name:"",
      booksdata: [],
      bookstitle: "",
      booksdate: "",
      oldtime: "",
      booksclick: "",
      bookscollect: "",
      usercollect: false,
      sort: "正序",
      sign: "",
      booksp:[],
      booksp3:[],
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      //  这里的vm指的就是vue实例，可以用来当做this使用
      if (
        from.path != "/user/content" &&
        from.path != "/user/mulu" &&
        from.path != "/user/register" &&
        from.path != "/user/search"&&
          from.path != "/user/comment"
      ) {
        sessionStorage.setItem("routeback", from.path);
      }
    });
  },
  created() {
    this.handleList();
  },
  methods: {
    jumpbooks(){
       this.$router.push({
        name: "comment",
        query: {
          id: this.id,
        }
      });
    },
    async fabu() {
      let readtime = new Date().getTime();
      let data = await addbooksping(this.booksdata._id,this.userid,this.name,this.img,this.textarea,readtime);
      if(data.data.status==1){
         this.show = false;
          Toast('发布成功');
            this.handleList();
      }else{
          Toast('发布失败');
      }
    },
    showPopup() {
      this.show = true;
    },
    async handleshu() {
      this.$refs.bookshelf.style.borderColor = "#bbb";
      this.$refs.bookshelf.style.color = "#bbb";
      this.bookshelf = "已在书架";
      let status = true;
      if (this.userid == null) {
        this.$router.push("/user/register");
      } else if (this.usercollect != true) {
        let data = await modifyCollect(
          this.booksdata._id,
          this.userid,
          this.index,
          status,
          this.bookscollect
        );
      }
    },
    async handleread() {
      this.read = "继续阅读";
      let readtime = new Date().getTime();
      let data = await modifyCollect2(
        this.booksdata,
        this.userid,
        this.index,
        readtime,
        this.oldtime,
        this.booksclick,
        this.sign
      );
      this.$router.push({
        name: "content",
        query: {
          id: this.id,
          index: this.index,
          sort: this.sort
        }
      });
    },
    handleback() {
      this.$router.push(sessionStorage.getItem("routeback"));
    },
    handlemulu() {
      this.$router.push({
        name: "mulu",
        query: {
          id: this.id,
          index: this.index,
          sort: this.sort
        }
      });
    },
    async handleList() {
      this.id = this.$route.query.id;
      this.userid = sessionStorage.getItem("userid");
      this.name = sessionStorage.getItem("name");
      this.img = sessionStorage.getItem("urlPic");
      this.index = this.$route.query.index || 0;
      this.$store.dispatch("books/handleActionsBooks", this.id);
      let data = await booksList2Api(this.id);
      if (data.data.status == 1) {
        this.booksdata = data.data.list[0];
        this.booksclick = data.data.list[0].booksclick;
        this.bookscollect = data.data.list[0].bookscollect;
        this.handleList2();
        if (data.data.list[0].bookstext.length != 0) {
          this.bookstitle = data.data.list[0].bookstext.reverse()[0].title;
          this.booksdate = data.data.list[0].bookstext.reverse()[0].articledate;
          this.bj2 = false;
          this.bj = true;
        } else {
          this.bj = false;
          this.bj2 = true;
        }
        document.title = this.booksdata.booksName;
      }
      let comment=await commentapi(this.id)
      if(comment.data.status==1){
        this.booksp=comment.data.list;
        this.booksp3=this.booksp.slice(0, 3)
      }
    },
    async handleList2() {
      let readtime = new Date().getTime();
      let first = true;
      let data = await addArticle(
        this.booksdata,
        this.userid,
        this.index,
        readtime,
        this.sort,
        first
      );
      let userdata = await collectInfo(this.booksdata, this.userid);
      if (userdata.data.status == 1) {
        if (userdata.data.list[0].bookmark != "0") {
          this.read = "继续阅读";
        }
        this.sign = userdata.data.list[0].first;
        this.oldtime = userdata.data.list[0].readtime;
        this.usercollect = userdata.data.list[0].status;
        this.sort = userdata.data.list[0].sort;
        if (this.$route.query.index == undefined) {
          if (this.sort == "正序") {
            this.index = userdata.data.list[0].bookmark || 0;
          } else {
            this.index = userdata.data.list[0].unbookmark || 0;
          }
        }
        if (userdata.data.list[0].status == true) {
          this.$refs.bookshelf.style.borderColor = "#bbb";
          this.$refs.bookshelf.style.color = "#bbb";
          this.bookshelf = "已在书架";
        }
      } else {
          // Toast(userdata.data.info);
      }
    }
  }
};
</script>
<style scoped>
.details {
  height: 100%;
}
.details-header {
  display: flex;
  justify-content: space-between;
  /* border-bottom: 1px solid #e5e5df; */
  z-index: 10;
  position: fixed !important;
  left: 0;
  top: 0;
  width: 100%;
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
.header-right {
  width: 1.2rem;
  height: 0.45rem;
}
.header-right a {
  width: 0.3rem;
  height: 0.45rem;
  line-height: 0.45rem;
  float: right;
  margin-right: 0.05rem;
}
.header-right svg {
  width: 0.18rem;
  height: 0.18rem;
  font-size: 0.18rem;
  color: #33373d;
}

.book-info-wrapper {
  position: relative;
  padding-top: 0.45rem;
  min-height: 2.4rem;
  width: 100%;
}
.book-bg-image {
  position: absolute;
  top: -3.6rem;
  width: 100%;
  height: 140vw;
  opacity: 0.13;
  -webkit-filter: blur(0.4rem);
  filter: blur(0.4rem);
  left: 0;
}
.book-info-box {
  height: 1.6rem;
  padding: 0.15rem 0.18rem;
}
.book-cover {
  box-shadow: 0 0 0.04rem rgba(0, 0, 0, 0.1);
  border-radius: 0.04rem;
  overflow: hidden;
  float: left;
  width: 0.9rem;
  height: 1.3rem;
}
.book-cover img {
  width: 100%;
  height: 100%;
}
.book-cell {
  width: 2.3rem;
  height: 1.3rem;
  float: left;
  margin-left: 0.1rem;
}
.book-cell h4 {
  font-weight: 400;
  height: 0.3rem;
  font-family: PingFang SC, microsoft yahei;
}
.item-row {
  height: 0.23rem;
  color: #999;
  font-size: 0.14rem;
  font-family: PingFang SC, microsoft yahei;
}
.book-btn {
  padding: 0 0.18rem;
  background: #fff;
  height: 0.42rem;
  display: flex;
  justify-content: space-between;
}
.book-btn span {
  display: inline-block;
  width: 1.6rem;
  padding: 0 0.06rem;
  height: 0.42rem;
  text-align: center;
  line-height: 0.42rem;
  border-radius: 0.05rem;
}
/* 变化 */
.btn {
  border: 1px solid #ee5048;
  color: #ee5048;
}
.btn1 {
  border: 1px solid #ee5048;
  color: #fff;
  background: #ee5048;
}

.books-desc {
  min-height: 0.2rem;
  margin-top: 0.2rem;
  max-height: 3rem;
  overflow: hidden;
  border-top: 1px solid #e5e5df;
  padding: 0.18rem 0.15rem;
}
.books-desc p {
  font-size: 0.14rem;
  color: #666;
  text-indent: 0.1rem;
  font-family: PingFang SC, microsoft yahei;
}
.books-text {
  height: 0.4rem;
  padding: 0 0.18rem;
}
.cell {
  border-top: 1px solid #e5e5df;
  display: flex;
  height: 0.4rem;
  align-items: center;
  justify-content: space-around;
}
.cell span {
  display: block;
}
.cell-ml {
  color: #333;
}
.cell-lz {
  color: #999;
  font-size: 0.13rem;
}
.el-icon-arrow-right {
  color: #999;
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
.module-header2 {
  display: flex;
  justify-content: space-between;
  height: 0.4rem;
  align-items: center;
  border-bottom: 1px solid #e2e4e0;
}
.module-title {
  padding-left: 0.2rem;
}
.module-header2 a {
  margin-right: 0.1rem;
  width: 0.5rem;
  font-size: 0.14rem;
  color: #c99b61;
}
.booksping {
  min-height: 1.6rem;
}
.item {
  margin: 0 0.18rem;
  min-height: 1rem;
  padding: 0.15rem 0;
  display: flex;
  border-bottom: 1px solid #edede9;
}
.item .item-img {
  width: 0.3rem;
}
.item .item-img img {
  width: 0.3rem;
  height: 0.3rem;
  border-radius: 0.3rem;
}
.item .item-div {
  width: 3rem;
  margin-left: 0.1rem;
}
.item-name {
  font-size: 0.14rem;
  height: 0.3rem;
  color: #427785;
  line-height: 0.3rem;
}
.item-con {
  font-size: 0.14rem;
  word-spacing: 1px;
  line-height: 0.24rem;
  text-align: justify;
  max-height: 0.72rem;
  margin-top: 0.02rem;
  word-break: break-all;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.item-date {
  margin-top: 0.1rem;
  font-size: 0.12rem;
  color: #999;
}
.van-popup {
  padding: 0.1rem 0.18rem 0;
}
.fabiao {
  width: 100%;
  text-align: center;
  height: 0.3rem;
  font-weight: 900;
}
.fabu {
  display: block;
  width: 100%;
  background: #ee5048;
  margin-top: 0.1rem;
  border-radius: 0.05rem;
  text-align: center;
  height: 0.4rem;
  color: #fff;
  line-height: 0.4rem;
}
.gengduo{
  width: 100%;
  height: .3rem;
  text-align: center;
  line-height: .3rem;
  color: #ee5048;
}

.kongbai {
  height: 0.1rem;
  padding-top: 0.1rem;
  background: #f6f7f9;
}

</style>