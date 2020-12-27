<template>
  <div class="container">
    <h2 class="page__title">
      Верификация
    </h2>
    <div class="row mt-4" v-if="errorStatus">
      <div class="col-md-6">
        <div class="custom_input" v-if="!codeCome">
          <input type="text"
          v-mask="'# (###)-###-##-##'"
          name="mobile_phone" id="mobile_phone"
          required v-model="newUser.mobile_phone" />
          <label for="mobile_phone">Номер телефона:</label>
          <span class="clear_icon" @click="clearPhone()"></span>
        </div>
        <div class="custom_input" v-else>
          <input type="text" name="mobile_phone_code"
          id="mobile_phone_code" required v-model="mobile_phone_code" />
          <label for="mobile_phone_code">Смс код:</label>
          <span class="clear_icon" @click="clearPhoneCode()"></span>
        </div>
        <button @click="phoneCodeCome" v-if="!codeCome">
            Отправить код потверждения
        </button>
        <button
        v-else
        @click="getAccess"
        :disabled="!status"
        :class="`${status ? '' : 'disabled'}`">
            Потвердить код
        </button>
        <b-form-checkbox
          id="checkbox-1"
          v-model="status"
          name="checkbox-1"
          :value="true"
          v-if="codeCome"
          :unchecked-value="false"
        >
          Согласен на обработку данных
        </b-form-checkbox>
        <br>
        <button
        v-if="registeration"
        :disabled="!registeration"
        @click="$router.push('/');">Перейти в профиль</button>
      </div>
      <div class="col-md-6">
        <h4>Ваша почта подтверждена</h4>
        <p class="posr">{{ newUser.email }} awdadawd<span class="chval"></span></p>
      </div>
    </div>
    <div v-else>
    <h2 class="page__title">
      Произошла ошибка! Приносим свои извенения.
    </h2>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import backApi from '../assets/backApi';

export default {
  name: 'RegistrationConfirm',
  data() {
    return {
      newUser: {},
      errorStatus: true,
      mobile_phone_code: null,
      codeCome: false,
      phoneCheck: true,
      phoneCode: null,
      status: false,
      registeration: false,
    };
  },
  mounted() {
    backApi.get('/agent/new-agent', { params: { hash_content: this.$route.params.signup_hash } }).then((Response) => {
      this.newUser = Response.data;
    }).catch(() => {
      this.showToast('', 'Произошла ошибка!', 'danger');
      this.errorStatus = false;
    });
  },
  methods: {
    ...mapActions('auth', ['register']),
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
    phoneCodeCome() {
      const data = {
        hash_content: this.$route.params.signup_hash,
        mobile_phone: this.newUser.mobile_phone,
      };
      backApi.post('/agent/new-agent/send-code', data)
        .then(() => {
          this.showToast('СМС потверждение', 'На ваш телефон придет смс с кодом для потверждения', 'success');
          this.codeCome = true;
        });
    },
    phoneCodeCheck() {
      const data = {
        hash_content: this.$route.params.signup_hash,
        // eslint-disable-next-line radix
        sms_code: parseInt(this.mobile_phone_code),
      };
      backApi.post('/agent/signup-end', data)
        .then(() => {
          this.phoneCheck = false;
          this.showToast('СМС потверждение', 'Ваш код потвержден', 'success');
        })
        .catch((error) => {
          this.showToast('СМС потверждение', error.response.data.detail, 'danger');
        });
    },
    getAccess() {
      const data = {
        hash_content: this.$route.params.signup_hash,
        sms_code: this.mobile_phone_code,
      };
      this.register(data).then(() => {
        // this.$router.push('/');
        this.registeration = true;
        this.showToast('Регистриция', 'Вы успешно прошли регистрацию', 'success');
      });
    },
    clearPhone() {
      this.newUser.mobile_phone = null;
    },
  },
};
</script>

<style lang="scss" scoped>
.posr{
  position: relative;
  display: inline-block;
}
.chval{
    position: absolute;
    background: url('../assets/imgs/chval.svg') no-repeat;
    width: 12px;
    height: 12px;
    top: 8px;
    right: -40px;
    // top: 80%;
}
p{
    margin: 0;
    padding: 0;
}
.custom_input {
  margin-top: 10px;;
    width: 50%;
  input {
    // width: 50%;
    padding-left: 0px;
  }
  & label{
      left: 0;
  }
}
button:nth-of-type(1) {
  background-color: white;
  border: 2px solid #32aaa7;
  color: #32aaa7;
  font-weight: 500;
  // width: 30%;
  padding: 4px 20px;
  margin-top: 30px;
  margin-bottom: 30px;
  &.disabled{
    color: #9A9A9A;
    background-color: #DEE2F3;
    border: 2px solid  #DEE2F3;
  }
}
button:nth-of-type(2) {
  background-color: #32aaa7;
  border: none;
  color: white;
  font-weight: 400;
  width: 30%;
  padding: 4px 0px;
  margin-top: 30px;
  margin-bottom: 30px;
  &.disabled {
    color: #9a9a9a;
    background-color: #dee2f3;
  }
}
</style>
