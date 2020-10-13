<template>
  <div class="myinfo__page">
    <div class="container">
      <h2 class="page__title">Карточка партнера</h2>
      <div class="myinfo__page__description">
        <div class="myfoto">
          <img src="../assets/imgs/unnamed 1.png" alt="" />
        </div>
        <div class="container top__info">
          <div class="row">
            <div class="col-6">
              <p>Номер соглашения:</p>
              <p>456789</p>
            </div>
            <div class="col-6">
              <p>ФИО:</p>
              <p>Васильев Андрей Петрович</p>
            </div>
          </div>
          <div class="row">
            <div class="col-6">
              <p>E-mail:</p>
              <p>supernameemail@gmail.com.</p>
            </div>
            <div class="col-6">
              <p>Телефон:</p>
              <p>+7 (960) 947-43-55</p>
            </div>
          </div>
          <div class="row">
            <div class="col-6">
              <p>Страна:</p>
              <p>Россия</p>
            </div>
            <div class="col-6">
              <p>Адрес:</p>
              <p>ул. Самая лучшая 76-23</p>
            </div>
          </div>
          <div class="row">
            <div class="col-6">
              <p>Паспорт (серия, номер, кем и когда выдан):</p>
              <p>Номер: 327467, Серия 6478, Выдан 30.07.2010 г.</p>
            </div>
            <div class="col-6">
              <p>Дата рождения:</p>
              <p>21.12.1988 г</p>
            </div>
          </div>
          <div class="row">
            <div class="col-6">
              <p>Skype:</p>
              <p>SkypeName</p>
            </div>
            <div class="col-6">
              <p>Доп. телефон:</p>
              <p>+7 (912) 537-33-78</p>
            </div>
          </div>
        </div>
        <div v-if="boss" class="transfert">
          <h2 class="page__caption">Дополнительная информация для трансферта</h2>
          <div class="container transfert__info" v-if="showTransfertInfo">
            <div class="row">
              <div class="col-6">
                <p>Номер соглашения:</p>
                <p>456789</p>
              </div>
              <div class="col-6">
                <p>ФИО:</p>
                <p>Васильев Андрей Петрович</p>
              </div>
            </div>
            <div class="row">
              <div class="col-6">
                <p>E-mail:</p>
                <p>supernameemail@gmail.com.</p>
              </div>
              <div class="col-6">
                <p>Телефон:</p>
                <p>+7 (960) 947-43-55</p>
              </div>
            </div>
            <div class="row">
              <div class="col-6">
                <p>Страна:</p>
                <p>Россия</p>
              </div>
              <div class="col-6">
                <p>Адрес:</p>
                <p>ул. Самая лучшая 76-23</p>
              </div>
            </div>
            <div class="row">
              <div class="col-6">
                <p>Паспорт (серия, номер, кем и когда выдан):</p>
                <p>Номер: 327467, Серия 6478, Выдан 30.07.2010 г.</p>
              </div>
              <div class="col-6">
                <p>Дата рождения:</p>
                <p>21.12.1988 г</p>
              </div>
            </div>
            <div class="row">
              <div class="col-6">
                <p>Skype:</p>
                <p>SkypeName</p>
              </div>
              <div class="col-6">
                <p>Доп. телефон:</p>
                <p>+7 (912) 537-33-78</p>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-6">
              <p class="show__transfert p-0" v-on:click="toggleTransfertVisible">
                {{ showTransfertInfo ? 'Свернуть' : 'Раскрыть' }}
              </p>
            </div>
            <div class="col-6">
              <button v-if="showTransfertInfo" class="transfert__btn">ТРАНСФЕРТ</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyInfo',
  data() {
    return {
      boss: true,
      showTransfertInfo: false,
    };
  },
  methods: {
    toggleTransfertVisible() {
      this.showTransfertInfo = !this.showTransfertInfo;
    },
  },
};
</script>

<style lang="scss" scoped>
.myinfo__page {
  margin-top: 40px;

  & .page__title {
    color: #383a41;
    font-size: 32px;
  }

  &__description {
    & .page__caption {
      font-size: 20px;
    }
    & .myfoto {
      display: inline-block;
      margin-top: 30px;
      border-radius: 50%;
      overflow: hidden;

      & img {
        width: 100%;
        height: 100%;
      }
    }

    & .top__info,
    & .transfert__info {
      padding: 0;
      margin-top: 32px;

      & .row {
        margin-bottom: 32px;
      }

      & p {
        padding: 0;
        margin: 0;
        color: #383a41;
        font-size: 14px;

        &:nth-of-type(1) {
          color: #9a9a9a;
          font-size: 14px;
        }
      }
    }
    & .transfert {
      & .show__transfert {
        cursor: pointer;
        display: inline-block;
        color: #32aaa7;
        font-size: 14px;
        border-bottom: 2px dotted #32aaa7;
      }

      & .transfert__btn {
        background-color: #000000;
        color: white;
        padding: 10px 80px;
        font-size: 12px;
        border: none;
        border-radius: 4px;
        // float: right;
      }
    }
  }
}
</style>
