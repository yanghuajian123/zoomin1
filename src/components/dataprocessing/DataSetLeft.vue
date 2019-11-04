<template>
  <el-aside :style="{width:width+'px'}" class="warp">
    <div class="openAndClose" @click="toggleShow">
      <img src="../../common/iconf/caidan.svg" width="15px" aria-hidden="true">
    </div>
    <div class="shadow-border" style="overflow:hidden;" v-show="isShow">
      <div class="aside-warp">
        <vue-scroll :ops="ops">
          <div style="width:100%;height:100%;">
            <div class="left-search">
              <el-select v-model="dataSetName" filterable reserve-keyword :placeholder="placeholder" style="padding:5px"  @change="jumpDataSet"> 
                <el-option v-for="item in dataSetList" :key="item.id" :label="item.title" :value="item.id">
       
                </el-option>
              </el-select>
              <el-button circle type="primary" style="margin-right:5px" icon="el-icon-folder-add" size="" @click="newTask"></el-button>
            </div>
            
            <hr style="height:1px;border:none;border-top:1px solid #ccc">
            <div>
              <ul class="my-menu">
                <li v-for="(dataSet) in dataSetList" :key="dataSet.id" :class="dataSet.id==dataSetId?'active':''">
                  <template v-if="target==dataSet.id">
                    <el-input v-model="newTitle" size="mini" style="width:120px" @blur="saveChangeTitle" @keyup.native="keySaveChange($event)" @click.native="stop($event)"></el-input>
                  </template>
                  <router-link v-else :to="`/home/data-processing/${dataSet.id}`">{{dataSet.title}}</router-link>
                  <el-dropdown style="position: absolute;right:20px;">
                    <span class="el-dropdown-link">
                      <i class="el-icon-more pointer" @click="stop($event)"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown" style="margin:-5px 0px 0 0 !important">
                      <el-dropdown-item @click.native="taskDetailInfo()"><i class="el-icon-tickets" style="color:#1d8fe1"></i>任务详情</el-dropdown-item>
                      <el-dropdown-item @click.native="changeTitle(dataSet)"><i class="el-icon-edit" style="color:#1d8fe1"></i>编辑</el-dropdown-item>
                      <el-dropdown-item @click.native="deleteDataSet()"><i class="el-icon-delete" style="color:red;"></i>删除</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </li>
              </ul>
            </div>
          </div>
        </vue-scroll>
      </div>
    </div>
  </el-aside>
</template>
<script>
import ops from "../../utils/scrollOption";
// import Arrow from "../common/Arrow.vue";
export default {
  props: {
    dataSetList: Array,//侧边栏数据集列表
    dataSetId: "",//侧边栏数据集id //跳转任务详情id
    id:"",
  },
  data() {
    return {
      placeholder:"查看数据集",
      dataSetName: "", //数据集名称
      target: "",
      newTitle: "", //修改后新标题
      isShow: true,
      ops: ops,
      // taskId:this.dataSetId

    //   report: {
    //     baseInfo: {}
    //   }
    };
  },
  computed: {
    
    showEdit: {
      get() {
        let showEdit = {};
        this.dataSetList.forEach(element => {
          showEdit[element.id] = false;
        });
        return showEdit;
      },
      set(val) {}
    },
    //侧标烂
    width(){
      if (this.isShow) {
        return 275;
      } else {
        return 10;
      }
    }
  },
  methods: {

      getDataSet(){
         let query = this.$get("/dataSet/");
         query.then(res => {
             this.dataSetList = res;
         })
      },
    initShowEdit() {
      console.log(this.dataSetList);
    },
    newTask(){
      this.$router.push("/home/data-import")
    },
    //跳转当前任务详情
    taskDetailInfo(id) {   
            // this.dataSetId = id; 
            id = this.dataSetId;             
      this.$router.push(`/home/task-detail/${id}`);
    },
    uploadDataSet: function() {
      this.uploadDataSetDialogVisible = false;
      // 上传的方法。
    },
    showDataSet(dataSetId) {
      this.$emit("showDataSet", dataSetId);
    },
    changeTitle(dataSet) {
      this.target = dataSet.id;
      this.newTitle = dataSet.title;
    },
    //修改新标题
    saveChangeTitle() {
      if (this.target == "") {
        return;
      }
      if (this.newTitle == "") {
        this.target = "";
        return;
      }
      let query = this.$post("/task/dataProcessing/changeTitle",{
          data_set_id:this.target,
          new_title:this.newTitle
      });
      
        query.then(() => {
          for (let i = 0; i < this.dataSetList.length; i++) {
            if (this.dataSetList[i].id == this.target) {
              this.$set(this.dataSetList[i], "title", this.newTitle);
              this.target = "";
              return;
            }
          }
        })
        .catch(() => {
          this.target = "";
        });
    },
    keySaveChange(e) {
      if (e.keyCode == 13) {
        this.saveChangeTitle();
      }
    },
    stop(e) {
      e.stopPropagation();
    },
    //跳转指定数据集
    jumpDataSet(id) {
      this.dataSetName = id;
      this.dataSetId = id;
      this.$router.push(`/home/data-processing/${id}`);
    },
    //删除dataset
    deleteDataSet(){      
    },
    showMyTask() {
      this.isShowMyTask = !this.isShowMyTask;
    },
    showShareTask: function() {
      this.isShowShareTask = !this.isShowShareTask;
    },
    //侧边栏隐藏
    toggleShow: function() {
      this.isShow = !this.isShow;
    }
  }
};
</script>
<style scoped>
a {
  text-decoration: none;
  color: #666;
}
.warp {
  overflow: hidden;
  position: relative;
  /* height: 100%; */
  padding-right: 25px;
  box-sizing: border-box;
  margin: 15px 0 15px 15px;
}
.shadow-border {
  height: 100%;
  border: 1px solid #ebeef5;
  -webkit-box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  box-shadow: 10px 12px 12px 0 rgba(0, 0, 0, 0.1);
  border-left: #666;
  position: relative;
  margin-right: 5px;
}
.aside-warp {
  position: relative;
  height: 100%;
  background-color: #fff;
  padding: 0;
  overflow: unset;
}
.hide {
  display: none;
}
.no-btn {
  border: 0px;
  background: none;
}
.my-menu {
  list-style: none;
  padding: 0;
  margin: 0;
}
.my-menu li {
  line-height: 30px;
  padding: 5px 50px;
  overflow: hidden;
  display: block;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 150px;
}
.my-menu li:hover {
  cursor: pointer;
  color: var(--yt-primary-color);
  background-color: #ebebeb;
}
.my-menu li.active {
  background-color: #f5f7fa;
}
.my-menu li.active a{
  color: #409EFF;
}
.left-search {
  display: flex;
  align-items: center;
  justify-content: center;
}
.icon-color {
  color: hsl(0, 5%, 45%);
}
.menu-title {
  padding: 0 30px;
  line-height: 40px;
  justify-content: space-between;
  display: flex;
}
.openAndClose {
  cursor: pointer;
  position: absolute;
  right: 0px;
  color: #777;
  z-index: 999;
}
.openAndClose:hover {
  color: #000;
}
</style>
