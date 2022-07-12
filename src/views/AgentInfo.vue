<template>
  <div class="myinfo__page">
    <div v-loading="loading">
      <div class="container-md" v-if="!success" v-show="!loading">
        <h2 class="page__title">
          <p class="mobile_back noprint" @click="back">
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
          <!-- {{$t("Карточка партнера")}}: {{userinfo.id}} - {{userinfo.name}} -->
        </h2>
        <h5 style="color: red;" v-if="!self_agreementsystem">
          Внимание! Ваш доступ в ЛК Партнёра только для чтения т.к. учёт ваших данных ведётся в
          старой системе,<br />
          попросите Ваш Склад обслуживания перевести Вас на обслуживание в Новой Системе.
        </h5>
        <div class="myinfo__page__description">
          <div :class="`myfoto ${userinfo.agreementsystem === 0 ? 'a' : ''}`">
            <div>
              <img v-if="userinfo.male" src="../assets/imgs/male.png" />
              <img v-else src="../assets/imgs/female.png" />
            </div>
          </div>
          <div class="container-md top__info">
            <div class="row noprint" v-if="!this.$route.params.id && userinfo.agreementsystem">
              <div class="col-md mt-1">
                <span class="modal_btn" @click="showTransfModal1" v-if="transfertAccess">
                  {{ $t('Перевести баллы другому партнёру') }}
                </span>
                <!-- <span class="modal_btn" @click="showTransfModal2">
                {{$t("Перевести деньги другому партнёру")}}
              </span> -->
                <span
                  class="modal_btn"
                  @click="becomePartner"
                  v-if="transfertAccess && !userinfo.is_terminated"
                >
                  {{ $t('Стать дистрибьютором') }}
                </span>
              </div>
            </div>
            <!-- <div class="row" v-if="transfertAccess && !this.$route.params.id">
            <div class="col">
              <p class="show__transfert p-0" @click="becomePartner">
                Стать партнером
              </p>
            </div>
          </div> -->
            <div class="row">
              <div class="col-md-6 mt-3">
                <p>{{ $t('Номер соглашения') }}:</p>
                <p>{{ userinfo.id }}</p>
              </div>
              <div class="col-md-6 mt-3">
                <p>{{ $t('ФИО') }}:</p>
                <p>{{ userinfo.name }}</p>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6 mt-3">
                <p>{{ $t('E-mail') }}:</p>
                <p>{{ userinfo.email }}</p>
              </div>
              <div class="col-md-6 mt-3">
                <p>{{ $t('Телефон') }}:</p>
                <p>+{{ userinfo.phone }}</p>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6 mt-3">
                <p>{{ $t('Страна') }}:</p>
                <p>{{ userinfo.country }}</p>
              </div>
              <div class="col-md-6 mt-3">
                <p>{{ $t('Адрес') }}:</p>
                <p>{{ userinfo.address }}</p>
              </div>
            </div>
            <div class="row">
              <!-- <div class="col-md-6 mt-3">
              <p>Паспорт (серия, номер, кем и когда выдан):</p>
              <p>{{ userinfo.passport }}</p>
            </div> -->
              <div class="col-md-6 mt-3">
                <p>{{ $t('Дата рождения') }}:</p>
                <!-- <p>{{ new Date(userinfo.bthdte).toLocaleDateString() }}</p> -->
                <p>{{ userinfo.bthdte | localDate }}</p>
              </div>
              <div class="col-md-6 mt-3">
                <p>{{ $t('Доп. контакты') }}:</p>
                <p>{{ userinfo.skype }}</p>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6 mt-3">
                <p>{{ $t('Склад обслуживания') }}:</p>
                <p>{{ userinfo.stock_id }} - {{ userinfo.stock_name }}</p>
              </div>
            </div>
          </div>
          <div class="transfert" v-if="transLoaded">
            <h2 class="page__caption mt-5">{{ $t('Дополнительная информация для трансферта') }}</h2>
            <div class="container-md transfert__info" v-if="showTransfertInfo">
              <div class="row">
                <div class="col-md-6 mt-3">
                  <p>{{ $t('Неактивность') }}:</p>
                  <p>{{ transfertInfo.noact }}</p>
                </div>
                <div class="col-md-6 mt-3">
                  <p>{{ $t('Личный объем (ЛО)') }}:</p>
                  <p>{{ transfertInfo.lo | localInt }}</p>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6 mt-3">
                  <p>{{ $t('Групповой объем (ГО)') }}:</p>
                  <p>{{ transfertInfo.go | localInt }}</p>
                </div>
                <div class="col-md-6 mt-3">
                  <p>{{ $t('Накопленный групповой объем (НГО)') }}:</p>
                  <p>{{ transfertInfo.ngo | localInt }}</p>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6 mt-3">
                  <p>{{ $t('Организационный объем (ОО)') }}:</p>
                  <p>{{ transfertInfo.so | localInt }}</p>
                </div>
                <div class="col-md-6 mt-3">
                  <p>{{ $t('Квалификационный объем (КО)') }}:</p>
                  <p>{{ transfertInfo.ko | localInt }}</p>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6 mt-3">
                  <p>{{ $t('Баллы в резерве') }}:</p>
                  <p>{{ transfertInfo.reserve | localInt }}</p>
                </div>
                <div class="col-md-6 mt-3">
                  <p>{{ $t('Ранг на начало') }}:</p>
                  <p>{{ transfertInfo.rank_beg }}</p>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6 mt-3">
                  <p>{{ $t('Расчетный ранг') }}:</p>
                  <p>{{ transfertInfo.rank_calc }}</p>
                </div>
                <div class="col-md-6 mt-3">
                  <p>{{ $t('Ранг на конец месяца') }}:</p>
                  <p>{{ transfertInfo.rank_end }}</p>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6 mt-3">
                  <p>{{ $t('Максимально достигнутый ранг') }}:</p>
                  <p>{{ transfertInfo.rank_max }}</p>
                </div>
                <div class="col-md-6 mt-3">
                  <p>{{ $t('Дата достижения максимального ранга') }}:</p>
                  <!-- <p>{{ new Date(userinfo.rank_max_date).toLocaleDateString() }}</p> -->
                  <p>{{ transfertInfo.rank_max_date | localDate }}</p>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6 mt-3">
                  <p>{{ $t('Дата регистрации') }}:</p>
                  <!-- <p>{{ new Date(userinfo.credte).toLocaleDateString() }}</p> -->
                  <p>{{ transfertInfo.credte | localDate }}</p>
                </div>
                <div class="col-md-6 mt-3">
                  <p>{{ $t('Дата окончания лидерской программы') }}:</p>
                  <p>{{ transfertInfo.leader_date | localDate }}</p>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6 mt-3 noprint">
                <p class="show__transfert p-0" v-on:click="toggleTransfertVisible">
                  {{ showTransfertInfo ? 'Свернуть' : 'Раскрыть' }}
                </p>
              </div>
              <div class="col-md-6 mt-3 noprint" v-if="userinfo.agreementsystem">
                <button v-if="showTransfertInfo" class="transfert__btn" @click="showTransfModal">
                  {{ $t('ТРАНСФЕРТ') }}
                </button>
              </div>
            </div>
            <!-- <div class="row" v-if="transfertAccess">
            <div class="col">
              <p class="show__transfert p-0 mt-5" @click="becomePartner">
                Стать партнером
              </p>
            </div>
          </div> -->
          </div>
        </div>
      </div>
      <div v-else v-show="!loading">
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
          {{ $t('Карточка партнёра') }}
        </h2>
        <h2>{{ $t('У вас нет прав доступа') }}</h2>
      </div>
    </div>
    <footer class="container-fluid cust_modal" v-if="showModal">
      <div>
        <Transfert2 v-on:action="ddd" v-on:enlarge-text="showModal = false" :id="userinfo.id" />
      </div>
    </footer>
    <footer class="container-fluid cust_modal" v-if="showModal1">
      <div>
        <AgentInfoModalPoints
          v-on:close="showModal1 = false"
          v-on:enlarge-text="pointsAction"
          :lo="transfertInfo.lo"
          :reserve="transfertInfo.reserve"
          :id="userinfo.id"
        />
      </div>
    </footer>
    <!-- <footer class="container-fluid cust_modal" v-if="showModal2">
      <div>
        <AgentInfoModalMoney
          v-on:enlarge-text="moneyAction"
          :balance="userinfo.balance"
          :id="userinfo.id"
        />
      </div>
    </footer> -->
    <!-- <div>
      <b-modal id="modal-center" hide-footer size="xl" centered title="BootstrapVue">
        <template #modal-title>
          Трансферт
        </template>
        <Transfert />
      </b-modal>
    </div> -->
    <b-toast id="my-toast-partner" variant="success" solid>
      <template #toast-title>
        <div class="d-flex flex-grow-1 align-items-baseline">
          <b-img blank blank-color="green" class="mr-2" width="12" height="12"></b-img>
          <strong class="mr-auto">Успех!</strong>
          <!-- <small class="text-muted mr-2">42 seconds ago</small> -->
        </div>
      </template>
      {{ $t('Вы стали парнером') }}
    </b-toast>
    <b-toast id="my-toast-money" variant="warning" solid>
      <template #toast-title>
        <div class="d-flex flex-grow-1 align-items-baseline">
          <b-img blank blank-color="green" class="mr-2" width="12" height="12"></b-img>
          <strong class="mr-auto">Успех!</strong>
          <!-- <small class="text-muted mr-2">42 seconds ago</small> -->
        </div>
      </template>
      {{ $t('Операция выполнена успешно') }}
    </b-toast>
    <b-toast id="my-toast-points" variant="warning" solid>
      <template #toast-title>
        <div class="d-flex flex-grow-1 align-items-baseline">
          <b-img blank blank-color="green" class="mr-2" width="12" height="12"></b-img>
          <strong class="mr-auto">Успех!</strong>
          <!-- <small class="text-muted mr-2">42 seconds ago</small> -->
        </div>
      </template>
      {{ $t('Операция выполнена успешно') }}
    </b-toast>
  </div>
</template>

<script>
import $ from 'jquery';
import { mapState, mapActions } from 'vuex';
import Transfert2 from '../components/Transfert2.vue';
import AgentInfoModalPoints from '../components/AgentInfoModalPoints.vue';
// import AgentInfoModalMoney from '../components/AgentInfoModalMoney.vue';
import backApi from '../assets/backApi';
import { ReplaceNull } from '../assets/utils';

export default {
  name: 'MyInfo',
  components: {
    Transfert2,
    AgentInfoModalPoints,
    // AgentInfoModalMoney,
  },
  data() {
    return {
      loading: true,
      showModal: false,
      showModal1: false,
      showModal2: false,
      loaded: false,
      success: false,
      showTransfertInfo: false,
      userinfo: {},
      transLoaded: false,
      transfertInfo: {},
    };
  },
  metaInfo() {
    return {
      title: `${this.$t('ЛК Партнера')} - ${this.$t('Карточка партнера')} : ${this.userinfo.id} - ${
        this.userinfo.name
      }`,
    };
  },
  methods: {
    ...mapActions('currentPage', ['setPageTitle']),
    async ddd() {
      if (this.$route.params.id) {
        const response = await backApi.get('/agent/profile/child', {
          params: {
            another_agent_id: this.$route.params.id,
          },
        });
        backApi
          .get('/agent/transfer-info', {
            params: {
              another_agent_id: response.data.id,
            },
          })
          .then(Response2 => {
            this.setData(ReplaceNull(response.data), ReplaceNull(Response2.data));
          })
          .catch(() => {
            this.setData(ReplaceNull(ReplaceNull(response.data)));
          });
      } else {
        const response = await backApi.get('/agent/profile');
        backApi
          .get('/agent/transfer-info', {
            params: {
              another_agent_id: response.data.id,
            },
          })
          .then(Response2 => {
            this.setData(ReplaceNull(response.data), ReplaceNull(Response2.data));
          })
          .catch(() => {
            this.setData(ReplaceNull(ReplaceNull(response.data)));
          });
      }
    },
    moneyAction() {
      this.showModal2 = false;
      backApi.get('/agent/profile').then(Response => {
        this.userinfo = Response.data;
      });
    },
    pointsAction() {
      this.showModal1 = false;
      backApi.get('/agent/profile').then(Response => {
        backApi
          .get('/agent/transfer-info', { params: { another_agent_id: Response.data.id } })
          .then(Response2 => {
            this.transfertInfo = Response2.data;
          });
      });
    },
    showToast(title, message, status) {
      // Use a shorter name for this.$createElement
      const h = this.$createElement;
      // Increment the toast count
      // Create the message
      const vNodesMsg = h('p', { class: ['text-center', 'mb-0'] }, [
        h('strong', { class: 'mr-2' }, message),
      ]);
      // Create the title
      const vNodesTitle = h(
        'div',
        { class: ['d-flex', 'flex-grow-1', 'align-items-baseline', 'mr-2'] },
        [h('strong', { class: 'mr-2' }, title)],
      );
      // Pass the VNodes as an array for message and title
      this.$bvToast.toast([vNodesMsg], {
        title: [vNodesTitle],
        solid: true,
        variant: status,
      });
    },
    becomePartner() {
      backApi.post('/agent/become_partner', { comm: '' }).then(() => {
        this.showToast(
          `${this.$t('Стать партнером')}`,
          `${this.$t('Заявка на становление дистрибьютором отправлена')}!`,
          'success',
        );
      });
    },
    showTransfModal() {
      this.showModal = !this.showModal;
      this.showModal1 = false;
      this.showModal2 = false;
    },
    showTransfModal1() {
      this.showModal1 = !this.showModal1;
      this.showModal2 = false;
      this.showModal = false;
    },
    showTransfModal2() {
      this.showModal2 = !this.showModal2;
      this.showModal1 = false;
      this.showModal = false;
    },
    back() {
      const navEl = document.getElementsByClassName('router-link-exact-active router-link-active');
      $(navEl[1])
        .parent()
        .parent()
        .siblings()
        .addClass('active');
    },
    toggleTransfertVisible() {
      this.showTransfertInfo = !this.showTransfertInfo;
    },
    setData(user, transer) {
      this.userinfo = user;
      if (this.$route.params.id) {
        if (this.$route.params.id === String(this.self_agent_id)) {
          this.setPageTitle(`${this.$t('Карточка партнера')}`);
        } else {
          this.setPageTitle(`${this.$t('Карточка партнера')} : ${this.userinfo.fio}`);
        }
      } else {
        this.setPageTitle(`${this.$t('Карточка партнера')}`);
      }
      // this.setPageTitle(`${this.$t('Карточка партнера')} : ${this.userinfo.id} - ${this.userinfo.name}`);
      if (transer) {
        this.transfertInfo = transer;
        this.transLoaded = true;
      }
      setTimeout(() => {
        this.loading = false;
      }, 2000);
      this.loaded = true;
    },
  },
  async beforeRouteEnter(to, from, next) {
    // Загрузка данных, если перешли на чужую карточку партнера
    if (to.params.id !== undefined) {
      const response = await backApi.get('/agent/profile/child', {
        params: {
          another_agent_id: to.params.id,
        },
      });
      // Проверка на успешный ответ от сервера
      // Если 200, то грузим информацию о трансферте
      if (response.status === 200) {
        backApi
          .get('/agent/transfer-info', {
            params: {
              another_agent_id: response.data.id,
            },
          })
          .then(Response2 => {
            next(vm => {
              vm.setData(ReplaceNull(response.data), ReplaceNull(Response2.data));
            });
          })
          .catch(() => {
            next(vm => {
              vm.setData(ReplaceNull(ReplaceNull(response.data)));
            });
          });
      }
    } else {
      // Загрузка данных, если перешли на свою карточку партнера
      const response = await backApi.get('/agent/profile');
      // Если 200, то грузим информацию о трансферте
      if (response.status === 200) {
        backApi
          .get('/agent/transfer-info', {
            params: {
              another_agent_id: response.data.id,
            },
          })
          .then(Response2 => {
            next(vm => {
              vm.setData(ReplaceNull(response.data), ReplaceNull(Response2.data));
            });
          })
          .catch(() => {
            next(vm => {
              vm.setData(ReplaceNull(ReplaceNull(response.data)));
            });
          });
      } else {
        next(vm => {
          vm.setData(ReplaceNull(response.data));
        });
      }
    }
  },
  async beforeRouteUpdate(to, from, next) {
    // Загрузка данных, если перешли на чужую карточку партнера
    if (to.params.id) {
      const response = await backApi.get('/agent/profile/child', {
        params: {
          another_agent_id: to.params.id,
        },
      });
      // Проверка на успешный ответ от сервера
      // Если 200, то грузим информацию о трансферте
      if (response.status === 200) {
        const response2 = await backApi.get('/agent/transfer-info', {
          params: {
            another_agent_id: response.data.id,
          },
        });
        next(vm => {
          vm.setData(ReplaceNull(response.data), ReplaceNull(response2.data));
        });
      } else {
        // Если ошибка, то просто выполняем setData, только с личными данными
        next(vm => {
          vm.setData(ReplaceNull(ReplaceNull(response.data)));
        });
      }
    } else {
      this.setPageTitle('');
      // Загрузка данных, если перешли на свою карточку партнера
      const response = await backApi.get('/agent/profile');
      // Если 200, то грузим информацию о трансферте
      if (response.status === 200) {
        const response2 = await backApi.get('/agent/transfer-info', {
          params: {
            another_agent_id: response.data.id,
          },
        });
        next(vm => {
          vm.setData(ReplaceNull(response.data), ReplaceNull(response2.data));
        });
      } else {
        // Если ошибка, то просто выполняем setData, только с личными данными
        next(vm => {
          vm.setData(ReplaceNull(response.data));
        });
      }
    }
  },
  mounted() {},
  computed: {
    ...mapState('auth', ['role', 'self_agreementsystem', 'self_agent_id']),
    transfertAccess() {
      return this.role === 'Клиент' && this.$router.path === '/';
    },
  },
};
</script>

<style lang="scss" scoped>
.modal_btn {
  color: #32aaa7;
  font-weight: 500;
  cursor: pointer;
  display: inline-block;
  &:nth-of-type(1),
  &:nth-of-type(2) {
    margin-right: 30px;
  }
}
.myinfo__page {
  &__description {
    & .myfoto {
      position: relative;
      display: inline-block;
      margin-top: 30px;
      border-radius: 50%;
      overflow: hidden;
      & img {
        width: 100%;
        height: 100%;
      }
      &.a::before {
        content: ' ';
        position: absolute;
        display: block;
        width: 100px;
        height: 100px;
        background-color: #cfc824eb;
        opacity: 0.5;
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
  .modal_btn {
    font-size: 16px;
    &:nth-of-type(1) {
      margin-right: 0px;
      margin-bottom: 15px;
    }
  }
}
@media (max-width: 320px) {
  .modal_btn {
    font-size: 14px;
    &:nth-of-type(1) {
      margin-right: 0px;
    }
  }
}
</style>
