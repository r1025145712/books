<template>
  <div>
    <div class="el-top">
      <span class="title">新闻公告</span>
    </div>
      <el-scrollbar ref="myScrollbar" style="height: 500px;">
    <div class="el-main">
     
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        v-if="bj3"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column width="870">
          <template slot="header">
            <el-button size="mini" type="danger" :disabled="xian" @click="handledel()">删除选中</el-button>
          </template>
          <template slot-scope="scope">
            <div class="message">
              <div class="el-icon-tickets"></div>
              <div class="message-con"  @click="handleclick(scope.row._id)">
                <div>{{scope.row.booksTitle}}</div>
                <div class="shijian">{{scope.row._id|_id}}</div>
              </div>
              <div class="message-rigth">
                <el-button size="mini" :disabled="xian" type="danger" @click="handledel()">删除</el-button>
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="weidu" v-if="bj4">暂无新闻</div>
    </div>
       </el-scrollbar>
       <div class="kong"></div>
  </div>
</template>
<script>
import { addList ,newsdel} from "@api/news";
import {} from "@components/function";
export default {
  name: "noticelist",
  data() {
    return {
      xian: true,
      tableData: [],
      multipleSelection: [],
      bj3: true,
      bj4: false
    };
  },
  created() {
    this.handleList();
  },
    mounted() {
    this.$refs["myScrollbar"].wrap.scrollTop = this.$refs[
      "myScrollbar"
    ].wrap.scrollHeight;
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
    async handledel() {
      for (let i = 0; i < this.multipleSelection.length; i++) {
        let id = this.multipleSelection[i]._id;
        let data = await newsdel(id);
      }
      this.reload();
    },
    async handleList() {
        let id=null;
       
      let data = await addList(id);
       console.log(data)
      this.tableData = data.data.list;
      if (this.tableData.length == 0) {
        this.bj3 = false;
        this.bj4 = true;
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
  padding: 20px 30px;
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
.kong{
  height: 20px;
  background: #fff;
}
</style>
<style>
.el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>


