<template>
  <div>
    <div class="el-top">
      <span class="title">作品管理</span>
      <span>
        （
        <i>{{num||0}}</i>本）
      </span>
    </div>
    <div class="el-main">
      <el-table
        :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        style="width: 100%"
      >
        <el-table-column label="封面" width="100" align="center">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <img :src="scope.row.booksImg" class="booksImg" />
            </div>
          </template>
        </el-table-column>
        <el-table-column label="书名" width="100" align="center">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">{{ scope.row.booksName }}</div>
          </template>
        </el-table-column>
        <el-table-column label="总字数" width="100" align="center">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">{{ scope.row.booksTotal|many}}</div>
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
        <el-table-column label="创作日期" width="150" align="center">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.booksday }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作"  align="center">
          <template slot-scope="scope">
            <el-button size="small" @click="handleEdit( (currentPage - 1) * pagesize + scope.$index, scope.row)">新建章节</el-button>
            <el-button size="small" @click="handleDelete((currentPage - 1) * pagesize + scope.$index, scope.row)">管理作品</el-button>
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
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import { many } from "@components/function/index.js";
import { booksListApi } from "@api/books";

export default {
  name: "manage",
  data() {
    return {
      tableData: [],
      num: "",
      count: "",
      total: 0,
      value: false,
      currentPage: 1,
      pagesize: 3
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
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
    },
    handleSizeChange(val) {
      this.pagesize = val;
    },
    handleEdit(index, row) {
      this.$router.push({
        //编程时导航
        name: "newChapter",
        query: {
          id: this.tableData[index]._id
        }
      });
    },
    handleDelete(index, row) {
      console.log(index, row);
      //  this.$router.push("/home/chapter/bookmessage")
      this.$router.push({
        //编程时导航
        name: "oldtext",
        query: {
          id: this.tableData[index]._id
        }
      });
    },
    async handleList() {
      let id = sessionStorage.getItem("id");
      let data = await booksListApi(id);
      console.log(data)
      if (data.data.status == 1) {
        this.total = Number(data.data.list.length);
        this.tableData = data.data.list.reverse();
        this.num = data.data.list.length || 0;
      }
    }
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
.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}
.el-main {
  background-color: #fff;

  padding: 20px 30px;
}
.el-table .cell {
  text-align: center;
}
.booksImg {
  width: 72px;
  height: 100px;
}
.kongbai {
  height: 80px;
}
</style>

