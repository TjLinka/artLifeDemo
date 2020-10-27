<template>
  <div class="sponsor__page">
    <div class="container">
      <h2 class="page__title">Данные спонсора</h2>
      <div class="sponsor__page__description">
        <div class="myfoto">
          <div><img src="../assets/imgs/unnamed 1.png" alt="" /></div>
          <p>{{userInfo.name}}</p>
        </div>
        <div class="container top__info">
          <div class="row">
            <div class="col-md-6 mt-3">
              <p>Номер соглашения:</p>
              <p>{{userInfo.id}}</p>
            </div>
            <div class="col-md-6 mt-3">
              <p>E-mail:</p>
              <p><a class="mail" :href="`mailto:${userInfo.email}`">{{userInfo.email}}</a></p>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6 mt-3">
              <p>ФИО:</p>
              <p>{{userInfo.name}}</p>
            </div>
            <div class="col-md-6 mt-3">
              <p>Skype:</p>
              <p>{{userInfo.skype}}</p>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6 mt-3">
              <p>Телефон:</p>
              <p>{{userInfo.phone}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import backApi from '../assets/backApi';

export default {
  name: 'SponsorCard',
  data() {
    return {
      userInfo: {},
    };
  },
  mounted() {
    backApi.get('agent/sponsor').then((Response) => {
      this.userInfo = Response.data;
    });
  },
};
</script>

<style lang="scss" scoped>
.sponsor__page {
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
      display: flex;
      align-items: center;
      margin-top: 30px;
      overflow: hidden;
      & div{
        border-radius: 50%;
        overflow: hidden;
      }
      & p{
        margin-top: 15px;
        margin-left: 15px;
        font-weight: bold;
        font-size: 20px;
        text-transform: uppercase;
      }
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
        // margin-bottom: 32px;
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
.mail{
  color: #32AAA7;
}
@media (min-width: 768px) {
  .sponsor__page{
    .top__info{
      & > .row{
        margin-bottom: 32px;
      }
    }
  }
}
</style>
