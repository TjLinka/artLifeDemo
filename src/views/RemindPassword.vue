<template>
  <div class="container">
    <h2 class="page__title">
      Восстановить пароль
    </h2>
      <div class="row">
        <div class="col mt-3 switch">
        <div class="auth_switch">
                    <el-switch
        style="display: block"
        v-model="value2"
        active-text="ТЕЛЕФОН"
        inactive-text="EMAIL">
      </el-switch>
        </div>
        </div>
      </div>
    <div class="row mt-4" v-show='!smsCodeCome'>
      <div class="col-md-3 custom_input" v-show="!value2">
        <input type="text" name="email" id="email" required v-model="email" />
        <label for="email">Email</label>
        <span class="clear_icon" @click="clearEmail()"></span>
      </div>
      <div class="col-md-3 custom_input" v-show="value2">
        <input type="text" name="phone" id="phone" required v-model="phone" />
        <label for="phone">Телефон</label>
        <span class="clear_icon" @click="clearPhone()"></span>
      </div>
    </div>
    <div class="row mt-4" v-show='smsCodeCome'>
      <div class="col-md-3 custom_input">
        <input type="text" name="smsCode" id="smsCode" required v-model="smsCode" />
        <label for="smsCode">Код</label>
        <span class="clear_icon" @click="clearSmsCode()"></span>
      </div>
      <div class="col-md-3 custom_input">
        <input type="text" name="newPass" id="newPass" required v-model="newPass" />
        <label for="newPass">Новый пароль</label>
        <span class="clear_icon" @click="clearNewPass()"></span>
      </div>
    </div>
    <div class="row mt-4" v-show='!smsCodeCome'>
      <div class="col-md-6 ">
          <button class="rempass" @click="remindPassEmail"
          v-show="!value2">Восстановить пароль</button>
          <button class="rempass" @click="remindPassPhone" v-show="value2">
            Восстановить пароль</button>
      </div>
    </div>
    <div class="row mt-4" v-show='smsCodeCome'>
      <div class="col-md-6 ">
          <button class="rempass" @click="saveNewPass">Изменить пароль</button>
      </div>
    </div>
  </div>
</template>

<script>
import md5 from 'md5';
import backApi from '../assets/backApi';

export default {
  name: 'RemindPassword',
  data() {
    return {
      id_hash: '',
      value2: false,
      smsCodeCome: false,
      smsCode: '',
      newPass: '',
      email: '',
      phone: '',
    };
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
        backApi.get('/remind-password', data).then(() => {
          this.showToast('Восстановление пароля', 'На вашу почту пришло письмо!', 'success');
          setTimeout(() => { this.$router.push('/login'); }, 1500);
        }).catch(() => {
          this.showToast('Восстановление пароля', 'Почта указана не верно', 'danger');
        });
      }
    },
    remindPassPhone() {
      if (this.phone !== '') {
        const data = {
          phone: Number(this.phone),
        };
        backApi.post('/agent/restore-request', data).then((Response) => {
          this.showToast('Восстановление пароля', 'На ваш телефон придёт смс с кодом!', 'success');
          this.smsCodeCome = true;
          this.id_hash = Response.data.id;
        }).catch(() => {
          this.showToast('Восстановление пароля', 'Телефон указан не верно', 'danger');
        });
      }
    },
    saveNewPass() {
      const data = {
        id: this.id_hash,
        code: Number(this.smsCode),
        password: md5(this.newPass),
      };
      backApi.post('/agent/restore-submit', data)
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
.custom_input{
  & input{
    padding-left: 0 !important;
  }
  & label{
    left: 14px !important;
  }
}
.rempass{
    color: #32AAA7;
    padding: 2px 50px;
    background-color: white;
    border: 1px solid #32AAA7;
    &:hover{
        color: #FFF;
        background: #32AAA7;
        // padding: 8px 50px;
    }
}
</style>
