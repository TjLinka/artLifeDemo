<template>
  <div class="licevoischet__page">
    <div class="container">
      <h2 class="page__title">Организация текущего периода</h2>
      <!-- <div>
        <span class="mr-3" v-if="selectedFilters.tree_type">
          {{ selectedFilters.tree_type }}
        </span>
        <span class="mr-3" v-if="selectedFilters.active_type">
          {{ selectedFilters.active_type }}
        </span>
        <span class="mr-3" v-if="selectedFilters.agent_id">
          {{ selectedFilters.agent_id }}
        </span>
      </div> -->
      <p class="exp_print">
        <span class="mr-3">Печать</span>
        <span class="mr-3">Экспорт в xls</span>
        <span class="mr-3">Экспорт в pdf</span>
      </p>
      <!-- <vue-ads-table
        :columns="columns"
        :rows="rows"
        :call-children="callChildren"
      >
        <template slot="stock_acc_sum_clickable" slot-scope="props">
          {{ props.row[props.column.property] }}
        </template>
      </vue-ads-table> -->
      <el-table
        :data="rows"
        style="width: 100%"
        row-key="id"
        border
        lazy
        :load="load"
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      >
        <el-table-column
          v-for="(column, index) in columns"
          :prop="column.property"
          :key="index"
          :label="column.title"
        ></el-table-column>
      </el-table>
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
                value="false"
                class="d-inline mr-3"
                >Полное дерево</b-form-radio
              >
              <b-form-radio
                v-model="selectedFilters.tree_type"
                name="some-radios-1"
                value="true"
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
                value="true"
                class="d-inline mr-3"
                >Активные</b-form-radio
              >
              <b-form-radio
                v-model="selectedFilters.active_type"
                name="some-radios-2"
                value="false"
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
            <button class="mr-2" @click="updateData">Показать</button
            ><button @click="clearSelectedFilters">Сбросить</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { VueAdsTable } from 'vue-ads-table-tree';
import '@fortawesome/fontawesome-free/css/all.css';
import 'vue-ads-table-tree/dist/vue-ads-table-tree.css';
import backApi from '../assets/backApi';

export default {
  name: 'PointsHistory',
  components: {
    // VueAdsTable,
  },
  data() {
    const rows = [];
    const columns = [
      {
        property: 'has_children',
        title: 'ID склада',
      },
      {
        property: 'id',
        title: 'Р/Номер',
      },
      {
        property: 'name',
        title: 'ФИО',
      },
      {
        property: 'rank_end',
        title: 'Ранг',
      },
    ];
    return {
      searchActive: false,
      selectedFilters: {
        agent_id: null,
        director_tree: false,
        active_only: false,
        get_root: true,
      },
      rows,
      columns,
    };
  },
  mounted() {
    const data = { params: this.selectedFilters };
    backApi.get('/agents-tree-hist', data).then((response) => {
      this.rows = response.data.entries;
      this.rows.forEach((e) => {
        // eslint-disable-next-line no-underscore-dangle
        e.hasChildren = e.has_children;
        // eslint-disable-next-line no-underscore-dangle
      });
    });
  },
  computed: {},
  methods: {
    load(tree, treeNode, resolve) {
      const data = {
        params: {
          agent_id: null,
          director_tree: false,
          active_only: false,
          get_root: false,
        },
      };
      backApi.get('/agents-tree-hist', data).then((Response) => {
        const result = Response.data.entries.slice(1);
        result.forEach((e) => {
        // eslint-disable-next-line no-underscore-dangle
          e.hasChildren = e.has_children;
        // eslint-disable-next-line no-underscore-dangle
        });
        resolve(result);
      });
    },
    toggleSearch() {
      this.searchActive = !this.searchActive;
    },
    clearSelectedFilters() {
      const data = {
        params: {
          agent_id: null,
          director_tree: false,
          active_only: false,
          get_root: true,
        },
      };
      this.selectedFilters = {
        agent_id: null,
        director_tree: false,
        active_only: false,
        get_root: true,
      };
      backApi.get('/agents-tree-hist', data).then((Response) => {
        this.rows = Response.data.entries;
        this.rows.forEach((e) => {
          // eslint-disable-next-line no-underscore-dangle
          e.hasChildren = e.has_children;
          // eslint-disable-next-line no-underscore-dangle
        });
      });
      this.searchActive = !this.searchActive;
    },
    updateData() {
      const data = {
        params: {
          agent_id: this.selectedFilters.agent_id,
          director_tree: this.selectedFilters.tree_type,
          active_only: this.selectedFilters.active_type,
          get_root: false,
        },
      };
      backApi.get('/agents-tree-hist', data).then((Response) => {
        this.rows = Response.data.entries;
        this.rows.forEach((e) => {
          // eslint-disable-next-line no-underscore-dangle
          e.hasChildren = e.has_children === 1;
          // eslint-disable-next-line no-underscore-dangle
          e._id = 'clickable';
        });
      });
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
    margin-bottom: 30px;
    text-transform: uppercase;
    font-weight: bold;
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
<style>
.el-table__indent{
  padding-left: 0 !important;
}
</style>
