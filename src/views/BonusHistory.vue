<template>
  <div class="licevoischet__page">
    <div class="container-fluid table_container">
      <h2 class="page__title">
                              <p class="mobile_back" @click="back">
        <svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 5H3.83L7.41 1.41L6 0L0 6L6 12L7.41 10.59L3.83 7H18V5Z" fill="#32AAA7"/>
        </svg>
      </p>
        История бонусов(КЕ)
        </h2>
      <div class="row mt-3">
        <div class="col-md-6 perioad__picker">
        <BasePeriodPicker :currentPeriod="currentPeriod"
        v-on:next-period="nextPeriod" class="period_picker"/>
        </div>
      </div>
      <p class="exp_print mt-3">
        <!-- <span class="mr-3">Печать</span> -->
        <span class="mr-3" @click="downloadXls">Экспорт в xlsx</span>
        <span class="mr-3" @click="downloadPdf">Экспорт в pdf</span>
      </p>
      <div class="bonus_hist_table">
      <div class="mb-5">
      <b-table :fields="topFields " :items="topTableData" head-variant="light"
      responsive outlined class="bonus_history_table">
          <template #cell(period)="data">
            <span>{{ data.value }}</span>
          </template>
      </b-table>
      </div>
      <b-table :fields="mainFields" :items="bonus" head-variant="light"
      class="sub_2" responsive outlined>
        <template v-slot:cell(Наименование)="row">
          <b-button size="sm" @click="row.toggleDetails" class="mr-2">
            <span>{{ row.detailsShowing ? '-' : '+' }}</span>
          </b-button>
          <span>{{ row.item.bonusname }}</span>
        </template>
        <template v-slot:row-details="row">
          <b-table :fields="returnFields"
          :items="row.item.detail" head-variant="light"> </b-table>
        </template>
      </b-table>
      </div>
    </div>
  </div>
</template>

<script>
// import DatePicker from 'vue2-datepicker';
import backApi from '../assets/backApi';
import BasePeriodPicker from '../components/BasePeriodPicker.vue';

export default {
  name: 'BonusHistory',
  components: {
    BasePeriodPicker,
  },
  data() {
    return {
      periods: [],
      periodIndex: 0,
      months: ['Январь', 'Ферваль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Августь', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
      bonus: [],
      returnItems: [],
      topTableData: [],
      topFields: [
        {
          key: 'period',
          label: 'Период',
          formatter(v) {
            const months = ['Январь', 'Ферваль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Августь', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
            return `${new Date(v).getFullYear()} ${months[new Date(v).getMonth()]}`;
          },
        },
        {
          key: 'bonus',
          label: 'Бонусов всего',
          formatter(v) {
            if (v !== null) {
              return v;
            }
            return null;
          },
        },
        {
          key: 'lo',
          label: 'ЛО',
          formatter(v) {
            if (v !== null) {
              return v;
            }
            return null;
          },
        },
        {
          key: 'go',
          label: 'ГО',
          formatter(v) {
            if (v !== null) {
              return v;
            }
            return null;
          },
        },
        {
          key: 'ngo',
          label: 'НГО',
          formatter(v) {
            if (v !== null) {
              return v;
            }
            return null;
          },
        },
        {
          key: 'oo',
          label: 'ОО',
          formatter(v) {
            if (v !== null) {
              return v;
            }
            return null;
          },
        },
        {
          key: 'ko',
          label: 'КО',
          formatter(v) {
            if (v !== null) {
              return v;
            }
            return null;
          },
        },
        {
          key: 'rank_calc',
          label: 'Расчетный ранг ',
        },
      ],
      mainFields: [
        'Наименование',
        // {
        //   key: 'bonusname',
        //   label: 'Наименование',
        // },
        {
          key: 'sum',
          label: 'Бонус',
          formatter(v) {
            if (v !== null) {
              return v;
            }
            return null;
          },
        },
      ],
      returnFields: [
        {
          key: 'agent_from_name',
          label: 'ФИО',
          sortable: true,
        },
        {
          key: 'agent_from',
          label: 'Номер партнёра',
          sortable: true,
        },
        {
          key: 'rankname',
          label: 'Ранг',
          sortable: true,
        },
        {
          key: 'volume',
          label: 'Объем',
          sortable: true,
        },
        {
          key: 'percent',
          label: 'Процент',
          formatter(v) {
            if (v !== null) {
              return v;
            }
            return null;
          },
          sortable: true,
        },
        {
          key: 'bonus_value',
          label: 'Бонус',
          sortable: true,
        },
      ],
    };
  },
  mounted() {
    backApi.get('agent/bonus-detail/periods').then((Response) => {
      this.periods = Response.data.entries.sort((a, b) => {
        const result = a.comdte > b.comdte ? 1 : -1;
        return result;
      });
      this.periodIndex = this.periods.length - 1;
      backApi
        .get('agent/bonus-detail', { params: { comdte: this.currentPeriod } })
        .then((response) => {
          this.bonus = response.data.entries;
          // eslint-disable-next-line no-param-reassign
          response.data.header.period = this.currentPeriod;
          this.topTableData = [response.data.header];
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
  watch: {
    currentPeriod(v) {
      backApi.get('agent/bonus-detail', { params: { comdte: v } }).then((response) => {
        this.bonus = response.data.entries;
        // eslint-disable-next-line no-param-reassign
        response.data.header.period = this.currentPeriod;
        this.topTableData = [response.data.header];
      });
    },
  },
  methods: {
    downloadXls() {
      backApi.get('/agent/bonus-detail/excel',
        {
          params:
          {
            comdte: this.currentPeriod,
          },
          responseType: 'blob',
        })
        .then(({ data }) => {
          const filename = 'История бонусов.xlsx';
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
      backApi.get('/agent/bonus-detail/pdf',
        {
          params:
          {
            comdte: this.currentPeriod,
          },
          responseType: 'blob',
        })
        .then(({ data }) => {
          const filename = 'История бонусов.pdf';
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
      this.$router.go(-1);
    },
    nextPeriod(x) {
      this.period_enabled = true;
      this.periodIndex = (this.periodIndex + this.periods.length + x) % this.periods.length;
    },
  },
};
</script>

<style lang="scss" scoped>
.licevoischet__page {
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
  & .perioad__picker {
    span {
      &:nth-of-type(1),
      &:nth-of-type(3) {
        cursor: pointer;
      }
    }
  }
}
.btn{
  border: 0 !important;
}
.btn-secondary {
  color: black;
  background: none;
  border: 0;
  outline: none !important;
  box-shadow: none;
  font-weight: 500;
  font-size: 18px;
}
.btn-secondary:not(:disabled):not(.disabled):active,
.btn-secondary:not(:disabled):not(.disabled).active,
.show > .btn-secondary.dropdown-toggle{
  background-color: unset;
  outline: none;
}
.btn-secondary:not(:disabled):not(.disabled):active:focus,
.btn-secondary:not(:disabled):not(.disabled).active:focus,
.show > .btn-secondary.dropdown-toggle:focus{
  box-shadow: none;
}
</style>
<style>
.bonus_hist_table table[aria-colcount="8"] td{
  /* background: #32AAA7; */
  /* color: white !important; */
}
.bonus_hist_table table[aria-colcount="6"]{
  margin-bottom: 0;
}
.bonus_hist_table table[aria-colcount="6"] td{
  background-color: #D4D5D7;
}
.bonus_hist_table table[aria-colcount="6"] td[aria-colindex='1']{
  width: 350px;
}
.bonus_hist_table table[aria-colcount="2"] td[aria-colindex='1']{
  width: 350px;
}
.bonus_hist_table th[aria-colindex='1']{
  width: 350px;
  min-width: 300px;
}
.bonus_hist_table table[aria-colcount="2"] > thead > tr > th[role="columnheader"]:nth-of-type(1){
  width: 350px;
  min-width: 300px;
}
.bonus_hist_table table[aria-colcount="2"] tr[tabindex='-1'] > td{
  padding: 0;
  /* padding-top: 10px !important; */
}
tr.b-table-has-details > td{
 background: #32AAA7;
 color: white !important;
}
</style>
