<template>
  <div>
    <div class="el-top">
      <span class="title">新闻公告</span>
    </div>
    <div class="el-main">
      <el-table
        :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        style="width: 100%"
        v-if="bj3"
      >
        <el-table-column width="930">
          <template slot-scope="scope">
            <div class="message">
              <div class="el-icon-tickets"></div>
              <div class="message-con" @click="handleclick(scope.row._id)">
                <div>{{scope.row.booksTitle}}</div>
                <div class="shijian">{{scope.row._id|_id}}</div>
              </div>
            </div>
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
        v-if="bj1"
      ></el-pagination>
      <div class="weidu" v-if="bj4">暂无新闻</div>
    </div>
  </div>
</template>
<script>
import { addList, newsdel } from "@api/news";
import {} from "@components/function";
export default {
  name: "noticelist2",
  data() {
    return {
      xian: true,
      tableData: [],
      multipleSelection: [],
      bj3: true,
      bj1: true,
      bj4: false,
      total: 0,
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
  inject: ["reload"],
  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.xian = false;
      if (this.multipleSelection.length == 0) {
        this.xian = true;
      }
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
    },
    handleSizeChange(val) {
      this.pagesize = val;
    },
    async handleList() {
      let id = null;
      let data = await addList(id);
      this.tableData = data.data.list;
      this.total = Number(data.data.list.length);
      if (this.total <= 8) {
        this.bj1 = false;
      }
      if (this.tableData.length == 0) {
        this.bj3 = false;
        (this.bj1 = false), (this.bj4 = true);
      }
    },
    handleclick(id) {
      this.$router.push({
        name: "noticelists",
        query: {
          id: id
        }
      });
    }
  }
};
</script>
<style scoped>
.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: center;
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
  padding: 0px 30px 30px 20px;
}
.message {
  display: flex;
  align-items: center;
}
.el-icon-tickets {
  font-size: 24px;
}
.message-con {
  margin-left: 20px;
  width: 800px;
  display: flex;
  cursor: pointer;
  justify-content: space-between;
}
.message-size {
  font-size: 13px;
}
.message-rigth {
  margin-left: 20px;
}
.shijian {
  font-size: 13px;
  color: #999;
}
.weidu {
  font-size: 20px;
  height: 400px;
  width: 800px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgb(153, 153, 153);
}
</style>

