<template>
  <div class="g_count">
    <div class="g_count_minus" @click="decrCount(id)">-</div>
    <div class="g_count_count">
      <input type="number" :value="count" @change="changeCount" />
    </div>
    <div class="g_count_plus" @click="incrCount(id)">+</div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  props: ['count', 'id'],
  methods: {
    ...mapActions('cart', ['decrCount', 'incrCount', 'manualChangeCount']),
    changeCount(e) {
      this.manualChangeCount({ id: this.id, count: Number(e.target.value) });
    },
  },
};
</script>

<style lang="scss" scoped>
.g_count {
  height: 36px;
  width: 90px;
  display: flex;
  align-items: center;
  border: 1px solid lightgray;
  &_minus,
  &_plus {
    text-align: center;
    font-weight: bold;
    cursor: pointer;
  }
  &_minus {
    width: 25px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &_plus {
    width: 25px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &_count {
    width: 40px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-left: 1px solid lightgray;
    border-right: 1px solid lightgray;
    & input {
      width: 100%;
      outline: none;
      border: 0;
      text-align: center;
    }
  }
}
</style>
