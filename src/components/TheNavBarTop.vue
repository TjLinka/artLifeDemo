<template>
  <div class="container-fluid p-0">
    <b-navbar
      type="dark"
      variant="grey"
      :class="is_authorized ? 'main_color' : 'auth_page'"
    >
      <b-navbar-brand to="/" v-if="!is_authorized">
        <img :src="`../icons/${$i18n.locale}lc.png`" alt="" srcset=""
      /></b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse v-if="!is_authorized" id="nav-collapse" is-nav>
        <!-- <a href="https://www.artlife.ru/" class="siteBtn">Перейти на сайт</a> -->
        <b-navbar-nav class="ml-auto">
          <div class="chLangBlock" @click="changeLang">
            <flag v-if="$i18n.locale === 'en'" :iso="'gb'"/>
            <flag v-else :iso="$i18n.locale"/>
          </div>
          <div class="d-lg-flex"></div>
        </b-navbar-nav>
      </b-collapse>
      <b-collapse v-if="is_authorized" id="nav-collapse" is-nav>
        <a href="https://www.artlife.ru/" class="siteBtn">
        {{$t("Перейти на сайт")}}
        </a>
        <b-navbar-nav class="ml-auto">

          <div class="chLangBlock" @click="changeLang">
            <flag v-if="$i18n.locale === 'en'" :iso="'gb'"/>
            <flag v-else :iso="$i18n.locale"/>
          </div>
          <div class="d-lg-flex"></div>
          <b-nav-item-dropdown right>
            <template v-slot:button-content>
              <span class="mr-3 username">{{ agentname }}</span>
              <img class="mb-1" src="../assets/imgs/UserIcon.svg" alt="">
            </template>
            <b-dropdown-item to="/">{{ agentname }}</b-dropdown-item>
            <b-dropdown-item disabled>
              <span><small style="color: grey; font-size: 12px;">
                {{$t("Тип соглашения")}}
                </small></span
              ><br />
              {{role}}
            </b-dropdown-item>
            <b-dropdown-item class="logout" v-on:click="out">
              {{$t("Выйти")}}
            </b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import backAPI from '../assets/backApi';

export default {
  name: 'TheNavBarTop',
  computed: {
    ...mapState('auth', ['is_authorized', 'agentname', 'role', 'self_agreementsystem']),
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
        delete backAPI.defaults.headers.common['access-token'];
        this.$router.push('/login');
      });
    },
  },
  mounted() {
  },
};
</script>

<style lang="scss" scoped>
.chLangBlock{
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.chLangBlock2{
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  color: #e60c0c;
  & span{
    background: white;
    padding: 5px;
    color: #ff0000b3;;
    font-weight: 500;
  }
}
.siteBtn{
  margin-left: 120px;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  text-align: center;
  width: 204px;
  // height: 32px;
  background: #FFFFFF;
  border-radius: 1px;
  color: #32AAA7;
  display: block;
  line-height: 32px;
  // margin-top: 10px;
  position: absolute;
  border: 1px solid #FFFFFF;
}
.username{
  text-transform: uppercase;
  color: white;
}
</style>
<style>
.auth_page {
  background-color: #f0f0f0;
  min-height: 70px;
}
.main_color {
  background-color: #32aaa7;
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
.dropdown-item:hover, .dropdown-item:focus{
  background-color: unset !important;
}
</style>
