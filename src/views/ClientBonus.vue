<template>
  <div class="sponsor__page">
    <div v-loading="loading">
      <div class="container" v-show="!loading">
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
          <!-- {{$t("Количество бонусных баллов")}} -->
        </h2>
        <br />
        <h5>
          {{ $t('Накопленный объем') }}
        </h5>
        <div class="sponsor__page__description">
          <div class="container top__info">
            <div class="row">
              <div class="col-md-6">
                <el-select v-model="area" placeholder="Регион" @change="update">
                  <el-option
                    v-for="item in areaList"
                    :key="item.area_id"
                    :label="item.area_name"
                    :value="item.area_id"
                  >
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="row">
              <div class="col-6">
                <h4><strong>Клиентские скидки</strong></h4>
                <b-table
                  :items="clientDiscount"
                  :fields="clientDiscountFields"
                  responsive
                  border
                  outlined
                  small
                  head-variant="light"
                >
                </b-table>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6 mt-3">
                <p>{{ $t('Объем покупок') }}:</p>
                <p>{{ bonusInfo.ngo }}</p>
              </div>
              <div class="col-md-6 mt-3">
                <p>{{ $t('Скидка') }}:</p>
                <p>{{ bonusInfo.discount_pc ? bonusInfo.discount_pc : '-' }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import { mapActions } from 'vuex';
import backApi from '../assets/backApi';

export default {
  name: 'SponsorCard',
  data() {
    return {
      loading: true,
      bonusInfo: {},
      areaList: [],
      area: null,
      clientDiscount: [],
      clientDiscountFields: [
        {
          key: 'nko',
          label: 'НКО',
        },
        {
          key: 'discount_pc',
          label: 'Скидка, %',
        },
      ],
    };
  },
  metaInfo() {
    this.setPageTitle(this.$t('Количество бонусных баллов'));
    return {
      title: `${this.$t('ЛК Партнера')} - ${this.$t('Количество бонусных баллов')}`,
    };
  },
  mounted() {
    backApi.get('/agent/area-by-currency').then(Response => {
      this.areaList = Response.data.entries;
      // eslint-disable-next-line prefer-destructuring
      this.area = Response.data.entries[0].area_id;
      backApi.get(`/agent/client-discount-by-area-get/${this.area}`).then(Response1 => {
        this.clientDiscount = Response1.data.entries;
      });
      backApi
        .get('/agent/bonuses', { params: { area_id: Response.data.entries[0].area_id } })
        .then(response => {
          this.bonusInfo = response.data;
        })
        .then(() => {
          setTimeout(() => {
            this.loading = false;
          });
        });
    });
  },
  methods: {
    ...mapActions('currentPage', ['setPageTitle']),
    back() {
      const navEl = document.getElementsByClassName('router-link-exact-active router-link-active');
      $(navEl[0])
        .parent()
        .parent()
        .siblings()
        .addClass('active');
    },
    async update() {
      console.log('123123');
      await backApi.get('/agent/bonuses', { params: { area_id: this.area } }).then(response => {
        this.bonusInfo = response.data;
      });
      backApi.get(`/agent/client-discount-by-area-get/${this.area}`).then(Response1 => {
        this.clientDiscount = Response1.data.entries;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.el-select {
  width: 100%;
}
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
