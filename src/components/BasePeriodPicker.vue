<template>
  <div>
    <i class="mr-1 el-icon-arrow-left" @click="$emit('next-period', -1)"></i>
    <span>{{ months[new Date(currentPeriod).getMonth()] }} </span>
    <span>{{ new Date(currentPeriod).getFullYear() }}</span>
    <i class="ml-1 el-icon-arrow-right" @click="$emit('next-period', 1)"></i>
  </div>
</template>

<script>
export default {
  name: 'BasePeriodPicker',
  props: ['currentPeriod'],
  data() {
    return {
      months: [
        'Январь',
        'Ферваль',
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
    };
  },
  methods: {
    nextPeriod(x) {
      this.period_enabled = true;
      this.periodIndex = (this.periodIndex + this.periods.length + x) % this.periods.length;
    },
  },
};
</script>

<style></style>
