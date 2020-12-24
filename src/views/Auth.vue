<template>
  <div class="container-md">
    <div class="auth__page">
      <div class="mobile_logo text-center">
        <img src="../assets/imgs/logo_1.png" alt="Артлайф" />
      </div>
      <h1 class="text-center mb-5">
        Авторизация
      </h1>
      <h4 class="text-center mb-5 error_log" v-if="badLogin">
        Введён неправильно логин или пароль!
      </h4>
      <div class="auth__page__form">
        <div class="row">
          <div class="col mb-4 text-center switch">
          <div class="auth_switch">
                      <el-switch
          style="display: block"
          v-model="value2"
          active-text="ЛОГИН ТЕЛЕФОН"
          inactive-text="ЛОГИН ID">
        </el-switch>
          </div>
          </div>
        </div>
        <form>
          <div class="custom_input login_input">
            <input type="text" name="login" id="login" required v-model="log.login" />
            <label for="login">{{value2 ? 'Телефон' : 'ID'}}</label>
            <span class="clear_icon" @click="clearInput('login')"></span>
          </div>
          <div  class="custom_input password_input">
            <input type="password" name="password" id="password" required v-model="log.password" />
            <label for="password">Пароль</label>
            <span class="clear_icon" @click="clearInput('password')"></span>
          </div>
          <button class="btn__login" v-on:click.prevent="sf">Войти</button>
        </form>
      </div>
      <div class="auth__page__help">
        <p>Забыли пароль? <a href="#">Напомнить</a> на email</p>
      </div>
    </div>
  </div>
</template>

<script>
import md5 from 'md5';
import { mapActions } from 'vuex';
import $ from 'jquery';

export default {
  name: 'Home',
  data() {
    return {
      value2: false,
      badLogin: false,
      log: {},
    };
  },
  methods: {
    showToast(title, message, status) {
      // Use a shorter name for this.$createElement
      const h = this.$createElement;
      // Increment the toast count
      // Create the message
      const vNodesMsg = h('p', { class: ['text-center', 'mb-0'] }, [
        h('strong', { class: 'mr-2' }, message),
      ]);
      // Create the title
      const vNodesTitle = h(
        'div',
        { class: ['d-flex', 'flex-grow-1', 'align-items-baseline', 'mr-2'] },
        [
          h('strong', { class: 'mr-2' }, title),
        ],
      );
      // Pass the VNodes as an array for message and title
      this.$bvToast.toast([vNodesMsg], {
        title: [vNodesTitle],
        solid: true,
        variant: status,
      });
    },
    clearInput(name) {
      this.log[name] = '';
    },
    ...mapActions('auth', ['login']),
    sf() {
      if (this.log.login !== '' && this.log.password !== '') {
        $('.login_input, .password_input').removeClass('error');
        const data = {
          login: this.log.login,
          pwd_hash: md5(this.log.password),
        };
        this.login(data)
          .then(() => {
            this.badLogin = false;
            this.$router.push('/');
          })
          .catch(() => {
            this.badLogin = true;
          });
      }
      $('.login_input, .password_input').removeClass('error');
      if (this.log.login === '') {
        $('.login_input').addClass('error');
        this.showToast('Ошибка!', 'Заполните поле Логин', 'danger');
      }
      if (this.log.password === '') {
        $('.password_input').addClass('error');
        this.showToast('Ошибка!', 'Заполните поле Пароль', 'danger');
      }
    },
  },
  computed: {},
};
</script>

<style lang="scss" scoped>
.error_log{
  color: red;
}
.error{
  border-bottom: 2px solid red;
}
.mobile_logo{
  display: none;
}
.custom_input{
  width: 60%;
  & input{
    font-size: 20px;
  }
  &:nth-of-type(1){
    margin-bottom: 30px;
  }
  & label{
    left: 5px;
    font-size: 18px;
  }
}
.switch{
  width: 80%;
}
.auth__page {
  // margin-left:-200px;
  &__form {
    & form {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;

      .log_in {
        width: 60%;
        // height: 45px;
        // border: 0;
        // border-bottom: 1px solid lightgray;
        margin-bottom: 50px;
        // outline: none;
      }

      .btn__login {
        width: 60%;
        height: 45px;
        border: 0;
        border-radius: 5px;
        margin-top: 30px;
        background-color: darken($color: cyan, $amount: 15%);
        outline: none;
        color: white;
        font-weight: bold;
      }
    }
  }

  &__help {
    p {
      text-align: center;
      margin-top: 30px;
    }
  }

  &__copy {
    margin-top: 40px;
    text-align: center;
    color: grey;
  }
}
@media (max-width: 768px) {
  .auth__page{
    h1{
      font-size: 24px;
    }
    form{
      .custom_input{
        width: 100%;
      }
      .btn__login{
        width: 100%;
      }
    }
  }
}
@media (max-width: 575px) {
  .auth__page__copy{
    display: none;
  }
  .mobile_logo{
    display: block;
    margin-bottom: 50px;
  }
}
</style>
