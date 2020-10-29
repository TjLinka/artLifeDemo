<template>
  <div class="licevoischet__page">
    <div class="container">
      <h2 class="page__title">История бонусов(КЕ)</h2>
      <div class="row">
        <div class="col-6 perioad__picker">
          <i
          class="mr-1 el-icon-arrow-left"
          @click="periodIndex = periodIndex - 1 >= 0 ? periodIndex - 1 : periods.length - 1">
          </i>
          <span>{{ months[new Date(currentPeriod).getMonth()] }} </span>
          <span>{{ new Date(currentPeriod).getFullYear() }}</span>
          <i class="ml-1 el-icon-arrow-right"
          @click="periodIndex = (periodIndex + 1) % periods.length"></i>
        </div>
      </div>
      <p class="exp_print">
        <span class="mr-3">Печать</span>
        <span class="mr-3">Экспорт в xls</span>
        <span class="mr-3">Экспорт в pdf</span>
      </p>
      <b-table :fields="topFields " :items="topTableData" head-variant="light"
      responsive class="bonus_history_table">
          <template #cell(period)="data">
            <p>{{ data.value }}</p>
          </template>
      </b-table>
      <b-table :fields="mainFields" :items="bonus" head-variant="light" responsive>
        <template v-slot:cell(Детали)="row">
          <b-button size="sm" @click="row.toggleDetails" class="mr-2">
            {{ row.detailsShowing ? '-' : '+' }}
          </b-button>
        </template>
        <template v-slot:row-details="row">
          <b-table :fields="returnFields" :items="row.item.detail" head-variant="light"> </b-table>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
// import DatePicker from 'vue2-datepicker';
import backApi from '../assets/backApi';

export default {
  name: 'BonusHistory',
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
              return v.toFixed(2);
            }
            return null;
          },
        },
        {
          key: 'lo',
          label: 'ЛО',
          formatter(v) {
            if (v !== null) {
              return v.toFixed(2);
            }
            return null;
          },
        },
        {
          key: 'go',
          label: 'ГО',
          formatter(v) {
            if (v !== null) {
              return v.toFixed(2);
            }
            return null;
          },
        },
        {
          key: 'ngo',
          label: 'НГО',
          formatter(v) {
            if (v !== null) {
              return v.toFixed(2);
            }
            return null;
          },
        },
        {
          key: 'oo',
          label: 'ОО',
          formatter(v) {
            if (v !== null) {
              return v.toFixed(2);
            }
            return null;
          },
        },
        {
          key: 'ko',
          label: 'КО',
          formatter(v) {
            if (v !== null) {
              return v.toFixed(2);
            }
            return null;
          },
        },
        {
          key: 'rank',
          label: 'Расчетный ранг ',
        },
      ],
      mainFields: [
        'Детали',
        {
          key: 'bonusname',
          label: 'Наименование бонуса',
        },
        {
          key: 'sum',
          label: 'Бонус',
          formatter(v) {
            if (v !== null) {
              return v.toFixed(2);
            }
            return null;
          },
        },
      ],
      returnFields: [
        {
          key: 'agent_from_name',
          label: 'ФИО',
        },
        {
          key: 'agent_from',
          label: 'Номер агента',
        },
        {
          key: 'rankname',
          label: 'Ранг',
        },
        {
          key: 'volume',
          label: 'Объем',
        },
        {
          key: 'percent',
          label: 'Процент',
          formatter(v) {
            if (v !== null) {
              return v.toFixed(2);
            }
            return null;
          },
        },
        {
          key: 'bonus_value',
          label: 'Бонус',
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
  methods: {},
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
</style>
