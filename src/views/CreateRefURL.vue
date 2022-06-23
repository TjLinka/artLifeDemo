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
        <!-- {{ $t('Создание реферальной ссылки') }} -->
      </h2>
      <div class="row" v-if="role !== 'Клиент'">
        <div class="col-6">
          <b-form-group :label="`${$t('Тип соглашения')}`">
            <b-form-radio
              v-model="ref_agrigment"
              name="some-radios-1"
              :value="1"
              class="radio mr-3"
              >{{ $t('Дистрибьютор') }}</b-form-radio
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
          Загрузка данных...
        </div>
      </div>
      <div class="row mt-3" v-if="ref_type === 2">
        <div class="col-6" v-if="ref_landing_list.length > 0">
          <el-select v-model="selected_landing" placeholder="Лендинг" style="width: 100%;" clearable filterable>
            <el-option
              v-for="data in ref_landing_list"
              :key="data.id"
              :label="data.name"
              :value="data.id"
            >
            </el-option>
          </el-select>
        </div>
        <div class="col-6" v-else>
          Загрузка данных...
        </div>
      </div>
      <!-- Комментарий для реф ссылки -->
      <div class="row mt-3" v-if="ref_type">
        <div class="col custom_input">
          <input type="text" name="preview_info" id="preview_info" required v-model="preview_info" />
          <label for="oppreview_infoepreview_inforType">{{$t("Комментарий")}}</label>
          <span class="clear_icon" @click="clearInput()"></span>
        </div>
        <div class="col"></div>
      </div>
      <div class="row mt-3">
        <div class="col-6">
          <button class="btn_type_2 w50 mr-2" @click="$router.push('/ref-urls')">Отмена</button>
          <button
          :class="`btn_type_1 w50 fr ${canSaveRefLink ? '' : 'disabled'}`"
          :disabled="!canSaveRefLink"
          @click="createRefLink">Сохранить</button>
        </div>
      </div>
    </div>
    <b-modal id="bv-modal-example" hide-footer centered  :hide-header-close="true" :no-close-on-backdrop="true">
      <div class="d-block text-center">
        <h3>
          {{$t('Создание реферальной ссылки')}}
        </h3>
        <p>{{$t("Пожалуйста подождите")}}...</p>
      </div>
    </b-modal>
  </div>
</template>

<script>
import $ from 'jquery';
import { mapActions, mapState } from 'vuex';
import backAPI from '../assets/backApi';

export default {
  name: 'CreateRefURL',
  data() {
    return {
      preview_info: '',
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
          name: 'Регистрация',
          type_value: 'selected_registration',
        },
        {
          id: 4,
          name: 'Бизнес-предложение',
          type_value: 'selected_business',
        },
        {
          id: 5,
          name: 'На главную страницу',
          type_value: 'selected_mainpage',
        },
      ],
      ref_products_list: [],
      ref_landing_list: [],
      ref_business_list: [],
      ref_registration_list: [],
    };
  },
  metaInfo() {
    this.setPageTitle(this.$t('Создание реферальной ссылки'));
    return {
      title: `${this.$t('ЛК Партнера')} - ${this.$t('Создание реферальной ссылки')}`,
    };
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
    clearInput() {
      this.preview_info = '';
    },
    getRefData(type) {
      if (type === 1) {
        backAPI.get('/agent/sales/catalog', { params: { stock_id: 0, catalog_switch: 1 } }).then((Response) => {
          this.ref_products_list = Response.data.entries.map((product) => ({ id: product.id, articul: product.articul, name: product.name }));
        });
      }
      if (type === 2) {
        backAPI.get('/agent/reflinks/landings').then((Response) => {
          console.log(Response);
          this.ref_landing_list = Response.data.entries;
        });
      }
    },
    async createRefLink() {
      this.$bvModal.show('bv-modal-example');
      const params = {
        reflink_type: this.ref_type,
        access_level: this.role !== 'Клиент' ? this.ref_agrigment : 0,
        catalog_id: this.ref_type === 1 ? this.selected_product : null,
        reflink_base_id: this.ref_type === 2 ? this.selected_landing : 0,
        preview_info: this.preview_info,
      };
      const result = await backAPI.post('/agent/reflinks/create', params);
      if (result.status === 200) {
        this.$bvModal.hide('bv-modal-example');
        this.$router.push('/ref-urls');
      } else {
        this.$bvModal.hide('bv-modal-example');
        this.showToast(this.$t('Ошибка'), this.$t('Что-то пошло не так'), 'danger');
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
          h('p', { class: 'mr-2' }, title),
        ],
      );
      // Pass the VNodes as an array for message and title
      this.$bvToast.toast([vNodesMsg], {
        title: [vNodesTitle],
        solid: true,
        autoHideDelay: 5000,
        variant: status,
      });
    },
  },
  computed: {
    ...mapState('auth', ['role']),
    canSaveRefLink() {
      if (this.ref_type) {
        if (this.ref_type === 1 && this.selected_product) {
          return true;
        }
        if (this.ref_type === 2 && this.selected_landing) {
          return true;
        }
        if (this.ref_type !== null && this.ref_type !== 1 && this.ref_type !== 2) {
          return true;
        }
      }
      return false;
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
