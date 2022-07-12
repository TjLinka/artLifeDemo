<template>
  <footer class="container-fluid g_footer">
    <div class="container-md">
      <slot name="header"></slot>
      <div :class="`g_footer_inner ${show ? 'open' : ''}`">
      <slot name="form"></slot>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'GFooter',
  props: {
    show: {
      type: Boolean,
    },
  },
};
</script>

<style lang="scss" scoped>
.g_footer {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  padding-left: 120px;
  padding-bottom: 20px;
  max-height: 100%;
  box-sizing: border-box;
  background: #ffffff;
  box-shadow: 0px 4px 12px 2px rgba(0, 0, 0, 0.24);
  &_inner.open {
    padding: 20px 0px;
    position: relative;
    &_title {
      position: relative;
    }
  }
}
h3{
    position: relative;
    margin: 0;
    margin-top: 20px;
}
.close_btn {
  background-image: url('../assets/imgs/close_btn.svg');
  background-repeat: no-repeat;
  background-size: 80%;
  background-position: center;
  width: 20px;
  height: 20px;
  display: inline-block;
  position: absolute;
  right: 0;
  top: 0;
  cursor: pointer;
}
.search__btn {
    padding-top: 20px;
    cursor: pointer;
    text-transform: uppercase;
    font-weight: bold;
    & .search_icon {
      color: #32aaa7;
    }
  }
</style>
