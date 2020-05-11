<template>
  <div class="details">
    <transition name="fade">
      <div class="details-header" v-if="top">
        <div class="module-header">
          <svg @click="handleback" class="icon" aria-hidden="true">
            <use xlink:href="#iconfanhui" />
          </svg>
          <h1>{{bookstext.title}}</h1>
        </div>
        <div class="header-right">
          <a @click="handleReport">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#iconjubao" />
            </svg>
          </a>
          <a href="#/user/search">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#iconsousuo" />
            </svg>
          </a>
        </div>
      </div>
    </transition>
    <div class="book-desc" @click="handleswitch" ref="booksdesc">
      <div class="page-read-top">
        <h1 id="chapterTitle" class="read-book-name">{{bookstext.title}}</h1>
      </div>
      <div class="read-content" ref="booksdesc1" v-if="content">
        <div class="read-div" v-for="(item,index) in booksa" :key="index">{{item}}</div>
        <div class="chapter-over">
          <span>本章结束</span>
        </div>
        <div class="read-next">
          <span @click.stop="handlenext2">上一章</span>
          <span @click.stop="handlenext">下一章</span>
        </div>
      </div>
    </div>
    <transition name="fade">
      <div class="books-ziti" v-if="ziti">
        <div class="ziti">
          <span @click="sizemin">
            <svg class="icon" ref="sizemin" aria-hidden="true">
              <use xlink:href="#iconzitisuoxiao" />
            </svg>
          </span>
          {{size}}
          <span @click="sizemax">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#iconzitifangda" />
            </svg>
          </span>
        </div>
        <div class="yanse">
          <span
            :class="{active:num==index}"
            @click="handleyanse(item,index)"
            v-for="(item,index) in arr"
            :key="index"
          ></span>
        </div>
      </div>
    </transition>
    <transition name="fade">
      <div class="books-btn" v-if="top">
        <span @click="hanlemulu">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#iconmulu" />
          </svg>目录
        </span>
        <span>
          <svg class="icon" @click="hanldeziti" aria-hidden="true">
            <use xlink:href="#iconziti" />
          </svg>设置
        </span>
        <span @click="hanldeset">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#iconyejian" />
          </svg>夜间
        </span>
      </div>
    </transition>

    <van-dialog v-model="show" title="请输入举报理由" :showConfirmButton="false" :showCancelButton="false">
      <van-radio-group v-model="radio">
        <van-cell-group>
          <van-cell title="政治敏感" clickable @click="radio = '政治敏感'">
            <template #right-icon>
              <van-radio name="政治敏感" />
            </template>
          </van-cell>
          <van-cell title="淫秽色情" clickable @click="radio = '淫秽色情'">
            <template #right-icon>
              <van-radio name="淫秽色情" />
            </template>
          </van-cell>
          <van-cell title="欺诈广告" clickable @click="radio = '欺诈广告'">
            <template #right-icon>
              <van-radio name="欺诈广告" />
            </template>
          </van-cell>
          <van-cell title="侵权抄袭" clickable @click="radio = '侵权抄袭'">
            <template #right-icon>
              <van-radio name="侵权抄袭" />
            </template>
          </van-cell>
          <van-cell title="人身攻击" clickable @click="radio = '人身攻击'">
            <template #right-icon>
              <van-radio name="人身攻击" />
            </template>
          </van-cell>
          <van-cell title="其他类别" clickable @click="radio = '其他类别'">
            <template #right-icon>
              <van-radio name="其他类别" />
            </template>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
      <div class="anniu">
           <van-button size="normal" @click="handleclose" type="default">取消</van-button>
      <van-button size="normal" @click="handletijiao" type="default">确认</van-button>
      </div>
   
    </van-dialog>
  </div>
</template>
<script>
import {} from "@components/function";
import { booksList2Api } from "@api/books";
import { mapState, mapMutations } from "vuex";
import { modifyCollect3 ,userReport} from "@api/article";
import Vue from 'vue';
import { Toast } from 'vant';

Vue.use(Toast);
export default {
  name: "detail",
  data() {
    return {
      num: "",
      size: 18,
      radio: "",
      show: false,
      content: false,
      arr: ["#DBCBA7", "#cad9e8", "#D1EDD1"],
      top: false,
      ziti: false,
      bj: false,
      id: "",
      bookstitle: "正序",
      bookstext: [],
      booksa: [],
      index: ""
    };
  },
  created() {
    this.handleList();
  },
  computed: {
    ...mapState({
      booksdata: state => state.books.booksdata
    })
  },
  beforeRouteUpdate(to, from, next) {
    if (to.query.index != from.query.index) {
      next();
      this.handleList();
    }
  },
  methods: {
    handleclose(){
      this.show = false;
    },
    async handletijiao(){
      if(this.radio!=""){
        let userid="admin";
        let manage=true;
        let message="《"+this.booksdata.booksName+"》--"+this.bookstext.title+"存在"+this.radio+"问题，请管理员处理一下。";
        let data= await userReport(message,userid,manage)
        if(data.data.status==1){
             Toast(data.data.info)
                this.radio="";
        this.show = false;
        }else{
           Toast(data.data.info)
        } 
      }else{
        Toast("请选择理由")
      }
    },
    handleReport() {
      this.show = true;
    },
    sizemin() {
      if (this.size > 12) {
        this.size = this.size - 2;
        this.$refs.booksdesc1.style.fontSize = "." + this.size + "rem";
      } else {
        this.$refs.sizemin.style.color = "#8D8D8D";
      }
    },
    sizemax() {
      this.size = this.size + 2;
      this.$refs.sizemin.style.color = "#fff";
      this.$refs.booksdesc1.style.fontSize = "." + this.size + "rem";
    },
    hanldeset() {
      if (this.bj == false) {
        this.$refs.booksdesc.style.background = "#1A1A1A ";
        this.$refs.booksdesc.style.color = "#8D8D8D";
        this.bj = true;
      } else {
        this.$refs.booksdesc.style.background = "#dbcba7";
        this.$refs.booksdesc.style.color = "#33373d";
        this.bj = false;
      }
    },
    handleyanse(item, index) {
      this.$refs.booksdesc.style.background = item;
      this.num = index;
    },
    hanldeziti() {
      this.ziti = this.ziti == false ? true : false;
    },
    hanlemulu() {
      this.$router.push({
        name: "mulu",
        query: {
          id: this.id,
          index: Number(this.index),
          sort: this.bookstitle
        }
      });
    },
    handlenext() {
      if (this.bookstitle == "正序") {
        if (Number(this.index) < this.booksdata.bookstext.length - 1) {
          this.$router.push({
            name: "content",
            query: {
              id: this.id,
              index: Number(this.index) + 1,
              sort: this.bookstitle
            }
          });
        }
      } else {
        if (Number(this.index) > 0) {
          this.$router.push({
            name: "content",
            query: {
              id: this.id,
              index: Number(this.index) - 1,
              sort: this.bookstitle
            }
          });
        }
      }
    },
    handlenext2() {
      if (this.bookstitle == "正序") {
        if (Number(this.index) > 0) {
          this.$router.push({
            name: "content",
            query: {
              id: this.id,
              index: Number(this.index) - 1,
              sort: this.bookstitle
            }
          });
        }
      } else {
        if (Number(this.index) < this.booksdata.bookstext.length - 1) {
          this.$router.push({
            name: "content",
            query: {
              id: this.id,
              index: Number(this.index) + 1,
              sort: this.bookstitle
            }
          });
        }
      }
    },
    handleback() {
      let dz = sessionStorage.getItem("routeback");
      if (dz == "/user/bookshelf") {
        this.$router.push(dz);
      } else {
        this.$router.push({
          name: "details",
          query: {
            id: this.id,
            index: this.index
          }
        });
      }
    },
    handleswitch() {
      this.top = this.top == true ? false : true;
      this.ziti = false;
    },
    async handleList() {
      this.index = this.$route.query.index;
      this.id = this.$route.query.id;
      this.bookstitle = this.$route.query.sort;
      let userid = sessionStorage.getItem("userid");
      let data = await modifyCollect3(
        this.booksdata,
        userid,
        this.bookstitle,
        this.index
      );
      this.bookstext = this.booksdata.bookstext[this.index];
      document.title = this.bookstext.title;
      this.booksa = this.bookstext.content.split("    ");
      if (this.booksa.length !== 0) {
        this.content = true;
      }
    }
  }
};
</script>
<style scoped>
.details {
  height: 100%;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.details-header {
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.9);
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
  color: #fff;
}
.module-header h1 {
  font-size: 0.16rem;
  color: #fff;
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
  color: #fff;
}

.book-desc {
  height: 100%;
  display: flex;
  background: #dbcba7;
  flex-direction: column;
  position: relative;
}
.page-read-top {
  position: fixed;
  top: 0;
  right: 0;
  left: 0.1rem;
  height: 0.44rem;
  line-height: 0.44rem;
  background: inherit;
}
.read-content {
  margin-top: 0.44rem;
  font-size: 0.18rem;
  overflow: hidden;
  padding: 0.2rem 0.18rem 0;
  white-space: pre-wrap;
  overflow-y: auto;
  display: block;
}
.read-content .read-div {
  text-indent: 0.3rem;
}
.read-content .chapter-over {
  position: relative;
  width: 2.52rem;
  margin: 0.1rem auto 0;
  font-size: 0.14rem;
  color: #000;
  text-align: center;
  line-height: 0.3rem;
  text-indent: 0;
}
.chapter-over span {
  display: inline-block;
  padding: 0 0.2rem;
  color: #333;
}
.chapter-over:before,
.chapter-over:after {
  display: block;
  position: absolute;
  top: 0.15rem;
  content: " ";
  width: 0.42rem;
  height: 0.01rem;
  background-color: #333;
}
.chapter-over:before {
  left: 0.2rem;
}
.chapter-over:after {
  right: 0.2rem;
}
.read-next {
  display: flex;
  justify-content: space-around;
  padding: 0.2rem;
}
.read-next span {
  display: inline-block;
  width: 0.8rem;
  padding: 0 0.06rem;
  font-size: 0.14rem;
  height: 0.32rem;
  text-align: center;
  line-height: 0.32rem;
  border-radius: 0.05rem;
  color: #333;
  border: 1px solid #333;
}
.books-btn {
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.9);
  z-index: 10;
  position: fixed !important;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0.45rem;
}
.books-btn span {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fff;
  font-size: 0.1rem;
}
.books-btn span svg {
  width: 33%;
  height: 0.2rem;
}
.books-ziti {
  height: 1rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.9);
  z-index: 10;
  position: fixed !important;
  left: 0;
  bottom: 0.45rem;
  width: 100%;
  color: #fff;
}
.books-ziti div {
  height: 0.5rem;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-around;
}
.books-ziti .ziti {
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 0.5rem;
  padding: 0 0.1rem;
}

.books-ziti div svg {
  width: 0.2rem;
  height: 0.2rem;
}
.yanse {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 0.5rem;
  padding: 0 0.1rem;
}
.yanse span {
  width: 0.4rem;
  height: 0.4rem;
  border-radius: 0.4rem;
}
.yanse .active {
  border: 1px solid red;
}
.yanse span:nth-child(1) {
  background: #dbcba7;
}
.yanse span:nth-child(2) {
  background: #cad9e8;
}
.yanse span:nth-child(3) {
  background: #d1edd1;
}
</style>
<style >
.anniu{
  display: flex;
}
.anniu .van-button{
  width: 50%;
}
.anniu .van-button:nth-child(1){
  border-right: 1px solid #ebedf0;
}
</style>