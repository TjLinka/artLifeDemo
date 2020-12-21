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
    <div class="row mt-4">
      <div class="col">
        <p class="userInfo">
          <span>{{ userInfo.name }} {{ userInfo.id }}</span
          ><img alt="" />
        </p>
      </div>
    </div>
    <div class="row mt-3 mb-4">
      <div class="col export_btns">
        <!-- <span>Печать</span> -->
        <span @click="downloadXls">Экспорт в xls</span>
        <!-- <span>Экспорт в pdf</span> -->
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
        <div class="col text-center search__btn"
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
import backApi from '../assets/backApi';
import PartnerIndicatorsModal from '../components/PartnerIndicatorsModal.vue';

export default {
  name: 'PartnerIndicators',
  components: { PartnerIndicatorsModal },
  data() {
    return {
      showModal: false,
      entries: [],
      fields: [
        {
          key: 'comdte',
          label: 'Период',
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
          thStyle: {
            width: '150px',
            minWidth: '130px',
          },
        },
        {
          key: 'lo',
          label: 'ЛО',
          thStyle: {
            width: '100px',
            minWidth: '50px',
          },
        },
        {
          key: 'go',
          label: 'ГО',
          thStyle: {
            width: '100px',
            minWidth: '50px',
          },
        },
        {
          key: 'ngo',
          label: 'НГО',
          thStyle: {
            width: '100px',
            minWidth: '50px',
          },
        },
        {
          key: 'oo',
          label: 'ОО',
          thStyle: {
            width: '100px',
            minWidth: '50px',
          },
        },
        {
          key: 'ko',
          label: 'КО',
          thStyle: {
            width: '100px',
            minWidth: '50px',
          },
        },
        {
          key: 'rank_beg',
          label: 'Ранг на начало',
          thStyle: {
            minWidth: '120px',
          },
        },
        {
          key: 'rank_calc',
          label: 'Расчётный ранг',
          thStyle: {
            minWidth: '120px',
          },
        },
        {
          key: 'rank_end',
          label: 'Ранг на конец',
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
      });
    }
  },
  methods: {
    downloadXls() {
      backApi.get('/agent/all-periods-indicators/excel', { responseType: 'blob' })
        .then(({ data }) => {
          const filename = 'История показателей партнера по периодам.xls';
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
  },
};
</script>

<style lang="scss" scoped>
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
</style>
