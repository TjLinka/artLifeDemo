<template>
  <div class="licevoischet__page">
    <div v-loading="loading">
      <div class="container-fluid table_container" v-show="!loading">
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
        <!-- <div class="col search__btn mobile noprint" @click="toggleSearch">
          {{ $t('Настройки дерева') }} <span class="search_icons mobi"></span>
        </div> -->
        <div class="perioad__picker mt-3">
          <BasePeriodPicker
            :currentPeriod="currentPeriod"
            v-on:next-period="nextPeriod"
            class="period_picker"
          />
        </div>
        <b-row align-v="center" class="row">
          <div class="col-3 mt-3">
            <b-form-group :label="`${$t('Выбор дерева')}`">
              <b-form-radio
                v-model="tree_type"
                name="some-radios-1"
                value="full"
                class="radio mr-3"
                inline
                >{{ $t('Полное дерево') }}</b-form-radio
              >
              <b-form-radio
                v-model="tree_type"
                name="some-radios-1"
                value="compres"
                class="radio mr-3"
                inline
                >{{ $t('С компресией по неактивным') }}</b-form-radio
              >
            </b-form-group>
          </div>
        </b-row>
        <!-- <div class="noprint">
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
        </div> -->
        <p class="exp_print noprint">
          <span class="mr-3" @click="downloadPdf">{{ $t('Экспорт в pdf') }}</span>
          <span class="mr-3" @click="downloadXls">{{ $t('Экспорт в xlsx') }}</span>
          <span class="mr-3" v-b-modal.modal-scrollable>{{ $t('Легенда') }}</span>
        </p>
        <div class="row" v-show="structureOpenHistory.length">
          <div class="col-1">
            <span @click="goBackStructure" style="cursor: pointer">Назад</span>
          </div>
          <div class="col">Контекст раскрытой структуры : {{structureOpenContext}}</div>
        </div>
        <div class="orgbyhist">
          <el-table
            :key="tree_key"
            :data="rows"
            style="width: 100%"
            height="60vh"
            row-key="id"
            header-row-class-name="wwwww"
            :row-class-name="tableRowClassName"
          >
            <el-table-column
              v-for="(column, index) in columns"
              :prop="column.property"
              :key="index"
              resizable
              :label="column.title"
              :min-width="col_width(column)"
            >
              <!--  -->
              <template slot="header" v-if="column.property === 'id' && !colHide">
                <div class="idBlock" ref="idBlock">
                  {{ column.label }}
                </div>
                <span class="hide_arrow" @click="toogleColumn()" ref="hideBtn"></span>
              </template>
              <template v-else slot="header">
                {{ column.label }}
              </template>
              <template slot-scope="scope">
                <span v-if="column.property === 'depth'">
                  <div v-if="!colHide" style="display: inline">
                    <span v-show="scope.row.has_children" @click="loadNewLevel(scope.row)" style="cursor: pointer">+</span>
                    <span style="margin-left: 7px; display: inline-block;">{{
                      scope.row.depth
                    }}</span>
                  </div>
                  <div v-else style="text-align: center; margin-top: -25px;">
                    <img
                      style="margin-left: 10px;"
                      :src="
                        `../icons/${scope.row.rank_calc}${
                          scope.row.depth === 0 ? '_white' : ''
                        }.svg`
                      "
                      :title="scope.row.rank_end"
                      class="rank_icon"
                    />
                    <span style="display: block; margin-left: 10px;">{{ scope.row.depth }} УР</span>
                  </div>
                </span>
                <span v-if="column.property === 'name'">
                  {{ scope.row.name }}
                </span>
                <span v-if="column.property === 'id'">
                  {{ scope.row.id }}
                </span>
                <span v-if="column.property === 'lo'">
                  {{ column.formater(scope.row) }}
                </span>
                <span v-if="column.property === 'go'">
                  {{ column.formater(scope.row) }}
                </span>
                <span v-if="column.property === 'ngo'">
                  {{ column.formater(scope.row) }}
                </span>
                <span v-if="column.property === 'so'">
                  {{ column.formater(scope.row) }}
                </span>
                <span v-if="column.property === 'ko'">
                  {{ column.formater(scope.row) }}
                </span>
                <span v-if="column.property === 'noact'">
                  {{ scope.row.noact }}
                </span>
                <span v-if="column.property === 'rankname'">
                  <!-- <img
                    :src="
                      `../icons/${scope.row.rank_beg}${scope.row.depth === 0 ? '_white' : ''}.svg`
                    "
                    :title="scope.row.rank_beg"
                    class="rank_icon_rank"
                  /> -->
                  {{ scope.row.rankname }}
                </span>
                <span v-if="column.property === 'rank_calc'">
                  <img
                    :src="
                      `../icons/${scope.row.rank_calc}${scope.row.depth === 0 ? '_white' : ''}.svg`
                    "
                    :title="scope.row.rank_calc"
                    class="rank_icon_rank"
                  />
                  {{ scope.row.rank_calc }}
                </span>
                <span v-if="column.property === 'rank_end'">
                  <img
                    :src="
                      `../icons/${scope.row.rank_end}${scope.row.depth === 0 ? '_white' : ''}.svg`
                    "
                    :title="scope.row.rank_end"
                    class="rank_icon_rank"
                  />
                  {{ scope.row.rank_end }}
                </span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <b-modal v-model="show" id="modal-scrollable" centered scrollable title="Легенда">
      <div class="modal_icons">
        <img :src="`../icons/Клиент.svg`" class="rank_icon_legend" />
        <span>{{ $t('Привилегированный клиент') }}</span>
      </div>
      <br />
      <div class="modal_icons">
        <img :src="`../icons/Консультант.svg`" class="rank_icon_legend" />
        <span>{{ $t('Консультант') }}</span>
      </div>
      <br />
      <div class="modal_icons">
        <img :src="`../icons/Мастер.svg`" class="rank_icon_legend" /><span>{{ $t('Мастер') }}</span>
      </div>
      <br />
      <div class="modal_icons">
        <img :src="`../icons/Управляющий.svg`" class="rank_icon_legend" /><span>{{
          $t('Управляющий')
        }}</span>
      </div>
      <br /><br />
      <div class="modal_icons">
        <img :src="`../icons/Директор.svg`" class="rank_icon_legend" /><span>{{
          $t('Директор')
        }}</span>
      </div>
      <br />
      <div class="modal_icons">
        <img :src="`../icons/Серебряный Директор.svg`" class="rank_icon_legend" />
        <span>{{ $t('Серебряный Директор') }}</span>
      </div>
      <br />
      <div class="modal_icons">
        <img :src="`../icons/Золотой Директор.svg`" class="rank_icon_legend" />
        <span>{{ $t('Золотой Директор') }}</span>
      </div>
      <br /><br />
      <div class="modal_icons">
        <img :src="`../icons/Рубиновый Директор.svg`" class="rank_icon_legend" />
        <span>{{ $t('Рубиновый Директор') }}</span>
      </div>
      <br />
      <div class="modal_icons">
        <img :src="`../icons/Бриллиантовый Директор.svg`" class="rank_icon_legend" />
        <span>{{ $t('Бриллиантовый Директор') }}</span>
      </div>
      <br />
      <div class="modal_icons">
        <img :src="`../icons/Президент.svg`" class="rank_icon_legend" /><span>{{
          $t('Президент')
        }}</span>
      </div>
      <br />
      <template #modal-footer>
        <b-button variant="primary" size="sm" class="float-right cls_btn" @click="show = false">
          {{ $t('Закрыть') }}
        </b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
/* eslint-disable quote-props */
import $ from 'jquery';
import { mapActions } from 'vuex';
// import GApi from '../assets/GApi';
import BasePeriodPicker from '../components/BasePeriodPicker.vue';
import GApi from '../assets/backApi';

export default {
  name: 'OrganizationByPeriod',
  components: {
    BasePeriodPicker,
  },
  data() {
    const rows = [];
    const columns = [
      {
        property: 'depth',
        label: this.$t('Уровень'),
        formater: (item) => `УР ${item.depth}<br>${item.rank_beg}<br>${item.id}<br>${item.name}`,
      },
      {
        property: 'id',
        label: this.$t('ID'),
      },
      {
        property: 'name',
        label: this.$t('ФИО'),
      },
      {
        property: 'lo',
        label: this.$t('ЛО'),
        formater: (item) => {
          const formatter = new Intl.NumberFormat('ru');
          return formatter.format(item.lo);
        },
      },
      {
        property: 'go',
        label: this.$t('ГО'),
        formater: (item) => {
          const formatter = new Intl.NumberFormat('ru');
          return formatter.format(item.go);
        },
      },
      // {
      //   property: 'ngo',
      //   label: this.$t('НСО'),
      //   formater: (item) => {
      //     const formatter = new Intl.NumberFormat('ru');
      //     return formatter.format(item.ngo);
      //   },
      // },
      {
        property: 'so',
        label: this.$t('СО'),
        formater: (item) => {
          const formatter = new Intl.NumberFormat('ru');
          return formatter.format(item.so);
        },
      },
      // {
      //   property: 'noact',
      //   label: this.$t('Активность'),
      //   formater: (item) => item.noact,
      // },
      {
        property: 'rankname',
        label: this.$t('Ранг'),
        formater: (item) => item.rank_beg,
      },
      // {
      //   property: 'rank_end',
      //   label: this.$t('Ранг на конец'),
      //   formater: (item) => item.rank_end,
      // },
    ];
    return {
      show: false,
      structureOpenContext: null,
      colHide: false,
      loading: true,
      loading2: true,
      state: '',
      state2: '',
      searchActive: false,
      months: [
        'Январь',
        'Февраль',
        'Март',
        'Апрель',
        'Май',
        'Июнь',
        'Июль',
        'Августь',
        'Сентябрь',
        'Октябрь',
        'Ноябрь',
        'Декабрь',
      ],
      tree_type: 'full',
      currentUserID: null,
      modal_agent: {
        agent_id: '',
        name: '',
      },
      get_root: true,
      // tags: [],
      children: [],
      rows,
      columns,
      tree_key: 0,
      periods: [],
      periodIndex: 0,
      structureOpenHistory: [],
    };
  },
  metaInfo() {
    this.setPageTitle(this.$t('История организации по периодам'));
    return {
      title: `${this.$t('ЛК Партнера')} - ${this.$t('История организации по периодам')}`,
    };
  },
  mounted() {
    GApi.get('/api/Structure/get-agent-structure')
      .then((response) => {
        this.rows.forEach((e) => {
          e.depth = 0;
          e.children = [];
          e.has_children = Boolean(e.has_children);
        });
        this.rows = response.data;
      })
      .then(() => {
        setTimeout(() => {
          this.loading = false;
        });
      });
    GApi.getAllPeriods().then((Response) => {
      this.periods = Response.data.sort((a, b) => {
        const result = new Date(a.comdte) > new Date(b.comdte) ? 1 : -1;
        return result;
      });
      this.periodIndex = this.periods.length - 1;
    });
    // GApi.get('agent/bonus-detail/periods').then((Response) => {
    //   this.periods = Response.data.entries.sort((a, b) => {
    //     const result = a.comdte > b.comdte ? 1 : -1;
    //     return result;
    //   });
    //   this.periodIndex = this.periods.length - 1;
    //   const data = {
    //     params: {
    //       filter: this.tree_type,
    //       get_root: true,
    //       period: this.currentPeriod,
    //     },
    //   };
    // });
    // GApi.get('/agent/profile').then((Response) => {
    //   this.state = `${Response.data.id} - ${Response.data.name}`;
    //   this.currentUserID = Response.data.id;
    //   this.currentUserIDName = { id: Response.data.id, agentname: Response.data.name };
    // });
    // this.tags.push({ name: 'Полное дерево', key: 'tree_type' });
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
    currentPeriod() {
      const data = {
        params: {
          agentid:
            this.modal_agent.agent_id !== '' ? this.modal_agent.agent_id : this.currentUserID,
        },
      };
      GApi.get('api/Structure/get-agent-structure', data).then((response) => {
        this.rows = response.data;
        this.rows.forEach((e) => {
          e.depth = 0;
          e.children = [];
          e.has_children = Boolean(e.has_children);
        });
      });
      this.tree_key += 1;
    },
  },
  methods: {
    ...mapActions('currentPage', ['setPageTitle']),
    async goBackStructure() {
      const data = {
        params: {
          agentid: this.structureOpenHistory[this.structureOpenHistory.length - 2] ? this.structureOpenHistory[this.structureOpenHistory.length - 2].id : null,
        },
      };
      await GApi.get('/api/Structure/get-agent-structure', data)
        .then((response) => {
          response.data.forEach((e) => {
            e.depth = this.structureOpenHistory[this.structureOpenHistory.length - 2] ? this.structureOpenHistory[this.structureOpenHistory.length - 2].depth : 0;
            e.children = [];
            e.has_children = Boolean(e.has_children);
          });
          if (this.structureOpenHistory[this.structureOpenHistory.length - 2] !== undefined) {
            this.structureOpenContext = `${this.structureOpenHistory[this.structureOpenHistory.length - 2].id} - ${this.structureOpenHistory[this.structureOpenHistory.length - 2].name}`;
            response.data.shift();
          }
          if (this.structureOpenHistory[this.structureOpenHistory.length - 2] === undefined) {
            this.structureOpenContext = null;
          }
          this.rows = response.data;
        });
      this.structureOpenHistory.pop();
    },
    async loadNewLevel(row) {
      console.log(row);
      const data = {
        params: {
          agentid: row.id,
        },
      };
      this.structureOpenHistory = [...this.structureOpenHistory, row];
      this.structureOpenContext = ` ${row.id} - ${row.name}`;
      await GApi.get('/api/Structure/get-agent-structure', data).then((Response) => {
        Response.data.forEach((e) => {
          e.depth = row.depth + 1;
          e.children = [];
          e.has_children = Boolean(e.has_children);
        });
        Response.data.shift();
        this.rows = Response.data;
      });
    },
    agentCard(id) {
      GApi.get('/agent/profile/child', {
        params: {
          another_agent_id: id,
        },
      })
        .then(() => {
          this.$router.push(`/agent/${id}`);
        })
        .catch((error) => {
          this.showToast('Ошибка', error.response.data, 'danger');
        });
    },
    print() {
      const colGroup1 = document.getElementsByTagName('colgroup')[0];
      const colGroup2 = document.getElementsByTagName('colgroup')[1];
      colGroup1.style.display = 'none';
      colGroup2.style.display = 'none';
      const tableHead = document.querySelector('.el-table__header');
      const tableBody = document.querySelector('.el-table__body');
      const hashWH = tableHead.style.width;
      const hashWB = tableBody.style.width;
      console.log(hashWH, hashWB);
      tableHead.style.width = '920px';
      tableBody.style.width = '920px';
      window.print();
      setTimeout(() => {
        colGroup1.style.display = 'block';
        colGroup2.style.display = 'block';
        tableHead.style.width = hashWH;
        tableBody.style.width = hashWB;
      });
    },
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
        },
      };
      GApi.get('/api/Structure/get-agent-structure', data).then((response) => {
        this.rows = response.data;
        this.rows.forEach((e) => {
          e.depth = 0;
          e.children = [];
          e.has_children = Boolean(e.has_children);
        });
      });
      GApi.get('/agent/profile').then((Response) => {
        this.state = `${Response.data.id} - ${Response.data.name}`;
        this.currentUserID = Response.data.id;
        this.currentUserIDName = { id: Response.data.id, agentname: Response.data.name };
      });
    },
    dd2() {
      // this.loading = true;
      const data = {
        params: {
          agentid: this.currentUserID,
        },
      };
      GApi.get('/api/Structure/get-agent-structure', data).then((response) => {
        this.rows = response.data;
        this.rows.forEach((e) => {
          e.depth = 0;
          e.children = [];
          e.has_children = Boolean(e.has_children);
        });
      });
      this.modal_agent_id = null;
      this.state2 = '';
    },
    querySearchAsync(queryString, cb) {
      // const qr = queryString === '' ? 'а' : queryString;
      GApi.get('/agent/share-transfert-list', { params: { show_root: 1 } }).then((Response2) => {
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
          agentid: item.id,
        },
      };
      GApi.get('/api/Structure/get-agent-structure', data).then((response) => {
        this.rows = response.data;
        this.rows.forEach((e) => {
          e.depth = 0;
          e.children = [];
          e.has_children = Boolean(e.has_children);
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
      GApi.get('/agent/tree-agents-list', data).then((Response2) => {
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
          agentid: item.id,
        },
      };
      GApi.get('/api/Structure/get-agent-structure', data).then((response) => {
        this.rows = response.data;
        this.rows.forEach((e) => {
          e.depth = 0;
          e.children = [];
          e.has_children = Boolean(e.has_children);
        });
      });
      this.modal_agent = item;
      console.log(this.modal_agent);
    },
    clearAgentId() {
      this.agent_id = null;
    },
    downloadXls() {
      GApi.get('/agents-tree-hist/period/excel', {
        params: {
          agent_id: this.modal_agent.agent_id !== '' ? this.modal_agent.agent_id : null,
          period: this.currentPeriod,
          filter: this.tree_type,
          get_root: true,
          context: this.currentUserID,
        },
        responseType: 'blob',
      }).then(({ data }) => {
        const filename = `${this.$t('История организации по периодам')}.xlsx`;
        const url = window.URL.createObjectURL(
          new Blob([data], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          }),
        );
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        link.remove();
      });
    },
    downloadPdf() {
      GApi.get('/agents-tree-hist/period/pdf', {
        params: {
          agent_id: this.modal_agent.agent_id !== '' ? this.modal_agent.agent_id : null,
          period: this.currentPeriod,
          filter: this.tree_type,
          get_root: true,
          context: this.currentUserID,
        },
        responseType: 'blob',
      }).then(({ data }) => {
        const filename = `${this.$t('История организации по периодам')}.pdf`;
        const url = window.URL.createObjectURL(
          new Blob([data], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          }),
        );
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
      }
      if (col.property === 'name') {
        return 100;
      }
      if (
        col.property === 'lo'
        || col.property === 'lo'
        || col.property === 'go'
        || col.property === 'ngo'
        || col.property === 'so'
        || col.property === 'ko'
      ) {
        return 50;
      }
      if (col.property === 'noact') {
        return 100;
      }
      return 0;
    },
    tableRowClassName({ row }) {
      return `depth-${row.depth} printa`;
    },
    handleClose(event, tag) {
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
          agentid: tree.id,
        },
      };
      this.structureOpenHistory.push({ id: tree.id, depth: tree.depth + 1 });
      GApi.get('/api/Structure/get-agent-structure', data).then((Response) => {
        Response.data.forEach((e) => {
          e.depth = tree.depth + 1;
          e.children = [];
          e.has_children = Boolean(e.has_children);
        });
        this.rows = Response.data;
        // Response.data.shift();
        resolve([]);
      });
    },
    toggleSearch() {
      this.searchActive = !this.searchActive;
    },
    clearSelectedFilters() {
      const data = {
        params: {
          agentid: null,
        },
      };
      GApi.get('/api/Structure/get-agent-structure', data).then((Response) => {
        this.rows = Response.data;
        this.rows.forEach((e) => {
          e.depth = 0;
          e.has_children = Boolean(e.has_children);
        });
      });
      this.searchActive = !this.searchActive;
    },
    updateData() {
      const data = {
        params: {
          agentid:
            this.modal_agent.agent_id !== '' ? this.modal_agent.agent_id : this.currentUserID,
        },
      };
      // const treeNameTranslate = {
      //   active: 'Своя группа',
      //   full: 'Полное дерево',
      //   director: 'Директорское',
      // };
      // if (this.tree_type !== null) {
      //   const treeName = treeNameTranslate[this.tree_type];
      //   const tag = this.tags.find((t) => t.key === 'tree_type');
      //   if (tag) {
      //     tag.name = treeName;
      //   } else if (this.tree_type !== 'full') {
      //     this.tags.push({ name: treeName, key: 'tree_type' });
      //   } else {
      //     this.tags.push({ name: treeName, key: 'tree_type' });
      //   }
      // }
      // if (this.modal_agent.agent_id !== null && this.modal_agent.agent_id !== '') {
      //   const tag = this.tags.find((t) => t.key === 'modal_agent_id');
      //   if (tag) {
      //     tag.name = `${this.modal_agent.agent_id} - ${this.modal_agent.name}`;
      //   } else {
      //     this.tags.push({
      //       name: `${this.modal_agent.agent_id} - ${this.modal_agent.name}`,
      //       key: 'modal_agent_id',
      //     });
      //   }
      //   // data.params.modal_agent_id = this.modal_agent.agent_id;
      // }
      this.searchActive = false;
      GApi.get('/api/Structure/get-agent-structure', data).then((response) => {
        this.rows = response.data;
        this.rows.forEach((e) => {
          e.depth = 0;
          e.children = [];
          e.has_children = Boolean(e.has_children);
        });
      });
      this.tree_key += 1;
    },
    showToast(title, message, status) {
      // Use a shorter name for this.$createElement
      const h = this.$createElement;
      // Increment the toast count
      // Create the message
      const vNodesMsg = h('p', { class: ['text-center', 'mb-0'] }, [
        h('strong', { class: 'mr-2' }, message),
      ]);
      // Create the title
      const vNodesTitle = h(
        'div',
        { class: ['d-flex', 'flex-grow-1', 'align-items-baseline', 'mr-2'] },
        [h('strong', { class: 'mr-2' }, title)],
      );
      // Pass the VNodes as an array for message and title
      this.$bvToast.toast([vNodesMsg], {
        title: [vNodesTitle],
        solid: true,
        autoHideDelay: 5000,
        variant: status,
      });
    },
    nextPeriod(x) {
      this.period_enabled = true;
      this.periodIndex = (this.periodIndex + this.periods.length + x) % this.periods.length;
    },
  },
};
</script>

<style lang="scss" scoped>
// .idBlock.hide {
//   display: none;
// }
// .cls_btn {
//   background-color: #32aaa7;
//   border: 0;
// }
// .modal_icons {
//   font-size: 0;
//   display: flex;
//   align-items: center;
//   & > img {
//     position: relative;
//     top: 2px;
//   }
//   & > span {
//     font-size: 16px;
//   }
// }
// .hide_arrow {
//   display: none;
// }
// .search_icons {
//   position: relative;
//   top: 5px;
//   display: inline-block;
//   width: 24px !important;
//   height: 24px;
//   background-image: url('../../public/icons/search.svg');
//   background-size: contain;
//   &.mobi {
//     position: absolute;
//     top: 20px;
//     right: 15px;
//   }
// }
// .mobile {
//   display: none;
//   margin-bottom: 20px;
// }
// span[class*='el-tag'] deep i {
//   display: none;
// }
// .date_picker_comp {
//   position: relative;
//   /* display: inline-block; */
// }
// .date_show {
//   /* position: relative; */
//   margin-left: 45px;
//   min-width: 120px;
//   display: inline-block;
//   text-align: center;
// }
// .arrow_left,
// .arrow_right {
//   position: absolute;
//   display: inline;
//   background-repeat: no-repeat;
//   /* background-size: contain; */
//   background-position: center;
//   width: 12px;
//   height: 12px;
//   top: 5px;
//   cursor: pointer;
// }
// .arrow_left {
//   background-image: url('../assets/imgs/arrow_left.svg');
//   left: 0px;
// }
// .arrow_right {
//   background-image: url('../assets/imgs/arrow_right.svg');
//   left: 190px;
// }
// @media (min-width: 770px) {
//   .radio {
//     display: inline;
//   }
// }
// @media (max-width: 770px) {
//   .mobile {
//     display: block;
//     padding-left: 0;
//   }
//   .desktop {
//     display: none;
//   }
// }
// @media (max-width: 575px) {
//   .hide_arrow {
//     position: absolute;
//     right: 10px;
//     top: 2px;
//     height: 20px;
//     width: 20px;
//     display: inline-block;
//     background-image: url('../../public/icons/vector.svg');
//     background-size: contain;
//     background-repeat: no-repeat;
//     cursor: pointer;
//     transform: rotate(-180deg);
//     &.hide {
//       transform: rotate(0deg);
//       left: 50%;
//       top: 60%;
//       transform: translate(-50%, -0%);
//     }
//   }
//   .date_picker_comp {
//     & > div {
//       display: flex;
//       position: relative;
//       justify-content: center;
//       & i {
//         position: static;
//         margin-top: 5px;
//         &:nth-of-type(1) {
//           margin-right: 20px;
//         }
//         &:nth-of-type(2) {
//           margin-left: 20px;
//         }
//       }
//     }
//   }
// }
// .close_btn {
//   right: 10px;
//   top: 10px;
// }
// .rank_icon {
//   width: 25px;
//   margin-left: 10px;
// }
// .rank_icon_rank {
//   width: 20px;
//   // margin-left: -10px;
// }
// .rank_icon_legend {
//   width: 25px;
//   margin-right: 10px;
// }
// .user_id {
//   display: inline-block;
//   float: right;
//   cursor: pointer;
// }
// .user_name {
//   display: inline-block;
//   position: relative;
//   text-align: right;
//   float: right;
//   padding-bottom: 0;
//   margin-top: 10px;
//   &::after {
//     position: absolute;
//     content: '';
//     width: 100%;
//     left: 0;
//     bottom: 0;
//     height: 2px;
//     border-bottom: 1px dotted black;
//   }
// }
// .depth-0 .user_name::after {
//   position: absolute;
//   content: '';
//   width: 100%;
//   left: 0;
//   bottom: 0;
//   height: 2px;
//   border-bottom: 1px dotted white;
// }
// .licevoischet__page {
//   position: relative;
//   &__summ {
//     text-align: center;
//     background-color: #dee2f3;
//     font-size: 12px;
//     padding: 10px 0px;
//   }
//   & .exp_print {
//     span {
//       color: #32aaa7;
//       cursor: pointer;
//     }
//   }
//   & .organization__modal {
//     position: relative;
//     padding-top: 30px;
//     width: 100%;
//     bottom: 0;
//     & .container {
//       position: relative;
//     }
//     & .edit {
//       button {
//         width: 48%;
//         border: 0;
//         padding: 5px 30px;
//         font-size: 16px;
//         &.disabled {
//           color: #9a9a9a;
//           background-color: #dee2f3;
//         }
//         &:nth-of-type(1) {
//           background-color: #32aaa7;
//           color: white;
//         }
//         &:nth-of-type(2) {
//           background-color: white;
//           color: #32aaa7;
//           border: 2px solid #32aaa7;
//         }
//       }
//     }
//   }
// }
</style>
<style>
/* .el-table__header-wrapper {
  background: #dee2f3 !important;
}
button.close {
  color: #32aaa7;
  opacity: 1;
}
button.close:hover {
  color: #32aaa7;
  opacity: 1;
}
.modal-dialog-centered.modal-dialog-scrollable .modal-content {
  max-height: calc(100vh - 5rem) !important;
}
.el-table__expand-icon > .el-icon-arrow-right {
  color: white;
  left: 0;
}
.el-table {
  font-weight: 500;
}
.el-table th {
  background-color: #dee2f3 !important;
  color: black;
}
.orgbyhist .el-table tr td:nth-of-type(1) {
  border-right: 1px solid #9a9a9a;
} */
/* .orgbyhist .el-table td,
.el-table th.is-leaf {
  border-bottom: 1px solid #9a9a9a;
}
.el-table th.is-leaf:nth-of-type(1) {
  border-bottom: 1px solid #9a9a9a;
  border-right: 1px solid #9a9a9a;
}
.depth-0 {
  background-color: #32aaa7 !important;
  color: white;
}
.orgbyhist .depth-1 {
  background-color: #aed9d8 !important;
  color: black;
}
.orgbyhist .depth-2 {
  background-color: #b5cce2 !important;
  color: black;
}
.orgbyhist .depth-3 {
  background-color: #c1d5e9 !important;
  color: black;
}
.orgbyhist .depth-4 {
  background-color: #bebebe !important;
  color: black;
}
.orgbyhist .depth-5 {
  background-color: #c4c5c6 !important;
  color: black;
}
.orgbyhist .depth-6 {
  background-color: #cecfd0 !important;
  color: black;
}
.orgbyhist .depth-7 {
  background-color: #d4d5d7 !important;
  color: black;
}
.orgbyhist .depth-8 {
  background-color: #e3e3e4 !important;
  color: black;
}
.orgbyhist .depth-9 {
  background-color: #ebedf4 !important;
  color: black;
}
.el-table .cell {
  word-break: normal;
  overflow: unset;
  text-overflow: unset;
}
.el-table__body tr.hover-row.current-row > td,
.el-table__body tr.hover-row.el-table__row--striped.current-row > td,
.el-table__body tr.hover-row.el-table__row--striped > td,
.el-table__body tr.hover-row > td {
  background-color: unset;
}
a {
  color: black;
}
.depth-0 a {
  color: white;
}
a:hover {
  color: unset;
  text-decoration: none;
} */
</style>
