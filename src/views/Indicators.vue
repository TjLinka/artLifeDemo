<template>
  <div class="sponsor__page">
    <div v-loading="loading">
      <div class="container-md indicat" v-show="!loading">
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
          <!-- {{$t("Показатели")}} -->
        </h2>
        <div class="row cur_p">
          <div class="col-sm current_period">
            <p>
              {{ $t('Текущий период') }}:
              <span v-if="months[new Date(currentPeriodTop.comdte).getMonth()]">
                {{ months[new Date(currentPeriodTop.comdte).getMonth()] }}
                {{ new Date(currentPeriodTop.comdte).getFullYear() }}.
              </span>
              <span v-else> </span>
              <br />
              {{ $t('Статус') }} <strong>{{ $t('предыдущего') }}</strong> {{ $t('периода') }}:
              <span :style="`color: ${periodStatus}`">
                {{ currentPeriodTop.prev_status }}
              </span>
            </p>
          </div>
        </div>
        <div class="sponsor__page__description">
          <div class="row mobile_trans noprint">
            <div class="col search__btn noprint" @click="toggleSearch">
              {{ $t('Настройки трансфера') }} <i class="el-icon-s-tools search_icon"></i>
            </div>
          </div>
          <h2 class="mt-4 mb-4 page__caption">{{ $t('Мои текущие показатели') }}</h2>
          <BasePeriodPicker
            :currentPeriod="currentPeriod"
            v-on:next-period="nextPeriod"
            class="period_picker"
          />
          <div class="container-md top__info">
            <div class="row">
              <div class="col-md-6 mt-4">
                <p>{{ $t('Ранг на начало') }}:</p>
                <p>{{ userInfo.rank_beg }}</p>
              </div>
              <div class="col-md-6 mt-4">
                <p>{{ $t('Расчетный ранг') }}:</p>
                <p>{{ userInfo.rank_calc }}</p>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6 mt-4">
                <p>{{ $t('Ранг на конец') }}:</p>
                <p>{{ userInfo.rank_end }}</p>
              </div>
              <div class="col-md-6 mt-4">
                <p>{{ $t('ЛО') }}:</p>
                <p>{{ userInfo.lo | localInt }}</p>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6 mt-4">
                <p>{{ $t('ГО') }}:</p>
                <p>{{ userInfo.go | localInt }}</p>
              </div>
              <div class="col-md-6 mt-4">
                <p>{{ $t('НГО') }}:</p>
                <p>{{ userInfo.ngo | localInt }}</p>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6 mt-4">
                <p>{{ $t('ОО') }}:</p>
                <p>{{ userInfo.oo | localInt }}</p>
              </div>
              <div class="col-md-6 mt-4">
                <p>{{ $t('КО') }}:</p>
                <p>{{ userInfo.ko | localInt }}</p>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6 mt-4">
                <p>{{ $t('Резерв') }}:</p>
                <p>{{ userInfo.reserve | localInt }}</p>
              </div>
              <div class="col-md-6 mt-4">
                <p>{{ $t('Неактивность') }}:</p>
                <p>{{ userInfo.noact }}</p>
              </div>
            </div>
          </div>
        </div>
        <footer class="container-md-fluid cust_modal" v-if="self_agreementsystem">
          <div class="row desk_trans">
            <div class="col text-center search__btn" @click="toggleSearch" v-if="!searchActive">
              {{ $t('Настройки трансфера') }} <i class="el-icon-s-tools search_icon"></i>
            </div>
          </div>
          <div v-if="searchActive" class="organization__modal">
            <div class="container-md">
              <h3 class="mt-4 modal_title">
                {{ $t('Настройка автоматической подачи баллов в трансферт') }}
                <span @click="closeModal" class="close_btn"></span>
              </h3>
              <div class="row mt-4">
                <div class="col-md">
                  <b-form-group label="">
                    <b-form-radio
                      v-model="points_rule"
                      name="some-radios-1"
                      :value="1"
                      class="radio mr-3"
                      >{{ $t('Все баллы в трансферт') }}</b-form-radio
                    >
                    <b-form-radio
                      v-model="points_rule"
                      name="some-radios-1"
                      :value="0"
                      class="radio mr-3"
                      >{{ $t('Баллы в резерв после обязательного трансферта') }}</b-form-radio
                    >
                    <b-form-radio
                      v-model="points_rule"
                      name="some-radios-1"
                      :value="null"
                      class="radio"
                      >{{ $t('Правило по умолчанию по выбору склада') }}</b-form-radio
                    >
                  </b-form-group>
                </div>
              </div>
              <div class="row edit mt-4">
                <div class="col-md-6 custom_input">
                  <div v-if="points_rule === 0">
                    <input
                      type="text"
                      name="autoship"
                      id="autoship"
                      required
                      v-model="autoship"
                      v-currency="{
                        currency: null,
                        valueAsInteger: false,
                        distractionFree: false,
                        allowNegative: false,
                      }"
                    />
                    <label for="autoship">{{ $t('Количество баллов') }}</label>
                    <span class="clear_icon" @click="clearInput('autoship')"></span>
                  </div>
                </div>
                <div class="col-md-6">
                  <button
                    :class="`mr-2 update ${isDisabled ? 'disabled' : ''}`"
                    :disabled="isDisabled"
                    @click="updateData"
                  >
                    {{ $t('Сохранить') }}
                  </button>
                </div>
              </div>
              <!-- <div class="row edit mt-4">
            <div class="col-md-6">
            </div>
            <div class="col-md-6">
              <button
              :class="`mr-2 update ${isDisabled ? 'disabled' : ''}`"
              :disabled="isDisabled"
              @click="updateData"
              >Сохранить</button>
            </div>
          </div> -->
            </div>
          </div>
        </footer>
      </div>
    </div>
    <div :class="`mobile_modal_mask ${searchActive ? 'active' : ''}`"></div>
  </div>
</template>

<script>
import $ from 'jquery';
import { mapState, mapActions } from 'vuex';
import backApi from '../assets/backApi';
import BasePeriodPicker from '../components/BasePeriodPicker.vue';
import { ReplaceNull } from '../assets/utils';

export default {
  name: 'SponsorCard',
  components: {
    BasePeriodPicker,
  },
  data() {
    return {
      loading: true,
      currentPeriodTop: {},
      userInfo: {},
      points_rule: '2',
      autoship: null,
      searchActive: false,
      periods: [],
      periodIndex: 0,
      months: [
        'Январь',
        'Февраль',
        'Март',
        'Апрель',
        'Май',
        'Июнь',
        'Июль',
        'Августь',
        'Сентябрь',
        'Октябрь',
        'Ноябрь',
        'Декабрь',
      ],
    };
  },
  metaInfo() {
    this.setPageTitle(this.$t('Показатели'));
    return {
      title: `${this.$t('ЛК Партнера')} - ${this.$t('Показатели')}`,
    };
  },
  mounted() {
    backApi.get('/agent/get-current-period').then(Response => {
      this.currentPeriodTop = Response.data;
      backApi
        .get('agent/period-indicators', { params: { comdte: this.currentPeriodTop.comdte } })
        .then(response => {
          const data = ReplaceNull(response.data);
          this.userInfo = data;
        })
        .then(() => {
          setTimeout(() => {
            this.loading = false;
          });
        });
    });
    backApi.get('agent/bonus-detail/periods').then(Response => {
      this.periods = Response.data.entries.sort((a, b) => {
        const result = a.comdte > b.comdte ? 1 : -1;
        return result;
      });
      this.periodIndex = this.periods.length - 1;
    });
    backApi.get('/agent/points-rule').then(Response => {
      this.autoship = Response.data.autoship;
      this.points_rule = Response.data.points_rule;
    });
  },
  methods: {
    ...mapActions('currentPage', ['setPageTitle']),
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
    clearInput() {
      this.autoship = null;
    },
    back() {
      const navEl = document.getElementsByClassName('router-link-exact-active router-link-active');
      $(navEl[0])
        .parent()
        .parent()
        .siblings()
        .addClass('active');
    },
    nextPeriod(x) {
      this.period_enabled = true;
      this.periodIndex = (this.periodIndex + this.periods.length + x) % this.periods.length;
    },
    toggleSearch() {
      this.searchActive = !this.searchActive;
    },
    updateData() {
      backApi
        .post('/agent/points-rule', {
          points_rule: this.points_rule,
          autoship: this.autoship === '' ? null : this.autoship.replace(/,/, '.'),
        })
        .then(() => {
          this.createMessageBoxError(this.$t('Операция выполнена успешно'));
        })
        .catch(() => {
          this.createMessageBoxError(this.$t('Что-то пошло не так'));
        });
    },
    closeModal() {
      this.searchActive = !this.searchActive;
    },
    createMessageBoxError(messageText) {
      const h = this.$createElement;
      // More complex structure
      const messageVNode = h('div', { class: ['foobar'] }, [
        h('h5', { class: ['text-center'] }, [messageText]),
      ]);
      // We must pass the generated VNodes as arrays
      return this.$bvModal.msgBoxOk([messageVNode], {
        buttonSize: 'xl',
        centered: true,
        cancelTitle: 'Нет',
        okTitle: 'OK',
        size: 'md',
      });
    },
  },
  computed: {
    ...mapState('auth', ['self_agreementsystem']),
    isDisabled() {
      if (this.points_rule === 0 || this.points_rule === null) {
        return false;
      }
      if (this.autoship === null || this.autoship === '') {
        return true;
      }
      return false;
    },
    currentPeriod() {
      try {
        return this.periods[this.periodIndex].comdte;
      } catch (e) {
        return '';
      }
    },
    periodStatus() {
      return this.currentPeriodTop.prev_status === 'не выплачен' ? '#BD0A0A' : 'green';
    },
  },
  watch: {
    currentPeriod(val) {
      backApi.get('agent/period-indicators', { params: { comdte: val } }).then(response => {
        const data = ReplaceNull(response.data);
        this.userInfo = data;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.mobile_modal_mask {
  display: none;
}
.organization__modal {
  & > .container-md {
    position: relative;
  }
}
.edit {
  margin-top: 60px;
  button {
    width: 100%;
    border: 0;
    padding: 5px 30px;
    font-size: 16px;
    margin-bottom: 20px;
    &:nth-of-type(1) {
      background-color: #32aaa7;
      color: white;
    }
    &:nth-of-type(2) {
      background-color: white;
      color: #32aaa7;
      border: 2px solid #32aaa7;
    }
  }
}
.mobile_trans {
  display: none;
  text-align: left;
  font-weight: 500;
  font-size: 18px;
  & .search_icon {
    position: relative;
    right: 0;
    top: -1px;
  }
}
.sponsor__page {
  margin-top: 40px;
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
      // margin-top: 32px;

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
.el-icon-s-tools:before {
  color: #32aaa7;
  position: relative;
  top: 2px;
}
.current_period {
  // background-color: #EBEEFA;
  // padding: 16px 12px;
  display: inline-block;
  border-radius: 1px;

  & br {
    display: none;
  }
  & p {
    margin-bottom: 0;
    padding: 15px 10px;
    background-color: #ebeefa;
  }
}
.update {
  display: block;
  &.disabled {
    color: #9a9a9a !important;
    background-color: #dee2f3 !important;
  }
}
@media (min-width: 768px) {
  .sponsor__page {
    .top__info {
      & > .row {
        margin-bottom: 32px;
      }
    }
  }
}
@media (min-width: 770px) {
  .radio {
    display: inline;
  }
}
@media (max-width: 760px) {
  .mobile_modal_mask {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0.7;
    background-color: black;
    &.active {
      display: block;
    }
  }
  .update {
    margin-top: 20px;
  }
  .organization__modal {
    margin-top: 20px;
  }
  .cur_p {
    margin: 0;
  }
  .current_period {
    margin: 0;
    & br {
      display: block;
    }
  }
}
@media (max-width: 769px) {
  .organization__modal {
  }
  .mobile_trans {
    display: block;
  }
  .desk_trans {
    display: none;
  }
  .update {
    margin-bottom: 20px;
    width: 100% !important;
  }
}
@media (max-width: 500px) {
  .organization__modal {
    position: fixed;
    padding-bottom: 60px;
    bottom: 0;
    left: 0;
    z-index: 10;
    background-color: white;
    box-shadow: 0px 4px 12px 2px rgba(0, 0, 0, 0.24);
  }
  .radio {
    margin-bottom: 10px;
  }
  .mobile_trans {
    font-size: 16px;
    & i {
      float: right;
      font-size: 22px;
    }
  }
}
</style>
