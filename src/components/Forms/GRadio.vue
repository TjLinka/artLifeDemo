<template>
  <div class="g_radio">
    <p v-show="label" class="g_radio_label">
      {{label}}
    </p>
    <b-form-group>
      <b-form-radio-group :id="id" :checked="value" :name="id" @change="qq">
        <b-form-radio v-for="radio in radios" :key="radio.key" :value="radio.value">
          {{ radio.label }}
        </b-form-radio>
      </b-form-radio-group>
    </b-form-group>
  </div>
</template>

<script>
export default {
  name: 'GRadio',
  props: ['id', 'radios', 'value', 'label'],
  data() {
    return {};
  },
  methods: {
    qq(val) {
      this.$emit('input', val);
    },
  },
};
</script>
<style lang="scss" scoped>
.g_radio{
  &_label{
    padding: 0;
    margin-bottom: 5px;
    font-weight: bold;
  }
}
</style>
