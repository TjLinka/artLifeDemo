<template>
  <div class="g_modal">
    <div class="g_modal_overlay">
      <div :class="`g_modal_content ${size}`">
        <h3 class="g_modal_content_title">
          <slot name="title">
            <!-- Title -->
          </slot>
        </h3>
        <div class="g_modal_content_body">
          <slot name="body">
            <!-- Body -->
          </slot>
        </div>
        <footer class="g_modal_content_footer">
          <slot name="footer">
            <!-- Footer -->
          </slot>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';

export default {
  name: 'GModalWait',
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
    return {};
  },
  mounted() {
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
    &.lg{
      width: calc(100% / 2);
    }
    &.md{
      width: calc(100% / 3.5);
    }
    &.sm{
      width: calc(100% / 5);
    }
    &_title {
      text-align: center;
      // border-bottom: 1px solid black;
    }
    &_body{
      // text-align: center;
      margin-top: 20px;
    }
    &_footer{
      margin-top: 20px;
    }
  }
}
</style>
