<template>
  <div>
    <div class="el-top">
      <span class="title">作品数据</span>
    </div>
    <div class="el-main">
      <el-select size="small" v-model="value" @change="handleChange(value)" placeholder="请选择">
        <el-option v-for="(item) in options" :key="item._id" :value="item.booksName"></el-option>
      </el-select>
      <div class="el-con">
        <div class="cover">
          <img :src="booksdata.booksImg" />
        </div>
        <div class="details">
          <p>
            作品名称：
            <span>{{booksdata.booksName}}</span>
          </p>
          <p>
            创作日期：
            <span>{{booksdata.booksday}}</span>
          </p>
          <p>
            作品类型：
            <span>{{booksdata.booksregion+"/"+booksdata.booksclassify}}</span>
          </p>
          <p>
            作品状态：
            <span>{{booksdata.booksStatus}}</span>
          </p>
          <p>
            总字数：
            <span>{{booksdata.booksTotal|many}}</span>
          </p>
        </div>
        <div class="books-echarts" ref="chart"></div>
      </div>
    </div>
  </div>
</template>
<script>
import { booksListApi, booksSearchlApi } from "@api/books";
import {} from "@components/function";
const echarts = require("echarts");
export default {
  name: "bookdata",
  data() {
    return {
      options: [],
      value: "",
      booksdata: []
    };
  },
  created() {
    this.handleList();
  },
  methods: {
    async handleList() {
      let id = sessionStorage.getItem("id");
      let data = await booksListApi(id);
      if (data.data.status == 1) {
        this.options = data.data.list;
        this.value = data.data.list[0].booksName;
        this.handleChange(this.value);
      }
    },
    async handleChange(value) {
      let data = await booksSearchlApi(value);
      if (data.data.status == 1) {
        this.booksdata = data.data.list[0];
        this.initCharts();
      }
    },
    initCharts() {
      let myChart = echarts.init(this.$refs.chart);
      // 绘制图表
      myChart.setOption({
        title: { text: "成绩统计" },
        tooltip: {},
        xAxis: {
          data: [
            "点击",
            "收藏",
          ]
        },
        yAxis: {},
        series: [
          {
            name: "作品成绩",
            type: "bar",
            data: [this.booksdata.booksclick,this.booksdata.bookscollect],
          }
        ]
      });
    }
  },
  mounted() {
    this.initCharts();
  }
};
</script>
<style scoped>
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
  padding: 20px 30px 0;
}
.el-con {
  height: 300px;
  margin-top: 20px;
}
.cover {
  width: 120px;
  height: 170px;
  border-radius: 5px;
  background-color: #6cd;
  -webkit-box-shadow: 2px 2px 5px #ccc;
  box-shadow: 2px 2px 5px #ccc;
  overflow: hidden;
  margin-right: 30px;
  float: left;
}
.cover img{
  width: 100%;
  height: 100%;
}
.details {
  float: left;
}
.details p {
  font-size: 14px;
  color: #333;
  margin-bottom: 14px;
  line-height: 23px;
}
.details p span {
  display: inline-block;
  width: 180px;
  vertical-align: top;
  font-weight: 700;
}
.books-echarts {
  width: 300px;
  height: 250px;
  margin-left:100px ;
  float: left;
}
</style>

