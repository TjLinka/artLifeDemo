<template>
  <div class="licevoischet__page">
    <div class="container-fluid table_container">
      <h2 class="page__title">
        <p class="mobile_back noprint" @click="back">
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
        {{ $t('Редактирование реферальной ссылки') }}
      </h2>
      <div class="row">
        <div class="col-6">
          <b-form-group :label="`${$t('Тип соглашения')}`">
            <b-form-radio
              v-model="ref_agrigment"
              name="some-radios-1"
              :value="1"
              class="radio mr-3"
              >{{ $t('Партнёр') }}</b-form-radio
            >
            <b-form-radio
              v-model="ref_agrigment"
              name="some-radios-1"
              :value="0"
              class="radio mr-3"
              >{{ $t('Клиент') }}</b-form-radio
            >
          </b-form-group>
        </div>
      </div>
      <!-- Выбор типа реферальной ссылки -->
      <div class="row">
        <div class="col-6">
          <el-select
            v-model="ref_type"
            placeholder="Тип реферальной ссылки"
            style="width: 100%;"
            @change="getRefData"
            clearable
          >
            <el-option
              v-for="type in ref_type_list"
              :key="type.id"
              :label="type.name"
              :value="type.id"
            >
            </el-option>
          </el-select>
        </div>
      </div>
      <!-- Выбор товара -->
      <div class="row mt-3" v-if="ref_type === 1">
        <div class="col-6" v-if="ref_products_list.length > 0">
          <el-select v-model="selected_product" placeholder="Товар" style="width: 100%;" clearable filterable>
            <el-option
              v-for="data in ref_products_list"
              :key="data.id"
              :label="`${data.articul} - ${data.name}`"
              :value="data.id"
            >
            </el-option>
          </el-select>
        </div>
        <div class="col-6" v-else>
          <span>Загрузка данных...</span>
        </div>
      </div>
      <!-- Выбор лендинг -->
      <div class="row mt-3" v-if="ref_type === 2">
        <div class="col-6">
          <el-select
            v-model="selected_landing"
            placeholder="Лендинг"
            style="width: 100%;"
            clearable
          >
            <el-option
              v-for="data in ref_landing_list"
              :key="data.id"
              :label="data.name"
              :value="data.id"
            >
            </el-option>
          </el-select>
        </div>
      </div>
      <!-- Выбор бизнес -->
      <div class="row mt-3" v-if="ref_type === 3">
        <div class="col-6">
          <el-select
            v-model="selected_business"
            placeholder="Бизнес-предложение"
            style="width: 100%;"
            clearable
          >
            <el-option
              v-for="data in ref_business_list"
              :key="data.id"
              :label="data.name"
              :value="data.id"
            >
            </el-option>
          </el-select>
        </div>
      </div>
      <!-- Выбор регистрация -->
      <div class="row mt-3" v-if="ref_type === 4">
        <div class="col-6">
          <el-select
            v-model="selected_registration"
            placeholder="Регистрация"
            style="width: 100%;"
            clearable
          >
            <el-option
              v-for="data in ref_registration_list"
              :key="data.id"
              :label="data.name"
              :value="data.id"
            >
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-6">
          <button class="btn_type_2 w50 mr-2" @click="$router.push('/ref-urls')">Отмена</button>
          <button class="btn_type_1 w50 fr" @click="saveEditRefLink">Сохранить</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import backAPI from '../assets/backApi';

export default {
  name: 'UpdateRefURL',
  data() {
    return {
      ref_agrigment: 1,
      ref_type: null,
      selected_product: null,
      selected_business: null,
      selected_landing: null,
      selected_registration: null,
      ref_type_list: [
        {
          id: 1,
          name: 'Товар',
          type_value: 'selected_product',
        },
        {
          id: 2,
          name: 'Лендинг',
          type_value: 'selected_landing',
        },
        {
          id: 3,
          name: 'Бизнес-предложение',
          type_value: 'selected_business',
        },
        {
          id: 4,
          name: 'Регистрация',
          type_value: 'selected_registration',
        },
      ],
      ref_products_list: [],
      ref_landing_list: [],
      ref_business_list: [],
      ref_registration_list: [],
    };
  },
  mounted() {
    backAPI.get(`/agent/reflinks/${this.$route.params.id}`).then(async (Response) => {
      this.ref_agrigment = Response.data.access_level;
      this.ref_type = Response.data.reflink_type;
      if (this.ref_type === 1) {
        backAPI.get('/agent/sales/catalog', { params: { stock_id: 0 } }).then((Response2) => {
          this.ref_products_list = Response2.data.entries.map((product) => ({ id: product.id, articul: product.articul, name: product.name }));
          this.selected_product = Response.data.catalog_id;
        });
      }
    });
  },
  methods: {
    back() {
      const navEl = document.getElementsByClassName('router-link-exact-active router-link-active');
      $(navEl[0])
        .parent()
        .parent()
        .siblings()
        .addClass('active');
    },
    getRefData(type) {
      if (type === 1) {
        backAPI.get('/agent/sales/catalog', { params: { stock_id: 0 } }).then((Response) => {
          this.ref_products_list = Response.data.entries.map((product) => ({ id: product.id, articul: product.articul, name: product.name }));
        });
      }
    },
    async saveEditRefLink() {
      const params = {
        reflink_type: this.ref_type,
        access_level: this.ref_agrigment,
        catalog_id: this.selected_product,
        reflink_base_id: 0,
      };
      await backAPI.post(`/agent/reflinks/update/${this.$route.params.id}`, params);
      this.$router.push('/ref-urls');
    },
  },
};
</script>

<style lang="scss" scoped>
.radio {
  display: inline;
}
.licevoischet__page {
  position: relative;
  &__summ {
    text-align: center;
    background-color: #dee2f3;
    font-size: 12px;
    padding: 10px 0px;
  }
  & .exp_print {
    span {
      color: #32aaa7;
      cursor: pointer;
    }
  }
  & .organization__modal {
    position: relative;
    margin: 20px 0px;
    width: 100%;
    bottom: 0;

    & .edit {
      margin-bottom: 0px;
      & > div {
        margin-bottom: 30px;
      }
      input {
        // margin-bottom: 20px;
      }
      button {
        // margin-top: 20px;
        width: 48%;
        border: 0;
        padding: 5px 30px;
        font-size: 16px;
        &:nth-of-type(1) {
          background-color: #32aaa7;
          color: white;
        }
        &:nth-of-type(2) {
          background-color: white;
          color: #32aaa7;
          border: 2px solid #32aaa7;
        }
      }
    }
  }
}
</style>
