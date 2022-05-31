<template>
  <div class="licevoischet__page">
    <div  v-loading="loading">
    <div class="container-md" v-show="!loading">
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
        <!-- {{$t("Регистрация")}} -->
      </h2>
      <div class="row mt-5">
        <div class="col-md-6">
          <b-form-group>
            <b-form-radio-group
              id="radio-group-1"
              v-model="newUser.role"
              name="radio-sub-component-1"
            >
              <b-form-radio :value="0" >{{$t("Прив. Клиент")}}</b-form-radio>
              <b-form-radio :value="1" >{{$t("Дистрибьютор")}}</b-form-radio>
            </b-form-radio-group>
          </b-form-group>
          <div class="reg_input custom_input">
            <input type="text" name="fio" id="fio" required v-model="newUser.fio" />
            <label for="fio">{{$t("ФИО")}}</label>
            <span class="clear_icon" @click="clearInput('fio')"></span>
          </div>
        </div>
        <div class="col-md-6">
          <b-form-group>
            <b-form-radio-group id="radio-group-2"
            v-model="newUser.sex" name="radio-sub-component-2">
              <b-form-radio :value="0">{{$t("Мужской пол")}}</b-form-radio>
              <b-form-radio :value="1">{{$t("Женский пол")}}</b-form-radio>
            </b-form-radio-group>
          </b-form-group>
          <div class="reg_input custom_input">
            <input type="text" name="country" id="country" required v-model="country" />
            <label for="country">{{$t("Страна")}}</label>
            <span class="clear_icon" @click="clearCountry('country')"></span>
          </div>
        </div>
      </div>
      <div class="row mt-md-5">
        <div class="col-md-6 custom_input">
          <input type="text" name="city" id="city" required v-model="newUser.city" />
          <label for="city">{{$t("Город")}}</label>
          <span class="clear_icon" @click="clearInput('city')"></span>
        </div>
        <div class="col-md-6">
            <span v-if="newUser.bthdte" class="custom_label">{{$t("Дата рождения")}}</span>
            <date-picker
              v-model="newUser.bthdte"
              value-type="YYYY-MM-DD"
              format="DD.MM.YYYY"
              type="date"
              :placeholder="`${$t('Дата рождения')}`"
              style="width: 100%"
              range-separator=" - "
            ></date-picker>
        </div>
      </div>
      <div class="row mt-md-5">
        <div class="col-md-6 custom_input">
          <input
          ref="phone"
          type="text"
          name="phone"
          id="phone"
          autocomplete="new-password"
          v-mask="mask"
          @input="checkValue"
          required
          v-model="phone" />
          <label for="phone" class="up">{{$t("Телефон в международном формате")}}</label>
          <span class="clear_icon" @click="clearPhone"></span>
        </div>
        <div class="col-md-6 custom_input">
          <input type="email" name="email" id="email" required v-model="newUser.email" />
          <label for="email" :class="this.newUser.email ? 'up' : ''">{{$t("Е-mail")}}</label>
          <span :class="`clear_icon ${this.newUser.email ? 'd-block' : ''}`"
          @click="clearInput('email')"></span>
        </div>
      </div>
      <div class="row mt-md-5">
        <div class="col">
          <button @click="registr" class="reg_btn">{{$t("Зарегистрировать")}}</button>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import { mapActions } from 'vuex';
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import 'vue2-datepicker/locale/ru';
import backApi from '../assets/backApi';

export default {
  name: 'Registration',
  components: { DatePicker },
  data() {
    return {
      // mask: '',
      loading: true,
      phone: '+',
      country: '',
      newUser: {
        role: 0,
        sex: 0,
        fio: '',
        city: '',
        bthdte: '',
        email: '',
      },
      rusAreaName: ['Россия', 'РФ', 'Россия Дальний Восток'],
    };
  },
  metaInfo() {
    this.setPageTitle(this.$t('Регистрация'));
    return {
      title: `${this.$t('ЛК Партнера')} - ${this.$t('Регистрация')}`,
    };
  },
  mounted() {
    this.loading = false;
  },
  methods: {
    ...mapActions('currentPage', ['setPageTitle']),
    checkValue(e) {
      console.log(e);
      if (e.target.value === '') {
        this.phone = '+';
      }
      if (this.rusAreaName.some((key) => key.toLowerCase() === this.country.toLowerCase()) && e.target.value === '+8') {
        this.phone = e.target.value.replace(/\+8/, '+7');
      }
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
    back() {
      const navEl = document.getElementsByClassName('router-link-exact-active router-link-active');
      $(navEl[0])
        .parent()
        .parent()
        .siblings()
        .addClass('active');
    },
    async registr() {
      const res = await this.createMessageBox('Вы уверны, что хотите зарегистрировать пользователя?');
      if (res) {
        const reMail = /^[\w-.]+@[\w-]+\.[a-z]{2,4}$/i;
        if (
          this.newUser.fio !== '' && this.country !== ''
          && this.newUser.city !== '' && this.newUser.bthdte !== ''
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
          backApi.post('/agent/signup-start', data)
            .then(() => {
              this.showToast(this.$t('Регистрация'), this.$t('На вашу почту пришло письмо'), 'success');
            })
            .catch((error) => {
              this.showToast(this.$t('Регистрация'), error.response.data.detail, 'danger');
            });
        } else {
          this.showToast(this.$t('Регистрация'),
            this.$t('Заполните все поля для продолжения регистрации'),
            'danger');
        }
      }
    },
    createMessageBox(messageText) {
      const h = this.$createElement;
      // More complex structure
      const messageVNode = h('div', { class: ['foobar'] }, [h('h3', { class: ['text-center'] }, [messageText])]);
      // We must pass the generated VNodes as arrays
      return this.$bvModal.msgBoxConfirm([messageVNode], {
        buttonSize: 'md',
        centered: true,
        cancelTitle: 'Нет',
        okTitle: 'Да',
        size: 'xl',
      });
    },
    clearInput(name) {
      this.newUser[name] = '';
    },
    clearCountry() {
      this.country = '';
    },
    clearPhone() {
      if (this.rusAreaName.some((key) => key.toLowerCase() === this.country.toLowerCase())) {
        this.phone = '+';
        return;
      }
      this.phone = '+';
    },
  },
  computed: {
    mask() {
      if (this.rusAreaName.some((key) => key.toLowerCase() === this.country.toLowerCase())) {
        return '+7(###)###-##-##';
      }
      return '+###############';
    },
  },
  watch: {
    country() {
      console.log('lang');
      // eslint-disable-next-line max-len
      if (this.rusAreaName.some((key) => key.toLowerCase() === this.country.toLowerCase())) {
        this.mask = '+7(###)###-##-##';
        if (this.phone !== '') {
          this.phone = this.phone.replace(/^\+\d/, '+7');
        }
      } else {
        this.mask = '+###############';
      }
    },
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
