<template>
  <div id="app">
    <TheNavBarTop class="nav_top"></TheNavBarTop>
    <TheNavBar v-show="is_authorized" class="noprint"></TheNavBar>
    <main id="main" :class="`${is_authorized ? 'isAuth' : ''}`">
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
  mounted() {
  },
  computed: {
    ...mapState('auth', ['is_authorized', 'agentname', 'role']),
  },
};
</script>

<style lang="scss">
body{
  min-height: 100vh;
  background: #f7f8fe;
}
:root {
  --main-green: #32aaa7;
  --text-gray: #9a9a9a;
  --btn-gray: lightgray;
  --btn-disabled-text: rgb(168, 168, 168);
  --btn-disabled: rgb(204, 204, 204);
  --label-gray: #9a9a9a;
  --input-gray: #dee2f3;
}
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
// СТИЛЬ SCROLLBAR'а
::-webkit-scrollbar {
    width: 8px; /* ширина нового скроллбара */
    height: 5px;
}
.el-date-editor .el-range__icon{
  position: absolute;
  right: 0;
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
// КОНЕЦ СТИЛЯ SCROLLBAR'а
.el-loading-mask{
  position: fixed;
  z-index: 20;
  top: 64px;
  background-color: rgb(255 255 255);
}
#modal-scrollable .modal-content{
  height: unset !important;
}
.modal-content {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100% !important;
    min-height: 200px;
    pointer-events: auto;
    background-color: #fff;
    background-clip: unset !important;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 0  !important;
    outline: 0;
    & .foobar{
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;;
    }
    & .modal-footer{
      border: 0 !important;
      display: flex;
      justify-content: center;
        & button{
          width: 30%;
          border-radius: 0 !important;
          &:nth-of-type(1) {
            background-color: #32aaa7;
            color: white;
            font-weight: 500;
            border: 0;
            padding: 7px 0px;
          }
          &:nth-of-type(2) {
            color: #32aaa7;
            font-weight: 500;
            background: none;
            border: 1px solid #32aaa7;
            padding: 6px 0px;
          }
        }
    }
}
.modal-dialog-centered{
  justify-content: center;
}
.multiselect__tags{
  padding-left: 0 !important;
  border:0 !important;
  border-bottom: 1px solid #dee2f3 !important;
}
.multiselect__placeholder{
  font-size: 16px !important;
  color: #9a9a9a !important;
}
::-webkit-scrollbar-thumb:hover {
    background: #727272; /* ползунок меняет цвет при наведении */
}
input.mx-input::placeholder{
  color: #9a9a9a;
  font-size: 16px !important;
}
.el-scrollbar__thumb{
  background-color: #afafaf;
}
.el-input__inner::placeholder{
  color: #9a9a9a;
  font-size: 16px;
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
  font-size: 13px;
  position: absolute;
  top: -15px;
  left: 19px;
  z-index: 10;
  color: #9a9a9a;
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
.el-select-dropdown__item.selected{
  color:  #32aaa7;
}
// СТИЛИЯ ЯЧЕЕК EL-TABLE
.el-table td, .el-table th{
  vertical-align: middle;
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
  // margin-top: 40px;
  padding-bottom: 70px;
  &.isAuth{
    padding-left: 120px;
  }
}
input{
  background: transparent !important;
  color: black !important;
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
    top: 10px;
    color: #32aaa7;
    cursor: pointer;
    &.show_pass_icon {
      top: 0;
      right: 38px;
      width: 40px;
      height: 40px;
    }
    &.show_pass_icon_close {
      top: 0;
      right: 38px;
      width: 40px;
      height: 40px;
    }
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
    &.error:hover{
      border-bottom-color: red;
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
  color: var(--label-gray);
  font-size: 16px;
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
.show_pass_icon{
  position: relative;
  background-image: url('assets/imgs/show_pass_icon.svg');
  background-repeat: no-repeat;
  background-size: 55%;
  background-position: center;
  width: 20px;
  height: 20px;
  right: 10px;
}
.show_pass_icon_close{
  position: relative;
  background-image: url('assets/imgs/show_pass_icon_close.svg');
  background-repeat: no-repeat;
  background-size: 55%;
  background-position: center;
  width: 20px;
  height: 20px;
  right: 10px;
}
.sr-only{
  display: none;
}
// СТИЛЬ КНОПКИ ОЧИСТИ el-input
.el-icon-circle-close:before{
  position: absolute;
  content: ' ';
  display: block;
  background-image: url('assets/imgs/close_btn.svg');
  background-repeat: no-repeat;
  background-size: 100%;
  width: 13px;
  height: 13px;
  bottom: 15px;
  right: 8px;
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
  font-family: 'Futura PT Book';
  font-weight: 500;
  border-radius: 0;
  font-size: 20px !important;
  padding-left: 0px !important;
  color: black !important;
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

.b-table-row-selected{
  background-color: #3D8987 !important;
  color: white !important;
}
.b-table-row-selected td,
.b-table-row-selected td a{
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
  // color: #9a9a9a;
  font-size: 20px;
  font-weight: 500;
}
.el-table__expand-icon--expanded{
  transform: none;
}
.el-table__expand-icon--expanded .el-icon-arrow-right:before{
  content: '-';
  top: -1px;
}
.depth-0 .el-table__expand-icon--expanded .el-icon-arrow-right:before{
  content: '-';
  top: -1px;
}
.el-icon-arrow-right:before{
  position: relative;
  top: 1px;
  content: "+";
  color: black;
  font-size: 17px;
  font-family: 'FuturaPTDemi';
  font-weight: 500;
}
.depth-0 .el-icon-arrow-right:before{
  position: relative;
  top: 1px;
  content: "+";
  color: white;
  font-size: 17px;
  font-family: 'FuturaPTDemi';
  font-weight: 500;
}
.el-table th>.cell{
  padding-left: 4px;
}
.depth-0 {
  background-color: #32aaa7 !important;
  color: white;
}
.depth-1 {
  background-color: #AED9D8 !important;
  color: black;
}
.depth-2 {
  background-color: #B5CCE2 !important;
  color: black;
}
.depth-3 {
  background-color: #C1D5E9 !important;
  color: black;
}
.depth-4 {
  background-color: #997a7a !important;
  color: black;
}
.depth-5 {
  background-color: #C4C5C6 !important;
  color: black;
}
.depth-6 {
  background-color: #CECFD0 !important;
  color: black;
}
.depth-7 {
  background-color: #D4D5D7 !important;
  color: black;
}
.depth-8 {
  background-color: #E3E3E4 !important;
  color: black;
}
.depth-9 {
  background-color: #EBEDF4 !important;
  color: black;
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
  margin-bottom: 10px;
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
  top: 45%;
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
.border{
  border: 1px solid #BABABA !important;
}
.el-table th>.cell{
  // padding-left: 0;
}
.orgper{
  border: 1px solid gray;
}
.orgper .el-table_1_column_1{
  border-right: 1px solid #9A9A9A
}
// .table th, .table td{
//   // padding: 6px !important;
//   border-top: 1px solid #BABABA !important;
//   border-bottom: 1px solid #BABABA !important;
//   font-family: 'FuturaPTDemi' !important;
//   // font-weight: 500 !important;
//   color: black ;
// }
.exp_print {
    span {
      color: #32aaa7;
      cursor: pointer;
    }
  }
// th[role='columnheader']{
//   font-family: 'FuturaPTDemi' !important;
// }
.table .thead-light th{
  // background: #DEE2F3;
}
.b-table-sticky-header, .table-responsive, [class*="table-responsive-"]{
  margin-bottom: 0;
}
.b-table-sticky-header{
  max-height: 65vh;
}
.b-table-sticky-header > .table.b-table > thead > tr > th{
  top: -1px;
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
  .history_title{
    font-size: 14px;
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
    overflow: scroll;
  }
  // СТИЛИ ДЛЯ КНОПКИ "Назад"
  .mobile_back{
    display: inline-block;
  }
  // СТИЛИ ДЛЯ ЗАГОЛОВКА СТРАНИЦ
  .page__title{
    font-size: 28px;
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
  .b-table-sticky-header{
    margin-bottom: 20px;
  }
  .search_icon {
    color: #32aaa7;
    float: right;
  }
  // MAIN БЛОК
  main{
    padding-left: 0 !important;
    padding-right: 0 !important;
  }
  // ЗАГОЛОВОК СТРАНИЦЫ
  .page__title{
    font-size: 16px;
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
@media print {
  @page {
    size: unset !important;
  }
  // ГЛОБАЛЬНЫЕ
    body{
      // height: 297mm !important;
      // width: 210mm !important
      .col-md-6{
        flex: 0 0 50%;
        width: 50%;
      }
    }
  .main{
    padding-left: 0 !important;
  }
  .noprint{
    display: none;
  }
  // Показатели
  .indicat{
    div.col-md-6{
      width: 50% !important;
    }
    .current_period br{
      display: none !important;
    }
  }
  .date_show{
    margin-left: -22px !important;
  }
  .arrow_left{
    display: none !important;
  }
  // Данные спонсора
}
</style>
