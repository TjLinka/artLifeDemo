<template>
  <div class="container-fluid p-0">
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand to="/"><h3>Artlife</h3></b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse v-if="is_authorized" id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <div class="d-lg-flex">
            <b-nav-item-dropdown text="Профиль" right>
              <b-dropdown-item to="/">Карточка партнера</b-dropdown-item>
              <b-dropdown-item to="/sponsorcard" v-if="role !== 'Клиент'">
              Данные спонсора
              </b-dropdown-item>
              <b-dropdown-item to="/indicators" v-if="role !== 'Клиент'">
              Показатели
              </b-dropdown-item>
              <b-dropdown-item to="/myinfoedit">Редактирование личных данных</b-dropdown-item>
              <b-dropdown-item v-if="role === 'Клиент'"
              to="/client-bonus">Количество бонусных баллов</b-dropdown-item>
            </b-nav-item-dropdown>
            <b-nav-item-dropdown text="Структура" right>
              <b-dropdown-item to="/organization-period" v-if="role !== 'Клиент'">
              Организация текущего периода
              </b-dropdown-item>
              <b-dropdown-item to="/organization-by-period" v-if="role !== 'Клиент'">
              История организации по периодам
              </b-dropdown-item>
              <b-dropdown-item to="/sponsorcard">Данные спонсора</b-dropdown-item>
            </b-nav-item-dropdown>
            <b-nav-item-dropdown text="Маркетинг" right v-if="role !== 'Клиент'">
              <b-dropdown-item to="/transfert" v-if="role !== 'Клиент'">Трансферт</b-dropdown-item>
              <b-dropdown-item to="/points-history" v-if="role !== 'Клиент'">
              История баллов
              </b-dropdown-item>
              <b-dropdown-item to="/bonus-history" v-if="role !== 'Клиент'">
              История бонусов
              </b-dropdown-item>
            </b-nav-item-dropdown>
            <b-nav-item-dropdown text="Лицевой счёт" right>
              <b-dropdown-item to="/account-detail">Движение по лицевому счету</b-dropdown-item>
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
            <b-dropdown-item to="/">Профиль</b-dropdown-item>
            <b-dropdown-item v-on:click="out">Выйти</b-dropdown-item>
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
    ...mapState('auth', ['is_authorized', 'agentname', 'role']),
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
