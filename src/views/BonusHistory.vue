<template>
  <div class="licevoischet__page">
    <div class="container">
      <h2 class="page__title">История бонусов(КЕ)</h2>
      <div class="row">
        <div class="col-2 perioad__picker">
          <span
            class="mr-1"
            @click="periodIndex = periodIndex - 1 >= 0 ? periodIndex - 1 : periods.length - 1"
          >
            &lt;</span
          >
          <span>{{ currentPeriod.slice(0, -3) }}</span>
          <span class="ml-1" @click="periodIndex = (periodIndex + 1) % periods.length"> &gt;</span>
        </div>
      </div>
      <p class="exp_print">
        <span class="mr-3">Печать</span>
        <span class="mr-3">Экспорт в xls</span>
        <span class="mr-3">Экспорт в pdf</span>
      </p>
      <b-table :fields="topFields" :items="testDataTopTable" head-variant="light"></b-table>
      <b-table :fields="mainFields" :items="bonus" head-variant="light">
        <template v-slot:cell(show_details)="row">
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
      bonus: [],
      returnItems: [],
      testDataTopTable: [
        {
          period: '2020 Февраль',
          bonusAll: 200,
          lo: 10,
          go: 15,
          ngo: 2,
          oo: 10,
          ko: 2000,
          rank: 'Директор',
        },
      ],
      topFields: [
        {
          key: 'period',
          label: 'Период',
        },
        {
          key: 'bonusAll',
          label: 'Бонусов всего',
        },
        {
          key: 'lo',
          label: 'ЛО',
        },
        {
          key: 'go',
          label: 'ГО',
        },
        {
          key: 'ngo',
          label: 'НГО',
        },
        {
          key: 'oo',
          label: 'ОО',
        },
        {
          key: 'ko',
          label: 'КО',
        },
        {
          key: 'rank',
          label: 'Расчетный ранг ',
        },
      ],
      mainFields: [
        'show_details',
        {
          key: 'bonusname',
          label: 'Наименование бонуса',
        },
        {
          key: 'sum',
          label: 'Бонус',
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
          this.bonus = response.data;
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
        this.bonus = response.data;
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
