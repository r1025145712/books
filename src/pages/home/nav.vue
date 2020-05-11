<template>
 <el-row class="tac">
  <el-col :span="12">
    <el-menu
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      @select="handleSelect"
      background-color="#fff"
      text-color="#333"
      active-text-color="#57C1EB">
      <el-menu-item index="/home/manage">
        <i class="el-icon-menu"></i>
        <span slot="title">作品管理</span>
      </el-menu-item>
      <el-menu-item index="/home/bookdata">
        <i class="el-icon-s-data"></i>
        <span slot="title">作品数据</span>
      </el-menu-item>
        <el-menu-item index="/home/write" >
        <i class="el-icon-edit"></i>
        <span slot="title">新建作品</span>
      </el-menu-item>
        <el-menu-item index="/home/noticelist2" >
        <i class="el-icon-monitor"></i>
        <span slot="title">新闻公告</span>
      </el-menu-item>
      <el-menu-item index="/home/mine" >
        <i class="el-icon-document"></i>
        <span slot="title">基本信息</span>
      </el-menu-item>
      <el-menu-item index="/home/news">
        <i class="el-icon-chat-line-round"></i>
        <span slot="title">消息通知</span>
      </el-menu-item>
    </el-menu>
  </el-col>
</el-row>
</template>
<script>
  export default {
    name:"navbar",
    methods: {
    handleSelect(key,path) {
        this.$router.push(key)
    },
    }
  }
</script>
<style scoped>
.el-col-12{
    width:80%;
    margin-left:20px;
}
.el-menu{
    border-right:none;
}

.el-menu-item {
    margin-top:10px;
  background-color: #fff !important;
 border-bottom:1px solid #DDDDDD; 
}
.el-menu-item:last-child { 
 border-bottom:none; 
}
</style>

