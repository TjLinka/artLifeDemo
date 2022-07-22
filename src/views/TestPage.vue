<template>
  <div class="container">
    <!-- <g-period :currentPeriod="currentPeriod" @next="next" @prev="prev" /> -->
  </div>
</template>

<script>
import GApi from '../assets/backApi';

export default {
  components: {
  },
  name: 'TestPage',
  data() {
    return {
      currentPeriodIndex: 0,
      periods: [],
    };
  },
  mounted() {
    GApi.get('/agent/bonus-detail/periods').then(res => {
      res.data.entries.sort((a, b) => (a.comdte > b.comdte ? 1 : -1));
      this.periods = res.data.entries;
      this.currentPeriodIndex = this.periods.length - 1;
    });
  },
  methods: {
    prev() {
      this.currentPeriodIndex = (this.currentPeriodIndex + this.periods.length - 1) % this.periods.length;
    },
    next() {
      this.currentPeriodIndex = (this.currentPeriodIndex + this.periods.length + 1) % this.periods.length;
    },
  },
  computed: {
    currentPeriod() {
      return this.periods[this.currentPeriodIndex] ? this.periods[this.currentPeriodIndex].comdte : new Date().toLocaleDateString();
    },
  },
};
</script>
<style lang="scss" scoped>
table {
  width: 100%;
}
</style>
