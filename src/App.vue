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
.el-input .el-input__clear{
  color: #32AAA7;
  margin-top: 0px;
}
.el-input .el-input__clear:hover{
  color: #32AAA7;
}
.el-input__inner{
  border: 0;
  border-bottom: 1px solid #DCDFE6;
  border-radius: 0;
  padding: 0;
}
.el-input.is-active .el-input__inner, .el-input__inner:focus{
  border-color:  #32AAA7;
}
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
/* Firefox */
input[type=number] {
  -moz-appearance:textfield;
}
.history_title{
  color: #9A9A9A;
  font-size: 13px;
}
.el-icon-arrow-left,
.el-icon-arrow-right{
  color: #32AAA7;
  cursor: pointer;
  font-weight: bold;
}
.el-icon-arrow-left{
  position: relative;
  left: -10px;
}
.el-icon-arrow-right{
  position: relative;
  right: -10px;
}
</style>
