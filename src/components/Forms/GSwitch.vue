<template>
  <div class="switch_wrapper" @click="active = !active">
    <span :style="`${!active ? 'color : black' : 'color : lightgray'}`">
      {{ not_active_value }}
    </span>
    <input
      ref="switch"
      type="checkbox"
      :id="id"
      v-model="active"
      :checked="active"
      @input="setChecked($event)"
    />
    <label @click="active = !active" :for="id" :class="`switch_icon ${active ? 'active' : ''}`" />
    <span :style="`${active ? 'color : black' : 'color : lightgray'}`">
      {{ active_value }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'GSwitch',
  props: {
    label: {
      type: String,
      default: 'Active',
    },
    id: {
      type: String,
      default: 'switch-1',
    },
    active_value: {
      type: String,
      default: 'Active',
    },
    not_active_value: {
      type: String,
      default: 'No Active',
    },
  },
  data() {
    return {
      active: false,
    };
  },
  methods: {
    setChecked(e) {
      this.$emit('input', e.target.checked);
    },
  },
};
</script>

<style lang="scss" scoped>
.switch_wrapper {
  position: relative;
  display: flex;
  // justify-content: center;
  align-items: center;
  // width: fit-content;
  cursor: pointer;
  gap: 15px;
  & > input {
    opacity: 0.6;
    display: none;
  }
  & .switch_icon {
    cursor: pointer;
    position: relative;
    display: inline-block;
    border: 1px solid rgba(187, 184, 184, 0.61);
    border-radius: 10px;
    height: 20px;
    width: 50px;
    margin: 0;
    padding: 0;
    background-color: lightgray;
    &::before {
      position: absolute;
      content: '';
      height: 20px;
      width: 20px;
      border: 1px solid transparent;
      margin-left: -1px;
      border-radius: 50%;
      top: -1px;
      background-color: rgb(255, 255, 255);
      box-shadow: 0px 0px 7px -3px black;
      transition: .3s ease-in-out;
    }
    &.active{
        background: var(--main-green);
        border-color: var(--main-green);
    }
    &.active::before {
        margin-left: 30px;
    }
  }
}
</style>
