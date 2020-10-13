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
      <b-table :fields="fields" :items="items" head-variant="light"> </b-table>
      <h2 class="licevoischet__page__summ">ЛО = {{ lo }} РЕЗЕРВ = {{ res }}</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BallHistory',
  data() {
    return {
      fields: [
        {
          key: 'data',
          label: 'Дата операции',
          sortable: true,
        },
        {
          key: 'period',
          label: 'Период',
          sortable: true,
        },
        {
          key: 'naschet',
          label: 'На счет',
          sortable: true,
        },
        {
          key: 'soschet',
          label: 'Со счета',
          sortable: true,
        },
        {
          key: 'type',
          label: 'Тип операции',
          sortable: true,
        },
        {
          key: 'ball_type',
          label: 'Тип баллов',
          sortable: true,
        },
        {
          key: 'comments',
          label: 'Комментарий',
          sortable: true,
        },
      ],
      items: [
        {
          data: '01.03.2020',
          period: 'Март 2020',
          naschet: '33547,9',
          soschet: '31316,1',
          ball_type: 'Баллы Резерва',
          type: 'Трансферт баллов в МП',
          comments: 'Розничное вознаграждение',
        },
        {
          data: '01.03.2020',
          period: 'Март 2020',
          naschet: '33547,9',
          soschet: '31316,1',
          ball_type: 'Баллы Резерва',
          type: 'Трансферт баллов в МП',
          comments: 'Розничное вознаграждение',
        },
        {
          data: '01.03.2020',
          period: 'Март 2020',
          naschet: '33547,9',
          soschet: '31316,1',
          ball_type: 'Баллы Резерва',
          type: 'Трансферт баллов в МП',
          comments: 'Розничное вознаграждение',
        },
        {
          data: '01.03.2020',
          period: 'Март 2020',
          naschet: '33547,9',
          soschet: '31316,1',
          ball_type: 'Баллы Резерва',
          type: 'Трансферт баллов в МП',
          comments: 'Розничное вознаграждение',
        },
        {
          data: '01.03.2020',
          period: 'Март 2020',
          naschet: '33547,9',
          soschet: '31316,1',
          ball_type: 'Баллы Резерва',
          type: 'Трансферт баллов в МП',
          comments: 'Розничное вознаграждение',
        },
        {
          data: '01.03.2020',
          period: 'Март 2020',
          naschet: '33547,9',
          soschet: '31316,1',
          ball_type: 'Баллы Резерва',
          type: 'Трансферт баллов в МП',
          comments: 'Розничное вознаграждение',
        },
        {
          data: '01.03.2020',
          period: 'Март 2020',
          naschet: '33547,9',
          soschet: '31316,1',
          ball_type: 'Баллы Резерва',
          type: 'Трансферт баллов в МП',
          comments: 'Розничное вознаграждение',
        },
      ],
    };
  },
  computed: {
    lo() {
      return 200;
    },
    res() {
      return 100;
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
}
</style>
