<template>
  <div class="counter_wrapper">
    <div class="counter">
      <div class="decr">
        <button @click="count--">-</button>
      </div>
      <div class="counter_value">
        {{ count }}
      </div>
      <div class="incr">
        <button @click="count++">+</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Counter',
  data() {
    return {
      count: 1,
    };
  },
};
</script>

<style lang="scss" scoped>
.counter_wrapper {
  display: inline-block;
  //   border: 1px solid black;
  & .counter {
    display: flex;
    align-items: center;
    gap: 30px;
    & .decr button,
    & .incr button{
      border-radius: 50%;
      width: 27px;
      height: 27px;
      display: flex;
      font-size: 18px;
      justify-content: center;
      align-items: center;
      border: 1px solid black;
      font-weight: bold;
      cursor: pointer;
      &:active{
        transform: scale(.95);
      }
    }
  }
}
.decr button{
}
</style>
