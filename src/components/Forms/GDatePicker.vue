<template>
  <date-picker
    v-model="bthdte"
    @change="qq"
    value-type="YYYY-MM-DD"
    format="DD.MM.YYYY"
    type="date"
    :placeholder="`${$t('Дата рождения')}`"
    style="width: 100%"
    range-separator=" - "
  ></date-picker>
</template>

<script>
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import 'vue2-datepicker/locale/ru';

export default {
  name: 'GDatePicker',
  components: {
    DatePicker,
  },
  data() {
    return {
      bthdte: null,
    };
  },
  mounted() {
    document.querySelector('input.mx-input').classList.add('small_placeholder');
  },
  methods: {
    qq(val) {
      this.$emit('input', val);
    },
  },
};
</script>
