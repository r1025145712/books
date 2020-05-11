<template>
  <div class="details">
    <div class="details-header">
      <div class="module-header">
        <svg @click="handleback" class="icon" aria-hidden="true">
          <use xlink:href="#iconfanhui" />
        </svg>
        <h1>更多书评</h1>
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
     <div class="booksping">
      <div class="clear item" v-for="item in booksp" :key="item._id">
        <div class="item-img">
          <img :src="item.img" alt />
        </div>
        <div class="item-div">
          <div class="item-name">{{item.name}}</div>
          <p class="item-con">{{item.textarea}}</p>
          <div class="item-date">{{item.readtime|time2}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Btm from "@common/btm";
import {} from "@components/function";
import {commentapi} from "@api/article"
export default {
  name: "detail",
  components: {
    Btm
  },
  data() {
    return {
        booksp:[]
    };
  },
  created() {
    this.handleList();
  },
  methods: {
    handleback() {
      this.$router.back();
    },
    async handleList() {
      this.id = this.$route.query.id;
    let comment=await commentapi(this.id)
      if(comment.data.status==1){
        this.booksp=comment.data.list;
      }
    }
  },

};
</script>
<style scoped>
.details {
  height: 100%;
}
.details-header {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #e5e5df;
  z-index: 10;
  position: fixed !important;
  background: #fff;
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
.booksping {
  min-height: 1.6rem;
  margin-top: .45rem;
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
</style>