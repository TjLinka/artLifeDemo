<template>
  <div class="licevoischet__page">
    <div class="container-fluid table_container">
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
      <h2>История организации</h2>
      <div class="row">
        <div class="col-md-6 mt-4">
          <button
          :class="`update ${transAccess ? 'disabled' : ''}`"
          @click="showTrans = !showTrans"
          :disabled="transAccess"
          >Трансферт</button>
          <p class="exp_print">
            <!-- <span class="mr-3">Печать</span> -->
            <span class="mr-3" @click="downloadXls">Экспорт в xlsx</span>
            <span class="mr-3" @click="downloadPdf">Экспорт в pdf</span>
          </p>
        </div>
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
      <div class="transmaneg_table" v-loading="loading">
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
        class="mt-5">
          <template v-slot:cell(id)="row">
            <p>
              <span class="mr-4">{{ row.item.lvl }} УР</span>
              <img :src="`../icons/${row.item.rank_end}.svg`"
              :title="row.item.rank_end" class="rank_icon" />
              <span style="display: inline-block; float:right">{{ row.item.id }}</span><br>
              <span
              style="display: inline-block; float:right; text-align: right; margin-top: 10px">
              {{row.item.name}}</span>
            </p>
            <p style="text-align: right">{{ row.item.fio }}</p>
          </template>
        </b-table>
      </div>
    </div>
      <footer class="container-fluid cust_modal">
      <div class="row desk_trans">
        <div class="col text-center search__btn"
        @click="searchActive = !searchActive" v-if="!searchActive">
          Настройки трансфера <i class="el-icon-s-tools search_icon"></i>
        </div>
      </div>
      <div v-if="searchActive" class="organization__modal container">
        <span @click="searchActive = !searchActive" class="close_btn"></span>
        <h3 class="mt-4">Поиск партнёра</h3>
        <div class="row mt-md-5">
          <div class="col-md-6">
            <b-form-checkbox
              id="checkbox-1"
              v-model="filterData.status"
              name="checkbox-1"
              value="1"
              checked
              unchecked-value="0"
            >
              Показывать терминированных
            </b-form-checkbox>
          </div>
        </div>
        <div class="row mt-md-5">
          <div class="col-md-6 custom_input">
            <input type="text" name="userId" id="userId" required v-model="filterData.agent_id"/>
            <label for="userId">Номер:</label>
            <span class="clear_icon" @click="clearInput('agent_id')"></span>
          </div>
          <div class="col-md-6 custom_input">
            <input type="text" name="userFio" id="userFio" required v-model="filterData.fullname"/>
            <label for="userFio">ФИО:</label>
            <span class="clear_icon" @click="clearInput('fullname')"></span>
          </div>
        </div>
        <div class="row mt-md-5">
          <div class="col-md-6">
            <span
            v-if="filterData.area_id"
            class="custom_label"
            >
            Территория</span>
            <el-select
            v-model="filterData.area_id"
            clearable
            placeholder="Территория">
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
            <label for="userStore">Город склада обслуживания:</label>
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
      <div :class="`mobile_modal_mask ${searchActive ? 'active' : ''}`"></div>
  </div>
</template>

<script>
import backApi from '../assets/backApi';
import Transfert from '../components/Transfert.vue';

export default {
  name: 'TransferManagement',
  components: { Transfert },
  data() {
    return {
      id: null,
      transAccess: true,
      showTrans: false,
      loading: true,
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
          key: 'noact',
          label: 'не активность',
          formater: (item) => item.noact,
        },
        {
          key: 'lo',
          label: 'ЛО',
          formater: (item) => item.lo,
        },
        {
          key: 'go',
          label: 'ГО',
          formater: (item) => item.go,
        },
        {
          key: 'ngo',
          label: 'НГО',
          formater: (item) => item.ngo,
        },
        {
          key: 'oo',
          label: 'ОО',
          formater: (item) => item.oo,
        },
        {
          key: 'ko',
          label: 'КО',
          formater: (item) => item.ko,
        },
        {
          key: 'rank_beg',
          label: 'ранг на начало',
          formater: (item) => item.rank_beg,
        },
        {
          key: 'rank_calc',
          label: 'расчетный ранг',
          formater: (item) => item.rank_calc,
        },
        {
          key: 'reserve',
          label: 'балы в резерве',
          formater: (item) => item.reserve,
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
    backApi.get('/agent/flat_genealogy', {
      params: {
        tree_type: 2,
      },
    }).then((Response) => {
      this.entries = Response.data.entries;
      this.loading = false;
    });
  },
  methods: {
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
      return `depth-${item.lvl}`;
    },
    tableRowClassName({ row }) {
      return `depth-${row.depth}`;
    },
    handleClose(event, tag) {
      this.tags.splice(this.tags.indexOf(tag), 1);
      if (tag.key === 'rank_beg') {
        this.filterData.rank_beg = null;
        this.updateData();
      }
      if (tag.key === 'rank_calc') {
        this.filterData.rank_calc = null;
        this.updateData();
      }
      if (tag.key === 'rank_end') {
        this.filterData.rank_end = null;
        this.updateData();
      }
      if (tag.key === 'agent_id') {
        this.filterData.agent_id = null;
        this.updateData();
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

      const dataXlsx = {
        with_terminated: this.filterData.status,
        tree_type: 2,
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
      };
      backApi.get('/agent/flat_genealogy/excel',
        {
          dataXlsx,
          responseType: 'blob',
        })
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

      const dataXlsx = {
        with_terminated: this.filterData.status,
        tree_type: 2,
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
      };
      backApi.get('/agent/flat_genealogy/pdf',
        {
          dataXlsx,
          responseType: 'blob',
        })
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
          with_terminated: this.filterData.status,
          tree_type: 2,
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
      // // Рассчётный ранг
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
      this.$router.go(-1);
    },
  },
};
</script>
<style lang="scss" scoped>
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
    max-height: 70vh;
    overflow: scroll;
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
@media (max-width: 525px) {
  .mt-md-5{
    & .col-md-6{
      margin-top: 20px;
    }
  }
}
</style>
<style>
.transmaneg_table th[aria-colindex='1']{
    width: 15%;
}
</style>
