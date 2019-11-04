<template>
    <el-container style="height:100%;">
        <TaskDetailLeft class="taskDetail-left" :active="activeIndex" :taskInfo="taskInfo"></TaskDetailLeft>
        <el-container>
            <el-main style="margin-top:10px;padding:0 15% 0 5%;">
                <el-tabs v-model="activeName" class="el-tabs"  @tab-click="handleClick">
                    <el-tab-pane label="任务详情" name="first">    
                        <el-form ref="task-form" :model="form" label-width="100px">      
                        <el-form-item label="任务名：">
                            <el-col :span="12">
                                <el-input v-model="form.taskName"></el-input>
                            </el-col>
                        </el-form-item>
                         <el-form-item label="创建时间：">
                            <el-col :span="12">
                                
                                <el-input :v-model="form.createTime.substr(0,10)" disabled></el-input>
                            </el-col>
                        </el-form-item>
                         <el-form-item label="属性：">
                            <el-col :span="12">
                                <el-input v-model="form.taskType" disabled></el-input>
                            </el-col>
                        </el-form-item>
                         <el-form-item label="创建者：">
                            <el-col :span="12">
                                <el-input v-model="form.author" disabled></el-input>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="编辑者：">
                            <el-col :span="12">
                                <el-input v-model="form.editor"></el-input>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="备注：">
                            <el-col :span="12">
                                <el-input type="textarea" :rows="5" v-model="form.remarks"></el-input>
                            </el-col>
                        </el-form-item>
                        <el-form-item>
                            <el-col :span="12">
                                <el-button @click="backDataImport">返回</el-button>
                                <el-button type="primary" @click="updateTask">保存</el-button>
                            </el-col>
                        </el-form-item>                                                   
                        </el-form></el-tab-pane>
                    <el-tab-pane label="图表详情" name="second"></el-tab-pane>
                </el-tabs>
            </el-main>
        </el-container>
    </el-container>
</template>
<script>
import TaskDetailLeft from "./TaskDetailLeft"
export default {
    //数据名称
    data(){
        return{
            id:"",
            activeName:"first",
            activeIndex:"",
            taskInfo:Array,
            form:{
                
                taskName:"",
                createTime:"",
                author:"不可编辑",
                editor:"",
                remarks:"",
                taskType:"分享任务"
            },

        }
    },
    components:{
        TaskDetailLeft
    },
    methods:{
        //获取taskinfo
        getTask:async function(){
            let query = await this.$get("/taskinfo/");
            // query.then(res =>{
                this.taskInfo = query;
            // })
        },
        //切换详情
        handleClick(tag,event){

        },
        //更新详情
        updateDetail(id){
            this.id = id;
            this.activeIndex = id;
           // 如果为空则结束
            if(id == undefined || id == null){
                return;
            }
            this.$get("/taskinfo/" + id + "/")
            .then(res =>{
                this.form.taskName = res.task_name;
                this.form.createTime = res.add_time;
                this.form.remarks = res.task_desc;
                this.form.author = res.user;
            })
        },
        //保存更新任务
        updateTask(){
            this.$put("/taskinfo/" + this.id + "/",{
                task_name:this.form.taskName,
                task_desc:this.form.remarks
            })
            .then(res => {
                this.$message({
                    message:"更新成功",
                    type:"success",
                    showClose:true,
                    duration:1000
                });
                this.getTask();
            })
            .catch(err =>{
                console.log(shibai);
            })

        },
        //返回首页
        backDataImport(){
            this.$router.push("/home/data-import");
        }

    },
    created(){
        this.getTask();
        this.updateDetail(this.$route.params.id);
    },
    watch:{
        $route(to,from){
            this.id = to.params.id;
            this.updateDetail(this.id);
        }
    }
}
</script>
<style lang="scss" scoped>
.el-tabs{background-color:white;padding:10px;border-radius:10px;}
.taskDetail-left{
    // padding:10px 0 10px 0;
    // padding-top: 5px;
    border-radius: 16px;
}
</style>