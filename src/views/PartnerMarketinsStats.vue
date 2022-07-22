<template>
  <div>
    <!-- ТАБЛИЦА ПОКАЗАТЕЛЕЙ -->
    <b-table
      bordered
      responsive
      head-variant="light"
      class="mt-3"
      :fields="topTableFields"
    ></b-table>
  </div>
</template>

<script>

export default {
  name: 'PartnerMarketinsStats',
  components: {
  },
  data() {
    return {
      topTableFields: [
        {
          key: 'lo',
          label: 'ЛО',
        },
        {
          key: 'go',
          label: 'ГО',
        },
        {
          key: 'so',
          label: 'СО',
        },
        {
          key: 'nso',
          label: 'НСО',
        },
        {
          key: 'activity',
          label: 'Активность',
        },
        {
          key: 'rank_beg',
          label: 'Ранг на начало',
        },
        {
          key: 'rank_end',
          label: 'Ранг на конец',
        },
      ],
    };
  },
  computed: {
  },
};
</script>

<style lang="scss" scoped>
.colapse_btn {
  color: var(--main-green);
  font-size: 18px;
  cursor: pointer;
  margin-left: 20px;
}
</style>
