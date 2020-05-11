<template>
  <div>
    <div class="el-top">
      <span class="title" @click="manage">新闻公告</span>
      <i class="el-breadcrumb__separator el-icon-arrow-right"></i>
      <span class="opus">新闻公告详情</span>
    </div>
    <div class="el-main">
      <div class="news_details">
        <div  style="text-align: center; font-size: 20px;">{{tableData.booksTitle}}</div>
        <div
          style="text-align: center; color: rgb(102, 102, 102); margin: 10px 0px 40px;"
        >{{tableData._id|_id}}</div>
        <pre  class="news-con">{{tableData.content}}</pre>
      </div>
    </div>
  </div>
</template>
<script>
import { addList } from "@api/news";
import {} from "@components/function";
export default {
  name: "noticelists",
  data() {
    return {
      xian: true,
      tableData: [],
    };
  },
  created() {
    this.handleList();
  },
  inject: ["reload"],
  methods: {
    manage() {
      this.$router.go(-1)
    },
    async handleList() {
      let id = this.$route.query.id;
      let data = await addList(id);
      this.tableData = data.data.list[0];
      if (this.tableData.length == 0) {
        this.bj3 = false;
        this.bj4 = true;
      }
    }
  }
};
</script>
<style scoped>
.opus {
  color: #aaa;
}
.el-breadcrumb__separator {
  margin: 0 6px;
  color: #aaa;
}
.el-top {
  background: #fff;
  font-size: 16px;
  line-height: 50px;
  padding-left: 30px;
  position: relative;
  margin-bottom: 5px;
  color: #333;
}
.title {
  font-size: 16px;
  color: #333;
}
.el-main {
  background-color: #fff;
  padding-bottom: 5px;
  padding: 20px 70px;
}
.message {
  display: flex;
  align-items: center;
}
.el-icon-tickets {
  font-size: 24px;
}
.news-con{
      font-family: Menlo,Monaco,Consolas,Courier New,monospace;
    line-height: 24px;
    font-size: 14px;
    color: #333;
    white-space: pre-wrap;
}
</style>

