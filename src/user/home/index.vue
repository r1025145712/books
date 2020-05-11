<template>
  <div class="home">
    <router-view></router-view>
     <el-backtop >
   <i class="el-icon-caret-top"></i>
  </el-backtop>
    <TabBar  v-if="$route.meta.tabBarFlag"/>
  </div>
</template>
<script>
import TabBar from "@common/tabbar"
export default {
  name: "user2",
  components:{
        TabBar,
    },
  created(){
    document.title = this.$route.meta.title
  },
  methods: {}
};
</script>
<style scoped>
.home{
  height: 100%;
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
