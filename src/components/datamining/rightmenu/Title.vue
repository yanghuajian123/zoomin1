<template>
    <div>
        <el-input v-model="input" placeholder="请输入标题" @blur="titleBlur" suffix-icon="el-icon-dit"></el-input>
    </div>
</template>
<script>
import vueBus from "../vueBus";
export default {
    data(){
        return{
            input:""
        }
    },
    methods:{
        titleBlur(){
            vueBus.$emit("titleChange",this.input);
        }
    }
}
</script>
<style lang="scss" scoped>
.titleStyle .el-input__inner{
        border: 1px solid #ffffff;
        border-bottom-color: #dcdfe6;
    }

</style>