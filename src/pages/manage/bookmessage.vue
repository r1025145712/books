<template>
  <div class="booksmessage">
    <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="booksForm fl">
      <el-form-item label="作品名称：" prop="name">
        <div v-if="bj1">{{ruleForm.booksName}}</div>
        <el-input v-if="bj2" v-model="ruleForm.booksName"></el-input>
      </el-form-item>
      <el-form-item label="作品分类：" prop="region">
        <div>{{ruleForm.booksregion+"/"+ruleForm.booksclassify}}</div>
      </el-form-item>
      <el-form-item label="创作日期：" prop="bookday">
        <div>{{ruleForm.booksday}}</div>
      </el-form-item>
      <el-form-item label="总字数：" prop="zishu">
        <div>{{ruleForm.booksTotal|many}}</div>
      </el-form-item>
      <el-form-item label="作品状态：" prop="status">
        <div  v-if="bj1">{{ruleForm.booksStatus}}</div>
         <el-select   v-if="bj2" v-model="ruleForm.booksStatus" placeholder="请选择">
            <el-option label="连载中" value="连载中"></el-option>
            <el-option label="已完结" value="已完结"></el-option>
          </el-select>
      </el-form-item>
      <el-form-item label="作品简介：" v-if="bj1" prop="desc">
        <div>{{ruleForm.booksdesc}}</div>
      </el-form-item>
      <el-form-item label="作者的话：" v-if="bj1" prop="zuozhe">
        <div>{{ruleForm.bookszuozhe}}</div>
      </el-form-item>
      <el-form-item label="作品简介：" v-if="bj2" prop="desc">
        <el-input
          type="textarea"
          :rows="3"
          v-model="ruleForm.booksdesc"
          placeholder="请填写对作品的大致介绍，字数300字以内"
        ></el-input>
      </el-form-item>
      <el-form-item label="作者的话：" v-if="bj2" :rows="3" prop="zuozhe">
        <el-input type="textarea" v-model="ruleForm.bookszuozhe" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item class="el-btn">
        <el-button type="primary" v-if="bj1" size="small" @click="modifyForm">修改作品信息</el-button>
        <el-button type="danger" v-if="bj1" size="small" @click="deletebook">删除作品</el-button>
        <el-button type="primary" v-if="bj2" size="small" @click="saveForm">保存</el-button>
        <el-button v-if="bj2" size="small" @click="cancelForm">取消</el-button>
      </el-form-item>
    </el-form>
    <div class="fr cover">
      <img :src="ruleForm.booksImg" alt />
      <div style="text-align: center;">
        <div tabindex="0" class="el-upload el-upload--text">
          <button
            type="button"
            class="el-button el-button--primary el-button--small button-upload"
            style="margin-top: 10px; width: 120px; margin-bottom: 15px;"
          >
            <span>上传封面</span>
          </button>
          <input type="file" @change="hanldadd" ref="upload" name="file" class="el-upload__input" />
        </div>
      </div>
      <p>封面尺寸：400*560像素</p>
      <p>封面大小：小于1M</p>
      <p>格式要求：JPG/PNG</p>
      <p>其他要求：美观、精致、</p>
      <p>禁止使用违规侵权图片。</p>
    </div>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <div class="el-icon-warning"></div>
      <span style="margin-left:10px">删除之后将无法恢复，确定删除作品?</span>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" size="small" @click="deleteForm('ruleForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  booksDelApi,
  booksMdApi,
  uploadApi,
  booksMdApi2,
  booksList2Api
} from "@api/books";
export default {
  name: "bookmessage",
  data() {
    return {
      dialogVisible: false,
      bj1: true,
      bj2: false,
      id: "",
      ruleForm: {}
    };
  },
  created() {
    this.handleList();
  },
  methods: {
    deletebook() {
      this.dialogVisible = true;
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    async handleList() {
      this.id = this.$route.query.id;
      let data = await booksList2Api(this.id);
      console.log(data);
      this.ruleForm = data.data.list[0];
    },
    async hanldadd() {
      let fd = new FormData();
      fd.append("booksLogo", this.$refs.upload.files[0]); //传文件
      let data = await uploadApi(fd);
      this.ruleForm.booksImg = data.data.urlImage;
      let modify = await booksMdApi2(this.ruleForm);
      if (modify.data.status == 1) {
        this.$message({
          message: modify.data.info,
          type: "success"
        });
      } else {
        this.$message.error(modify.data.info);
      }
    },
    // 修改
    modifyForm() {
      this.bj1 = false;
      this.bj2 = true;
    },
    // 取消
    cancelForm() {
      this.bj2 = false;
      this.bj1 = true;
    },
    // 保存修改
    async saveForm() {
      let data = await booksMdApi(this.ruleForm);

      if (data.data.status == 1) {
        this.$message({
          message: data.data.info,
          type: "success"
        });
        this.bj2 = false;
        this.bj1 = true;
      } else {
        this.$message.error(data.data.info);
      }
    },
    async deleteForm(ruleForm) {
       this.dialogVisible = false;
      let data = await booksDelApi(this.ruleForm._id);
      if (data.data.status == 1) {
        this.$message({
          message: data.data.info,
          type: "success"
        });
        this.$router.push("/home/manage");
      }
    }
  }
};
</script>
<style scoped>
.booksmessage {
  margin-top: 10px;
}
.el-form-item {
  margin-bottom: 12px;
}
.el-icon-warning {
  color: #e6a23c;
}
.el-btn {
  margin-top: 10px;
}
.el-button--primary {
  margin-right: 20px;
}
.booksForm {
  width: 750px;
}

.fl {
  float: left;
}
.cover {
  width: 140px;
  margin-left: 20px;
}
.fr {
  float: left;
}
.cover img {
  width: 140px;
  height: 200px;
  border: 1px solid #ccc;
  display: inline-block;
}
.el-upload {
  display: inline-block;
  text-align: center;
  cursor: pointer;
  outline: none;
  position: relative;
  width: 140px;
  height: 40px;
}
.button-upload {
  position: absolute;
  left: 10px;
  top: 0;
}
.el-upload__input {
  display: block;
  opacity: 0;
  width: 120px;
  height: 32px;
  position: absolute;
  left: 10px;
  top: 10px;
}
.cover p {
  padding-left: 9px;
  font-size: 13px;
  color: #aaa;
  line-height: 24px;
  width: 180px;
  margin-left: -5px;
}
</style>

