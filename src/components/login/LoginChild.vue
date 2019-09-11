<template>
    <div>
        <div class="login-form" style="position:relative">
            <h1>Sign In</h1>
            <div class="login-form-username">
                <i></i>
                <input class="login-form-username-input" v-model="loginForm.username" autocomplete="false" placeholder="用户名"/>
            </div>
            <div class="login-form-password">
                <i></i>
                <input class="login-form-password-input" v-model="loginForm.password" type="password" autocomplete="false" placeholder="密码" />
            </div>
            <div class="login-submit">
                <button class="login-submit-button" @click="submitForm">登&nbsp;&nbsp;&nbsp;&nbsp; 录</button>
                <router-link class="register-link" to="/register"><h4>立即注册</h4></router-link>

            </div>

        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            loginForm:{
                username:"",
                password:""
            }
        }
    },
    methods:{
        submitForm(formName){
            // const self = this;
            let promise = this.$post('/login/',this.loginForm);
            promise.then(response => {
                this.$router.push({path: "/home/data-import"});
                this.$message({
                    message: "登录成功！",
                    type: "success",
                    showClose: true,
                    duration: 1500
                });
                let token = response.token;
                localStorage.setItem("token",token);
                localStorage.setItem("username",this,loginForm.username);
                 
        });
    }
}
}
</script>
<style scoped>
.login-form{
    display: flex;
    justify-content: center;
    flex-direction: column;
}
.login-submit{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.login-submit-button{
    height: 40px;
    width: 60%;
    border:none;
    border-radius: 20px;
    margin: 20px 0;
}
.login-form h1{
    letter-spacing: 2px;
    color: #333;
    font-size: 40px;
}
.login-form-username-input{
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
.login-form-password-input{
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
    transition: all .3s ease-in-out;
}
.login-form-username-input:focus{
    outline: none;
}
.login-form-username-input::-webkit-input-placeholder{
    color: #d7d7d7;
}
.login-form-password-input::-webkit-input-placeholder{
 color: #d7d7d7;
}
.login-form-password-input:focus{
    outline: none;
}
.login-submit-button{
    font-size: 20px;
    font-weight: 900;
    color: azure;
    background-image: linear-gradient(-20deg,#1d8fe1 0%, #21d4fd 100%);
}
.login-submit-button:hover{
    cursor: pointer;
    transition: all .3s ease-in-out;
    box-shadow: #d7d7d7 0 4px 10px 0;
    opacity: 1;
    transform:scale(1.01,1.01);
    outline: none;

}
.login-submit-button.focus{
    outline: none;
}
.register-link{
    text-decoration: none;
    color: #666;
    

}
</style>