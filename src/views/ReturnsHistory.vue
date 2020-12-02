<template>
  <div class="licevoischet__page">
    <div class="container-fluid table_container">
      <h2 class="page__title">
                              <p class="mobile_back">
        <svg width="18" height="12" viewBox="0 0 18 12" fill="none" style="margin-right: 30px;" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 5H3.83L7.41 1.41L6 0L0 6L6 12L7.41 10.59L3.83 7H18V5Z" fill="#32AAA7"/>
        </svg>
      </p>
        История возвартов
        </h2>
      <p class="p-0 m-0 history_title">Период от и до</p>
      <date-picker v-model="rangeDate" range @change="getSelectedDataRange" valueType="format">
      </date-picker>
      <p>
        <span class="mr-3">Печать</span>
        <span class="mr-3">Экспорт в xls</span>
        <span class="mr-3">Экспорт в pdf</span>
      </p>
      <div class="refound_table">
      <b-table :fields="fields" :items="entries"
      head-variant="light" responsive outlined>
        <template v-slot:cell(nomer)="row">
          <b-button size="sm" @click="show_details(row)" class="mr-2">
            <span>{{ row.detailsShowing ? '-' : '+' }}</span>
          </b-button>
            <span>{{row.item.webshop_id}}</span>
        </template>
        <template v-slot:row-details="row">
          <div class="sub_table">
                      <b-table :fields="returnFields" :items="return_details[row.item.webshop_id]"
           head-variant="light"> </b-table>
          </div>
        </template>
      </b-table>
      </div>
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
          key: 'points_cnt',
          label: 'Сумма балов',
        },
        {
          key: 'price_cnt',
          label: 'Стоимость',
        },
      ],
      fields: [
        {
          key: 'nomer',
          label: 'Номер документа',
          sortable: true,
        },
        // {
        //   key: 'webshop_id',
        //   label: 'Номер соглашения',
        //   sortable: true,
        // },
        {
          key: 'amount',
          label: 'Сумма',
          sortable: true,
          fomratter(v) {
            if (v !== null) {
              return v.toFixed(2);
            }
            return null;
          },
        },
        {
          key: 'dte',
          label: 'Дата',
          sortable: true,
          formatter(v) {
            return new Date(v).toLocaleDateString();
          },
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
          .get('/agent/refunds-detail', { params: { id: row.item.webshop_id } })
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
.btn{
  border: 0 !important;
}
.btn-secondary {
  color: black;
  background: none;
  border: 0;
  outline: none !important;
  box-shadow: none;
  font-weight: bold;
  font-size: 18px;
}
.btn-secondary:not(:disabled):not(.disabled):active,
.btn-secondary:not(:disabled):not(.disabled).active,
.show > .btn-secondary.dropdown-toggle{
  background-color: unset;
  outline: none;
}
.btn-secondary:not(:disabled):not(.disabled):active:focus,
.btn-secondary:not(:disabled):not(.disabled).active:focus,
.show > .btn-secondary.dropdown-toggle:focus{
  box-shadow: none;
}
</style>
<style>
.mx-datepicker svg{
  color: #32AAA7;
}
table[aria-colcount="7"] > tbody > tr.b-table-has-details > td{
  background: #32AAA7;
  color: white !important;
  margin-bottom: 0;
}
.sub_table > table > tbody > tr.b-table-has-details > td{
  background: white !important;
  color: black !important;
}
.sub_table > table {
  margin-bottom: 0;
}
/* .refound_table table[aria-colcount="6"]{
  margin-bottom: 0;
}
.refound_table table[aria-colcount="6"] td{
  background-color: #D4D5D7;
}
.refound_table table[aria-colcount="6"] td[aria-colindex='1']{
  width: 20%;
}
.refound_table table[aria-colcount="2"] td[aria-colindex='1']{
  width: 20% !important;
}
.refound_table table[aria-colcount="2"] > thead > tr > th[role="columnheader"]:nth-of-type(1){
  width: 20% !important;
} */
.refound_table table[aria-colcount="7"] tr[tabindex='-1'] > td{
  padding: 0;
  /* padding-top: 10px !important; */
}
</style>
