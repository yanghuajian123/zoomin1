<template>
  <div>
    <div>&nbsp;</div>
    <el-input class="TipStyle" v-model="input" type="textarea" :autosize="{ minRows: 5, maxRows: 10}"
              :placeholder="icon" suffix-icon="icon-excel"></el-input>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        input: "",
        icon:"请输入备注" 
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
