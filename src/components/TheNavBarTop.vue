<template>
  <div class="container-fluid p-0">
    <b-navbar toggleable="lg" type="dark" variant="grey"
    :class="this.$route.path === '/login' ? 'auth_page': 'main_color'">
      <b-navbar-brand to="/" v-if="this.$route.path === '/login'">
      <img src="../assets/imgs/lc.png" alt="" srcset=""></b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse v-if="is_authorized" id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <div class="d-lg-flex">
          </div>
          <b-nav-item-dropdown right>
            <template v-slot:button-content>
              <em>{{ agentname }}</em>
            </template>
            <b-dropdown-item to="/">{{agentname}}</b-dropdown-item>
            <b-dropdown-item disabled>
              <span>Статус</span><br>
              <span>{{role}}</span>
            </b-dropdown-item>
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
  name: 'TheNavBarTop',
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
  mounted() {
    console.log(this.$route);
    const navP = document.getElementsByClassName('nav_parent');
    let nav = '';
    // eslint-disable-next-line no-restricted-syntax
    for (nav of navP) {
      // eslint-disable-next-line prefer-arrow-callback
      // eslint-disable-next-line no-loop-func
      nav.addEventListener('click', function () {
        if (this.classList.contains('active')) {
          this.classList.remove('active');
        } else {
          console.log(this.parentNode.parentNode.children);
          // eslint-disable-next-line no-restricted-syntax
          for (const i of this.parentNode.parentNode.children) {
            i.firstChild.classList.remove('active');
          }
          this.classList.add('active');
        }
      });
    }
    const links = document.getElementsByClassName('sub_menu');
    // eslint-disable-next-line no-restricted-syntax
    for (const link of links) {
      // eslint-disable-next-line prefer-arrow-callback
      link.addEventListener('click', function () {
        this.parentNode.firstChild.classList.remove('active');
      });
    }
  },
};
</script>

<style scoped>
.auth_page{
    background-color: #F0F0F0;
}
.main_color{
    background-color: #32AAA7;;
}
li[role='presentation']{
  border-bottom: 1px solid lightgray
}
</style>
<style>
.dropdown-menu{
  width: 300px;
  padding: 0;
}
</style>
