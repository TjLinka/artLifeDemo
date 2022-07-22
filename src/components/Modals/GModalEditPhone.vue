<template>
  <div class="g_modal">
    <div class="g_modal_overlay">
      <div :class="`g_modal_content ${size}`">
        <h3 class="g_modal_content_title">
          Редактирование телефона
        </h3>
        <div class="g_modal_content_body">
          <g-caption v-if="!changePhoneStep" title="Текущий телефон" text="8-(888)-888-88-88" />
          <g-phone-input v-if="!changePhoneStep" v-model="newPhone"  class="mt-3"/>
          <g-input v-if="changePhoneStep === 1" class="mt-4" :placeholder="'Код подтверждения'" :type="'text'" :id="'code'" v-model="code"/>
        </div>
        <footer class="g_modal_content_footer">
          <g-grouped-button>
            <g-button v-if="!changePhoneStep" :disabled="!newPhone" primary @click="sendCode">Отправить код подтверждения</g-button>
            <g-button v-if="changePhoneStep === 1" primary @click="checkCode">Подтвердить код</g-button>
            <g-button @click="$emit('close')">Отмена</g-button>
          </g-grouped-button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import GCaption from '../Text/GCaption.vue';
import GButton from '../Forms/GButton.vue';
import GGroupedButton from '../Forms/GGroupedButton.vue';
import GInput from '../Forms/GInput.vue';
import GNotification from '../../mixins/Gnotifacation';
import GPhoneInput from '../Forms/GPhoneInput.vue';

export default {
  name: 'GModalEditPhone',
  mixins: [GNotification],
  components: {
    GCaption,
    GButton,
    GGroupedButton,
    GInput,
    GPhoneInput,
  },
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
    noCloseByClick: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: 'md',
    },
  },
  data() {
    return {
      inAction: false,
      newPhone: null,
      code: '',
      changePhoneStep: 0,
    };
  },
  mounted() {
    console.log('3123113');
    if (!this.noCloseByClick) {
      console.log('1');
      document.addEventListener('click', this.closeModal);
    }
  },
  beforeDestroy() {
    document.removeEventListener('click', this.closeModal);
  },
  methods: {
    closeModal(e) {
      if ($(e.target).hasClass('g_modal_overlay')) {
        this.$emit('close');
      }
    },
    sendCode() {
      this.changePhoneStep = 1;
      this.showToast('Редактирование телефона', `Код подтверждения отправлен на телефон ${this.newPhone}`, '');
    },
    checkCode() {
      this.$emit('edit');
    },
  },
};
</script>

<style lang="scss" scoped>
.g_modal {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  z-index: 100;
  &_overlay {
    width: 100%;
    height: 100vh;
    background: rgba(39, 39, 39, 0.644);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &_content {
    width: calc(100% / 3);
    height: auto;
    background-color: white;
    padding: 10px 20px;
    h4 {
      margin: 0;
      padding: 40px;
    }
    &.lg {
      width: calc(100% / 2);
      min-width: 500px;
    }
    &.md {
      width: calc(100% / 3.5);
      min-width: 500px;
    }
    &.sm {
      width: calc(100% / 5);
      min-width: 500px;
    }
    &_title {
      text-align: center;
      // border-bottom: 1px solid black;
    }
    &_body {
      // text-align: center;
      margin-top: 20px;
    }
    &_footer {
      margin-top: 20px;
    }
  }
}
</style>
