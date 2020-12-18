<template>
  <div>
    Ваша почта ...
  </div>
</template>

<script>
import backApi from '../assets/backApi';

export default {
  name: 'MailChange',
  mounted() {
    backApi
      .post('/agent/change-mail-end', {
        hash_content: this.$route.params.mail_hash,
      })
      .then(() => {
      });
  },
};
</script>

<style></style>
