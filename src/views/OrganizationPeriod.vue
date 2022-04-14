<template>
  <div class="licevoischet__page">
    <div v-loading="loading">
    <div class="container-fluid table_container" v-show="!loading">
      <h2 class="page__title">
        <p class="mobile_back" @click="back">
        <svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 5H3.83L7.41 1.41L6 0L0 6L6 12L7.41 10.59L3.83 7H18V5Z" fill="#32AAA7"/>
        </svg>
      </p>
        {{$t("Организация текущего периода")}}
        </h2>
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
      <p class="exp_print mt-3">
        <!-- <span class="mr-3">Печать</span> -->
        <span class="mr-3" @click="downloadPdf">
          {{$t("Экспорт в pdf")}}
        </span>
        <span class="mr-3" @click="downloadXls">
          {{$t("Экспорт в xlsx")}}
        </span>
      </p>
      <div class="orgper">
        <el-table
        :key="tree_key"
        :data="rows"
        style="width: 100%"
        row-key="id"
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
        <span v-if="column.property === 'name'">
          <router-link :to="`/agent/${scope.row.id}`">{{scope.row.name}}</router-link>
        </span>
        <span v-else-if="column.property === 'rank_end'">
          <!-- <img
          :src="`../icons/${scope.row.rank_end}${scope.row.depth === 0 ? '_white' : ''}.svg`"
          :title="scope.row.rank_end" class="rank_icon mr-3"> -->
          <span>{{scope.row.rank_end}}</span>
        </span>
        <span v-else-if="column.property === 'depth'">
          <span>{{scope.row.depth}}</span>
        </span>
        <span v-else>{{ column.formater(scope.row)}}</span>
      </template>
        </el-table-column>
      </el-table>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import backApi from '../assets/backApi';

export default {
  name: 'OrganizationPeriod',
  components: {},
  data() {
    const rows = [];
    const columns = [
      // {
      //   property: 'has_children',
      //   title: 'Уровень',
      //   formater: (item) => `${item.depth} УР`,
      // },
      {
        property: 'depth',
        title: this.$t('Глубина'),
        sortable: true,
        formater: (item) => item.depth,
      },
      {
        property: 'id',
        title: this.$t('Номер партнера'),
        sortable: true,
        formater: (item) => item.id,
      },
      {
        property: 'name',
        title: this.$t('ФИО'),
        sortable: true,
        formater: (item) => item.name,
      },
      {
        property: 'lo',
        title: this.$t('ЛО'),
        sortable: true,
        formater: (item) => item.lo,
      },
      {
        property: 'ngo',
        title: this.$t('НГО'),
        sortable: true,
        formater: (item) => item.ngo,
      },
      {
        property: 'rank_end',
        title: this.$t('Ранг'),
        formater: (item) => item.rank_end,
      },
    ];
    return {
      loading: true,
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
  metaInfo() {
    return {
      title: `${this.$t('ЛК Партнера')} - ${this.$t('Организация текущего периода')}`,
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
    }).then(() => {
      this.loading = false;
    });
  },
  computed: {},
  methods: {
    downloadXls() {
      backApi.get('/agents-tree-hist/excel',
        {
          params:
          {
            period: this.currentPeriod,
            agent_id: this.agent_id,
            filter: this.tree_type,
            get_root: true,
          },
          responseType: 'blob',
        })
        .then(({ data }) => {
          const filename = `${this.$t('Организация текущего периода')}.xlsx`;
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
      backApi.get('/agents-tree-hist/pdf',
        {
          params:
          {
            period: this.currentPeriod,
            agent_id: this.agent_id,
            filter: this.tree_type,
            get_root: true,
          },
          responseType: 'blob',
        })
        .then(({ data }) => {
          const filename = `${this.$t('Организация текущего периода')}.pdf`;
          const url = window.URL.createObjectURL(new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', filename);
          document.body.appendChild(link);
          link.click();
          link.remove();
        });
    },
    back() {
      const navEl = document.getElementsByClassName('router-link-exact-active router-link-active');
      $(navEl[0])
        .parent()
        .parent()
        .siblings()
        .addClass('active');
    },
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
.rank_icon{
  width: 25px;
  margin-left: 10px;
}
.rank_icon{
  width: 25px;
  margin-left: 10px;
}
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
  & .organization__modal {
    //   position: absolute;
    padding: 60px;
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
@media (min-width: 760px) {
  .radio{
    display: inline;
  }
}
</style>
<style>
.el-table__indent {
  padding-left: 0 !important;
}
.el-table__expand-icon > .el-icon-arrow-right {
        color: white;
        left: 0;
      }
/* .depth-0{
  background-color: #32AAA7 !important;
  color: white;
}
.depth-1{
  background-color: #AED9D8 !important;
  color: black;
}
.depth-2{
  background-color: #B5CCE2 !important;
  color: black;
}
.depth-3{
  background-color: #C1D5E9 !important;
  color: black;
}
.depth-4{
  background-color: #BEBEBE !important;
  color: black;
}
.depth-5{
  background-color: #C4C5C6 !important;
  color: black;
}
.depth-6{
  background-color: #CECFD0 !important;
  color: black;
} */
.el-table{
  font-weight: 500;
}
.el-table th{
  background-color: #DEE2F3 !important;
  color: black;
}
.orgper .el-table tr td:nth-of-type(1){
  border-right: 1px solid #9A9A9A;
}
.orgper .el-table td, .el-table th.is-leaf{
  border-bottom: 1px solid #9A9A9A;
}
a{
  color: black;
}
.depth-0 a{
  color: white;
}
a:hover{
  color: unset;
  text-decoration: none;
}
</style>
