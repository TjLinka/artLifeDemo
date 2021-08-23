<template>
  <div class="licevoischet__page">
    <div  v-loading="loading">
    <div class="container-fluid table_container" v-show="!loading">
      <h2 class="page__title">
                              <p class="mobile_back noprint" @click="back">
        <svg width="18" height="12" viewBox="0 0 18 12" fill="none"  xmlns="http://www.w3.org/2000/svg">
          <path d="M18 5H3.83L7.41 1.41L6 0L0 6L6 12L7.41 10.59L3.83 7H18V5Z" fill="#32AAA7"/>
        </svg>
      </p>
        История баллов</h2>
      <p>
        <span class="transInfo">Состояние лицевого счета:</span>
        <span class="lo">ЛО: {{transInfo.lo}}</span>
        <span class="res">Резерв: {{transInfo.reserve}}</span>
      </p>
      <p class="p-0 m-0 history_title">Период от и до</p>
      <div class="row">
        <div class="col-md-6">
      <date-picker
      v-model="rangeDate"
      range-separator=" - "
      range
      :editable = "false"
      placeholder="дд.мм.гггг - дд.мм.гггг"
      @change="getSelectedDataRange"
      format="DD.MM.YYYY"
      value-type="YYYY-MM-DD"
      style="width: 100%"
      >
      </date-picker>
        </div>
      </div>
      <div class="row mt-4 noprint">
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
      <div class="row mobile_search noprint">
        <div class="col search__btn noprint" @click="toggleSearch">
          Фильтры <span class="search_icons mobi"></span>
        </div>
      </div>
      <p class="exp_print mt-3 noprint">
        <!-- <span class="mr-3">Печать</span> -->
        <span class="mr-3" @click="downloadPdf">Экспорт в pdf</span>
        <span class="mr-3" @click="downloadXls">Экспорт в xlsx</span>
      </p>
      <b-table responsive :fields="fields" :items="entries" head-variant="light"
      class="points_history_table" outlined>
        <template #table-colgroup="scope">
          <col
            v-for="field in scope.fields"
            :key="field.key"
          />
        </template>
          <template #cell(comdte)="data">
            {{ data.value }}
          </template>
          <template #cell(income)="data">
            {{ data.value | localInt }}
          </template>
          <template #cell(outcome)="data">
            {{ data.value | localInt}}
          </template>
      </b-table>
      <h2 class="licevoischet__page__summ">
        <span class="mr-4">НА СЧеТ = {{ summIncome | localInt }}        </span>
        <span class="mr-4">СО СЧЕТА = {{ summOutcome | localInt }}        </span>
        <span class="mr-4">ИЗМЕНЕНИЯ  = {{ changes | localInt }}         </span>
        </h2>
    </div>
    </div>
      <footer class="container-fluid cust_modal pb-4">
      <div class="row desk_trans">
        <div class="col text-center search__btn" @click="toggleSearch" v-if="!searchActive">
          Фильтры <span class="search_icons"></span>
        </div>
      </div>
      <div v-if="searchActive" class="organization__modal">
        <div class="container-md">
        <h3 class="mt-4">
          Фильтры
          <span @click="closeModal" class="close_btn"></span>
        </h3>
        <div class="row">
          <div class="col-md-12 mt-4">
            <b-form-group label="" class="flex-radio">
              <b-form-radio
                v-model="points_type"
                name="some-radios-1"
                value="0"
                class="radio mr-3"
                >Резерв</b-form-radio
              >
              <b-form-radio
                v-model="points_type"
                name="some-radios-1"
                value="1"
                class="radio mr-3"
                >ЛО</b-form-radio
              >
              <b-form-radio
                v-model="points_type"
                name="some-radios-1"
                :value="null"
                class="radio"
                >Все</b-form-radio
              >
            </b-form-group>
          </div>
        </div>
        <div class="row edit mt-4">
          <div class="col-md-6 custom_input">
           <input type="text" name="comment"
            id="comment" required v-model="comment" />
            <label for="comment">Комментарий</label>
            <span class="clear_icon" @click="clearComment('comment')"></span>
          </div>
          <div class="col-md-6 custom_input">
           <input type="text" name="operType"
            id="operType" required v-model="operType" />
            <label for="operType">Тип операции</label>
            <span class="clear_icon" @click="clearOperType('operType')"></span>
          </div>
          <!-- <div class="col-md-6">
            <button class="mr-2 update" @click="updateData">Показать</button>
          </div> -->
        </div>
        <div class="row edit mt-4">
          <div class="col-md-6">
          </div>
          <div class="col-md-6">
            <button class="mr-2 update" @click="updateData">Показать</button>
          </div>
        </div>
        </div>
      </div>
      </footer>
      <div :class="`mobile_modal_mask ${searchActive ? 'active' : ''}`"></div>
  </div>
</template>

<script>
import $ from 'jquery';
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import 'vue2-datepicker/locale/ru';
import backApi from '../assets/backApi';
// import { ReplaceNull } from '../assets/utils';
import dateFormat from '../assets/localDateFunc';
// import formatDate from '../assets/localDateFuncEng';

export default {
  name: 'PointsHistory',
  components: { DatePicker },
  data() {
    return {
      loading: true,
      tags: [],
      transInfo: {},
      operType: null,
      comment: null,
      points_type: null,
      currentPeriodTop: {},
      searchActive: false,
      periods: [],
      periodIndex: 0,
      months: [
        'Январь',
        'Ферваль',
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
      rangeDate: [
      ],
      entries: [],
      fields: [
        {
          key: 'dte',
          label: 'Дата операции',
          sortable: true,
          thStyle: {
            width: '150px',
            minWidth: '120px',
          },
          formatter(v) {
            return dateFormat(v);
          },
        },
        {
          key: 'comdte',
          label: 'Период',
          thStyle: {
            width: '140px',
            minWidth: '100px',
          },
          sortable: true,
          formatter(v) {
            const mass = [
              'Январь',
              'Ферваль',
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
            ];
            return (`${mass[new Date(v).getMonth()]} ${new Date(v).getFullYear()}`);
          },
        },
        {
          key: 'income',
          label: 'На счет',
          sortable: true,
          thStyle: {
            minWidth: '100px',
          },
        },
        {
          key: 'outcome',
          label: 'Со счета',
          sortable: true,
          thStyle: {
            minWidth: '100px',
          },
        },
        {
          key: 'opertype',
          label: 'Тип операции',
          sortable: true,
          thStyle: {
            minWidth: '150px',
          },
        },
        {
          key: 'pointstype',
          label: 'Тип баллов',
          sortable: true,
          thStyle: {
            minWidth: '130px',
          },
        },
        {
          key: 'comm',
          label: 'Комментарий',
          // width: '300px',
          sortable: true,
        },
      ],
    };
  },
  async mounted() {
    const response = await backApi.get('/agent/profile');
    backApi.get('/agent/transfer-info', {
      params: {
        another_agent_id: response.data.id,
      },
    }).then((Response) => {
      this.transInfo = Response.data;
    });
    this.rangeDate = [
      this.$moment().subtract(0, 'months').startOf('month').format('YYYY-MM-DD'),
      this.$moment().subtract(0, 'months').endOf('month').format('YYYY-MM-DD'),
    ];
    // console.log(this.$moment().format('Y-MM-DD'));
    backApi.get('agent/points-detail',
      {
        params: {
          beg_dte: this.$moment().subtract(0, 'months').startOf('month').format('YYYY-MM-DD'),
          end_dte: this.$moment().subtract(0, 'months').endOf('month').format('YYYY-MM-DD'),
        },
      }).then((Response) => {
      this.entries = Response.data.entries;
      this.loading = false;
    });
    const treeNameTranslate = { 0: 'Резерв', 1: 'ЛО', null: 'Все' };
    const treeName = treeNameTranslate.null;
    this.tags.push({ name: `Тип баллов: ${treeName}`, key: 'points_type' });
  },
  computed: {
    summIncome() {
      let summIncome = 0;
      this.entries.forEach((item) => {
        summIncome += item.income;
      });
      return summIncome.toFixed(2);
    },
    summOutcome() {
      let summOutcome = 0;
      this.entries.forEach((item) => {
        summOutcome += item.outcome;
      });
      return summOutcome.toFixed(2);
    },
    changes() {
      return (this.summIncome - this.summOutcome).toFixed(2);
    },
  },
  methods: {
    downloadXls() {
      backApi.get('/agent/points-detail/excel',
        {
          params:
          {
            beg_dte: this.rangeDate[0] ? this.rangeDate[0] : null,
            end_dte: this.rangeDate[1] ? this.rangeDate[1] : null,
            points_type: this.points_type,
            comm_find: this.comment,
            operation_type: this.operType,
          },
          responseType: 'blob',
        })
        .then(({ data }) => {
          const filename = 'История баллов.xlsx';
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
      backApi.get('/agent/points-detail/pdf',
        {
          params:
          {
            beg_dte: this.rangeDate[0] ? this.rangeDate[0] : null,
            end_dte: this.rangeDate[1] ? this.rangeDate[1] : null,
            points_type: this.points_type,
            comm_find: this.comment,
            operation_type: this.operType,
          },
          responseType: 'blob',
        })
        .then(({ data }) => {
          const filename = 'История баллов.pdf';
          const url = window.URL.createObjectURL(new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', filename);
          document.body.appendChild(link);
          link.click();
          link.remove();
        });
    },
    handleClose(event, tag) {
      if (tag.key === 'points_type') {
        if (tag.name !== 'Тип баллов: Все') {
          this.tags.splice(this.tags.indexOf(tag), 1);
          this.points_type = null;
          this.updateData(false);
        }
      }
      if (tag.key === 'comment') {
        this.tags.splice(this.tags.indexOf(tag), 1);
        this.comment = null;
        this.updateData(false);
      }
      if (tag.key === 'operType') {
        this.tags.splice(this.tags.indexOf(tag), 1);
        this.operType = null;
        this.updateData(false);
      }
    },
    // eslint-disable-next-line no-unused-vars
    // filFunc(row, filter) {
    //   return (row.opertype.toLowerCase().search(filter.operType.toLowerCase().trim()) !== -1
    //   && row.comm.toLowerCase().search(filter.comment.toLowerCase().trim()) !== -1);
    // },
    clearComment() {
      this.comment = null;
    },
    clearOperType() {
      this.operType = null;
    },
    closeModal() {
      this.searchActive = !this.searchActive;
    },
    toggleSearch() {
      this.searchActive = !this.searchActive;
    },
    updateData(tagsDelete = false) {
      const data = {
        params: {
          beg_dte: this.rangeDate[0] ? this.rangeDate[0] : null,
          end_dte: this.rangeDate[1] ? this.rangeDate[1] : null,
          points_type: this.points_type === null ? null : this.points_type,
          comm_find: this.comment,
          operation_type: this.operType,
        },
      };
      if (this.points_type !== null) {
        const treeNameTranslate = { 0: 'Резерв', 1: 'ЛО', null: 'Все' };
        const treeName = treeNameTranslate[this.points_type];
        const tag = this.tags.find((t) => t.key === 'points_type');
        if (tag) {
          tag.name = `Тип баллов: ${treeName}`;
        } else {
          this.tags.push({ name: `Тип баллов: ${treeName}`, key: 'points_type' });
        }
      } else {
        const tag = this.tags.find((t) => t.key === 'points_type');
        if (tag) {
          tag.name = 'Тип баллов: Все';
        } else {
          this.tags.push({ name: 'Тип баллов: Все', key: 'points_type' });
        }
      }
      if (this.comment !== null && this.comment !== '') {
        const tag = this.tags.find((t) => t.key === 'comment');
        if (tag) {
          tag.name = `Комментарий: ${this.comment}`;
        } else {
          this.tags.push({ name: `Комментарий: ${this.comment}`, key: 'comment' });
        }
        // data.params.comment = this.comment;
      }
      if (this.operType !== null && this.operType !== '') {
        const tag = this.tags.find((t) => t.key === 'operType');
        if (tag) {
          tag.name = `Тип операции: ${this.operType}`;
        } else {
          this.tags.push({ name: `Тип операции: ${this.operType}`, key: 'operType' });
        }
      }
      backApi.get('/agent/points-detail', data).then((Response) => {
        this.entries = Response.data.entries;
      });
      if (tagsDelete) {
        this.searchActive = !this.searchActive;
      }
    },
    back() {
      const navEl = document.getElementsByClassName('router-link-exact-active router-link-active');
      $(navEl[0])
        .parent()
        .parent()
        .siblings()
        .addClass('active');
    },
    getSelectedDataRange() {
      // eslint-disable-next-line max-len
      if (this.rangeDate[0] != null && this.rangeDate[1] != null) {
        backApi
          .get('agent/points-detail', {
            params: {
              beg_dte: String(this.rangeDate[0]),
              end_dte: String(this.rangeDate[1]),
              points_type: this.points_type,
              comm_find: this.comment,
            },
          })
          .then((Response) => {
            this.entries = Response.data.entries;
          });
      } else {
        this.rangeDate = [
          this.$moment().subtract(1, 'months').startOf('month').format('YYYY-MM-DD'),
          this.$moment().subtract(1, 'months').endOf('month').format('YYYY-MM-DD'),
        ];
        backApi.get('agent/points-detail', {
          params: {
            points_type: this.points_type,
            comm_find: this.comment,
            beg_dte: this.$moment().subtract(1, 'months').startOf('month').format('YYYY-MM-DD'),
            end_dte: this.$moment().subtract(1, 'months').endOf('month').format('YYYY-MM-DD'),
          },
        }).then((Response) => {
          this.entries = Response.data.entries;
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.transInfo{
  font-size: 25px;
}
.lo{
  font-size: 20px;
  margin-left: 10px;
  font-weight: bold;
  display: inline-block;
}
.res{
  font-size: 20px;
  font-weight: bold;
  margin-left: 10px;
  display: inline-block;
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
.aq{
  color: red;
}
.update{
  display: block;
  // float: right;
  width: 100%;
  border: 0;
  padding: 5px 0px;
  font-size: 16px;
  margin-bottom: 20px;
  background-color: #32aaa7;
  color: white;
}
.licevoischet__page {
  padding-bottom: 40px;
  &__summ {
    text-align: center;
    background-color: #dee2f3;
    font-size: 16px;
    padding: 10px 0px;
  }
  & .exp_print {
    span {
      color: #32aaa7;
      cursor: pointer;
    }
  }
}
.organization__modal {
  padding-left: 15px;
  padding-right: 15px;
  & > .container-md{
    position: relative;
  }
  & .close_btn {
    position: absolute;
    right: 10px;
    top: 0px;
    font-size: 25px;
    font-weight: 500;
    color: #32aaa7;
    cursor: pointer;
  }
}
.mobile_search{
  display: none;
}
@media (max-width: 770px) {
  input[id="comment"]{
    margin-bottom: 20px;
  }
  .update{
    width: 100%;
  }
  .desk_trans{
    display: none;
  }
  .mobile_search{
    display: block;
  }
}
@media (max-width: 525px) {
  input[id='comment']{
    margin-bottom: 20px;
  }
  .licevoischet__page__summ{
    position: fixed;
    bottom: 50px;
    left: 0;
    right: 0;
    font-size: 12px;
    padding-left: 15px;
  }
  .update{
    width: 100%;
  }
  .custom_input:nth-of-type(2){
    margin-top: 30px;
  }
  .organization__modal{
    padding: 0;
  }
}
@media (max-width: 320px) {
  .licevoischet__page__summ{
    position: fixed;
    bottom: 50px;
    left: 0;
    right: 0;
    font-size: 13px;
    padding-left: 0px;
  }
}
</style>
<style>
.mx-datepicker svg {
  color: #32aaa7;
}
.mx-input{
  border: 0;
  border-bottom: 1px solid #DEE2F3;
  border-radius: 0;
}
.flex-radio div[role='group']{
    display: flex;
}
</style>
