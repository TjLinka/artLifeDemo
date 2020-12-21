<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <p>Ваша почта подтверждена</p>
        <p>super@mail.ru</p>
      </div>
    </div>
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

<style lang="scss" scoped>
.col{
  & p:nth-of-type(1){
      text-transform: uppercase;
      font-weight: 500;
    }
  }
</style>
