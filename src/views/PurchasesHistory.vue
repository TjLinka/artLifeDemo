<template>
  <div class="licevoischet__page">
    <div v-loading="loading">
      <div class="container-fluid table_container" v-show="!loading">
        <p class="p-0 m-0 history_title" v-if="rangeDate[0] !== null && rangeDate.length > 0">
          {{ $t('Период от и до') }}
        </p>
        <div class="row edit">
          <div class="col-md-6">
            <date-picker
              v-model="rangeDate"
              range-separator=" - "
              range
              type="date"
              @change="getSelectedDataRange"
              format="DD.MM.YYYY"
              :editable="false"
              placeholder="дд.мм.гггг - дд.мм.гггг"
              value-type="YYYY-MM-DD"
              style="width: 100%"
            >
            </date-picker>
          </div>
          <div class="col" v-if="self_agreementsystem && role !== 'Клиент'">
            <g-button :width="'40%'" primary @click="$router.push('/new-purchase')">
              Создать покупку
            </g-button>
            <!-- <router-link to="/new-purchase">
                <button class="btn_type_1 w50 fr">
                  Создать покупку
                </button>
            </router-link> -->
          </div>
        </div>
        <div class="row mobile_search">
          <div class="col search__btn noprint" @click="toggleSearch" v-if="!searchActive">
            {{ $t('Поиск покупки') }} <span class="search_icons mobi"></span>
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
        <p class="exp_print noprint">
          <!-- <span class="mr-3">Печать</span> -->
          <span class="mr-3" @click="downloadPdf">{{ $t('Экспорт в pdf') }}</span>
          <span class="mr-3" @click="downloadXls">{{ $t('Экспорт в xlsx') }}</span>
          <!-- <button
        :class="`mr-3 nak ${printNakAccess ? '' : 'disabled'}`"
        :disabled="!printNakAccess"
        >Экспорт накладной в pdf</button> -->
          <!-- <span class="mr-3">Экспорт накладной в pdf</span> -->
        </p>
        <div class="perchases_table mb-3">
          <b-table :fields="fields" :items="entries" head-variant="light" responsive outlined>
            <template v-slot:cell(nomer)="row">
              <b-button size="sm" @click="show_details(row)" class="mr-2">
                {{ row.detailsShowing ? '-' : '+' }}
              </b-button>
              <span>{{ row.item.id }}</span>
            </template>
            <template v-slot:cell(delivery)="row">
              <span>{{ row.item.delivery }}</span>
              <!-- <span>{{ row.item.webshop_id }}</span> -->
            </template>
            <template #cell(amount)="data">
              <span>{{ data.value }}</span>
            </template>
            <template v-slot:row-details="row">
              <div class="sub_table">
                <b-table
                  :fields="returnFields"
                  :items="return_details[row.item.id]"
                  head-variant="light"
                >
                  <template #cell()="data">
                    {{ data.value }}
                  </template>
                </b-table>
              </div>
            </template>
          </b-table>
        </div>
        <!-- <footer class="container-fluid cust_modal">
        <div class="container-md">
        <div class="row desktop_search">
          <div class="col text-center search__btn" @click="toggleSearch" v-if="!searchActive">
            {{$t("Фильтр")}} <span class="search_icons"></span>
          </div>
        </div>
        <div v-if="searchActive" class="organization__modal">
          <h3>
            {{$t("Фильтр")}}
            <span class="close_btn" @click="searchActive = !searchActive"></span>
          </h3>
          <div class="row mt-3">
            <div class="col-sm-6">
              <g-input v-model="articul" :id="`articul`" placeholder="Артикул"/>
            </div>
            <div class="col-sm-6">
              <span
              v-if="status"
              class="custom_label"
              >
              {{$t("Статус")}}
              </span>
              <el-select
              v-model="status"
              clearable
              :placeholder="`${$t('Статус')}`">
                <el-option
                  v-for="item in statusList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="row mt-3">
            <div class="col-sm-6">
              <g-input v-model="naknum" :id="naknum" placeholder="Номер накладной"/>
            </div>
          <div class="col-md-6">
            <span
            v-if="delivery !== null && this.delivery !== ''"
            class="custom_label"
            >
            {{$t("Доставка")}}
            </span>
            <el-select
            v-model="delivery"
            clearable
            :placeholder="`${$t('Доставка')}`">
              <el-option
                v-for="item in deliveryList"
                :key="item.id"
                :label="item.name"
                :value="item.name">
              </el-option>
            </el-select>
          </div>
          </div>
          <div class="row mt-3">
            <div class="col-sm-6">
              <g-input v-model="name" id="naknum" placeholder="Наименование товара"/>
            </div>
            <div class="col-xl-6">
              <g-grouped-button>
                <g-button primary @click="updateData" :width="'50%'">{{$t("Показать")}}</g-button>
                <g-button @click="clearSelectedFilters" :width="'50%'">{{$t("Сбросить")}}</g-button>
              </g-grouped-button>
            </div>
          </div>
        </div>
        </div>
      </footer> -->
        <g-footer :show="searchActive">
          <template #header>
            <div class="row desktop_search" v-if="!searchActive">
              <div class="col text-center search__btn" @click="searchActive = !searchActive">
                {{ $t('Фильтр') }} <span class="search_icons"></span>
              </div>
            </div>
            <div>
              <h3 class="g_footer_inner_title" v-if="searchActive">
                {{ $t('Фильтр') }}
                <span class="close_btn" @click="searchActive = !searchActive"></span>
              </h3>
            </div>
          </template>
          <template #form v-if="searchActive">
            <div class="row mt-3">
              <div class="col-sm-6">
                <g-input v-model="articul" :id="`articul`" placeholder="Артикул" />
              </div>
              <div class="col-sm-6">
                <span v-if="status" class="custom_label">
                  {{ $t('Статус') }}
                </span>
                <el-select v-model="status" clearable :placeholder="`${$t('Статус')}`">
                  <el-option
                    v-for="item in statusList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.name"
                  >
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="row mt-3">
              <div class="col-sm-6">
                <g-input v-model="naknum" :id="naknum" placeholder="Номер накладной" />
              </div>
              <div class="col-md-6">
                <span v-if="delivery !== null && this.delivery !== ''" class="custom_label">
                  {{ $t('Доставка') }}
                </span>
                <el-select v-model="delivery" clearable :placeholder="`${$t('Доставка')}`">
                  <el-option
                    v-for="item in deliveryList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.name"
                  >
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="row mt-3">
              <div class="col-sm-6">
                <g-input v-model="name" id="naknum" placeholder="Наименование товара" />
              </div>
              <div class="col-xl-6">
                <g-grouped-button>
                  <g-button primary @click="updateData" :width="'50%'">{{
                    $t('Показать')
                  }}</g-button>
                  <g-button @click="clearSelectedFilters" :width="'50%'">{{
                    $t('Сбросить')
                  }}</g-button>
                </g-grouped-button>
              </div>
            </div>
          </template>
        </g-footer>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
/* eslint-disable no-param-reassign */
import { mapState, mapActions } from 'vuex';
import DatePicker from 'vue2-datepicker';
import GApi from '../assets/backApi';
// import GApi from '../assets/GApi';
// import BasePeriodPicker from '../components/BasePeriodPicker.vue';
import 'vue2-datepicker/index.css';
import 'vue2-datepicker/locale/ru';
import dateFormat from '../assets/localDateFunc';
import GGroupedButton from '../components/Forms/GGroupedButton.vue';
import GButton from '../components/Forms/GButton.vue';
import GInput from '../components/Forms/GInput.vue';
import GFooter from '../components/GFooter.vue';

export default {
  name: 'AccountDetail',
  components: {
    // BasePeriodPicker,
    DatePicker,
    GGroupedButton,
    GButton,
    GInput,
    GFooter,
  },
  data() {
    return {
      isDev: process.env.VUE_APP_ENVIRONMENT,
      loading: true,
      deliveryList: [],
      delivery: null,
      statusList: [],
      status: null,
      naknum: null,
      allData: [],
      lang: {
        monthBeforeYear: false,
      },
      months: [
        'Январь',
        'Февраль',
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
      printNakAccess: false,
      return_details: [],
      tags: [],
      returnFields: [
        {
          key: 'articul',
          label: this.$t('Артикул'),
          sortable: true,
          thStyle: {
            width: '150px',
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
            if (v !== null) {
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
            if (v !== null) {
              const formatter = new Intl.NumberFormat('ru');
              return formatter.format(v);
            }
            return null;
          },
        },
        // {
        //   key: 'cnt',
        //   label: this.$t('Кол-во'),
        //   sortable: true,
        //   formatter(v) {
        //     if (v !== null) {
        //       const formatter = new Intl.NumberFormat('ru');
        //       return formatter.format(v);
        //     }
        //     return null;
        //   },
        // },
        {
          key: 'points_all',
          label: this.$t('Сумма балов'),
          sortable: true,
          formatter(v) {
            if (v !== null) {
              const formatter = new Intl.NumberFormat('ru');
              return formatter.format(v);
            }
            return null;
          },
        },
        {
          key: 'price_total',
          label: this.$t('Стоимость'),
          sortable: true,
          formatter(v) {
            if (v !== null) {
              const formatter = new Intl.NumberFormat('ru');
              return formatter.format(v);
            }
            return null;
          },
        },
      ],
      fields: [
        {
          key: 'nomer',
          label: this.$t('Дата создания'),
          sortable: true,
          thStyle: {
            width: '150px',
            minWidth: '150px',
          },
        },
        {
          key: 'amount',
          label: this.$t('Дата окончания резерва'),
          formatter(v) {
            if (v > 0) {
              const formatter = new Intl.NumberFormat('ru');
              return formatter.format(v);
            }
            return null;
          },
          sortable: true,
        },
        {
          key: 'dte',
          label: this.$t('Дата оплаты'),
          sortable: true,
          formatter(v) {
            return dateFormat(v);
          },
        },
        {
          key: 'findte',
          label: this.$t('Дата завершения'),
          formatter(v) {
            return dateFormat(v);
          },
          sortable: true,
        },
        {
          key: 'price_total',
          label: this.$t('Сумма'),
          sortable: true,
        },
        {
          key: 'status',
          label: 'Статус',
        },
      ],
    };
  },
  metaInfo() {
    this.setPageTitle(this.$t('История заказов'));
    return {
      title: `${this.$t('ЛК Партнера')} - ${this.$t('История заказов')}`,
    };
  },
  async mounted() {
    GApi.post('/api/Webshop/get-list', {
      from: '2020-06-30T21:00:00.000Z',
      to: this.$moment()
        .subtract(0, 'months')
        .endOf('month'),
    }).then((Response) => {
      this.entries = Response.data;
      this.loading = false;
    });
  },
  computed: {
    ...mapState('auth', ['self_agreementsystem', 'role', 'self_agent_id']),
    currentPeriod() {
      try {
        return this.periods[this.periodIndex].comdte;
      } catch (e) {
        return '';
      }
    },
  },
  methods: {
    ...mapActions('currentPage', ['setPageTitle']),
    // eslint-disable-next-line consistent-return
    sortCompare(aRow, bRow, key) {
      const a = aRow[key];
      const b = bRow[key];
      if (typeof a === 'number' && typeof b === 'number') {
        // eslint-disable-next-line no-nested-ternary
        return a < b ? -1 : a > b ? 1 : 0;
      }
    },
    getSelectedDataRange() {
      if (this.rangeDate.some((d) => d === null)) {
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
          articul: this.articul !== '' ? this.articul : null,
          name: this.name,
          // eslint-disable-next-line radix
          saleid: this.naknum !== '' ? this.naknum : null,
          beg_dte:
            this.rangeDate[0] !== null
              ? this.rangeDate[0]
              : this.$moment()
                .subtract(1, 'months')
                .startOf('month')
                .format('YYYY-MM-DD'),
          end_dte:
            this.rangeDate[1] !== null
              ? this.rangeDate[1]
              : this.$moment()
                .subtract(0, 'months')
                .endOf('month')
                .format('YYYY-MM-DD'),
          i_delivery: this.delivery !== '' ? this.delivery : null,
          // eslint-disable-next-line radix
          i_status: this.status !== '' ? this.status : null,
        },
      };
      GApi.get('/agent/sales', data).then((Response) => {
        this.entries = Response.data.entries;
      });
    },
    downloadXls() {
      const dataa = {
        params: {
          articul: this.articul !== '' ? this.articul : null,
          name: this.name,
          // eslint-disable-next-line radix
          saleid: this.naknum !== '' ? this.naknum : null,
          beg_dte: this.rangeDate ? this.rangeDate[0] : null,
          end_dte: this.rangeDate ? this.rangeDate[1] : null,
          i_delivery: this.delivery !== '' ? this.delivery : null,
          // eslint-disable-next-line radix
          i_status: this.status !== '' ? this.status : null,
        },
        responseType: 'blob',
      };
      GApi.get('/agent/sales/excel', dataa).then(({ data }) => {
        const filename = `${this.$t('История покупок')}.xlsx`;
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
      const dataa = {
        params: {
          articul: this.articul !== '' ? this.articul : null,
          name: this.name,
          // eslint-disable-next-line radix
          saleid: this.naknum !== '' ? this.naknum : null,
          beg_dte: this.rangeDate ? this.rangeDate[0] : null,
          end_dte: this.rangeDate ? this.rangeDate[1] : null,
          i_delivery: this.delivery !== '' ? this.delivery : null,
          // eslint-disable-next-line radix
          i_status: this.status !== '' ? this.status : null,
        },
        responseType: 'blob',
      };
      GApi.get('/agent/sales/pdf', dataa).then(({ data }) => {
        const filename = `${this.$t('История покупок')}.pdf`;
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
    clearArticul() {
      this.articul = '';
      const pos = this.tags.map((i) => i.key).indexOf('articul');
      this.tags.splice(pos, 1);
    },
    clearName() {
      this.name = '';
      const pos = this.tags.map((i) => i.key).indexOf('name');
      this.tags.splice(pos, 1);
    },
    clearNaknum() {
      this.naknum = '';
      // const pos = this.tags.map((i) => i.key).indexOf('naknum');
      // this.tags.splice(pos, 1);
    },
    // clearStatus() {
    //   this.status = '';
    // },
    back() {
      const navEl = document.getElementsByClassName('router-link-exact-active router-link-active');
      $(navEl[0])
        .parent()
        .parent()
        .siblings()
        .addClass('active');
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
      }
      if (tag.key === 'name') {
        this.name = null;
      }
      if (tag.key === 'naknum') {
        this.naknum = null;
      }
      if (tag.key === 'delivery') {
        this.delivery = null;
      }
      if (tag.key === 'status') {
        this.status = null;
      }
      // if (tag.key === 'period') {
      //   this.period_enabled = false;
      // }
      this.updateData();
    },
    updateData() {
      const data = {
        params: {
          articul: this.articul !== '' ? this.articul : null,
          name: this.name,
          // eslint-disable-next-line radix
          saleid: this.naknum !== '' ? this.naknum : null,
          beg_dte: this.rangeDate ? this.rangeDate[0] : null,
          end_dte: this.rangeDate ? this.rangeDate[1] : null,
          i_delivery: this.delivery !== '' ? this.delivery : null,
          // eslint-disable-next-line radix
          i_status: this.status !== '' ? this.status : null,
        },
      };
      // Articul
      if (this.articul !== null && this.articul !== '') {
        const tag = this.tags.find((t) => t.key === 'articul');
        if (tag) {
          tag.name = `Артикул: ${this.articul}`;
        } else if (this.tree_type !== 'full') {
          this.tags.push({ name: `Артикул: ${this.articul}`, key: 'articul' });
        }
      } else {
        const pos = this.tags.map((i) => i.key).indexOf('articul');
        if (pos !== -1) {
          this.tags.splice(pos, 1);
        }
      }
      // Name
      if (this.name !== null && this.name !== '') {
        const tag = this.tags.find((t) => t.key === 'name');
        if (tag) {
          tag.name = `Наименование: ${this.name}`;
        } else {
          this.tags.push({ name: `Наименование: ${this.name}`, key: 'name' });
        }
      } else {
        const pos = this.tags.map((i) => i.key).indexOf('name');
        if (pos !== -1) {
          this.tags.splice(pos, 1);
        }
      }
      // Номер накладной
      if (this.naknum !== null && this.naknum !== '') {
        const tag = this.tags.find((t) => t.key === 'naknum');
        if (tag) {
          tag.name = `Номер накладной: ${this.naknum}`;
        } else {
          this.tags.push({ name: `Номер накладной: ${this.naknum}`, key: 'naknum' });
        }
      } else {
        const pos = this.tags.map((i) => i.key).indexOf('naknum');
        if (pos !== -1) {
          this.tags.splice(pos, 1);
        }
      }
      // Статус
      if (this.status !== null && this.status !== '') {
        const tag = this.tags.find((t) => t.key === 'status');
        if (tag) {
          tag.name = `Статус: ${this.status}`;
        } else {
          this.tags.push({ name: `Статус: ${this.status}`, key: 'status' });
        }
      } else {
        const pos = this.tags.map((i) => i.key).indexOf('status');
        if (pos !== -1) {
          this.tags.splice(pos, 1);
        }
      }
      // Доставка
      if (this.delivery !== null && this.delivery !== '') {
        const tag = this.tags.find((t) => t.key === 'delivery');
        if (tag) {
          tag.name = `Доставка: ${this.delivery}`;
        } else {
          this.tags.push({ name: `Доставка: ${this.delivery}`, key: 'delivery' });
        }
      } else {
        const pos = this.tags.map((i) => i.key).indexOf('delivery');
        if (pos !== -1) {
          this.tags.splice(pos, 1);
        }
      }
      // const tag = this.tags.find((t) => t.key === 'period');
      // if (tag) {
      //   tag.name = `${this.months[new Date(this.currentPeriod).getMonth()]} ${new Date(
      //     this.currentPeriod,
      //   ).getFullYear()}`;
      // } else if (this.currentPeriod !== this.periods[this.periods.length - 1].comdte) {
      //   this.tags.push({
      //     name: `${this.months[new Date(this.currentPeriod).getMonth()]} ${new Date(
      //       this.currentPeriod,
      //     ).getFullYear()}`,
      //     key: 'period',
      //   });
      // }
      // const params = { name: this.name, articul: this.articul, saleid: this.number };
      GApi.get('agent/sales', data).then((Response) => {
        this.entries = Response.data.entries;
        this.return_details = new Array(this.total_rows).fill(undefined);
      });
      if (this.searchActive === true) {
        this.searchActive = false;
      }
    },
    clearSelectedFilters() {
      this.name = null;
      this.articul = null;
      this.naknum = null;
      this.tags = [];
      GApi.get('agent/sales').then((Response) => {
        this.entries = Response.data.entries;
        this.return_details = new Array(this.total_rows).fill(undefined);
      });
      this.searchActive = !this.searchActive;
    },
    toggleSearch() {
      this.searchActive = !this.searchActive;
    },
    show_details(row) {
      console.log(row.item);
      if (!row.detailsShowing) {
        this.printNakAccess = true;
      } else {
        this.printNakAccess = false;
      }
      if (row.detailsShowing === true) {
        row.toggleDetails();
      } else if (!this.return_details[row.item.id]) {
        GApi
          .get(`/api/Webshop/get/${row.item.id}`)
          .then((response) => {
            console.log(response.data);
            this.$set(this.return_details, this.return_details[row.item.id], response.data);
            // this.return_details[row.item.id] = response.data;
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
.btn_type_1 {
  margin-top: 0;
}
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
.el-select {
  width: 100%;
}
.tags {
  margin: 10px 0px 20px 0px;
}
.mobile_search {
  display: none;
}
.update {
  display: flex;
  justify-content: space-between;
  & button {
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
      margin-bottom: 0px;
      & > div {
        margin-bottom: 30px;
      }
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
.cust_modal {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  padding-left: 120px;
  box-sizing: border-box;
  background: #ffffff;
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
.perchases_table td[colspan='6'] {
  padding: 0;
  /* padding-top: 10px !important; */
}
</style>
