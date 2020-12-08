<template>
  <div class="licevoischet__page">
    <div class="container">
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
        Передача прав
      </h2>
      <div class="row cur_p">
        <div class="col">
          <p class="current_period">
            <strong>Права на управление баллами личной группой переданы -</strong>
            Василию Василььевич Васильеву
          </p>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-md-6 rights_btns">
          <button @click="takeRight">Забрать права</button>
          <button @click="showModal1 = !showModal1">Передать права</button>
        </div>
      </div>
      <h2 class="mt-4">Под заголовок</h2>
      <b-table :fields="fields" :items="entries" head-variant="light" responsive outlined>
        <template v-slot:cell(agent_id)="row">
          <router-link :to="`/agent/${row.item.agent_id}`" class="link">{{
            row.item.agent_id
          }}</router-link>
        </template>
      </b-table>
    </div>
    <footer class="container-fluid cust_modal" v-if="showModal2">
      <div>
        <RightsModalGive v-on:enlarge-text="showModal2 = false"/>
      </div>
    </footer>
  </div>
</template>

<script>
import backApi from '../assets/backApi';
import RightsModalGive from '../components/RightsModalGive.vue';

export default {
  name: 'Rights',
  components: { RightsModalGive },
  data() {
    return {
      showModal1: false,
      showModal2: false,
      entries: [],
      fields: [
        {
          key: 'id',
          label: 'Номер партнёра',
        },
        {
          key: 'stockname',
          label: 'Склад обслуживания',
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
          key: 'rank_end',
          label: 'Ранг на конец',
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
          key: 'reserve',
          label: 'Резерв',
        },
      ],
    };
  },
  mounted() {
    backApi.get('/agent/share-transfert-list').then((Response) => {
      this.entries = Response.data.entries;
    });
  },
  methods: {
    takeRight() {
      backApi.post('/agent/share-transfert', { agent_to: null });
    },
    back() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
.link {
  color: #32aaa7;
  text-decoration: underline;
}
.current_period {
  background-color: #ebeefa;
  padding: 16px 12px;
  display: inline-block;
  border-radius: 1px;

  & br {
    display: none;
  }
}
.rights_btns {
  button {
    width: 48%;
    border: 0;
    padding: 5px 30px;
    font-size: 16px;
    &:nth-of-type(1) {
      background-color: #32aaa7;
      color: white;
      margin-right: 10px;
    }
    &:nth-of-type(2) {
      background-color: white;
      color: #32aaa7;
      border: 2px solid #32aaa7;
      padding: 3px 30px;
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
    padding-bottom: 40px;
    box-sizing: border-box;
    background: #FFFFFF;
    box-shadow: 0px 4px 12px 2px rgba(0, 0, 0, 0.24);
}
</style>
