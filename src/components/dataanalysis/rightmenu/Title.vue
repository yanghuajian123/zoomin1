<template>
<div>
<el-input  class="titleStyle"  v-model="input" placeholder="请输入标题" suffix-icon="el-icon-edit" @blur="titleBlur"></el-input>
</div>
</template>

<script>
import Bus from "../vueBus"
    export default {
    data() {
        return {
        input: ""
        }
    },
    methods:{
        titleBlur(){
            Bus.$emit('titleChange',this.input)
        }
    }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
