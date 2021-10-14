<template>
  <div class="licevoischet__page">
    <div v-loading="loading">
    <div class="container-md"  v-show="!loading">
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
        {{$t("Передача прав")}}
      </h2>
      <div class="row cur_p">
        <div class="col">
          <p class="current_period">
            <strong>{{$t("Права на управление баллами личной группой переданы")}} -</strong>
            {{ruleGiver ? ruleGiver : 'Никому'}}
          </p>
        </div>
      </div>
      <div class="row mt-3 noprint">
        <div class="col-xl-6 rights_btns">
          <button @click="takeRight"
          :disabled="ruleGiver !== null
          && ruleGiver !== '' ? false : true"
          :class="ruleGiver !== null
          && ruleGiver !== '' ? '' : 'disabled'"
          >{{$t("Забрать права")}}</button>
          <button @click="showModal1 = !showModal1">{{$t("Передать права")}}</button>
        </div>
      </div>
      <h2 class="mt-4">{{$t("Переданные мне права")}}</h2>
      <p class="exp_print mt-3 noprint">
        <!-- <span class="mr-3">Печать</span> -->
        <span class="mr-3" @click="downloadPdf">{{$t("Экспорт в pdf")}}</span>
        <span class="mr-3" @click="downloadXls">{{$t("Экспорт в xlsx")}}</span>
        <!-- <span class="mr-3" >Экспорт возвратной накладной в pdf</span> -->
        <!-- <span class="mr-3">Экспорт возвратной накладной в pdf</span> -->
      </p>
      <div>
      <b-table
      sticky-header
      :fields="fields"
      :items="entries"
      head-variant="light"
      responsive
      selectable
      select-mode="single"
      @row-selected="onRowSelected"
      style="margin-bottom: 70px;"
      outlined>
        <template v-slot:cell(id)="row">
          <router-link :to="`/agent/${row.item.id}`" class="link">
          {{row.item.id}}</router-link>
        </template>
      </b-table>
      </div>
    </div>
    </div>
    <footer class="container-fluid cust_modal noprint" v-if="showModal1">
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
          <strong class="mr-auto">{{$t("Успех")}}!</strong>
          <!-- <small class="text-muted mr-2">42 seconds ago</small> -->
        </div>
      </template>
      {{$t("Права забраны")}}!
    </b-toast>
      <b-toast id="my-toast-2" variant="success" solid>
      <template #toast-title>
        <div class="d-flex flex-grow-1 align-items-baseline">
          <b-img blank blank-color="green" class="mr-2" width="12" height="12"></b-img>
          <strong class="mr-auto">{{$t("Успех")}}!</strong>
          <!-- <small class="text-muted mr-2">42 seconds ago</small> -->
        </div>
      </template>
      {{$t("Права переданы")}}!
    </b-toast>
    <div :class="`mobile_modal_mask ${showModal1 ? 'active' : ''}`"></div>
      <footer class="container-md-fluid cust_modal mmm noprint">
      <div class="row desk_trans">
        <div
        class="col text-center search__btn"
        @click="goToTransfert"
        >
          {{$t("Перейти в таблицу управления трансфертом")}}
        </div>
      </div>
      </footer>
  </div>
</template>

<script>
import $ from 'jquery';
import backApi from '../assets/backApi';
import RightsModalTake from '../components/RightsModalTake.vue';

export default {
  name: 'Rights',
  components: { RightsModalTake },
  data() {
    return {
      loading: true,
      showModal1: false,
      ruleGiver: '',
      selectedUserId: null,
      entries: [],
      fields: [
        {
          key: 'id',
          label: this.$t('Номер партнера'),
          sortable: true,
        },
        {
          key: 'agentname',
          label: this.$t('ФИО'),
          sortable: true,
        },
        {
          key: 'stockname',
          label: this.$t('Склад обслуживания'),
          sortable: true,
        },
        {
          key: 'rank_beg',
          label: this.$t('Ранг на начало'),
        },
        {
          key: 'rank_calc',
          label: this.$t('Расчетный ранг'),
        },
        {
          key: 'rank_end',
          label: this.$t('Ранг на конец'),
        },
        {
          key: 'lo',
          label: this.$t('ЛО'),
          sortable: true,
          formatter: (v) => {
            if (v === null) return '-';
            const formatter = new Intl.NumberFormat('ru');
            return formatter.format(parseFloat(v, 0));
          },
        },
        {
          key: 'go',
          label: this.$t('ГО'),
          sortable: true,
          formatter: (v) => {
            if (v === null) return '-';
            const formatter = new Intl.NumberFormat('ru');
            return formatter.format(parseFloat(v, 0));
          },
        },
        {
          key: 'reserve',
          label: this.$t('Резерв'),
          sortable: true,
          formatter: (v) => {
            if (v === null) return '-';
            const formatter = new Intl.NumberFormat('ru');
            return formatter.format(parseFloat(v, 0));
          },
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
    }).then(() => {
      setTimeout(() => { this.loading = false; });
    });
  },
  methods: {
    downloadXls() {
      backApi.get('/agent/share-transfert-list/excel', { responseType: 'blob' })
        .then(({ data }) => {
          const filename = `${this.$t('Переданные мне права')}.xlsx`;
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
      backApi.get('/agent/share-transfert-list/pdf', { responseType: 'blob' })
        .then(({ data }) => {
          const filename = `${this.$t('Переданные мне права')}.pdf`;
          const url = window.URL.createObjectURL(new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', filename);
          document.body.appendChild(link);
          link.click();
          link.remove();
        });
    },
    onRowSelected(item) {
      if (item.length > 0) {
        this.selectedUserId = item[0].id;
      } else {
        this.selectedUserId = null;
      }
    },
    goToTransfert() {
      this.$router.push(`/transfermanagement/${this.selectedUserId === null ? '' : this.selectedUserId}`);
    },
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
      const navEl = document.getElementsByClassName('router-link-exact-active router-link-active');
      $(navEl[0])
        .parent()
        .parent()
        .siblings()
        .addClass('active');
    },
  },
};
</script>

<style lang="scss" scoped>
.mmm{
  z-index: 9;
}
.search__btn{
  text-transform: none;
  font-size: 16px;
}
.link {
  position: relative;
  color: #32aaa7;
  &::after{
      position: absolute;
      content: '';
      width: 100%;
      left: 0;
      bottom: 0;
      height: 2px;
      border-bottom: 1px dotted #32aaa7;
  }
}
.b-table-row-selected td, .b-table-row-selected td a::after{
  border-bottom: 1px dotted white;
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
  .search__btn{
    padding: 10px;
  }
}
</style>
