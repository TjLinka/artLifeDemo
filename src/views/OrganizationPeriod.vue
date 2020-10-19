<template>
  <div class="licevoischet__page">
    <div class="container">
      <h2 class="page__title">Организация текущего периода</h2>
      <div>
          <span class="mr-3" v-if="selectedFilters.tree_type">{{selectedFilters.tree_type}}</span>
          <span class="mr-3" v-if="selectedFilters.active_type">
              {{selectedFilters.active_type}}</span>
          <span class="mr-3" v-if="selectedFilters.agent_id">{{selectedFilters.agent_id}}</span>
          </div>
      <p class="exp_print">
        <span class="mr-3">Печать</span>
        <span class="mr-3">Экспорт в xls</span>
        <span class="mr-3">Экспорт в pdf</span>
      </p>
      <b-table :fields="fields" :items="entries" head-variant="light"> </b-table>
      <div class="row">
        <div class="col text-center search__btn" @click="toggleSearch" v-if="!searchActive">
          Поиск партнера
        </div>
      </div>
      <div v-if="searchActive" class="organization__modal">
        <h3>Поиск партнера</h3>
        <div class="row">
          <div class="col-md-6">
            <b-form-group label="Выбор дерева">
              <b-form-radio
                v-model="selectedFilters.tree_type"
                name="some-radios-1"
                value="Полное дерево"
                class="d-inline mr-3"
                >Полное дерево</b-form-radio
              >
              <b-form-radio
                v-model="selectedFilters.tree_type"
                name="some-radios-1"
                value="Директорское"
                class="d-inline"
                >Директорское</b-form-radio
              >
            </b-form-group>
          </div>
          <div class="col-md-6">
            <b-form-group label="Выбор активных / всех">
              <b-form-radio
                v-model="selectedFilters.active_type"
                name="some-radios-2"
                value="Активные"
                class="d-inline mr-3"
                >Активные</b-form-radio
              >
              <b-form-radio
                v-model="selectedFilters.active_type"
                name="some-radios-2"
                value="Все"
                class="d-inline"
                >Все</b-form-radio
              >
            </b-form-group>
          </div>
        </div>
        <div class="row edit">
          <div class="col-sm-6">
            <input
              type="text"
              name=""
              id=""
              placeholder="Номер"
              v-model="selectedFilters.agent_id"
            />
          </div>
          <div class="col-sm-6">
            <button class="mr-2">Показать</button
            ><button @click="clearSelectedFilters">Сбросить</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import 'vue2-datepicker/index.css';
import 'vue2-datepicker/locale/en';
import backApi from '../assets/backApi';

export default {
  name: 'PointsHistory',
  data() {
    return {
      searchActive: false,
      selectedFilters: {},
      entries: [],
      fields: [
        {
          key: 'dte',
          label: 'P/номер / Ранг / ФИО',
          sortable: true,
        },
      ],
    };
  },
  mounted() {
    // backApi.get('agent/points-detail').then((Response) => {
    //   this.entries = Response.data.entries;
    // });
  },
  computed: {},
  methods: {
    getSelectedDataRange() {
      // eslint-disable-next-line max-len
      if (this.rangeDate[0] != null && this.rangeDate[1] != null) {
        backApi
          .get('agent/points-detail', {
            params: {
              beg_dte: String(this.rangeDate[0]),
              end_dte: String(this.rangeDate[1]),
            },
          })
          .then((Response) => {
            this.entries = Response.data.entries;
          });
      } else {
        backApi.get('agent/points-detail').then((Response) => {
          this.entries = Response.data.entries;
        });
      }
    },
    toggleSearch() {
      this.searchActive = !this.searchActive;
    },
    clearSelectedFilters() {
      this.selectedFilters = {};
      this.searchActive = !this.searchActive;
    },
  },
};
</script>

<style lang="scss" scoped>
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
  & .search__btn {
    cursor: pointer;
  }
  & .organization__modal {
    //   position: absolute;
    width: 100%;
    bottom: 0;

    & .edit {
      input {
        width: 100%;
        border: 0;
        border-bottom: 1px solid #dee2f3;
        padding-bottom: 10px;
        outline: none;
      }
      button {
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
</style>
