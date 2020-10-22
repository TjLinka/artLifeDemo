<template>
  <div class="licevoischet__page">
    <div class="container">
      <h2 class="page__title">Организация текущего периода</h2>
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
        >
      <template slot-scope="scope">
        {{ column.formater(scope.row)}}
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
              <b-form-radio
                v-model="tree_type"
                name="some-radios-1"
                value="active"
                class="d-inline"
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
  name: 'PointsHistory',
  components: {},
  data() {
    const rows = [];
    const columns = [
      {
        property: 'has_children',
        title: 'Уровень',
        formater: (item) => `${item.depth} УР`,
      },
      {
        property: 'id',
        title: 'Р/Номер',
        formater: (item) => item.id,
      },
      {
        has_children: 'name',
        title: 'ФИО',
        formater: (item) => item.name,
      },
      {
        property: 'rank_end',
        title: 'Ранг',
        formater: (item) => item.rank_end,
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
    };
  },
  mounted() {
    const data = { params: { filter: this.tree_type, get_root: true } };
    backApi.get('/agents-tree-hist', data).then((response) => {
      this.rows = response.data.entries;
      this.rows.forEach((e) => {
        e.depth = 0;
        e.children = [];
      });
    });
  },
  computed: {},
  methods: {
    tableRowClassName({ row }) {
      return `depth-${row.depth}`;
    },
    handleClose(event, tag) {
      this.tags.splice(this.tags.indexOf(tag), 1);
      if (tag.key === 'tree_type') {
        this.tree_type = null;
        this.updateData();
      } else if (tag.key === 'agent_id') {
        this.agent_id = null;
        this.updateData();
      }
    },
    load(tree, treeNode, resolve) {
      const data = {
        params: {
          agent_id: tree.id,
          filter: this.tree_type === null ? 'full' : this.tree_type,
          get_root: false,
        },
      };
      backApi.get('/agents-tree-hist', data).then((Response) => {
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
      backApi.get('/agents-tree-hist', data).then((Response) => {
        this.rows = Response.data.entries;
        this.rows.forEach((e) => {
          e.depth = 0;
        });
      });
      this.searchActive = !this.searchActive;
    },
    updateData() {
      const data = { params: { filter: this.tree_type === null ? 'full' : this.tree_type, get_root: true } };
      const treeNameTranslate = { active: 'Своя группа', full: 'Полное дерево', director: 'Директорское' };
      if (this.tree_type !== null) {
        const treeName = treeNameTranslate[this.tree_type];
        const tag = this.tags.find((t) => t.key === 'tree_type');
        if (tag) {
          tag.name = treeName;
        } else {
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
      this.searchActive = !this.searchActive;
      backApi.get('/agents-tree-hist', data).then((response) => {
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
.el-icon-arrow-right{
  color: white;
}
.depth-0{
  background-color: #32AAA7 !important;
  color: white;
}
.depth-1{
  background-color: #BEBEBE !important;
  color: black;
}
.depth-2{
  background-color: #C4C5C6 !important;
  color: black;
}
.depth-3{
  background-color: #CECFD0 !important;
  color: black;
}
.depth-4{
  background-color: #D4D5D7 !important;
  color: black;
}
.depth-5{
  background-color: #E3E3E4 !important;
  color: black;
}
.depth-6{
  background-color: #EBEDF4 !important;
  color: black;
}
</style>
