<template>
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
      История показателей партнера по периодам
    </h2>
        <div class="col mt-4 search__btn mobile"
        @click="showModal = !showModal" v-if="!showModal">
          Настройки партнера <i class="el-icon-search search_icon"></i>
        </div>
      <p class="p-0 m-0 history_title">Период от и до</p>
      <div class="month_range_indicators">
        <el-date-picker
          v-model="monthRange"
          type="monthrange"
          range-separator="-"
          v-on:change="dd"
          value-format="yyyy-MM-dd"
          :format="`MMMM yyyy`"
          >
        </el-date-picker>
      </div>
    <div class="row mt-3">
      <div class="col">
        <p class="userInfo">
          <span class="mr-3">{{ userInfo.name }} {{ userInfo.id }}</span>
          <img class="mb-1" :src="`../icons/${userIcon}.svg`" alt="" />
        </p>
      </div>
    </div>
    <div class="row mt-3 mb-4">
      <div class="col export_btns">
        <!-- <span>Печать</span> -->
        <span @click="downloadXls">Экспорт в xlsx</span>
        <span @click="downloadPdf">Экспорт в pdf</span>
      </div>
    </div>
    <b-table responsive outlined head-variant="light"
    :items="entries" :fields="fields" show-empty
    emptyText="У вас нет истории показателей в выбранных периодах/в предыдущих периодах">
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
      <template v-slot:cell(oo)="row">
        {{ row.item.oo | localInt }}
      </template>
      <template v-slot:cell(ko)="row">
        {{ row.item.ko | localInt }}
      </template>
      <template v-slot:cell(rank_end)="row">
        {{ row.item.rank_end }}
      </template>
      <template #empty="scope">
        <h4>{{ scope.emptyText }}</h4>
      </template>
    </b-table>
    <footer class="container-fluid cust_modal">
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
    </footer>
  </div>
</template>

<script>
/* eslint-disable quote-props */
import backApi from '../assets/backApi';
import PartnerIndicatorsModal from '../components/PartnerIndicatorsModal.vue';

export default {
  name: 'PartnerIndicators',
  components: { PartnerIndicatorsModal },
  data() {
    return {
      iconDict: {
        'Клиент': {
          'full': 'Клиент',
          'short': 'Клиент',
        },
        'Консультант': {
          'full': 'Консультант',
          'short': 'Консультант',
        },
        'Мастер': {
          'full': 'Мастер',
          'short': 'Мастер',
        },
        'Управляющий': {
          'full': 'Управляющий',
          'short': 'Управляющий',
        },
        'Директор': {
          'full': 'Директор',
          'short': 'Директор',
        },
        'Серебряный Директор': {
          'full': 'Серебряный Директор',
          'short': 'Сер.Директор',
        },
        'Золотой Директор': {
          'full': 'Золотой Директор',
          'short': 'Зол.Директор',
        },
        'Рубиновый Директор': {
          'full': 'Рубиновый Директор',
          'short': 'Руб.Директор',
        },
        'Бриллиантовый Директор': {
          'full': 'Бриллиантовый Директор',
          'short': 'Брил.Директор',
        },
        'Президент': {
          'full': 'Президент',
          'short': 'Президент',
        },
        'Сер.Директор': {
          'full': 'Серебряный Директор',
          'short': 'Сер.Директор',
        },
        'Зол.Директор': {
          'full': 'Золотой Директор',
          'short': 'Зол.Директор',
        },
        'Руб.Директор': {
          'full': 'Рубиновый Директор',
          'short': 'Руб.Директор',
        },
        'Брил.Директор': {
          'full': 'Бриллиантовый Директор',
          'short': 'Брил.Директор',
        },
      },
      monthRange: [],
      showModal: false,
      rank_icon: '',
      months: ['Январь', 'Ферваль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Августь', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
      entries: [],
      fields: [
        {
          key: 'comdte',
          label: 'Период',
          sortable: true,
          formatter(v) {
            const mass = [
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
            ];
            return (`${mass[new Date(v).getMonth()]} ${new Date(v).getFullYear()}`);
          },
        },
        {
          key: 'noact',
          label: 'Не активность',
          sortable: true,
          thStyle: {
            width: '150px',
            minWidth: '130px',
          },
        },
        {
          key: 'lo',
          label: 'ЛО',
          sortable: true,
          thStyle: {
            width: '100px',
            minWidth: '50px',
          },
        },
        {
          key: 'go',
          label: 'ГО',
          sortable: true,
          thStyle: {
            width: '100px',
            minWidth: '50px',
          },
        },
        {
          key: 'ngo',
          label: 'НГО',
          sortable: true,
          thStyle: {
            width: '100px',
            minWidth: '50px',
          },
        },
        {
          key: 'oo',
          label: 'ОО',
          sortable: true,
          thStyle: {
            width: '100px',
            minWidth: '50px',
          },
        },
        {
          key: 'ko',
          label: 'КО',
          sortable: true,
          thStyle: {
            width: '100px',
            minWidth: '50px',
          },
        },
        {
          key: 'rank_beg',
          label: 'Ранг на начало',
          sortable: true,
          thStyle: {
            minWidth: '120px',
          },
        },
        {
          key: 'rank_calc',
          label: 'Расчётный ранг',
          sortable: true,
          thStyle: {
            minWidth: '120px',
          },
        },
        {
          key: 'rank_end',
          label: 'Ранг на конец',
          sortable: true,
          thStyle: {
            minWidth: '120px',
          },
        },
      ],
      userInfo: {},
    };
  },
  mounted() {
    if (this.$route.params.id) {
      backApi.get(`/agent/all-periods-indicators/${this.$route.params.id}`).then((Response) => {
        this.entries = Response.data.entries;
      });
      backApi
        .get('/agent/profile/child/', { params: { another_agent_id: this.$route.params.id } })
        .then((Response) => {
          this.userInfo = Response.data;
        });
    } else {
      backApi.get('/agent/all-periods-indicators').then((Response) => {
        this.entries = Response.data.entries;
      });
      backApi.get('/agent/profile/').then((Response) => {
        this.userInfo = Response.data;
        backApi.get('/agent/transfer-info', { params: { another_agent_id: Response.data.id } }).then((response) => {
          this.rank_icon = response.data.rank_calc;
        });
      });
    }
  },
  methods: {
    dd() {
      const data = {
        params: {
          beg_comdte: this.monthRange ? this.monthRange[0] : null,
          end_comdte: this.monthRange ? this.monthRange[1] : null,
        },
      };
      backApi.get('agent/all-periods-indicators', data).then((Response) => {
        this.entries = Response.data.entries;
      });
    },
    downloadXls() {
      backApi.get('/agent/all-periods-indicators/excel', { responseType: 'blob' })
        .then(({ data }) => {
          const filename = 'История показателей партнера по периодам.xlsx';
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
      backApi.get('/agent/all-periods-indicators/pdf', { responseType: 'blob' })
        .then(({ data }) => {
          const filename = 'История показателей партнера по периодам.pdf';
          const url = window.URL.createObjectURL(new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }));
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
      backApi.get(`/agent/all-periods-indicators/${id}`).then((Response) => {
        this.entries = Response.data.entries;
      });
      backApi
        .get('/agent/profile/child/', { params: { another_agent_id: id } })
        .then((Response) => {
          this.userInfo = Response.data;
        });
      this.showModal = !this.showModal;
    },
    back() {
      this.$router.go(-1);
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
.mobile{
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
@media (max-width: 760px) {
  .mobile{
    display: block;
    padding: 0;
  }
  .desktop{
    display: none;
  }
}
</style>
<style>
.el-month-table td.start-date .cell{
  background-color: #32aaa7;
  border-radius: 0;
}
.el-month-table td.end-date .cell{
  background-color: #32aaa7;
  border-radius: 0;
}
.el-month-table td.in-range div, .el-month-table td.in-range div:hover{
  background-color: #55a1a0c2;
}
.el-month-table td.start-date div{
  border-radius: 0;
}
.el-month-table td.end-date div{
  border-radius: 0;
}
.el-month-table td.today .cell{
  color: #32aaa7;
}
</style>
