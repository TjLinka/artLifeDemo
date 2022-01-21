<template>
  <div class="licevoischet__page">
    <div v-loading="loading">
    <div class="container-fluid table_container" v-show="!loading">
      <h2 class="page__title">
                      <p class="mobile_back noprint" @click="back">
        <svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 5H3.83L7.41 1.41L6 0L0 6L6 12L7.41 10.59L3.83 7H18V5Z" fill="#32AAA7"/>
        </svg>
      </p>
        {{$t("Детализация лицевого счета")}}: {{agentData.id}} - {{agentData.name}}
        </h2>
      <p>
        <span class="licshet">{{$t("Состояние лицевого счета")}}:
        <span :class="balance < 0 ? 'red' : ''">{{balance === null ? 0 : balance}} Р.</span></span>
      </p>
      <p class="p-0 m-0 history_title"
      v-if="rangeDate[0] !== null && rangeDate.length > 0">{{$t("Период от и до")}}</p>
      <div class="row">
        <div class="col-md-6">
      <date-picker
      v-model="rangeDate"
      range-separator=" - "
      range
      :editable="false"
      @change="getSelectedDataRange"
      format="DD.MM.YYYY"
      placeholder="дд.мм.гггг - дд.мм.гггг"
      value-type="YYYY-MM-DD"
      style="width: 100%"
      >
      </date-picker>
        </div>
      </div>
      <div class="row mt-4">
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
            {{$t("Фильтр")}} <span class="search_icons mobi"></span>
          </div>
        </div>
      <p class="exp_print noprint">
        <!-- <span class="mr-3">Печать</span> -->
        <span class="mr-3" @click="downloadPdf">{{$t("Экспорт в pdf")}}</span>
        <span class="mr-3" @click="downloadXls">{{$t("Экспорт в xlsx")}}</span>
      </p>
      <b-table
      :fields="fields"
      :items="entries"
      head-variant="light"
      responsive
      sticky-header
      outlined>
      <template #cell(amount)="data">
        <b class="text-info">{{ data.value }}</b>
      </template>
      </b-table>
      <h2 class="licevoischet__page__summ">
        <span class="mr-4">{{$t("НАЧИСЛЕНИЕ")}} = {{ incomes | localInt }}        </span>
        <span class="mr-4">{{$t("СПИСАНИЕ")}} = {{ outcomes | localInt }}        </span>
        <span class="mr-4">{{$t("ИЗМЕНЕНИЕ")}}  = {{ changes | localInt }}         </span>
        </h2>
    </div>
    </div>
      <footer class="container-fluid cust_modal">
        <div class="container-md">
          <div class="row desktop_search">
          <div class="col text-center search__btn" @click="toggleSearch" v-if="!searchActive">
            {{$t("Фильтр")}} <span class="search_icons"></span>
          </div>
        </div>
        <div v-if="searchActive" class="organization__modal">
          <h3>
            {{$t("Фильтр")}}
            <span class="close_btn" @click="searchActive = !searchActive"></span>
          </h3>
          <div class="row edit mt-4">
            <div class="col-sm-6 custom_input">
              <input type="text" name="operType" id="operType" required v-model="filter.operType" />
              <label for="operType">{{$t("Тип операции")}}</label>
              <span class="clear_icon" @click="clearInput('operType')"></span>
            </div>
            <div class="col-sm-6 custom_input">
              <input type="text" name="comment" id="comment" required v-model="filter.comment" />
              <label for="comment">{{$t("Комментарий")}}</label>
              <span class="clear_icon" @click="clearInput('comment')"></span>
            </div>
          </div>
          <div class="row edit">
            <div class="col-sm-6">
            </div>
            <div class="col-sm-6">
              <button
              :disabled="isDisabled"
              :class="`mr-2 update ${isDisabled ? 'disabled' : ''}`"
              @click="updateData"
              >{{$t("Показать")}}</button>
            </div>
          </div>
        </div>
        </div>
      </footer>
  </div>
</template>

<script>
import $ from 'jquery';
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import 'vue2-datepicker/locale/ru';
import backApi from '../assets/backApi';
import dateFormat from '../assets/localDateFunc';

export default {
  name: 'AccountDetail',
  components: { DatePicker },
  data() {
    return {
      tags: [],
      agentData: {},
      loading: true,
      balance: null,
      filter: {
        comment: null,
        operType: null,
      },
      searchActive: false,
      lang: {
        monthBeforeYear: false,
      },
      income: [],
      outcome: [],
      rangeDate: {},
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
          key: 'income',
          label: 'Начисление',
          sortable: true,
          thStyle: {
            width: '200px',
            minWidth: '120px',
          },
          formatter(v) {
            if (v >= 0) {
              const formatter = new Intl.NumberFormat('ru');
              return formatter.format(v);
            }
            return null;
          },
        },
        {
          key: 'outcome',
          label: 'Списание',
          sortable: true,
          thStyle: {
            width: '200px',
            minWidth: '120px',
          },
          formatter(v) {
            if (v <= 0) {
              const formatter = new Intl.NumberFormat('ru');
              return formatter.format(v);
            }
            return null;
          },
        },
        {
          key: 'account_type',
          label: 'Тип операции',
          sortable: true,
        },
        {
          key: 'comm',
          label: 'Комментарий',
          sortable: true,
        },
      ],
    };
  },
  mounted() {
    this.rangeDate = [
      this.$moment().subtract(1, 'months').startOf('month').format('YYYY-MM-DD'),
      this.$moment().subtract(0, 'months').endOf('month').format('YYYY-MM-DD'),
    ];
    backApi.get('agent/account-detail', {
      params: {
        beg_dte: this.$moment().subtract(1, 'months').startOf('month').format('YYYY-MM-DD'),
        end_dte: this.$moment().subtract(0, 'months').endOf('month').format('YYYY-MM-DD'),
      },
    }).then((Response) => {
      this.entries = Response.data.entries;
      this.income = this.entries.filter((i) => i.amount >= 0);
      this.outcome = this.entries.filter((i) => i.amount <= 0);
      this.entries.forEach((i) => {
        // eslint-disable-next-line no-param-reassign
        i.income = i.amount;
        // eslint-disable-next-line no-param-reassign
        i.outcome = i.amount;
      });
    }).then(() => {
      setTimeout(() => {
        this.loading = false;
      });
    });
    backApi.get('/agent/profile').then((Response) => {
      this.agentData = Response.data;
      this.balance = Response.data.balance;
    });
  },
  computed: {
    isDisabled() {
      if ((this.filter.comment === null || this.filter.comment === '')
      && (this.filter.operType === null || this.filter.operType === '')) {
        return true;
      }
      return false;
    },
    incomes() {
      let summ = 0;
      this.income.forEach((item) => {
        summ += item.amount;
      });
      return summ.toFixed(2);
    },
    outcomes() {
      let summ = 0;
      this.outcome.forEach((item) => {
        summ += item.amount;
      });
      return summ.toFixed(2);
    },
    changes() {
      let summ = 0;
      this.entries.forEach((item) => {
        summ += item.amount;
      });
      return summ.toFixed(2);
    },
  },
  methods: {
    clearDP() {
    },
    downloadXls() {
      backApi.get('/agent/account-detail/excel',
        {
          params:
          {
            beg_dte: this.rangeDate[0] ? this.rangeDate[0] : null,
            end_dte: this.rangeDate[1] ? this.rangeDate[1] : null,
            find_comm: this.filter.comment,
            find_type: this.filter.operType,
          },
          responseType: 'blob',
        })
        .then(({ data }) => {
          const filename = `${this.$t('Движение по лицевому счету')}.xlsx`;
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
      backApi.get('/agent/account-detail/pdf',
        {
          params:
          {
            beg_dte: this.rangeDate[0] ? this.rangeDate[0] : null,
            end_dte: this.rangeDate[1] ? this.rangeDate[1] : null,
            find_comm: this.filter.comment,
            find_type: this.filter.operType,
          },
          responseType: 'blob',
        })
        .then(({ data }) => {
          const filename = `${this.$t('Движение по лицевому счету')}.pdf`;
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
      this.tags.splice(this.tags.indexOf(tag), 1);
      if (tag.key === 'operType') {
        this.filter.operType = null;
        this.updateData();
      } else if (tag.key === 'comment') {
        this.filter.comment = null;
        this.updateData();
      }
    },
    updateData() {
      const data = {
        params: {
          beg_dte: this.rangeDate[0] ? this.rangeDate[0] : null,
          end_dte: this.rangeDate[1] ? this.rangeDate[1] : null,
          find_comm: this.filter.comment,
          find_type: this.filter.operType,
        },
      };
      if (this.filter.operType !== null && this.filter.operType !== '') {
        const tag = this.tags.find((t) => t.key === 'operType');
        if (tag) {
          tag.name = this.filter.operType;
        } else {
          this.tags.push({ name: this.filter.operType, key: 'operType' });
        }
      }
      if (this.filter.comment !== null && this.filter.comment !== '') {
        const tag = this.tags.find((t) => t.key === 'comment');
        if (tag) {
          tag.name = this.filter.comment;
        } else {
          this.tags.push({ name: this.filter.comment, key: 'comment' });
        }
        data.params.comment = this.comment;
      }
      backApi.get('agent/account-detail', data).then((Response) => {
        this.entries = Response.data.entries;
        this.income = this.entries.filter((i) => i.amount > 0);
        this.outcome = this.entries.filter((i) => i.amount < 0);
        this.entries.forEach((i) => {
          // eslint-disable-next-line no-param-reassign
          i.income = i.amount;
          // eslint-disable-next-line no-param-reassign
          i.outcome = i.amount;
        });
      });
      if (this.searchActive === true) {
        // eslint-disable-next-line no-unused-expressions
        this.searchActive = false;
      }
    },
    toggleSearch() {
      this.searchActive = !this.searchActive;
    },
    back() {
      const navEl = document.getElementsByClassName('router-link-exact-active router-link-active');
      $(navEl[0])
        .parent()
        .parent()
        .siblings()
        .addClass('active');
    },
    clearInput(name) {
      this.filter[name] = '';
    },
    getSelectedDataRange() {
      if (this.rangeDate.some((d) => d === null)) {
        this.rangeDate = [
          this.$moment().subtract(1, 'months').startOf('month').format('YYYY-MM-DD'),
          this.$moment().subtract(0, 'months').endOf('month').format('YYYY-MM-DD'),
        ];
      }
      backApi
        .get('agent/account-detail', {
          params: {
            beg_dte: this.rangeDate[0] ? this.rangeDate[0] : null,
            end_dte: this.rangeDate[1] ? this.rangeDate[1] : null,
            find_comm: this.filter.comment,
            find_type: this.filter.operType,
          },
        })
        .then((Response) => {
          this.entries = Response.data.entries;
          this.income = this.entries.filter((i) => i.amount > 0);
          this.outcome = this.entries.filter((i) => i.amount < 0);
          this.entries.forEach((i) => {
            // eslint-disable-next-line no-param-reassign
            i.income = i.amount;
            // eslint-disable-next-line no-param-reassign
            i.outcome = i.amount;
          });
        });
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
    top: 20px;
    right: 15px;
  }
}
.licshet{
  // margin-left: 30px;
  font-size: 25px;
  position: relative;
  top: 10px;
  & span.red{
    color: #BD0A0A;
  }
}
.update{
  width: 100%;
}
.mobile_search{
  display: none;
}
.organization__modal{
  position: relative;
  // padding: 20px 0px;
  margin-top: 20px;
  margin-bottom: 20px;
}
.licevoischet__page {
  &__summ {
    text-align: center;
    // font-family: 'Futura PT Book';
    // font-weight: 500;
    background-color: #dee2f3;
    font-size: 16px;
    padding: 10px 0px;
    // margin-bottom: 160px;
  }

  & .exp_print {
    span {
      color: #32aaa7;
      cursor: pointer;
    }
  }
}
@media (max-width: 768px) {
  .desktop_search{
    display: none;
  }
  .mobile_search{
    display: block;
    margin-top: -20px;
    margin-bottom: 20px;
  }
}
@media (max-width: 575px) {
  .custom_input{
    margin-top: 20px;
  }
  .licevoischet__page__summ{
    position: fixed;
    bottom: 50px;
    left: 0;
    right: 0;
    font-size: 12px !important;
    padding-left: 15px;
    padding-right: 15px;
    & span{
      display: inline;
    }
  }
  .search_icons{
    height: 25px;
  }
}
@media (max-width: 450px) {
  .licevoischet__page__summ{
    font-size: 16px;
    & span{
      margin-top: 10px;
    }
  }
  .licshet{
    display: block;
    font-size: 20px;
    margin-left: 0;
  }
}
.organization__modal {
    //   position: absolute;
    // padding: 60px;
    width: 100%;
    bottom: 0;

    & .edit {
      input {
        // margin-bottom: 20px;
      }
      button {
        margin-top: 20px;
        width: 100%;
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
        &.disabled{
          color: #9A9A9A;
          background-color: #DEE2F3;
        }
      }
    }
  }
</style>
<style>
.mx-datepicker svg{
  color: #32AAA7;
}
.sr-only{
  display: none;
}
</style>
