<template>
  <div class="left_menu active">
    <div class="left_menu_top">
      <div class="logo">
        <a href="#">
          <img src="../assets/imgs/logo.png" alt="Артлайф" />
          <img class="lhid" src="../assets/imgs/logo_1.png" alt="Артлайф" />
        </a>
      </div>
    </div>
    <div class="nav active">
      <ul>
        <li>
          <a class="nav_parent" href="#">
            <span class="ico"><img src="../assets/imgs/i1.png" alt=""/></span>
            <span class="ico_t">Профиль</span>
          </a>
          <ul class="sub_menu">
            <li class="mobilis"><span class="i_m">Профиль</span></li>
            <li><router-link to="/">Карточка партнера</router-link></li>
            <li><router-link to="/myinfoedit">Редактирование личных данных</router-link></li>
            <li><router-link to="/sponsorcard">Данные спонсора</router-link></li>
            <li><router-link to="#">Передача прав</router-link></li>
          </ul>
        </li>
        <li>
          <a class="nav_parent" href="#">
            <span class="ico"><img src="../assets/imgs/i2.png" alt=""/></span>
            <span class="ico_t">Структура</span>
          </a>
          <ul class="sub_menu">
            <li class="mobilis"><span class="i_m">Структура</span></li>
            <li>
              <router-link to="/organization-period">Организация текущего периода</router-link>
            </li>
            <li>
              <router-link to="/organization-by-period">
                История организации по периодам
              </router-link>
            </li>
            <li>
              <router-link to="#">Управление трансфертами структуры(плоское дерево)</router-link>
            </li>
          </ul>
        </li>
        <li>
          <a class="nav_parent" href="#">
            <span class="ico"><img src="../assets/imgs/i3.png" alt=""/></span>
            <span class="ico_t">Отчеты</span>
          </a>
          <ul class="sub_menu">
            <li class="mobilis"><span class="i_m">Отчеты</span></li>
            <li><router-link to="/indicators">Показатели</router-link></li>
            <li><router-link to="/bonus-history">История бонусов (КЕ)</router-link></li>
            <li><router-link to="account-detail">Движение по лицевому счёту</router-link></li>
            <li><a href="#">Отчёт по реферальным ссылкам</a></li>
          </ul>
        </li>
        <li>
          <a class="nav_parent" href="#">
            <span class="ico"><img src="../assets/imgs/i4.png" alt=""/></span>
            <span class="ico_t">Операции</span>
          </a>
          <ul class="sub_menu">
            <li class="mobilis"><span class="i_m">Операции</span></li>
            <li><a href="#">Создать реферальные ссылки</a></li>
            <li><a href="#">Регистрация партнёра</a></li>
          </ul>
        </li>
        <li class="hover">
          <a class="nav_parent" href="#">
            <span class="ico"><img src="../assets/imgs/i5.png" alt=""/></span>
            <span class="ico_t">Покупки</span>
          </a>
          <ul class="sub_menu">
            <li class="mobilis"><span class="i_m">Покупки</span></li>
            <li><router-link to="/purchases-history">История покупок</router-link></li>
            <li><router-link to="/returns-history">История возвартов</router-link></li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'TheNavBar',
  computed: {
    ...mapState('auth', ['is_authorized', 'agentname', 'role']),
  },
  methods: {
    ...mapActions('auth', ['logout']),
    out() {
      this.logout().then(() => {
        this.$router.push('/login');
      });
    },
  },
  mounted() {
    const navP = document.getElementsByClassName('nav_parent');
    let nav = '';
    // eslint-disable-next-line no-restricted-syntax
    for (nav of navP) {
      // eslint-disable-next-line prefer-arrow-callback
      // eslint-disable-next-line no-loop-func
      nav.addEventListener('click', function () {
        if (this.classList.contains('active')) {
          this.classList.remove('active');
        } else {
          // eslint-disable-next-line no-restricted-syntax
          for (const i of this.parentNode.parentNode.children) {
            i.firstChild.classList.remove('active');
          }
          this.classList.add('active');
        }
      });
    }
    const links = document.getElementsByClassName('sub_menu');
    // eslint-disable-next-line no-restricted-syntax
    for (const link of links) {
      // eslint-disable-next-line prefer-arrow-callback
      link.addEventListener('click', function () {
        this.parentNode.firstChild.classList.remove('active');
      });
    }
  },
};
</script>

<style>
.left_menu {
  z-index: 11;
}
.left_menu:hover .nav ul li:hover a {
  background: url('../assets/imgs/ardv.svg') no-repeat 100% center;
  color: #383a41;
}
.left_menu:hover .nav ul li a {
  background: url('../assets/imgs/ard.svg') no-repeat 100% center;
}
.left_menu {
  position: fixed;
  left: 0;
  top: 0;
  width: 100px;
  height: 100%;
  background: #fcfcfc;
  box-shadow: 0px 0px 16px 2px rgba(56, 58, 65, 0.24);
  padding: 0;
  box-sizing: border-box;
}
.left_menu:hover {
  width: 280px;
}
.left_menu_top {
  padding: 24px;
  width: 100%;
  box-sizing: border-box;
}
.logo {
  border-bottom: 1px solid #dee2f3;
  padding-bottom: 24px;
}
.logo img {
  max-width: 100%;
}
.nav {
  width: 100%;
  padding-top: 0;
  text-align: center;
}
.ico {
  width: 100%;
}
.left_menu:hover .nav {
  text-align: left;
}
.left_menu:hover .ico {
  width: auto;
}
.ico {
  display: block;
  float: left;
}
.ico_t {
  display: none;
  float: left;
  margin-left: 15px;
  padding-top: 5px;
}
ol,
ul {
  list-style: none;
}
.nav ul li {
  margin-bottom: 0px;
  width: 100%;
  padding-left: 24px;
  padding-right: 24px;
  box-sizing: border-box;
  float: left;
  padding-top: 15px;
  padding-bottom: 15px;
}
.nav ul li a {
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  text-transform: uppercase;
  color: #9a9a9a;
  display: block;
  width: 100%;
  float: left;
  /* font-family: FTN65; */
}
.component_head {
  width: 100%;
  margin-bottom: 30px;
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 24px;
  float: left;

  /* identical to box height, or 100% */

  color: #383a41;
}
.left_menu:hover .ico_t {
  display: block;
}
.component_body {
  width: 100%;
}
.l_p {
  float: left;
  width: 50%;
  padding-right: 5%;
  box-sizing: border-box;
}
.r_p {
  float: left;
  width: 50%;
  padding-right: 5%;
  box-sizing: border-box;
}
.line_param {
  width: 100%;
}
.line_param_top {
  line-height: 12px;
  color: #9a9a9a;
  margin-bottom: 10px;
}
.line_param_bottom {
  line-height: 12px;

  color: #383a41;
}
.nav ul li:hover {
  background: #ebeefa;
}
.nav ul li:hover a {
  background: #ebeefa;
  color: #383a41;
}
.sub_menu {
  float: left;
  padding-left: 40px;
  display: none;
}
.nav ul li .sub_menu li {
  float: left;
  padding: 0;
  margin-bottom: 15px;
}
.nav ul li .sub_menu li:hover {
  background: none;
}
.nav ul li:hover .sub_menu {
  display: block;
}
.nav ul li .sub_menu li a {
  font-size: 14px;
  line-height: 16px;
  color: #383a41;
  text-transform: none;
  background: none !important;
}
.nav ul li .sub_menu li a {
  font-size: 14px;
  line-height: 16px;
  color: #383a41;
  text-transform: none;
  text-decoration: none;
  background: none;
  /* font-family: FTN45; */
}
.sub_menu {
  float: left;
  padding-left: 40px;
  margin-top: 15px;
}
.nav ul li .sub_menu li a:hover {
  color: #2eaeea !important;
}
.lhid {
  margin-left: 15px;
  display: none;
}
.left_menu:hover .lhid {
  margin-left: 15px;
  display: inline;
}
.mobilis {
  display: none;
}
@media (min-width: 320px) and (max-width: 800px) {
  nav ul {
    width: 100%;
    display: flex;
    justify-content: space-around;
  }
  .desktop_m {
    display: none;
  }
  .mobil_m {
    display: block;
  }

  .left_menu_top {
    display: none;
  }
  .left_menu {
    position: fixed;
    left: 0;
    top: auto;
    width: 100%;
    height: 60px;
    background: #fcfcfc;
    box-shadow: none;
    padding: 0;
    box-sizing: border-box;
    border-top: 1px solid #dee2f3;
    bottom: 0;
  }
  .nav ul li {
    margin-bottom: 5px;
    width: auto;
    padding-left: 24px;
    padding-right: 24px;
    box-sizing: border-box;
    float: left;
    padding-top: 15px;
    padding-bottom: 0;
    position: relative;
  }
  .content {
    float: left;
    width: 100%;
    padding-left: 20px;
    box-sizing: border-box;
    padding-top: 40px;
    padding-right: 0;
    max-width: 100%;
  }
  .header {
    display: none;
  }
  .nav_parent.active .ico_t {
    display: block;
    color: #383a41;
    text-transform: none;
    font-size: 12px;
    margin: 0;
    width: 100%;
    position: absolute;
    left: 0;
    bottom: -14px;
  }
  .nav_parent.active img {
    opacity: 1;
  }

  .nav_parent.active + .sub_menu {
    float: left;
    padding-left: 40px;
    display: block;
    position: fixed;
    top: auto;
    width: 100%;
    padding: 20px;
    padding-top: 20px;
    padding-left: 20px;
    padding-left: 20px;
    background: #fff;
    height: 100%;
    z-index: 10;
    left: 0;
    box-sizing: border-box;
    bottom: 60px;
    padding-top: 80px;
  }
  .nav_parent.active .ico {
    display: block;
    float: left;
    margin-top: -5px;
    margin-bottom: 5px;
  }
  .mobilis {
    display: block;
    width: 100% !important;
    float: left !important;
  }
  .mobilis {
    display: block;
    width: 100% !important;
    float: left !important;
    text-align: left;
    margin-bottom: 25px;
  }
  .mobilis span {
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 24px;

    /* identical to box height, or 100% */

    color: #383a41;
  }
  .nav ul li .sub_menu li {
    float: left;
    padding: 0;
    margin-bottom: 12px;
    width: 100%;
    text-align: left;
  }
  .nav ul li .sub_menu li a {
    padding: 16px 12px;
    background: #ebeefa !important;
    display: block;
    float: left;
    width: 100%;
    box-sizing: border-box;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;

    /* identical to box height, or 114% */

    color: #32aaa7;
  }

  .l_p {
    float: left;
    width: 100%;
    padding-right: 0;
    box-sizing: border-box;
  }

  .r_p {
    float: left;
    width: 100%;
    padding-right: 20px;
    box-sizing: border-box;
  }
  .l_p {
    float: left;
    width: 100%;
    padding-right: 20px;
    box-sizing: border-box;
  }

  .content {
    float: left;
    width: 100%;
    padding-left: 20px;
    box-sizing: border-box;
    padding-top: 20px;
    padding-right: 0;
    max-width: 100%;
  }

  h1 {
    font-style: normal;
    font-weight: 300;
    font-size: 14px;
    line-height: 16px;
    color: #383a41;
    margin-bottom: 0px;
    /* font-family: FTN65; */
  }
  .c_head {
    float: left;
    width: 100%;
    padding-right: 20px;
    height: 40px;
    padding-left: 50px;
    box-sizing: border-box;
    position: relative;
  }

  .c_head a {
    display: block;
    position: absolute;
    left: 0;
    /* background: url(../images/back.svg) no-repeat center; */
  }
  .c_head a {
    display: block;
    position: absolute;
    left: 0;
    /* background: url(../images/back.svg) no-repeat center; */
    width: 24px;
    height: 24px;
    text-indent: -10000px;
    top: -3px;
  }
  .component {
    position: relative;
    padding-top: 40px;
    float: left;
  }
  .component_head {
    width: 100%;
    margin-bottom: 30px;
    font-style: normal;
    font-weight: normal;
    font-size: 24px;
    line-height: 24px;
    float: left;
    color: #383a41;
    padding-right: 20px;
    box-sizing: border-box;
  }
  .nav_links {
    margin-top: 30px;
    float: left;
    width: 100%;
    padding-right: 20px;
  }
  .brd_green {
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
    text-align: center;
    color: #32aaa7;
    display: block;
    float: left;
    width: 100%;
    box-sizing: border-box;
    margin-bottom: 15px;
  }
  .footer {
    position: fixed;
    bottom: auto;
    z-index: 10;
    width: 100%;
    padding-left: 0;
    box-sizing: border-box;
    background: #ffffff;
    box-shadow: none;
    top: 30px;
  }

  .footer_line {
    width: 100%;
    padding-top: 0;
    padding-bottom: 0;
  }
  .footer {
    position: fixed;
    bottom: auto;
    z-index: 10;
    width: 100%;
    padding-left: 0;
    box-sizing: border-box;
    background: no-repeat;
    box-shadow: none;
    top: 55px;
  }
  .footer_line {
    width: 100%;
    padding-top: 0;
    padding-bottom: 0;
    float: left;
  }

  .component {
    position: relative;
    padding-top: 40px;
    float: left;
    width: 100%;
  }
  .nav_top {
    float: left;
    width: 100%;
    margin-bottom: 15px;
    padding-right: 20px;
    box-sizing: border-box;
  }
  .title_line_t.search {
    /* background: #fff url(../images/s_i.svg) no-repeat 95% center; */
    float: left;
    width: 100%;
    padding-left: 20px;
    padding-right: 20px;
    box-sizing: border-box;
    text-align: left;
    padding-top: 9px;
    padding-bottom: 10px;
  }
  .footer {
    position: absolute;
    bottom: auto;
    z-index: 10;
    width: 100%;
    padding-left: 0;
    box-sizing: border-box;
    background: no-repeat;
    box-shadow: none;
    top: 55px;
  }

  .middle_part {
    float: left;
    width: 100%;
    overflow: scroll;
  }
  .modal_line.active {
    display: block;
    background: #fff;
    position: fixed;
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
    top: 0;
    height: 100%;
  }
  .label_in {
    position: relative;
    padding: 10px 0;
  }
  .tlabel {
    position: absolute;
    top: 18px;
    left: 37px;
    transition: 0.15s ease-in-out;
    color: #a0a0a6;
    pointer-events: none;
    left: 0;
    text-transform: uppercase;
  }
  .tinput:focus ~ label {
    font-size: 9px;
    top: 6px;
  }

  .tinput:valid ~ label {
    font-size: 9px;
    top: 6px;
  }

  .modal_line.active {
    display: block;
    background: #fff;
    position: fixed;
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
    top: 0;
    height: 100%;
    z-index: 999;
  }

  body.hidden {
    overflow: hidden;
  }

  .component_head_sort label {
    font-size: 12px !important;
    line-height: 12px !important;
    color: #9a9a9a !important;
  }

  .component_head_sort {
    width: 100%;
  }

  .modal_calend {
    background: #fff;
    position: fixed;
    left: 0;
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
    background: #ffffff;
    box-shadow: none;
    top: 0;
    z-index: 9999;
    height: 100%;
  }

  .modal_calend_inner {
    margin: 0 auto;
    width: 100%;
    max-width: 100%;
  }
  .title_line_t.filter {
    /* background: url(../images/filt.svg) no-repeat 95% center; */
    float: left;
    padding-left: 20px;
    width: 100%;
    text-align: left;
    box-sizing: border-box;
  }

  .modal_line.active .sortblock_param {
    float: left;
    width: 100%;
    margin-bottom: 0;
  }
  .title_line_t.transfer {
    /* background: url(../images/transfer.svg) no-repeat 95% center; */
    float: left;
    width: 100%;
    padding-left: 20px;
    box-sizing: border-box;
    text-align: left;
  }
  .component_warning {
    float: left;
    width: 100%;
    margin-bottom: 30px;
    padding-right: 20px;
    box-sizing: border-box;
  }
  .w50.last {
    margin-left: 0;
  }
  .sortblock_param {
    float: left;
    width: 100%;
    margin-bottom: 0;
  }

  .line_param {
    margin-bottom: 0;
  }

  .nav_links {
    margin-top: 15px;
    float: left;
    width: 100%;
    padding-right: 20px;
  }

  .nav ul li .sub_menu li a {
    padding: 16px 12px;
    background: #ebeefa !important;
    display: block;
    float: left;
    width: 100%;
    box-sizing: border-box;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
    color: #32aaa7 !important;
  }

  .left_menu:hover {
    width: 100%;
  }
  .left_menu:hover .ico_t {
    display: none;
  }
  .left_menu:hover .nav ul li a {
    background: none;
  }
  .left_menu:hover .nav ul li:hover a {
    background: none;
    color: #383a41;
  }

  .nav ul li:hover {
    background: none !important;
  }
  .nav_parent.active .ico_t {
    display: block !important;
    color: #383a41;
    text-transform: none;
    font-size: 12px;
    margin: 0;
    width: 100%;
    position: absolute;
    left: 0;
    bottom: -14px;
    text-align: center;
  }

  .nav ul li {
    margin-bottom: 5px;
    width: auto;
    padding-left: 0;
    padding-right: 0;
    box-sizing: border-box;
    float: left;
    padding-top: 0;
    padding-bottom: 0;
    position: relative;
  }
  .nav ul li a.nav_parent {
    box-sizing: border-box;
    padding-top: 15px;
    padding-left: 24px;
    padding-right: 24px;
    padding-bottom: 15px;
  }

  .nav_parent.active .ico_t {
    display: block !important;
    color: #383a41;
    text-transform: none;
    font-size: 12px;
    margin: 0;
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
    text-align: center;
  }
  .line_param {
    margin-bottom: 10px;
  }
  .left_menu {
    z-index: 99999;
  }

  .nav ul li:hover .sub_menu {
    display: none;
  }
  .nav_parent.active + .sub_menu {
    display: block !important;
  }
  .footer_line:hover .modal_line {
    display: none;
  }
  .footer_line:hover .title_line {
    display: block;
  }
  .modal_line.active {
    display: block !important;
  }
}
</style>
