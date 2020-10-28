<template>
  <div class="licevoischet__page">
    <div class="container">
      <h2 class="page__title">Движение по лицевому счету</h2>
      <p class="p-0 m-0 history_title">Период от и до</p>
      <date-picker v-model="rangeDate" range @change="getSelectedDataRange" valueType="format">
      </date-picker>
      <p>
        <span class="mr-3">Печать</span>
        <span class="mr-3">Экспорт в xls</span>
        <span class="mr-3">Экспорт в pdf</span>
      </p>
      <b-table :fields="fields" :items="entries" head-variant="light" responsive> </b-table>
      <h2 class="licevoischet__page__summ">Изменение лицевого счета за период = {{ summ }}</h2>
    </div>
  </div>
</template>

<script>
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import 'vue2-datepicker/locale/en';
import backApi from '../assets/backApi';

export default {
  name: 'AccountDetail',
  components: { DatePicker },
  data() {
    return {
      lang: {
        monthBeforeYear: false,
      },
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
          key: 'amount',
          label: 'На счет / Со счета',
          sortable: true,
          formatter(v) {
            if (v !== null) {
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
          label: 'Итого на лицевом счете',
          sortable: true,
          formatter(v) {
            if (v !== null) {
              return v.toFixed(2);
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
    });
  },
  computed: {
    summ() {
      let summ = 0;
      this.entries.forEach((item) => {
        summ += item.amount;
      });
      return summ.toFixed(2);
    },
  },
  methods: {
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
</style>
<style>
.mx-datepicker svg{
  color: #32AAA7;
}
</style>
