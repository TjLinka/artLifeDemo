<template>
  <div class="licevoischet__page">
    <div v-loading="loading">
      <div class="container-fluid table_container" v-show="!loading">
        <div class="row mt-3 mb-3">
          <div class="col-md-6 perioad__picker">
            <BasePeriodPicker
              :currentPeriod="currentPeriod"
              v-on:next-period="nextPeriod"
              class="period_picker"
            />
          </div>
        </div>
        <p class="exp_print mt-3 noprint">
          <!-- <span class="mr-3">Печать</span> -->
          <span class="mr-3" @click="downloadPdf">{{ $t('Экспорт в pdf') }}</span>
          <span class="mr-3" @click="downloadXls">{{ $t('Экспорт в xlsx') }}</span>
        </p>
        <div class="bonus_hist_table">
          <div class="mb-5">
            <b-table
              :fields="topFields"
              :items="topTableData"
              head-variant="light"
              responsive
              outlined
              class="bonus_history_table"
            >
              <template #cell(period)="data">
                <span>{{ data.value }}</span>
              </template>
            </b-table>
          </div>
          <b-table
            :fields="mainFields"
            :items="bonus"
            head-variant="light"
            class="sub_2"
            responsive
            outlined
          >
            <template v-slot:cell(Наименование)="row">
              <b-button size="sm" @click="row.toggleDetails" class="mr-2">
                <span>{{ row.detailsShowing ? '-' : '+' }}</span>
              </b-button>
              <span>{{ row.item.bonusname }}</span>
            </template>
            <template v-slot:row-details="row">
              <b-table :fields="returnFields" :items="row.item.detail" head-variant="light">
              </b-table>
            </template>
          </b-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import DatePicker from 'vue2-datepicker';
import $ from 'jquery';
import { mapActions } from 'vuex';
// import backApi from '../assets/backApi';
import BasePeriodPicker from '../components/BasePeriodPicker.vue';
import GApi from '../assets/backApi';

export default {
  name: 'BonusHistory',
  components: {
    BasePeriodPicker,
  },
  data() {
    return {
      agentData: {},
      loading: true,
      currentPeriodTop: {},
      periods: [],
      periodIndex: 0,
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
      bonus: [],
      returnItems: [],
      topTableData: [],
      topFields: [
        {
          key: 'bonus',
          label: this.$t('Бонусов всего'),
          formatter(v) {
            if (v !== null) {
              const formatter = new Intl.NumberFormat('ru');
              return formatter.format(v);
            }
            return null;
          },
        },
        {
          key: 'monthly_bonus',
          label: this.$t('Личный бонус'),
          formatter(v) {
            if (v !== null) {
              const formatter = new Intl.NumberFormat('ru');
              return formatter.format(v);
            }
            return null;
          },
        },
        {
          key: 'autodom',
          label: this.$t('Групповой бонус'),
        },
        {
          key: 'lo',
          label: this.$t('ЛО'),
          formatter(v) {
            if (v !== null) {
              const formatter = new Intl.NumberFormat('ru');
              return formatter.format(v);
            }
            return null;
          },
        },
        {
          key: 'go',
          label: this.$t('ГО'),
          formatter(v) {
            if (v !== null) {
              const formatter = new Intl.NumberFormat('ru');
              return formatter.format(v);
            }
            return null;
          },
        },
        {
          key: 'oo',
          label: this.$t('СО'),
          formatter(v) {
            if (v !== null) {
              const formatter = new Intl.NumberFormat('ru');
              return formatter.format(v);
            }
            return null;
          },
        },
        {
          key: 'ngo',
          label: this.$t('НСО'),
          formatter(v) {
            if (v !== null) {
              const formatter = new Intl.NumberFormat('ru');
              return formatter.format(v);
            }
            return null;
          },
        },
        {
          key: 'Активность',
          label: this.$t('Расчетный ранг'),
        },
        {
          key: 'rank_beg',
          label: this.$t('Расчетный ранг'),
        },
        {
          key: 'rank_calc',
          label: this.$t('Расчетный ранг'),
        },
      ],
      mainFields: [
        {
          key: 'Наименование',
          label: this.$t('Наименование'),
        },
        // this.$t('Наименование'),
        {
          key: 'bonus',
          label: this.$t('Бонус'),
          formatter(v) {
            if (v !== null) {
              const formatter = new Intl.NumberFormat('ru');
              return formatter.format(v);
            }
            return null;
          },
        },
      ],
      returnFields: [
        {
          key: 'agent_from',
          label: this.$t('ID партнера'),
          sortable: true,
        },
        {
          key: 'agent_from_name',
          label: this.$t('ФИО'),
          sortable: true,
        },
        {
          key: 'rankname',
          label: this.$t('Ранг'),
        },
        {
          key: 'volume',
          label: this.$t('Объем'),
          formatter(v) {
            if (v !== null) {
              const formatter = new Intl.NumberFormat('ru');
              return formatter.format(v);
            }
            return null;
          },
          sortable: true,
        },
        {
          key: 'percent',
          label: this.$t('Процент'),
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
          label: this.$t('Бонус'),
          formatter(v) {
            if (v !== null) {
              const formatter = new Intl.NumberFormat('ru');
              return formatter.format(v);
            }
            return null;
          },
          sortable: true,
        },
      ],
    };
  },
  metaInfo() {
    this.setPageTitle(`${this.$t('История начисления бонусов')}`);
    return {
      title: `${this.$t('ЛК Партнера')} - ${this.$t('История начисления бонусов')} : ${
        this.agentData.id
      } - ${this.agentData.name}`,
    };
  },
  mounted() {
    this.loading = false;
    GApi.get('/api/CalculationHistory/get').then((Response) => {
      this.topTableData = Response.data;
    });
    GApi.post('/api/Misc/get-comdte-list').then((Response) => {
      this.periods = Response.data.sort((a, b) => {
        const result = a.comdte > b.comdte ? 1 : -1;
        return result;
      });
      this.periodIndex = this.periods.length - 1;
      GApi.post('/api/CalculationHistory/get-detail', { comdte: this.currentPeriod }).then((Response2) => {
        console.log(Response2.data);
      });
    });
    // backApi.get('/agent/profile').then((Response) => {
    //   this.agentData = Response.data;
    // });
    // backApi.get('/agent/get-current-period').then((Response2) => {
    //   this.currentPeriodTop = Response2.data;
    // });
    // backApi.get('agent/bonus-detail/periods').then((Response) => {
    //   this.periods = Response.data.entries.sort((a, b) => {
    //     const result = a.comdte > b.comdte ? 1 : -1;
    //     return result;
    //   });
    //   this.periodIndex = this.periods.length - 1;
    //   backApi
    //     .get('agent/bonus-detail-new', { params: { comdte: this.currentPeriod } })
    //     .then((response) => {
    //       this.bonus = response.data.entries;
    //       // eslint-disable-next-line no-param-reassign
    //       response.data.header.period = this.currentPeriod;
    //       this.topTableData = [response.data.header];
    //     })
    //     .then(() => {
    //       setTimeout(() => {
    //         this.loading = false;
    //       });
    //     });
    // });
  },
  computed: {
    periodStatus() {
      return this.currentPeriodTop.prev_status === 'не выплачен' ? '#BD0A0A' : 'green';
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
      GApi.post('/api/CalculationHistory/get-detail', { comdte: v }).then((Response2) => {
        this.bonus = Response2.data;
      });
    },
  },
  methods: {
    ...mapActions('currentPage', ['setPageTitle']),
    downloadXls() {
      GApi
        .get('/agent/bonus-detail/excel', {
          params: {
            comdte: this.currentPeriod,
          },
          responseType: 'blob',
        })
        .then(({ data }) => {
          const filename = `${this.$t('История бонусов')}.xlsx`;
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
      GApi
        .get('/agent/bonus-detail/pdf', {
          params: {
            comdte: this.currentPeriod,
          },
          responseType: 'blob',
        })
        .then(({ data }) => {
          const filename = `${this.$t('История бонусов')}.pdf`;
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
.btn {
  border: 0 !important;
}
.cur_p {
  margin: 0;
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
.current_period {
  background-color: #ebeefa;
  padding: 16px 12px;
  display: inline-block;
  border-radius: 1px;

  & br {
    display: none;
  }
  & p {
    margin-bottom: 0;
  }
}
.btn-secondary:not(:disabled):not(.disabled):active,
.btn-secondary:not(:disabled):not(.disabled).active,
.show > .btn-secondary.dropdown-toggle {
  background-color: unset;
  outline: none;
}
.btn-secondary:not(:disabled):not(.disabled):active:focus,
.btn-secondary:not(:disabled):not(.disabled).active:focus,
.show > .btn-secondary.dropdown-toggle:focus {
  box-shadow: none;
}
</style>
<style>
.bonus_hist_table table[aria-colcount='8'] td {
  /* background: #32AAA7; */
  /* color: white !important; */
}
.bonus_hist_table table[aria-colcount='6'] {
  margin-bottom: 0;
}
.bonus_hist_table table[aria-colcount='6'] td {
  background-color: #d4d5d7;
}
.bonus_hist_table table[aria-colcount='6'] td[aria-colindex='1'] {
  width: 350px;
}
.bonus_hist_table table[aria-colcount='2'] td[aria-colindex='1'] {
  width: 350px;
}
.bonus_hist_table th[aria-colindex='1'] {
  width: 350px;
  min-width: 300px;
}
.bonus_hist_table table[aria-colcount='2'] > thead > tr > th[role='columnheader']:nth-of-type(1) {
  width: 350px;
  min-width: 300px;
}
.bonus_hist_table table[aria-colcount='2'] tr[tabindex='-1'] > td {
  padding: 0;
  /* padding-top: 10px !important; */
}
tr.b-table-has-details > td {
  background: #32aaa7;
  color: white !important;
}
</style>
