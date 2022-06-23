<template>
  <div class="sponsor__page">
  <div v-loading="loading">
    <div class="container-md" v-show="!loading">
      <h2 class="page__title">
      <p class="mobile_back noprint" @click="back">
        <svg width="18" height="12" viewBox="0 0 18 12" fill="none"  xmlns="http://www.w3.org/2000/svg">
          <path d="M18 5H3.83L7.41 1.41L6 0L0 6L6 12L7.41 10.59L3.83 7H18V5Z" fill="#32AAA7"/>
        </svg>
      </p>
        <!-- {{$t("Данные спонсора")}} -->
        </h2>
      <div class="sponsor__page__description">
        <div class="myfoto">
          <div>
            <img v-if="userInfo.male" src="../assets/imgs/male.png" alt="" />
            <img v-else src="../assets/imgs/female.png" alt="" />
          </div>
          <p>{{userInfo.fio}}</p>
        </div>
        <div class="container-md top__info">
          <div class="row">
            <div class="col-md-6 mt-4">
              <p>{{$t(("Номер соглашения"))}}:</p>
              <p>{{userInfo.id}}</p>
            </div>
            <div class="col-md-6 mt-4">
              <p>{{$t("E-mail")}}:</p>
              <p>{{userInfo.email}}</p>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6 mt-4">
              <p>{{$t("ФИО")}}:</p>
              <p>{{userInfo.name}}</p>
            </div>
            <div class="col-md-6 mt-4">
              <p>Skype:</p>
              <p>{{userInfo.skype}}</p>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6 mt-4">
              <p>{{$t("Телефон")}}:</p>
              <p>{{userInfo.phone}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import $ from 'jquery';
import backApi from '../assets/backApi';

export default {
  name: 'SponsorCard',
  data() {
    return {
      loading: true,
      userInfo: {},
      someText: '',
    };
  },
  metaInfo() {
    this.setPageTitle(this.$t('Данные спонсора'));
    return {
      title: `${this.$t('ЛК Партнера')} - ${this.$t('Данные спонсора')}`,
    };
  },
  mounted() {
    backApi.get('agent/sponsor').then((Response) => {
      this.userInfo = Response.data;
    }).then(() => {
      setTimeout(() => { this.loading = false; });
    });
  },
  methods: {
    ...mapActions('currentPage', ['setPageTitle']),
    back() {
      const navEl = document.getElementsByClassName('router-link-exact-active router-link-active');
      $(navEl[0])
        .parent()
        .parent()
        .siblings()
        .addClass('active');
    },
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
      & div{
        border-radius: 50%;
        overflow: hidden;
      }
      & p{
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

    & .top__info,
    & .transfert__info {
      padding: 0;
      margin-top: 0px;

      & .row {
        // margin-bottom: 32px;
      }

      & p {
        padding: 0;
        margin: 0;
        color: #383a41;
        font-size: 14px;

        &:nth-of-type(1) {
          color: #9a9a9a;
          font-size: 14px;
        }
        &:nth-of-type(2) {
          font-weight: 500;
        }
      }
    }
    & .transfert {
      & .show__transfert {
        cursor: pointer;
        display: inline-block;
        color: #32aaa7;
        font-size: 14px;
        border-bottom: 2px dotted #32aaa7;
      }

      & .transfert__btn {
        background-color: #000000;
        color: white;
        padding: 10px 80px;
        font-size: 12px;
        border: none;
        border-radius: 4px;
        // float: right;
      }
    }
  }
}
.mail{
  color: #32AAA7;
}
@media (min-width: 768px) {
  .sponsor__page{
    .top__info{
      & > .row{
        margin-bottom: 32px;
      }
    }
  }
}
</style>
