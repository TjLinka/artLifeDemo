<template>
  <div class="licevoischet__page">
    <div class="container">
      <h2 class="page__title">История баллов</h2>
      <p class="p-0 m-0">Период от и до</p>
      <date-picker v-model="rangeDate" range @change="getSelectedDataRange" valueType="format">
      </date-picker>
      <p class="exp_print">
        <span class="mr-3">Печать</span>
        <span class="mr-3">Экспорт в xls</span>
        <span class="mr-3">Экспорт в pdf</span>
      </p>
      <b-table fixed responsive :fields="fields" :items="entries" head-variant="light">
        <template #table-colgroup="scope">
          <col
            v-for="field in scope.fields"
            :key="field.key"
            :style="{ width: field.key === 'dte' ? '130px' : '120px' }"
          />
        </template>
      </b-table>
      <h2 class="licevoischet__page__summ">
        СУММА СПИСАНИЙ = {{ summIncome }} , СУММА НАЧИСЛЕНИЙ = {{ summOutcome }}
      </h2>
    </div>
  </div>
</template>

<script>
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import 'vue2-datepicker/locale/en';
import backApi from '../assets/backApi';

export default {
  name: 'PointsHistory',
  components: { DatePicker },
  data() {
    return {
      rangeDate: {},
      entries: [],
      fields: [
        {
          key: 'dte',
          label: 'Дата операции',
          sortable: true,
        },
        {
          key: 'comdte',
          label: 'Период',
          sortable: true,
        },
        {
          key: 'income',
          label: 'Списание',
          sortable: true,
        },
        {
          key: 'outcome',
          label: 'Начисление',
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
  },
  methods: {
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
.licevoischet__page {
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
</style>
