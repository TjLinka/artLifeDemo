<template>
  <div class="licevoischet__page">
    <div class="container-fluid table_container">
      <h2 class="page__title">
        <p class="mobile_back" @click="back">
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
        История покупок
      </h2>
      <date-picker
      v-model="rangeDate"
      range-separator=" - "
      range
      @change="getSelectedDataRange"
      format="DD.MM.YYYY"
      value-type="YYYY-MM-DD"
      >
      </date-picker>
        <div class="row mobile_search">
          <div class="col search__btn" @click="toggleSearch" v-if="!searchActive">
            Поиск покупки <i class="el-icon-search search_icon"></i>
          </div>
        </div>
      <div class="tags">
      <el-tag
        v-for="tag in tags"
        :key="tag.name"
        closable
        @close="handleClose($event, tag)"
        :type="tag.type"
        :disable-transitions="true"
      >
        {{ tag.name }}
      </el-tag>
      </div>
      <p>
        <!-- <span class="mr-3">Печать</span> -->
        <span class="mr-3" @click="downloadXls">Экспорт в xlsx</span>
        <span class="mr-3" @click="downloadPdf">Экспорт в pdf</span>
        <span class="mr-3" >Экспорт накладной в pdf</span>
        <!-- <span class="mr-3">Экспорт накладной в pdf</span> -->
      </p>
      <div class="perchases_table">
        <b-table :fields="fields" :items="entries"
        head-variant="light" responsive outlined>
          <template v-slot:cell(nomer)="row">
            <b-button size="sm" @click="show_details(row)" class="mr-2">
              {{ row.detailsShowing ? '-' : '+' }}
            </b-button>
            <span>{{ row.item.webshop_id }}</span>
          </template>
          <template v-slot:cell(delivery)="row">
              <span>{{row.item.delivery === 'нет' ? 'Самовывоз' : 'Доставка до адреса'}}</span>
            <!-- <span>{{ row.item.webshop_id }}</span> -->
          </template>
          <template v-slot:row-details="row">
            <div class="sub_table">
              <b-table
                :fields="returnFields"
                :items="return_details[row.item.webshop_id]"
                head-variant="light"
              >
              </b-table>
            </div>
          </template>
        </b-table>
      </div>
      <footer class="container-fluid cust_modal">
        <div class="container-md">
        <div class="row desktop_search">
          <div class="col text-center search__btn" @click="toggleSearch" v-if="!searchActive">
            Фильтр <i class="el-icon-search search_icon"></i>
          </div>
        </div>
        <div v-if="searchActive" class="organization__modal">
          <h3>
            Фильтр
            <span class="close_btn" @click="searchActive = !searchActive"></span>
          </h3>
          <!-- <div class="mt-3">
            <BasePeriodPicker :currentPeriod="currentPeriod" v-on:next-period="nextPeriod" />
          </div> -->
          <div class="row edit mt-5">
            <div class="col-sm-6 custom_input">
              <input type="number" name="articul" id="articul" required v-model="articul" />
              <label for="articul">Артикул</label>
              <span class="clear_icon" @click="clearArticul()"></span>
            </div>
            <div class="col-sm-6 custom_input">
              <input type="text" name="status" id="status" required v-model="status" />
              <label for="status">Статус</label>
              <span class="clear_icon" @click="clearStatus()"></span>
            </div>
          </div>
          <div class="row edit mt-5">
            <div class="col-sm-6 custom_input">
              <input type="text" name="naknum" id="naknum" required v-model="naknum" />
              <label for="naknum">Номер накладной</label>
              <span class="clear_icon" @click="clearNaknum()"></span>
            </div>
          <div class="col-md-6">
            <span
            v-if="delivery"
            class="custom_label"
            >
            Доставка</span>
            <el-select
            v-model="delivery"
            clearable
            placeholder="Доставка">
              <el-option
                v-for="item in deliveryList"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </div>
          </div>
          <div class="row mt-5 edit justify-content-end">
            <div class="col-sm-6 custom_input">
              <input type="text" name="name" id="name" required v-model="name" />
              <label for="name">Наименование товара</label>
              <span class="clear_icon" @click="clearName()"></span>
            </div>
            <div class="col-xl-6 update">
              <button class="mr-2" @click="updateData">Показать</button
              ><button @click="clearSelectedFilters">Сбросить</button>
            </div>
          </div>
        </div>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-param-reassign */
import DatePicker from 'vue2-datepicker';
import backApi from '../assets/backApi';
// import BasePeriodPicker from '../components/BasePeriodPicker.vue';
import 'vue2-datepicker/index.css';
import 'vue2-datepicker/locale/ru';

export default {
  name: 'AccountDetail',
  components: {
    // BasePeriodPicker,
    DatePicker,
  },
  data() {
    return {
      deliveryList: ['Самовывоз', 'Доставка до адреса'],
      delivery: '',
      status: '',
      naknum: '',
      allData: [],
      lang: {
        monthBeforeYear: false,
      },
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
      periods: [],
      rangeDate: [],
      periodIndex: 0,
      period_enabled: true,
      searchActive: false,
      name: null,
      articul: null,
      saleid: null,
      // rangeDate: {},
      entries: [],
      return_details: [],
      tags: [],
      returnFields: [
        {
          key: 'articul',
          label: 'Артикул',
          sortable: true,
          thStyle: {
            width: '150px',
          },
        },
        {
          key: 'itemname',
          label: 'Наименование товара',
          sortable: true,
        },
        {
          key: 'points',
          label: 'Баллы',
          sortable: true,
          fomratter(v) {
            if (v !== null) {
              return v.toFixed(2);
            }
            return null;
          },
        },
        {
          key: 'price',
          label: 'Цена',
          sortable: true,
          fomratter(v) {
            if (v !== null) {
              return v.toFixed(2);
            }
            return null;
          },
        },
        {
          key: 'cnt',
          label: 'Кол-во',
          sortable: true,
          fomratter(v) {
            if (v !== null) {
              return v.toFixed(2);
            }
            return null;
          },
        },
        {
          key: 'points_all',
          label: 'Сумма балов',
          sortable: true,
          fomratter(v) {
            if (v !== null) {
              return v.toFixed(2);
            }
            return null;
          },
        },
        {
          key: 'price_total',
          label: 'Стоимость',
          sortable: true,
          fomratter(v) {
            if (v !== null) {
              return v.toFixed(2);
            }
            return null;
          },
        },
      ],
      fields: [
        {
          key: 'nomer',
          label: 'Номер накладной',
          sortable: true,
          thStyle: {
            width: '150px',
            minWidth: '150px',
          },
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
    backApi.get('agent/bonus-detail/periods').then((Response) => {
      this.periods = Response.data.entries.sort((a, b) => {
        const result = a.comdte > b.comdte ? 1 : -1;
        return result;
      });
      this.periodIndex = this.periods.length - 1;
    });
    backApi.get('agent/sales').then((Response) => {
      this.entries = Response.data.entries;
      this.return_details = new Array(this.total_rows).fill(undefined);
    });
  },
  computed: {
    currentPeriod() {
      try {
        return this.periods[this.periodIndex].comdte;
      } catch (e) {
        return '';
      }
    },
  },
  methods: {
    getSelectedDataRange() {
      const data = {
        params: {
          beg_dte: this.rangeDate ? this.rangeDate[0] : null,
          end_dte: this.rangeDate ? this.rangeDate[1] : null,
        },
      };
      backApi.get('/agent/sales', data).then((Response) => {
        this.entries = Response.data.entries;
      });
    },
    downloadXls() {
      backApi.get('/agent/sales/excel',
        {
          params:
          {
            name: this.name,
            articul: this.articul,
            saleid: this.saleid,
            comdte: this.period_enabled ? this.currentPeriod : null,
          },
          responseType: 'blob',
        })
        .then(({ data }) => {
          const filename = 'История покупок.xlsx';
          const url = window.URL.createObjectURL(new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', filename);
          document.body.appendChild(link);
          link.click();
          link.remove();
        });
    },
    downloadPdf() {
      backApi.get('/agent/sales/pdf',
        {
          params:
          {
            name: this.name,
            articul: this.articul,
            saleid: this.saleid,
            comdte: this.period_enabled ? this.currentPeriod : null,
          },
          responseType: 'blob',
        })
        .then(({ data }) => {
          const filename = 'История покупок.pdf';
          const url = window.URL.createObjectURL(new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', filename);
          document.body.appendChild(link);
          link.click();
          link.remove();
        });
    },
    clearArticul() {
      this.articul = '';
    },
    clearName() {
      this.name = '';
    },
    clearNaknum() {
      this.naknum = '';
    },
    clearStatus() {
      this.status = '';
    },
    back() {
      this.$router.go(-1);
    },
    nextPeriod(x) {
      this.period_enabled = true;
      this.periodIndex = (this.periodIndex + this.periods.length + x) % this.periods.length;
    },
    handleClose(event, tag) {
      // this.tags.splice(this.dynamicTags.indexOf(tag), 1);
      this.tags.splice(this.tags.indexOf(tag), 1);
      if (tag.key === 'articul') {
        this.articul = null;
      } else if (tag.key === 'name') {
        this.name = null;
      } else if (tag.key === 'period') {
        this.period_enabled = false;
      }
      this.updateData();
    },
    updateData() {
      const data = {
        params: {
          articul: this.articul !== '' ? this.articul : null,
          name: this.name,
          // eslint-disable-next-line radix
          saleid: this.naknum !== '' ? parseInt(this.naknum) : null,
          beg_dte: this.rangeDate ? this.rangeDate[0] : null,
          end_dte: this.rangeDate ? this.rangeDate[1] : null,
          i_delivery: this.delivery !== '' ? this.delivery : null,
          i_status: this.status !== '' ? this.status : null,
        },
      };
      if (this.articul !== null && this.articul !== '') {
        const tag = this.tags.find((t) => t.key === 'articul');
        if (tag) {
          tag.name = this.articul;
        } else if (this.tree_type !== 'full') {
          this.tags.push({ name: `Артикул: ${this.articul}`, key: 'articul' });
        }
      }
      if (this.name !== null && this.name !== '') {
        const tag = this.tags.find((t) => t.key === 'name');
        if (tag) {
          tag.name = this.name;
        } else {
          this.tags.push({ name: `Наименование: ${this.name}`, key: 'name' });
        }
        data.params.agent_id = this.agent_id;
      }
      const tag = this.tags.find((t) => t.key === 'period');
      if (tag) {
        tag.name = `${this.months[new Date(this.currentPeriod).getMonth()]} ${new Date(
          this.currentPeriod,
        ).getFullYear()}`;
      } else if (this.currentPeriod !== this.periods[this.periods.length - 1].comdte) {
        this.tags.push({
          name: `${this.months[new Date(this.currentPeriod).getMonth()]} ${new Date(
            this.currentPeriod,
          ).getFullYear()}`,
          key: 'period',
        });
      }
      // const params = { name: this.name, articul: this.articul, saleid: this.number };
      backApi.get('agent/sales', data).then((Response) => {
        this.entries = Response.data.entries;
        this.return_details = new Array(this.total_rows).fill(undefined);
      });
      if (this.searchActive === true) {
        this.searchActive = false;
      }
    },
    clearSelectedFilters() {
      this.name = '';
      this.articul = '';
      this.naknum = '';
      this.tags = [];
      backApi.get('agent/sales').then((Response) => {
        this.entries = Response.data.entries;
        this.return_details = new Array(this.total_rows).fill(undefined);
      });
      this.searchActive = !this.searchActive;
    },
    toggleSearch() {
      this.searchActive = !this.searchActive;
    },
    show_details(row) {
      if (row.detailsShowing === true) {
        row.toggleDetails();
      } else if (!this.return_details[row.item.webshop_id]) {
        backApi.get('/agent/sales-detail', { params: { id: row.item.webshop_id } })
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
.el-select{
  width: 100%;
}
.tags{
  margin: 10px 0px 20px 0px;
}
.mobile_search{
  display: none;
}
.update{
  display: flex;
  justify-content: space-between;
  & button{
    display: inline-block;
    width: 100%;
  }
}
.licevoischet__page {
  position: relative;
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
  & .organization__modal {
    position: relative;
    margin: 20px 0px;
    width: 100%;
    bottom: 0;

    & .edit {
      input {
        // margin-bottom: 20px;
      }
      button {
        // margin-top: 20px;
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
}
@media (max-width: 768px) {
  .mobile_search{
    display: block;
    & i{
      margin-left: 10px;
    }
  }
  .desktop_search{
    display: none;
  }
}
.btn {
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
.show > .btn-secondary.dropdown-toggle {
  background-color: unset;
  outline: none;
}
.btn-secondary:not(:disabled):not(.disabled):active:focus,
.btn-secondary:not(:disabled):not(.disabled).active:focus,
.show > .btn-secondary.dropdown-toggle:focus {
  box-shadow: none;
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
table[aria-colcount='7'] > tbody > tr.b-table-has-details > td {
  background: #32aaa7;
  color: white !important;
  margin-bottom: 0;
}
.sub_table > table > tbody > tr > td {
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
.perchases_table table[aria-colcount='7'] tr[tabindex='-1'] > td {
  padding: 0;
  /* padding-top: 10px !important; */
}
</style>
