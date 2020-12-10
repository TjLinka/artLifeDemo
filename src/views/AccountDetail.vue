<template>
  <div class="licevoischet__page">
    <div class="container-fluid table_container">
      <h2 class="page__title">
                      <p class="mobile_back" @click="back">
        <svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 5H3.83L7.41 1.41L6 0L0 6L6 12L7.41 10.59L3.83 7H18V5Z" fill="#32AAA7"/>
        </svg>
      </p>
        Движение по лицевому счету
        </h2>
      <p class="p-0 m-0 history_title">Период от и до</p>
      <date-picker v-model="rangeDate" range @change="getSelectedDataRange" valueType="format">
      </date-picker>
      <p>
        <span class="mr-3">Печать</span>
        <span class="mr-3">Экспорт в xls</span>
        <span class="mr-3">Экспорт в pdf</span>
      </p>
      <b-table :fields="fields" :items="entries" head-variant="light"
      responsive outlined :filter="filter" :filter-function="filFunc">
      <template #cell(amount)="data">
        <b class="text-info">{{ data.value }}</b>
      </template>
      </b-table>
      <h2 class="licevoischet__page__summ">
        <span>НАЧИСЛЕНИЕ = {{ incomes }}</span>,
        <span>СПИСАНИЕ = {{ outcomes }}</span>,
        <span>ИЗМЕНЕНИЕ  = {{ changes }}</span>
        </h2>
    </div>
      <footer class="container-fluid cust_modal">
        <div class="row">
          <div class="col text-center search__btn" @click="toggleSearch" v-if="!searchActive">
            Фильтр <i class="el-icon-search search_icon"></i>
          </div>
        </div>
        <div v-if="searchActive" class="organization__modal">
          <h3>Фильтр</h3>
          <!-- <BasePeriodPicker :currentPeriod="currentPeriod" v-on:next-period="nextPeriod" /> -->
          <div class="row edit">
            <div class="col-sm-6">
              <input type="text" placeholder="Тип операции" v-model="filter.operType">
            </div>
            <div class="col-sm-6">
              <input type="text" placeholder="Коментарий" v-model="filter.comment">
            </div>
          </div>
          <!-- <div class="row edit">
          <div class="col-sm-6">
            <input type="text" name="" id="" placeholder="Номер накладной" v-model="number" />
          </div>
        </div> -->
          <div class="row edit">
            <div class="col-sm-6">
              <input type="text" placeholder="Пользователь" v-model="filter.user">
            </div>
            <div class="col-sm-6">
              <button class="mr-2" @click="updateData">Показать</button>
            </div>
          </div>
        </div>
      </footer>
  </div>
</template>

<script>
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import 'vue2-datepicker/locale/ru';
import backApi from '../assets/backApi';

export default {
  name: 'AccountDetail',
  components: { DatePicker },
  data() {
    return {
      filter: {
        comment: '',
        operType: '',
        user: '',
      },
      searchActive: false,
      lang: {
        monthBeforeYear: false,
      },
      income: [],
      outcome: [],
      rangeDate: {},
      entries: [],
      fields: [
        {
          key: 'dte',
          label: 'Дата операции',
          sortable: true,
          formatter(v) {
            return new Date(v).toLocaleDateString();
          },
        },
        {
          key: 'income',
          label: 'Начисление',
          sortable: true,
          formatter(v) {
            if (v > 0) {
              return v.toFixed(2);
            }
            return null;
          },
        },
        {
          key: 'outcome',
          label: 'Списание',
          sortable: true,
          formatter(v) {
            if (v < 0) {
              return v.toFixed(2);
            }
            return null;
          },
        },
        {
          key: 'account_type',
          label: 'Тип операции',
          sortable: true,
        },
        {
          key: 'comm',
          label: 'Комментарий',
          sortable: true,
        },
        {
          key: 'balance',
          label: 'Пользователь',
          sortable: true,
          formatter(v) {
            if (v !== null) {
              return 'Пользователь';
            }
            return null;
          },
        },
      ],
    };
  },
  mounted() {
    backApi.get('agent/account-detail').then((Response) => {
      this.entries = Response.data.entries;
      this.income = this.entries.filter((i) => i.amount > 0);
      this.outcome = this.entries.filter((i) => i.amount < 0);
      this.entries.forEach((i) => {
        // eslint-disable-next-line no-param-reassign
        i.income = i.amount;
        // eslint-disable-next-line no-param-reassign
        i.outcome = i.amount;
      });
    });
  },
  computed: {
    incomes() {
      let summ = 0;
      this.income.forEach((item) => {
        summ += item.amount;
      });
      return summ;
    },
    outcomes() {
      let summ = 0;
      this.outcome.forEach((item) => {
        summ += item.amount;
      });
      return summ;
    },
    changes() {
      let summ = 0;
      this.entries.forEach((item) => {
        summ += item.amount;
      });
      return summ.toFixed(2);
    },
  },
  methods: {
    filFunc(row, filter) {
      return (row.account_type.toLowerCase().search(filter.operType.toLowerCase().trim()) !== -1
      && row.comm.toLowerCase().search(filter.comment.toLowerCase().trim()) !== -1
      && String(row.income).toLowerCase().search(filter.user.toLowerCase().trim()) !== -1);
    },
    updateData() {
    },
    toggleSearch() {
      this.searchActive = !this.searchActive;
    },
    back() {
      this.$router.go(-1);
    },
    getSelectedDataRange() {
      // eslint-disable-next-line max-len
      if (this.rangeDate[0] != null && this.rangeDate[1] != null) {
        backApi
          .get('agent/account-detail', {
            params: {
              beg_dte: String(this.rangeDate[0]),
              end_dte: String(this.rangeDate[1]),
            },
          })
          .then((Response) => {
            this.entries = Response.data.entries;
          });
      } else {
        backApi.get('agent/account-detail').then((Response) => {
          this.entries = Response.data.entries;
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.licevoischet__page {
  &__summ {
    text-align: center;
    background-color: #dee2f3;
    font-size: 20px;
    padding: 10px 0px;
  }

  & .exp_print {
    span {
      color: #32aaa7;
      cursor: pointer;
    }
  }
}
@media (max-width: 450px) {
  .licevoischet__page__summ{
    font-size: 18px;
  }
}
.organization__modal {
    //   position: absolute;
    padding: 60px;
    width: 100%;
    bottom: 0;

    & .edit {
      input {
        width: 100%;
        border: 0;
        border-bottom: 1px solid #dee2f3;
        padding-bottom: 10px;
        outline: none;
        margin-bottom: 20px;
      }
      button {
        margin-top: 20px;
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
  }
</style>
<style>
.mx-datepicker svg{
  color: #32AAA7;
}
</style>
