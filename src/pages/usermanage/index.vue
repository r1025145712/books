<template>
  <div>
    <div class="el-top">
      <div>
        <span class="title">用户管理</span>
        <span>
          （
          <i>{{num||0}}</i>个）
        </span>
      </div>

      <el-form :inline="true" :model="formInline" class="demo-form-inline2">
        <el-form-item label="用户名称：" prop="name">
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
        <el-table-column label="用户名" width="150" align="center">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">{{ scope.row.name }}</div>
          </template>
        </el-table-column>
        <el-table-column label="用户身份" width="150" align="center">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">{{ scope.row.identity|status3}}</div>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="80" align="center">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">{{ scope.row.status|status5 }}</div>
          </template>
        </el-table-column>
        <el-table-column label="日期" width="200" align="center">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.registerTime|date }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="260" align="center">
          <template slot-scope="scope">
            <el-button
              :type="scope.row.status|status2"
              size="mini"
              @click="deleteArticle(scope.$index, scope.row)"
            >{{scope.row.status|status4}}</el-button>

            <el-button type="danger" size="mini" @click="handleDel(scope.$index, scope.row)">删除用户</el-button>
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
        v-if="fenye"
      ></el-pagination>
      <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
        <div class="el-icon-warning"></div>
        <span style="margin-left:10px">封禁后用户将不能登录，是否封禁？</span>
        <span slot="footer" class="dialog-footer">
          <el-button size="small" @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" size="small" @click="handleDelete()">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog title="提示" :visible.sync="dialogVisible1" width="30%">
        <div class="el-icon-warning"></div>
        <span style="margin-left:10px">删除后用户账号将彻底消失，是否删除？</span>
        <span slot="footer" class="dialog-footer">
          <el-button size="small" @click="dialogVisible1 = false">取 消</el-button>
          <el-button type="primary" size="small" @click="Delete()">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { usermanyApi,userProhibit,userDelApi } from "@api/user";
import {} from "@components/function";
export default {
  name: "manage",
  inject: ["reload"],
  data() {
    return {
      dialogVisible: false,
      dialogVisible1: false,
      fenye:true,
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
    this.currentPage = Number(Number(localStorage.getItem("pagination2"))) || 1;
  },
  beforeUpdate() {
    localStorage.setItem("pagination2", this.currentPage);
  },
  beforeDestroy() {
    localStorage.removeItem("pagination2");
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
    // 封禁
    async deleteArticle(index, row) {
      if (row.status == true) {
        this.dialogVisible = true;
        this.row = row;
      } else {
        row.status = true;
        let data = await userProhibit(row._id, row.status);
        if (data.data.status == 1) {
          this.$message({
            message: "用户已解封",
            type: "success"
          });
        }
      }
    },
    // 删除
    handleDel(index, row) {
      this.row2 = row;
      this.dialogVisible1 = true;
    },
    async Delete() {
      let data = await userDelApi(this.row2._id);
      console.log(data);
      if (data.data.status == 1) {
        this.$message({
          message: data.data.info,
          type: "success"
        });
        this.dialogVisible1 = false;
        this.reload();
      }
    },
    async handleDelete(index, row) {
      this.row.status = false;
      let data = await userProhibit(this.row._id, this.row.status);
      if (data.data.status == 1) {
        this.$message({
          message: data.data.info,
          type: "success"
        });
        this.dialogVisible = false;
      }
    },
    async handleList() {
      let data = await usermanyApi();
      this.total = Number(data.data.list.length);
      this.tableData = data.data.list;
      if(data.data.list.length<=8){
        this.fenye=false;
      }
      this.num = data.data.list.length;
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

  padding: 20px 30px;
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
  margin-right: 160px;
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

