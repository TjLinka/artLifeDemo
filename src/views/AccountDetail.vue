<template>
  <div class="licevoischet__page">
    <div class="container-fluid table_container">
      <h2 class="page__title">
                      <p class="mobile_back" @click="back">
        <svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 5H3.83L7.41 1.41L6 0L0 6L6 12L7.41 10.59L3.83 7H18V5Z" fill="#32AAA7"/>
        </svg>
      </p>
        Движение по лицевому счету
        </h2>
      <p class="p-0 m-0 history_title">Период от и до</p>
      <date-picker
      v-model="rangeDate"
      range-separator=" - "
      range @change="getSelectedDataRange"
      format="DD.MM.YYYY"
      value-type="YYYY-MM-DD"
      >
      </date-picker>
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
      <p>
        <!-- <span class="mr-3">Печать</span> -->
        <span class="mr-3">Экспорт в xls</span>
        <span class="mr-3">Экспорт в pdf</span>
      </p>
      <b-table :fields="fields" :items="entries" head-variant="light"
      responsive outlined>
      <template #cell(amount)="data">
        <b class="text-info">{{ data.value }}</b>
      </template>
      </b-table>
      <h2 class="licevoischet__page__summ">
        <span>НАЧИСЛЕНИЕ = {{ incomes }} </span>
        <span>СПИСАНИЕ = {{ outcomes }} </span>
        <span>ИЗМЕНЕНИЕ  = {{ changes }} </span>
        </h2>
    </div>
      <footer class="container-fluid cust_modal">
        <div class="container">
          <div class="row">
          <div class="col text-center search__btn" @click="toggleSearch" v-if="!searchActive">
            Фильтр <i class="el-icon-search search_icon"></i>
          </div>
        </div>
        <div v-if="searchActive" class="organization__modal">
          <h3>
            Фильтр
            <span class="close_btn" @click="searchActive = !searchActive"></span>
          </h3>
          <!-- <BasePeriodPicker :currentPeriod="currentPeriod" v-on:next-period="nextPeriod" /> -->
          <div class="row edit mt-4">
            <div class="col-sm-6 custom_input">
              <input type="text" name="country" id="country" required v-model="filter.operType" />
              <label for="country">Тип операции:</label>
              <span class="clear_icon" @click="clearInput('operType')"></span>
            </div>
            <div class="col-sm-6 custom_input">
              <input type="text" name="country" id="country" required v-model="filter.comment" />
              <label for="country">Комментарий:</label>
              <span class="clear_icon" @click="clearInput('comment')"></span>
            </div>
          </div>
          <!-- <div class="row edit">
          <div class="col-sm-6">
            <input type="text" name="" id="" placeholder="Номер накладной" v-model="number" />
          </div>
        </div> -->
          <div class="row edit">
            <div class="col-sm-6">
              <!-- <input type="text" placeholder="Пользователь" v-model="filter.user">  -->
            </div>
            <div class="col-sm-6">
              <button
              :disabled="isDisabled"
              :class="`mr-2 update ${isDisabled ? 'disabled' : ''}`"
              @click="updateData"
              >Показать</button>
            </div>
          </div>
        </div>
        </div>
      </footer>
  </div>
</template>

<script>
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import 'vue2-datepicker/locale/ru';
import backApi from '../assets/backApi';

export default {
  name: 'AccountDetail',
  components: { DatePicker },
  data() {
    return {
      tags: [],
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
            return new Date(v).toLocaleDateString();
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
            if (v > 0) {
              return v.toFixed(2);
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
            if (v < 0) {
              return v.toFixed(2);
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
    backApi.get('agent/account-detail').then((Response) => {
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
      return summ;
    },
    outcomes() {
      let summ = 0;
      this.outcome.forEach((item) => {
        summ += item.amount;
      });
      return summ;
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
      this.$router.go(-1);
    },
    clearInput(name) {
      this.filter[name] = '';
    },
    getSelectedDataRange() {
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
.organization__modal{
  position: relative;
  padding: 20px 0px;
}
.licevoischet__page {
  &__summ {
    text-align: center;
    background-color: #dee2f3;
    font-size: 20px;
    padding: 10px 0px;
    margin-bottom: 160px;
  }

  & .exp_print {
    span {
      color: #32aaa7;
      cursor: pointer;
    }
  }
}
@media (max-width: 450px) {
  .licevoischet__page__summ{
    font-size: 18px;
    & span{
      display: block;
      margin-top: 10px;
    }
  }
}
.organization__modal {
    //   position: absolute;
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
</style>
