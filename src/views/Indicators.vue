<template>
  <div class="sponsor__page">
    <div class="container">
      <h2 class="page__title">Показатели</h2>
      <div class="row">
        <div class="col">
          <p>
            <strong>Текущий период: {{ currentPeriodTop.comdte }}</strong>
            Статус предыдущего года:
            <span :style="`color: ${periodStatus}`">
              {{ currentPeriodTop.prev_status }}
            </span>
          </p>
        </div>
      </div>
      <div class="sponsor__page__description">
        <h2>Текущие показатели</h2>
        <span class="mr-1" @click="nextPeriod(-1)"> &lt;</span>
        <span>{{ currentPeriod.slice(0, -3) }}</span>
        <span class="ml-1" @click="nextPeriod(1)"> &gt;</span>
        <div class="container top__info">
          <div class="row">
            <div class="col-6">
              <p>Ранг на начало:</p>
              <p>{{ userInfo.rank_beg }}</p>
            </div>
            <div class="col-6">
              <p>Расчетный ранг:</p>
              <p>{{ userInfo.rank_calc }}</p>
            </div>
          </div>
          <div class="row">
            <div class="col-6">
              <p>Ранг на конец:</p>
              <p>{{ userInfo.rank_end }}</p>
            </div>
            <div class="col-6">
              <p>ЛО:</p>
              <p>{{ userInfo.lo }}</p>
            </div>
          </div>
          <div class="row">
            <div class="col-6">
              <p>ГО:</p>
              <p>{{ userInfo.go }}</p>
            </div>
            <div class="col-6">
              <p>НГО:</p>
              <p>{{ userInfo.ngo }}</p>
            </div>
          </div>
          <div class="row">
            <div class="col-6">
              <p>ОО:</p>
              <p>{{ userInfo.oo }}</p>
            </div>
            <div class="col-6">
              <p>КО:</p>
              <p>{{ userInfo.ko }}</p>
            </div>
          </div>
          <div class="row">
            <div class="col-6">
              <p>Резерв:</p>
              <p>{{ userInfo.reserve }}</p>
            </div>
            <div class="col-6">
              <p>Неакт.:</p>
              <p>{{ userInfo.noact }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col text-center search__btn" @click="toggleSearch" v-if="!searchActive">
          Поиск партнера <i class="el-icon-search search_icon"></i>
        </div>
      </div>
      <div v-if="searchActive" class="organization__modal">
        <span @click="closeModal" class="close_btn">X</span>
        <h3>Настройка автоматической подачи баллов в трансферт</h3>
        <div class="row">
          <div class="col-md-12">
            <b-form-group label="Выбор дерева">
              <b-form-radio
                v-model="points_rule"
                name="some-radios-1"
                value="0"
                class="d-inline mr-3"
                >Все баллы в трансферт</b-form-radio
              >
              <b-form-radio
                v-model="points_rule"
                name="some-radios-1"
                value="1"
                class="d-inline mr-3"
                >Правило по умолчанию по выбору склада</b-form-radio
              >
              <b-form-radio
                v-model="points_rule"
                name="some-radios-1"
                :value="null"
                class="d-inline"
                >Баллы в резерв</b-form-radio
              >
            </b-form-group>
          </div>
        </div>
        <div class="row edit">
          <div class="col-sm-6">
            <input type="text" name="" id="" placeholder="Сумма" v-model="autoship" />
          </div>
        </div>
        <div class="row edit mt-3">
          <div class="col-sm-6">
            <button class="mr-2" @click="updateData">Изменить</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import backApi from '../assets/backApi';

export default {
  name: 'SponsorCard',
  data() {
    return {
      currentPeriodTop: {},
      userInfo: {},
      points_rule: null,
      autoship: null,
      searchActive: false,
      periods: [],
      periodIndex: 0,
    };
  },
  mounted() {
    backApi.get('/agent/get-current-period').then((Response) => {
      this.currentPeriodTop = Response.data;
      backApi
        .get('agent/period-indicators', { params: { comdte: this.currentPeriodTop.comdte } })
        .then((response) => {
          this.userInfo = response.data;
        });
    });
    backApi.get('agent/bonus-detail/periods').then((Response) => {
      this.periods = Response.data.entries.sort((a, b) => {
        const result = a.comdte > b.comdte ? 1 : -1;
        return result;
      });
      this.periodIndex = this.periods.length - 1;
    });
    backApi.get('/agent/points-rule').then((Response) => {
      this.autoship = Response.data.autoship;
      this.points_rule = Response.data.points_rule;
    });
  },
  methods: {
    nextPeriod(x) {
      this.period_enabled = true;
      this.periodIndex = (this.periodIndex + this.periods.length + x) % this.periods.length;
    },
    toggleSearch() {
      this.searchActive = !this.searchActive;
    },
    updateData() {
      backApi.post('/agent/points-rule', {
        points_rule: this.points_rule,
        autoship: this.autoship === '' ? null : this.autoship,
      });
    },
    closeModal() {
      this.searchActive = !this.searchActive;
    },
  },
  computed: {
    currentPeriod() {
      try {
        return this.periods[this.periodIndex].comdte;
      } catch (e) {
        return '';
      }
    },
    periodStatus() {
      return this.currentPeriodTop.prev_status === 'не выплачен' ? 'red' : 'green';
    },
  },
  watch: {
    currentPeriod(val) {
      backApi.get('agent/period-indicators', { params: { comdte: val } }).then((response) => {
        this.userInfo = response.data;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.organization__modal {
  position: relative;

  & .close_btn {
    position: absolute;
    right: 0;
    top: 0px;
    font-size: 25px;
    font-weight: bold;
    color: #32aaa7;
    cursor: pointer;
  }
}
.edit {
  input {
    width: 100%;
    border: 0;
    border-bottom: 1px solid #dee2f3;
    padding-bottom: 10px;
    outline: none;
  }
  button {
    width: 48%;
    border: 0;
    padding: 5px 30px;
    font-size: 16px;
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
.sponsor__page {
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
