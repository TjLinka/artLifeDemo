<template>
  <nav class="nav_bar_top shadow-sm">
    <div class="container">
      <div class="navbar_info">
        <div class="current_page">Текущая страница</div>
        <div class="balance">Баланс: 100000</div>
        <div class="date">
          {{ new Date().toLocaleDateString() }}
        </div>
        <div class="period">Период</div>
        <div class="prev_period_status">Статус пред. периода: Не выплачен</div>
        <div class="icons">
          <div class="cart" @click="$router.push('/cart')">
            <img src="../assets/imgs/cart_icon.svg" alt="" />
            <div class="cart_prod_count" v-show="cartProdCount">
              {{ cartProdCount }}
            </div>
          </div>
          <div class="dialog" @click="$router.push('/dialogs')">
            <img src="../assets/imgs/message_icon.svg" alt="" />
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import backAPI from '../assets/backApi';

export default {
  name: 'TheNavBarTop',
  computed: {
    ...mapState('auth', [
      'is_authorized',
      'agentname',
      'role',
      'self_agreementsystem',
      'self_agent_id',
    ]),
    ...mapState('currentPage', ['pageTitle']),
    ...mapGetters('cart', ['cartProdCount']),
  },
  methods: {
    changeLang() {
      if (this.$i18n.locale === 'en') {
        console.log('1');
        localStorage.setItem('locale', 'ru');
        console.log(this.$route);
        this.$router.go(0);
      } else {
        console.log('2');
        localStorage.setItem('locale', 'en');
        console.log(this.$route);
        this.$router.go(0);
      }
    },
    ...mapActions('auth', ['logout']),
    out() {
      this.logout().then(() => {
        delete backAPI.backAPI.defaults.headers.common['access-token'];
        this.$router.push('/login');
      });
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.nav_bar_top {
  padding-left: 120px;
  background: white;
  padding: 20px 0px 20px 120px;
  margin-bottom: 20px;
}
.navbar_info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  & .icons {
    display: flex;
  }
  & .cart {
    position: relative;
    width: 40px;
    height: 40px;
    margin-right: 30px;
    & img {
      cursor: pointer;
    }
    .cart_prod_count {
      display: flex;
      justify-content: center;
      position: absolute;
      top: -5px;
      right: -7px;
      width: 25px;
      height: 25px;
      color: white;
      background: red;
      border-radius: 50%;
    }
  }
  & .dialog {
    width: 35px;
    height: 35px;
    position: relative;
    top: 3px;
    & img {
      cursor: pointer;
    }
  }
}
</style>
<style>
.auth_page {
  background-color: #f0f0f0;
  min-height: 70px;
}
.main_color {
  background-color: #ed8c96;
  padding: 0 !important;
  padding-left: 120px !important;
}
.dropdown-menu {
  padding: 0;
  width: 350px !important;
  top: 125%;
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.16);
}
li[role='presentation'] {
  padding: 10px 15px;
  width: 100%;
  box-sizing: border-box;
  border-bottom: 1px solid #dee2f3;
}
li[role='presentation'] a.dropdown-item {
  font-size: 14px;
  line-height: 16px;
  color: #383a41;
  padding: 5px 0px;
}
.logout {
  background-color: #dee2f3;
}
.logout a {
  background: url('../assets/imgs/exit.svg') no-repeat 100% center;
  display: block;
  color: #9a9a9a;
}
.dropdown-item:hover,
.dropdown-item:focus {
  background-color: unset !important;
}
</style>
