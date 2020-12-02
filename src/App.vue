<template>
  <div id="app">
    <TheNavBarTop class="nav_top"></TheNavBarTop>
    <TheNavBar v-if="is_authorized"></TheNavBar>
    <main id="main">
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
    </main>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import TheNavBar from '@/components/TheNavBar.vue';
import TheNavBarTop from '@/components/TheNavBarTop.vue';

export default {
  components: { TheNavBar, TheNavBarTop },
  data() {
    return {};
  },
  computed: {
    ...mapState('auth', ['is_authorized', 'agentname', 'role']),
  },
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap');
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: 'Roboto', sans-serif;
}
main {
  margin-top: 40px;
  padding-bottom: 40px;
  padding-left: 120px;
}
.no_scroll {
  overflow: hidden;
}
.mobile_back{
  display: none;
  cursor: pointer;
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
.mx-input {
  border: 0;
  border-bottom: 1px solid #dee2f3;
  border-radius: 0;
  box-shadow: none !important;
}
.mx-input:hover,
.mx-input:focus {
  border-color: #dee2f3 !important;
}
.mx-calendar-content .cell.active {
  background-color: #32aaa7 !important;
}
.mx-calendar-content .cell.in-range {
  background-color: lighten($color: #32aaa7, $amount: 40%) !important;
}
.el-input .el-input__clear {
  color: #32aaa7;
  margin-top: 0px;
}
.el-input .el-input__clear:hover {
  color: #32aaa7;
}
.el-input__inner {
  border: 0;
  border-bottom: 1px solid #dcdfe6;
  border-radius: 0;
  padding: 0;
}
.el-input.is-active .el-input__inner,
.el-input__inner:focus {
  border-color: #32aaa7;
}
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
/* Firefox */
input[type='number'] {
  -moz-appearance: textfield;
}
.history_title {
  color: #9a9a9a;
  font-size: 13px;
}
.el-icon-arrow-left,
.el-icon-arrow-right {
  color: #32aaa7;
  cursor: pointer;
  font-weight: bold;
}
.el-icon-arrow-left {
  position: relative;
  left: -10px;
}
.el-icon-arrow-right {
  position: relative;
  right: -10px;
}
@media (min-width: 1920px) {
  .table_container{
    width: 100%;
    max-width: 1920px;
  }
}
@media (max-width: 800px) {
  .nav_top{
    display: none;
  }
}
@media (max-width: 540px) {
  main {
    padding-left: 0px !important;
    padding-bottom: 70px !important;
  }
  .mobile_back{
    display: inline-block;
    margin-right: 10px;
    padding: 0;
    margin: 0;
    position: relative;
    top: -1px;
  }
    .page__title {
    font-size: 20px !important;
    margin-top: -20px;
    font-weight: 400;
  }
}
.table thead th {
  vertical-align: middle;
}
.points_history_table .table th,
.table td {
  // vertical-align: middle;
}
th[role='columnheader'] {
  text-align: left !important;
  font-size: 14px;
}
td[role='cell'] {
  // text-align: left !important;
  font-size: 14px;
}
.el-table .cell {
  word-break: normal;
  // overflow: unset;
  text-overflow: unset;
  padding-left: 4px;
}
.points_history_table td[role='cell'] {
  word-break: break-word;
}
td[aria-colindex='1']{
  border: 1px solid #BABABA !important;
}
th[aria-colindex='1']{
  border: 1px solid #BABABA !important;
}
.border{
  border: 1px solid #BABABA !important;
}
.table th, .table td{
  border-top: 1px solid #BABABA !important;
  border-bottom: 1px solid #BABABA !important;
  font-weight: 600 !important;
  color: black !important;
}
.table .thead-light th{
  background: #DEE2F3;
}
</style>
