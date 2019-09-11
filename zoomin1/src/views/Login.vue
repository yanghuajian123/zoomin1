<template>
    <div class="background">
        <div class="background-wrap">
            <div class="background-wrap-left">
                <img :src="require('../common/image/Login/login1.svg')" width="350px" height="350px">
            </div>
            <div class="background-wrap-right">
                <div class="background-wrap-right-banner">
                    <span>ZoomIn</span>                   
                </div>
                <LoginOrRegister></LoginOrRegister>
            </div>
        </div>
<!-- <Footer></Footer> -->
    </div>
</template>
<script>
import LoginOrRegister from '../components/login/LoginOrRegister'
import Footer from '../base/footer/footer'
export default {
    components:{
        Footer,
        LoginOrRegister
    }
    
}
</script>
<style scoped>
*{
    margin: 0;
    padding: 0;
}
.background{
    height: 100%;
    padding: 0 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    background-image: linear-gradient(to top, #00c6fb 0%,#1d8fe1 48%, #625eb1 100%);
}
.background-wrap{
    width: 950px;
    height: 500px;
    border-radius: 20px;
    display: flex;
    box-shadow: rgba(210, 210, 210, 0.3) 0 10px 50px 0;
    background-image: linear-gradient(to top, #00c6fb 0%,#1d8fe1 48%, #625eb1 100%);
}
.background-wrap-left{
    width: 450px;
    height: 500px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.background-wrap-right{
    width: 450px;
    height: 500px;
    padding: 0 25px;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
    background-color: white;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    /* margin-left: 20px; */
}
.background-wrap-right-banner{
    width: 140px;
    height: 140px;
    border-radius: 0 16px 0 140px;
    display: flex;
    justify-content: center;
    align-items: center;
    right: 0;
    top: 0;
    position: absolute;
    background-image: linear-gradient(-20deg, rgba(183, 33, 255, 0.73) 0%, #21d4fd 100%);
}
.background-wrap-right-banner span{
    color: white;
    font-size: 25px;
    font-weight: 500;
    margin: 0 0 20px 20px;
    -webkit-text-stroke: 0.8px #999;
    background-clip: text;
    text-shadow:0 0 10px #21d4fd ;
}

</style>