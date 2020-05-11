<template>
  <div>
    <div class="el-top">
      <div>
        <span class="title">作品管理</span>
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
        <el-table-column label="作者" width="80" align="center">
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
        <el-table-column label="上架状态" width="80" align="center">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">{{ scope.row.upperShelf|status }}</div>
          </template>
        </el-table-column>
        <el-table-column label="日期" width="130" align="center">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.booksday }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="260" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              :disabled="scope.row.tuijian"
              @click="handleEdit(scope.$index, scope.row)"
            >{{scope.row.tuijian|tui}}</el-button>
            <el-button
              :type="scope.row.status|status2"
              size="mini"
              @click="deleteArticle(scope.$index, scope.row)"
            >{{scope.row.status|status1}}</el-button>

            <el-button
              type="danger"
              size="mini"
              icon="el-icon-delete"
              @click="handleDel(scope.$index, scope.row)"
              circle
            ></el-button>
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
        <span style="margin-left:10px">封禁后本书不能继续编写，是否封禁？</span>
        <div class="fengjin">
          <div class="fengjinb">封禁理由 :</div>
          <el-input type="textarea" :rows="2" size="mini" v-model="message"></el-input>
        </div>

        <span slot="footer" class="dialog-footer">
          <el-button size="small" @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" size="small" @click="handleDelete()">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog title="提示" :visible.sync="dialogVisible1" width="30%">
        <div class="el-icon-warning"></div>
        <span style="margin-left:10px">删除后本书将彻底消失，是否删除？</span>
        <div class="fengjin">
          <div class="fengjinb">删除理由 :</div>
          <el-input type="textarea" :rows="2" size="mini" v-model="message3"></el-input>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button size="small" @click="dialogVisible1 = false">取 消</el-button>
          <el-button type="primary" size="small" @click="Delete()">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import {
  booksListApi,
  userListApi,
  bookstuijian,
  booksProhibit,
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
      fenye:true,
      message: "某些章节不符合网站要求，暂给予封禁处罚,修改后重新上架。",
      message2: "已解除封禁重新上架。",
      message3: "内容违反法律法规，已经从网站删除。",
      dialogVisible: false,
      dialogVisible1: false,
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
      if (row.upperShelf !== false) {
        row.tuijian = true;
        let manage = true;
        let message = "您好，您的作品" +"《" + row.booksName +"》" + "表现良好现已加入编辑推荐，请继续努力！";
        let data = await bookstuijian(row._id,row.tuijian,message,row.userid, manage);
        if (data.data.status == 1) {
          this.$message({
            message: data.data.info,
            type: "success"
          });
          this.tableData[index].tuijian = true;
        }
      }
    },
    // 封禁
    async deleteArticle(index, row) {
      if (row.status == true) {
        this.dialogVisible = true;
        this.row = row;
      } else {
        row.status = true;
        let manage = true;
        this.message2 ="您好，您的作品" + "《" + row.booksName + "》" + this.message2;
        let data = await booksProhibit(row._id,row.status,this.message2,row.userid,manage);
        if (data.data.status == 1) {
          this.$message({
            message: data.data.info,
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
      this.message3 =
        "您好，您的作品" + "《" + this.row2.booksName + "》" + this.message3;
      let manage = true;
      let data = await booksDelApi(
        this.row2._id,
        this.row2.userid,
        this.message3,
        manage
      );
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
      let manage = true;
      this.message =
        "您好，您的作品" + "《" + this.row.booksName + "》" + this.message;
      let data = await booksProhibit(
        this.row._id,
        this.row.status,
        this.message,
        this.row.userid,
        manage
      );
      if (data.data.status == 1) {
        this.$message({
          message: data.data.info,
          type: "success"
        });
        this.dialogVisible = false;
      }
    },
    async handleList() {
      let data = await userListApi();
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
.fengjin {
  margin: 20px 22px 0;
}
.fengjin .fengjinb {
  margin-bottom: 10px;
}
.fengjin .el-input {
  width: 300px;
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

