<template>
  <div class="container-fluid table_container">
    <h2 class="page__title">
      <p class="mobile_back" @click="back">
        <svg
          width="18"
          height="12"
          viewBox="0 0 18 12"
          fill="none"
          style="margin-right: 30px;"
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
        <span>Печать</span>
        <span>Экспорт в xls</span>
        <span>Экспорт в pdf</span>
      </div>
    </div>
    <b-table responsive outlined head-variant="light" :items="entries" :fields="fields">
      <template v-slot:cell(comdte)="row">
        {{ new Date(row.item.comdte).toLocaleDateString() }}
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
    </b-table>
    <footer class="container-fluid cust_modal">
      <div class="row" v-if="!showModal">
        <div class="col text-center search__btn"
        @click="showModal = !showModal" v-if="!showModal">
          Настройки партнера <i class="el-icon-search search_icon"></i>
        </div>
      </div>
      <div v-else>
        <AgentInfoModalPoints
          v-on:update-data="updateData($event)"
        />
      </div>
    </footer>
  </div>
</template>

<script>
import backApi from '../assets/backApi';
import AgentInfoModalPoints from '../components/PartnerIndicatorsModal.vue';

export default {
  name: 'PartnerIndicators',
  components: { AgentInfoModalPoints },
  data() {
    return {
      showModal: false,
      entries: [],
      fields: [
        {
          key: 'comdte',
          label: 'Период',
        },
        {
          key: 'noact',
          label: 'Не активность',
        },
        {
          key: 'lo',
          label: 'ЛО',
        },
        {
          key: 'go',
          label: 'ГО',
        },
        {
          key: 'ngo',
          label: 'НГО',
        },
        {
          key: 'oo',
          label: 'ОО',
        },
        {
          key: 'ko',
          label: 'КО',
        },
        {
          key: 'rank_beg',
          label: 'Ранг на начало',
        },
        {
          key: 'rank_calc',
          label: 'Расчётный ранг',
        },
        {
          key: 'reserve',
          label: 'Баллы в резерве',
        },
      ],
      userInfo: {},
    };
  },
  mounted() {
    if (this.$route.params.id) {
      backApi.get(`/agent/all-periods-indicators/${this.$route.params.id}`).then((Response) => {
        console.log(Response.data);
        this.entries = Response.data.entries;
      });
      backApi
        .get('/agent/profile/child/', { params: { another_agent_id: this.$route.params.id } })
        .then((Response) => {
          console.log(Response.data);
          this.userInfo = Response.data;
        });
    } else {
      backApi.get('/agent/all-periods-indicators').then((Response) => {
        console.log(Response.data);
        this.entries = Response.data.entries;
      });
      backApi.get('/agent/profile/').then((Response) => {
        console.log(Response.data);
        this.userInfo = Response.data;
      });
    }
  },
  methods: {
    updateData(id) {
      backApi.get(`/agent/all-periods-indicators/${id}`).then((Response) => {
        console.log(Response.data);
        this.entries = Response.data.entries;
      });
      backApi
        .get('/agent/profile/child/', { params: { another_agent_id: id } })
        .then((Response) => {
          console.log(Response.data);
          this.userInfo = Response.data;
        });
      this.showModal = !this.showModal;
    },
    back() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
.search__btn {
    padding-top: 20px;
    cursor: pointer;
    margin-bottom: 20px;
    text-transform: uppercase;
    font-weight: 500;

    & .search_icon {
      color: #32aaa7;
    }
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
</style>
