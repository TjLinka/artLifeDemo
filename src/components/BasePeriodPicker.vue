<template>
  <div class="date_picker_comp">
    <i class="arrow_left"  @click="$emit('next-period', -1)"></i>
    <span class="date_show" v-if="currentPeriod">
      <!-- <i class="arrow_left"  @click="$emit('next-period', -1)"></i> -->
      {{ months[new Date(currentPeriod).getMonth()] }}
      {{ new Date(currentPeriod).getFullYear() }}
      <!-- <i class="arrow_right" @click="$emit('next-period', 1)"></i> -->
    </span>
    <span class="date_show" v-else>
      <!-- <i class="arrow_left"  @click="$emit('next-period', -1)"></i> -->
      <!-- <i class="arrow_right" @click="$emit('next-period', 1)"></i> -->
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
        'Февраль',
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
};
</script>
<style scoped>
.date_picker_comp{
  position: relative;
  /* display: inline-block; */
}
.date_show{
  /* position: relative; */
  margin-left: 45px;
  min-width: 120px;
  display: inline-block;
  text-align: center;
}
.arrow_left,
.arrow_right{
  position: absolute;
  display: inline;
  background-repeat: no-repeat;
  /* background-size: contain; */
  background-position: center;
  width: 12px;
  height: 12px;
  top: 5px;
  cursor: pointer;
}
.arrow_left{
    background-image: url('../assets/imgs/arrow_left.svg');
    left: 0px;
}
.arrow_right{
    background-image: url('../assets/imgs/arrow_right.svg');
    left: 190px;
}
@media (max-width: 525px) {
  .period_picker{
    display: block;
    text-align: center;
  }
  .period_picker .date_show{
    margin-left: 0;
  }
  .arrow_left{
      background-image: url('../assets/imgs/arrow_left.svg');
      left: 0px;
  }
  .arrow_right{
      background-image: url('../assets/imgs/arrow_right.svg');
      right: 0px;
      left: unset;
  }
}
@media (max-width: 320px) {
  .arrow_left{
      background-image: url('../assets/imgs/arrow_left.svg');
      left: 0px;
  }
  .arrow_right{
      background-image: url('../assets/imgs/arrow_right.svg');
      right: 0px;
      left: unset;
  }
}
</style>
