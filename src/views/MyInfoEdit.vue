<template>
  <div class="myinfoedit__page">
    <div class="container">
      <h2 class="page__title">
        <p class="mobile_back" @click="back">
          <svg
            width="18"
            height="12"
            viewBox="0 0 18 12"
            fill="none"
            style="margin-right: 30px;"
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
          <div class="col-md-6 mt-3">
            <input type="text" name="country" id="country" required v-model="userInfo.country" />
            <label for="country">Страна:</label>
            <span class="clear_icon" @click="clearInput('country')">X</span>
          </div>
          <div class="col-md-6 mt-3">
            <input type="text" name="city" id="city" required v-model="userInfo.city" />
            <label for="city">Страна:</label>
            <span class="clear_icon" @click="clearInput('city')">X</span>
          </div>
        </div>
        <div class="row edit ">
          <div class="col-md-6 mt-3">
            <input type="text" name="address" id="address" required v-model="userInfo.address" />
            <label for="address">Адрес:</label>
            <span class="clear_icon" @click="clearInput('address')">X</span>
          </div>
          <div class="col-md-6 mt-3">
            <input type="text" name="passport" id="passport" required v-model="userInfo.passport" />
            <label for="passport">Паспорт:</label>
            <span class="clear_icon" @click="clearInput('passport')">X</span>
          </div>
        </div>
        <div class="row edit ">
          <div class="col-md-6 mt-3">
            <input type="date" name="bthdte" id="bthdte" required v-model="userInfo.bthdte" />
            <label for="bthdte">Дата рождения:</label>
            <span class="clear_icon" @click="clearInput('bthdte')">X</span>
          </div>
          <div class="col-md-6 mt-3">
            <input type="text" name="skype" id="skype" required v-model="userInfo.skype" />
            <label for="skype">Skype:</label>
            <span class="clear_icon" @click="clearInput('skype')">X</span>
          </div>
        </div>
        <div class="row edit mt-3">
          <div class="col-md">
            <button class="save__newinfo" v-on:click="saveTopEdit">Сохранить изменения</button>
          </div>
        </div>
      </div>
      <div class="bot__info mt-3">
        <div class="row">
          <div class="col-md-6"><p>Смена адреса почтового ящика</p></div>
          <div class="col-md-6"><p>Смена пароля</p></div>
        </div>
        <div class="row edit">
          <div class="col-md-6">
            <input type="text" name="email" id="email" required v-model="userInfo.email" />
            <label for="email">E-mail:</label>
            <span class="clear_icon" @click="clearInput('email')">X</span>
            <button class="save__newinfo mt-3" v-on:click="saveEmail">Сохранить изменения</button>
          </div>
          <div class="col-md-6">
            <input type="text" name="phone" id="phone" required v-model="userInfo.phone" />
            <label for="phone">Телефон:</label>
            <span class="clear_icon" @click="clearInput('phone')">X</span>
            <button class="save__newinfo mt-3" v-on:click="savePhone">
              Сохранить изменения
            </button>
          </div>
        </div>
        <div class="row edit">
          <div class="col-md mt-3">
            <input type="text" name="currentPass"
            id="currentPass" required v-model="password.currentPass" />
            <label for="currentPass">Текущий пароль:</label>
            <span class="clear_icon" @click="clearPass('currentPass')">X</span>
          </div>
          <div class="col-md mt-3">
            <input type="text" name="newPass" id="newPass" required v-model="password.newPass" />
            <label for="newPass">Новый пароль:</label>
            <span class="clear_icon" @click="clearPass('newPass')">X</span>
          </div>
          <div class="col-md mt-3">
            <input type="text" name="newPassRepeat"
            id="newPassRepeat" required v-model="password.newPassRepeat" />
            <label for="newPassRepeat">Повтор пароля:</label>
            <span class="clear_icon" @click="clearPass('newPassRepeat')">X</span>
          </div>
        </div>
        <div class="row edit mt-3">
          <div class="col-md">
            <button class="save__newinfo" @click="savePassword">Сохранить изменения</button>
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
import backApi from '../assets/backApi';

export default {
  name: 'MyInfoEdit',
  data() {
    return {
      password: {},
      userInfo: {},
      newPass: null,
      oldPass: null,
    };
  },
  mounted() {
    backApi.get('/agent/profile').then((Response) => {
      this.userInfo = Response.data;
    });
  },
  methods: {
    clearInput(name) {
      this.userInfo[name] = null;
    },
    clearPass(name) {
      this.password[name] = null;
    },
    saveEmail() {
      if (this.userInfo.email !== '' && this.userInfo.email !== null) {
        backApi.post('/agent/change_mail', { new_mail: this.userInfo.email }).then(() => {
          this.$bvToast.show('my-toast-success');
        }).catch(() => {
          this.$bvToast.show('my-toast-error');
        });
      }
    },
    savePhone() {
      if (this.userInfo.phone !== '' && this.userInfo.phone !== null) {
        backApi.post('/agent/change_phone', { new_phone: this.userInfo.phone }).then(() => {
          this.$bvToast.show('my-toast-success');
        }).catch(() => {
          this.$bvToast.show('my-toast-error');
        });
      }
    },
    savePassword() {
      // eslint-disable-next-line prefer-template
      if (this.password.newPass === this.password.newPassRepeat) {
        const ddd = {
          old_password: md5(this.password.currentPass),
          new_password: md5(this.password.newPass),
        };
        backApi.post('/agent/change_password', ddd).then(() => {
          this.$bvToast.show('my-toast-success');
        }).catch(() => {
          this.$bvToast.show('my-toast-error');
        });
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
      this.$bvToast.show('my-toast-good');
    },
  },
};
</script>

<style lang="scss" scoped>
input[type='date']::after{
  position: absolute;
  content: '';
  left: 0;
  top: 0;
  width: 80%;
  height: 80%;
  background-color: white;
  z-index: 10;
}
input[type='date']:valid::after{
  display: none;
}
input[type='date']:valid{
  padding-right: 15px;
  padding-top: 5px;
}
.col-md-6,
.col-md {
  position: relative;
  span {
    display: none;
    position: absolute;
    right: 18px;
    top: 10px;
    color: #32aaa7;
    cursor: pointer;
  }
  label {
    position: absolute;
    top: 5px;
    left: 20px;
    transition: 0.15s ease-in-out;
    color: #9a9a9a;
    font-size: 14px;
    z-index: 20;
  }
  input {
    width: 100%;
    border: 0;
    height: 35px;
    border-radius: 0;
    border-bottom: 1px solid #dee2f3;
    outline: none;
    padding-left: 5px;
    font-size: 14px;
    &:focus ~ label,
    &:valid ~ label {
      font-size: 12px;
      top: -10px;
    }
    &:valid ~ span {
      display: block;
    }
  }
}
.bot__info {
  p {
    color: #383a41;
    font-size: 20px;
  }
}
.edit {
  el-input clearable {
    width: 95%;
    height: 30px;
    border: 0;
    border-bottom: 1px solid #dee2f3;
    outline: none;
    padding-bottom: 5px;
  }
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
</style>
