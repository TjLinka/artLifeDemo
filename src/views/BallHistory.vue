<template>
  <div class="licevoischet__page">
    <div class="container">
      <h2 class="page__title">История баллов</h2>
      <div>
        DATA PICKER
      </div>
      <p class="exp_print">
        <span class="mr-3">Печать</span>
        <span class="mr-3">Экспорт в xls</span>
        <span class="mr-3">Экспорт в pdf</span>
      </p>
      <b-table :fields="fields" :items="entries" head-variant="light"> </b-table>
      <h2 class="licevoischet__page__summ">ЛО = {{ lo }} РЕЗЕРВ = {{ res }}</h2>
    </div>
  </div>
</template>

<script>
import backApi from '../assets/backApi';

export default {
  name: 'BallHistory',
  data() {
    return {
      entries: [],
      fields: [
        {
          key: 'dte',
          label: 'Дата операции',
          sortable: true,
        },
        {
          key: 'comdte',
          label: 'Период',
          sortable: true,
        },
        {
          key: 'income',
          label: 'На счёт',
          sortable: true,
        },
        {
          key: 'outcome',
          label: 'Со счёта',
          sortable: true,
        },
        {
          key: 'opertype',
          label: 'Тип операции',
          sortable: true,
        },
        {
          key: 'pointstype',
          label: 'Тип баллов',
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
    backApi.get('/agent/points-detail').then((Response) => {
      this.entries = Response.data.entries;
    });
  },
  computed: {},
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
}
</style>
