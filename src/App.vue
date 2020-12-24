<template>
  <div id="app">
    <TheNavBarTop class="nav_top"></TheNavBarTop>
    <TheNavBar v-show="is_authorized"></TheNavBar>
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
@font-face {
  font-family: 'FuturaPTDemi';
  src: url('/fonts/futura_pt_demi.eot'); /* IE9 Compat Modes */
  src: url('/fonts/futura_pt_demi.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
       url('/fonts/futura_pt_demi.woff2') format('woff2'), /* Super Modern Browsers */
       url('/fonts/futura_pt_demi.woff') format('woff'), /* Pretty Modern Browsers */
       url('/fonts/futura_pt_demi.ttf')  format('truetype'), /* Safari, Android, iOS */
       url('/fonts/futura_pt_demi.svg#svgFontName') format('svg'); /* Legacy iOS */
}
@font-face {
font-family: 'Futura PT Book';
src: url('/fonts/FuturaPT-Book.eot');
src: url('/fonts/FuturaPT-Book.eot?#iefix') format('embedded-opentype'),
url('/fonts/FuturaPT-Book.woff') format('woff'),
url('/fonts/FuturaPT-Book.ttf') format('truetype');
}
// ТЕСТОВЫЙ СТИЛЬ ДЛЯ CONTAINER
@media (min-width: 1200px) {
  .container, .container-sm, .container-md, .container-lg, .container-xl{
    max-width: 1920px;
  }
}
::-webkit-scrollbar {
    width: 8px; /* ширина нового скроллбара */
}
::-webkit-scrollbar-track {
    // background: #afafaf; /* цвет фона у дорожки */
    box-shadow: 0 0 2px rgba(0, 0, 0, .2) inset; /* тень у дорожки */
}
 ::-webkit-scrollbar-thumb {
    background:#afafaf; /* цвет фона у дорожки */
    border-radius: 8px; /* скругление углов */
    // border: 3px solid #f5cdcd; /* толщина, стиль и цвет рамки */
}

::-webkit-scrollbar-thumb:hover {
    background: #727272; /* ползунок меняет цвет при наведении */
}
.el-scrollbar__thumb{
  background-color: #afafaf;
}
.dropdown-toggle::after{
  content: none;
}
.el-table [class*=el-table__row--level] .el-table__expand-icon{
  margin-right: 0;
}
.auth_switch .el-switch__label{
  font-family: 'FuturaPTDemi';
  color: #9A9A9A;
  &:nth-of-type(1){
    margin-right: 40px;
  }
  &:nth-of-type(3){
    margin-left: 40px;
  }
  &.is-active{
    color: black;
  }
}
.el-switch.is-checked .el-switch__core{
  background-color: #DCDFE6;
  border-color: #DCDFE6;
}
.end{
  align-items: flex-end;
  position: relative;
}
.custom_label{
  position: absolute;
  top: -15px;
  left: 19px;
  z-index: 10;
}
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  outline: none !important;
}
h1, h2, h3, h4{
  font-family: 'FuturaPTDemi';
}
p, a, div{
  font-family: 'Futura PT Book';
}
button:focus{
  outline: none;
}
input[type='radio']{
  outline: none !important;
}
// СТИЛИЯ ЯЧЕЕК EL-TABLE
.el-table td, .el-table th{
  vertical-align: top;
}
// СТИЛИ ДЛЯ RADIO КНОПОК
.custom-radio label{
  font-family: 'FuturaPTDemi';
  font-size: 14px;
}
.custom-radio .custom-control-input:checked ~ .custom-control-label::before{
    color: #fff;
    border: 2px solid black;
    border-color: #32aaa7;
    background-color: white;
    box-shadow: none;
}
.custom-radio .custom-control-input:checked ~ .custom-control-label::after{
  background: #32aaa7 !important;
}
.custom-radio .custom-control-label::after{
    position: absolute;
    top: 7.8px;
    left: -1.25rem;
    display: block;
    border-radius: 50%;
    width: 8px;
    background: white;
    height: 8px;
    content: "";
    background: no-repeat 50% / 50% 50%;
}
.custom-control-input{
  outline: none;
}
// КОНЕЦ СТИЛЕЙ ДЛЯ RADIO КНОПОК

// СТИЛИ ДЛЯ CHECKBOX
.custom-checkbox label{
  font-family: 'FuturaPTDemi';
  font-size: 14px;
}
.custom-checkbox .custom-control-input:checked ~ .custom-control-label::before{
    color: #fff;
    border: 2px solid black;
    border-color: #32aaa7;
    // background-color: white;
    box-shadow: none;
}
.custom-checkbox .custom-control-input:checked ~ .custom-control-label::after{
  background-color: #32aaa7 !important;
  border: none;
}
.custom-control-input{
  outline: none;
}
.custom-checkbox .custom-control-label::after{
  border-radius: 2px;
  border: 2px solid #DEE2F3;
}
input[type="checkbox"]{
  box-shadow: none;
}
.custom-control-input:focus ~ .custom-control-label::before{
  box-shadow: none !important;
}
.custom-control-input:focus:not(:checked) ~ .custom-control-label::before{
  border-color: #DEE2F3;
}
.custom-control-input:not(:disabled):active ~ .custom-control-label::before{
  background-color: #DEE2F3;
}
// КОНЕЦ СТИЛЕЙ ДЛЯ RADIO КНОПОК

main {
  margin-top: 40px;
  padding-bottom: 70px;
  padding-left: 120px;
}

// СТИЛИ ДЛЯ ЗАГОЛОВКА СТРАНИЦЫ
.page__title {
  color: #383a41;
  font-size: 32px;
}
// СТИЛИ ДЛЯ ЗАГОЛОВКА РАЗДЕЛА СТРАНИЦЫ
.page__caption{
  font-size: 20px;
  font-weight: 500;
}
// СТИЛИ ДЛЯ ЗАГОЛОВКА МОДАЛКИ
.modal_title{
  position: relative;
  font-size: 24px;
}
// КАСТОМНЫЕ INPUT'S
.custom_input {
  position: relative;
  span {
    display: none;
    position: absolute;
    right: 12px;
    top: 12px;
    color: #32aaa7;
    cursor: pointer;
  }
  label {
    position: absolute;
    top: 5px;
    left: 20px;
    transition: 0.15s ease-in-out;
    color: #9a9a9a;
    font-size: 16px;
    z-index: 10;
  }
  input {
    width: 100%;
    border: 0;
    height: 35px;
    border-radius: 0;
    border-bottom: 1px solid #dee2f3;
    outline: none;
    padding-left: 5px;
    font-size: 16px;
    &:hover{
      border-bottom-color: #46474b;
    }
    &:hover ~ label{
      color: #46474b;
    }
    &:focus ~ label,
    &:valid ~ label {
      font-size: 13px;
      top: -13px;
    }
    &:valid ~ span {
      display: block;
    }
  }
}
.el-input__inner{
  padding-left: 5px !important;
}
.el-input__inner:hover{
  transition: none;
  border-bottom-color: #46474b !important;
  &::placeholder{
    color: #46474b;
  }
}
// СТИЛИ ИКОНКИ ОЧИСТКИ INPUT'ов
.clear_icon{
  position: relative;
  background-image: url('assets/imgs/close_btn.svg');
  background-repeat: no-repeat;
  background-size: 55%;
  background-position: center;
  width: 20px;
  height: 20px;
}
.sr-only{
  display: none;
}
.close_btn{
  background-image: url('assets/imgs/close_btn.svg');
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
// СТИЛЬ КНОПКИ ОЧИСТИ el-input
.el-icon-circle-close:before{
  position: relative;
  content: ' ';
  display: block;
  background-image: url('assets/imgs/close_btn.svg');
  background-repeat: no-repeat;
  background-size: 85%;
  width: 13px;
  height: 13px;
  top: 5px;
  right: 2px;
}
.no_scroll {
  overflow: hidden;
}
.mobile_back{
  display: none;
  cursor: pointer;
  padding: 0;
  margin: 0;
  position: relative;
  top: -1px;
    & svg{
      margin-right: 20px;
    }
}

// АНИМАЦИЯ ПЕРЕХОДА МЕЖДУ СТРАНИЦАМИ
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}

// СТИЛИ ДЛЯ КАЛЕНДАРА И ВЫБОРА ПЕРИОДА
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
// КОНЕЦ СТИЛЕЙ ДЛЯ КАЛЕНДАРЯ И ПЕРИОДА

// СТИЛИ ДЛЯ DATE-PICKER
.mx-datepicker input{
  border: 0;
  border-bottom: 1px solid #dee2f3 !important;
  border-radius: 0px !important;
}
// СТИЛИ ДЛЯ ТАБЛИЦ КОМПОНЕНТА EL-TABLE
.el-table--enable-row-hover .el-table__body tr:hover>td {
    background-color: unset;
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
  border-color: #32aaa7 !important;
}
.green{
  background-color: #32aaa7;
  & td{
    color: white !important;
  }
}
.depth-1 {
  background-color: #bebebe !important;
  background-color: lighten;
  color: black;
}
.depth-2 {
  background-color: #c4c5c6 !important;
  color: black;
}
.depth-3 {
  background-color: #cecfd0 !important;
  color: black;
}
.depth-4 {
  background-color: #d4d5d7 !important;
  color: black;
}
.depth-5 {
  background-color: #e3e3e4 !important;
  color: black;
}
.depth-6 {
  background-color: #ebedf4 !important;
  color: black;
}
.depth-7 {
  background-color: #eceef3 !important;
  color: black;
}
.depth-8 {
  background-color: #f0f0f3 !important;
  color: black;
}
.depth-9 {
  background-color: #f0f1f6 !important;
  color: black;
}
.depth-10 {
  background-color: #eff0f5 !important;
  color: black;
}
.b-table-row-selected{
  background-color: #3D8987 !important;
  color: white !important;
}
.b-table-row-selected td{
  color: white !important;
}
// Конец El-Table
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
  font-weight: 500;
}
.el-icon-arrow-left {
  position: relative;
  left: -10px;
}
.el-icon-arrow-right {
  position: relative;
  right: -10px;
}
// СТИЛИ ДЛЯ ТАГОВ
.el-tag{
  background-color: #fff;
  border: 1px solid #dddddb;
  border-radius: 7px;
  color: black;
  font-weight: 500;
  margin-right: 10px;
  height: auto;
  padding: 3px 10px;
  font-size: 14px;
  &:hover{
    background-color: #E6F4F4;
  }
}
.el-tag .el-tag__close{
  color: #32aaa7;
  font-size: 17px;
  font-weight: 500;
  left: 3px;
  top: 0px;
}
.el-tag .el-tag__close:hover{
  background: unset;
  color: #32aaa7;
}
// Loading Spinner
.el-loading-spinner .path{
  stroke: #32aaa7;
}
.el-loading-spinner{
  top: 10%;
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
  padding: 6px !important;
  border-top: 1px solid #BABABA !important;
  border-bottom: 1px solid #BABABA !important;
  font-family: 'FuturaPTDemi' !important;
  font-weight: 500 !important;
  color: black ;
}
// th[role='columnheader']{
//   font-family: 'FuturaPTDemi' !important;
// }
.table .thead-light th{
  background: #DEE2F3;
}
.b-table-sticky-header, .table-responsive, [class*="table-responsive-"]{
  margin-bottom: 0;
}
// Mobile_Modal_Mask
.mobile_modal_mask{
  display: none;
}
// СТИЛИ ДЛЯ МОДАЛОК СО СТИЛЕМ .cust_modal
.cust_modal{
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  padding-left: 120px;
  padding-bottom: 20px;
  max-height: 100%;
  box-sizing: border-box;
  background: #FFFFFF;
  box-shadow: 0px 4px 12px 2px rgba(0, 0, 0, 0.24);
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
// СТИЛЬ ДЛЯ СТРАНИЦ С ТАБЛИЦАМИ БОЛЬШЕ 1920PX
@media (min-width: 1920px) {
  .table_container{
    width: 100%;
    max-width: 1920px;
  }
}

//
@media (max-width: 800px) {
  .nav_top{
    display: none;
  }
}
// СТИЛИ НАЧАИНАЯ С 768PX
@media (max-width: 768px) {
  // #main,
  // .licevoischet__page{
  // min-height: 100vh;
  // }
  .mobile_modal_mask{
    position: absolute;
    top: -50px;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: .7;
    background-color: black;
    &.active{
      display: block;
    }
  }
  body {
    // overflow-x: hidden !important;
  }
  main {
    padding-left: 15px !important;
    padding-right: 15px;
    padding-bottom: 70px !important;
  }
  // СТИЛИ ДЛЯ НИЖНЕГО МЕНЮ
  .nav > ul{
    display: flex;
    width: 100%;
    justify-content: space-around;
  }
  // СТИЛИ ДЛЯ МОДАЛОК СО СТИЛЕМ .cust_modal
  .cust_modal{
    padding-left: 0 !important;
    padding-bottom: 60px !important;
  }
  // СТИЛИ ДЛЯ КНОПКИ "Назад"
  .mobile_back{
    display: inline-block;
  }
  // СТИЛИ ДЛЯ ЗАГОЛОВКА СТРАНИЦ
  .page__title{
    font-size: 22px;
  }
  // СТИЛИ ДЛЯ ЗАГОЛОВКА МОДАЛКИ
  .modal_title{
  font-size: 20px;
  }
}
// СТИЛИ ДЛЯ МОБ.УСТРОЙСТВ 540PX
@media (max-width: 540px) {
  .date_show{
    display: block !important;
    margin-left: 0 !important;
  }
  // MAIN БЛОК
  main{
    padding-left: 0 !important;
    padding-right: 0 !important;
  }
  // ЗАГОЛОВОК СТРАНИЦЫ
  .page__title{
    font-size: 18px;
  }
  // ЗАГОЛОВОК РАЗДЕЛА СТРАНИЦЫ
  .page__caption{
    font-size: 16px;
    margin-bottom: 0;
  }
  // СТИЛИ ДЛЯ ЗАГОЛОВКА МОДАЛКИ
  .modal_title{
  font-size: 16px;
  // width: 90%;
  }
  // КНОПКА НАЗАД
  .mobile_back{
    & svg{
      margin-right: 10px;
    }
  }
  .period_picker{
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
}
@media (max-width: 350px) {
  .auth_switch .el-switch__label{
  font-family: 'FuturaPTDemi';
  color: #9A9A9A;
  &:nth-of-type(1){
    margin-right: 10px;
  }
  &:nth-of-type(3){
    margin-left: 10px;
  }
  &.is-active{
    color: black;
  }
}
}
</style>
