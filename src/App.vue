<template>
  <div id="app">
    <TheNavBar></TheNavBar>
    <main>
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
    </main>
  </div>
</template>

<script>
import TheNavBar from '@/components/TheNavBar.vue';

export default {
  components: { TheNavBar },
  data() {
    return {};
  },
};
</script>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
main {
  margin-top: 40px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}
.mx-datepicker svg {
  color: #32aaa7;
}
.mx-input{
  border: 0;
  border-bottom: 1px solid #DEE2F3;
  border-radius: 0;
  box-shadow: none !important;
}
.mx-input:hover, .mx-input:focus{
  border-color: #DEE2F3 !important;
}
.mx-calendar-content .cell.active{
  background-color: #32aaa7 !important;
}
.mx-calendar-content .cell.in-range{
  background-color: lighten($color:#32aaa7, $amount: 40%) !important;
}
</style>
