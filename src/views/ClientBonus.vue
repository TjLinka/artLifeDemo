<template>
  <div class="sponsor__page">
    <div class="container">
      <h2 class="page__title">
                              <p class="mobile_back" @click="back">
        <svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 5H3.83L7.41 1.41L6 0L0 6L6 12L7.41 10.59L3.83 7H18V5Z" fill="#32AAA7"/>
        </svg>
      </p>
        Количество бонусных баллов
        </h2>
      <br>
      <h5>Накопленный объем</h5>
      <div class="sponsor__page__description">
        <div class="container top__info">
          <div class="row">
            <div class="col-md-6 mt-3">
              <p>Объем покупок:</p>
              <p>{{bonusInfo.ngo}}</p>
            </div>
            <div class="col-md-6 mt-3">
              <p>Скидка:</p>
              <p>{{bonusInfo.discount}}</p>
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
      bonusInfo: {},
    };
  },
  mounted() {
    backApi.get('/agent/bonuses').then((Response) => {
      this.bonusInfo = Response.data;
    });
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
.sponsor__page {
  margin-top: 40px;
  &__description {
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
