<template>
  <div :class="`input_wrapper`">
    <input
      :type="type"
      :name="id"
      :id="id"
      :ref="id"
      :value="value"
      @input="$emit('input', $event.target.value)"
      autocomplete="off"
    />
    <label :for="id" :class="value ? 'up' : ''">
      {{ placeholder }}
    </label>
    <span v-show="value" @click="$emit('input', '')" class="g_close_icon"></span>
  </div>
</template>

<script>
export default {
  name: 'GInput',
  props: {
    type: String,
    id: String,
    placeholder: {
      type: String,
      default: 'Placeholder',
    },
    value: String,
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
.input_wrapper {
  position: relative;
  width: 100%;
  &.error {
    border: 0;
    border-bottom: 1px solid red;
  }
  & input {
    width: 100%;
    height: 100%;
    position: relative;
    border: 0;
    padding: 6px 0px;
    border-bottom: 1px solid var(--input-gray);
    outline: none;
    background: transparent;
    &:focus ~ label {
      font-size: 14px;
      top: -14px;
      left: 0px;
    }
    &:hover {
      border-bottom: 1px solid black;
    }
  }
  & .g_close_icon {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translate(0, -50%);
    color: var(--main-green);
    font-weight: 600;
    font-size: 16px;
    cursor: pointer;
    width: 13px;
    height: 13px;
    background: url('../../assets/imgs/close_btn.svg') no-repeat;
    background-size: contain;
  }
  & label {
    margin: 0;
    padding: 0;
    position: absolute;
    font-size: 16px;
    color: var(--label-gray);
    left: 0;
    top: 10px;
    transition: 0.15s ease-in-out;
    &.up {
      font-size: 14px;
      top: -14px;
      left: 0px;
    }
  }
}
</style>
