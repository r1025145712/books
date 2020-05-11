<template>
  <div class="mine">
    <div class="details-header">
      <div class="module-header">
        <svg @click="handleback" class="icon" aria-hidden="true">
          <use xlink:href="#iconfanhui" />
        </svg>
        <h1>个人中心</h1>
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
    <div class="mine-info">
      <img :src="img" alt />
      <p>{{name}}</p>
    </div>
    <div class="mine-list">
      <van-cell icon="records" title="个人信息" is-link to="usermess" />
      <van-cell icon="envelop-o" title="消息通知" is-link to="message" />
       <van-cell icon="manager-o" title="成为作家" @click="handleauth" is-link  />
       <van-cell icon="warning-o" title="关于我们" is-link to="userwomen" />
    </div>
    <div  class="logout" @click="hanleout">退出登录</div>
  </div>
</template>
<script>
import {usermodify} from "@api/user"
export default {
  name: "mine2",
  components: {
    
  },
  data() {
    return {
      name: "",
      img: ""
    };
  },
  created() {
    this.handlelist();
  },
  methods: {
    handleback() {
      this.$router.back();
    },
    handlelist() {
      this.name = sessionStorage.getItem("name");
      this.img = sessionStorage.getItem("urlPic");
    },
    async handleauth(){
      let id =sessionStorage.getItem("userid");
      let data =await usermodify(id)
      if(data.data.status==1){
          this.$router.push("/home");
      }
    },
    hanleout() {
      sessionStorage.removeItem("userid");
      sessionStorage.removeItem("name");
      sessionStorage.removeItem("urlPic");
      this.$cookies.remove("token");
      this.$router.push("/user");
    }
  }
};
</script>
<style scoped>
.mine {
  background: #f6f7f9;
  height: 100%;
   padding-bottom: .45rem;
}
.details-header {
  display: flex;
  justify-content: space-between;
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
.mine-info {
  padding: 0.45rem 0.2rem 0;
  height: 2rem;
   background: linear-gradient(to right, #ff7e6f, #ff2959);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.mine-info img {
  width: 0.8rem;
  height: 0.8rem;
  border-radius: 0.8rem;
}
.mine-info p {
  margin-top: 0.1rem;
  font-size: 0.18rem;
  color: #fff;
}
.mine-list {
  margin-top: 0.2rem;
}

.van-cell {
  padding: .12rem .2rem;
  font-size:.16rem;
  line-height: .4rem;
}
.van-cell__left-icon, .van-cell__right-icon {
    width: .2rem;
    height: .4rem;
    font-size: .2rem;
    line-height: .4rem;
}
 .logout {
    color: #ed424b;
       border-top: 1px solid #ebedf0;
    font-size: .18rem;
    line-height: .6rem;
    text-align: center;
    background: #fff;
}
</style>

