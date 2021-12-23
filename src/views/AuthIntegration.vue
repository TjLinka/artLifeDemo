<template>
  <div></div>
</template>

<script>
import { mapActions } from 'vuex';
import backAPI from '../assets/backApi';

export default {
  name: 'AuthIntegration',
  mounted() {
    this.logout();
    backAPI
      .post('/agent/login/token', { access_token: this.$route.query.access_token })
      .then((resp) => {
        const data = JSON.stringify(resp.data);
        const token = resp.data.access_token;
        localStorage.setItem('access_token', data);
        backAPI.defaults.headers.common['access-token'] = token;
        this.loginIntegration(resp).then(() => {
          this.$router.push(this.$route.query.redirect_url);
        });
      });
  },
  methods: {
    ...mapActions('auth', ['loginIntegration', 'logout']),
  },
};
</script>

<style></style>
