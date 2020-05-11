<template>
  <div class="mine">
    <div class="details-header">
      <div class="module-header">
        <svg @click="handleback" class="icon" aria-hidden="true">
          <use xlink:href="#iconfanhui" />
        </svg>
        <h1>消息通知</h1>
      </div>
    </div>

        <div class="women" v-if="bj2">
          <div class="message" v-for="item in messagedata" :key="item._id">
            <div class="el-icon-message-solid"></div>
            <div class="message-con">
              <div style="font-size:.14rem">系统通知</div>
              <div class="message-size">{{item.message }}</div>
              <div  style="font-size:.13rem">{{item._id|_id}}</div>
            </div>
            <div class="message-rigth">
              <van-button type="danger" size="mini" @click="handledel(item._id)">删除</van-button>
            </div>
          </div>
        </div>
        <div v-if="bj4" class="kong">暂无消息</div>
  </div>
</template>
<script>
import { messageid, messagedel } from "@api/user";
import { addList } from "@api/news";
import {} from "@components/function";
export default {
  name: "message",
  data() {
    return {
      active: "",
      bj:true,
      bj2:true,
      bj3:false,
      bj4:false,
      id: "",
      messagedata: [],
      news:[]
    };
  },
  inject: ["reload"],
  created() {
    this.handleList();
  },
  methods: {
    handleback() {
      this.$router.back();
    },
    async handleList() {
      this.id = sessionStorage.getItem("userid");
      let data = await messageid(this.id);
      this.messagedata = data.data.list;
        if( this.messagedata.length==0){
            this.bj2=false;
            this.bj4=true;
        }
         let id = null;
    },
    async handledel(id) {
      let data = await messagedel(id);
      this.reload();
    }
  }
};
</script>
<style scoped>
.mine {
  height: 100%;
}
.kong{
  width: 100%;
  height: 3rem;
  font-size: .2rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
.details-header {
  display: flex;
  justify-content: space-between;
  z-index: 10;
  background: #fff;
  border-bottom: 1px solid #ebedf0;
}
.module-header {
  height: 0.45rem;
  display: flex;
  justify-content: left;
  align-items: center;
}
.module-header .icon {
  margin: 0.1rem 0.18rem;
  color: #33373d;
}
.module-header h1 {
  font-size: 0.16rem;
  color: #33373d;
  margin-left: 1rem;
}
.message {
  display: flex;
  align-items: center;
  height: 0.8rem;
  border-bottom: 1px solid #ebedf0;
}
.el-icon-message-solid {
  font-size: 0.24rem;
  margin-left: 0.1rem;
}
.el-icon-tickets{
    margin-left: 0.1rem;
}
.message-con {
  margin-left: 0.2rem;
  width: 100%;
}
.message-size {
  font-size: 0.13rem;
  margin-top: 0.05rem;
}
.weidu {
  font-size: 0.2rem;
  height: 0.4rem;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgb(153, 153, 153);
}
.van-button--mini {
  width: 0.4rem;
  height: 0.2rem;
  margin-right: 0.1rem;
}
</style>

