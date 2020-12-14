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
// ТЕСТОВЫЙ СТИЛЬ ДЛЯ CONTAINER
@media (min-width: 1200px) {
  .container, .container-sm, .container-md, .container-lg, .container-xl{
    max-width: 1920px;
  }
}
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap');
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: 'Roboto', sans-serif;
}
button:focus{
  outline: none;
}
input[type='radio']{
  outline: none !important;
}

// СТИЛИ ДЛЯ RADIO КНОПОК
.custom-control-input:checked ~ .custom-control-label::before{
    color: #fff;
    border: 2px solid black;
    border-color: #32aaa7;
    background-color: white;
    box-shadow: none;
}
.custom-radio .custom-control-input:checked ~ .custom-control-label::after{
  background: #32aaa7 !important;
}
.custom-control-label::after{
    position: absolute;
    top: 0.5rem;
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
    &:focus ~ label,
    &:valid ~ label {
      font-size: 14px;
      top: -13px;
    }
    &:valid ~ span {
      display: block;
    }
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
  border: 2px solid #dddddb;
  border-radius: 7px;
  color: black;
  font-weight: 500;
  margin-right: 10px;
  height: auto;
  padding: 3px 10px;
  font-size: 14px;
}
.el-tag .el-tag__close{
  color: #32aaa7;
  font-size: 20px;
  font-weight: 500;
  left: 3px;
  top: 0px;
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
.b-table-sticky-header, .table-responsive, [class*="table-responsive-"]{
  margin-bottom: 0;
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
</style>
