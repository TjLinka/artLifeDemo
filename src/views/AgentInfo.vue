<template>
  <div class="myinfo__page" v-if="loaded">
    <div class="container" v-if="!success">
      <h2 class="page__title">
        <p class="mobile_back" @click="back">
          <svg
            width="18"
            height="12"
            viewBox="0 0 18 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M18 5H3.83L7.41 1.41L6 0L0 6L6 12L7.41 10.59L3.83 7H18V5Z" fill="#32AAA7" />
          </svg>
        </p>
        Карточка партнера
      </h2>
      <div class="myinfo__page__description">
        <div class="myfoto">
          <div>
            <img v-if="userinfo.male" src="../assets/imgs/male.png" alt="" />
            <img v-else src="../assets/imgs/female.png" alt="" />
          </div>
        </div>
        <div class="container top__info">
          <div class="row" v-if="transfertAccess && !this.$route.params.id">
            <div class="col-md mt-1">
              <span class="modal_btn" @click="showTransfModal2">
                Перевести между лицевыми счетами
              </span>
              <span class="modal_btn" @click="showTransfModal1">
                Перевести баллы между партнерами
              </span>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6 mt-3">
              <p>Номер соглашения:</p>
              <p>{{ userinfo.id }}</p>
            </div>
            <div class="col-md-6 mt-3">
              <p>ФИО:</p>
              <p>{{ userinfo.name }}</p>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6 mt-3">
              <p>E-mail:</p>
              <p>{{ userinfo.email }}</p>
            </div>
            <div class="col-md-6 mt-3">
              <p>Телефон:</p>
              <p>{{ userinfo.phone }}</p>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6 mt-3">
              <p>Страна:</p>
              <p>{{ userinfo.country }}</p>
            </div>
            <div class="col-md-6 mt-3">
              <p>Адрес:</p>
              <p>{{ userinfo.address }}</p>
            </div>
          </div>
          <div class="row">
            <!-- <div class="col-md-6 mt-3">
              <p>Паспорт (серия, номер, кем и когда выдан):</p>
              <p>{{ userinfo.passport }}</p>
            </div> -->
            <div class="col-md-6 mt-3">
              <p>Дата рождения:</p>
              <p>{{ new Date(userinfo.bthdte).toLocaleDateString() }}</p>
            </div>
            <div class="col-md-6 mt-3">
              <p>Skype:</p>
              <p>{{ userinfo.skype }}</p>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6 mt-3">
              <p>Доп. телефон:</p>
              <p>+7 (912) 537-33-78</p>
            </div>
          </div>
        </div>
        <div v-if="transfertAccess" class="transfert">
          <h2 class="page__caption mt-5">Дополнительная информация для трансферта</h2>
          <div class="container transfert__info" v-if="showTransfertInfo">
            <div class="row">
              <div class="col-md-6 mt-3">
                <p>Нективность:</p>
                <p>{{ userinfo.noact }}</p>
              </div>
              <div class="col-md-6 mt-3">
                <p>Личный объем (ЛО):</p>
                <p>{{ userinfo.lo | localInt }}</p>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6 mt-3">
                <p>Групповой объем (ГО):</p>
                <p>{{ userinfo.go | localInt}}</p>
              </div>
              <div class="col-md-6 mt-3">
                <p>Накопленный групповой объем (НГО):</p>
                <p>{{ userinfo.ngo | localInt}}</p>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6 mt-3">
                <p>Организационный объем (ОО):</p>
                <p>Россия</p>
              </div>
              <div class="col-md-6 mt-3">
                <p>Квалификационный объем (КО):</p>
                <p>{{ userinfo.ko | localInt}}</p>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6 mt-3">
                <p>Баллы в резерве:</p>
                <p>{{ userinfo.reserve | localInt }}</p>
              </div>
              <div class="col-md-6 mt-3">
                <p>Ранг на начало:</p>
                <p>{{ userinfo.rank_beg }}</p>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6 mt-3">
                <p>Расчетный ранг:</p>
                <p>{{ userinfo.rank_calc }}</p>
              </div>
              <div class="col-md-6 mt-3">
                <p>Ранг на конец месяца:</p>
                <p>{{ userinfo.rank_end }}</p>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6 mt-3">
                <p>Максимально достигнутый ранг:</p>
                <p>{{ userinfo.rank_max }}</p>
              </div>
              <div class="col-md-6 mt-3">
                <p>Дата достижения максимального ранга:</p>
                <p>{{ new Date(userinfo.rank_max_date).toLocaleDateString() }}</p>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6 mt-3">
                <p>Дата регистрации:</p>
                <p>{{ new Date(userinfo.credte).toLocaleDateString() }}</p>
              </div>
              <div class="col-md-6 mt-3">
                <p>Дата окончания лидерской программы:</p>
                <p>{{ userinfo.leader_date }}</p>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6 mt-3">
              <p class="show__transfert p-0" v-on:click="toggleTransfertVisible">
                {{ showTransfertInfo ? 'Свернуть' : 'Раскрыть' }}
              </p>
            </div>
            <div class="col-md-6 mt-3">
              <button v-if="showTransfertInfo" class="transfert__btn" @click="showTransfModal">
                ТРАНСФЕРТ
              </button>
            </div>
          </div>
          <div class="row" v-if="transfertAccess">
            <div class="col">
              <p class="show__transfert p-0 mt-5" @click="becomePartner">
                Стать партнёром
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <h2 class="page__title">
        <p class="mobile_back" @click="back">
          <svg
            width="18"
            height="12"
            viewBox="0 0 18 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M18 5H3.83L7.41 1.41L6 0L0 6L6 12L7.41 10.59L3.83 7H18V5Z" fill="#32AAA7" />
          </svg>
        </p>
        Карточка партнера
      </h2>
      <h2>У вас нет прав доступа</h2>
    </div>
     <footer class="container-fluid cust_modal" v-if="showModal">
      <div>
        <Transfert v-on:enlarge-text="showModal = false"/>
      </div>
      </footer>
     <footer class="container-fluid cust_modal" v-if="showModal1">
      <div>
        <AgentInfoModalPoints v-on:enlarge-text="showModal1 = false"
        :lo="userinfo.lo" :reserve="userinfo.reserve" :id="userinfo.id"/>
      </div>
      </footer>
     <footer class="container-fluid cust_modal" v-if="showModal2">
      <div>
        <AgentInfoModalMoney v-on:enlarge-text="showModal2 = false"
        :lo="userinfo.lo" :reserve="userinfo.reserve" :id="userinfo.id"/>
      </div>
      </footer>
    <!-- <div>
      <b-modal id="modal-center" hide-footer size="xl" centered title="BootstrapVue">
        <template #modal-title>
          Трансферт
        </template>
        <Transfert />
      </b-modal>
    </div> -->
      <b-toast id="my-toast" variant="success" solid>
      <template #toast-title>
        <div class="d-flex flex-grow-1 align-items-baseline">
          <b-img blank blank-color="green" class="mr-2" width="12" height="12"></b-img>
          <strong class="mr-auto">Успех!</strong>
          <!-- <small class="text-muted mr-2">42 seconds ago</small> -->
        </div>
      </template>
      Вы стали парнёром!
    </b-toast>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Transfert from '../components/Transfert.vue';
import AgentInfoModalPoints from '../components/AgentInfoModalPoints.vue';
import AgentInfoModalMoney from '../components/AgentInfoModalMoney.vue';
import backApi from '../assets/backApi';
import { ReplaceNull } from '../assets/utils';

export default {
  name: 'MyInfo',
  components: { Transfert, AgentInfoModalPoints, AgentInfoModalMoney },
  data() {
    return {
      showModal: false,
      showModal1: false,
      showModal2: false,
      loaded: false,
      success: false,
      showTransfertInfo: false,
      userinfo: {},
    };
  },
  methods: {
    becomePartner() {
      backApi.post('/agent/become_partner').then(() => {
        this.$bvToast.show('my-toast');
      });
    },
    showTransfModal() {
      this.showModal = !this.showModal;
    },
    showTransfModal1() {
      this.showModal1 = !this.showModal1;
    },
    showTransfModal2() {
      this.showModal2 = !this.showModal2;
    },
    back() {
      this.$router.go(-1);
    },
    toggleTransfertVisible() {
      this.showTransfertInfo = !this.showTransfertInfo;
    },
  },
  mounted() {
    if (this.$route.params.id) {
      backApi
        .get('/agent/profile/child', { params: { another_agent_id: this.$route.params.id } })
        .then((Response) => {
          console.log(Response.data);
          this.loaded = !this.loaded;
          const data = ReplaceNull(Response.data);
          this.userinfo = data;
        })
        .catch(() => {
          this.loaded = !this.loaded;
          this.success = !this.success;
        });
    } else {
      backApi.get('/agent/profile').then((Response) => {
        this.loaded = !this.loaded;
        const data = ReplaceNull(Response.data);
        this.userinfo = data;
      });
    }
  },
  computed: {
    ...mapState('auth', ['role']),
    transfertAccess() {
      return this.role !== 'Клиент';
    },
  },
  // filters: {
  //   localInt: (value) => {
  //     const formatter = new Intl.NumberFormat('ru');
  //     if (!value) {
  //       return '-';
  //     }
  //     return formatter.format(value);
  //   },
  // },
};
</script>

<style lang="scss" scoped>
.modal_btn{
  color: #32aaa7;
  font-weight: 500;
  cursor: pointer;
  display: inline-block;
  &:nth-of-type(1){
    margin-right: 30px;
  }
}
.myinfo__page {
  &__description {
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
        background-color: #32aaa7;
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
@media (min-width: 768px) {
  .myinfo__page {
    .top__info,
    .transfert__info {
      & > .row {
        margin-bottom: 32px;
      }
    }
  }
}
@media (max-width: 760px) {
  .transfert {
    & > .row {
      flex-direction: column-reverse;
      & .transfert__btn {
        width: 100%;
      }
    }
  }
}
@media (max-width: 540px) {
.modal_btn{
    font-size: 16px;
    &:nth-of-type(1){
      margin-right: 0px;
      margin-bottom: 15px;
    }
  }
}
@media (max-width: 320px) {
.modal_btn{
    font-size: 14px;
    &:nth-of-type(1){
      margin-right: 0px;
    }
  }
}
</style>
