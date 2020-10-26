<template>
  <div class="myinfoedit__page">
    <div class="container">
      <h2 class="page__title">
        Редакитирование личных данных
      </h2>
      <div class="myfoto">
        <img src="../assets/imgs/unnamed 1.png" alt="" />
      </div>
      <div class="top__info mt-5">
        <div class="row edit mt-5">
          <div class="col-6">
            <input type="text" name="country" v-model="userInfo.country"/>
          </div>
          <div class="col-6"><input type="text" name="city" v-model="userInfo.city" /></div>
        </div>
        <div class="row edit mt-5">
          <div class="col-6"><input type="text" name="address" v-model="userInfo.address" /></div>
          <div class="col-6"><input type="text" name="passport" v-model="userInfo.passport" /></div>
        </div>
        <div class="row edit mt-5">
          <div class="col-6"><input type="text" name="date" v-model="userInfo.bthdte" /></div>
          <div class="col-6"><input type="text" name="skype" v-model="userInfo.skype" /></div>
        </div>
        <div class="row edit mt-5">
          <button class="save__newinfo" v-on:click="saveTopEdit">Сохранить изменения</button>
        </div>
      </div>
      <div class="bot__info mt-5">
        <!-- <div class="row edit">
          <div class="col">
            <p>Смена адреса почтового ящика</p>
            <input type="text" value="supernameemail@gmail.com" />
          </div>
          <div class="col">
            <p>Смена телефона</p>
            <input type="text" value="+7 (960) 947-43-55" />
          </div>
        </div> -->
        <p class="mt-5">Смена пароля</p>
        <div class="row edit">
          <div class="col"><input type="text" value="supernparoli345" /></div>
          <div class="col"><input type="password"
          placeholder="Введите новый пароль" v-model="newPass" /></div>
          <div class="col"><input type="password"
          placeholder="Подтвердите новый пароль" v-model="newPassRepeat"/></div>
        </div>
        <div class="row edit mt-5">
          <button class="save__newinfo" v-on:click="saveBotEdit">Сохранить изменения</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import backApi from '../assets/backApi';

export default {
  name: 'MyInfoEdit',
  data() {
    return {
      userInfo: {},
      newPass: null,
      newPassRepeat: null,
    };
  },
  mounted() {
    backApi.get('/agent/profile').then((Response) => {
      console.log(Response.data);
      this.userInfo = Response.data;
    });
  },
  methods: {
    saveTopEdit() {
      console.log('Top');
    },
    saveBotEdit() {
      console.log('Bot');
    },
  },
};
</script>

<style lang="scss" scoped>
.bot__info {
  p {
    color: #383a41;
    font-size: 20px;
  }
}
.edit {
  input {
    width: 95%;
    height: 30px;
    border: 0;
    border-bottom: 1px solid #dee2f3;
    outline: none;
    padding-bottom: 5px;
  }
  .save__newinfo {
    border: 2px solid #32aaa7;
    background-color: #fff;
    border-radius: 4px;
    padding: 5px 60px;
    color: #32aaa7;
    font-size: 14px;
    font-weight: bold;
  }
}
</style>
