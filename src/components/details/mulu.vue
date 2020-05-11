<template>
  <div class="details">
    <div class="details-header">
      <div class="module-header">
        <svg @click="handleback" class="icon" aria-hidden="true">
          <use xlink:href="#iconfanhui" />
        </svg>
        <h1>{{booksdata.booksName}}</h1>
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
    <div class="book-mulu">
      目录
      <span @click="handlesort">{{bookstitle}}</span>
    </div>
    <div class="books-mu-list">
      <div
        :class="{active:num==index}"
        @click="handlezhengwen(index)"
        v-for="(item,index) in bookstext"
        :key="index"
      >{{item.title}}</div>
    </div>
  </div>
</template>
<script>
import Btm from "@common/btm";
import {} from "@components/function";
import { booksList2Api } from "@api/books";
import {collectInfo} from "@api/article"
import { mapState, mapMutations } from "vuex";
export default {
  name: "detail",
  components: {
    Btm
  },
  data() {
    return {
      num: "0",
      num3:"0",
      num2:"0",
      bj: true,
      bj2: false,
      id: "",
      bookstitle: "",
      bookstext: []
    };
  },
  created() {
    this.handleList();
    document.title = this.$route.meta.title;
  },
  computed: {
    ...mapState({
      booksdata: state => state.books.booksdata
    })
  },
  methods: {
    handlesort() {
      if (this.bookstitle == "正序") {
        this.bookstitle = "倒序";
        this.num=this.num2;
        this.bookstext = this.bookstext.reverse();
      } else if (this.bookstitle == "倒序") {
        this.num=this.num3;
        this.bookstitle = "正序";
        this.bookstext = this.bookstext.reverse();
      }
    },
    handleback() {
      this.$router.back();
    },
    handlezhengwen(index) {
      this.num = index;
      this.$router.push({
        name: "content",
        query: {
          id: this.id,
          index: index,
          sort: this.bookstitle
        }
      });
    },
    async handleList() {
      this.id = this.$route.query.id;
      this.bookstitle = this.$route.query.sort;
      this.num=this.$route.query.index;
       let userid = sessionStorage.getItem("userid");
      this.$store.dispatch("books/handleActionsBooks", this.id);
       let userdata = await collectInfo(this.booksdata,userid);
        this.num3 = userdata.data.list[0].bookmark;
       this.num2=userdata.data.list[0].unbookmark
    }
  },
  beforeUpdate() {
    this.bookstext = this.booksdata.bookstext;
    if(this.bj2==false){
        if (this.bookstitle == "正序") {
        this.bookstext = this.bookstext;
      } else if (this.bookstitle == "倒序") {
        this.bookstext = this.bookstext.reverse();
      }
      this.bj2=true
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
.book-mulu {
  margin-top: 0.45rem;
  height: 0.4rem;
  line-height: 0.4rem;
  width: 100%;
  text-align: center;
  background-color: #f6f7f9;
  position: relative;
}
.book-mulu span {
  position: absolute;
  right: 0.3rem;
}
.books-mu-list div {
  margin-left: 0.2rem;
  height: 0.44rem;
  line-height: 0.44rem;
  border-bottom: 1px solid #e5e5df;
}
.books-mu-list .active {
  color: #ee5048;
}
</style>