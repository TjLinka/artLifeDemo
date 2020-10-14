<template>
  <div class="registration__page">
    <div class="container">
      <h2 class="page__title">Регистрация</h2>
      <div class="registration__form">
        <div class="row mt-5">
          <div class="col-6">
            <input type="radio" id="one" value="Один" v-model="user.type" class="mr-2" />
            <label for="one">Прив. клиент</label>
            <input type="radio" id="two" value="Два" v-model="user.type" class="ml-2 mr-2" />
            <label for="two">Дистрибьютор</label>
          </div>
          <div class="col-6">
            <input type="radio" id="one" value="Один" v-model="user.sex" class="mr-2" />
            <label for="one">Мужской пол</label>
            <input type="radio" id="two" value="Два" v-model="user.sex" class="ml-2 mr-2" />
            <label for="two">Женский пол</label>
          </div>
        </div>
        <div class="row registr mt-3">
          <div class="col-6"><input type="text" placeholder="ФИО" v-model="user.fio" /></div>
          <div class="col-6"><input type="text" placeholder="Страна" v-model="user.country" /></div>
        </div>
        <div class="row registr mt-5">
          <div class="col-6"><input type="text" placeholder="Город" v-model="user.city" /></div>
          <div class="col-6">
            <input type="text" placeholder="Дата рождения" v-model="user.date" />
          </div>
        </div>
        <div class="row registr mt-5">
          <div class="col-6"><input type="text" placeholder="Телефон" v-model="user.phone" /></div>
          <div class="col-6"><input type="text" placeholder="E-mail" v-model="user.email" /></div>
        </div>
        <div class="row justify-content-end mt-4">
          <div class="col-6">
            <div class="agry_check d-flex">
              <input type="checkbox" name="" id="" class="mt-1 mr-2" />
              <p>
                Я подтверждаю согласие с правовыми положениями проекта <br />
                и даю согласие на обработку моих данных
              </p>
            </div>
          </div>
        </div>
        <div class="row mt-5">
          <div class="col">
            <button class="btn__registr">Зарегистрироваться</button>
          </div>
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
      user: {},
    };
  },
};
</script>

<style lang="scss" scoped>
.registr {
  input {
    width: 95%;
    border: 0;
    border-bottom: 1px solid #dee2f3;
    outline: none;
    padding-bottom: 5px;
  }
}
.btn__registr {
  background-color: #32AAA7;
  border: 0;
  border-radius: 4px;
  font-size: 16px;
  font-weight: bold;
  padding: 5px 40px;
  color: white;
  margin-top: 10px;
  float: right;
}
</style>
