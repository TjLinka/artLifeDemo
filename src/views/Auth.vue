<template>
  <div class="container">
    <div class="auth__page">
      <h1 class="page__title">
        Авторизация
      </h1>
      <div class="auth__page__form">
        <form>
          <input type="text" placeholder="Логин" v-model="log.login" />
          <input type="password" placeholder="Пароль" v-model="log.password" />
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
// import backApi from '../assets/backApi';

export default {
  name: 'Home',
  data() {
    return {
      log: {},
    };
  },
  methods: {
    sf() {
      const data = {
        login: this.log.login,
        pwd_hash: md5(this.log.password),
      };
      this.$store.dispatch('login', data);
    },
  },
  computed: {},
};
</script>

<style lang="scss" scoped>
.auth__page {
  & .page__title {
    text-align: center;
    margin-bottom: 70px;
  }

  &__form {
    & form {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;

      input {
        width: 60%;
        height: 45px;
        border: 0;
        border-bottom: 1px solid lightgray;
        margin-bottom: 30px;
        outline: none;
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
</style>
