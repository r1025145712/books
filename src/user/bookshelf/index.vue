<template>
  <div class="bookshelf">
    <van-tabs v-model="active" animated sticky>
      <van-tab title="我的书架" name="bookshelf">
        <div class="bookshelf-top">
          <div class="bookshelf-top-sc">
            共收藏
            <span>{{num}}</span>本
          </div>
          <div class="manage" @click="handlemanage">{{manage}}</div>
        </div>
        <div v-if="bj">
          <div
            class="books-item"
            v-for="(item,index) in booksdata"
            @click="handlebook(item,index)"
            :key="item._id"
          >
            <img :src="item.booksImg" alt />
            <div class="books-desc">
              <h3>{{item.booksName}}</h3>
              <p>读至 {{item.bookstext[item.bookmark].title}}</p>
              <div>
                <span>{{item.bookstext[0].articledate|time}}</span>
                <span>|{{item.bookstext|reverse}}</span>
              </div>
            </div>
            <div class="bookdel" v-if="del" @click.stop="handledel(item)">
              <van-icon name="delete" />
            </div>
          </div>
        </div>
        <div class="kong" v-if="bj3">暂无收藏</div>
      </van-tab>
      <van-tab name="read" @click="handlezuijin" title="最近阅读">
        <div v-if="bj2">
          <div
            class="books-item"
            v-for="(item,index) in reading"
            @click="handlebook(item,index)"
            :key="item._id"
          >
            <img :src="item.booksImg" alt />
            <div class="books-desc">
              <h3>{{item.booksName}}</h3>
              <p>读至 {{item.bookstext[item.bookmark].title}}</p>
              <div>
                <span>{{item.bookstext[0].articledate|time}}</span>
                <span>|{{item.bookstext|reverse}}</span>
              </div>
            </div>
            <div class="bookdel" @click.stop="handlecoll(item)">
              <van-icon :name="item.status|zhuang" :class="item.status|zhuang" />
            </div>
          </div>
        </div>
        <div class="kong" v-if="bj4">暂无阅读记录</div>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import { collectInfo2, modifyCollect, modifyCollect2 } from "@api/article";
import { booksList2Api } from "@api/books";
import {} from "@components/function";
import { mapState, mapMutations } from "vuex";
import Vue from 'vue';
import { Toast } from 'vant';
Vue.use(Toast);
export default {
  name: "bookshelf",
  data() {
    return {
      active: 1,
      id: "",
      bj: true,
      bj2: true,
      bj3: false,
      bj4: false,
      booksdata: "",
      del: false,
      manage: "管理",
      reading: [],
      sign: false,
      num: ""
    };
  },
  computed: {
    ...mapState({
      books: state => state.books.booksdata
    })
  },
  created() {
    this.handlelist();
  },
  methods: {
    async handlelist() {
      this.id = sessionStorage.getItem("userid");
      if (this.id == null) {
        this.$router.push("/user/register");
      }
      let status1 = true;
      let data = await collectInfo2(this.id, status1);
      if (data.data.status == 1) {
        this.booksdata = data.data.list;
        this.num = data.data.list.length;
      } else {
        this.num = 0;
        this.bj = false;
        this.bj3 = true;
      }
      this.handlezuijin();
    },
    async handlezuijin() {
      let status1 = false;
      let data = await collectInfo2(this.id, status1);
      if (data.data.status == 1) {
        this.reading = data.data.list.reverse().slice(0, 6);
      } else {
        this.bj2 = false;
        this.bj4 = true;
      }
      this.sign = true;
    },
    async handlecoll(item) {
      let status = true;
      let udata = await booksList2Api(item.booksid);
      if (udata.data.status == 1) {
        let bookscollect = udata.data.list[0].bookscollect;
        let data = await modifyCollect(
          item.booksid,
          this.id,
          item.bookmark,
          status,
          bookscollect
        );
        if (data.data.status == 1) {
          this.handlelist();
        }
      } else {
        console.log(udata.data.info);
      }
    },
    async handlebook(item, index) {
      this.$store.dispatch("books/handleActionsBooks", item.booksid);
      sessionStorage.setItem("routeback", "/user/bookshelf");
      let udata = await booksList2Api(item.booksid);
      if (udata.data.status == 1) {
        let booksclcik = udata.data.list[0].booksclick;
        let readtime = new Date().getTime();
        let oldtime = item.readtime;
        let data = await modifyCollect2(
          this.books,
          this.id,
          item.bookmark,
          readtime,
          oldtime,
          booksclcik
        );
        if (data.data.status == 1) {
          this.handlelist();
        }
      } else {
        console.log(udata.data.info);
      }
      if(item.sort=="正序"){
         this.$router.push({
        name: "content",
        query: {
          id: item.booksid,
          sort: item.sort,
          index: item.bookmark
        }
      });
      }else{
         this.$router.push({
        name: "content",
        query: {
          id: item.booksid,
          sort: item.sort,
          index: item.unbookmark
        }
      });
      }
     
    },
    handlemanage() {
      if (this.del == false) {
        this.del = true;
        this.manage = "完成";
      } else {
        this.del = false;
        this.manage = "管理";
      }
    },
    async handledel(item) {
      let status = false;
      let udata = await booksList2Api(item.booksid);
      if (udata.data.status == 1) {
        let bookscollect = udata.data.list[0].bookscollect;
        let data = await modifyCollect(
          item.booksid,
          this.id,
          item.bookmark,
          status,
          bookscollect
        );
        if (data.data.status == 1) {
          this.handlelist();
        }
      } else {
        Toast(udata.data.info);
      }
    }
  }
};
</script>
<style scoped>
.bookshelf {
  padding-bottom: 0.45rem;
}
.kong {
  width: 100%;
  height: 3rem;
  font-size: 0.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
.bookshelf-top {
  display: flex;
  height: 0.6rem;
  padding: 0.2rem 0.2rem 0.1rem;
  justify-content: space-between;
  align-items: center;
}
.bookshelf-top-sc {
  font-weight: 900;
}
.bookshelf-top-sc span {
  display: inline-block;
  width: 0.2rem;
}

.books-item {
  height: 1rem;
  display: flex;
  padding: 0.1rem 0.2rem 0.1rem 0;
  margin-left: 0.2rem;
  border-bottom: 1px solid #e5e5df;
}
.books-item img {
  width: 0.5rem;
  height: 0.7rem;
  margin-right: 0.2rem;
}
.books-item .books-desc h3 {
  font-size: 0.16rem;
  font-weight: 900;
}
.books-item .books-desc p {
  font-size: 0.14rem;
  margin-top: 0.1rem;
  color: #999;
}
.books-item .books-desc div {
  margin-top: 0.1rem;
  display: flex;
  width: 2.5rem;
  justify-content: left;
}
.books-item .books-desc div span {
  font-size: 0.14rem;
  color: #999;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.bookdel {
  width: 0.3rem;
  line-height: 0.8rem;
}
.manage {
  background: #ee5048;
  color: #fff;
  width: 0.44rem;
  height: 0.22rem;
  font-size: 0.12rem;
  text-align: center;
  line-height: 0.22rem;
  border-radius: 0.05rem;
}
.van-icon {
  color: #ee5048;
  font-size: 0.2rem;
}
.passed {
  color: #e5e5df;
}
</style>
<style >
.bookshelf .van-tabs--line .van-tabs__wrap {
  height: 0.6rem;
}
.bookshelf .van-tabs__nav--line {
  padding-bottom: 0.15rem;
}
.bookshelf .van-tab {
  padding: 0 0.05rem;
  font-size: 0.16rem;
  line-height: 0.6rem;
}
</style>

