<template>
  <div class="licevoischet__page">
    <div class="container-fluid table_container">
      <h2 class="page__title">
                              <p class="mobile_back" @click="back">
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
      head-variant="light" responsive outlined
      :filter="filter"
      :filter-function="filterFunc"
      >
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
      <footer class="container-fluid cust_modal">
        <div class="row">
          <div class="col text-center search__btn" @click="toggleSearch" v-if="!searchActive">
            Поиск <i class="el-icon-search search_icon"></i>
          </div>
        </div>
        <div v-if="searchActive" class="organization__modal">
          <h3>Поиск
            <span @click="searchActive = !searchActive"
            style="display: inline-block; float: right; color: #32aaa7; cursor: pointer">X</span>
          </h3>
          <div class="row edit mt-5">
            <div class="col-sm-6">
              <el-input
                type="number"
                name=""
                id="art"
                placeholder="Артикул"
                clearable
                v-model="filter.articul"
              />
            </div>
            <div class="col-sm-6">
              <el-input
                type="text"
                name=""
                id="name"
                placeholder="Наименование товара"
                clearable
                v-model="filter.name"
              />
            </div>
          </div>
          <div class="row edit mt-5">
            <div class="col-sm-6">
              <el-input
                type="number"
                name=""
                id="art"
                placeholder="Номер накладной"
                clearable
                v-model="filter.naknum"
              />
            </div>
            <div class="col-sm-6">
              <el-input
                type="text"
                name=""
                id="name"
                placeholder="Номер документа"
                clearable
                v-model="filter.docnum"
              />
            </div>
          </div>
          <div class="row edit mt-5">
            <div class="col-sm-6">
            </div>
            <div class="col-sm-6">
           <div class="col-sm update">
              <button class="mr-2" @click="updateData">Показать</button>
              <button @click="resetData">Сбросить</button>
            </div>
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

export default {
  name: 'AccountDetail',
  components: { DatePicker },
  data() {
    return {
      filter: {},
      articul: null,
      name: null,
      naknum: null,
      docnum: null,
      user: null,
      lang: {
        monthBeforeYear: false,
      },
      searchActive: false,
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
          label: 'Сумма баллов',
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
    resetData() {
      backApi.get('agent/refunds').then((Response) => {
        this.entries = Response.data.entries;
        this.return_details = new Array(this.total_rows).fill(undefined);
      });
      this.searchActive = !this.searchActive;
      this.filter.articul = null;
      this.filter.name = null;
      this.filter.naknum = null;
      this.filter.docnum = null;
    },
    updateData() {
      const data = {
        params: {
          beg_dte: this.rangeDate[0] ? this.rangeDate[0] : null,
          end_dte: this.rangeDate[1] ? this.rangeDate[1] : null,
          articul: this.filter.articul,
          name: this.filter.name,
          // eslint-disable-next-line radix
          saleid: this.filter.naknum ? parseInt(this.filter.naknum) : null,
          // eslint-disable-next-line radix
          refund_id: this.filter.docnum ? parseInt(this.filter.docnum) : null,
        },
      };
      backApi.get('/agent/refunds', data).then((Response) => {
        this.entries = Response.data.entries;
      });
      this.filter.articul = null;
      this.filter.name = null;
      this.filter.naknum = null;
      this.filter.docnum = null;
      this.searchActive = !this.searchActive;
    },
    // eslint-disable-next-line no-unused-vars
    filterFunc(row, filter) {
      return 1;
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
  font-weight: 500;
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
