<template>
    <el-container>
        <el-container>
            <el-main>
                <el-tabs v-model="activeName" @tagClick="handleClick">
                    <el-tab-pane label="任务详情">          
                        <el-form-item label="任务名：">
                            <el-col :span="12">
                                <el-input v-model="form.taskName"></el-input>
                            </el-col>
                        </el-form-item>
                         <el-form-item label="创建时间：">
                            <el-col :span="12">
                                <el-input v-model="form.createTime"></el-input>
                            </el-col>
                        </el-form-item>
                         <el-form-item label="属性：">
                            <el-col :span="12">
                                <el-input v-model="form.taskType"></el-input>
                            </el-col>
                        </el-form-item>
                         <el-form-item label="创建者：">
                            <el-col :span="12">
                                <el-input v-model="form.author"></el-input>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="编辑者：">
                            <el-col :span="12">
                                <el-input v-model="form.editor"></el-input>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="备注：">
                            <el-col :span="12">
                                <el-input type="textarea" :rows="5" v-model="from.remarks"></el-input>
                            </el-col>
                        </el-form-item>
                        <el-form-item>
                            <el-col :span="12">
                                <el-button type="primary" @click="updateTask">保存</el-button>
                            </el-col>
                        </el-form-item>                                                   
                    </el-tab-pane>
                    <el-tab-pane label="图表详情" name="second"></el-tab-pane>
                </el-tabs>
            </el-main>
        </el-container>
    </el-container>
</template>
<script>
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
            }
        }
    },
    methods:{
        //获取taskinfo
        getTask(){
            let query = this.$get("/taskinfo/");
            query.then(res =>{
                this.taskInfo = res;
            })
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
            this.put("/taskinfo/" + this.id + "/",{
                task_name:this.form.taskName,
                task_desc:this.form.remarks
            })
            .then(res => {
                this.$message({
                    message:"更新成功",
                    type:"success",
                    showClose:true,
                    duration:1000
                }),
                this.getTask();
            })

        }

    },
    created(){
        this.getTask();
        this.updateDetail(this.$route.params.id);

    }
}
</script>
<style lang="scss" scoped>

</style>