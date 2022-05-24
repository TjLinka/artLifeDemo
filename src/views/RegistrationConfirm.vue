<template>
  <div class="container" v-if="loaded">
    <div v-if="errorStatus">
       <h2 class="page__title">
      {{$t('Верификация')}}
    </h2>
    <div class="row mt-4">
      <div class="col-md-6">
        <div class="custom_input" v-show="!codeCome">
          <input
          type="text"
          v-mask="mask"
          @input="checkValue"
          name="mobile_phone"
          id="mobile_phone"
          required v-model="newUser.mobile_phone" />
          <label for="mobile_phone">{{$t('Номер телефона')}}:</label>
          <span class="clear_icon" @click="clearPhone()"></span>
        </div>
        <div class="custom_input" v-show="codeCome">
          <input type="text" name="mobile_phone_code"
          id="mobile_phone_code" required v-model="mobile_phone_code" />
          <label for="mobile_phone_code">{{$t('Смс код')}}:</label>
          <span class="clear_icon" @click="clearPhoneCode()"></span>
        </div>
        <button @click="phoneCodeCome" v-if="!codeCome">
            {{$t("Отправить код потверждения")}}
        </button>
        <b-form-checkbox
          class="mt-3"
          id="checkbox-1"
          v-model="status"
          name="checkbox-1"
          :value="true"
          v-if="codeCome"
          :unchecked-value="false"
        >
          {{$t("Я даю своё согласие на обработку и использование моих персональных данных")}}
        </b-form-checkbox>
        <button
        v-if="codeCome"
        @click="getAccess"
        :disabled="!status"
        :class="`${status ? '' : 'disabled'}`">
            {{$t("Подтвердить код")}}
        </button>
        <br>
        <button
        v-if="registeration"
        :disabled="!registeration"
        @click="$router.push('/');">
        {{$t("Перейти в профиль")}}
        </button>
      </div>
      <div class="col-md-6">
        <h4>{{$t("Ваша почта подтверждена")}}</h4>
        <p class="posr">{{ newUser.email }}<span class="chval"></span></p>
      </div>
    </div>
    </div>
    <div v-else>
    <h2 class="page__title">
      Такой Hash не существует! Вы будете перенаправлены на страницу авторизации.
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
      mask: '+#(###)###-##-##',
      newUser: {
        mobile_phone: '',
      },
      loaded: false,
      errorStatus: true,
      mobile_phone_code: null,
      codeCome: false,
      phoneCheck: true,
      phoneCode: null,
      status: false,
      registeration: false,
    };
  },
  metaInfo() {
    return {
      title: `${this.$t('ЛК Партнера')} - ${this.$t('Верификация')}`,
    };
  },
  mounted() {
    backApi.get('/agent/new-agent', { params: { hash_content: this.$route.params.signup_hash } }).then((Response) => {
      this.loaded = true;
      this.newUser = Response.data;
    })
      .catch(() => {
        // this.showToast('Ошибка', error.response.data.detail, 'danger');
        this.errorStatus = false;
        this.loaded = true;
        setTimeout(() => {
          this.$router.push('/login');
        }, 4000);
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
        mobile_phone: this.newUser.mobile_phone.replace(/[-,(,),+]/g, ''),
      };
      backApi.post('/agent/new-agent/send-code', data)
        .then(() => {
          this.showToast(this.$t('СМС потверждение'), this.$t('На ваш телефон придет смс с кодом для потверждения'), 'success');
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
          this.showToast(this.$t('СМС потверждение'), this.$t('Ваш код потвержден'), 'success');
        })
        .catch((error) => {
          this.showToast(this.$t('СМС потверждение'), error.response.data.detail, 'danger');
        });
    },
    getAccess() {
      const params = {
        hash_content: this.$route.params.signup_hash,
        sms_code: this.mobile_phone_code,
      };
      backApi
        .post('/agent/signup-end', params)
        .then((resp) => {
          const data = JSON.stringify(resp.data);
          const token = resp.data.access_token;
          localStorage.setItem('access_token', data);
          backApi.defaults.headers.common['access-token'] = token;
          this.register(resp).then(() => {
            // this.$router.push('/');
            this.registeration = true;
            this.showToast(this.$t('Регистриция'), this.$t('Вы успешно прошли регистрацию'), 'success');
          });
        });
    },
    clearPhone() {
      this.newUser.mobile_phone = '+';
    },
    checkValue(e) {
      console.log(e);
      if (e.target.value === '') {
        this.newUser.mobile_phone = '+';
      }
      if (e.target.value === '+8') {
        this.newUser.mobile_phone = e.target.value.replace(/\+8/, '+7');
      }
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
