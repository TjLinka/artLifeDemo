<template>
  <div class="input_wrapper_phone">
    <phone-mask-input
    v-model="phone"
    autoDetectCountry
    showFlag
    placeholder="Телефон в международном формате"
    wrapperClass="wrraper-example"
    inputClass="input-example"
    flagClass="flag-example"
    />
  </div>
</template>

<script>
import PhoneMaskInput from 'vue-phone-mask-input';

export default {
  name: 'GPhoneInput',
  props: ['value'],
  data() {
    return {
      phone: this.value,
    };
  },
  mounted() {
    setTimeout(() => {
      document.querySelector('.input-example').blur();
    }, 10);
  },
  watch: {
    phone() {
      console.log('watch');
      this.$emit('input', this.phone);
    },
  },
  components: {
    PhoneMaskInput,
  },
};
</script>
<style lang="scss">
.input_wrapper_phone {
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
.flag {
  position: absolute;
  right: 0px;
  transform: translate(0, -50%);
  color: var(--main-green);
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
}
</style>
