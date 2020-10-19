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
.navbar {
  background-color: #32aaa7 !important;
  // height: 70px;
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
</style>
