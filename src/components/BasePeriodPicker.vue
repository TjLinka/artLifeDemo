<template>
  <div>
    <i class="arrow_left"  @click="$emit('next-period', -1)"></i>
    <span>
      {{ months[new Date(currentPeriod).getMonth()] }}
      {{ new Date(currentPeriod).getFullYear() }}
    </span>
    <!-- <span></span> -->
    <i class="arrow_right" @click="$emit('next-period', 1)"></i>
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
<style scoped>
.arrow_left,
.arrow_right{
  display: inline-block;
  background-repeat: no-repeat;
  /* background-size: contain; */
  background-position: center;
  width: 12px;
  height: 12px;
  cursor: pointer;
}
.arrow_left{
    background-image: url('../assets/imgs/arrow_left.svg');
    margin-right: 15px;
}
.arrow_right{
    background-image: url('../assets/imgs/arrow_right.svg');
    margin-left: 15px;
}
</style>
