<template>
  <div class="container-fluid p-0">
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="#"><h3>Artlife</h3></b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse v-if="is_authorized" id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <div class="d-lg-flex">
            <b-nav-item-dropdown text="Профиль" right>
              <b-dropdown-item to="/">Карточка партнера</b-dropdown-item>
              <b-dropdown-item to="/sponsorcard">Данные спонсора</b-dropdown-item>
            </b-nav-item-dropdown>
            <b-nav-item-dropdown text="Структура" right>
              <b-dropdown-item to="/organization-period">Организация текущего периода
              </b-dropdown-item>
              <b-dropdown-item to="/organization-by-period">История организации по периодам
              </b-dropdown-item>
            </b-nav-item-dropdown>
            <b-nav-item-dropdown text="Маркетинг" right>
              <b-dropdown-item to="/points-history">История баллов</b-dropdown-item>
              <b-dropdown-item to="/bonus-history">История бонусов</b-dropdown-item>
            </b-nav-item-dropdown>
            <b-nav-item-dropdown text="Лицевой счёт" right>
              <b-dropdown-item to="/account-detail">Движение по лицевому счету</b-dropdown-item>
              <b-dropdown-item to="#">Lorem, ipsum.</b-dropdown-item>
            </b-nav-item-dropdown>
            <b-nav-item-dropdown text="История покупок" right>
              <b-dropdown-item to="/returns-history">История возвартов</b-dropdown-item>
              <b-dropdown-item to="/purchases-history">История покупок</b-dropdown-item>
            </b-nav-item-dropdown>
          </div>
          <b-nav-item-dropdown right>
            <template v-slot:button-content>
              <em>{{ agentname }}</em>
            </template>
            <b-dropdown-item to="#">Profile</b-dropdown-item>
            <b-dropdown-item to="#" v-on:click="out">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'TheNavBar',
  computed: {
    ...mapState('auth', ['is_authorized', 'agentname']),
  },
  methods: {
    ...mapActions('auth', ['logout']),
    out() {
      this.logout().then(() => {
        this.$router.push('/login');
      });
    },
  },
};
</script>

<style scoped lang="scss">
  .navbar {
    background-color: #32aaa7 !important;
  // height: 70px;
  }
</style>
