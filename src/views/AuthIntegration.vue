<template>
  <div></div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'AuthIntegration',
  mounted() {
    this.logout();
    this.loginIntegration(this.$route.query).then(() => {
      this.$router.push(this.$route.query.redirect_url);
    });
  },
  methods: {
    ...mapActions('auth', ['loginIntegration', 'logout']),
  },
};
</script>

<style></style>
