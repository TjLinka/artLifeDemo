<template>
  <div class="container-md">
    <div class="auth__page">
      <div class="mobile_logo text-center">
        <img src="../assets/imgs/logo_1.png" alt="Артлайф" />
      </div>
      <h1 class="text-center mb-5">
        Авторизация
      </h1>
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
          <!-- <el-input type="text" placeholder="Логин" v-model="log.login"
          class="log_in" clearable/> -->
          <div class="custom_input">
            <input type="text" name="login" id="login" required v-model="log.login" />
            <label for="login">{{value2 ? 'Телефон' : 'Логин'}}</label>
            <span class="clear_icon" @click="clearInput('login')"></span>
          </div>
          <div  class="custom_input">
            <input type="password" name="password" id="password" required v-model="log.password" />
            <label for="password">Пароль:</label>
            <span class="clear_icon" @click="clearInput('password')"></span>
          </div>
          <!-- <el-input type="password" placeholder="Пароль" v-model="log.password"
          class="log_in" show-password /> -->
          <button class="btn__login" v-on:click.prevent="sf">Войти</button>
        </form>
      </div>
      <div class="auth__page__help">
        <p>Забыли пароль? <a href="#">Напомнить</a> на email</p>
      </div>
      <div class="auth__page__copy">
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Numquam id asperiores quae
          voluptatibus, in quas iste est nemo inventore animi rerum labore dicta maiores voluptate!
          Veniam quaerat voluptates nemo tenetur maiores voluptas, quis minus natus voluptatum
          pariatur illo facilis ut consequatur eos nam animi omnis. Quaerat ab debitis assumenda
          minima voluptatum eius necessitatibus dolor! Impedit ducimus ad ipsam adipisci harum.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import md5 from 'md5';
import { mapActions } from 'vuex';

export default {
  name: 'Home',
  data() {
    return {
      value2: true,
      log: {},
    };
  },
  methods: {
    clearInput(name) {
      this.log[name] = null;
    },
    ...mapActions('auth', ['login']),
    sf() {
      const data = {
        login: this.log.login,
        pwd_hash: md5(this.log.password),
      };
      this.login(data).then(() => {
        this.$router.push('/');
      });
    },
  },
  computed: {},
};
</script>

<style lang="scss" scoped>
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
