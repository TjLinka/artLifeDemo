<template>
  <div class="sponsor__page">
    <div class="container">
      <h2 class="page__title">
                              <p class="mobile_back" @click="back">
        <svg width="18" height="12" viewBox="0 0 18 12" fill="none" style="margin-right: 30px;" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 5H3.83L7.41 1.41L6 0L0 6L6 12L7.41 10.59L3.83 7H18V5Z" fill="#32AAA7"/>
        </svg>
      </p>
        Показатели
        </h2>
      <div class="row cur_p">
        <div class="col-sm current_period">
            <p>Текущий период:
              {{ months[new Date(currentPeriodTop.comdte).getMonth()] }}
              {{new Date(currentPeriodTop.comdte).getFullYear()}}<br>
            Статус предыдущего года:
            <span :style="`color: ${periodStatus}`">
              {{ currentPeriodTop.prev_status }}
            </span>
            </p>
        </div>
      </div>
      <div class="sponsor__page__description">
        <div class="row mobile_trans mt-4">
          <div class="col search__btn" @click="toggleSearch" v-if="!searchActive">
            Настройки трансфера <i class="el-icon-s-tools search_icon"></i>
          </div>
        </div>
        <h2 class="mt-4 mb-4">Мои текущие показатели</h2>
        <BasePeriodPicker :currentPeriod="currentPeriod" v-on:next-period="nextPeriod"/>
        <div class="container top__info">
          <div class="row">
            <div class="col-md-6 mt-4">
              <p>Ранг на начало:</p>
              <p>{{ userInfo.rank_beg }}</p>
            </div>
            <div class="col-md-6 mt-4">
              <p>Расчетный ранг:</p>
              <p>{{ userInfo.rank_calc }}</p>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6 mt-4">
              <p>Ранг на конец:</p>
              <p>{{ userInfo.rank_end }}</p>
            </div>
            <div class="col-md-6 mt-4">
              <p>ЛО:</p>
              <p>{{ userInfo.lo }}</p>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6 mt-4">
              <p>ГО:</p>
              <p>{{ userInfo.go }}</p>
            </div>
            <div class="col-md-6 mt-4">
              <p>НГО:</p>
              <p>{{ userInfo.ngo }}</p>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6 mt-4">
              <p>ОО:</p>
              <p>{{ userInfo.oo }}</p>
            </div>
            <div class="col-md-6 mt-4">
              <p>КО:</p>
              <p>{{ userInfo.ko }}</p>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6 mt-4">
              <p>Резерв:</p>
              <p>{{ userInfo.reserve }}</p>
            </div>
            <div class="col-md-6 mt-4">
              <p>Неакт.:</p>
              <p>{{ userInfo.noact }}</p>
            </div>
          </div>
        </div>
      </div>
      <footer class="container-fluid cust_modal">
      <div class="row desk_trans">
        <div class="col text-center search__btn" @click="toggleSearch" v-if="!searchActive">
          Настройки трансфера <i class="el-icon-s-tools search_icon"></i>
        </div>
      </div>
      <div v-if="searchActive" class="organization__modal">
        <span @click="closeModal" class="close_btn">X</span>
        <h3 class="mt-4">Настройка автоматической подачи баллов в трансферт</h3>
        <div class="row mt-4">
          <div class="col-md-12">
            <b-form-group label="">
              <b-form-radio
                v-model="points_rule"
                name="some-radios-1"
                value="0"
                class="radio mr-3"
                >Все баллы в трансферт</b-form-radio
              >
              <b-form-radio
                v-model="points_rule"
                name="some-radios-1"
                value="1"
                class="radio mr-3"
                >Правило по умолчанию по выбору склада</b-form-radio
              >
              <b-form-radio
                v-model="points_rule"
                name="some-radios-1"
                :value="null"
                class="radio"
                >Баллы в резерв</b-form-radio
              >
            </b-form-group>
          </div>
        </div>
        <div class="row edit">
          <div class="col-md-6">
            <input type="number" name="autoship" id="autoship" required v-model="autoship" />
            <label for="autoship">Обязательный трансферт:</label>
            <span class="clear_icon" @click="clearInput('autoship')">X</span>
          </div>
        </div>
        <div class="row edit mt-4">
          <div class="col-sm-12">
            <button class="mr-2 update" @click="updateData">Применить</button>
          </div>
        </div>
      </div>
      </footer>
    </div>
  </div>
</template>

<script>
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
      currentPeriodTop: {},
      userInfo: {},
      points_rule: null,
      autoship: null,
      searchActive: false,
      periods: [],
      periodIndex: 0,
      months: [
        'Январь',
        'Ферваль',
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
  mounted() {
    backApi.get('/agent/get-current-period').then((Response) => {
      this.currentPeriodTop = Response.data;
      backApi
        .get('agent/period-indicators', { params: { comdte: this.currentPeriodTop.comdte } })
        .then((response) => {
          const data = ReplaceNull(response.data);
          this.userInfo = data;
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
    clearInput() {
      this.autoship = null;
    },
    back() {
      this.$router.go(-1);
    },
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
        const data = ReplaceNull(response.data);
        this.userInfo = data;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.col-md-6,
.col-md{
  position: relative;
  span {
    display: none;
    position: absolute;
    right: 18px;
    top: 10px;
    color: #32aaa7;
    cursor: pointer;
  }
  label {
    position: absolute;
    top: 5px;
    left: 20px;
    transition: 0.15s ease-in-out;
    color: #9a9a9a;
    font-size: 14px;
    z-index: 10;
  }
  input {
    width: 100%;
    border: 0;
    height: 35px;
    border-radius: 0;
    border-bottom: 1px solid #dee2f3;
    outline: none;
    padding-left: 5px;
    font-size: 14px;
    &:focus ~ label,
    &:valid ~ label {
      font-size: 12px;
      top: -10px;
    }
    &:valid ~ span {
      display: block;
    }
  }
}
.organization__modal {
  position: relative;
  & .close_btn {
    position: absolute;
    right: 0;
    top: 0px;
    font-size: 25px;
    font-weight: 500;
    color: #32aaa7;
    cursor: pointer;
  }
}
.edit {
  margin-top: 60px;
  input {
    width: 100%;
    border: 0;
    border-bottom: 1px solid #dee2f3;
    padding-bottom: 0px;
    outline: none;
  }
  button {
    width: 48%;
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
.search__btn {
    padding-top: 20px;
    cursor: pointer;
    margin-bottom: 30px;
    text-transform: uppercase;
    font-weight: 500;

    & .search_icon {
      color: #32aaa7;
    }
  }
.mobile_trans{
  display: none;
  text-align: left;
  font-weight: 500;
  font-size: 20px;
  & .search_icon{
    position: relative;
    right: 0;
  }
}
.sponsor__page {
  margin-top: 40px;

  & .page__title {
    color: #383a41;
    font-size: 32px;
  }

  &__description {
    & h2{
      font-size: 24px;
    }
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
.cust_modal{
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  padding-left: 120px;
  box-sizing: border-box;
  background: #FFFFFF;
  box-shadow: 0px 4px 12px 2px rgba(0, 0, 0, 0.24);
}
.el-icon-s-tools:before{
  color: #32AAA7;
  position: relative;
  top: 2px;
}
.current_period{
  background-color: #EBEEFA;
  padding: 16px 12px;
  display: inline-block;
  border-radius: 1px;

  & br{
    display: none;
  }
  & p {
    margin-bottom: 0 ;
  }
}
.update{
  display: inline-block;
  width: 15% !important;
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
@media (min-width: 760px) {
  .radio{
    display: inline;
  }
}
@media (max-width: 760px) {
  .update{
    margin-bottom: 20px;
    width: 100% !important;
  }
  .organization__modal{
    margin-top: 20px;
    h3{
      font-size: 20px;
    }
  }
  .cur_p{
    margin: 0;
  }
  .current_period{
    margin: 0;
    & br{
      display: block;
    }
  }
}
@media (max-width: 500px) {
  .mobile_trans{
    display: block;
  }
  .desk_trans{
    display: none;
  }
  .organization__modal{
    padding: 10px;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 10;
    background-color: white;
  }
}
</style>
