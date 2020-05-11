<template>
  <div>
    <div class="el-top">
      <span class="title">消息通知</span>
    </div>
     <el-scrollbar ref="myScrollbar" style="height: 500px;">
    <div class="el-main">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="未读消息" name="first">
          <el-table
           ref="multipleTable"
            :data="tableData2"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange"
            v-if="bj"
          >
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column width="870">
              <template slot="header">
                <el-button size="mini" :disabled="xian" @click="handleread()">全部设为已读</el-button>
              </template>
              <template slot-scope="scope">
                <div class="message">
                  <div class="el-icon-message-solid"></div>
                  <div class="message-con">
                    <div>系统通知</div>
                    <div class="message-size">{{ scope.row.message }}</div>
                  </div>
                  <div class="shijian">{{scope.row._id|_id}}</div>
                  <div class="message-rigth">
                    <el-button size="mini" :disabled="xian" @click="handleread()">设为已读</el-button>
                  </div>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <div class="weidu" v-if="bj2">暂无未读消息</div>
        </el-tab-pane>
        <el-tab-pane label="已读消息" name="second">
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
                <el-button size="mini" type="danger" :disabled="xian" @click="handledel()">全部删除</el-button>
              </template>
              <template slot-scope="scope">
                <div class="message">
                  <div class="el-icon-message-solid"></div>
                  <div class="message-con">
                    <div>系统通知</div>
                    <div class="message-size">{{ scope.row.message }}</div>
                  </div>
                     <div class="shijian">{{scope.row._id|_id}}</div>
                  <div class="message-rigth">
                    <el-button size="mini" :disabled="xian" type="danger" @click="handledel()">删除</el-button>
                  </div>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <div class="weidu" v-if="bj4">暂无已读消息</div>
        
        </el-tab-pane>
      </el-tabs>
    </div>
        </el-scrollbar>
  </div>
</template>
<script>
import { messageMdf, messageid, messagedel } from "@api/user";
import {} from "@components/function";
export default {
  name: "news2",
  data() {
    return {
      activeName: "first",
      bj: true,
      bj2: false,
      bj3: true,
      bj4: false,
      xian: true,
      tableData: [],
      tableData2: [],
      multipleSelection: [],
    };
  },
  created() {
    this.handleList();
    this.currentPage = Number(Number(localStorage.getItem("pagination2"))) || 1;
  },
    mounted() {
    this.$refs["myScrollbar"].wrap.scrollTop = this.$refs[
      "myScrollbar"
    ].wrap.scrollHeight;
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
      console.log(rows);
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
        let data = await messagedel(id);
      }
      this.reload();
    },
    async handleread() {
      for (let i = 0; i < this.multipleSelection.length; i++) {
        let id = this.multipleSelection[i]._id;
        let manage = false;
        let data = await messageMdf(id, manage);
      }
      this.reload();
    },
    async handleList() {
      let id ="admin";
      let data = await messageid(id);
      for (let i = 0; i < data.data.list.length; i++) {
        if (data.data.list[i].manage == true) {
          this.tableData2 = this.tableData2.concat(data.data.list[i]);
        }
        if (data.data.list[i].manage == false) {
          this.tableData = this.tableData.concat(data.data.list[i]);
        }
      }
      this.tableData = this.tableData.reverse();
      this.tableData2 = this.tableData2.reverse();
      if (this.tableData2.length == 0) {
        this.bj = false;
        this.bj2 = true;
      }
      if (this.tableData.length == 0) {
        this.bj3 = false;
        this.bj4 = true;
      }
      this.total = Number(this.tableData2.length);
      this.total2 = Number(this.tableData.length);
    },
    handleClick() {}
  }
};
</script>
<style scoped>
.kong{
  height: 20px;
  background: #fff;
}
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
.el-icon-message-solid {
  font-size: 30px;
}
.message-con {
  margin-left: 20px;
  width: 600px;
}
.message-size {
  font-size: 13px;
}
.message-rigth {
  margin-left: 10px;
}
.shijian {
  font-size: 13px;
  color: #999;
  margin-bottom: 15px;
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
<style>
.el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>


