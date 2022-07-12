<template>
  <div class="licevoischet__page">
    <div class="container-md" v-show="!loading">
      <div class="row mt-5">
        <div class="col-md-6">
          <GRadio :radios="radios" id="radio-1" v-model="newUser.role"/>
          <GInput placeholder="ФИО" id="fio" ref='fio' v-model="newUser.fio" type="text"/>
        </div>
        <div class="col-md-6">
          <GRadio :radios="radios2" id="radio-2" v-model="newUser.sex"/>
          <GInput placeholder="Страна" id="country" v-model="country" type="text"/>
        </div>
      </div>
      <div class="row mt-5">
        <div class="col-6">
          <GInput placeholder="Город" id="city" v-model="newUser.city" type="text"/>
        </div>
        <div class="col-6">
          <GDatePicker v-model="newUser.bthdte"/>
        </div>
      </div>
      <div class="row mt-5">
        <div class="col-md-6">
          <GPhoneInput v-model="phone"/>
        </div>
        <div class="col-md-6">
          <GInput placeholder="E-mail" id="email" v-model="newUser.email" type="email"/>
        </div>
      </div>
      <div class="row mt-md-5">
        <div class="col">
        </div>
        <div class="col">
          <GButton primary>
            Зарегестрировать
          </GButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import $ from 'jquery';
import { mapActions } from 'vuex';
import GInput from '../components/Forms/GInput.vue';
import GButton from '../components/Forms/GButton.vue';
import GPhoneInput from '../components/Forms/GPhoneInput.vue';
import GDatePicker from '../components/Forms/GDatePicker.vue';
import GRadio from '../components/Forms/GRadio.vue';
import Gnotifacation from '../mixins/Gnotifacation';
import GModalConfirm from '../mixins/GModalConfirm';
import GApi from '../assets/backApi';

export default {
  name: 'Registration',
  mixins: [
    Gnotifacation,
    GModalConfirm,
  ],
  components: {
    GInput,
    GPhoneInput,
    GDatePicker,
    GRadio,
    GButton,
  },
  data() {
    return {
      loading: true,
      radios: [
        {
          key: 1,
          value: 0,
          label: 'Прив. Клиент',
        },
        {
          key: 2,
          value: 1,
          label: 'Дистрибьютор',
        },
      ],
      radios2: [
        {
          key: 1,
          value: 0,
          label: 'Мужской пол',
        },
        {
          key: 2,
          value: 1,
          label: 'Женский пол',
        },
      ],
      phone: '',
      country: '',
      newUser: {
        role: 0,
        sex: 0,
        fio: '',
        city: '',
        bthdte: null,
        email: '',
      },
    };
  },
  metaInfo() {
    this.setPageTitle(this.$t('Регистрация'));
    return {
      title: `${this.$t('ЛК Партнера')} - ${this.$t('Регистрация')}`,
    };
  },
  mounted() {
    GApi.get('/agent/profile').then(res => {
      console.log(res);
    });
    this.loading = false;
  },
  globalApi() {},
  methods: {
    async registr() {
      const res = await this.createMessageBox('Вы уверны, что хотите зарегистрировать пользователя?');
      if (res) {
        const reMail = /^[\w-.]+@[\w-]+\.[a-z]{2,4}$/i;
        if (
          this.newUser.fio !== '' && this.country !== ''
          && this.newUser.city !== '' && this.newUser.bthdte !== '' && this.newUser.bthdte !== null
          && this.phone.replace(/[-,(,),+]/g, '') !== '' && this.newUser.email !== '' && reMail.test(this.newUser.email)
        ) {
          const data = {
            access_level: this.newUser.role,
            male: this.newUser.sex,
            fullname: this.newUser.fio,
            country: this.country,
            city: this.newUser.city,
            bthdte: this.newUser.bthdte,
            mobile_phone: this.phone.replace(/[-,(,),+]/g, ''),
            email: this.newUser.email,
          };
          GApi.post('/agent/signup-start', data)
            .then(() => {
              this.showToast(this.$t('Регистрация'), this.$t('На вашу почту пришло письмо'), 'success');
            })
            .catch(error => {
              this.showToast(this.$t('Регистрация'), error.response.data.detail, 'danger');
            });
        } else {
          this.showToast(this.$t('Регистрация'),
            this.$t('Заполните все поля для продолжения регистрации'),
            'danger');
        }
      }
    },
    ...mapActions('currentPage', ['setPageTitle']),
  },
};
</script>

<style lang="scss" scoped>
.up{
  top: -13px;
  font-size: 13px;
}
.reg_input{
  position: relative;
  & label{
    left: 5px !important;
  }
}
.reg_btn {
  background-color: #32aaa7;
  color: white;
  padding: 10px 80px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  display: block;
  float: right;
}
@media (max-width: 768px) {
.reg_input{
  &:nth-of-type(1){
    margin-bottom: 10px;
  }
}
  .row.mt-md-5{
    &:nth-of-type(2){
      margin-top: -10px;
    }
    &:nth-of-type(2),
    &:nth-of-type(3){
      & > div{
        margin-top: 20px;
      }
    }
    &:nth-of-type(4){
      margin-top: 20px !important;
    }
  }
  .reg_btn{
    width: 100%;
  }
}
</style>
<style>
input.mx-input::placeholder{
  color: #9a9a9a;
  font-size: 16px;
}
input.mx-input{
  color: #9a9a9a;
  font-size: 16px !important;
}
</style>
