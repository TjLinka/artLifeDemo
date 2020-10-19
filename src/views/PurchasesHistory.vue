<template>
  <div class="licevoischet__page">
    <div class="container">
      <h2 class="page__title">История возвартов</h2>
      <date-picker v-model="rangeDate" range @change="getSelectedDataRange" valueType="format">
      </date-picker>
      <p>
        <span class="mr-3">Печать</span>
        <span class="mr-3">Экспорт в xls</span>
        <span class="mr-3">Экспорт в pdf</span>
      </p>
      <b-table :fields="fields" :items="entries" head-variant="light">
        <template v-slot:cell(show_details)="row">
          <b-button size="sm" @click="show_details(row)" class="mr-2">
            {{ row.detailsShowing ? '-' : '+' }}
          </b-button>
        </template>
        <template v-slot:row-details="row">
          <b-table :fields="returnFields" :items="return_details[row.item.webshop_id]"
           head-variant="light"> </b-table>
        </template>
      </b-table>
      <!-- <h2 class="licevoischet__page__summ">СУММА = {{ summ }}</h2> -->
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
      return_details: [],
      returnFields: [
        {
          key: 'articul',
          label: 'Артикул',
        },
        {
          key: 'itemname',
          label: 'Товар',
        },
        {
          key: 'points',
          label: 'Баллы',
        },
        {
          key: 'price',
          label: 'Цена',
        },
        {
          key: 'cnt',
          label: 'Кол-во',
        },
        {
          key: 'points_cnt  ',
          label: 'Сумма балов',
        },
        {
          key: 'price_cnt',
          label: 'Стоимость',
        },
      ],
      fields: [
        'show_details',
        {
          key: 'webshop_id',
          label: 'Номер соглашения',
          sortable: true,
        },
        {
          key: 'amount',
          label: 'Сумма',
          sortable: true,
        },
        {
          key: 'dte',
          label: 'Дата',
          sortable: true,
        },
        {
          key: 'delivery',
          label: 'Доставка',
          sortable: true,
        },
        {
          key: 'address',
          label: 'Адрес',
          sortable: true,
        },
        {
          key: 'contacts',
          label: 'Контакты',
          sortable: true,
        },
        {
          key: 'status',
          label: 'Статус',
          sortable: true,
        },
      ],
    };
  },
  mounted() {
    backApi.get('agent/refunds').then((Response) => {
      this.entries = Response.data.entries;
      this.return_details = new Array(this.total_rows).fill(undefined);
    });
  },
  computed: {
    summ() {
      let summ = 0;
      this.entries.forEach((item) => {
        summ += item.balance;
      });
      return summ;
    },
  },
  methods: {
    getSelectedDataRange() {
      // eslint-disable-next-line max-len
      if (this.rangeDate[0] != null && this.rangeDate[1] != null) {
        backApi
          .get('agent/refunds', {
            params: {
              beg_dte: String(this.rangeDate[0]),
              end_dte: String(this.rangeDate[1]),
            },
          })
          .then((Response) => {
            this.entries = Response.data.entries;
            this.return_details = new Array(this.total_rows).fill(undefined);
          });
      } else {
        backApi.get('agent/refunds').then((Response) => {
          this.entries = Response.data.entries;
          this.return_details = new Array(this.total_rows).fill(undefined);
        });
      }
    },
    show_details(row) {
      if (row.detailsShowing === true) {
        row.toggleDetails();
      } else if (!this.return_details[row.item.webshop_id]) {
        backApi
          .get('/agent/refunds-detail', { params: { return_id: row.item.webshop_id } })
          .then((response) => {
            this.return_details[row.item.webshop_id] = response.data.entries;
            row.toggleDetails();
          });
      } else {
        row.toggleDetails();
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
