<template>
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
        <!-- {{$t("История показателей партнера по периодам")}}: {{userInfo.id}} - {{userInfo.name}} -->
      </h2>
      <!-- <div class="col mt-4 search__btn mobile"
        @click="showModal = !showModal" v-if="!showModal">
          Настройки партнера <i class="el-icon-search search_icon"></i>
        </div> -->
      <p class="p-0 m-0 history_title" v-if="monthRange[0] !== null && monthRange.length > 0">
        {{ $t('Период от и до') }}
      </p>
      <div class="row">
        <div class="col-md-6 month_range_indicators">
          <date-picker
            v-model="monthRange"
            range-separator=" - "
            range
            type="month"
            @change="dd"
            :editable="false"
            format="DD.MM.YYYY"
            placeholder="дд.мм.гггг - дд.мм.гггг"
            value-type="YYYY-MM-DD"
            style="width: 100%"
          >
          </date-picker>
          <!-- <el-date-picker
          v-model="monthRange"
          type="monthrange"
          range-separator="-"
          v-on:change="dd"
          value-format="yyyy-MM-dd"
          :format="`MMMM yyyy`"
          style="width: 100%"
          >
        </el-date-picker> -->
          <!-- <el-date-picker
          v-model="monthRange"
          type="month"
          range-separator="-"
          v-on:change="dd"
          value-format="yyyy-MM-dd"
          :format="`MMMM yyyy`"
          style="width: 100%"
          >
        </el-date-picker> -->
        </div>
      </div>
      <div class="row mt-3">
        <div class="col">
          <p class="userInfo">
            <img
              class="mb-1 mr-2"
              :src="`../icons/${userIcon}.svg`"
              alt=""
              :title="userInfo.rank_calc"
            />
            <span class="mr-3">{{ userInfo.name }} {{ userInfo.id }}</span>
          </p>
        </div>
      </div>
      <div class="row mt-3 mb-4 noprint">
        <div class="col export_btns noprint">
          <!-- <span>Печать</span> -->
          <span @click="downloadPdf">{{ $t('Экспорт в pdf') }}</span>
          <span @click="downloadXls">{{ $t('Экспорт в xlsx') }}</span>
          <span class="mr-3" v-b-modal.modal-scrollable>{{ $t('Легенда') }}</span>
        </div>
      </div>
      <b-table responsive outlined head-variant="light" :items="entries" :fields="fields">
        <template v-slot:cell(comdte)="data">
          {{ data.value }}
        </template>
        <template v-slot:cell(lo)="row">
          {{ row.item.lo | localInt }}
        </template>
        <template v-slot:cell(go)="row">
          {{ row.item.go | localInt }}
        </template>
        <template v-slot:cell(ngo)="row">
          {{ row.item.ngo | localInt }}
        </template>
        <template v-slot:cell(so)="row">
          {{ row.item.so | localInt }}
        </template>
        <template v-slot:cell(ko)="row">
          {{ row.item.ko | localInt }}
        </template>
        <template v-slot:cell(rank_end)="row">
          {{ row.item.rank_end }}
        </template>
        <template v-slot:cell(rank_beg_npp)="row">
          {{ row.item.rank_beg }}
        </template>
        <template v-slot:cell(rank_calc_npp)="row">
          {{ row.item.rank_calc }}
        </template>
        <template v-slot:cell(rank_end_npp)="row">
          {{ row.item.rank_end }}
        </template>
        <template #empty="scope">
          <h4>{{ scope.emptyText }}</h4>
        </template>
      </b-table>
      <!-- <footer class="container-fluid cust_modal">
      <div class="row" v-if="!showModal">
        <div class="col text-center search__btn desktop"
        @click="showModal = !showModal" v-if="!showModal">
          Настройки партнера <i class="el-icon-search search_icon"></i>
        </div>
      </div>
      <div v-else>
        <PartnerIndicatorsModal
          v-on:update-data="updateData($event)"
          v-on:enlarge-text="toggleShow"
        />
      </div>
    </footer> -->
    </div>
    <b-modal v-model="show" id="modal-scrollable" centered scrollable title="Легенда">
      <div class="modal_icons">
        <img :src="`../icons/Клиент.svg`" class="rank_icon_legend" />
        <span>{{ $t('Привилегированный клиент') }}</span>
      </div>
      <br />
      <div class="modal_icons">
        <img :src="`../icons/Консультант.svg`" class="rank_icon_legend" />
        <span>{{ $t('Консультант') }}</span>
      </div>
      <br />
      <div class="modal_icons">
        <img :src="`../icons/Мастер.svg`" class="rank_icon_legend" /><span>{{ $t('Мастер') }}</span>
      </div>
      <br />
      <div class="modal_icons">
        <img :src="`../icons/Управляющий.svg`" class="rank_icon_legend" /><span>{{
          $t('Управляющий')
        }}</span>
      </div>
      <br /><br />
      <div class="modal_icons">
        <img :src="`../icons/Директор.svg`" class="rank_icon_legend" /><span>{{
          $t('Директор')
        }}</span>
      </div>
      <br />
      <div class="modal_icons">
        <img :src="`../icons/Серебряный Директор.svg`" class="rank_icon_legend" />
        <span>{{ $t('Серебряный Директор') }}</span>
      </div>
      <br />
      <div class="modal_icons">
        <img :src="`../icons/Золотой Директор.svg`" class="rank_icon_legend" />
        <span>{{ $t('Золотой Директор') }}</span>
      </div>
      <br /><br />
      <div class="modal_icons">
        <img :src="`../icons/Рубиновый Директор.svg`" class="rank_icon_legend" />
        <span>{{ $t('Рубиновый Директор') }}</span>
      </div>
      <br />
      <div class="modal_icons">
        <img :src="`../icons/Бриллиантовый Директор.svg`" class="rank_icon_legend" />
        <span>{{ $t('Бриллиантовый Директор') }}</span>
      </div>
      <br />
      <div class="modal_icons">
        <img :src="`../icons/Президент.svg`" class="rank_icon_legend" /><span>{{
          $t('Президент')
        }}</span>
      </div>
      <br />
      <template #modal-footer>
        <b-button variant="primary" size="sm" class="float-right cls_btn" @click="show = false">
          {{ $t('Закрыть') }}
        </b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
/* eslint-disable quote-props */
import DatePicker from 'vue2-datepicker';
import { mapActions } from 'vuex';
import 'vue2-datepicker/index.css';
import 'vue2-datepicker/locale/ru';
import $ from 'jquery';
import backApi from '../assets/backApi';

export default {
  name: 'PartnerIndicators',
  components: {
    DatePicker,
  },
  data() {
    return {
      agentData: {},
      loading: true,
      iconDict: {
        Клиент: {
          full: 'Клиент',
          short: 'Клиент',
        },
        Консультант: {
          full: 'Консультант',
          short: 'Консультант',
        },
        Мастер: {
          full: 'Мастер',
          short: 'Мастер',
        },
        Управляющий: {
          full: 'Управляющий',
          short: 'Управляющий',
        },
        Директор: {
          full: 'Директор',
          short: 'Директор',
        },
        'Серебряный Директор': {
          full: 'Серебряный Директор',
          short: 'Сер.Директор',
        },
        'Золотой Директор': {
          full: 'Золотой Директор',
          short: 'Зол.Директор',
        },
        'Рубиновый Директор': {
          full: 'Рубиновый Директор',
          short: 'Руб.Директор',
        },
        'Бриллиантовый Директор': {
          full: 'Бриллиантовый Директор',
          short: 'Брил.Директор',
        },
        Президент: {
          full: 'Президент',
          short: 'Президент',
        },
        'Сер.Директор': {
          full: 'Серебряный Директор',
          short: 'Сер.Директор',
        },
        'Зол.Директор': {
          full: 'Золотой Директор',
          short: 'Зол.Директор',
        },
        'Руб.Директор': {
          full: 'Рубиновый Директор',
          short: 'Руб.Директор',
        },
        'Брил.Директор': {
          full: 'Бриллиантовый Директор',
          short: 'Брил.Директор',
        },
      },
      show: false,
      monthRange: [],
      showModal: false,
      rank_icon: '',
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
      entries: [],
      fields: [
        {
          key: 'comdte',
          label: this.$t('Период'),
          sortable: true,
          formatter(v) {
            const mass = [
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
            ];
            return `${mass[new Date(v).getMonth()]} ${new Date(v).getFullYear()}`;
          },
        },
        {
          key: 'lo',
          label: this.$t('ЛО'),
          sortable: true,
          thStyle: {
            width: '100px',
            minWidth: '50px',
          },
        },
        {
          key: 'go',
          label: this.$t('ГО'),
          sortable: true,
          thStyle: {
            width: '100px',
            minWidth: '50px',
          },
        },
        {
          key: 'ngo',
          label: this.$t('НГО'),
          sortable: true,
          thStyle: {
            width: '100px',
            minWidth: '50px',
          },
        },
        {
          key: 'so',
          label: this.$t('ОО'),
          sortable: true,
          thStyle: {
            width: '100px',
            minWidth: '50px',
          },
        },
        {
          key: 'ko',
          label: this.$t('КО'),
          sortable: true,
          thStyle: {
            width: '100px',
            minWidth: '50px',
          },
        },
        {
          key: 'noact',
          label: this.$t('Неактивность'),
          sortable: true,
          thStyle: {
            width: '150px',
            minWidth: '130px',
          },
        },
        {
          key: 'rank_beg_npp',
          label: this.$t('Ранг на начало'),
          sortable: true,
          // formatter: (v) => v.rank_beg,
          thStyle: {
            minWidth: '120px',
          },
        },
        {
          key: 'rank_calc_npp',
          label: this.$t('Расчетный ранг'),
          // formatter: (v) => v.rank_calc,
          sortable: true,
          thStyle: {
            minWidth: '120px',
          },
        },
        {
          key: 'rank_end_npp',
          label: this.$t('Ранг на конец'),
          // formatter: (v) => v.rank_end,
          sortable: true,
          thStyle: {
            minWidth: '120px',
          },
        },
      ],
      userInfo: {},
    };
  },
  metaInfo() {
    // this.setPageTitle(`${this.$t('История показателей партнера по периодам')} : ${this.userInfo.id} - ${this.userInfo.name}`);
    return {
      title: `${this.$t('ЛК Партнера')} - ${this.$t(
        'История показателей партнера по периодам',
      )} : ${this.userInfo.id} - ${this.userInfo.name}`,
    };
  },
  mounted() {
    this.monthRange = [
      this.$moment()
        .startOf('year')
        .format('YYYY-MM-DD'),
      this.$moment()
        .endOf('year')
        .format('YYYY-MM-DD'),
    ];
    if (this.$route.params.id) {
      backApi
        .get(`/agent/all-periods-indicators/${this.$route.params.id}`, {
          params: {
            beg_comdte: this.$moment()
              .startOf('year')
              .format('YYYY-MM-DD'),
            end_comdte: this.$moment()
              .endOf('year')
              .format('YYYY-MM-DD'),
          },
        })
        .then(Response => {
          this.entries = Response.data.entries;
        })
        .then(() => {
          setTimeout(() => {
            this.loading = false;
          });
        });
      backApi
        .get('/agent/profile/child/', { params: { another_agent_id: this.$route.params.id } })
        .then(Response => {
          this.userInfo = Response.data;
          this.setPageTitle(
            `${this.$t('История показателей партнера по периодам')} : ${this.userInfo.fio}`,
          );
        });
    } else {
      backApi
        .get('/agent/all-periods-indicators', {
          params: {
            beg_comdte: this.$moment()
              .startOf('year')
              .format('YYYY-MM-DD'),
            end_comdte: this.$moment()
              .endOf('year')
              .format('YYYY-MM-DD'),
          },
        })
        .then(Response => {
          this.entries = Response.data.entries;
        })
        .then(() => {
          setTimeout(() => {
            this.loading = false;
          });
        });
      backApi.get('/agent/profile/').then(Response => {
        this.userInfo = Response.data;
        backApi
          .get('/agent/transfer-info', { params: { another_agent_id: Response.data.id } })
          .then(response => {
            this.rank_icon = response.data.rank_calc;
          });
      });
      this.setPageTitle(`${this.$t('История показателей партнера по периодам')}`);
    }
  },
  methods: {
    ...mapActions('currentPage', ['setPageTitle']),
    dd() {
      if (this.monthRange.some(m => m === null)) {
        this.monthRange = [
          this.$moment()
            .startOf('year')
            .format('YYYY-MM-DD'),
          this.$moment()
            .endOf('year')
            .format('YYYY-MM-DD'),
        ];
      }
      const data = {
        params: {
          beg_comdte: this.monthRange ? this.monthRange[0] : null,
          end_comdte: this.monthRange ? this.monthRange[1] : null,
        },
      };
      backApi.get('agent/all-periods-indicators', data).then(Response => {
        this.entries = Response.data.entries;
      });
    },
    downloadXls() {
      const dataa = {
        params: {
          beg_comdte: this.monthRange ? this.monthRange[0] : null,
          end_comdte: this.monthRange ? this.monthRange[1] : null,
        },
        responseType: 'blob',
      };
      backApi.get('/agent/all-periods-indicators/excel', dataa).then(({ data }) => {
        const filename = `${this.$t('История показателей партнера по периодам')}.xlsx`;
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
          beg_comdte: this.monthRange ? this.monthRange[0] : null,
          end_comdte: this.monthRange ? this.monthRange[1] : null,
        },
        responseType: 'blob',
      };
      backApi.get('/agent/all-periods-indicators/pdf', dataa).then(({ data }) => {
        const filename = `${this.$t('История показателей партнера по периодам')}.pdf`;
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
    toggleShow() {
      this.showModal = !this.showModal;
    },
    updateData(id) {
      backApi.get(`/agent/all-periods-indicators/${id}`).then(Response => {
        this.entries = Response.data.entries;
      });
      backApi.get('/agent/profile/child/', { params: { another_agent_id: id } }).then(Response => {
        this.userInfo = Response.data;
      });
      this.showModal = !this.showModal;
    },
    back() {
      const navEl = document.getElementsByClassName('router-link-exact-active router-link-active');
      console.log(navEl);
      console.log(
        $(navEl[0])
          .parent()
          .parent(),
      );
      $(navEl[0])
        .parent()
        .parent()
        .siblings()
        .addClass('active');
    },
  },
  computed: {
    userIcon() {
      return this.iconDict[this.rank_icon] ? this.iconDict[this.rank_icon].full : '';
    },
  },
};
</script>

<style lang="scss" scoped>
.rank_icon_legend {
  width: 25px;
  margin-right: 10px;
}
.mobile {
  display: none;
}
.userInfo {
  font-size: 22px;
  color: gray;
  font-weight: 400;
}
.export_btns {
  & span {
    color: #32aaa7;
    cursor: pointer;
    margin-right: 10px;
  }
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
@media (max-width: 760px) {
  .mobile {
    display: block;
    padding: 0;
  }
  .desktop {
    display: none;
  }
  .userInfo {
    font-size: 18px;
    color: gray;
    font-weight: 400;
  }
}
</style>
<style>
.el-month-table td.start-date .cell {
  background-color: #32aaa7;
  border-radius: 0;
}
.el-month-table td.end-date .cell {
  background-color: #32aaa7;
  border-radius: 0;
}
.el-month-table td.in-range div,
.el-month-table td.in-range div:hover {
  background-color: #55a1a0c2;
}
.el-month-table td.start-date div {
  border-radius: 0;
}
.el-month-table td.end-date div {
  border-radius: 0;
}
.el-month-table td.today .cell {
  color: #32aaa7;
}
@media (max-width: 525px) {
  .el-date-range-picker__content {
    width: 100%;
  }
  .el-date-range-picker {
    max-width: 320px !important;
  }
  .el-date-range-picker .el-picker-panel__body {
    min-width: unset !important;
  }
  .el-month-table td {
    padding: 0;
  }
}
</style>
