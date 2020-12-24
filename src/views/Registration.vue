<template>
  <div class="licevoischet__page">
    <div class="container-md">
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
        Регистрация
      </h2>
      <div class="row mt-5">
        <div class="col-md-6">
          <b-form-group>
            <b-form-radio-group
              id="radio-group-1"
              v-model="newUser.role"
              name="radio-sub-component-1"
            >
              <b-form-radio :value="0" >Прив. Клиент</b-form-radio>
              <b-form-radio :value="1" >Дистрибьютор</b-form-radio>
            </b-form-radio-group>
          </b-form-group>
          <div class="reg_input custom_input">
            <input type="text" name="fio" id="fio" required v-model="newUser.fio" />
            <label for="fio">ФИО</label>
            <span class="clear_icon" @click="clearInput('fio')"></span>
          </div>
        </div>
        <div class="col-md-6">
          <b-form-group>
            <b-form-radio-group id="radio-group-2"
            v-model="newUser.sex" name="radio-sub-component-2">
              <b-form-radio :value="0">Мужской пол</b-form-radio>
              <b-form-radio :value="1">Женский пол</b-form-radio>
            </b-form-radio-group>
          </b-form-group>
          <div class="reg_input custom_input">
            <input type="text" name="country" id="country" required v-model="newUser.country" />
            <label for="country">Страна</label>
            <span class="clear_icon" @click="clearInput('country')"></span>
          </div>
        </div>
      </div>
      <div class="row mt-md-5">
        <div class="col-md-6 custom_input">
          <input type="text" name="city" id="city" required v-model="newUser.city" />
          <label for="city">Город</label>
          <span class="clear_icon" @click="clearInput('city')"></span>
        </div>
        <div class="col-md-6 custom_input">
            <date-picker
              v-model="newUser.bthdte"
              value-type="YYYY-MM-DD"
              format="DD.MM.YYYY"
              type="date"
              placeholder="Дата рождения"
              style="width: 100%"
              range-separator=" - "
            ></date-picker>
        </div>
      </div>
      <div class="row mt-md-5">
        <div class="col-md-6 custom_input">
          <input type="text" name="phone" id="phone" required v-model="newUser.phone" />
          <label for="phone">Телефон</label>
          <span class="clear_icon" @click="clearInput('phone')"></span>
        </div>
        <div class="col-md-6 custom_input">
          <input type="text" name="email" id="email" required v-model="newUser.email" />
          <label for="email">Е-mail</label>
          <span class="clear_icon" @click="clearInput('email')"></span>
        </div>
      </div>
      <div class="row mt-md-5">
        <div class="col">
          <button @click="registr" class="reg_btn">Зарегистрировать</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import 'vue2-datepicker/locale/ru';
import backApi from '../assets/backApi';

export default {
  name: 'Registration',
  components: { DatePicker },
  data() {
    return {
      newUser: {},
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
        variant: status,
      });
    },
    back() {
      this.$router.go(-1);
    },
    registr() {
      const data = {
        access_level: this.newUser.role,
        male: this.newUser.sex,
        fullname: this.newUser.fio,
        country: this.newUser.country,
        city: this.newUser.city,
        bthdte: this.newUser.bthdte,
        mobile_phone: this.newUser.phone,
        email: this.newUser.email,
      };
      backApi.post('/agent/signup-start', data);
      this.showToast('Регистрация', 'На вашу почту пришло письмо!', 'success');
    },
    clearInput(name) {
      this.newUser[name] = null;
    },
  },
};
</script>

<style lang="scss" scoped>
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
