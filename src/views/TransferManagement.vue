<template>
  <div class="licevoischet__page">
    <div v-loading="loading">
    <div class="container-fluid table_container"  v-show="!loading">
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
        Управление трансфертами структуры
      </h2>
      <!-- <h2>История организации</h2> -->
      <!-- <div class="row">
        <div class="col-xl-6 mt-4">
          <button
          :class="`update ${transAccess ? 'disabled' : ''}`"
          @click="showTrans = !showTrans"
          :disabled="transAccess"
          >Трансферт</button>
          <br class="mobile_br">
          <p class="exp_print">
            <span class="mr-3" @click="downloadXls">Экспорт в xlsx</span>
            <span class="mr-3" @click="downloadPdf">Экспорт в pdf</span>
          </p>
        </div>
      </div> -->
      <div class="row mb-4">
        <div class="col-md-6 uptran">
          <el-autocomplete
            v-model="state"
            :fetch-suggestions="querySearchAsync"
            placeholder="Партнёр получатель"
            clearable
            @clear="dd"
            @select="handleSelect"
            style="width: 100%"
          ></el-autocomplete>
        </div>
      </div>
        <div class="col mb-3 search__btn mobile"
        @click="searchActive = !searchActive">
          Поиск <span class="search_icons mobi"></span>
        </div>
      <div class="row">
        <div class="col">
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
        </div>
      </div>
      <div class="row">
        <div class="col-xl-6 mt-4">
          <button
          :class="`update ${transAccess ? 'disabled' : ''}`"
          @click="showTrans = !showTrans"
          :disabled="transAccess"
          >Трансферт</button>
          <br class="mobile_br">
          <p class="exp_print">
            <span class="mr-3" @click="downloadPdf">Экспорт в pdf</span>
            <span class="mr-3" @click="downloadXls">Экспорт в xlsx</span>
            <span class="mr-3" v-b-modal.modal-scrollable>Легенда</span>
          </p>
        </div>
      </div>
      <div class="transmaneg_table mb-3">
        <b-table
        outlined
        responsive
        selectable
        select-mode="single"
        head-variant="light"
        @row-selected="onRowSelected"
        :fields="fields"
        :items="entries"
        :tbody-tr-class="rowClass"
        sticky-header
        class="mt-4">
          <template v-slot:cell(id)="row">
            <p>
              <span class="mr-4">{{ row.item.lvl }} УР</span>
            <img :src="`../icons/${row.item.rank_calc}${row.item.lvl === '0' ? '_white' : ''}.svg`"
              :title="row.item.rank_end" class="rank_icon" />
              <span style="display: inline-block; float:right">{{ row.item.id }}</span><br>
              <router-link :to="`/agent/${row.item.id}`">
              <span :class="`user_name ${row.item.lvl === '0' ? 'depth-main' : ''}`">
              {{row.item.name}}</span>
              </router-link>
            </p>
            <p style="text-align: right">{{ row.item.fio }}</p>
          </template>
          <template v-slot:cell(isterminated)="row">
              {{row.item.isterminated === '0' ? 'Нет' : 'Да'}}
          </template>
          <template #cell()="data">
            {{data.value}}
          </template>
        </b-table>
      </div>
    </div>
    </div>
      <footer class="container-fluid cust_modal">
      <div class="row desk_trans">
        <div class="col text-center search__btn desktop"
        @click="searchActive = !searchActive" v-if="!searchActive">
          Поиск <span class="search_icons"></span>
        </div>
      </div>
      <div v-if="searchActive" class="organization__modal container">
        <span @click="searchActive = !searchActive" class="close_btn"></span>
        <h3 class="mt-4">Поиск партнёра</h3>
        <div class="row mt-md-5">
          <div class="col-xl-6">
            <b-form-group label="Выбор дерева">
              <b-form-radio
                v-model="tree_type"
                name="some-radios-1"
                value="0"
                class="radio mr-3"
                >Полное дерево</b-form-radio
              >
              <b-form-radio
                v-model="tree_type"
                name="some-radios-1"
                value="1"
                class="radio mr-3"
                >Директорское</b-form-radio
              >
              <b-form-radio v-model="tree_type" name="some-radios-1" value="2" class="radio"
                >Своя группа</b-form-radio
              >
            </b-form-group>
          </div>
          <div class="col-xl-6 qq">
            <b-form-checkbox
              id="checkbox-1"
              v-model="filterData.status"
              name="checkbox-1"
              :value="1"
              checked
              :unchecked-value="0"
            >
              Показывать терминированных
            </b-form-checkbox>
          </div>
        </div>
        <div class="row mt-md-5">
          <div class="col-md-6 custom_input">
            <input type="text" name="userId" id="userId" required v-model="filterData.agent_id"/>
            <label for="userId">Номер</label>
            <span class="clear_icon" @click="clearInput('agent_id')"></span>
          </div>
          <div class="col-md-6 custom_input">
            <input type="text" name="userFio" id="userFio" required v-model="filterData.fullname"/>
            <label for="userFio">ФИО</label>
            <span class="clear_icon" @click="clearInput('fullname')"></span>
          </div>
        </div>
        <div class="row mt-md-5">
          <div class="col-md-6">
            <span
            v-if="filterData.area_id"
            class="custom_label"
            >
            Регион</span>
            <el-select
            v-model="filterData.area_id"
            clearable
            placeholder="Регион">
              <el-option
                v-for="item in areaList"
                :key="item.area_id"
                :label="item.area_name"
                :value="item.area_id">
              </el-option>
            </el-select>
          </div>
          <div class="col-md-6 custom_input">
            <input type="text" name="userStore" id="userStore" required v-model="filterData.store"/>
            <label for="userStore">Город склада обслуживания</label>
            <span class="clear_icon" @click="clearInput('store')"></span>
          </div>
        </div>
        <div class="row mt-md-5">
          <div class="col-md-6">
            <span
            v-if="filterData.rank_beg"
            class="custom_label"
            >
            Ранг на начало</span>
            <el-select
            v-model="filterData.rank_beg"
            clearable
            placeholder="Ранг на начало">
              <el-option
                v-for="item in rankList"
                :key="item.rankname"
                :label="item.rankname"
                :value="item.rankname">
              </el-option>
            </el-select>
          </div>
          <div class="col-md-6">
            <span
            v-if="filterData.rank_end"
            class="custom_label"
            >
            Ранг на конец</span>
            <el-select
            v-model="filterData.rank_end"
            clearable
            placeholder="Ранг на конец">
              <el-option
                v-for="item in rankList"
                :key="item.rankname"
                :label="item.rankname"
                :value="item.rankname">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="row mt-md-5">
          <div class="col-md-6">
            <span
            v-if="filterData.rank_calc"
            class="custom_label"
            >
            Расчётный ранг</span>
            <el-select
            v-model="filterData.rank_calc"
            clearable
            placeholder="Расчётный ранг">
              <el-option
                v-for="item in rankList"
                :key="item.rankname"
                :label="item.rankname"
                :value="item.rankname">
              </el-option>
            </el-select>
          </div>
          <div class="col-md-6 custom_input">
            <button class="mr-2 update w-100" @click="updateData">Применить</button>
          </div>
        </div>
      </div>
      </footer>
      <footer class="container-fluid cust_modal" v-if="showTrans">
        <div>
          <Transfert v-on:enlarge-text="showTrans = false" :id="id" />
        </div>
      </footer>
  <b-modal v-model="show"
  id="modal-scrollable" centered scrollable title="Легенда">
    <div class="modal_icons">
      <img :src="`../icons/Клиент.svg`"
      class="rank_icon"> <span>Привилегированный клиент</span></div> <br>
    <div class="modal_icons">
      <img :src="`../icons/Консультант.svg`" class="rank_icon"> <span>Консультант</span></div><br>
    <div class="modal_icons">
      <img :src="`../icons/Мастер.svg`" class="rank_icon"><span>Мастер</span></div><br>
    <div class="modal_icons">
      <img :src="`../icons/Управляющий.svg`"
      class="rank_icon"><span>Управляющий</span></div><br><br>
    <div class="modal_icons">
      <img :src="`../icons/Директор.svg`" class="rank_icon"><span>Директор</span></div><br>
    <div class="modal_icons"><img :src="`../icons/Серебряный Директор.svg`" class="rank_icon">
    <span>Серебряный Директор</span></div><br>
    <div class="modal_icons"><img :src="`../icons/Золотой Директор.svg`" class="rank_icon">
    <span>Золотой Директор</span></div><br><br>
    <div class="modal_icons"><img :src="`../icons/Рубиновый Директор.svg`" class="rank_icon">
    <span>Рубиновый Директор</span></div><br>
    <div class="modal_icons"><img :src="`../icons/Бриллиантовый Директор.svg`" class="rank_icon">
    <span>Бриллиантовый Директор</span></div><br>
    <div class="modal_icons">
      <img :src="`../icons/Президент_1.svg`" class="rank_icon"><span>Президент</span></div><br>
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
      <div :class="`mobile_modal_mask ${searchActive ? 'active' : ''}`"></div>
  </div>
</template>

<script>
import $ from 'jquery';
import backApi from '../assets/backApi';
import Transfert from '../components/Transfert.vue';

export default {
  name: 'TransferManagement',
  components: { Transfert },
  data() {
    return {
      show: false,
      state: '',
      links: [],
      id: null,
      options: [],
      currentUserId: null,
      transAccess: true,
      showTrans: false,
      loading: true,
      tree_type: 2,
      tags: [],
      searchActive: false,
      filterData: {
        status: 1,
      },
      rankList: [],
      areaList: [],
      entries: [],
      fields: [
        {
          key: 'id',
          label: 'P/номер / Ранг / ФИО',
          formater: (item) => `УР ${item.depth}<br>${item.rank_beg}<br>${item.id}<br>${item.name}`,
        },
        {
          key: 'lo',
          label: 'ЛО',
          formatter: (v) => {
            const formatter = new Intl.NumberFormat('ru');
            return formatter.format(v);
          },
          sortable: true,
        },
        {
          key: 'go',
          label: 'ГО',
          formatter: (v) => {
            const formatter = new Intl.NumberFormat('ru');
            return formatter.format(v);
          },
          sortable: true,
        },
        {
          key: 'ngo',
          label: 'НГО',
          formatter: (v) => {
            const formatter = new Intl.NumberFormat('ru');
            return formatter.format(v);
          },
          sortable: true,
        },
        {
          key: 'reserve',
          label: 'Резерв',
          formatter: (v) => {
            const formatter = new Intl.NumberFormat('ru');
            return formatter.format(v);
          },
          sortable: true,
        },
        {
          key: 'oo',
          label: 'ОО',
          formatter: (v) => {
            const formatter = new Intl.NumberFormat('ru');
            return formatter.format(v);
          },
          sortable: true,
        },
        {
          key: 'ko',
          label: 'КО',
          formatter: (v) => {
            const formatter = new Intl.NumberFormat('ru');
            return formatter.format(v);
          },
          sortable: true,
        },
        {
          key: 'noact',
          label: 'Не активность',
          formater: (item) => item.noact,
          sortable: true,
        },
        {
          key: 'rank_beg',
          label: 'Ранг на начало',
          formater: (item) => item.rank_beg,
        },
        {
          key: 'rank_calc',
          label: 'Расчетный ранг',
          formater: (item) => item.rank_calc,
        },
        {
          key: 'rank_end',
          label: 'Ранг на конец',
          formater: (item) => item.rank_end,
        },
        {
          key: 'cityname',
          label: 'Город склада обслуживания',
          formater: (item) => item.cityname,
          sortable: true,
        },
        {
          key: 'areaname',
          label: 'Регион',
          formater: (item) => item.areaname,
          sortable: true,
        },
        {
          key: 'isterminated',
          label: 'Терминирован',
          // formatter: (item) => {
          //   if (item.isterminated === 0) {
          //     return 'Нет';
          //   }
          //   return 'Да';
          // },
          sortable: true,
        },
      ],
    };
  },
  mounted() {
    backApi.get('/agent/rank-list').then((Response) => {
      this.rankList = Response.data.entries;
    });
    backApi.get('/agent/area-list').then((Response) => {
      this.areaList = Response.data.entries;
    });
    if (this.$route.params.id) {
      backApi.get('agent/share-transfert-list', { params: { show_root: 1 } }).then((Response) => {
        // eslint-disable-next-line eqeqeq
        const user = Response.data.entries.filter((u) => u.id == this.$route.params.id);
        this.state = `${user[0].id} - ${user[0].agentname}`;
        this.currentUserId = user[0].id;
      });
      backApi.get('/agent/flat_genealogy', {
        params: {
          agent_id: this.$route.params.id,
          tree_type: 2,
          with_terminated: 1,
        },
      }).then((Response) => {
        this.entries = Response.data.entries;
        this.loading = false;
      });
      const treeNameTranslate = {
        2: 'Своя группа',
        0: 'Полное дерево',
        1: 'Директорское',
      };
      const treeName = treeNameTranslate[this.tree_type];
      this.tags.push({ name: treeName, key: 'tree_type' });
    } else {
      backApi.get('/agent/profile').then((Response) => {
        this.state = `${Response.data.id} - ${Response.data.name}`;
        this.currentUserId = Response.data.id;
        backApi.get('/agent/flat_genealogy', {
          params: {
            agent_id: Response.data.id,
            tree_type: 2,
            with_terminated: 1,
          },
        }).then((Response2) => {
          this.entries = Response2.data.entries;
          this.loading = false;
        });
        const treeNameTranslate = {
          2: 'Своя группа',
          0: 'Полное дерево',
          1: 'Директорское',
        };
        const treeName = treeNameTranslate[this.tree_type];
        this.tags.push({ name: treeName, key: 'tree_type' });
      });
    }
  },
  methods: {
    dd() {
      this.loading = true;
      backApi.get('/agent/profile').then((Response) => {
        this.currentUserId = Response.data.id;
        this.state = `${Response.data.id} - ${Response.data.name}`;
        backApi.get('/agent/flat_genealogy', {
          params: {
            agent_id: Response.data.id,
            tree_type: 0,
          },
        }).then((Response2) => {
          this.entries = Response2.data.entries;
          this.loading = false;
        });
      });
    },
    querySearchAsync(queryString, cb) {
      backApi.get('/agent/share-transfert-list', { params: { show_root: 1 } }).then((Response2) => {
        Response2.data.entries.forEach((u) => {
          // eslint-disable-next-line no-param-reassign
          u.value = `${u.id}-${u.agentname}`;
        });
        cb(Response2.data.entries.slice(0, 10));
      });
    },
    handleSelect(item) {
      this.loading = true;
      this.currentUserId = item.id;
      backApi.get('/agent/flat_genealogy', {
        params: {
          agent_id: item.id,
          tree_type: 0,
        },
      }).then((Response2) => {
        this.entries = Response2.data.entries;
        this.loading = false;
      });
    },
    onRowSelected(item) {
      this.showTrans = false;
      if (item.length > 0) {
        backApi.get('/agent/transfer-info', { params: { another_agent_id: item[0].id } })
          .then(() => {
            this.id = item[0].id;
            this.transAccess = false;
          })
          .catch(() => {
            this.transAccess = true;
          });
      } else {
        this.transAccess = true;
      }
    },
    rowClass(item) {
      if (item.lvl === '0') {
        return 'green';
      }
      return `depth-${item.lvl}`;
    },
    tableRowClassName({ row }) {
      return `depth-${row.depth}`;
    },
    handleClose(event, tag) {
      if (tag.key === 'rank_beg') {
        this.tags.splice(this.tags.indexOf(tag), 1);
        this.filterData.rank_beg = null;
        this.updateData();
      }
      if (tag.key === 'rank_calc') {
        this.tags.splice(this.tags.indexOf(tag), 1);
        this.filterData.rank_calc = null;
        this.updateData();
      }
      if (tag.key === 'rank_end') {
        this.tags.splice(this.tags.indexOf(tag), 1);
        this.filterData.rank_end = null;
        this.updateData();
      }
      if (tag.key === 'area_id') {
        this.tags.splice(this.tags.indexOf(tag), 1);
        this.filterData.area_id = null;
        this.updateData();
      }
      if (tag.key === 'agent_id') {
        this.tags.splice(this.tags.indexOf(tag), 1);
        this.filterData.agent_id = null;
        this.updateData();
      }
      if (tag.key === 'fullname') {
        this.tags.splice(this.tags.indexOf(tag), 1);
        this.filterData.fullname = null;
        this.updateData();
      }
      if (tag.key === 'store') {
        this.tags.splice(this.tags.indexOf(tag), 1);
        this.filterData.store = null;
        this.updateData();
      }
      if (tag.key === 'tree_type') {
        if (tag.name !== 'Полное дерево') {
          this.tree_type = 0;
          this.updateData();
        }
      }
    },
    clearInput(name) {
      this.filterData[name] = null;
    },
    downloadXls() {
      const rankBeg = this.rankList.find((i) => i.rankname === this.filterData.rank_beg)
        ? this.rankList.find((i) => i.rankname === this.filterData.rank_beg).i_rank : null;
      const statusBeg = this.rankList.find((i) => i.rankname === this.filterData.rank_beg)
        ? this.rankList.find((i) => i.rankname === this.filterData.rank_beg).i_status : null;

      const rankCalc = this.rankList.find((i) => i.rankname === this.filterData.rank_calc)
        ? this.rankList.find((i) => i.rankname === this.filterData.rank_calc).i_rank : null;
      const statusCalc = this.rankList.find((i) => i.rankname === this.filterData.rank_calc)
        ? this.rankList.find((i) => i.rankname === this.filterData.rank_calc).i_status : null;

      const rankEnd = this.rankList.find((i) => i.rankname === this.filterData.rank_end)
        ? this.rankList.find((i) => i.rankname === this.filterData.rank_end).i_rank : null;
      const statusEnd = this.rankList.find((i) => i.rankname === this.filterData.rank_end)
        ? this.rankList.find((i) => i.rankname === this.filterData.rank_end).i_status : null;

      const areaName = this.areaList.find((a) => a.area_id === this.filterData.area_id)
        ? this.areaList.find((a) => a.area_id === this.filterData.area_id).area_name : null;

      const dataa = {
        params: {
          context: this.currentUserId,
          // eslint-disable-next-line radix
          with_terminated: parseInt(this.filterData.status),
          tree_type: this.tree_type,
          num: this.filterData.agent_id,
          fullname: this.filterData.fullname,
          area_name: areaName,
          area_id: this.filterData.area_id,
          city: this.filterData.store,
          rank_beg_name: this.filterData.rank_beg,
          i_rank_beg: rankBeg,
          i_status_beg: statusBeg,
          rank_calc_name: this.filterData.rank_calc,
          i_rank_calc: rankCalc,
          i_status_calc: statusCalc,
          rank_end_name: this.filterData.rank_end,
          i_rank_end: rankEnd,
          i_status_end: statusEnd,
        },
        responseType: 'blob',
      };
      backApi.get('/agent/flat_genealogy/excel', dataa)
        .then(({ data }) => {
          const filename = 'Управление трансфертами структуры.xlsx';
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
      const rankBeg = this.rankList.find((i) => i.rankname === this.filterData.rank_beg)
        ? this.rankList.find((i) => i.rankname === this.filterData.rank_beg).i_rank : null;
      const statusBeg = this.rankList.find((i) => i.rankname === this.filterData.rank_beg)
        ? this.rankList.find((i) => i.rankname === this.filterData.rank_beg).i_status : null;

      const rankCalc = this.rankList.find((i) => i.rankname === this.filterData.rank_calc)
        ? this.rankList.find((i) => i.rankname === this.filterData.rank_calc).i_rank : null;
      const statusCalc = this.rankList.find((i) => i.rankname === this.filterData.rank_calc)
        ? this.rankList.find((i) => i.rankname === this.filterData.rank_calc).i_status : null;

      const rankEnd = this.rankList.find((i) => i.rankname === this.filterData.rank_end)
        ? this.rankList.find((i) => i.rankname === this.filterData.rank_end).i_rank : null;
      const statusEnd = this.rankList.find((i) => i.rankname === this.filterData.rank_end)
        ? this.rankList.find((i) => i.rankname === this.filterData.rank_end).i_status : null;

      const areaName = this.areaList.find((a) => a.area_id === this.filterData.area_id)
        ? this.areaList.find((a) => a.area_id === this.filterData.area_id).area_name : null;

      // const dataXlsx = {
      //   with_terminated: this.filterData.status,
      //   tree_type: this.tree_type,
      //   num: this.filterData.agent_id,
      //   fullname: this.filterData.fullname,
      //   area_id: this.filterData.area_id,
      //   city: this.filterData.store,
      //   i_rank_beg: rankBeg,
      //   i_status_beg: statusBeg,
      //   i_rank_calc: rankCalc,
      //   i_status_calc: statusCalc,
      //   i_rank_end: rankEnd,
      //   i_status_end: statusEnd,
      // }
      const dataa = {
        params: {
          context: this.currentUserId,
          // eslint-disable-next-line radix
          with_terminated: parseInt(this.filterData.status),
          tree_type: this.tree_type,
          num: this.filterData.agent_id,
          fullname: this.filterData.fullname,
          area_id: this.filterData.area_id,
          area_name: areaName,
          city: this.filterData.store,
          rank_beg_name: this.filterData.rank_beg,
          i_rank_beg: rankBeg,
          i_status_beg: statusBeg,
          rank_calc_name: this.filterData.rank_calc,
          i_rank_calc: rankCalc,
          i_status_calc: statusCalc,
          rank_end_name: this.filterData.rank_end,
          i_rank_end: rankEnd,
          i_status_end: statusEnd,
        },
        responseType: 'blob',
      };
      backApi.get('/agent/flat_genealogy/pdf', dataa)
        .then(({ data }) => {
          const filename = 'Управление трансфертами структуры.pdf';
          const url = window.URL.createObjectURL(new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', filename);
          document.body.appendChild(link);
          link.click();
          link.remove();
        });
    },
    updateData() {
      this.loading = true;
      const rankBeg = this.rankList.find((i) => i.rankname === this.filterData.rank_beg)
        ? this.rankList.find((i) => i.rankname === this.filterData.rank_beg).i_rank : null;
      const statusBeg = this.rankList.find((i) => i.rankname === this.filterData.rank_beg)
        ? this.rankList.find((i) => i.rankname === this.filterData.rank_beg).i_status : null;

      const rankCalc = this.rankList.find((i) => i.rankname === this.filterData.rank_calc)
        ? this.rankList.find((i) => i.rankname === this.filterData.rank_calc).i_rank : null;
      const statusCalc = this.rankList.find((i) => i.rankname === this.filterData.rank_calc)
        ? this.rankList.find((i) => i.rankname === this.filterData.rank_calc).i_status : null;

      const rankEnd = this.rankList.find((i) => i.rankname === this.filterData.rank_end)
        ? this.rankList.find((i) => i.rankname === this.filterData.rank_end).i_rank : null;
      const statusEnd = this.rankList.find((i) => i.rankname === this.filterData.rank_end)
        ? this.rankList.find((i) => i.rankname === this.filterData.rank_end).i_status : null;

      const data = {
        params: {
          // eslint-disable-next-line radix
          with_terminated: parseInt(this.filterData.status),
          tree_type: this.tree_type,
          agent_id: this.currentUserId,
          num: this.filterData.agent_id,
          fullname: this.filterData.fullname,
          area_id: this.filterData.area_id,
          city: this.filterData.store,
          i_rank_beg: rankBeg,
          i_status_beg: statusBeg,
          i_rank_calc: rankCalc,
          i_status_calc: statusCalc,
          i_rank_end: rankEnd,
          i_status_end: statusEnd,
        },
      };
      const treeNameTranslate = {
        2: 'Своя группа',
        0: 'Полное дерево',
        1: 'Директорское',
      };
      // Тип дерева
      if (this.tree_type !== null) {
        const treeName = treeNameTranslate[this.tree_type];
        const tag = this.tags.find((t) => t.key === 'tree_type');
        if (tag) {
          tag.name = treeName;
        } else if (this.tree_type !== 'full') {
          this.tags.push({ name: treeName, key: 'tree_type' });
        }
      }
      // Номер агента
      if (this.filterData.agent_id !== null
      && this.filterData.agent_id !== ''
      && this.filterData.agent_id !== undefined) {
        const tag = this.tags.find((t) => t.key === 'agent_id');
        if (tag) {
          tag.name = `Номер агента: ${this.filterData.agent_id}`;
        } else {
          this.tags.push({ name: `Номер агента: ${this.filterData.agent_id}`, key: 'agent_id' });
        }
      }
      // ФИО
      if (this.filterData.fullname !== null
      && this.filterData.fullname !== ''
      && this.filterData.fullname !== undefined) {
        const tag = this.tags.find((t) => t.key === 'fullname');
        if (tag) {
          tag.name = `ФИО: ${this.filterData.fullname}`;
        } else {
          this.tags.push({ name: `ФИО: ${this.filterData.fullname}`, key: 'fullname' });
        }
      }
      // Город склада обслуживания
      if (this.filterData.store !== null
      && this.filterData.store !== ''
      && this.filterData.store !== undefined) {
        const tag = this.tags.find((t) => t.key === 'store');
        if (tag) {
          tag.name = `Город склада обслуживания: ${this.filterData.store}`;
        } else {
          this.tags.push({ name: `Город склада обслуживания: ${this.filterData.store}`, key: 'store' });
        }
      }
      // Ранг на начало
      if (this.filterData.rank_beg !== null
      && this.filterData.rank_beg !== ''
      && this.filterData.rank_beg !== undefined) {
        const tag = this.tags.find((t) => t.key === 'rank_beg');
        if (tag) {
          tag.name = `Ранг на начало: ${this.filterData.rank_beg}`;
        } else {
          this.tags.push({ name: `Ранг на начало: ${this.filterData.rank_beg}`, key: 'rank_beg' });
        }
      }
      // Ранг на конец
      if (this.filterData.rank_end !== null
      && this.filterData.rank_end !== ''
      && this.filterData.rank_end !== undefined) {
        const tag = this.tags.find((t) => t.key === 'rank_end');
        if (tag) {
          tag.name = `Ранг на конец: ${this.filterData.rank_end}`;
        } else {
          this.tags.push({ name: `Ранг на конец: ${this.filterData.rank_end}`, key: 'rank_end' });
        }
      }
      // Рассчётный ранг
      if (this.filterData.rank_calc !== null
      && this.filterData.rank_calc !== ''
      && this.filterData.rank_calc !== undefined) {
        const tag = this.tags.find((t) => t.key === 'rank_calc');
        if (tag) {
          tag.name = `Рассчётный ранг: ${this.filterData.rank_calc}`;
        } else {
          this.tags.push({ name: `Рассчётный ранг: ${this.filterData.rank_calc}`, key: 'rank_calc' });
        }
      }
      // Регион
      if (this.filterData.area_id !== null
      && this.filterData.area_id !== ''
      && this.filterData.area_id !== undefined) {
        const tag = this.tags.find((t) => t.key === 'area_id');
        if (tag) {
          tag.name = `Регион: ${this.areaList[this.filterData.area_id].area_name}`;
        } else {
          this.tags.push({ name: `Регион: ${this.areaList[this.filterData.area_id].area_name}`, key: 'area_id' });
        }
      }

      // if (this.filterData.comment !== null && this.filterData.comment !== '') {
      //   const tag = this.tags.find((t) => t.key === 'comment');
      //   if (tag) {
      //     tag.name = this.filterData.comment;
      //   } else {
      //     this.tags.push({ name: this.filterData.comment, key: 'comment' });
      //   }
      //   data.params.comment = this.comment;
      // }
      this.searchActive = false;
      backApi.get('/agent/flat_genealogy', data)
        .then((Response) => {
          this.entries = Response.data.entries;
          this.loading = false;
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
  },
};
</script>
<style lang="scss" scoped>
.search_icons{
  position: relative;
  top: 5px;
  display: inline-block;
  width: 24px !important;
  height: 21px;
  background-image: url('../../public/icons/search.svg');
  background-size: contain;
  background-repeat: no-repeat;
  &.mobi{
    position: absolute;
    // top: 20px;
    right: 15px;
  }
}
.el-icon-circle-close:before{
  // top: 20px;
}
.qq{
  display: flex;
  align-items: center;
  & > div{
    margin-top: 20px;
  }
}
.user_name{
  display: inline-block;
  position: relative;
  text-align: right;
  color: black;
  float: right;
  padding-bottom: 0;
  margin-top: 10px;
  text-decoration: underline;
  // &::after {
  //     position: absolute;
  //     content: '';
  //     width: 100%;
  //     left: 0;
  //     bottom: 0;
  //     height: 2px;
  //     border-bottom: 1px dotted black;
  // }
}
// .user_name.depth-main::after{
//       position: absolute;
//       content: '';
//       width: 100%;
//       left: 0;
//       bottom: 0;
//       height: 2px;
//       border-bottom: 1px dotted white;
// }
.user_name.depth-main{
  color: white;
  text-decoration: underline;
}
.mobile_br{
  display: none;
}
.mobile{
  display: none;
}
.el-select{
  width: 100%;
  top: -5.5px;
}
.exp_print {
    display: inline;
    span {
      color: #32aaa7;
      cursor: pointer;
    }
}
.update{
  display: block;
  float: right;
  width: 100%;
  border: 0;
  padding: 5px 30px;
  font-size: 16px;
  margin-bottom: 20px;
  background-color: #32aaa7;
  color: white;
  &.disabled{
    color: #9A9A9A;
    background-color: #DEE2F3;
  }
  &:nth-of-type(1){
    width: 40%;
    float: none;
    display: inline;
    margin-right: 10px;
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
    overflow-y: auto;
    box-shadow: 0px 4px 12px 2px rgba(0, 0, 0, 0.24);
}
.organization__modal {
    position: relative;
    // padding: 60px;
    width: 100%;
    bottom: 0;

    & .edit {
      input {
        width: 100%;
        border: 0;
        border-bottom: 1px solid #dee2f3;
        padding-bottom: 10px;
        outline: none;
        margin-bottom: 20px;
      }
      button {
        margin-top: 20px;
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
.close_btn {
    position: absolute;
    right: 0;
    top: 0px;
    font-size: 25px;
    font-weight: 500;
    color: #32aaa7;
    cursor: pointer;
}
@media (min-width: 770px) {
  .radio{
    display: inline;
  }
}
@media (max-width: 768px) {
  .mobile{
    display: block;
    padding: 0;
  }
  .desktop{
    display: none;
  }
}
@media (max-width: 525px) {
  .update{
    width: 100% !important;
  }
  .mobile_br{
    display: block;
  }
  .mt-md-5{
    & .col-md-6{
      margin-top: 20px;
    }
  }
  .search_icons{
    height: 25px;
    top: 0px;
  }
}
</style>
<style>
.transmaneg_table th[aria-colindex='1']{
    width: 15%;
}
.uptran{
  min-width: 360px;
}
@media (max-width: 330px) {
  .uptran{
    width: 100%;
  }
}
.uptran .el-icon-circle-close:before{
  /* top: 20px;
  right: -10px; */
}
.el-icon-circle-close{
  position: relative;
}
.el-select .el-icon-circle-close:before{
  bottom: 20px;
  right: 10px;
}
</style>
