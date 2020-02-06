<template>
  <div class="important">
    <div class="login" :style="bgImg">
      <div class="logo">
        <img src="../../static/img/logo.png" alt="">
      </div>
      <div class="login_body">
        <img src="../../static/img/title.png" alt="">
        <input :style="userImg" type="text" class="user input" v-model="username"
               placeholder="请输入您的账号">
        <input :style="passImg" type="password" class="password input" v-model="password"
               placeholder="请输入您的密码" @keydown.enter="sub">
        <button class="login_button" @click="sub">登陆</button>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    name: 'Login',
    data() {
      return {
        username: '',
        password: '',
        bgImg: {
          backgroundImage: "url(" + require("../../static/img/bgm.jpg") + ") ",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
        },
        userImg: {
          backgroundImage: "url(" + require("../../static/img/userImg.png") + ") ",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "19px 13px",
          backgroundSize: "12px 17px",
        },
        passImg: {
          backgroundImage: "url(" + require("../../static/img/passImg.png") + ") ",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "19px 13px",
          backgroundSize: "12px 17px",
        },
        msg: '登录页面'
      }
    },
    mounted() {
    },
    methods: {
      sub() {
        let qs = require('qs');
        this.$axios.post('/monitorCon/login', qs.stringify({
          username: this.username,
          password: this.password
        })).then((res) => {
          console.log(res)
          if (res.data.msg === '登录成功') {
            sessionStorage.setItem('userName', res.data.userName)
            sessionStorage.setItem('userId', res.data.userId)
            this.$router.push({
              path: '/index/monitorMsg'
            })
          }
          else if (res.data.msg === '用户名或密码不正确！') {
            alert('用户名或密码不正确！')
          }
        }).catch((err) => {
          console.log('失败了')
        });
      }
    }
  }
</script>

<style scoped>
  .important {
    position: absolute;
    width: 100%;
    height: 100%;
  }

  .login {
    height: 100%;
    width: 100%;
    overflow: hidden;
  }

  .logo {
    width: 215px;
    height: 46px;
    margin: 38px 0 0 47px;
  }

  .login_body {
    margin:14vh 0 0 24vh;
    width: 437px;
    height: 323px;
    background-color: #ffffff;
    border-radius: 3px;
    box-shadow: 0 0 40px 15px rgba(0, 0, 0, 0.1);
  }

  .login_body img {
    width: 228px;
    height: 26px;
    display: inline-block;
    margin: 45px 0 0 93px
  }

  .input {
    height: 43px;
    background-color: #f5f5f5;
    width: 230px;
    margin-left: 75px;
    padding-left: 50px;
    border: none;
    border-radius: 5px;
    font-size: 12px;
  }

  .input::-webkit-input-placeholder {
    font-family: "微软雅黑";
    font-size: 12px;
  }

  .input img {
    display: inline-block;
    width: 12px;
    height: 17px
  }

  .user {
    margin-top: 28px;
  }

  .password {
    margin-top: 12px;
  }

  .login_button {
    width: 278px;
    height: 38px;
    background-color: #5b8cfc;
    outline: none;
    border: none;
    color: #f7f9ff;
    font-size: 16px;
    font-family: "微软雅黑";
    border-radius: 5px;
    margin-left: 75px;
    margin-top: 28px;
    cursor: pointer;
  }

</style>
