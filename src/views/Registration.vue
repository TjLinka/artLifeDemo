<template>
  <div class="licevoischet__page">
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
        Регистрация
      </h2>
      <div class="row mt-5">
        <div class="col-md-6">
          <b-form-group>
            <b-form-radio-group
              id="radio-group-1"
              v-model="newUser.role"
              name="radio-sub-component"
            >
              <b-form-radio value="first">Прив. Клиент</b-form-radio>
              <b-form-radio value="second">Дистрибьютор</b-form-radio>
            </b-form-radio-group>
          </b-form-group>
        </div>
        <div class="col-md-6">
          <b-form-group>
            <b-form-radio-group id="radio-group-2" v-model="newUser.sex" name="radio-sub-component">
              <b-form-radio value="first">Мужской пол</b-form-radio>
              <b-form-radio value="second">Женский пол</b-form-radio>
            </b-form-radio-group>
          </b-form-group>
        </div>
      </div>
      <div class="row mt-5">
        <div class="col-md-6 ">
          <input type="text" name="fio" id="fio" required v-model="newUser.fio" />
          <label for="fio">ФИО:</label>
          <span class="clear_icon" @click="clearInput('fio')">X</span>
        </div>
        <div class="col-md-6">
          <input type="text" name="country" id="country" required v-model="newUser.country" />
          <label for="country">Страна:</label>
          <span class="clear_icon" @click="clearInput('country')">X</span>
        </div>
      </div>
      <div class="row mt-5">
        <div class="col-md-6">
          <input type="text" name="city" id="city" required v-model="newUser.city" />
          <label for="city">Город:</label>
          <span class="clear_icon" @click="clearInput('city')">X</span>
        </div>
        <div class="col-md-6">
          <input type="text" name="bthdte" id="bthdte" required v-model="newUser.bthdte" />
          <label for="bthdte">Дата рождения:</label>
          <span class="clear_icon" @click="clearInput('bthdte')">X</span>
        </div>
      </div>
      <div class="row mt-5">
        <div class="col-md-6">
          <input type="text" name="phone" id="phone" required v-model="newUser.phone" />
          <label for="phone">Телефон:</label>
          <span class="clear_icon" @click="clearInput('phone')">X</span>
        </div>
        <div class="col-md-6">
          <input type="text" name="email" id="email" required v-model="newUser.email" />
          <label for="email">Е-mail:</label>
          <span class="clear_icon" @click="clearInput('email')">X</span>
        </div>
      </div>
      <div class="row mt-5">
        <div class="col">
          <button @click="registr" class="reg_btn">Зарегистрировать</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Registration',
  data() {
    return {
      newUser: {},
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    registr() {
      console.log('registr ok');
    },
    clearInput(name) {
      this.newUser[name] = null;
    },
  },
};
</script>

<style lang="scss" scoped>
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
    z-index: 10;
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
</style>
