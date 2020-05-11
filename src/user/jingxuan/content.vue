<template>
  <div>
      <div class="huise"></div>
    <div class="module">
      <div class="module-header">
        <h3 class="module-title">热门小说</h3>
        <a href="#/user/hotlist">
          更多
          <i class="el-icon-arrow-right" />
        </a>
      </div>
      <div class="module-slide">
        <router-link
          v-for="item in remendata"
          :key="item._id"
          class="module-slide-a"
          tag="a"
          :to="{name:'details',query:{id:item._id}}"
        >
          <img :src="item.booksImg" alt="图片" />
          <p>{{item.booksName}}</p>
        </router-link>
        <!--  -->
      </div>
    </div>
      <div class="huise"></div>
    <div class="module2">
      <div class="module-header">
        <h3 class="module-title">编辑精选</h3>
        <a href="#/user/editlist">
          更多
          <i class="el-icon-arrow-right" />
        </a>
      </div>
      <div class="module2-slide" v-for="item in recommend" :key="item.id">
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
    <div class="huise"></div>
    <div class="module">
      <div class="module-header">
        <h3 class="module-title">新书抢先</h3>
        <a href="#/user/newbooks">
          更多
          <i class="el-icon-arrow-right" />
        </a>
      </div>
      <div class="module-slide">
        <router-link
          v-for="item in newbooks"
          :key="item._id"
          class="module-slide-a"
          tag="a"
          :to="{name:'details',query:{id:item._id}}"
        >
          <img :src="item.booksImg" alt="图片" />
          <p>{{item.booksName}}</p>
        </router-link>
        <!--  -->
      </div>
    </div>
      <div class="huise"></div>
    <div class="module2">
      <div class="module-header">
        <h3 class="module-title">书友收藏</h3>
        <a href="#/user/collect">
          更多
          <i class="el-icon-arrow-right" />
        </a>
      </div>
      <div class="module2-slide" v-for="item in collect" :key="item.id">
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
</template>
<script>
import {} from "@components/function/index.js";
import { recommendApi, booksSortApi } from "@api/books";
import { mapState, mapMutations } from "vuex";
export default {
  name: "remen",
  data() {
    return {};
  },
  created() {
    document.title = this.$route.meta.title;
    this.handleList();
  },
  computed: {
    ...mapState({
      recommend: state => state.books.recommend.slice(0, 3),
      remendata: state => state.books.remendata.slice(0, 4),
      newbooks: state => state.books.newbooks.slice(0, 4),
      collect: state => state.books.collect.slice(0, 3)
    })
  },
  methods: {
    async handleList() {
      this.$store.dispatch("books/handleActionsRecommend");
      this.$store.dispatch("books/handleActionsRemendata");
      this.$store.dispatch("books/handleActionsNewbooks");
      this.$store.dispatch("books/handleActionsCollect");
    }
  }
};
</script>
<style scoped>
.module {
  /* margin-top: 0.1rem; */
  background: #fff;
  min-height: 1.7rem;
}
.huise{
  height: .1rem;
  width: 100%;
  background: #F6F7F9;
}
.module-header {
  display: flex;
  justify-content: space-between;
  height: 0.4rem;
  align-items: center;
}
.module-title {
  padding-left: 0.2rem;
}
.module-header a {
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
.module-slide {
  height: 1.3rem;
  display: flex;
  justify-content: space-around;
}
.module-slide-a {
  width: 0.8rem;
  height: 1.3rem;
  padding: 0.06rem;
  display: flex;
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
  /* margin-top: 0.1rem; */
  min-height: 1.5rem;
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
    height: .2rem;
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
.book-meta  .el-icon-user {
  width: 0.18rem;
  height: 0.18rem;
  line-height: 0.18rem;
}
.book-meta {
  height: .2rem;
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
  height: .2rem;
}
</style>

