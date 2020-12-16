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
            {{ruleGiver ? ruleGiver : 'Никому'}}
          </p>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-xl-6 rights_btns">
          <button @click="takeRight"
          :disabled="ruleGiver !== null
          && ruleGiver !== '' ? false : true"
          :class="ruleGiver !== null
          && ruleGiver !== '' ? '' : 'disabled'"
          >Забрать права</button>
          <button @click="showModal1 = !showModal1">Передать права</button>
        </div>
      </div>
      <h2 class="mt-4">Праводатели</h2>
      <b-table :fields="fields" :items="entries" head-variant="light" responsive outlined>
        <template v-slot:cell(id)="row">
          <router-link :to="`/agent/${row.item.id}`" class="link">{{
            row.item.id
          }}</router-link>
        </template>
      </b-table>
    </div>
    <footer class="container-fluid cust_modal" v-if="showModal1">
      <div>
        <RightsModalTake
        v-on:enlarge-text="showModal1 = false"
        v-on:toast="sss"
        v-on:rulegiver="ruleGiver = $event"/>
      </div>
    </footer>
      <b-toast id="my-toast-1" variant="success" solid>
      <template #toast-title>
        <div class="d-flex flex-grow-1 align-items-baseline">
          <b-img blank blank-color="green" class="mr-2" width="12" height="12"></b-img>
          <strong class="mr-auto">Успех!</strong>
          <!-- <small class="text-muted mr-2">42 seconds ago</small> -->
        </div>
      </template>
      Права забраны!
    </b-toast>
      <b-toast id="my-toast-2" variant="success" solid>
      <template #toast-title>
        <div class="d-flex flex-grow-1 align-items-baseline">
          <b-img blank blank-color="green" class="mr-2" width="12" height="12"></b-img>
          <strong class="mr-auto">Успех!</strong>
          <!-- <small class="text-muted mr-2">42 seconds ago</small> -->
        </div>
      </template>
      Права переданы!
    </b-toast>
  </div>
</template>

<script>
import backApi from '../assets/backApi';
import RightsModalTake from '../components/RightsModalTake.vue';

export default {
  name: 'Rights',
  components: { RightsModalTake },
  data() {
    return {
      showModal1: false,
      showModal2: false,
      ruleGiver: '',
      entries: [],
      fields: [
        {
          key: 'id',
          label: 'Номер партнёра',
        },
        {
          key: 'agentname',
          label: 'ФИО',
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
    backApi.get('/agent/profile').then((Response) => {
      this.ruleGiver = Response.data.agent2transfer_name;
    });
    backApi.get('/agent/share-transfert-list').then((Response) => {
      this.entries = Response.data.entries;
    });
  },
  methods: {
    sss() {
      this.$bvToast.show('my-toast-2');
    },
    takeRight() {
      backApi.post('/agent/share-transfert', { agent_to: null });
      setTimeout(() => {
        backApi.get('/agent/profile').then((Response) => {
          this.ruleGiver = Response.data.agent2transfer_name;
        });
      }, 1000);
      this.$bvToast.show('my-toast-1');
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
      &.disabled{
        color: #9A9A9A;
        background-color: #DEE2F3;
      }
    }
    &:nth-of-type(2) {
      background-color: white;
      color: #32aaa7;
      border: 2px solid #32aaa7;
      padding: 3px 30px;
    }
  }
}
@media (max-width: 525px) {
  .rights_btns {
    button {
      width: 100%;
      display: block;
      &:nth-of-type(1) {
        margin-bottom: 15px;
      }
    }
  }
}
</style>
