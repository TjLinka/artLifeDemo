<template>
  <div class="licevoischet__page">
    <div class="container">
      <h2 class="page__title">Движение по лицевому счету</h2>
      <div>
        DATA PICKER
      </div>
      <p>
        <span class="mr-3">Печать</span>
        <span class="mr-3">Экспорт в xls</span>
        <span class="mr-3">Экспорт в pdf</span>
      </p>
      <b-table :fields="fields" :items="items" head-variant="light"> </b-table>
      <h2 class="licevoischet__page__summ">СУММА = {{ summ }}</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DvizeniePoLicevomySchety',
  data() {
    return {
      fields: [
        {
          key: 'data',
          label: 'Дата операции',
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
          key: 'comments',
          label: 'Комментарий',
          sortable: true,
        },
        {
          key: 'summ',
          label: 'Итого на лицевом счете',
          sortable: true,
        },
      ],
      items: [
        {
          data: '01.03.2020',
          naschet: '33547,9',
          type: 'Розничное вознаграждение',
          comments: 'Розничное вознаграждение',
          summ: 2334567,
        },
        {
          data: '01.03.2020',
          naschet: '33547,9',
          type: 'Розничное вознаграждение',
          comments: 'Розничное вознаграждение',
          summ: 2334567,
        },
        {
          data: '01.03.2020',
          naschet: '33547,9',
          type: 'Розничное вознаграждение',
          comments: 'Розничное вознаграждение',
          summ: 2334567,
        },
        {
          data: '01.03.2020',
          naschet: '33547,9',
          type: 'Розничное вознаграждение',
          comments: 'Розничное вознаграждение',
          summ: 2334567,
        },
        {
          data: '01.03.2020',
          naschet: '33547,9',
          type: 'Розничное вознаграждение',
          comments: 'Розничное вознаграждение',
          summ: 2334567,
        },
        {
          data: '01.03.2020',
          naschet: '33547,9',
          type: 'Розничное вознаграждение',
          comments: 'Розничное вознаграждение',
          summ: 2334567,
        },
      ],
    };
  },
  computed: {
    summ() {
      let summ = 0;
      this.items.forEach((item) => {
        summ += item.summ;
      });
      return summ;
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
}
</style>
