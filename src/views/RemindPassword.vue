<template>
  <div class="container">
    <h2 class="page__title">
      <!-- {{$t("Восстановить пароль")}} -->
    </h2>
    <div class="row">
      <div class="col mt-3 switch">
        <div class="auth_switch">
          <el-switch
            style="display: block"
            v-model="value2"
            active-text="ТЕЛЕФОН"
            inactive-text="EMAIL"
          >
          </el-switch>
        </div>
      </div>
    </div>
    <div class="row mt-4" v-show="!smsCodeCome">
      <div class="col-md-3 custom_input" v-show="!value2">
        <input type="text" name="email" id="email" required v-model="email" />
        <label for="email">{{ $t('E-mail') }}</label>
        <span class="clear_icon" @click="clearEmail()"></span>
      </div>
      <div class="col-md-3 custom_input" v-show="value2">
        <input
          type="text"
          name="phone"
          id="phone"
          v-mask="'+###############'"
          required
          v-model="phone"
        />
        <label for="phone">{{ $t('Телефон в международном формате') }}</label>
        <span class="clear_icon" @click="clearPhone()"></span>
      </div>
    </div>
    <div class="row mt-4" v-show="smsCodeCome">
      <div class="col-md-3 custom_input">
        <input type="text" name="smsCode" id="smsCode" required v-model="smsCode" />
        <label for="smsCode">
          {{ $t('Код') }}
        </label>
        <span class="clear_icon" @click="clearSmsCode()"></span>
      </div>
      <div class="col-md-3 custom_input">
        <input type="password" ref="newPass" name="newPass" id="newPass" required v-model="newPass" />
        <label for="newPass">
          {{ $t('Новый пароль') }}
        </label>
        <span :class="`show_pass_icon${newPassIsHide ? '_close' : ''}`" @click="showPass()" ></span>
        <span class="clear_icon" @click="clearNewPass()"></span>
      </div>
    </div>
    <div class="row mt-4" v-show="!smsCodeCome">
      <div class="col-md-6 ">
        <button
          :class="`rempass ${emailDis ? 'disabled' : ''}`"
          @click="remindPassEmail"
          v-show="!value2"
          :disabled="emailDis"
        >
          {{ $t('Восстановить пароль') }}
        </button>
        <button
          :class="`rempass ${phoneDis ? 'disabled' : ''}`"
          @click="remindPassPhone"
          v-show="value2"
          :disabled="phoneDis"
        >
          {{ $t('Восстановить пароль') }}
        </button>
      </div>
    </div>
    <div class="row mt-4" v-show="smsCodeCome">
      <div class="col-md-6 ">
        <button class="rempass" @click="saveNewPass">
          {{ $t('Изменить пароль') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import md5 from 'md5';
import { mapActions } from 'vuex';
import backApi from '../assets/backApi';

export default {
  name: 'RemindPassword',
  data() {
    return {
      emailDis: false,
      phoneDis: false,
      newPassIsHide: true,
      id_hash: '',
      value2: false,
      smsCodeCome: false,
      smsCode: '',
      newPass: '',
      email: '',
      phone: '',
    };
  },
  metaInfo() {
    this.setPageTitle(this.$t('Восстановить пароль'));
    return {
      title: `${this.$t('ЛК Партнера')} - ${this.$t('Восстановить пароль')}`,
    };
  },
  methods: {
    showPass() {
      const type = this.$refs.newPass.getAttribute('type') === 'password' ? 'text' : 'password';
      this.$refs.newPass.setAttribute('type', type);
      this.newPassIsHide = !this.newPassIsHide;
    },
    ...mapActions('currentPage', ['setPageTitle']),
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
        [h('strong', { class: 'mr-2' }, title)],
      );
      // Pass the VNodes as an array for message and title
      this.$bvToast.toast([vNodesMsg], {
        title: [vNodesTitle],
        solid: true,
        autoHideDelay: 1000,
        variant: status,
      });
    },
    remindPassEmail() {
      if (this.email !== '') {
        const data = {
          params: {
            email: this.email,
          },
        };
        this.emailDis = true;
        this.phoneDis = true;
        backApi
          .get('/remind-password', data)
          .then(() => {
            this.showToast(
              this.$t('Восстановление пароля'),
              this.$t('На вашу почту пришло письмо'),
              'success',
            );
            setTimeout(() => {
              this.$router.push('/login');
            }, 1500);
          })
          .catch(() => {
            this.emailDis = false;
            this.phoneDis = false;
            this.showToast(
              this.$t('Восстановление пароля'),
              this.$t('Почта указана не верно'),
              'danger',
            );
          });
      }
    },
    remindPassPhone() {
      if (this.phone !== '') {
        const data = {
          phone: Number(this.phone),
        };
        this.emailDis = true;
        this.phoneDis = true;
        backApi
          .post('/agent/restore-request', data)
          .then(Response => {
            this.showToast(
              this.$t('Восстановление пароля'),
              this.$t('На ваш телефон придет смс с кодом'),
              'success',
            );
            this.smsCodeCome = true;
            this.id_hash = Response.data.id;
          })
          .catch(() => {
            this.emailDis = false;
            this.phoneDis = false;
            this.showToast(
              this.$t('Восстановление пароля'),
              this.$t('Телефон указан не верно'),
              'danger',
            );
          });
      }
    },
    saveNewPass() {
      const data = {
        id: this.id_hash,
        code: Number(this.smsCode),
        password: md5(this.newPass),
      };
      backApi
        .post('/agent/restore-submit', data)
        .then(() => {
          this.$router.push('/login');
        })
        .catch(() => {
          console.log('Ошибка');
        });
    },
    clearEmail() {
      this.email = '';
    },
    clearPhone() {
      this.phone = '';
    },
    clearSmsCode() {
      this.smsCode = '';
    },
    clearNewPass() {
      this.newPass = '';
    },
  },
};
</script>

<style lang="scss" scoped>
.custom_input {
  & input {
    padding-left: 0 !important;
  }
  & label {
    left: 14px !important;
  }
}
.rempass {
  color: #32aaa7;
  padding: 2px 50px;
  background-color: white;
  border: 1px solid #32aaa7;
  &:hover {
    color: #fff;
    background: #32aaa7;
    // padding: 8px 50px;
  }
  &.disabled {
    color: #9a9a9a;
    background: none;
    border: 1px solid;
    border-color: #c4c4c4;
    cursor: auto;
    &:hover {
      background: none;
      color: #9a9a9a !important;
      border-color: #c4c4c4 !important;
      cursor: auto !important;
    }
  }
}
</style>
