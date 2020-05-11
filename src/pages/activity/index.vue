<template>
  <div>
    <div class="el-top">
      <div>
        <span class="title">推荐作品</span>
        <span>
          （
          <i>{{num||0}}</i>本）
        </span>
      </div>

      <el-form :inline="true" :model="formInline" class="demo-form-inline2">
        <el-form-item label="作品分类：" prop="region">
          <el-select v-model="formInline.status" @change="selectChange" placeholder="请选择">
            <el-option label="连载中" value="连载中"></el-option>
            <el-option label="已完结" value="已完结"></el-option>
          </el-select>
          <el-select v-model="formInline.region" @change="selectChange" placeholder="请选择">
            <el-option label="男频" value="男频"></el-option>
            <el-option label="女频" value="女频"></el-option>
          </el-select>
          <el-select v-model="formInline.classify" @change="selectChange" placeholder="请选择">
            <el-option label="都市" value="都市"></el-option>
            <el-option label="言情" value="言情"></el-option>
            <el-option label="玄幻" value="玄幻"></el-option>
            <el-option label="科幻" value="科幻"></el-option>
            <el-option label="历史" value="历史"></el-option>
            <el-option label="武侠" value="武侠"></el-option>
            <el-option label="游戏" value="游戏"></el-option>
            <el-option label="二次元" value="二次元"></el-option>
            <el-option label="竞技" value="竞技"></el-option>
            <el-option label="青春" value="青春"></el-option>
            <el-option label="悬疑" value="悬疑"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="作品名称：" prop="name">
          <el-input v-model="formInline.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="mini" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="el-main">
      <el-table
        :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        style="width: 100%; font-size:14px"
      >
        <el-table-column label="书名" width="150" align="center">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">{{ scope.row.booksName|min }}</div>
          </template>
        </el-table-column>
        <el-table-column label="作者" width="100" align="center">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">{{ scope.row.booksAuth}}</div>
          </template>
        </el-table-column>
        <el-table-column label="连载/完结" width="100" align="center">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">{{ scope.row.booksStatus }}</div>
          </template>
        </el-table-column>
        <el-table-column label="类型" width="100" align="center">
          <template slot-scope="scope">
            <div
              slot="reference"
              class="name-wrapper"
            >{{ scope.row.booksregion+"/"+scope.row.booksclassify }}</div>
          </template>
        </el-table-column>
        <el-table-column label="上架状态" width="100" align="center">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">{{ scope.row.upperShelf|status }}</div>
          </template>
        </el-table-column>
        <el-table-column label="日期" width="150" align="center">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.booksday }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleEdit(scope.$index, scope.row)"
            >解除推荐</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="pagination"
        :current-page="currentPage"
        :page-size="pagesize"
        :hide-on-single-page="value"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        background
        layout="prev, pager, next"
        :total="total"
        v-if="bj"
      ></el-pagination>
      <div class="kong" v-if="bj2"></div>
    </div>
  </div>
</template>
<script>
import {
  booksListApi,
  recommendApi,
  bookstuijian,
  booksStatusApi,
  booksSearchlApi,
  booksDelApi
} from "@api/books";
import {} from "@components/function";
export default {
  name: "manage",
  inject: ["reload"],
  data() {
    return {
      dialogVisible: false,
      dialogVisible1: false,
      bj:false,
      bj2:true,
      tableData: [],
      formInline: {
        name: "",
        region: "",
        classify: "",
        status: ""
      },
      num: "",
      count: "",
      total: 0,
      row: {},
      row2: {},
      value: false,
      currentPage: 1,
      pagesize: 8
    };
  },
  created() {
    this.handleList();
    this.currentPage = Number(Number(localStorage.getItem("pagination"))) || 1;
  },
  beforeUpdate() {
    localStorage.setItem("pagination", this.currentPage);
  },
  beforeDestroy() {
    localStorage.removeItem("pagination");
  },
  methods: {
    handleSizeChange(val) {
      this.pagesize = val;
    },
    async selectChange() {
      let data = await booksStatusApi(
        this.formInline.region,
        this.formInline.classify,
        this.formInline.status
      );
      if (data.data.status == 1) {
        this.tableData = data.data.list;
        this.total = Number(data.data.list.length);
      } else {
        this.tableData = [];
        this.total = 0;
      }
    },
    async onSubmit() {
      let data = await booksSearchlApi(this.formInline.name);
      if (data.data.status == 1) {
        this.tableData = data.data.list;
        this.total = Number(data.data.list.length);
      } else {
        this.tableData = [];
        this.total = 0;
      }
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
    },
    async handleEdit(index, row) {
      row.tuijian = false;
       let manage=true;
      let message="您好，您的作品"+"《" + row.booksName + "》" +"现已解除编辑推荐，请继续努力！"
      let data = await bookstuijian(row._id, row.tuijian,message,row.userid,manage);
      if (data.data.status == 1) {
        this.$message({
          message: "已解除推荐",
          type: "success"
        });
      //  this.reload()
       this.handleList()
      }
    },
    async handleList() {
      let data = await recommendApi();
      this.total = Number(data.data.list.length);
      this.tableData = data.data.list;
          if(data.data.list.length>8){
          this.bj=true;
          this.bj2=false;
        }
      this.num = data.data.list.length;
    }
  }
};
</script>
<style scoped>
.kong{
  height: 20px;
  background: #fff;
}
.el-top {
  background: #fff;
  font-size: 16px;
  line-height: 50px;
  padding-left: 30px;
  position: relative;
  margin-bottom: 5px;
  color: #333;
  display: flex;
  justify-content: space-between;
}
.title {
  font-size: 16px;
  color: #333;
}
.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}
.el-main {
  background-color: #fff;

  padding: 10px 30px;
}
.el-icon-warning {
  color: #e6a23c;
}
.el-table .cell {
  text-align: center;
}
.demo-form-inline2 {
  display: flex;
  align-items: center;
  margin-right: 40px;
}
.el-input {
  width: 100px;
  height: 32px;
}

.el-form-item {
  display: flex;
  align-items: center;
}

.el-select {
  width: 100px;
  height: 32px;
  margin-right: 20px;
}
.el-form-item {
  margin-bottom: 0;
}
</style>
<style >
.demo-form-inline2 .el-input__inner {
  height: 32px;
}
</style>

