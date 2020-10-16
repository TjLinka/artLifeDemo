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
      <b-table :fields="fields" :items="entries" head-variant="light"> </b-table>
      <h2 class="licevoischet__page__summ">СУММА = {{ summ }}</h2>
    </div>
  </div>
</template>

<script>
import backApi from '../assets/backApi';

export default {
  name: 'DvizeniePoLicevomySchety',
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
          key: 'amount',
          label: 'На счет / Со счета',
          sortable: true,
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
        {
          key: 'balance',
          label: 'Итого на лицевом счете',
          sortable: true,
        },
      ],
    };
  },
  mounted() {
    backApi.get('agent/account-detail').then((Response) => {
      console.log(Response.data.entries);
      this.entries = Response.data.entries;
      console.log(this.entries);
    });
  },
  computed: {
    summ() {
      let summ = 0;
      this.entries.forEach((item) => {
        summ += item.balance;
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
