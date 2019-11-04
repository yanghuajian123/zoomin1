<template>
<el-aside :style="{width:width + 'px'}" class="taskdetail-aside">
    <div class="openAndClose" @click="toggleShow">
        <img src="../../common/iconf/caidan.svg" width="15px" aria-hidden="true">
    </div>
    <div class="aside-shaowBorder"  v-show="isShow">
        <div class="aside-warp">
            <vue-scroll :ops="ops">
               <div style="width:100%;height:100%;">
                <div class="aside-search">
                     <el-select v-show="!isShrink" value-key="id" filterable placeholder="搜索任务" style="padding:5px" v-model="taskQueryName" @change="change(taskQueryName)">
                         <el-option v-for="item in detailTaskInfo" :key="item.id" :label="item.task_name" :value="item">

                         </el-option>
                     </el-select>

                </div>            
     <hr style="height:1px;border:none;border-top:1px solid #ccc">
     <div>
         <ul class="aside-warp__menu">
             <li v-for="(task,index) in detailTaskInfo" :key="index" :class="activeNumber == task.id ? 'active': '' ">
                 <router-link :to="`/home/task-detail/${task.id}`">{{task.task_name}}</router-link>
                 <el-dropdown style="position:absolute; right:20px">
                     <span class="el-dropdown-link">
                          <!-- <i class="el-icon-more pointer"></i> -->
                          <img src="../../common/iconf/more.svg" width="20px">
                     </span>
                      <el-dropdown-menu slot="dropdown" style="margin:-10px 0!important">
                      <el-dropdown-item @click.native="deleteTask(task.id)">删除</el-dropdown-item>
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
export default {
    props:{
        task:"",
        active:"",
        taskInfo:""
    },
    data(){
        return{
            isShow:true,//侧边栏默认显示
            ops:ops,
            isShrink:false,//搜索栏
            detailTaskInfo:this.taskInfo,//详情任务
            toggleTitle:"隐藏侧边栏",//侧边栏标题
            activeNumber:Number,//任务详情和图标详情切换
            titleIndex:1,
            value:"",
            tableJsons:null,
            id:0,
            taskQueryName:{
                id:"",
                task_name:""
            },
            newTaskDetail:{
                newTaskName: "",
        newTaskDesc: "",
        newTaskFile: "",
        newTaskTitle: ""
            }
        }
    },
    //计算宽度
     computed: {
    width() {
      if (this.isShow) {
        return 275;
      } else {
        return 10;
      }
    }
  },
    created(){
        this.getTask();
    },
    methods:{
        //获取列表
        getTask(){
            let query = this.$get("/taskinfo/");
            query.then(res =>{
                this.detailTaskInfo = res;
                this.activeNumber = this.$route.params.id;
                if(this.activeNumber == undefined){
                    this.activeNumber = this.detailTaskInfo[0].id;
                }
            })
        },
        //详情放到路由里
        taskDetailInfo(id){
            this.$router.push({name:"task-detail" , params:{id:id}});
        },
        //设置index
        setTitleIndex(index){
            this.titleIndex = index;
        },
        //删除任务
        deleteTask(id){
            this.$toDelete("/taskinfo" + id + "/").then(res => {
                if(this.activeNumber == id){
                    this.activeNumber = undefined;
                }
                this.getTask();
                // console.log(res);//测试
            })
        },
        //侧标烂显示
        toggleShow(){
            this.isShow =  !this.isShow;
        },
        //搜索框改变
        change(task){
            this.$router.push(`/home/task-detail/${task.id}`);
        }
    },
    watch:{
        //监听路由变化而作出响应
        $route(to,from){
            this.activeNumber = to.params.id;
        },
        active:{
            immediate:true,
            handler(val){
                this.activeNumber = val;
            }
        },
        taskInfo:{
            immediate:true,
            deep:true,
            handler(val){
                this.detailTaskInfo = val;
            }
        }
    }

    
}
</script>
<style lang="scss" scoped>
.taskdetail-aside{
overflow: hidden;
position: relative;
// height: 100%;
padding-right: 20px;
margin-top: 10px;
box-sizing: border-box;
}
.aside-shaowBorder{
    border: 1px solid white;
    // padding-left: 5px;
    -webkit-box-shadow:0 2px 12px 0 rgba(0,0,0,0.2);
    box-shadow: 0 2px 12px 0 rgba(0,0,0,0.2);
    position: relative;
    height: 100%;
    overflow:hidden;
    border-radius: 10px;
}
.aside-warp{
    position: relative;
    height: 100%;
    background-color: #fff;
    padding:0;
    overflow: unset;

}
.aside-search{
    display: flex;
  align-items: center;
  justify-content: center;
}
.aside-warp__menu{
    list-style: none;
    padding:0;
    margin:0;
}
.aside-warp__menu li{
     line-height: 30px;
  padding: 5px 50px;
  overflow: hidden;
  display: block;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 275px;
//   border-bottom:thin solid;
  margin-top: 1px;
  
}
.aside-warp__menu li:hover{
    cursor: pointer;
  color: var(--yt-primary-color);
  background-color: #ebebeb;
//   transform: scale(1.01,1.01);
}
.openAndClose {
  cursor: pointer;
  position: absolute;
  right: 0px;
  color: #777;
  z-index: 999;}
a{
    text-decoration: none;
    color:#666;
}
</style>