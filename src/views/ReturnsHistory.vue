<template>
  <div class="licevoischet__page">
    <div v-loading="loading">
      <div class="container-fluid table_container" v-show="!loading">
        <h2 class="page__title">
          <p class="mobile_back noprint" @click="back">
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
          <!-- {{$t("История возвратов")}} -->
        </h2>
        <p class="p-0 m-0 history_title" v-if="rangeDate[0] !== null && rangeDate.length > 0">
          {{ $t('Период от и до') }}
        </p>
        <div class="row">
          <div class="col-md-6">
            <date-picker
              v-model="rangeDate"
              range-separator=" - "
              range
              @clear="clearDP"
              @change="getSelectedDataRange"
              format="DD.MM.YYYY"
              :editable="false"
              placeholder="дд.мм.гггг - дд.мм.гггг"
              value-type="YYYY-MM-DD"
              style="width: 100%"
            >
            </date-picker>
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
        <div class="row mobile_search">
          <div class="col search__btn noprint" @click="toggleSearch" v-if="!searchActive">
            {{ $t('Поиск возврата') }} <span class="search_icons mobi"></span>
          </div>
        </div>
        <p class="exp_print mt-3 noprint">
          <!-- <span class="mr-3">Печать</span> -->
          <span class="mr-3" @click="downloadPdf">{{ $t('Экспорт в pdf') }}</span>
          <span class="mr-3" @click="downloadXls">{{ $t('Экспорт в xlsx') }}</span>
          <!-- <button
        :class="`mr-3 nak ${printNakAccess ? '' : 'disabled'}`"
        :disabled="!printNakAccess"
        >Экспорт возвратной накладной в pdf</button> -->
          <!-- <span class="mr-3">Экспорт возвратной накладной в pdf</span> -->
        </p>
        <div class="refound_table mb-3">
          <b-table :fields="fields" :items="entries" head-variant="light" responsive outlined>
            <template v-slot:cell(refund_doc_id)="row">
              <b-button size="sm" @click="show_details(row)" class="mr-2">
                <span>{{ row.detailsShowing ? '-' : '+' }}</span>
              </b-button>
              <span>{{ row.item.refund_doc_id }}</span>
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
        <!-- <h2 class="licevoischet__page__summ">СУММА = {{ summ }}</h2> -->
      </div>
    </div>
    <footer class="container-fluid cust_modal">
      <div class="container-md">
        <div class="row desktop_search">
          <div class="col text-center search__btn" @click="toggleSearch" v-if="!searchActive">
            {{ $t('Фильтр') }} <span class="search_icons"></span>
          </div>
        </div>
        <div v-if="searchActive" class="organization__modal">
          <h3>
            {{ $t('Фильтр') }}
            <span @click="searchActive = !searchActive" class="close_btn"></span>
          </h3>
          <div class="row edit">
            <div class="col-sm-6 custom_input">
              <input
                type="number"
                name="articul"
                id="articul"
                required
                v-model="filterData.articul"
              />
              <label for="articul">{{ $t('Артикул') }}</label>
              <span class="clear_icon" @click="clearInput('articul')"></span>
            </div>
            <div class="col-sm-6 custom_input">
              <input type="text" name="name" id="name" required v-model="filterData.name" />
              <label for="name">{{ $t('Наименование товара') }}</label>
              <span class="clear_icon" @click="clearInput('name')"></span>
            </div>
          </div>
          <div class="row edit">
            <div class="col-sm-6 custom_input">
              <input type="number" name="naknum" id="naknum" required v-model="filterData.naknum" />
              <label for="naknum">{{ $t('Номер накладной') }}</label>
              <span class="clear_icon" @click="clearInput('naknum')"></span>
            </div>
            <div class="col-sm-6 custom_input">
              <input type="number" name="docnum" id="docnum" required v-model="filterData.docnum" />
              <label for="docnum">{{ $t('Номер возвратной накладной') }}</label>
              <span class="clear_icon" @click="clearInput('docnum')"></span>
            </div>
          </div>
          <div class="row edit mt-4">
            <div class="col-xl-6"></div>
            <div class="col-xl-6">
              <div class="col-sm update">
                <button
                  :class="`mr-2 ${isDisabled ? 'disabled' : 'a'}`"
                  @click="updateData"
                  :disabled="isDisabled"
                >
                  {{ $t('Показать') }}
                </button>
                <button @click="resetData">{{ $t('Сбросить') }}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import $ from 'jquery';
import { mapActions } from 'vuex';
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import 'vue2-datepicker/locale/ru';
import backApi from '../assets/backApi';
import dateFormat from '../assets/localDateFunc';

export default {
  name: 'AccountDetail',
  components: { DatePicker },
  data() {
    return {
      loading: true,
      tags: [],
      filterData: {
        articul: null,
        name: null,
        naknum: '',
        docnum: '',
      },
      user: null,
      lang: {
        monthBeforeYear: false,
      },
      printNakAccess: false,
      searchActive: false,
      rangeDate: {},
      entries: [],
      return_details: [],
      returnFields: [
        {
          key: 'articul',
          label: this.$t('Артикул'),
          sortable: true,
          thStyle: {
            minWidth: '105px',
          },
        },
        {
          key: 'itemname',
          label: this.$t('Наименование товара'),
          sortable: true,
        },
        {
          key: 'points',
          label: this.$t('Баллы'),
          sortable: true,
          formatter(v) {
            if (v > 0) {
              const formatter = new Intl.NumberFormat('ru');
              return formatter.format(v);
            }
            return null;
          },
        },
        {
          key: 'price',
          label: this.$t('Цена'),
          sortable: true,
          formatter(v) {
            if (v > 0) {
              const formatter = new Intl.NumberFormat('ru');
              return formatter.format(v);
            }
            return null;
          },
        },
        {
          key: 'cnt',
          label: this.$t('Кол-во'),
          sortable: true,
        },
        {
          key: 'points_cnt',
          label: this.$t('Сумма баллов'),
          sortable: true,
          formatter(v) {
            if (v > 0) {
              const formatter = new Intl.NumberFormat('ru');
              return formatter.format(v);
            }
            return null;
          },
        },
        {
          key: 'price_cnt',
          label: this.$t('Стоимость'),
          sortable: true,
          formatter(v) {
            if (v > 0) {
              const formatter = new Intl.NumberFormat('ru');
              return formatter.format(v);
            }
            return null;
          },
        },
      ],
      fields: [
        {
          key: 'refund_doc_id',
          label: this.$t('Номер возвратной накладной'),
          sortable: true,
          // thStyle: {
          //   width: '200px',
          //   minWidth: '110px',
          // },
        },
        // {
        //   key: 'webshop_id',
        //   label: 'Номер соглашения',
        //   sortable: true,
        // },
        {
          key: 'amount',
          label: this.$t('Сумма'),
          sortable: true,
          formatter(v) {
            if (v > 0) {
              const formatter = new Intl.NumberFormat('ru');
              return formatter.format(v);
            }
            return null;
          },
        },
        {
          key: 'dte',
          label: this.$t('Дата'),
          sortable: true,
          formatter(v) {
            return dateFormat(v);
          },
        },
        {
          key: 'source_doc_id',
          label: this.$t('Номер накладной'),
          sortable: true,
        },
        {
          key: 'status',
          label: this.$t('Статус'),
          sortable: true,
        },
        {
          key: 'points',
          label: this.$t('Сумма баллов'),
          sortable: true,
        },
        {
          key: 'source_stock_name',
          label: this.$t('Склад покупки'),
          sortable: true,
        },
      ],
    };
  },
  metaInfo() {
    this.setPageTitle(this.$t('История возвратов'));
    return {
      title: `${this.$t('ЛК Партнера')} - ${this.$t('История возвратов')}`,
    };
  },
  mounted() {
    this.rangeDate = [
      this.$moment()
        .subtract(1, 'months')
        .startOf('month')
        .format('YYYY-MM-DD'),
      this.$moment()
        .subtract(0, 'months')
        .endOf('month')
        .format('YYYY-MM-DD'),
    ];
    backApi
      .get('agent/refunds', {
        params: {
          beg_dte: this.$moment()
            .subtract(1, 'months')
            .startOf('month')
            .format('YYYY-MM-DD'),
          end_dte: this.$moment()
            .subtract(0, 'months')
            .endOf('month')
            .format('YYYY-MM-DD'),
        },
      })
      .then(Response => {
        this.entries = Response.data.entries;
        this.return_details = new Array(this.total_rows).fill(undefined);
      })
      .then(() => {
        this.loading = false;
      });
  },
  computed: {
    isDisabled() {
      if (
        (this.filterData.articul === null || this.filterData.articul === '') && (this.filterData.name === null || this.filterData.name === '')
        && (this.filterData.naknum === null || this.filterData.naknum === '')
        && (this.filterData.docnum === null || this.filterData.docnum === '')
      ) {
        return true;
      }
      return false;
    },
    summ() {
      let summ = 0;
      this.entries.forEach(item => {
        summ += item.balance;
      });
      return summ;
    },
  },
  methods: {
    ...mapActions('currentPage', ['setPageTitle']),
    clearDP() {
      // this.rangeDate = [
      //   this.$moment().subtract(0, 'months').startOf('month').format('YYYY-MM-DD'),
      //   this.$moment().subtract(0, 'months').endOf('month').format('YYYY-MM-DD'),
      // ];
      // backApi.get('agent/refunds', {
      //   params: {
      //     beg_dte: this.$moment().subtract(0, 'months').startOf('month').format('YYYY-MM-DD'),
      //     end_dte: this.$moment().subtract(0, 'months').endOf('month').format('YYYY-MM-DD'),
      //   },
      // }).then((Response) => {
      //   this.entries = Response.data.entries;
      //   this.return_details = new Array(this.total_rows).fill(undefined);
      // }).then(() => {
      //   this.loading = false;
      // });
    },
    handleClose(event, tag) {
      // this.tags.splice(this.dynamicTags.indexOf(tag), 1);
      this.tags.splice(this.tags.indexOf(tag), 1);
      if (tag.key === 'articul') {
        this.filterData.articul = null;
      }
      if (tag.key === 'name') {
        this.filterData.name = null;
      }
      if (tag.key === 'naknum') {
        this.filterData.naknum = null;
      }
      if (tag.key === 'docnum') {
        this.filterData.docnum = null;
      }
      // if (tag.key === 'period') {
      //   this.period_enabled = false;
      // }
      this.updateData(false);
    },
    clearInput(name) {
      this.filterData[name] = null;
    },
    downloadXls() {
      backApi
        .get('/agent/refunds/excel', {
          params: {
            beg_dte: this.rangeDate[0] ? this.rangeDate[0] : null,
            end_dte: this.rangeDate[1] ? this.rangeDate[1] : null,
            articul: this.filterData.articul,
            name: this.filterData.name,
            saleid: this.filterData.naknum ? this.filterData.naknum : null,
            refund_id: this.filterData.docnum ? this.filterData.docnum : null,
          },
          responseType: 'blob',
        })
        .then(({ data }) => {
          const filename = `${this.$t('История возвратов')}.xlsx`;
          const url = window.URL.createObjectURL(
            new Blob([data], {
              type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            }),
          );
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', filename);
          document.body.appendChild(link);
          link.click();
          link.remove();
        });
    },
    downloadPdf() {
      backApi
        .get('/agent/refunds/pdf', {
          params: {
            beg_dte: this.rangeDate[0] ? this.rangeDate[0] : null,
            end_dte: this.rangeDate[1] ? this.rangeDate[1] : null,
            articul: this.articul,
            name: this.filterData.name,
            // eslint-disable-next-line radix
            saleid: this.filterData.naknum ? parseInt(this.filterData.naknum) : null,
            // eslint-disable-next-line radix
            refund_id: this.filterData.docnum ? parseInt(this.filterData.docnum) : null,
          },
          responseType: 'blob',
        })
        .then(({ data }) => {
          const filename = `${this.$t('История возвратов')}.pdf`;
          const url = window.URL.createObjectURL(
            new Blob([data], {
              type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            }),
          );
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', filename);
          document.body.appendChild(link);
          link.click();
          link.remove();
        });
    },
    resetData() {
      this.rangeDate = [
        this.$moment()
          .subtract(1, 'months')
          .startOf('month')
          .format('YYYY-MM-DD'),
        this.$moment()
          .subtract(0, 'months')
          .endOf('month')
          .format('YYYY-MM-DD'),
      ];
      backApi
        .get('agent/refunds', {
          params: {
            beg_dte: this.$moment()
              .subtract(1, 'months')
              .startOf('month')
              .format('YYYY-MM-DD'),
            end_dte: this.$moment()
              .subtract(0, 'months')
              .endOf('month')
              .format('YYYY-MM-DD'),
          },
        })
        .then(Response => {
          this.entries = Response.data.entries;
          this.return_details = new Array(this.total_rows).fill(undefined);
        })
        .then(() => {
          this.loading = false;
        });
      this.searchActive = !this.searchActive;
      this.filterData.articul = null;
      this.filterData.name = null;
      this.filterData.naknum = null;
      this.filterData.docnum = null;
      this.tags = [];
    },
    updateData(shouldClose) {
      const data = {
        params: {
          beg_dte: this.rangeDate[0] ? this.rangeDate[0] : null,
          end_dte: this.rangeDate[1] ? this.rangeDate[1] : null,
          articul: this.filterData.articul,
          name: this.filterData.name,
          // eslint-disable-next-line radix
          saleid: this.filterData.naknum ? parseInt(this.filterData.naknum) : null,
          // eslint-disable-next-line radix
          refund_id: this.filterData.docnum ? parseInt(this.filterData.docnum) : null,
        },
      };
      // Articul
      if (this.filterData.articul !== null && this.filterData.articul !== '') {
        const tag = this.tags.find(t => t.key === 'articul');
        if (tag) {
          tag.name = `Артикул: ${this.filterData.articul}`;
        } else {
          this.tags.push({ name: `Артикул: ${this.filterData.articul}`, key: 'articul' });
        }
      }
      // Name
      if (this.filterData.name !== null && this.filterData.name !== '') {
        const tag = this.tags.find(t => t.key === 'name');
        if (tag) {
          tag.name = `Наименование: ${this.filterData.name}`;
        } else {
          this.tags.push({ name: `Наименование: ${this.filterData.name}`, key: 'name' });
        }
      }
      // Номер накладной
      if (this.filterData.naknum !== null && this.filterData.naknum !== '') {
        const tag = this.tags.find(t => t.key === 'naknum');
        if (tag) {
          tag.name = `Номер накладной: ${this.filterData.naknum}`;
        } else {
          this.tags.push({ name: `Номер накладной: ${this.filterData.naknum}`, key: 'naknum' });
        }
      }
      // Номер возвратной накладной
      if (this.filterData.docnum !== null && this.filterData.docnum !== '') {
        const tag = this.tags.find(t => t.key === 'docnum');
        if (tag) {
          tag.name = `Номер возвратной накладной: ${this.filterData.docnum}`;
        } else {
          this.tags.push({
            name: `Номер возвратной накладной: ${this.filterData.docnum}`,
            key: 'docnum',
          });
        }
      }
      backApi.get('/agent/refunds', data).then(Response => {
        this.entries = Response.data.entries;
      });
      if (shouldClose) {
        this.searchActive = !this.searchActive;
      }
    },
    // eslint-disable-next-line no-unused-vars
    filterFunc(row, filter) {
      return 1;
    },
    toggleSearch() {
      this.searchActive = !this.searchActive;
    },
    back() {
      const navEl = document.getElementsByClassName('router-link-exact-active router-link-active');
      $(navEl[0])
        .parent()
        .parent()
        .siblings()
        .addClass('active');
    },
    getSelectedDataRange() {
      if (this.rangeDate.some(d => d === null)) {
        this.rangeDate = [
          this.$moment()
            .subtract(1, 'months')
            .startOf('month')
            .format('YYYY-MM-DD'),
          this.$moment()
            .subtract(0, 'months')
            .endOf('month')
            .format('YYYY-MM-DD'),
        ];
      }
      const data = {
        params: {
          beg_dte: this.rangeDate[0] ? this.rangeDate[0] : null,
          end_dte: this.rangeDate[1] ? this.rangeDate[1] : null,
          articul: this.filterData.articul,
          name: this.filterData.name,
          // eslint-disable-next-line radix
          saleid: this.filterData.naknum ? parseInt(this.filterData.naknum) : null,
          // eslint-disable-next-line radix
          refund_id: this.filterData.docnum ? parseInt(this.filterData.docnum) : null,
        },
      };
      backApi.get('/agent/refunds', data).then(Response => {
        this.entries = Response.data.entries;
      });
    },
    show_details(row) {
      if (!row.detailsShowing) {
        this.printNakAccess = true;
      } else {
        this.printNakAccess = false;
      }
      if (row.detailsShowing === true) {
        row.toggleDetails();
      } else if (!this.return_details[row.item.webshop_id]) {
        backApi
          .get('/agent/refunds-detail', { params: { id: row.item.webshop_id } })
          .then(response => {
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
.search_icons {
  position: relative;
  top: 5px;
  display: inline-block;
  width: 24px !important;
  height: 24px;
  background-image: url('../../public/icons/search.svg');
  background-size: contain;
  &.mobi {
    position: absolute;
    top: 20px;
    right: 15px;
  }
}
.nak {
  background: none;
  border: none;
  color: #32aaa7;
  &.disabled {
    color: gray !important;
  }
}
.mobile_search {
  display: none;
}
.update {
  padding: 0;
  display: flex;
  justify-content: space-between;
  & button.disabled {
    color: #9a9a9a !important;
    background-color: #dee2f3 !important;
  }
}
.tags {
  margin: 10px 0px 20px 0px;
}
.organization__modal {
  position: relative;
  padding: 0px 0px;
  margin: 30px 0px;
  width: 100%;
  bottom: 0;

  & .edit {
    margin-top: 50px;
    input {
      // margin-bottom: 20px;
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
@media (max-width: 768px) {
  .mobile_search {
    display: block;
    & i {
      margin-left: 10px;
    }
  }
  .desktop_search {
    display: none;
  }
}
@media (max-width: 525px) {
  .organization__modal {
    & .edit {
      margin-top: 0;
      & > div {
        margin-top: 20px;
      }
      &:nth-of-type(3) > div {
        margin-top: 0;
      }
    }
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
</style>
<style>
/* .el-icon-circle-close:before{
  position: relative;
  content: ' ';
  display: block;
  background-image: url('../assets/imgs/close_btn.svg');
  background-repeat: no-repeat;
  background-size: 100%;
  width: 13px;
  height: 13px;
  top: 20px;
} */
.mx-datepicker svg {
  color: #32aaa7;
}
table[aria-colcount='7'] > tbody > tr.b-table-has-details > td {
  background: #32aaa7;
  color: white !important;
  margin-bottom: 0;
}
.refound_table table[aria-colcount='5'] td[colspan='5'] {
  padding: 0;
}
.sub_table > table > tbody > tr.b-table-has-details > td {
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
.refound_table table[aria-colcount='7'] tr[tabindex='-1'] > td {
  padding: 0;
  /* padding-top: 10px !important; */
}
</style>
