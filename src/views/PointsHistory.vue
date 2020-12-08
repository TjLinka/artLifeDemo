<template>
  <div class="licevoischet__page">
    <div class="container-fluid table_container">
      <h2 class="page__title">
                              <p class="mobile_back" @click="back">
        <svg width="18" height="12" viewBox="0 0 18 12" fill="none" style="margin-right: 30px;" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 5H3.83L7.41 1.41L6 0L0 6L6 12L7.41 10.59L3.83 7H18V5Z" fill="#32AAA7"/>
        </svg>
      </p>
        История баллов</h2>
      <p class="p-0 m-0 history_title">Период от и до</p>
      <date-picker v-model="rangeDate" range @change="getSelectedDataRange" valueType="format">
      </date-picker>
      <p class="exp_print">
        <span class="mr-3">Печать</span>
        <span class="mr-3">Экспорт в xls</span>
        <span class="mr-3">Экспорт в pdf</span>
      </p>
      <b-table responsive :fields="fields" :items="entries" head-variant="light"
      class="points_history_table" outlined>
        <template #table-colgroup="scope">
          <col
            v-for="field in scope.fields"
            :key="field.key"
            :style="{ width: field.width }"
          />
        </template>
          <template #cell(comdte)="data">
            {{ data.value }}
          </template>
          <template #cell(income)="data">
            {{ data.value | localInt }}
          </template>
          <template #cell(outcome)="data">
            {{ data.value | localInt}}
          </template>
      </b-table>
      <h2 class="licevoischet__page__summ">
        НА СЧЁТ = {{ summIncome }} , СО СЧЕТА = {{ summOutcome }}, ИЗМЕНЕНИЯ = {{ changes }}
      </h2>
    </div>
      <footer class="container-fluid cust_modal pb-4">
      <div class="row desk_trans">
        <div class="col text-center search__btn" @click="toggleSearch" v-if="!searchActive">
          Настройки трансфера <i class="el-icon-s-tools search_icon"></i>
        </div>
      </div>
      <div v-if="searchActive" class="organization__modal">
        <span @click="closeModal" class="close_btn">X</span>
        <h3 class="mt-4">Фильтры</h3>
        <div class="row">
          <div class="col-md-12 mt-4">
            <b-form-group label="" class="flex-radio">
              <b-form-radio
                v-model="points_type"
                name="some-radios-1"
                value="0"
                class="radio mr-3"
                >Резерв</b-form-radio
              >
              <b-form-radio
                v-model="points_type"
                name="some-radios-1"
                value="1"
                class="radio mr-3"
                >ЛО</b-form-radio
              >
              <b-form-radio
                v-model="points_type"
                name="some-radios-1"
                :value="null"
                class="radio"
                >Все</b-form-radio
              >
            </b-form-group>
          </div>
        </div>
        <div class="row edit mt-4">
          <div class="col-md-6">
            <input type="text" name="operType"
            id="operType" required v-model="operType" />
            <label for="operType">Тип операции:</label>
            <span class="clear_icon" @click="clearOperType('operType')">X</span>
          </div>
          <!-- <div class="col-md-6">
           <input type="text" name="user"
            id="user" required v-model="user" />
            <label for="user">Пользователь:</label>
            <span class="clear_icon" @click="clearUser('user')">X</span>
          </div> -->
          <div class="col-md-6">
           <input type="text" name="comment"
            id="comment" required v-model="comment" />
            <label for="comment">Комментарий:</label>
            <span class="clear_icon" @click="clearComment('comment')">X</span>
          </div>
        </div>
        <div class="row edit mt-4">
          <div class="col">
            <button class="mr-2 update" @click="updateData">Показать</button>
          </div>
        </div>
      </div>
      </footer>
  </div>
</template>

<script>
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import 'vue2-datepicker/locale/en';
import backApi from '../assets/backApi';
// import { ReplaceNull } from '../assets/utils';

export default {
  name: 'PointsHistory',
  components: { DatePicker },
  data() {
    return {
      operType: null,
      comment: null,
      points_type: null,
      currentPeriodTop: {},
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
          key: 'comdte',
          label: 'Период',
          width: '150px',
          sortable: true,
          formatter(v) {
            return new Date(v).toLocaleDateString();
          },
        },
        {
          key: 'income',
          label: 'На счёт',
          sortable: true,
        },
        {
          key: 'outcome',
          label: 'Со счёта',
          sortable: true,
        },
        {
          key: 'opertype',
          label: 'Тип операции',
          sortable: true,
        },
        {
          key: 'pointstype',
          label: 'Тип баллов',
          sortable: true,
        },
        {
          key: 'comm',
          label: 'Комментарий',
          width: '300px',
          sortable: true,
        },
      ],
    };
  },
  mounted() {
    backApi.get('agent/points-detail').then((Response) => {
      this.entries = Response.data.entries;
    });
  },
  computed: {
    summIncome() {
      let summIncome = 0;
      this.entries.forEach((item) => {
        summIncome += item.income;
      });
      return summIncome.toFixed(2);
    },
    summOutcome() {
      let summOutcome = 0;
      this.entries.forEach((item) => {
        summOutcome += item.outcome;
      });
      return summOutcome.toFixed(2);
    },
    changes() {
      return (this.summIncome - this.summOutcome).toFixed(2);
    },
  },
  methods: {
    // eslint-disable-next-line no-unused-vars
    // filFunc(row, filter) {
    //   return (row.opertype.toLowerCase().search(filter.operType.toLowerCase().trim()) !== -1
    //   && row.comm.toLowerCase().search(filter.comment.toLowerCase().trim()) !== -1);
    // },
    clearComment() {
      this.filter.comment = '';
    },
    clearOperType() {
      this.filter.operType = '';
    },
    closeModal() {
      this.searchActive = !this.searchActive;
    },
    toggleSearch() {
      this.searchActive = !this.searchActive;
    },
    updateData() {
      const data = {
        params: {
          beg_dte: this.rangeDate[0] ? this.rangeDate[0] : null,
          end_dte: this.rangeDate[1] ? this.rangeDate[1] : null,
          points_type: this.points_type,
          operation_type: this.operType,
          comm_find: this.comment,
        },
      };
      backApi.get('/agent/points-detail', data).then((Response) => {
        this.entries = Response.data.entries;
      });
    },
    back() {
      this.$router.go(-1);
    },
    getSelectedDataRange() {
      // eslint-disable-next-line max-len
      if (this.rangeDate[0] != null && this.rangeDate[1] != null) {
        backApi
          .get('agent/points-detail', {
            params: {
              beg_dte: String(this.rangeDate[0]),
              end_dte: String(this.rangeDate[1]),
            },
          })
          .then((Response) => {
            this.entries = Response.data.entries;
          });
      } else {
        backApi.get('agent/points-detail').then((Response) => {
          this.entries = Response.data.entries;
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.update{
  display: block;
  float: right;
  width: 20% !important;
}
.col-md-6,
.col-md {
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
.licevoischet__page {
  padding-bottom: 40px;
  &__summ {
    text-align: center;
    background-color: #dee2f3;
    font-size: 12px;
    padding: 10px 0px;
  }
  & .exp_print {
    span {
      color: #32aaa7;
      cursor: pointer;
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
    margin-bottom: 20px;
    text-transform: uppercase;
    font-weight: 500;

    & .search_icon {
      color: #32aaa7;
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
</style>
<style>
.mx-datepicker svg {
  color: #32aaa7;
}
.mx-input{
  border: 0;
  border-bottom: 1px solid #DEE2F3;
  border-radius: 0;
}
.flex-radio div[role='group']{
    display: flex;
}
</style>
