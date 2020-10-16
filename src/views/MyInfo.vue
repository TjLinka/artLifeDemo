<template>
  <div class="myinfo__page">
    <div class="container">
      <h2 class="page__title">Карточка партнера</h2>
      <div class="myinfo__page__description">
        <div class="myfoto">
          <img src="../assets/imgs/unnamed 1.png" alt="" />
        </div>
        <div class="container top__info">
          <div class="row">
            <div class="col-6">
              <p>Номер соглашения:</p>
              <p>{{ userinfo.id }}</p>
            </div>
            <div class="col-6">
              <p>ФИО:</p>
              <p>{{ userinfo.name }}</p>
            </div>
          </div>
          <div class="row">
            <div class="col-6">
              <p>E-mail:</p>
              <p>{{ userinfo.email }}</p>
            </div>
            <div class="col-6">
              <p>Телефон:</p>
              <p>{{ userinfo.phone }}</p>
            </div>
          </div>
          <div class="row">
            <div class="col-6">
              <p>Страна:</p>
              <p>{{ userinfo.country }}</p>
            </div>
            <div class="col-6">
              <p>Адрес:</p>
              <p>{{ userinfo.address }}</p>
            </div>
          </div>
          <div class="row">
            <div class="col-6">
              <p>Паспорт (серия, номер, кем и когда выдан):</p>
              <p>{{ userinfo.passport }}</p>
            </div>
            <div class="col-6">
              <p>Дата рождения:</p>
              <p>{{ userinfo.bthdte }}</p>
            </div>
          </div>
          <div class="row">
            <div class="col-6">
              <p>Skype:</p>
              <p>{{ userinfo.skype }}</p>
            </div>
            <div class="col-6">
              <p>Доп. телефон:</p>
              <p>+7 (912) 537-33-78</p>
            </div>
          </div>
        </div>
        <div v-if="transfertAccess" class="transfert">
          <h2 class="page__caption">Дополнительная информация для трансферта</h2>
          <div class="container transfert__info" v-if="showTransfertInfo">
            <div class="row">
              <div class="col-6">
                <p>Нективность:</p>
                <p>{{ userinfo.noact }}</p>
              </div>
              <div class="col-6">
                <p>Личный объем (ЛО):</p>
                <p>{{ userinfo.lo }}</p>
              </div>
            </div>
            <div class="row">
              <div class="col-6">
                <p>Групповой объем (ГО):</p>
                <p>{{ userinfo.go }}</p>
              </div>
              <div class="col-6">
                <p>Накопленный групповой объем (НГО):</p>
                <p>{{ userinfo.ngo }}</p>
              </div>
            </div>
            <div class="row">
              <div class="col-6">
                <p>Организационный объем (ОО):</p>
                <p>Россия</p>
              </div>
              <div class="col-6">
                <p>Квалификационный объем (КО):</p>
                <p>{{ userinfo.ko }}</p>
              </div>
            </div>
            <div class="row">
              <div class="col-6">
                <p>Баллы в резерве:</p>
                <p>{{ userinfo.reserve }}</p>
              </div>
              <div class="col-6">
                <p>Ранг на начало:</p>
                <p>{{ userinfo.rank_beg }}</p>
              </div>
            </div>
            <div class="row">
              <div class="col-6">
                <p>Расчетный ранг:</p>
                <p>{{ userinfo.rank_calc }}</p>
              </div>
              <div class="col-6">
                <p>Ранг на конец месяца:</p>
                <p>{{ userinfo.rank_end }}</p>
              </div>
            </div>
            <div class="row">
              <div class="col-6">
                <p>Максимально достигнутый ранг:</p>
                <p>{{ userinfo.rank_max }}</p>
              </div>
              <div class="col-6">
                <p>Дата достижения максимального ранга:</p>
                <p>{{ userinfo.rank_max_date }}</p>
              </div>
            </div>
            <div class="row">
              <div class="col-6">
                <p>Дата регистрации:</p>
                <p>{{ userinfo.credte }}</p>
              </div>
              <div class="col-6">
                <p>Дата окончания лидерской программы:</p>
                <p>{{ userinfo.leader_date }}</p>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-6">
              <p class="show__transfert p-0" v-on:click="toggleTransfertVisible">
                {{ showTransfertInfo ? 'Свернуть' : 'Раскрыть' }}
              </p>
            </div>
            <div class="col-6">
              <button v-if="showTransfertInfo" class="transfert__btn">ТРАНСФЕРТ</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import backApi from '../assets/backApi';

export default {
  name: 'MyInfo',
  data() {
    return {
      showTransfertInfo: false,
      userinfo: {},
    };
  },
  methods: {
    toggleTransfertVisible() {
      this.showTransfertInfo = !this.showTransfertInfo;
    },
  },
  mounted() {
    backApi.get('/agent/profile').then((Response) => {
      this.userinfo = Response.data;
    });
  },
  computed: {
    ...mapState('auth', ['role']),
    transfertAccess() {
      return !this.role === 'Клиент';
    },
  },
};
</script>

<style lang="scss" scoped>
.myinfo__page {
  margin-top: 40px;

  & .page__title {
    color: #383a41;
    font-size: 32px;
  }

  &__description {
    & .page__caption {
      font-size: 20px;
    }
    & .myfoto {
      display: inline-block;
      margin-top: 30px;
      border-radius: 50%;
      overflow: hidden;

      & img {
        width: 100%;
        height: 100%;
      }
    }

    & .top__info,
    & .transfert__info {
      padding: 0;
      margin-top: 32px;

      & .row {
        margin-bottom: 32px;
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
</style>
