<template>
  <div class="licevoischet__page">
    <div  v-loading="loading">
    <div class="container-fluid table_container" v-show="!loading">
      <h2 class="page__title">
                              <p class="mobile_back" @click="back">
        <svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 5H3.83L7.41 1.41L6 0L0 6L6 12L7.41 10.59L3.83 7H18V5Z" fill="#32AAA7"/>
        </svg>
      </p>
        История организации по периодам
        </h2>
        <div class="row mb-1">
          <div class="col-md-6">
          <el-autocomplete
            v-model="state"
            :fetch-suggestions="querySearchAsync"
            placeholder="Партнер получатель"
            clearable
            @clear="dd"
            @change="gg"
            @select="handleSelect"
            style="width: 100%"
          ></el-autocomplete>
          </div>
        </div>
        <div class="col search__btn mobile" @click="toggleSearch">
          Настройки дерева <span class="search_icons mobi"></span>
        </div>
        <div class="perioad__picker mb-3 mt-3">
        <BasePeriodPicker :currentPeriod="currentPeriod"
        v-on:next-period="nextPeriod" class="period_picker"/>
        </div>
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
        <span class="mr-3" @click="downloadPdf">Экспорт в pdf</span>
        <span class="mr-3" @click="downloadXls">Экспорт в xlsx</span>
        <span class="mr-3" v-b-modal.modal-scrollable>Легенда</span>
      </p>
      <div class="orgbyhist">
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
          :min-width="col_width(column)"
        >
          <!--  -->
          <template slot="header" v-if="column.property === 'id' && !colHide">
             <div class="idBlock" ref="idBlock">
               {{column.label}}
             </div>
             <span class="hide_arrow" @click="toogleColumn()" ref="hideBtn"></span>
          </template>
          <template v-else slot="header">
            {{column.label}}
          </template>
          <template slot-scope="scope">
            <span v-if="column.property === 'id'">
              <div v-if="!colHide" style="display: inline">
              <span>{{scope.row.depth}} УР</span>
              <span class="user_id">{{ scope.row.id }}</span><br />
              </div>
              <div v-else style="text-align: center; margin-top: -25px;">
              <img
              style="margin-left: 10px;"
              :src="`../icons/${scope.row.rank_calc}${scope.row.depth === 0 ? '_white' : ''}.svg`"
              :title="scope.row.rank_end" class="rank_icon">
              <span style="display: block; margin-left: 10px;">{{scope.row.depth}} УР</span>
              </div>
            </span>
            <span v-if="column.property === 'name'">
              {{scope.row.name}}
            </span>
            <span v-if="column.property === 'lo'">
              {{column.formater(scope.row)}}
            </span>
            <span v-if="column.property === 'go'">
              {{column.formater(scope.row)}}
            </span>
            <span v-if="column.property === 'ngo'">
              {{column.formater(scope.row)}}
            </span>
            <span v-if="column.property === 'oo'">
              {{column.formater(scope.row)}}
            </span>
            <span v-if="column.property === 'ko'">
              {{column.formater(scope.row)}}
            </span>
            <span v-if="column.property === 'noact'">
              {{scope.row.noact}}
            </span>
            <span v-if="column.property === 'rank_beg'">
              <img
              :src="`../icons/${scope.row.rank_beg}${scope.row.depth === 0 ? '_white' : ''}.svg`"
              :title="scope.row.rank_beg" class="rank_icon_rank">
              {{scope.row.rank_beg}}
            </span>
            <span v-if="column.property === 'rank_calc'">
              <img
              :src="`../icons/${scope.row.rank_calc}${scope.row.depth === 0 ? '_white' : ''}.svg`"
              :title="scope.row.rank_calc" class="rank_icon_rank">
              {{scope.row.rank_calc}}
            </span>
            <span v-if="column.property === 'rank_end'">
              <img
              :src="`../icons/${scope.row.rank_end}${scope.row.depth === 0 ? '_white' : ''}.svg`"
              :title="scope.row.rank_end" class="rank_icon_rank">
              {{scope.row.rank_end}}
            </span>
          </template>
        </el-table-column>
      </el-table>
      </div>
      <footer class="cust_modal">
              <div class="row">
        <div class="col text-center search__btn desktop" @click="toggleSearch" v-if="!searchActive">
          Настройки дерева <span class="search_icons"></span>
        </div>
      </div>
      <div v-if="searchActive" class="organization__modal">
        <div class="container">
          <h3 class="mb-3">
            Настройки дерева
            <span class="close_btn" @click="searchActive = !searchActive"></span>
            </h3>
        <div class="row">
          <div class="col-md-12 mt-3">
            <b-form-group label="Выбор дерева">
              <b-form-radio
                v-model="tree_type"
                name="some-radios-1"
                value="full"
                class="radio mr-3"
                >Полное дерево</b-form-radio
              >
              <b-form-radio
                v-model="tree_type"
                name="some-radios-1"
                value="director"
                class="radio mr-3"
                >Директорское</b-form-radio
              >
              <b-form-radio v-model="tree_type" name="some-radios-1" value="active" class="radio"
                >Своя группа</b-form-radio
              >
            </b-form-group>
          </div>
        </div>
        <div class="row mt-3 edit">
          <div class="col-sm-6 mb-4">
            <span v-if="state2" class="custom_label">Построить дерево для партнера</span>
          <el-autocomplete
            v-model="state2"
            :fetch-suggestions="querySearchAsync2"
            placeholder="Построить дерево для партнера"
            clearable
            @clear="dd2"
            @change="gg2"
            @select="handleSelect2"
            style='width: 100%'
          ></el-autocomplete>
          </div>
          <div class="col-sm-6">
            <button
            class="mr-2"
            @click="updateData">Показать</button
            ><button @click="clearSelectedFilters">Сбросить</button>
          </div>
        </div>
        </div>
      </div>
      </footer>
    </div>
    </div>
  <b-modal v-model="show"
  id="modal-scrollable" centered scrollable title="Легенда">
    <div class="modal_icons">
      <img :src="`../icons/Клиент.svg`"
      class="rank_icon_legend"> <span>Привилегированный клиент</span></div> <br>
    <div class="modal_icons">
      <img :src="`../icons/Консультант.svg`"
      class="rank_icon_legend"> <span>Консультант</span></div><br>
    <div class="modal_icons">
      <img :src="`../icons/Мастер.svg`"
      class="rank_icon_legend"><span>Мастер</span></div><br>
    <div class="modal_icons">
      <img :src="`../icons/Управляющий.svg`"
      class="rank_icon_legend"><span>Управляющий</span></div><br><br>
    <div class="modal_icons">
      <img :src="`../icons/Директор.svg`" class="rank_icon_legend"><span>Директор</span></div><br>
    <div class="modal_icons"><img :src="`../icons/Серебряный Директор.svg`"
    class="rank_icon_legend">
    <span>Серебряный Директор</span></div><br>
    <div class="modal_icons"><img :src="`../icons/Золотой Директор.svg`"
    class="rank_icon_legend">
    <span>Золотой Директор</span></div><br><br>
    <div class="modal_icons"><img :src="`../icons/Рубиновый Директор.svg`" class="rank_icon_legend">
    <span>Рубиновый Директор</span></div><br>
    <div class="modal_icons"><img :src="`../icons/Бриллиантовый Директор.svg`"
    class="rank_icon_legend">
    <span>Бриллиантовый Директор</span></div><br>
    <div class="modal_icons">
      <img :src="`../icons/Президент_1.svg`"
      class="rank_icon_legend"><span>Президент</span></div><br>
    <template #modal-footer>
          <b-button
            variant="primary"
            size="sm"
            class="float-right cls_btn"
            @click="show=false"
          >
            Закрыть
          </b-button>
    </template>
  </b-modal>
  </div>
</template>

<script>
/* eslint-disable quote-props */
import $ from 'jquery';
import backApi from '../assets/backApi';
import BasePeriodPicker from '../components/BasePeriodPicker.vue';

export default {
  name: 'OrganizationByPeriod',
  components: {
    BasePeriodPicker,
  },
  data() {
    const rows = [];
    const columns = [
      {
        property: 'id',
        label: 'P/номер / Ранг / ФИО',
        formater: (item) => `УР ${item.depth}<br>${item.rank_beg}<br>${item.id}<br>${item.name}`,
      },
      {
        property: 'name',
        label: 'ФИО',
      },
      {
        property: 'lo',
        label: 'ЛО',
        formater: (item) => {
          const formatter = new Intl.NumberFormat('ru');
          return formatter.format(item.lo);
        },
      },
      {
        property: 'go',
        label: 'ГО',
        formater: (item) => {
          const formatter = new Intl.NumberFormat('ru');
          return formatter.format(item.go);
        },
      },
      {
        property: 'ngo',
        label: 'НГО',
        formater: (item) => {
          const formatter = new Intl.NumberFormat('ru');
          return formatter.format(item.ngo);
        },
      },
      {
        property: 'oo',
        label: 'ОО',
        formater: (item) => {
          const formatter = new Intl.NumberFormat('ru');
          return formatter.format(item.oo);
        },
      },
      {
        property: 'ko',
        label: 'КО',
        formater: (item) => {
          const formatter = new Intl.NumberFormat('ru');
          return formatter.format(item.ko);
        },
      },
      {
        property: 'noact',
        label: 'Неактивность',
        formater: (item) => item.noact,
      },
      {
        property: 'rank_beg',
        label: 'Ранг на начало',
        formater: (item) => item.rank_beg,
      },
      {
        property: 'rank_calc',
        label: 'Расчетный ранг',
        formater: (item) => item.rank_calc,
      },
      // {
      //   property: 'rank_end',
      //   title: 'Расчетный ранг',
      //   formater: (item) => item.rank_end,
      // },
      {
        property: 'rank_end',
        label: 'Ранг на конец',
        formater: (item) => item.rank_end,
      },
    ];
    return {
      show: false,
      colHide: false,
      loading: true,
      loading2: true,
      state: '',
      state2: '',
      searchActive: false,
      months: ['Январь', 'Ферваль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Августь', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
      tree_type: 'full',
      currentUserID: null,
      modal_agent: {
        agent_id: '',
        name: '',
      },
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
      }).then(() => {
        setTimeout(() => {
          this.loading = false;
        });
      });
    });
    backApi.get('/agent/profile').then((Response) => {
      this.state = `${Response.data.id} - ${Response.data.name}`;
      this.currentUserID = Response.data.id;
      this.currentUserIDName = { id: Response.data.id, agentname: Response.data.name };
    });
    this.tags.push({ name: 'Полное дерево', key: 'tree_type' });
  },
  computed: {
    disabled() {
      if (this.agent_id !== null && this.agent_id !== '') {
        return false;
      }
      return true;
    },
    currentPeriod() {
      try {
        return this.periods[this.periodIndex].comdte;
      } catch (e) {
        return '';
      }
    },
  },
  watch: {
    currentPeriod(v) {
      const data = {
        params: {
          filter: this.tree_type,
          get_root: true,
          period: v,
          // agent_id: this.currentUserID,
          agent_id: this.modal_agent.agent_id !== '' ? this.modal_agent.agent_id : this.currentUserID,
        },
      };
      backApi.get('/agents-tree-hist/period', data).then((response) => {
        this.rows = response.data.entries;
        this.rows.forEach((e) => {
          e.depth = 0;
          e.children = [];
        });
      });
      this.tree_key += 1;
    },
  },
  methods: {
    toogleColumn() {
      this.colHide = !this.colHide;
      if (this.$refs.hideBtn[0].classList.contains('hide')) {
        this.$refs.hideBtn[0].classList.remove('hide');
        this.$refs.idBlock[0].classList.remove('hide');
      } else {
        this.$refs.hideBtn[0].classList.add('hide');
        this.$refs.idBlock[0].classList.add('hide');
        this.columns[0].label = '';
      }
    },
    gg() {
      this.state = `${this.currentUserIDName.id}-${this.currentUserIDName.agentname}`;
    },
    gg2() {
      this.state2 = `${this.modal_agent.agent_id}-${this.modal_agent.name}`;
    },
    dd() {
      // this.loading = true;
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
      backApi.get('/agent/profile').then((Response) => {
        this.state = `${Response.data.id} - ${Response.data.name}`;
        this.currentUserID = Response.data.id;
        this.currentUserIDName = { id: Response.data.id, agentname: Response.data.name };
      });
    },
    dd2() {
      // this.loading = true;
      const data = {
        params: {
          filter: this.tree_type,
          get_root: true,
          period: this.currentPeriod,
          agent_id: this.currentUserID,
        },
      };
      backApi.get('/agents-tree-hist/period', data).then((response) => {
        this.rows = response.data.entries;
        this.rows.forEach((e) => {
          e.depth = 0;
          e.children = [];
        });
      });
      this.modal_agent_id = null;
      this.state2 = '';
    },
    querySearchAsync(queryString, cb) {
      // const qr = queryString === '' ? 'а' : queryString;
      backApi.get('/agent/share-transfert-list', { params: { show_root: 1 } }).then((Response2) => {
        // eslint-disable-next-line no-param-reassign
        // Response.data.agentname = Response.data.name;
        // // Response2.data.entries.push
        // Response2.data.entries.push(Response.data);
        Response2.data.entries.forEach((u) => {
          // eslint-disable-next-line no-param-reassign
          u.value = `${u.id}-${u.agentname}`;
        });
        cb(Response2.data.entries.slice(0, 10));
      });
    },
    handleSelect(item) {
      // this.selectedUser = item.agent_id;
      const data = {
        params: {
          filter: this.tree_type,
          get_root: true,
          period: this.currentPeriod,
          agent_id: item.id,
        },
      };
      backApi.get('/agents-tree-hist/period', data).then((response) => {
        this.rows = response.data.entries;
        this.rows.forEach((e) => {
          e.depth = 0;
          e.children = [];
        });
      });
      this.currentUserID = item.id;
      this.currentUserIDName = item;
      console.log(this.currentUserIDName);
    },
    querySearchAsync2(queryString, cb) {
      const qr = queryString === '' ? 'а' : queryString;
      const valueDict = {
        active: 2,
        full: 0,
        director: 1,
      };
      const data = {
        params: {
          agent_root: this.currentUserID,
          find_str: qr,
          tree_type: valueDict[this.tree_type],
          comdte: this.currentPeriod,
        },
      };
      backApi.get('/agent/tree-agents-list', data).then((Response2) => {
        Response2.data.entries.forEach((u) => {
          // eslint-disable-next-line no-param-reassign
          u.value = `${u.agent_id}-${u.name}`;
        });
        cb(Response2.data.entries.slice(0, 10));
      });
    },
    handleSelect2(item) {
      // this.selectedUser = item.agent_id;
      const data = {
        params: {
          filter: this.tree_type,
          get_root: true,
          period: this.currentPeriod,
          agent_id: item.id,
        },
      };
      backApi.get('/agents-tree-hist/period', data).then((response) => {
        this.rows = response.data.entries;
        this.rows.forEach((e) => {
          e.depth = 0;
          e.children = [];
        });
      });
      this.modal_agent = item;
      console.log(this.modal_agent);
    },
    clearAgentId() {
      this.agent_id = null;
    },
    downloadXls() {
      backApi.get('/agents-tree-hist/period/excel',
        {
          params:
          {
            agent_id: this.modal_agent.agent_id !== '' ? this.modal_agent.agent_id : null,
            period: this.currentPeriod,
            filter: this.tree_type,
            get_root: true,
            context: this.currentUserID,
          },
          responseType: 'blob',
        })
        .then(({ data }) => {
          const filename = 'История организации по периодам.xlsx';
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
      backApi.get('/agents-tree-hist/period/pdf',
        {
          params:
          {
            agent_id: this.modal_agent.agent_id !== '' ? this.modal_agent.agent_id : null,
            period: this.currentPeriod,
            filter: this.tree_type,
            get_root: true,
            context: this.currentUserID,
          },
          responseType: 'blob',
        })
        .then(({ data }) => {
          const filename = 'История организации по периодам.pdf';
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
    col_width(col) {
      if (col.property === 'id') {
        if (this.colHide) {
          return 70;
        }
        return 100;
      } if (col.property === 'name') {
        return 100;
      } if (col.property === 'lo' || col.property === 'lo' || col.property === 'go' || col.property === 'ngo' || col.property === 'oo' || col.property === 'ko') {
        return 50;
      } if (col.property === 'noact') {
        return 50;
      }
      return 0;
    },
    tableRowClassName({ row }) {
      return `depth-${row.depth}`;
    },
    handleClose(event, tag) {
      // this.tags.splice(this.dynamicTags.indexOf(tag), 1);
      this.tags.splice(this.tags.indexOf(tag), 1);
      if (tag.key === 'tree_type') {
        this.tree_type = 'full';
      }
      if (tag.key === 'modal_agent_id') {
        this.modal_agent.agent_id = null;
        this.state2 = '';
      }
      this.updateData();
    },
    load(tree, treeNode, resolve) {
      const data = {
        params: {
          agent_id: tree.id,
          filter: this.tree_type,
          get_root: false,
          period: this.currentPeriod,
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
          agent_id: this.modal_agent.agent_id !== '' ? this.modal_agent.agent_id : this.currentUserID,
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
        } else {
          this.tags.push({ name: treeName, key: 'tree_type' });
        }
      }
      if (this.modal_agent.agent_id !== null && this.modal_agent.agent_id !== '') {
        const tag = this.tags.find((t) => t.key === 'modal_agent_id');
        if (tag) {
          tag.name = `${this.modal_agent.agent_id} - ${this.modal_agent.name}`;
        } else {
          this.tags.push({ name: `${this.modal_agent.agent_id} - ${this.modal_agent.name}`, key: 'modal_agent_id' });
        }
        // data.params.modal_agent_id = this.modal_agent.agent_id;
      }
      this.searchActive = false;
      backApi.get('/agents-tree-hist/period', data).then((response) => {
        this.rows = response.data.entries;
        this.rows.forEach((e) => {
          e.depth = 0;
          e.children = [];
        });
      });
      this.tree_key += 1;
    },
    nextPeriod(x) {
      this.period_enabled = true;
      this.periodIndex = (this.periodIndex + this.periods.length + x) % this.periods.length;
    },
  },
};
</script>

<style lang="scss" scoped>
.idBlock.hide{
  display: none;
}
.cls_btn{
  background-color: #32aaa7;
  border: 0;
}
.modal_icons{
  font-size: 0;
  display: flex;
  align-items: center;
  & > img{
    position: relative;
    top: 2px;
  }
  & > span{
    font-size: 16px;
  }
}
.hide_arrow{
  display: none;
}
.search_icons{
  position: relative;
  top: 5px;
  display: inline-block;
  width: 24px !important;
  height: 24px;
  background-image: url('../../public/icons/search.svg');
  background-size: contain;
  &.mobi{
    position: absolute;
    top: 20px;
    right: 15px;
  }
}
.mobile{
  display: none;
  margin-bottom: 20px;
}
span[class*="el-tag"] deep i{
  display: none;
}
.date_picker_comp{
  position: relative;
  /* display: inline-block; */
}
.date_show{
  /* position: relative; */
  margin-left: 45px;
  min-width: 120px;
  display: inline-block;
  text-align: center;
}
.arrow_left,
.arrow_right{
  position: absolute;
  display: inline;
  background-repeat: no-repeat;
  /* background-size: contain; */
  background-position: center;
  width: 12px;
  height: 12px;
  top: 5px;
  cursor: pointer;
}
.arrow_left{
    background-image: url('../assets/imgs/arrow_left.svg');
    left: 0px;
}
.arrow_right{
    background-image: url('../assets/imgs/arrow_right.svg');
    left: 190px;
}
@media (min-width: 770px) {
  .radio{
    display: inline;
  }
}
@media (max-width: 770px) {
  .mobile{
    display: block;
    padding-left: 0;
  }
  .desktop{
    display: none;
  }
}
@media (max-width: 575px) {
.hide_arrow{
  position: absolute;
  right: 10px;
  top: 2px;
  height: 20px;
  width: 20px;
  display: inline-block;
  background-image: url('../../public/icons/vector.svg');
  background-size: contain;
  background-repeat: no-repeat;
  cursor: pointer;
  transform: rotate(-180deg);
  &.hide{
    transform: rotate(0deg);
    left: 50%;
    top: 60%;
    transform: translate(-50%, -0%);
  }
}
  .date_picker_comp{
    & > div{
      display: flex;
      position: relative;
      justify-content: center;
      & i{
        position: static;
        margin-top: 5px;
        &:nth-of-type(1){
          margin-right: 20px;
        }
        &:nth-of-type(2){
          margin-left: 20px;
        }
      }
    }
  }
}
.close_btn{
  right: 10px;
  top: 10px;
}
.rank_icon{
  width: 25px;
  margin-left: 10px;
}
.rank_icon_rank{
  width: 20px;
  // margin-left: -10px;
}
.rank_icon_legend{
  width: 25px;
  margin-right: 10px;
}
.user_id{
  display: inline-block;
  float: right;
}
.user_name{
  display: inline-block;
  position: relative;
  text-align: right;
  float: right;
  padding-bottom: 0;
  margin-top: 10px;
  &::after {
      position: absolute;
      content: '';
      width: 100%;
      left: 0;
      bottom: 0;
      height: 2px;
      border-bottom: 1px dotted black;
  }
}
.depth-0 .user_name::after{
      position: absolute;
      content: '';
      width: 100%;
      left: 0;
      bottom: 0;
      height: 2px;
      border-bottom: 1px dotted white;
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
    position: relative;
    padding-top: 30px;
    width: 100%;
    bottom: 0;
    & .container{
      position: relative;
    }
    & .edit {
      button {
        width: 48%;
        border: 0;
        padding: 5px 30px;
        font-size: 16px;
        &.disabled{
          color: #9A9A9A;
          background-color: #DEE2F3;
        }
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
.el-table__header-wrapper{
  background: #DEE2F3 !important;
}
button.close{
  color: #32aaa7;
  opacity: 1;
}
button.close:hover{
  color: #32aaa7;
  opacity: 1;
}
.modal-dialog-centered.modal-dialog-scrollable .modal-content{
  max-height: calc(100vh - 5rem) !important;
}
.el-table__expand-icon > .el-icon-arrow-right {
        color: white;
        left: 0;
      }
.el-table__indent {
  /* padding-left: 0 !important; */
}
.el-table{
  font-weight: 500;
}
.el-table th{
  background-color: #DEE2F3 !important;
  color: black;
}
.orgbyhist .el-table tr td:nth-of-type(1){
  border-right: 1px solid #9A9A9A;
}
.orgbyhist{
  /* border: 1px solid #BABABA; */
}
.orgbyhist .el-table td, .el-table th.is-leaf{
  border-bottom: 1px solid #9A9A9A;
}
.el-table th.is-leaf:nth-of-type(1){
  border-bottom: 1px solid #9A9A9A;
  border-right: 1px solid #9A9A9A;
}
.depth-0 {
  background-color: #32aaa7 !important;
  color: white;
}
.orgbyhist .depth-1 {
  background-color: #AED9D8 !important;
  color: black;
}
.orgbyhist .depth-2 {
  background-color: #B5CCE2 !important;
  color: black;
}
.orgbyhist .depth-3 {
  background-color: #C1D5E9 !important;
  color: black;
}
.orgbyhist .depth-4 {
  background-color: #BEBEBE !important;
  color: black;
}
.orgbyhist .depth-5 {
  background-color: #C4C5C6 !important;
  color: black;
}
.orgbyhist .depth-6 {
  background-color: #CECFD0 !important;
  color: black;
}
.orgbyhist .depth-7 {
  background-color: #D4D5D7 !important;
  color: black;
}
.orgbyhist .depth-8 {
  background-color: #E3E3E4 !important;
  color: black;
}
.orgbyhist .depth-9 {
  background-color: #EBEDF4 !important;
  color: black;
}
.el-table .cell {
  word-break: normal;
  overflow: unset;
  text-overflow: unset;
}
.el-table__body tr.hover-row.current-row>td,
.el-table__body tr.hover-row.el-table__row--striped.current-row>td,
.el-table__body tr.hover-row.el-table__row--striped>td,
.el-table__body tr.hover-row>td{
  background-color: unset;
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
