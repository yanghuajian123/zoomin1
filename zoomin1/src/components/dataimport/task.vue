<template>
  <div class="card">
    <el-card :body-style="{ padding: '0px',height:'250px' }">
      <img
        src="../../common/image/DataImport/task.svg"    
        class="card-image"
        @click="taskDetail"
        title="查看任务详情"
      >
      <div class="card-content">
        <div class="card-content-decoration"></div>
        <div class="card-content-name">任务名：{{taskName}}</div>
        
        <!-- <div class="bottom clearfix"> -->
          <div class="card-content-time">创建时间:{{createTime}}</div>
          <div class="card-content-menu" >
            <el-dropdown>
              <span class="el-dropdown-link">
                <img src="../../common/iconf/more.svg" width="25px" height="25px">
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="$emit('editTask',id)"><img src="../../common/iconf/bianji.svg" width="20px">编辑</el-dropdown-item>
                <el-dropdown-item @click.native="deleteTask(id)"><img src="../../common/iconf/delete.svg" width="20px" >删除</el-dropdown-item>
                <!-- <el-dropdown-item @click.native="deleteTask(taskid)">删除</el-dropdown-item> -->
                <!-- <el-dropdown-item @click.native="$emit('editTask')">分享</el-dropdown-item> -->
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        <!-- </div> -->
      </div>
      <!-- 任务的操作 -->
    </el-card>
  </div>
</template>
<script>
export default {
  props: {
    id: Number,
    taskName: String,
    createTime: String
  },
  data() {
    return {};
  },
  methods: {
    editTask: function(id) {
      //编辑任务名
    },
    // 删除任务
    deleteTask: function(id) {
      let cf = confirm("删除任务后无法恢复，是否删除？");
      if (cf) {
        this.$emit("deleteTask", id);

      }
    },
    taskDetail: function() {
      this.$router.push("/home/task-detail/${this.id}");
    }
  }
};
</script>
<style scoped>
.card{
  border-radius: 20px;
  margin-top: 30px;
}
.card:hover {
  box-shadow: #999 0 5px 20px 5px;
  transform: scale(1.01, 1.01);
}
.card-image{
  width:50%;
  height: 50%;
  padding:8px 25% 0 25%;
  cursor: pointer;
}
.card-content{
  /* float: right; */
  display: flex;
  flex-direction: column;
  justify-items: auto;
   align-content: center;
   padding:14px;
}
.card-content-decoration{
  /* padding:10px 0 10px 0; */
 
  border-radius: 20px;
  height: 5px;
  width: 100%;
  background-image: linear-gradient(300deg, #22e1ff 0%, #1d8fe1 48%, #625eb1 100%);
}
.card-content-name{
  font-size:16px;
  color: #999;
}
.card-content-time {
  font-size: 16px;
  color: #999;
}
.card-content-menu{
  cursor: pointer;
  /* float: right; */
  text-align: right;
  padding-bottom: 10px;
}
.pointer {
  cursor: pointer;
}
.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 80%;
  height: 200px;
  display: block;
  padding: 0 10%;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
.el-main {
  line-height: 18px;
}
</style>

