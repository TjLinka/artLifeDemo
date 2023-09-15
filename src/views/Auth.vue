<template>
  <div class="container-md">
    <div class="auth__page">
      <div class="mobile_logo text-center">
        <img src="../assets/imgs/logo_1.png" alt="Артлайф" />
      </div>
      <h1 class="text-center mb-5">
        {{ $t('Авторизация') }}
      </h1>
      <h4 class="text-center mb-5 error_log" v-if="badLogin">
        {{ $t('Логин или пароль введён неверно') }} !
      </h4>
      <h4 class="text-center mb-5 error_log" v-if="isTerm">
        {{ $t('Данный Агент терминирован, если это ошибка - обратитесь к сотрудникам Компании') }} !
      </h4>
      <h4 class="text-center mb-5 error_log" v-if="isLVL1">
        {{
          $t(
            'К сожалению, у Вас нет возможности начать работу в ЛК Партнёра, так как при регистрации личного кабинета на сайте Вы отказались от статуса Партнёра.',
          )
        }}
        <br />
        {{
          $t(
            `В случае, если Вы захотите принять участие в программе и стать Партнёром компании \"Артлайф\"`,
          )
        }}
        <br />
        {{
          $t(
            `необходимо в личном кабинете на сайте www.artlife.ru дать согласие на участие в партнёрской программе.`,
          )
        }}
      </h4>
      <div class="auth__page__form">
        <form method="post" @submit.prevent="sf" class="auth_form">
          <g-switch
            style="margin: 0 auto;"
            :not_active_value="'ЛОГИН ID'"
            :active_value="'ЛОГИН ТЕЛЕФОН'"
            v-model="value2"
          />
          <g-input
            class="mt-4"
            :id="'login_id'"
            :placeholder="'ID'"
            :type="'number'"
            v-model="log.login_ID"
            v-show="!value2"
          />
          <g-phone-input class="mt-4" v-show="value2" v-model="log.login_phone" />
          <g-input
            class="mt-4"
            :id="'password'"
            :placeholder="'Пароль'"
            :type="'password'"
            v-model="log.password"
          />
          <g-button class="mt-5" primary>
            Войти
          </g-button>
        </form>
      </div>
      <div class="auth__page__help">
        <p>
          {{ $t('Забыли пароль?') }}
          <router-link to="/remind-password" class="remind_link">
            {{ $t('Напомнить') }}
          </router-link>
        </p>
      </div>
    </div>
    <vue-recaptcha
      ref="recaptcha"
      size="invisible"
      :sitekey="sitekey"
      @verify="sf"
      @expired="onCaptchaExpired"
    />
  </div>
</template>

<script>
import VueRecaptcha from 'vue-recaptcha';
import md5 from 'md5';
import { mapActions } from 'vuex';
import $ from 'jquery';
import backAPI from '../assets/backApi';
import GSwitch from '../components/Forms/GSwitch.vue';
import GInput from '../components/Forms/GInput.vue';
import GButton from '../components/Forms/GButton.vue';
import GPhoneInput from '../components/Forms/GPhoneInput.vue';

export default {
  name: 'Home',
  components: {
    VueRecaptcha,
    GSwitch,
    GInput,
    GButton,
    GPhoneInput,
  },
  data() {
    return {
      value2: false,
      badLogin: false,
      isTerm: false,
      isLVL1: false,
      isPassHide: true,
      sitekey: '6LdD2c8aAAAAAOQXfujlkoLbR_bQyxI4kKLifnCU',
      log: {
        login: '',
        password: '',
      },
    };
  },
  metaInfo() {
    return {
      title: `${this.$t('ЛК Партнера')} - ${this.$t('Авторизация')}`,
    };
  },
  methods: {
    // eslint-disable-next-line consistent-return
    checkInput(e) {
      console.log(e.which);
      if (
        e.which === 189
        || e.which === 109
        || e.which === 107
        || e.which === 187
        || e.which === 190
        || e.which === 191
        || e.which === 188
        || e.which === 110
      ) {
        // eslint-disable-next-line no-restricted-globals
        e.preventDefault();
        return false;
      }
    },
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
        [h('strong', { class: 'mr-2' }, title)],
      );
      // Pass the VNodes as an array for message and title
      this.$bvToast.toast([vNodesMsg], {
        title: [vNodesTitle],
        solid: true,
        variant: status,
      });
    },
    ...mapActions('auth', ['login']),
    validate() {
      this.$refs.recaptcha.execute();
    },
    onCaptchaExpired() {
      this.$refs.recaptcha.reset();
    },
    sf(recaptchaToken1) {
      if (
        (this.log.login_ID !== '' || this.log.login_ID !== null)
        && (this.log.password !== '' || this.log.password !== null)
      ) {
        $('.login_input, .password_input').removeClass('error');
        let params = {};
        if (!this.value2) {
          params = {
            id: Number(this.log.login_ID),
            password: this.log.password,
          };
          backAPI
            .post('/api/Agent/login', params)
            .then((resp) => {
              console.log('Good Login');
              const data = JSON.stringify(resp.data);
              const token = resp.data.access_token;
              localStorage.setItem('access_token', data);
              backAPI.backAPI.defaults.headers.common['access-token'] = `Bearer ${token}`;
              backAPI.backAPI.defaults.headers.common.Authorization = `Bearer ${token}`;
              this.login(resp).then(() => {
                this.badLogin = false;
                this.$router.push('/');
              });
            })
            .catch((error) => {
              console.log('error');
              if (!error.response) {
                this.isTerm = false;
                this.badLogin = true;
                return;
              }
              if (error.response.data.detail === 'LVL1') {
                this.isLVL1 = true;
                this.isTerm = false;
                this.badLogin = false;
                return;
              }
              if (error.response.data.detail.toLowerCase() === 'agent is terminated') {
                this.isTerm = true;
                this.badLogin = false;
                this.isLVL1 = false;
              } else {
                this.isTerm = false;
                this.badLogin = true;
                this.isLVL1 = false;
              }
            });
        } else {
          params = {
            phone: this.log.login_phone.replace(/[-,(,),+]/g, ''),
            pwd_hash: md5(this.log.password),
            authMethod: this.value2,
            recaptchaToken: recaptchaToken1,
          };
          backAPI
            .post('/agent/login/phone', params)
            .then((resp) => {
              const data = JSON.stringify(resp.data);
              const token = resp.data.access_token;
              localStorage.setItem('access_token', data);
              backAPI.defaults.headers.common['access-token'] = token;
              this.login(resp).then(() => {
                this.badLogin = false;
                this.$router.push('/');
              });
            })
            .catch((error) => {
              if (!error.response) {
                this.isTerm = false;
                this.badLogin = true;
                return;
              }
              if (error.response.data.detail === 'LVL1') {
                this.isLVL1 = true;
                this.isTerm = false;
                this.badLogin = false;
                return;
              }
              if (error.response.data.detail.toLowerCase() === 'agent is terminated') {
                this.isTerm = true;
                this.badLogin = false;
                this.isLVL1 = false;
              } else {
                this.isTerm = false;
                this.badLogin = true;
                this.isLVL1 = false;
              }
            });
        }
      }
      $('.login_input, .password_input').removeClass('error');
      if (this.log.login_ID === '') {
        $('.login_input').addClass('error');
        this.showToast('Ошибка!', `${this.$t('Заполните поле Логин')}`, 'danger');
      }
      if (this.log.password === '') {
        $('.password_input').addClass('error');
        this.showToast('Ошибка!', `${this.$t('Заполните поле Пароль')}`, 'danger');
      }
    },
    showPass() {
      // console.log(this.$refs.password.getAttribute('type'));
      if (this.$refs.password.getAttribute('type') === 'password') {
        // console.log('1');
        this.isPassHide = false;
        this.$refs.password.setAttribute('type', 'text');
      } else {
        // console.log('2');
        this.isPassHide = true;
        this.$refs.password.setAttribute('type', 'password');
      }
    },
  },
  computed: {},
};
</script>

<style lang="scss" scoped>
.auth_form {
  width: 80%;
}
.remind_link {
  color: #32aaa7;
}
.error_log {
  color: red;
}
.error {
  border-bottom: 2px solid red;
}
.mobile_logo {
  display: none;
}
.custom_input {
  width: 60%;
  & input {
    font-size: 20px;
  }
  &:nth-of-type(1) {
    margin-bottom: 30px;
  }
  &:nth-of-type(2) {
    margin-bottom: 30px;
  }
  & label {
    left: 5px;
    font-size: 18px;
  }
}
.switch {
  width: 80%;
}
.auth__page {
  // margin-left:-200px;
  &__form {
    & form {
      width: 40%;
      display: flex;
      margin: 0 auto;
      flex-direction: column;
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
  .auth__page {
    h1 {
      font-size: 24px;
    }
    form {
      .custom_input {
        width: 100%;
      }
      .btn__login {
        width: 100%;
      }
    }
  }
}
@media (max-width: 575px) {
  .auth__page__copy {
    display: none;
  }
  .mobile_logo {
    display: block;
    margin-bottom: 50px;
  }
}
</style>
