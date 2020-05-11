<template>
  <div class="oldtext">
    <div class="el-left fl">
      <div class="title">目录</div>
      <el-menu :default-active="active" class="chapter">
        <el-scrollbar ref="myScrollbar" style="height: 360px;">
          <el-menu-item
            :index="item.articledate"
            v-for="(item,index) in list"
            :key="index"
            @click="chapter(item,index)"
            class="book_chapter"
          >{{item.title}}</el-menu-item>
        </el-scrollbar>
      </el-menu>
    </div>
    <div class="el-right">
      <div v-if="zj2" class="xinjian">
        <p
          style="text-align: center; margin-top: 100px;margin-bottom:16px; font-size: 16px; color: rgb(153, 153, 153);"
        >您还没有章节，快去新建章节吧！</p>
        <el-button
          style="width: 120px; font-size: 16px;"
          type="primary"
          size="small"
          @click="newchapter"
        >新建章节</el-button>
      </div>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
        v-if="zj"
      >
        <el-form-item class="chapter_name" label="章节名称：" prop="title">
          <div v-if="bj1">{{ruleForm.title}}</div>
          <el-input v-if="bj2" v-model="ruleForm.title" placeholder="示例，第一章 猛虎下山"></el-input>
        </el-form-item>
        <el-scrollbar v-if="bj1" style="height: 280px; width:700px;margin-left:20px;margin-bottom:10px">
          <div class="zhengwen" v-if="bj1">{{ruleForm.content}}</div>
        </el-scrollbar>
        <el-form-item v-if="bj2" label="正文：" prop="content">
          <el-input
            type="textarea"
            maxlength="10000"
            show-word-limit
            :rows="9"
            v-model="ruleForm.content"
          ></el-input>
        </el-form-item>
        <el-form-item label="章节说：" v-if="bj2" :rows="3" prop="zuozhe">
          <el-input type="textarea" v-model="ruleForm.chapterSays" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button v-if="bj1" type="primary" size="small" @click="modifyArticle">修改章节</el-button>
          <el-button v-if="bj1" size="small" @click="deletedraft">删除章节</el-button>
          <el-button type="primary" v-if="bj2" size="small" @click="saveForm">保存修改</el-button>
          <el-button v-if="bj2" size="small" @click="cancelForm">取消修改</el-button>
        </el-form-item>
      </el-form>
      <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
        <div class="el-icon-warning"></div>
        <span style="margin-left:10px">删除之后将无法恢复，确定删除章节?</span>
        <span slot="footer" class="dialog-footer">
          <el-button size="small" @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" size="small" @click="deleteArticle">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import {
  modifyArticle,
  deleteArticle,
  booksList2Api,
  bookxiugaizi,
  booksTotal
} from "@api/books";
export default {
  name: "oldtext",
  data() {
    return {
      dialogVisible: false,
      bj1: true,
      bj2: false,
      active: "0",
      articleindex: "",
      oldday: "",
      zj2: false,
      zj: true,
      ruleForm: {},
      list: [],
      id: "",
      booksTotal: Number,
      booksdata: [],
      rules: {
        name: [
          { required: true, message: "请输入章节名称", trigger: "blur" },
          { min: 1, max: 20, message: "长度在 1 到 16 个字符", trigger: "blur" }
        ],
        desc: [
          { required: true, message: "请填写正文", trigger: "blur" },
          {
            min: 1000,
            max: 10000,
            message: "正文内容不得少于1000字",
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {
    this.handlelist();
  },
  inject: ["reload"],
  mounted() {
    this.$refs["myScrollbar"].wrap.scrollTop = this.$refs[
      "myScrollbar"
    ].wrap.scrollHeight;
  },
  methods: {
    deletedraft() {
      this.dialogVisible = true;
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    async handlelist() {
      this.id = this.$route.query.id;
      let data = await booksList2Api(this.id);
      this.booksdata = data.data.list[0];
      this.list = [];
      if (this.booksdata.bookstext.length !== 0) {
        this.list = this.booksdata.bookstext.reverse();
        this.active = this.list[0].articledate;
        this.oldday = this.list[0].articledate;
        this.ruleForm = this.list[0];
      } else {
        this.zj = false;
        this.zj2 = true;
      }
    },
    newchapter() {
      this.$router.push({
        name: "newChapter",
        query: {
          id: this.id
        }
      });
    },
    chapter(item, index) {
      console.log(item, index);
      this.ruleForm = item;
      this.active = item.articledate;
      this.oldday = item.articledate;
      this.articleindex = index;
    },
    modifyArticle() {
      this.bj1 = false;
      this.bj2 = true;
    },
    saveForm() {
      this.hanldModify();
    },
    async hanldModify() {
      var now = new Date();
      var year = now.getFullYear(); //年
      var month = now.getMonth() + 1; //月
      var day = now.getDate(); //日
      var hh = now.getHours(); //时
      var mm = now.getMinutes(); //分
      var ss = now.getSeconds();
      this.ruleForm.day =
        year + "-" + month + "-" + day + " " + hh + ":" + mm + ":" + ss;
      var content = this.ruleForm.content.replace(/\s+/g, "");
      this.ruleForm.sizelength = content.length;
      let data = await modifyArticle(
        this.ruleForm,
        this.oldday,
        this.booksdata._id
      );
      if (data.data.status == 1) {
        this.$message({
          message: data.data.info,
          type: "success"
        });
        this.gain();
        this.bj2 = false;
        this.bj1 = true;
      } else {
        this.$message.error(data.data.info);
      }
    },
    async gain() {
      let data = await bookxiugaizi(this.booksdata.booksName);
      if (data.data.list.length == 0) {
        this.booksTotal = 0;
         this.reload();
      } else {
        this.handlesize(data)
      }
    },
    async handlesize(data){
        this.booksTotal = Number(data.data.list[0].sizelength);
        let data2 = await booksTotal(this.booksTotal, this.booksdata._id);
        this.reload();
    },
    // 取消修改
    cancelForm() {
      this.bj2 = false;
      this.bj1 = true;
    },
    async deleteArticle() {
      this.dialogVisible = false;
      let data = await deleteArticle(this.booksdata._id, this.oldday);
      if (data.data.status == 1) {
        this.$message({
          message: data.data.info,
          type: "success"
        });
        this.gain();
      } else {
        this.$message.error(data.data.info);
      }
    }
  }
};
</script>
<style scoped>
.oldtext {
  margin-top: 20px;
  min-height: 100px;
}
.el-icon-warning {
  color: #e6a23c;
}
.xinjian {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
.zhengwen {
  padding: 15px 10px;
  line-height: 24px;
  font-size: 13px;
  color: #333;
  border: none;
  overflow: hidden;
  white-space: pre-wrap;
  overflow-y: auto;
  display: block;
  word-break: break-all;
  word-wrap: break-word;
  -webkit-box-shadow: 0 0 1px #c0c4cc inset;
  box-shadow: inset 0 0 1px #c0c4cc;
  border-radius: 4px;
}
.el-left {
  width: 220px;
  height: 400px;
  border: 1px solid #ddd;
}
.fl {
  float: left;
}
.title {
  width: 100%;
  height: 40px;
  display: block;
  color: #fff;
  line-height: 40px;
  font-size: 16px;
  text-align: center;
  background-color: #21ade5;
}
.book_chapter {
  padding-left: 16px;
  font-size: 13px;
  border-bottom: 1px solid #f3f3f3;
  height: 40px;
  line-height: 40px;
  cursor: pointer;
}

/* 右边 */
.el-right {
  width: 700px;
  padding-bottom: 10px;
  float: left;
}
.kongbai {
  height: 80px;
}
</style>
<style>
.el-scrollbar__wrap {
  overflow-x: hidden;
}
.el-form-item.is-required:not(.is-no-asterisk) > .el-form-item__label:before {
  content: "";
  color: #f56c6c;
  margin-right: 4px;
}
.el-form-item__label {
  padding: 0;
}
</style>


