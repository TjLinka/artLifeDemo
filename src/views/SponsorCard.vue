<template>
  <div class="container-md" v-show="!loading">
    <div class="sponsor__page__description">
      <div class="myfoto">
        <div>
          <img v-if="userInfo.male" src="../assets/imgs/male.png" alt="" />
          <img v-else src="../assets/imgs/female.png" alt="" />
        </div>
        <p>{{ userInfo.fio }}</p>
      </div>
      <div class="container-md top__info">
        <div class="row">
          <div class="col-md-6 mt-4">
            <g-caption :text="userInfo.id" :title="'Номер соглашения'" />
          </div>
          <div class="col-md-6 mt-4">
            <g-caption :text="userInfo.email" :title="'E-mail'" />
          </div>
        </div>
        <div class="row">
          <div class="col-md-6 mt-4">
            <g-caption :text="userInfo.name" :title="'ФИО'" />
          </div>
          <div class="col-md-6 mt-4">
            <g-caption :text="userInfo.skype" :title="'Skype'" />
          </div>
        </div>
        <div class="row">
          <div class="col-md-6 mt-4">
            <g-caption :text="userInfo.phone" :title="'Телефон'" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import GApi from '../assets/backApi';
import GCaption from '../components/Text/GCaption.vue';

export default {
  components: { GCaption },
  name: 'SponsorCard',
  data() {
    return {
      loading: true,
      userInfo: {},
    };
  },
  metaInfo() {
    this.setPageTitle(this.$t('Данные спонсора'));
    return {
      title: `${this.$t('ЛК Партнера')} - ${this.$t('Данные спонсора')}`,
    };
  },
  mounted() {
    GApi.getSponsorProfile()
      .then(Response => {
        this.userInfo = Response.data;
        this.userInfo.phone = this.userInfo.phone.replace(/\s/g, '');
      })
      .then(() => {
        this.loading = false;
      });
  },
  methods: {
    ...mapActions('currentPage', ['setPageTitle']),
  },
};
</script>

<style lang="scss" scoped>
.sponsor__page {
  margin-top: 40px;
  &__description {
    & .myfoto {
      display: flex;
      align-items: center;
      margin-top: 30px;
      overflow: hidden;
      & div {
        border-radius: 50%;
        overflow: hidden;
      }
      & p {
        margin-top: 15px;
        margin-left: 15px;
        font-weight: 500;
        font-size: 20px;
        text-transform: uppercase;
      }
      & img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
