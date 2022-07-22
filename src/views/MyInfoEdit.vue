<template>
  <div class="container" v-show="!loading">
    <div class="top__info mt-3">
      <div class="row">
        <div class="col-md-6 mt-3" v-if="userInfo.agreementsystem">
          <g-input
            v-model="userTopInfo.country"
            :id="'country'"
            :placeholder="'Страна'"
            :type="'text'"
          />
          <div ref="country"></div>
        </div>
        <div class="col-md-6 mt-3" v-if="userInfo.agreementsystem">
          <g-input v-model="userTopInfo.city" :id="'city'" :placeholder="'Город'" :type="'text'" />
          <div ref="city"></div>
        </div>
        <div class="col-md-6 custom_input mt-3" v-if="!userInfo.agreementsystem">
          <p class="lbl">{{ $t('Страна') }}:</p>
          <p>{{ userTopInfo.country }}</p>
        </div>
        <div class="col-md-6 custom_input mt-3" v-if="!userInfo.agreementsystem">
          <p class="lbl">{{ $t('Город') }}:</p>
          <p>{{ userTopInfo.city }}</p>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-md-6 mt-3" v-if="userInfo.agreementsystem">
          <g-input
            v-model="userTopInfo.address"
            :id="'address'"
            :placeholder="'Адрес'"
            :type="'text'"
          />
          <div ref="address"></div>
        </div>
        <div class="col-md-6 mt-3" v-if="userInfo.agreementsystem">
          <g-input
            v-model="userTopInfo.passport"
            :id="'passport'"
            :placeholder="'Паспорт'"
            :type="'text'"
          />
          <div ref="passport"></div>
        </div>
        <div class="col-md-6 custom_input mt-3" v-if="!userInfo.agreementsystem">
          <p class="lbl">{{ $t('Адрес') }}:</p>
          <p>{{ userTopInfo.address }}</p>
        </div>
        <div class="col-md-6 custom_input mt-3" v-if="!userInfo.agreementsystem">
          <p class="lbl">{{ $t('Паспорт') }}:</p>
          <p>{{ userTopInfo.passport }}</p>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-md-6 mt-3" v-if="userInfo.agreementsystem"></div>
        <div class="col-md-6 mt-3" v-if="userInfo.agreementsystem">
          <g-input
            v-model="userTopInfo.skype"
            :id="'skype'"
            :placeholder="'Доп. контакты'"
            :type="'text'"
          />
          <div ref="skype"></div>
        </div>
        <div class="col-md-6 mt-3" v-if="!userInfo.agreementsystem">
          <p class="lbl">{{ $t('Дата рождения') }}:</p>
          <p>
            {{ new Date(userTopInfo.bthdte).toLocaleDateString() }}
          </p>
        </div>
        <div class="col-md-6 custom_input mt-3" v-if="!userInfo.agreementsystem">
          <p class="lbl">{{ $t('Доп. контакты') }}:</p>
          <p>
            {{ userTopInfo.skype }}
          </p>
        </div>
      </div>
      <div class="row mt-3" v-if="userInfo.agreementsystem">
        <div class="col"></div>
        <div class="col">
          <g-button
            :disabled="inActionInfo"
            :width="'40%'"
            @click="saveTopEdit"
            class="float-right"
          >
            Сохранить изменения
          </g-button>
        </div>
      </div>
    </div>
    <div class="bot__info mt-3">
      <div class="row">
        <div class="col-md-6" v-if="userInfo.agreementsystem">
          <p class="page__caption">{{ $t('Смена адреса почтового ящика') }}</p>
          <div>
            <g-input
              v-model="userInfo.email"
              :id="'email'"
              :placeholder="'E-mail'"
              :type="'text'"
            />
            <g-button
              :disabled="inActionEmail"
              :width="'40%'"
              class="mt-3 float-right"
              @click="saveEmail"
            >
              Сохранить изменения
            </g-button>
          </div>
        </div>
        <div class="col-md-6" v-if="userInfo.agreementsystem">
          <p class="page__caption">{{ $t('Смена телефона') }}</p>
          <div v-show="!smsStatus">
            <g-phone-input v-model="phone" />
            <g-button
              :disabled="inActionPhone"
              :width="'40%'"
              @click="savePhone"
              class="float-right mt-3"
            >
              Сохранить изменения
            </g-button>
          </div>
          <div v-show="smsStatus">
            <g-input
              v-model="smsCode"
              :id="'smsCode'"
              :placeholder="'Код подтверждения'"
              :type="'text'"
            />
            <g-button
              :disabled="inActionPhone"
              :width="'40%'"
              @click="checkSmsCode"
              class="float-right mt-3"
            >
              Подтвердить
            </g-button>
          </div>
        </div>
        <div class="col-md-6" v-if="!userInfo.agreementsystem">
          <p class="lbl">
            Почтовый ящик
          </p>
          <p>
            {{ userInfo.email }}
          </p>
        </div>
        <div class="col-md-6" v-if="!userInfo.agreementsystem">
          <p class="lbl">
            Телефон
          </p>
          <p>
            {{ userInfo.phone }}
          </p>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <p class="page__caption">{{ $t('Смена пароля') }}</p>
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
          <label for="currentPass">{{ $t('Текущий пароль') }}</label>
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
          <label for="newPass">{{ $t('Новый пароль') }}</label>
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
          <label for="newPassRepeat">{{ $t('Повтор пароля') }}</label>
          <span class="clear_icon" @click="clearPass('newPassRepeat')"></span>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-md"></div>
        <div class="col-md">
          <g-button :width="'40%'" class="float-right" @click="savePassword">
            Сохранить изменения
          </g-button>
          <!-- <button class="save__newinfo"
            @click="savePassword">{{$t("Сохранить изменения")}}</button> -->
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
      {{ $t('Ваш данные успешно изменены') }}!
    </b-toast>
    <b-toast id="my-toast-error" variant="warning" solid>
      <template #toast-title>
        <div class="d-flex flex-grow-1 align-items-baseline">
          <b-img blank blank-color="#ff5555" class="mr-2" width="12" height="12"></b-img>
          <strong class="mr-auto">Ошибка!</strong>
        </div>
      </template>
      {{ $t('При изменении данных произошла ошибка') }}!
    </b-toast>
  </div>
</template>

<script>
import md5 from 'md5';
import { mapActions } from 'vuex';
// import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import 'vue2-datepicker/locale/ru';
import $ from 'jquery';
import backApi from '../assets/backApi';
import GInput from '../components/Forms/GInput.vue';
import GPhoneInput from '../components/Forms/GPhoneInput.vue';
import GButton from '../components/Forms/GButton.vue';
import GModalConfirm from '../mixins/GModalConfirm';
import GNotification from '../mixins/Gnotifacation';

export default {
  components: { GInput, GPhoneInput, GButton },
  name: 'MyInfoEdit',
  mixins: [GModalConfirm, GNotification],
  data() {
    return {
      inActionInfo: false,
      inActionEmail: false,
      inActionPhone: false,
      loading: true,
      phoneHash: null,
      smsCode: null,
      smsStatus: false,
      curPassIsHide: true,
      newPassIsHide: true,
      newPassRepIsHide: true,
      country: '',
      phone: '',
      passport: '',
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
  metaInfo() {
    this.setPageTitle(this.$t('Редактирование личных данных'));
    return {
      title: `${this.$t('ЛК Партнера')} - ${this.$t('Редактирование личных данных')}`,
    };
  },
  mounted() {
    backApi
      .getAgentProfile()
      .then(Response => {
        this.userTopInfo = {
          country: Response.data.country === null ? '' : Response.data.country,
          city: Response.data.city,
          address: Response.data.address,
          passport: Response.data.passport,
          skype: Response.data.skype,
          // bthdte: Response.data.bthdte,
        };
        this.userInfo = Response.data;
        this.country = Response.data.country === null ? '' : Response.data.country;
        this.phone = Response.data.phone;
      })
      .then(() => {
        setTimeout(() => {
          this.loading = false;
        }, 100);
      });
  },
  methods: {
    showPass(refName) {
      if (refName === 'currentPass') this.curPassIsHide = !this.curPassIsHide;
      if (refName === 'newPass') this.newPassIsHide = !this.newPassIsHide;
      if (refName === 'newPassRepeat') this.newPassRepIsHide = !this.newPassRepIsHide;
      const type = this.$refs[refName].getAttribute('type') === 'password' ? 'text' : 'password';
      this.$refs[refName].setAttribute('type', type);
    },
    ...mapActions('currentPage', ['setPageTitle']),
    checkInput(name) {
      if (this.$refs[name].value === null || this.$refs[name].value === '') {
        this.$refs[name].classList.add('error');
      } else if (
        this.$refs[name].classList.contains('error') && (this.$refs[name].value !== null || this.$refs[name].value !== '')
      ) {
        this.$refs[name].classList.remove('error');
      }
    },
    saveEmail() {
      const reMail = /^[\w-.]+@[\w-]+\.[a-z]{2,4}$/i;
      if (this.userInfo.email !== '' && this.userInfo.email !== null) {
        if (reMail.test(this.userInfo.email)) {
          this.inActionEmail = true;
          // this.$refs.email.classList.remove('error');
          backApi
            .post('/agent/change-mail-start', { new_mail: this.userInfo.email })
            .then(() => {
              // this.createMessageBoxError(this.$t('На вашу почту пришло письмо для потверждения'));
              this.showToast(
                'Смена почты',
                'На вашу почту пришло письмо для потверждения!',
                'success',
              );
              this.inActionEmail = false;
            })
            .catch(error => {
              this.inActionEmail = false;
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
        console.log(
          this.phone.replace(/[-,(,),+]/g, '').length,
          this.phone.replace(/[-,(,),+]/g, ''),
        );
        if (this.phone.replace(/[-,(,),+]/g, '').length >= 11) {
          // this.$refs.phone.classList.remove('error');
          this.inActionPhone = true;
          backApi
            .post('/agent/change-phone-start', { new_phone: this.phone.replace(/[-,(,),+]/g, '') })
            .then(Response => {
              this.phoneHash = Response.data;
              this.smsStatus = true;
              this.inActionPhone = false;
              this.createMessageBoxError(this.$t('На ваш телефон придет сообщение с смс кодом'));
            })
            .catch(error => {
              this.inActionPhone = false;
              this.createMessageBoxError(error.response.data.detail);
            });
        } else {
          this.showToast(this.$t('Ошибка'), this.$t('Некорректный номер телефона'), 'danger');
          // this.$refs.phone.classList.add('error');
        }
      } else {
        this.showToast(this.$t('Ошибка'), this.$t('Заполните поле Телефон'), 'danger');
      }
    },
    checkSmsCode() {
      this.inActionPhone = true;
      backApi
        .post('/agent/change-phone-end', {
          hash_content: this.phoneHash,
          sms_code: this.smsCode,
        })
        .then(() => {
          this.inActionPhone = false;
          this.createMessageBoxError(this.$t('Ваш номер телефона изменен!'));
          this.smsStatus = false;
        })
        .catch(error => {
          this.inActionPhone = false;
          this.createMessageBoxError(error.response.data.detail);
        });
    },
    savePassword() {
      // eslint-disable-next-line prefer-template
      if (
        this.password.newPass === this.password.newPassRepeat && this.password.newPass.length >= 5
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
          .catch(error => {
            this.createMessageBoxError(error.response.data.detail);
            // this.showToast('Ошибка', error.response.data.detail, 'danger');
          });
      }
      if (
        this.password.newPass !== this.password.newPassRepeat || this.password.currentPass === '' || this.password.newPass.length < 6
      ) {
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
      if (!Object.values(this.userTopInfo).some(val => val === null || val === '')) {
        this.inAction = true;
        backApi
          .post('agent/profile-edit', {
            country: this.userTopInfo.country,
            city: this.userTopInfo.city,
            address: this.userTopInfo.address,
            passport: this.userTopInfo.passport,
            skype: this.userTopInfo.skype,
          })
          .then(() => {
            backApi
              .get('/agent/profile')
              .then(Response => {
                this.userInfo = Response.data;
              })
              .then(() => {
                // eslint-disable-next-line max-len
                Object.keys(this.userTopInfo).forEach(key => {
                  this.$refs[key].classList.remove('error');
                });
                this.createMessageBoxError(this.$t('Данные успешно изменены'));
                this.inAction = false;
              });
          });
      } else {
        // eslint-disable-next-line max-len
        Object.keys(this.userTopInfo)
          .filter(key => this.userTopInfo[key] === null || this.userTopInfo[key] === '')
          .forEach(kkey => {
            console.log(kkey);
            console.log(this.$refs);
            this.$refs[kkey].classList.add('error');
          });
        this.showToast(this.$t('Ошибка'), this.$t('Заполните обязательные поля'), 'danger');
      }
    },
  },
  computed: {
  },
};
</script>

<style lang="scss" scoped>
.lbl {
  padding: 0;
  margin: 0;
  color: #383a41;
  font-size: 14px;
  & + p {
    color: black;
    font-weight: 500;
  }
}
.up {
  top: -13px;
  font-size: 13px;
}
.custom_label {
  font-size: 13px;
}
.el-loading-mask {
  background-color: red;
}
.error {
  border-bottom: 1px solid red;
}
.myfoto {
  & img {
    border-radius: 50%;
  }
}
.t {
  & label {
    left: 5px;
  }
  & span {
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
