<template>
  <div
    class="warp"
    v-show="true"
  >
    <!-- 搜索框 -->
    <div class="history-header">
      <div class="history-header-title">
        <span>历史任务</span>
      </div>
      <div class="history-header-input">查询历史数据：
        <el-input
          v-model="historyName"
          clearable
          @input="findHistoryTask"
          placeholder="请输入关键字"
          style="width:200px"
        ></el-input>
      </div>
    </div>
    <div class="history-header-decoration"></div>
    <!-- 历史任务列表 -->
    <div class="history-list">
      <!-- <div v-show="IsEmptyTask">
        <empty-task></empty-task>
      </div> -->
      <el-carousel
        indicator-position="none"
        v-show="!IsEmptyTask"
      >
        <el-carousel-item
          v-for="(tasks,index) in historyTaskList"
          :key="index"
          interval=3000
        >
          <el-col
            :span="renderSpan"
            v-for="(task,index) in tasks"
            :key="index"
            :offset="index==0?2:1"
          >
            <Task
              index
              :taskName="task.task_name"
              :createTime="task.add_time.substring(0,10)"
              :id="task.id"
              v-on:deleteTask="deleteTask"
              v-on:editTask="editTask"
            >
            </Task>
          </el-col>
        </el-carousel-item>
      </el-carousel>
    </div>
    <!--编辑任务框-->
    <el-dialog
      title="编辑任务"
      :visible.sync="editDialogVisible"
      class="editDialog"
    >
      <el-form
        ref="form"
        label-width="80px"
        label-position="left"
      >
        <el-form-item label="任务名:">
          <el-input
            type="text"
            v-model="editDialog.taskName"
          ></el-input>
        </el-form-item>
        <el-form-item label="创建时间:">
          <el-input
            type="text"
            disabled
            v-model="editDialog.createTime"
          ></el-input>
        </el-form-item>
        <el-form-item label="任务描述:">
          <el-input
            type="textarea"
            :rows="4"
            v-model="editDialog.taskDesc"
          ></el-input>
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="editDialog-footer"
      >
        <el-button @click="editDialogVisible = false">取消</el-button>
        <el-button
          type="primary"
          @click="updateTask()"
        >保存</el-button>
      </span>
    </el-dialog>
  </div>

</template>

<script>
import EmptyTask from "./EmptyTask";
import Task from "./Task";
// import { async } from 'q';
export default {
  components: {
    Task,
    EmptyTask
  },
  data() {
    return {
      historyName: "", //查找名字
      newTaskList: [],
      historyTaskList: [], //历史列表
      findHistoryTaskList: [], //查找历史列表
      taskList: [], //刚获取的列表
      isEmptyTask: true,
      renderSpan: 6, //间隔
      clientWidth: document.body.clientWidth,
      taskCarouselCount: 3, //显示个数
      editTaskId: "",
      editDialogVisible: false, //默认编辑框关闭
      //编辑框内容
      editDialog: {
        taskName: "",
        taskDesc: "",
        createTime: ""
      }
    };
  },
  methods: {
    //获取数据
    getTask() {
      let query = this.$get("/taskinfo/");
      query.then(res => {
        // this.historyTaskList = res;
        this.taskList = res;
        this.findHistoryTaskList = res;
        this.dealTask();
      });
    },
    //走马灯
    dealTask() {
      //如果任务列表为空，不执行后面的步骤

      let tasks = []; //临时存储task
      this.historyTaskList = []; //用来渲染的taskList
      let taskCount = this.taskCarouselCount; // 每一个轮播的task个数
      for (var i = 0; i < this.taskList.length; i++) {
        tasks.push(this.taskList[i]);
        if ((i + 1) % taskCount == 0) {
          this.historyTaskList.push(tasks);
          tasks = [];
        }
      }
      if (tasks.length > 0) {
        this.historyTaskList.push(tasks);
      }
      // if (this.newTaskList.length == 0) {
      //   this.IsEmptyTask = true;
      // } else {
      //   this.IsEmptyTask = false;
      // }
    },
    //  debounceHistoryTask(){
    //    this.$deBounce(this.findHistoryTask(),20000);

    // },

    // 快速查询历史
    findHistoryTask() {
      let query = this.historyName;
      let taskList = [];
      this.taskList = this.findHistoryTaskList;
      for (var i = 0; i < this.taskList.length; i++) {
        if (this.taskList[i].task_name.indexOf(query) != -1) {
          taskList.push(this.taskList[i]);
        }
      }
      this.taskList = taskList;
      this.$set(this.taskList, taskList);
      this.dealTask();
    },
    // calculateTaskCount() {
    //   const threeCountWidth = 1600;
    //   const twoCountWidth = 1200;
    //   const oneContWidth = 800;
    //   let width = this.clientWidth;
    //   if (width > threeCountWidth) {
    //     this.taskCarouselCount = 4;
    //     this.renderSpan = 4;
    //   } else if (width <= threeCountWidth && width > twoCountWidth) {
    //     this.taskCarouselCount = 3;
    //     this.renderSpan = 6;
    //   } else if (width <= twoCountWidth && width > oneContWidth) {
    //     this.taskCarouselCount = 2;
    //     this.renderSpan = 8;
    //   } else {
    //     this.taskCarouselCount = 2;
    //     this.renderSpan = 8;
    //   }
    // },
    //编辑任务框
    editTask: async function(id) {
      this.editTaskId = id;
      let query = await this.$get("/taskinfo/" + id + "/");

      this.editDialog.taskName = query.task_name;
      this.editDialog.taskDesc = query.task_desc;
      this.editDialog.createTime = query.add_time.substring(0, 10);

      this.editDialogVisible = true; //打开编辑框
    },
    //编辑任务框更新
    updateTask: async function() {
      // this.editTaskId = id;
      await this.$put("/taskinfo/" + this.editTaskId + "/", {
        task_name: this.editDialog.taskName,
        task_desc: this.editDialog.taskDesc
      });
      // query.then(res => {
      this.$message({
        message: "更新成功",
        type: "success",
        showClose: true,
        duration: 1500
      });
      this.getTask();

      // });
      this.editDialogVisible = false; //关闭编辑框
    },
    //删除任务
    deleteTask(id) {
      let query = this.$toDelete("/taskinfo/" + id + "/");

      query.then(res => {
        this.$message({
          message: "删除成功",
          type: "success",
          showClose: true,
          duration: 1500
        });
        this.getTask();
      });
      // .catch(err =>{
      //   console.log(wrong)
      // })//测试
    }
  },
  created() {
    this.getTask();
  },
  mounted() {
    const that = this;
    window.onresize = () => {
      window.screenWidth = document.body.clientWidth;
      that.clientWidth = window.screenWidth;
    };
    // this.calculateTaskCount();
  },
  watch: {
    clientWidth: {
      handler(value) {
        this.clientWidth = value;
        // this.calculateTaskCount();
        this.dealTask();
      }
    }
  }
};
</script>
<style  scoped>
.warp {
  height: 100%;
  /* display: flex; */
  padding: 20px;
  background-color: white;
  margin: 0 10%;
}
.history-header {
  display: flex;
  color: #999;
  justify-content: space-between;
  margin: 0 10%;
}
.history-header-title {
  font-size: 30px;
  font-weight: 900;
}
.history-header-decoration {
  margin-left: 10%;
  margin-top: 10px;

  /* padding-left: 20px; */
  border-radius: 20px;
  height: 5px;
  width: 80%;
  background-image: linear-gradient(
    300deg,
    #22e1ff 0%,
    #1d8fe1 48%,
    #625eb1 100%
  );
}
.history-list {
  padding: 0 40px;
}
.editDialog {
  width: 100%;
  /* align-items: center; */
  /* position: relative; */
}
.el-main {
  line-height: 40px;
}
</style>