<template>
<el-container>
    <el-container>
        <el-main>
            <div calss="NewTask">
                <NewTask></NewTask>
            </div>
<div class="OldTask">
    <OldTask></OldTask>
</div>
        </el-main>
    </el-container>
    </el-container>
</template>
<script>
import OldTask from "../components/dataimport/OldTask"
import NewTask from "../components/dataimport/NewTask"
export default {
    data(){
        return{

        }
    },
    created(){
        this.$store.commit("changeIndex",{index:"dataImport"})
    },

    components:{
        OldTask,
        NewTask

    }
}
</script>
<style lang="scss" scoped>
* , body{
    padding: 0;
    margin: 0;
    min-width: 700px;
}
body{
    max-width: 100%;
    overflow: auto;
}

</style>