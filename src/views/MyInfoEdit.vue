<template>
  <div class="myinfoedit__page">
    <div v-loading="loading">
    <div class="container"  v-show="!loading">
      <h2 class="page__title">
        <p class="mobile_back" @click="back">
          <svg
            width="18"
            height="12"
            viewBox="0 0 18 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M18 5H3.83L7.41 1.41L6 0L0 6L6 12L7.41 10.59L3.83 7H18V5Z" fill="#32AAA7" />
          </svg>
        </p>
        {{$t("Редактирование личных данных")}}
      </h2>
      <!-- <div class="myfoto">
        <img src="../assets/imgs/unnamed 1.png" alt="" />
      </div> -->
      <div class="top__info mt-3">
        <div class="row edit ">
          <div class="col-md-6 custom_input mt-3">
            <p class="lbl">{{$t('Страна')}}:</p>
            <p>{{userTopInfo.country}}</p>
            <!-- <input
            @blur="checkInput('country')"
            ref="country"
            type="text" name="country" id="country" required v-model="userTopInfo.country" />
            <label for="country">{{$t("Страна")}}</label>
            <span class="clear_icon" @click="clearInputTop('country')"></span> -->
          </div>
          <div class="col-md-6 custom_input mt-3">
            <p class="lbl">{{$t('Город')}}:</p>
            <p>{{userTopInfo.city}} </p>
            <!-- <input
            @blur="checkInput('city')"
            ref="city"
            type="text" name="city" id="city" required v-model="userTopInfo.city" />
            <label for="city">{{$t("Город")}}</label>
            <span class="clear_icon" @click="clearInputTop('city')"></span> -->
          </div>
        </div>
        <div class="row edit ">
          <div class="col-md-6 custom_input mt-3">
            <p class="lbl">{{$t('Адрес')}}:</p>
            <p>{{userTopInfo.address}} </p>
            <!-- <input
            @blur="checkInput('address')"
            ref="address"
            type="text" name="address" id="address" required v-model="userTopInfo.address" />
            <label for="address">{{$t("Адрес")}}</label>
            <span class="clear_icon" @click="clearInputTop('address')"></span> -->
          </div>
          <div class="col-md-6 custom_input mt-3">
            <p class="lbl">{{$t('Паспорт')}}:</p>
            <p>{{userTopInfo.passport}}</p>
            <!-- <input
            @blur="checkInput('passport')"
            ref='passport'
            type="text" name="passport" id="passport"
            required v-model="userTopInfo.passport" />
            <label for="passport">{{$t("Паспорт")}}</label>
            <span class="clear_icon" @click="clearInputTop('passport')"></span> -->
          </div>
        </div>
        <div class="row edit ">
          <div class="col-md-6 mt-3">
            <p class="lbl">
              {{$t('Дата рождения')}}:
            </p>
            <p>
              {{new Date(userTopInfo.bthdte).toLocaleDateString()}}
            </p>
            <!-- <div ref="bthdte" :class="userTopInfo.bthdte ? '' : 'error'">
              <span v-if="userTopInfo.bthdte" class="custom_label">{{$t("Дата рождения")}}</span>
              <date-picker
                v-model="userTopInfo.bthdte"
                value-type="YYYY-MM-DD"
                format="DD.MM.YYYY"
                type="date"
                placeholder="Дата рождения"
                style="width: 100%"
                range-separator=" - "
              ></date-picker>
            </div> -->
          </div>
          <div class="col-md-6 custom_input mt-3">
            <p class="lbl">
              {{$t('Доп. контакты')}}:
            </p>
            <p>
              {{userTopInfo.skype}}
            </p>
            <!-- <input type="text" name="skype" id="skype" required v-model="userInfo.skype" />
            <label for="skype">{{$t("Доп. контакты")}}</label>
            <span class="clear_icon" @click="clearSkype('skype')"></span> -->
          </div>
        </div>
        <!-- <div class="row edit mt-3">
          <div class="col-md">
            <button class="save__newinfo"
            v-on:click="saveTopEdit">{{$t("Сохранить изменения")}}</button>
          </div>
        </div> -->
      </div>
      <div class="bot__info custom_input mt-3">
        <div class="row edit">
          <div class="col-md-6">
            <p class="page__caption">{{$t("Смена адреса почтового ящика")}}</p>
            <div class="custom_input t">
              <input
              @blur="checkInput('email')"
              ref="email"
              type="text"
              name="email"
              id="email"
              required
              v-model="userInfo.email" />
              <label for="email">{{$t("E-mail")}}</label>
              <span class="clear_icon" @click="clearInput('email')"></span>
              <button class="save__newinfo mt-3"
              @click="saveEmail">{{$t("Сохранить изменения")}}</button>
            </div>
          </div>
          <div class="col-md-6">
            <p class="page__caption">{{$t("Смена телефона")}}</p>
            <div class="custom_input t" v-show="!smsStatus">
              <input
              @blur="checkInput('phone')"
              ref="phone"
              type="text"
              v-mask="mask"
              autocomplete="new-password"
              name="phone" id="phone"
              @input="checkValue"
              required v-model="phone" />
              <label for="phone" class="up">{{$t("Телефон в международном формате")}}</label>
              <span class="clear_icon" @click="clearPhone('phone')"></span>
              <button class="save__newinfo mt-3" v-on:click="savePhone">
                {{$t("Сохранить изменения")}}
              </button>
            </div>
            <div class="custom_input t" v-show="smsStatus">
              <input type="text"
              name="smsCode" id="smsCode"
              required v-model="smsCode" />
              <label for="smsCode">{{$t("Код подтверждения")}}</label>
              <span class="clear_icon" @click="clearInput('phone')"></span>
              <button class="save__newinfo mt-3" v-on:click="checkSmsCode">
                {{$t("Потвердить")}}
              </button>
            </div>
          </div>
        </div>
        <div class="row edit">
          <div class="col">
            <p class="page__caption">{{$t("Смена пароля")}}</p>
          </div>
        </div>
        <div class="row">
          <div class="col-md custom_input mt-3">
            <input
              ref="currentPass"
              v-on:focus="$refs.currentPass.classList.remove('error')"
              type="password"
              name="currentPass"
              id="currentPass"
              required
              v-model="password.currentPass"
            />
            <label for="currentPass">{{$t("Текущий пароль")}}</label>
            <span class="clear_icon" @click="clearPass('currentPass')"></span>
          </div>
          <div class="col-md custom_input mt-3">
            <input
              ref="newPass"
              v-on:focus="$refs.newPass.classList.remove('error')"
              type="password"
              name="newPass"
              id="newPass"
              required
              v-model="password.newPass"
            />
            <label for="newPass">{{$t("Новый пароль")}}</label>
            <span class="clear_icon" @click="clearPass('newPass')"></span>
          </div>
          <div class="col-md custom_input mt-3">
            <input
              v-on:focus="$refs.newPassRepeat.classList.remove('error')"
              ref="newPassRepeat"
              type="password"
              name="newPassRepeat"
              id="newPassRepeat"
              required
              v-model="password.newPassRepeat"
            />
            <label for="newPassRepeat">{{$t("Повтор пароля")}}</label>
            <span class="clear_icon" @click="clearPass('newPassRepeat')"></span>
          </div>
        </div>
        <div class="row edit mt-3">
          <div class="col-md">
            <button class="save__newinfo"
            @click="savePassword">{{$t("Сохранить изменения")}}</button>
          </div>
        </div>
      </div>
    </div>
    </div>
    <b-toast id="my-toast-success" variant="warning" solid>
      <template #toast-title>
        <div class="d-flex flex-grow-1 align-items-baseline">
          <b-img blank blank-color="green" class="mr-2" width="12" height="12"></b-img>
          <strong class="mr-auto">Успех!</strong>
        </div>
      </template>
      {{$t("Ваш данные успешно изменены")}}!
    </b-toast>
    <b-toast id="my-toast-error" variant="warning" solid>
      <template #toast-title>
        <div class="d-flex flex-grow-1 align-items-baseline">
          <b-img blank blank-color="#ff5555" class="mr-2" width="12" height="12"></b-img>
          <strong class="mr-auto">Ошибка!</strong>
        </div>
      </template>
      {{$t("При изменении данных произошла ошибка")}}!
    </b-toast>
  </div>
</template>

<script>
import md5 from 'md5';
// import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import 'vue2-datepicker/locale/ru';
import $ from 'jquery';
import backApi from '../assets/backApi';

export default {
  name: 'MyInfoEdit',
  // components: { DatePicker },
  data() {
    return {
      mask: '+###############',
      loading: true,
      phoneHash: null,
      smsCode: null,
      smsStatus: false,
      country: '',
      phone: '',
      password: {
        newPass: '',
        newPassRepeat: '',
        currentPass: '',
      },
      userInfo: {},
      userTopInfo: {
        country: '',
      },
      newPass: null,
      oldPass: null,
      rusAreaName: ['Россия', 'РФ', 'Россия Дальний Восток'],
    };
  },
  mounted() {
    backApi.get('/agent/profile').then((Response) => {
      this.userTopInfo = {
        country: Response.data.country === null ? '' : Response.data.country,
        city: Response.data.city,
        address: Response.data.address,
        passport: Response.data.passport,
        bthdte: Response.data.bthdte,
      };
      this.userInfo = Response.data;
      this.country = Response.data.country === null ? '' : Response.data.country;
      console.log(Response.data.phone);
      this.phone = Response.data.phone;
    }).then(() => {
      setTimeout(() => { this.loading = false; });
    });
  },
  methods: {
    checkValue(e) {
      if (e.target.value === '') {
        this.phone = '+';
      }
      if (this.rusAreaName.some((key) => key.toLowerCase() === this.userTopInfo.country.toLowerCase()) && e.target.value === '+8') {
        this.phone = e.target.value.replace(/\+8/, '+7');
      }
    },
    clearSkype() {
      this.userInfo.skype = null;
    },
    showToast(title, message, status) {
      // Use a shorter name for this.$createElement
      const h = this.$createElement;
      // Increment the toast count
      // Create the message
      const vNodesMsg = h('p', { class: ['text-center', 'mb-0'] }, [
        h('strong', { class: 'mr-2' }, message),
      ]);
      // Create the title
      const vNodesTitle = h(
        'div',
        { class: ['d-flex', 'flex-grow-1', 'align-items-baseline', 'mr-2'] },
        [
          h('strong', { class: 'mr-2' }, title),
        ],
      );
      // Pass the VNodes as an array for message and title
      this.$bvToast.toast([vNodesMsg], {
        title: [vNodesTitle],
        solid: true,
        variant: status,
      });
    },
    clearInputTop(name) {
      if (name === 'country') {
        this.userTopInfo[name] = '';
        this.$refs[name].focus();
        return;
      }
      this.userTopInfo[name] = null;
      this.$refs[name].focus();
    },
    clearInput(name) {
      this.userInfo[name] = null;
      this.$refs[name].focus();
    },
    checkInput(name) {
      if (this.$refs[name].value === null || this.$refs[name].value === '') {
        this.$refs[name].classList.add('error');
      } else if (this.$refs[name].classList.contains('error') && (this.$refs[name].value !== null || this.$refs[name].value !== '')) {
        this.$refs[name].classList.remove('error');
      }
    },
    clearPass(name) {
      this.password[name] = null;
    },
    clearCountry() {
      this.country = '';
    },
    clearPhone() {
      if (this.userTopInfo.country.toLowerCase() === 'россия' || this.userTopInfo.country.toLowerCase() === 'рф') {
        this.phone = '+';
        this.$refs.phone.focus();
        return;
      }
      this.phone = '+';
      this.$refs.phone.focus();
    },
    saveEmail() {
      const reMail = /^[\w-.]+@[\w-]+\.[a-z]{2,4}$/i;
      if (this.userInfo.email !== '' && this.userInfo.email !== null) {
        if (reMail.test(this.userInfo.email)) {
          this.$refs.email.classList.remove('error');
          backApi
            .post('/agent/change-mail-start', { new_mail: this.userInfo.email })
            .then(() => {
              this.createMessageBoxError(this.$t('На вашу почту пришло письмо для потверждения'));
              // this.showToast('Смена почты',
              //   'На вашу почту пришло письмо для потверждения!', 'success');
            })
            .catch((error) => {
              this.showToast('Ошибка!', error.response.data.detail, 'danger');
            });
        } else {
          this.showToast('Ошибка!', this.$t('Некорректный Email'), 'danger');
          this.$refs.email.classList.add('error');
        }
      } else {
        this.showToast('Ошибка!', this.$t('Заполните поле Email'), 'danger');
      }
    },
    savePhone() {
      if (this.phone !== '' && this.phone !== null) {
        console.log(this.phone.replace(/[-,(,),+]/g, '').length, this.phone.replace(/[-,(,),+]/g, ''));
        if (this.phone.replace(/[-,(,),+]/g, '').length >= 11) {
          this.$refs.phone.classList.remove('error');
          backApi
            .post('/agent/change-phone-start', { new_phone: this.phone.replace(/[-,(,),+]/g, '') })
            .then((Response) => {
              this.phoneHash = Response.data;
              this.smsStatus = true;
              this.createMessageBoxError(this.$t('На ваш телефон придет сообщение с смс кодом'));
            })
            .catch((error) => {
              this.createMessageBoxError(error.response.data.detail);
            });
        } else {
          this.showToast(this.$t('Ошибка'), this.$t('Некорректный номер телефона'), 'danger');
          this.$refs.phone.classList.add('error');
        }
      } else {
        this.showToast(this.$t('Ошибка'), this.$t('Заполните поле Телефон'), 'danger');
      }
    },
    checkSmsCode() {
      backApi.post('/agent/change-phone-end', {
        hash_content: this.phoneHash,
        sms_code: this.smsCode,
      })
        .then(() => {
          this.createMessageBoxError(this.$t('Ваш номер телефона изменен!'));
          this.smsStatus = false;
        })
        .catch((error) => {
          this.createMessageBoxError(error.response.data.detail);
        });
    },
    savePassword() {
      // eslint-disable-next-line prefer-template
      if (
        this.password.newPass === this.password.newPassRepeat
        && this.password.newPass.length >= 5
      ) {
        const data = {
          pwd_old: md5(this.password.currentPass),
          pwd_new: md5(this.password.newPass),
        };
        backApi
          .post('/agent/password-change', data)
          .then(() => {
            this.createMessageBoxError(this.$t('Ваш пароль успешно изменен!'));
            this.password = {};
          })
          .catch((error) => {
            this.createMessageBoxError(error.response.data.detail);
            // this.showToast('Ошибка', error.response.data.detail, 'danger');
          });
      }
      if (this.password.newPass !== this.password.newPassRepeat || this.password.currentPass === '' || this.password.newPass.length < 6) {
        let errorMsg = '';
        if (this.password.currentPass === '') {
          $(this.$refs.currentPass).addClass('error');
          errorMsg += `${this.$t('Введите Текущий пароль')}<br/><br/>`;
          // this.showToast('Ошибка', 'Введите Текущий пароль!', 'danger');
        }
        if (this.password.newPass !== this.password.newPassRepeat) {
          $(this.$refs.newPass).addClass('error');
          $(this.$refs.newPassRepeat).addClass('error');
          errorMsg += `${this.$t('Пароли не совпадают')}<br/><br/>`;
          // this.showToast('Ошибка', 'Пароли не совпадают!', 'danger');
        }
        if (this.password.newPass.length < 5) {
          errorMsg += `${this.$t('Длина пароля должна быть не меньше 5 символов')}<br/><br/>`;
          // this.showToast('Ошибка', 'Длина пароля должна быть не меньше 5 символов!', 'danger');
        }
        if (errorMsg !== '') {
          this.createMessageBoxError(errorMsg);
        }
      }
    },
    back() {
      const navEl = document.getElementsByClassName('router-link-exact-active router-link-active');
      $(navEl[0])
        .parent()
        .parent()
        .siblings()
        .addClass('active');
    },
    makeToast(append = false) {
      // eslint-disable-next-line no-plusplus
      this.toastCount++;
      this.$bvToast.toast(`This is toast number ${this.toastCount}`, {
        title: 'BootstrapVue Toast',
        autoHideDelay: 5000,
        appendToast: append,
      });
    },
    saveTopEdit() {
      if (!Object.values(this.userTopInfo).some((val) => val === null || val === '')) {
        backApi.post('agent/profile-edit',
          {
            country: this.userTopInfo.country,
            city: this.userTopInfo.city,
            address: this.userTopInfo.address,
            passport: this.userTopInfo.passport,
            bthdte: this.userTopInfo.bthdte,
            skype: this.userInfo.skype,
          }).then(() => {
          backApi.get('/agent/profile').then((Response) => {
            this.userInfo = Response.data;
          }).then(() => {
            // eslint-disable-next-line max-len
            Object.keys(this.userTopInfo).forEach((key) => {
              this.$refs[key].classList.remove('error');
            });
            this.createMessageBoxError(this.$t('Данные успешно изменены'));
          });
        });
      } else {
        // eslint-disable-next-line max-len
        Object.keys(this.userTopInfo).filter((key) => this.userTopInfo[key] === null).forEach((kkey) => {
          this.$refs[kkey].classList.add('error');
        });
        this.showToast(this.$t('Ошибка'), this.$t('Заполните обязательные поля'), 'danger');
      }
    },
    createMessageBoxError(messageText) {
      const h = this.$createElement;
      // More complex structure
      const messageVNode = h('div', { class: ['foobar'] }, [
        h('h5', { class: ['text-center'], domProps: { innerHTML: messageText } }),
      ]);
      // We must pass the generated VNodes as arrays
      return this.$bvModal.msgBoxOk([messageVNode], {
        buttonSize: 'xl',
        centered: true,
        cancelTitle: 'Нет',
        okTitle: 'OK',
        size: 'xl',
      });
    },
  },
  watch: {
    'userTopInfo.country': {
      handler() {
        // eslint-disable-next-line max-len
        if (this.rusAreaName.some((key) => key.toLowerCase() === this.userTopInfo.country.toLowerCase())) {
          this.mask = '+#(###)###-##-##';
          if (this.phone !== '') {
            this.phone = this.phone.replace(/^\+\d/, '+7');
          }
        } else {
          this.mask = '+###############';
        }
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.lbl{
  padding: 0;
  margin: 0;
  color: #383a41;
  font-size: 14px;
  & + p{
    color: black;
    font-weight: 500;
  }
}
.up{
  top: -13px;
  font-size: 13px;
}
.custom_label{
  font-size: 13px;
}
.el-loading-mask{
    background-color: red
}
.error{
  border-bottom: 1px solid red;
}
.myfoto{
  & img{
    border-radius: 50%;
  }
}
.t{
  & label{
    left: 5px;
  }
  & span{
    right: 0;
  }
}
input[type='date']::after {
  position: absolute;
  content: '';
  left: 0;
  top: 0;
  width: 80%;
  height: 80%;
  background-color: white;
  z-index: 10;
}
input[type='date']:valid::after {
  display: none;
}
input[type='date']:valid {
  padding-right: 15px;
  padding-top: 5px;
}
.edit {
  margin-top: 30px;
  .save__newinfo {
    float: right;
    border: 1px solid #32aaa7;
    background-color: #fff;
    border-radius: 0px;
    padding: 5px 60px;
    color: #32aaa7;
    font-size: 14px;
    font-weight: 500;
  }
}
@media (max-width: 760px) {
  .save__newinfo {
    width: 100%;
  }
}
@media (max-width: 525px) {
  .save__newinfo {
    padding: 5px 0 !important;
  }
  .page__caption {
    margin-top: 20px;
  }
  .t {
    margin-top: 20px;
  }
  .edit {
    margin-top: 0;
  }
  .mt-3 {
    margin-top: 30px !important;
  }
}
</style>
<style>
.mx-input {
  border: 0 !important;
  border-bottom: 1px solid #dee2f3 !important;
  border-radius: 0;
  padding-left: 6px;
  font-size: 16px;
  color: black;
  font-weight: 400;
}
.mx-calendar-content .cell:hover {
  color: #32aaa7;
}
.mx-table-date .today {
  color: #32aaa7;
}
.mx-icon-calendar,
.mx-icon-clear {
  right: 0;
}
</style>
