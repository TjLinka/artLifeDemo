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
        Редакитирование личных данных
      </h2>
      <div class="myfoto">
        <img src="../assets/imgs/unnamed 1.png" alt="" />
      </div>
      <div class="top__info mt-3">
        <div class="row edit ">
          <div class="col-md-6 custom_input mt-3">
            <input type="text" name="country" id="country" required v-model="userInfo.country" />
            <label for="country">Страна</label>
            <span class="clear_icon" @click="clearInput('country')"></span>
          </div>
          <div class="col-md-6 custom_input mt-3">
            <input type="text" name="city" id="city" required v-model="userInfo.city" />
            <label for="city">Город</label>
            <span class="clear_icon" @click="clearInput('city')"></span>
          </div>
        </div>
        <div class="row edit ">
          <div class="col-md-6 custom_input mt-3">
            <input type="text" name="address" id="address" required v-model="userInfo.address" />
            <label for="address">Адрес</label>
            <span class="clear_icon" @click="clearInput('address')"></span>
          </div>
          <div class="col-md-6 custom_input mt-3">
            <input type="text" name="passport" id="passport" required v-model="userInfo.passport" />
            <label for="passport">Паспорт</label>
            <span class="clear_icon" @click="clearInput('passport')"></span>
          </div>
        </div>
        <div class="row edit ">
          <div class="col-md-6 mt-3">
            <span v-if="userInfo.bthdte" class="custom_label">Дата рождения</span>
            <date-picker
              v-model="userInfo.bthdte"
              value-type="YYYY-MM-DD"
              format="DD.MM.YYYY"
              type="date"
              placeholder="Дата рождения"
              style="width: 100%"
              range-separator=" - "
            ></date-picker>
          </div>
          <div class="col-md-6 custom_input mt-3">
            <input type="text" name="skype" id="skype" required v-model="userInfo.skype" />
            <label for="skype">Доп. контакты</label>
            <span class="clear_icon" @click="clearInput('skype')"></span>
          </div>
        </div>
        <div class="row edit mt-3">
          <div class="col-md">
            <button class="save__newinfo" v-on:click="saveTopEdit">Сохранить изменения</button>
          </div>
        </div>
      </div>
      <div class="bot__info custom_input mt-3">
        <div class="row edit">
          <div class="col-md-6">
            <p class="page__caption">Смена адреса почтового ящика</p>
            <div class="custom_input t">
              <input type="text" name="email" id="email" required v-model="userInfo.email" />
              <label for="email">E-mail</label>
              <span class="clear_icon" @click="clearInput('email')"></span>
              <button class="save__newinfo mt-3" v-on:click="saveEmail">Сохранить изменения</button>
            </div>
          </div>
          <div class="col-md-6">
            <p class="page__caption">Смена телефона</p>
            <div class="custom_input t" v-show="!smsStatus">
              <input type="text"
              v-mask="'+7(###)-###-##-##'"
              name="phone" id="phone"
              required v-model="userInfo.phone" />
              <label for="phone">Телефон</label>
              <span class="clear_icon" @click="clearInput('phone')"></span>
              <button class="save__newinfo mt-3" v-on:click="savePhone">
                Сохранить изменения
              </button>
            </div>
            <div class="custom_input t" v-show="smsStatus">
              <input type="text"
              name="smsCode" id="smsCode"
              required v-model="smsCode" />
              <label for="smsCode">Код подтверждения</label>
              <span class="clear_icon" @click="clearInput('phone')"></span>
              <button class="save__newinfo mt-3" v-on:click="checkSmsCode">
                Потвердить
              </button>
            </div>
            <!-- <div class="custom_input t" v-if="smsStatus">
              <input type="text" name="smsCode" id="smsCode" required v-model="smsCode" />
              <label for="smsCode">Код потверждения</label>
              <span class="clear_icon" @click="clearInput('smsCode')"></span>
              <button class="save__newinfo mt-3" v-on:click="checkSmsCode">
                Потвердить
              </button>
            </div> -->
          </div>
        </div>
        <div class="row edit">
          <div class="col">
            <p class="page__caption">Смена пароля</p>
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
            <label for="currentPass">Текущий пароль</label>
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
            <label for="newPass">Новый пароль</label>
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
            <label for="newPassRepeat">Повтор пароля</label>
            <span class="clear_icon" @click="clearPass('newPassRepeat')"></span>
          </div>
        </div>
        <div class="row edit mt-3">
          <div class="col-md">
            <button class="save__newinfo" @click="savePassword">Сохранить изменения</button>
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
          <!-- <small class="text-muted mr-2">42 seconds ago</small> -->
        </div>
      </template>
      Ваш данные успешно изменены!
    </b-toast>
    <b-toast id="my-toast-error" variant="warning" solid>
      <template #toast-title>
        <div class="d-flex flex-grow-1 align-items-baseline">
          <b-img blank blank-color="#ff5555" class="mr-2" width="12" height="12"></b-img>
          <strong class="mr-auto">Ошибка!</strong>
          <!-- <small class="text-muted mr-2">42 seconds ago</small> -->
        </div>
      </template>
      При изменении данных произошла ошибка!
    </b-toast>
  </div>
</template>

<script>
import md5 from 'md5';
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import 'vue2-datepicker/locale/ru';
import $ from 'jquery';
import backApi from '../assets/backApi';

export default {
  name: 'MyInfoEdit',
  components: { DatePicker },
  data() {
    return {
      loading: true,
      phoneHash: null,
      smsCode: null,
      smsStatus: false,
      password: {
        newPass: '',
        newPassRepeat: '',
        currentPass: '',
      },
      userInfo: {},
      newPass: null,
      oldPass: null,
    };
  },
  mounted() {
    backApi.get('/agent/profile').then((Response) => {
      this.userInfo = Response.data;
    }).then(() => {
      setTimeout(() => { this.loading = false; });
    });
  },
  methods: {
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
    clearInput(name) {
      this.userInfo[name] = null;
    },
    clearPass(name) {
      this.password[name] = null;
    },
    saveEmail() {
      if (this.userInfo.email !== '' && this.userInfo.email !== null) {
        backApi
          .post('/agent/change-mail-start', { new_mail: this.userInfo.email })
          .then(() => {
            this.showToast('Смена почты', 'На вашу почту пришло письмо для потверждения!', 'success');
          })
          .catch((error) => {
            this.showToast('Ошибка!', error.response.data.detail, 'danger');
          });
      }
    },
    savePhone() {
      if (this.userInfo.phone !== '' && this.userInfo.phone !== null) {
        backApi
          .post('/agent/change-phone-start', { new_phone: this.userInfo.phone.replace(/[-,(,),+]/g, '') })
          .then((Response) => {
            this.phoneHash = Response.data;
            this.smsStatus = true;
            this.showToast('Смена пароля', 'На ваш телефон придет сообщение с смс кодом!', 'success');
          })
          .catch((error) => {
            this.showToast('Ошибка', error.response.data.detail, 'danger');
          });
      }
    },
    checkSmsCode() {
      backApi.post('/agent/change-phone-end', {
        hash_content: this.phoneHash,
        sms_code: this.smsCode,
      })
        .then(() => {
          this.showToast('Смена телефона', 'Ваш номер телефона изменён!', 'success');
          this.smsStatus = false;
        })
        .catch((error) => {
          this.showToast('Смена телефона', error.response.data.detail, 'danger');
        });
    },
    savePassword() {
      // eslint-disable-next-line prefer-template
      if (
        this.password.newPass === this.password.newPassRepeat
        && this.password.newPass.length >= 5
      ) {
        const data = {
          old_password: md5(this.password.currentPass),
          new_password: md5(this.password.newPass),
        };
        backApi
          .post('/agent/change_password', data)
          .then(() => {
            this.showToast('Смена пароля', 'Ваш пароль успешно изменён!', 'success');
            this.password = {};
          })
          .catch((error) => {
            this.showToast('Ошибка', error.response.data.detail, 'danger');
          });
      }
      if (this.password.newPass !== this.password.newPassRepeat || this.password.currentPass === '' || this.password.newPass.length < 6) {
        if (this.password.currentPass === '') {
          $(this.$refs.currentPass).addClass('error');
          this.showToast('Ошибка', 'Введите Текущий пароль!', 'danger');
        }
        if (this.password.newPass !== this.password.newPassRepeat) {
          $(this.$refs.newPass).addClass('error');
          $(this.$refs.newPassRepeat).addClass('error');
          this.showToast('Ошибка', 'Пароли не совпадают!', 'danger');
        }
        if (this.password.newPass.length < 5) {
          this.showToast('Ошибка', 'Длина пароля должна быть не меньше 5 символов!', 'danger');
        }
      }
    },
    back() {
      this.$router.go(-1);
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
    async saveTopEdit() {
      await backApi.post('agent/profile-edit', this.userInfo);
      backApi.get('/agent/profile').then((Response) => {
        this.userInfo = Response.data;
      });
      this.$bvToast.show('my-toast-success');
    },
  },
};
</script>

<style lang="scss" scoped>
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
