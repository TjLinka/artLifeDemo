<template>
  <div id="app">
    <div class="container-fluid p-0">
      <b-navbar toggleable="lg" type="dark" variant="info">
        <b-navbar-brand href="#"><h3>Artlife</h3></b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav class="ml-auto">
            <div v-if="is_authorized" class="d-lg-flex">
              <b-nav-item-dropdown text="Профиль" right>
                <b-dropdown-item href="#">Lorem, ipsum.</b-dropdown-item>
                <b-dropdown-item href="#">Lorem, ipsum.</b-dropdown-item>
              </b-nav-item-dropdown>
              <b-nav-item-dropdown text="Структура" right>
                <b-dropdown-item href="#">Lorem, ipsum.</b-dropdown-item>
                <b-dropdown-item href="#">Lorem, ipsum.</b-dropdown-item>
              </b-nav-item-dropdown>
              <b-nav-item-dropdown text="Маркетинг" right>
                <b-dropdown-item href="#">Lorem, ipsum.</b-dropdown-item>
                <b-dropdown-item href="#">Lorem, ipsum.</b-dropdown-item>
              </b-nav-item-dropdown>
              <b-nav-item-dropdown text="Лицевой счёт" right>
                <b-dropdown-item href="#">Lorem, ipsum.</b-dropdown-item>
                <b-dropdown-item href="#">Lorem, ipsum.</b-dropdown-item>
              </b-nav-item-dropdown>
              <b-nav-item-dropdown text="История покупок" right>
                <b-dropdown-item href="#">Lorem, ipsum.</b-dropdown-item>
                <b-dropdown-item href="#">Lorem, ipsum.</b-dropdown-item>
              </b-nav-item-dropdown>
            </div>
            <b-nav-item-dropdown right>
              <template v-slot:button-content>
                <em>{{ agentname }}</em>
              </template>
              <b-dropdown-item href="#">Profile</b-dropdown-item>
              <b-dropdown-item href="#" v-on:click="out">Sign Out</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <router-view />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  data() {
    return {};
  },
  created: () => {},
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

<style lang="scss">
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
.navbar {
  background-color: #32AAA7 !important;
  // height: 70px;
}
</style>
