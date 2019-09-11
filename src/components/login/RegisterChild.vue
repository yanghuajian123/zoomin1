<template>
    <div>
        <div class="register-form" style="position:relative">
            <h1>Sign Up</h1>
            <div class="register-form-username">
                <i></i>
                <input class="register-form-username-input" v-model="registerForm.username" autocomplete="false" placeholder="用户名"/>
            </div>
            <div class="register-form-password">
                <i></i>
                <input class="register-form-password-input" v-model="registerForm.password" type="password" autocomplete="false" placeholder="密码" />
            </div>
            <div class="register-submit">
                <button class="register-submit-button" @click="submitForm">注&nbsp;&nbsp;&nbsp;&nbsp;册</button>
                <router-link class="login-link" to="/login"><h4>立即登录</h4></router-link>

            </div>

        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            registerForm:{
                username:"",
                password:""
            }
        }
    }
}
</script>
<style scoped>
.register-form{
    display: flex;
    justify-content: center;
    flex-direction: column;
}
.register-submit{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.register-submit-button{
    height: 40px;
    width: 60%;
    border:none;
    border-radius: 20px;
    margin: 20px 0;
}
.register-form h1{
    letter-spacing: 2px;
    color: #333;
    font-size: 40px;
}
.register-form-username-input{
    width: 80%;
    height: 40px;
    padding:0 10%;
    margin: 20px 0;
    border: none;
    border-bottom: #999 2px solid;
    border-radius: 6px;
    color: #999;
    font-size: 20px;
    font-weight: 900;
    background-color: transparent;
}
.register-form-password-input{
    width: 80%;
    height: 40px;
    padding:0 10%;
    margin: 20px 0;
    border: none;
    border-bottom: #999 2px solid;
    border-radius: 6px;
    color: #999;
    font-size: 20px;
    font-weight: 900;
    background-color: transparent;
}
.register-submit-button{
    font-size: 20px;
    font-weight: 900;
    color: azure;

    background-image: linear-gradient(-20deg, rgba(183, 33, 255, 0.73) 0%, #21d4fd 100%);
}
.login-link{
    text-decoration: none;
    color: #666;
    

}
</style>