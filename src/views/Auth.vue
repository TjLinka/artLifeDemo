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
        Введен неправильно логин или пароль!
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
        <form method="post">
          <div class="custom_input login_input" v-show="!value2">
            <input type="number" name="login" id="login" required v-model="log.login_ID" />
            <label for="login">ID</label>
            <span class="clear_icon" @click="clearInput('login_ID')"></span>
          </div>
          <div class="custom_input login_input"  v-show="value2">
            <input type="text"
            v-mask="'+###############'"
            name="login" id="login" required v-model="log.login_phone" />
            <label for="login">Телефон в международном формате</label>
            <span class="clear_icon" @click="clearInput('login_phone')"></span>
          </div>
          <div  class="custom_input password_input">
            <input type="password" name="password" id="password" required v-model="log.password" />
            <label for="password">Пароль</label>
            <span class="clear_icon" @click="clearInput('password')"></span>
          </div>
          <vue-recaptcha
            ref="recaptcha"
            size="invisible"
            :sitekey="sitekey"
            @verify="sf"
            @expired="onCaptchaExpired"
          />
          <button class="btn__login" type="submit" @click.prevent="sf">Войти</button>
        </form>
      </div>
      <div class="auth__page__help">
        <p>Забыли пароль? <router-link to="/remind-password"
        class="remind_link">Напомнить</router-link></p>
      </div>
    </div>
  </div>
</template>

<script>
import VueRecaptcha from 'vue-recaptcha';
import md5 from 'md5';
import { mapActions } from 'vuex';
import $ from 'jquery';

export default {
  name: 'Home',
  components: {
    VueRecaptcha,
  },
  data() {
    return {
      value2: false,
      badLogin: false,
      sitekey: '6LdD2c8aAAAAAOQXfujlkoLbR_bQyxI4kKLifnCU',
      log: {
        login: '',
        password: '',
      },
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
    validate() {
      this.$refs.recaptcha.execute();
    },
    onCaptchaExpired() {
      this.$refs.recaptcha.reset();
    },
    sf(recaptchaToken1) {
      if ((this.log.login_ID !== '' || this.log.login_ID !== null)
      && (this.log.password !== '' || this.log.password !== null)
      ) {
        $('.login_input, .password_input').removeClass('error');
        let data = {};
        if (!this.value2) {
          data = {
            login: this.log.login_ID,
            pwd_hash: md5(this.log.password),
            authMethod: this.value2,
            recaptchaToken: recaptchaToken1,
          };
        } else {
          data = {
            phone: this.log.login_phone.replace(/[-,(,),+]/g, ''),
            pwd_hash: md5(this.log.password),
            authMethod: this.value2,
            recaptchaToken: recaptchaToken1,
          };
        }
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
      if (this.log.login_ID === '') {
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
.remind_link{
  color: #32AAA7;
}
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
  &:nth-of-type(2){
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
