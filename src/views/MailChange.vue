<template>
  <div class="container">
    <div class="row" v-if="!errorStatus">
      <div class="col">
        <h2 class="page__title">
          {{$t("Смена адреса почтового ящика")}}
        </h2>
        <p class="p-0 m-0 mt-4">
          {{$t("Ваша почта подтверждена")}}
        </p>
        <p> {{email}} <span class="chval"></span></p>
      </div>
    </div>
    <div class="row" v-else>
      <div class="col">
        <h2 class="page__title">
          {{$t("Такой старницы не существует")}}
        </h2>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import backApi from '../assets/backApi';

export default {
  name: 'MailChange',
  data() {
    return {
      errorStatus: false,
      email: '',
    };
  },
  metaInfo() {
    this.setPageTitle(this.$t('Смена адреса почтового ящика'));
    return {
      title: `${this.$t('ЛК Партнера')} - ${this.$t('Смена адреса почтового ящика')}`,
    };
  },
  mounted() {
    this.email = this.$route.query.email;
    backApi
      .post('/agent/change-mail-end', {
        hash_content: this.$route.params.mail_hash,
      })
      .then(() => {
      })
      .catch(() => {
        this.errorStatus = true;
      });
  },
  methods: {
    ...mapActions('currentPage', ['setPageTitle']),
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
p{
  position: relative;
  font-size: 12px;
  &:nth-of-type(1){
    font-size: 14px;
    font-family: 'FuturaPTDemi';
  }
  &:nth-of-type(2){
    display: inline-block;
    margin-top: 10px;
    font-size: 16px;
  }
}
.chval{
    position: absolute;
    background: url('../assets/imgs/chval.svg') no-repeat;
    width: 12px;
    height: 12px;
    top: 8px;
    right: -40px;
    // top: 80%;
}
</style>
