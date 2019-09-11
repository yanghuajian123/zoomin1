<template>
    <div class="feature-screen"> 
        <img class="feature-screen-img" :src="require('../../common/image/Welcome/banner2.svg')" width="600px" height="600px">
    <div class="feature-screen-info">
        <div>
            <p>这里有最<span style="font-size:larger;color:white;-webkit-text-stroke:1px #d7d7d7">贴心</span>的服务</p>
            <div class="feature-screen-decoration"></div>
            <h3>ZoomIn系统在免费提供一整套的软件层面的数据分析功能后，可以根据用户的高级需求，提供更加个性化、定制化的全套数据挖掘的服务，由专人进行对接，背靠强大的专家团队，提供企业的数据解决方案，实现数据向生产力转换的过程。</h3>

        </div>
        <button class="feature-screen-button">免费试用</button>
    </div>

    </div>
</template>
<script>
export default {
    
}
</script>
<style  scoped>

/* $primary-color:linear-gradient(300deg, #22e1ff 0%, #1d8fe1 48%, #625eb1 100%); ; */
.feature-screen{
    display: flex;
    align-content: center;
    width: 100%;
    height: 600px;
    margin: 0;
    background-image: linear-gradient(to left, #22e1ff 0%, #1d8fe1 100%);

}
.feature-screen-img{
    margin:0 100px;
}
.feature-screen-info p{
    font-size: 48px;
    font-weight: 900;
    cursor: default;
}


.feature-screen-decoration{
    width: 80%;
    height: 8px;
    margin: -30px 0 40px 0;
    border-radius: 20px;
    background-image: linear-gradient(to right,#e6e9f0 0%,#eef1f5 100%);
}
.feature-screen-info{
    width: 600px;
    height: 600px;
    color:rgba(255,255,255,0.90);
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
}
.feature-screen-info h3{
    color: rgba(255,255,255,0.90);
    cursor: default;
}
.feature-screen-button{
    cursor: pointer;
    border: none;
    width: 140px;
    height: 60px;
    border-radius: 20px;
    background-image: linear-gradient(90deg, #1d8fe1 0%, #625eb1 0%);
    font-size: 18px;
    font-weight: 800;
    opacity: 0.8;
    transition: all 0.3s ease-in-out;
    color:#eef1f5;
    margin-top: -100px;
}
.feature-screen-button:hover{
    transition: all 0.3s ease-in-out;
    transform: scale(1.05,1.05);
    opacity: 1;

}
</style>