<template>
  <div class="g_modal">
    <div class="g_modal_overlay">
      <div :class="`g_modal_content ${size}`">
        <h3 class="g_modal_content_title" v-if="!inAction">
          Редактирование города
        </h3>
        <div class="g_modal_content_body" v-if="!inAction">
          <g-caption title="Текущий город" text="Мск" />
          <g-input
            class="mt-4"
            :placeholder="'Новый город'"
            :type="'text'"
            :id="'city'"
            v-model="newCity"
          />
        </div>
        <div v-else>
          <h4 style="text-align: center;">Операция выполняется...</h4>
        </div>
        <footer class="g_modal_content_footer" v-if="!inAction">
          <g-grouped-button>
            <g-button primary @click="saveCity">Сохранить</g-button>
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

export default {
  name: 'GModalEditCity',
  components: {
    GCaption,
    GButton,
    GGroupedButton,
    GInput,
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
      newCity: null,
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
    saveCity() {
      this.inAction = true;
      this.inAction = false;
      this.$emit('edit', this.newCity);
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
