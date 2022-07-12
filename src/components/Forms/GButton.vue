<template>
  <div :class="`${center ? 'center' : ''}`" style="width:100%;">
    <button
      :class="`gbutton ${primary ? 'primary' : ''} ${disabled ? 'disabled' : ''}`"
      @click.stop="$emit('click')"
      :style="{ width: width ? width : '' }"
      :disabled="disabled"
    >
      <slot>
        Кнопка
      </slot>
    </button>
  </div>
</template>

<script>
export default {
  name: 'GButton',
  props: {
    center: Boolean,
    primary: Boolean,
    disabled: Boolean,
    width: String,
  },
  data() {
    return {};
  },
};
</script>
<style lang="scss" scoped>
.gbutton {
  background: none;
  border: 1px solid var(--main-green);
  width: 100%;
  padding: 5px 10px;
  min-width: fit-content;
  color: var(--main-green);
  letter-spacing: 0.5px;
  &.primary {
    background: var(--main-green);
    color: #fff;
  }
  &.disabled {
    cursor: not-allowed;
    border-color: var(--btn-gray);
    color: var(--btn-disabled-text);
    background: var(--btn-disabled);
  }
}
.center {
  text-align: center;
}
</style>
