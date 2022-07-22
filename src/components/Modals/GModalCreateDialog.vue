<template>
  <div class="g_modal">
    <div class="g_modal_overlay">
      <div :class="`g_modal_content ${size}`">
        <h3 class="g_modal_content_title">
          Создание диалога
        </h3>
        <hr />
        <div class="g_modal_content_body">
          <!-- ВЫБОР АДРЕСАТА -->
          <g-radio
            label="Адресант:"
            :id="'Recipient'"
            :radios="recipient_radios"
            v-model="recipient"
          />
          <div class="mb-3 mt-3">
            <el-select v-if="recipient" style="width: 100%;" placeholder="Выбрать партнёра">
              <el-option></el-option>
            </el-select>
          </div>
          <!-- ТЕМА СООБЩЕНИЯ -->
          <g-input
            :id="'dialog_theme'"
            :placeholder="'Тема сообщения'"
            :type="'text'"
            v-model="dialog_theme"
          />
          <!-- ТЕКСТ СООБЩЕНИЯ -->
          <textarea
            class="new_message mb-3"
            name=""
            id=""
            cols="10"
            rows="5"
            placeholder="Текст сообщения"
          ></textarea>
          <!-- КНОПКИ -->
          <g-grouped-button>
            <g-button>Прикрепить документ</g-button>
            <g-button :primary="true">Создать диалог</g-button>
          </g-grouped-button>
        </div>
        <hr />
        <footer class="g_modal_content_footer">
          <g-button @click="$emit('close')">Отмена</g-button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
// import GCaption from '../Text/GCaption.vue';
import GButton from '../Forms/GButton.vue';
import GRadio from '../Forms/GRadio.vue';
// import GGroupedButton from '../Forms/GGroupedButton.vue';
import GInput from '../Forms/GInput.vue';
import GNotification from '../../mixins/Gnotifacation';
import GGroupedButton from '../Forms/GGroupedButton.vue';
// import GPhoneInput from '../Forms/GPhoneInput.vue';

export default {
  name: 'GModalCreateDialog',
  mixins: [GNotification],
  components: {
    // GCaption,
    GButton,
    GRadio,
    // GGroupedButton,
    GInput,
    GGroupedButton,
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
      dialog_theme: '',
      recipient: 0,
      recipient_radios: [
        {
          key: 1,
          label: 'Компания',
          value: 0,
        },
        {
          key: 2,
          label: 'Партнёр',
          value: 1,
        },
      ],
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
      this.showToast(
        'Редактирование телефона',
        `Код подтверждения отправлен на телефон ${this.newPhone}`,
        '',
      );
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
.new_message {
  resize: none;
  padding: 10px;
  border: 1px solid lightgray;
  width: 100%;
  margin-top: 20px;
}
</style>
