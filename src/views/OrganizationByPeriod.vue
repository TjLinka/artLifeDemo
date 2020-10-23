<template>
  <div class="licevoischet__page">
    <div class="container">
      <h2 class="page__title">История оргназации по периодам</h2>
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
      <p class="exp_print">
        <span class="mr-3">Печать</span>
        <span class="mr-3">Экспорт в xls</span>
        <span class="mr-3">Экспорт в pdf</span>
      </p>
      <el-table
        :key="tree_key"
        :data="rows"
        style="width: 100%"
        row-key="id"
        border
        lazy
        :load="load"
        :tree-props="{ children: 'children', hasChildren: 'has_children' }"
        :row-class-name="tableRowClassName"
      >
        <el-table-column
          v-for="(column, index) in columns"
          :prop="column.property"
          :key="index"
          :label="column.title"
          :fixed="column.property == 'id' ? true : false"
          :width="col_width(column)"
        >
          <!--  -->

          <template slot-scope="scope">
            <!-- {{column.property}} -->
            <span v-if="column.property != 'id'">{{ column.formater(scope.row) }}</span>
            <span v-else>
              УР {{ scope.row.depth }}<br />
              {{ scope.row.rank_beg }}<br />
              {{ scope.row.id }}<br />
              {{ scope.row.name }}
            </span>
          </template>
        </el-table-column>
      </el-table>
      <div class="row">
        <div class="col text-center search__btn" @click="toggleSearch" v-if="!searchActive">
          Поиск партнера <i class="el-icon-search search_icon"></i>
        </div>
      </div>
      <div v-if="searchActive" class="organization__modal">
        <h3>Поиск партнера</h3>
        <span
            class="mr-1"
            @click="periodIndex = periodIndex - 1 >= 0 ? periodIndex - 1 : periods.length - 1"
          >
            &lt;</span
          >
          <span>{{ currentPeriod.slice(0, -3) }}</span>
          <span class="ml-1" @click="periodIndex = (periodIndex + 1) % periods.length"> &gt;</span>
        <div class="row">
          <div class="col-md-12">
            <b-form-group label="Выбор дерева">
              <b-form-radio
                v-model="tree_type"
                name="some-radios-1"
                value="full"
                class="d-inline mr-3"
                >Полное дерево</b-form-radio
              >
              <b-form-radio
                v-model="tree_type"
                name="some-radios-1"
                value="director"
                class="d-inline mr-3"
                >Директорское</b-form-radio
              >
              <b-form-radio v-model="tree_type" name="some-radios-1" value="active" class="d-inline"
                >Своя группа</b-form-radio
              >
            </b-form-group>
          </div>
        </div>
        <div class="row edit">
          <div class="col-sm-6">
            <input type="text" name="" id="" placeholder="Номер" v-model="agent_id" />
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
import backApi from '../assets/backApi';

export default {
  name: 'OrganizationByPeriod',
  components: {},
  data() {
    const rows = [];
    const columns = [
      {
        property: 'id',
        title: 'P/номер / Ранг / ФИО',
        formater: (item) => `УР ${item.depth}<br>${item.rank_beg}<br>${item.id}<br>${item.name}`,
      },
      {
        property: 'noact',
        title: 'не активность',
        formater: (item) => item.noact,
      },
      {
        property: 'lo',
        title: 'ЛО',
        formater: (item) => item.lo,
      },
      {
        property: 'go',
        title: 'ГО',
        formater: (item) => item.go,
      },
      {
        property: 'ngo',
        title: 'НГО',
        formater: (item) => item.ngo,
      },
      {
        property: 'oo',
        title: 'ОО',
        formater: (item) => item.oo,
      },
      {
        property: 'ko',
        title: 'КО',
        formater: (item) => item.ko,
      },
      {
        property: 'rank_beg',
        title: 'ранг на начало',
        formater: (item) => item.rank_beg,
      },
      {
        property: 'rank_calc',
        title: 'расчетный ранг',
        formater: (item) => item.rank_calc,
      },
      {
        property: 'reserve',
        title: 'балы в резерве',
        formater: (item) => item.reserve,
      },
    ];
    return {
      searchActive: false,
      tree_type: 'full',
      agent_id: null,
      get_root: true,
      tags: [],
      children: [],
      rows,
      columns,
      tree_key: 0,
      periods: [],
      periodIndex: 0,
    };
  },
  mounted() {
    backApi.get('agent/bonus-detail/periods').then((Response) => {
      this.periods = Response.data.entries.sort((a, b) => {
        const result = a.comdte > b.comdte ? 1 : -1;
        return result;
      });
      this.periodIndex = this.periods.length - 1;
      const data = {
        params: {
          filter: this.tree_type,
          get_root: true,
          period: this.currentPeriod,
        },
      };
      backApi.get('/agents-tree-hist/period', data).then((response) => {
        this.rows = response.data.entries;
        this.rows.forEach((e) => {
          e.depth = 0;
          e.children = [];
        });
      });
    });
  },
  computed: {
    currentPeriod() {
      try {
        return this.periods[this.periodIndex].comdte;
      } catch (e) {
        return '';
      }
    },
  },
  methods: {
    col_width(col) {
      if (col.property === 'id') {
        return 250;
      }
      return null;
    },
    tableRowClassName({ row }) {
      return `depth-${row.depth}`;
    },
    handleClose(event, tag) {
      // this.tags.splice(this.dynamicTags.indexOf(tag), 1);
      this.tags.splice(this.tags.indexOf(tag), 1);
      if (tag.key === 'tree_type') {
        this.tree_type = 'full';
      } else if (tag.key === 'agent_id') {
        this.agent_id = null;
      } else if (tag.key === 'period') {
        console.log(1, this.currentPeriod);
        this.periodIndex = this.periods.length - 1;
        console.log(2, this.currentPeriod);
      }
      this.updateData();
    },
    load(tree, treeNode, resolve) {
      const data = {
        params: {
          agent_id: tree.id,
          filter: this.tree_type,
          get_root: false,
        },
      };
      backApi.get('/agents-tree-hist/period', data).then((Response) => {
        Response.data.entries.forEach((e) => {
          e.depth = tree.depth + 1;
          e.children = [];
        });
        resolve(Response.data.entries);
      });
    },
    toggleSearch() {
      this.searchActive = !this.searchActive;
    },
    clearSelectedFilters() {
      const data = {
        params: {
          agent_id: null,
          filter: 'full',
          get_root: true,
        },
      };
      backApi.get('/agents-tree-hist/period', data).then((Response) => {
        this.rows = Response.data.entries;
        this.rows.forEach((e) => {
          e.depth = 0;
        });
      });
      this.searchActive = !this.searchActive;
    },
    updateData() {
      const data = {
        params: {
          filter: this.tree_type,
          get_root: true,
          period: this.currentPeriod,
        },
      };
      const treeNameTranslate = {
        active: 'Своя группа',
        full: 'Полное дерево',
        director: 'Директорское',
      };
      if (this.tree_type !== null) {
        const treeName = treeNameTranslate[this.tree_type];
        const tag = this.tags.find((t) => t.key === 'tree_type');
        if (tag) {
          tag.name = treeName;
        } else if (this.tree_type !== 'full') {
          this.tags.push({ name: treeName, key: 'tree_type' });
        }
      }
      if (this.agent_id !== null && this.agent_id !== '') {
        const tag = this.tags.find((t) => t.key === 'agent_id');
        if (tag) {
          tag.name = this.agent_id;
        } else {
          this.tags.push({ name: this.agent_id, key: 'agent_id' });
        }
        data.params.agent_id = this.agent_id;
      }
      const tag = this.tags.find((t) => t.key === 'period');
      if (tag) {
        tag.name = this.currentPeriod.slice(0, -3);
      } else if (this.currentPeriod !== this.periods[this.periods.length - 1].comdte) {
        this.tags.push({ name: this.currentPeriod.slice(0, -3), key: 'period' });
      }
      this.searchActive = false;
      backApi.get('/agents-tree-hist/period', data).then((response) => {
        this.rows = response.data.entries;
        this.rows.forEach((e) => {
          e.depth = 0;
        });
      });
      this.tree_key += 1;
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

    & .search_icon {
      color: #32aaa7;
    }
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
.el-table__indent {
  padding-left: 0 !important;
}
.el-icon-arrow-right {
  color: white;
}
.depth-0 {
  background-color: #32aaa7 !important;
  color: white;
}
.depth-1 {
  background-color: #bebebe !important;
  color: black;
}
.depth-2 {
  background-color: #c4c5c6 !important;
  color: black;
}
.depth-3 {
  background-color: #cecfd0 !important;
  color: black;
}
.depth-4 {
  background-color: #d4d5d7 !important;
  color: black;
}
.depth-5 {
  background-color: #e3e3e4 !important;
  color: black;
}
.depth-6 {
  background-color: #ebedf4 !important;
  color: black;
}
.el-table .cell {
  word-break: normal;
  overflow: unset;
  text-overflow: unset;
}
</style>
