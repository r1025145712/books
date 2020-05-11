<template>
  <div class="home">
    <Head />
    <div class="home-main">
    <div class="nav">
      <div class="nav_con">
        <router-link v-for="item in tabs" :key="item.id"  :to="item.path" tag="a" class="guide-nav-a" >
          <svg class="icon" aria-hidden="true">
            <use :xlink:href="item.icon" />
          </svg>
          <h4 class="guide-nav-h">{{item.text}}</h4>
        </router-link>
      </div>
    </div>
    <Content/>
 
    </div>
  </div>
</template>
<script>
import Head from "./header.vue";
import Content from "./content"
export default {
  name: "mine",
  components: {
    Head,
    Content
  },
  data(){
    return{
      tabs:[
         {
          id: 0,
          text: "分类",
          icon: "#iconfenlei",
          path: "/user/classify"
        },
          {
          id: 1,
          text: "排行",
          icon: "#iconpaihang1",
          path: "/user/ranking"
        },
          {
          id: 2,
          text: "连载",
          icon: "#iconzuixinlianzai",
          path: "/user/serialize"
        }, {
          id: 3,
          text: "完本",
          icon: "#iconbook-1",
          path: "/user/oldbooks"
        },
      ]

      
    }
  },
  created() {
    document.title = this.$route.meta.title;
  },
  methods: {}
};
</script>
<style scoped>
.home{
  background: #F6F7F9;
}
.home-main{
  display: flex;
  flex-direction: column;
  padding-bottom:.5rem ;
  /* padding-top:  0.45rem;  */
}
.nav {
  margin-top:.1rem ;
  height: 0.8rem;
  background: #fff;
}
.nav_con {
  padding: 0.1rem;
  height: 0.8rem;
  display: flex;
  justify-content: space-around;
}
.nav_con  .guide-nav-a{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: .56rem;
  height: .56rem;
}
.guide-nav-a > .icon {
   width: .36rem;
   height: .36rem;
}
.guide-nav-a h4{
  margin-top:.05rem;
  font-size: .14rem;
  color: #33373d;
}
</style>
<style>
.el-backtop{
  width: .4rem;
  height: .4rem;
  bottom: .6rem !important;
  right: .3rem !important;
}
</style>

