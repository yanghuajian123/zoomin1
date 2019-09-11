<template>
    <div style="width:80%;position:relative">
        <div>
            <router-view></router-view>
        </div>
    </div>
    
</template>
<script>
export default {
    data(){
        return{
            flag:0
        };
    }
}
</script>