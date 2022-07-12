<template>
  <div class="licevoischet__page">
    <div class="container-fluid table_container">
      <h2 class="page__title">
        <!-- {{$t("История начисления бонусов")}}: {{agentData.id}} - {{agentData.name}} -->
      </h2>
      <p class="p-0 m-0 history_title mt-4">
        {{ $t('Период от и до') }}
      </p>
      <b-row align-v="end" class="row mb-4">
        <div class="col-4">
          <date-picker
            v-model="rangeDate"
            range-separator=" - "
            range
            @clear="clearDP"
            @change="getSelectedDataRange"
            format="DD.MM.YYYY"
            :editable="false"
            placeholder="дд.мм.гггг - дд.мм.гггг"
            value-type="YYYY-MM-DD"
            style="width: 100%"
          >
          </date-picker>
        </div>
        <div class="col"></div>
      </b-row>
      <!-- <div class="row">
        <div class="col">
          <span v-b-modal.modal-scrollable style="color: #32aaa7;">Легенда</span>
        </div>
      </div> -->
      <h2 class="licevoischet__page__summ mt-3">
        <span class="mr-4">{{ $t('ПЕРЕХОДОВ') }} = {{ all_links }} </span>
        <span class="mr-4">{{ $t('РЕГИСТРАЦИЙ') }} = {{ all_reg }} </span>
        <span class="mr-4">{{ $t('КОНВЕРСИЯ В РЕГ, %') }} = {{ all_conversion_pc }} </span>
        <span class="mr-4">{{ $t('КОЛ-ВО ЗАКАЗОВ') }} = {{ all_sales }} </span>
        <span class="mr-4">{{ $t('СУММА ЗАКАЗОВ') }} = {{ all_sale_sum }} </span>
        <span class="mr-4">{{ $t('КОЛ-ВО ВОЗВРАТОВ') }} = {{ all_returns }} </span>
        <span class="mr-4">{{ $t('СУММА ВОЗВРАТОВ') }} = {{ all_return_sum }} </span>
        <span class="mr-4">{{ $t('ДОЛЯ ВОЗВРАТОВ') }} = {{ all_return_porcion }} </span>
      </h2>
      <b-table
        :fields="fields"
        :items="entries"
        responsive
        head-variant="light"
        border
        small
        class="mt-1"
      >
        <template v-slot:cell(reflink_type)="scope">
          <b-button size="sm" @click="showRefTypeDetails(scope)" class="mr-2">
            <span>{{ scope.detailsShowing ? '-' : '+' }}</span>
          </b-button>
          {{ scope.item.reflink_type }}
        </template>
        <template v-slot:row-details>
          <b-table :fields="returnFields" :items="returnData" head-variant="light" sticky-header>
            <template v-slot:cell(cnt_reg)="scope">
              <span
                style="color:#32aaa7; cursor: pointer;"
                @click="openRegInfo(scope.item.reflink_id)"
              >
                {{ scope.item.cnt_reg }}
              </span>
            </template>
          </b-table>
        </template>
      </b-table>
    </div>
    <!-- <footer class="container-fluid cust_modal">
      <div class="container-md">
        <div class="row desktop_search">
          <div
            class="col text-center search__btn"
            @click="searchActive = !searchActive"
            v-if="!searchActive"
          >
            {{ $t('Фильтр') }} <span class="search_icons"></span>
          </div>
        </div>
        <div v-if="searchActive" class="organization__modal">
          <h3>
            {{ $t('Фильтр') }}
            <span @click="searchActive = !searchActive" class="close_btn"></span>
          </h3>
          <b-row align-v="end" class="row edit">
            <div class="col-sm-6">
              <el-select v-model="refType" placeholder="Тип ссылки" style="width: 100%">
                <el-option
                  v-for="ref in refTypeList"
                  :key="ref.ref_id"
                  :label="ref.ref_name"
                  :value="ref.ref_id"
                >
                </el-option>
              </el-select>
            </div>
            <div class="col-sm-6 custom_input">
              <input type="text" name="ref_id" id="ref_id" required v-model="ref_id" />
              <label for="ref_id">{{ $t('ID ссылки') }}</label>
              <span class="clear_icon" @click="clearRefInput"></span>
            </div>
          </b-row>
          <div class="row edit">
          <div class="col-sm-6 custom_input">
            <input type="number" name="naknum" id="naknum"
            required v-model="filterData.naknum" />
            <label for="naknum">{{$t("Номер накладной")}}</label>
            <span class="clear_icon" @click="clearInput('naknum')"></span>
          </div>
          <div class="col-sm-6 custom_input">
            <input type="number" name="docnum" id="docnum"
            required v-model="filterData.docnum" />
            <label for="docnum">{{$t("Номер возвратной накладной")}}</label>
            <span class="clear_icon" @click="clearInput('docnum')"></span>
          </div>
        </div>
          <div class="row edit mt-4">
            <div class="col-xl-6"></div>
            <div class="col-xl-6">
              <div class="update">
                <button :class="`mr-2`" @click="updateData">{{ $t('Показать') }}</button>
                <button @click="resetData">{{ $t('Сбросить') }}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer> -->
    <footer class="container-fluid cust_modal" v-show="showNewUserModal">
      <div class="container-md">
        <div class="organization__modal">
          <h3>
            Реферальная ссылка {{ currentRegInfo }}
            <span class="close_btn" @click="showNewUserModal = !showNewUserModal"></span>
          </h3>
          <b-table
            :fields="currentRefFields"
            :items="currentRefData"
            responsive
            head-variant="light"
            sticky-header
            height="40vh"
            border
            small
            class="mt-1"
          >
          </b-table>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
/* eslint-disable no-param-reassign */
import DatePicker from 'vue2-datepicker';
import { mapActions } from 'vuex';
// import backAPI from '../assets/backApi';
import 'vue2-datepicker/index.css';
import 'vue2-datepicker/locale/ru';
import backAPI from '../assets/backApi';
import nullConvertor from '../mixins/nullConvertor';

export default {
  name: 'RefLinksGroup',
  components: {
    DatePicker,
  },
  mixins: [nullConvertor],
  metaInfo() {
    this.setPageTitle(`${this.$t('Отчет по реферальным ссылкам')}`);
    return {
      title: `${this.$t('ЛК Партнера')} - ${this.$t('Отчет по реферальным ссылкам')}`,
    };
  },
  data() {
    return {
      ref_id: '',
      refType: '',
      currentRegInfo: '',
      showModal1: false,
      showNewUserModal: false,
      showRegInfo: false,
      searchActive: false,
      show: false,
      newUser: {
        id: '',
        name: '',
        phone: '',
        email: '',
        reg_date: '',
      },
      refTypeList: [
        {
          ref_id: 1,
          ref_name: 'Регистрация',
        },
        {
          ref_id: 2,
          ref_name: 'Лендинг',
        },
        {
          ref_id: 3,
          ref_name: 'Бизнес',
        },
        {
          ref_id: 4,
          ref_name: 'Товар',
        },
      ],
      fields: [
        {
          key: 'reflink_type',
          label: 'Тип',
        },
        // {
        //   key: 'ref_id',
        //   label: 'ID',
        // },
        {
          key: 'cnt_links',
          label: 'Переходы',
          formatter: val => {
            if (val === null) return 0;
            return val;
          },
        },
        {
          key: 'cnt_reg',
          label: 'Регистрация',
          formatter: val => {
            if (val === null) return 0;
            return val;
          },
        },
        {
          key: 'conversion_pc',
          label: 'Конверсия в рег, %',
          formatter: val => {
            if (val === null) return 0;
            return val;
          },
        },
        {
          key: 'sale_cnt',
          label: 'Кол-во заказов (оплат)',
          formatter: val => {
            if (val === null) return 0;
            return val;
          },
        },
        {
          key: 'sale_sum',
          label: 'Сумма заказов (оплат)',
          formatter: val => {
            if (val === null) return 0;
            return val;
          },
        },
        {
          key: 'return_cnt',
          label: 'Кол-во возвратов',
          formatter: val => {
            if (val === null) return 0;
            return val;
          },
        },
        {
          key: 'return_sum',
          label: 'Сумма возвратов',
          formatter: val => {
            if (val === null) return 0;
            return val;
          },
        },
        {
          key: 'return_porcion',
          label: 'Доля возвратов',
          formatter: val => {
            if (val === null) return 0;
            return val;
          },
        },
        {
          key: 'retail_sum',
          label: 'Сумма розн. Возн.',
          formatter: val => {
            if (val === null) return 0;
            return val;
          },
        },
        {
          key: 'points',
          label: 'Сумма баллов',
          formatter: val => {
            if (val === null) return 0;
            return val;
          },
        },
      ],
      entries: [
        {
          ref_id: 1,
          type: 'Регистрация',
          ref_visit: 100,
          ref_registration: 50,
          _showDetails: false,
        },
        {
          ref_id: 2,
          type: 'Landing',
          ref_visit: 100,
          ref_registration: 50,
          _showDetails: false,
        },
        {
          ref_id: 3,
          type: 'Бизнес',
          ref_visit: 100,
          ref_registration: 50,
          _showDetails: false,
        },
        {
          ref_id: 4,
          type: 'Товар',
          ref_visit: 100,
          ref_registration: 50,
          _showDetails: false,
        },
      ],
      returnFields: [
        {
          key: 'reflink_type',
          label: 'Тип',
        },
        // {
        //   key: 'ref_id',
        //   label: 'ID',
        // },
        {
          key: 'cnt_links',
          label: 'Переходы',
          formatter: val => {
            if (val === null) return 0;
            return val;
          },
        },
        {
          key: 'cnt_reg',
          label: 'Регистрация',
          formatter: val => {
            if (val === null) return 0;
            return val;
          },
        },
        {
          key: 'conversion_pc',
          label: 'Конверсия в рег, %',
          formatter: val => {
            if (val === null) return 0;
            return val;
          },
        },
        {
          key: 'sale_cnt',
          label: 'Кол-во заказов (оплат)',
          formatter: val => {
            if (val === null) return 0;
            return val;
          },
        },
        {
          key: 'sale_sum',
          label: 'Сумма заказов (оплат)',
          formatter: val => {
            if (val === null) return 0;
            return val;
          },
        },
        {
          key: 'return_cnt',
          label: 'Кол-во возвратов',
          formatter: val => {
            if (val === null) return 0;
            return val;
          },
        },
        {
          key: 'return_sum',
          label: 'Сумма возвратов',
          formatter: val => {
            if (val === null) return 0;
            return val;
          },
        },
        {
          key: 'return_porcion',
          label: 'Доля возвратов',
          formatter: val => {
            if (val === null) return 0;
            return val;
          },
        },
        {
          key: 'retail_sum',
          label: 'Сумма розн. Возн.',
          formatter: val => {
            if (val === null) return 0;
            return val;
          },
        },
        {
          key: 'points',
          label: 'Сумма баллов',
          formatter: val => {
            if (val === null) return 0;
            return val;
          },
        },
      ],
      returnData: [],
      currentRefFields: [
        {
          key: 'partner_id',
          label: 'ID Партёнра',
        },
        {
          key: 'partner_fio',
          label: 'ФИО',
        },
        {
          key: 'partner_phone',
          label: 'Телефон',
        },
        {
          key: 'partner_email',
          label: 'E-mail',
        },
        {
          key: 'partner_reg_date',
          label: 'Дата регистрации',
        },
      ],
      currentRefData: [],
      rangeDate: [
        this.$moment()
          .subtract(0, 'months')
          .startOf('year')
          .format('YYYY-MM-DD'),
        this.$moment()
          .subtract(0, 'months')
          .endOf('year')
          .format('YYYY-MM-DD'),
      ],
      rangeDateReg: [],
    };
  },
  mounted() {
    backAPI.get('/agent/reflinks-summary-by-agent').then(Response => {
      Response.data.entries.forEach(type => {
        // eslint-disable-next-line no-underscore-dangle
        type._showDetails = false;
      });
      this.entries = Response.data.entries;
    });
  },
  methods: {
    ...mapActions('currentPage', ['setPageTitle']),
    clearRefInput() {
      this.ref_id = '';
    },
    clearUserInfo(key) {
      this.newUser[key] = '';
    },
    async showRefTypeDetails(scope) {
      this.showNewUserModal = false;
      this.currentRefData = [];
      this.currentRegInfo = '';
      this.returnData = [];
      this.entries.forEach(ref => {
        if (ref.reflink_type_id !== scope.item.reflink_type_id) {
          console.log('1');
          // eslint-disable-next-line no-underscore-dangle
          ref._showDetails = false;
        }
      });
      // eslint-disable-next-line no-underscore-dangle
      if (!scope.item._showDetails) {
        console.log('2');
        try {
          const params = {
            params: {
              i_reflink_type_id: scope.item.reflink_type_id,
              beg_dte: this.rangeDate[0],
              end_dte: this.rangeDate[1],
            },
          };
          backAPI.get('/agent/reflinks-summary-by-type', params).then(Response => {
            this.returnData = Response.data.entries;
          });
        } catch (error) {
          console.log('Произошла ошибка');
        }
      }
      scope.toggleDetails();
    },
    openRegInfo(id) {
      // Старая информация по зарегестрированным партёнрам
      this.currentRegInfo = '';
      this.showNewUserModal = false;
      this.currentRefData = [];
      // Новая информация по зарегестрированным партёнрам
      this.currentRegInfo = id;
      this.showNewUserModal = true;
      const params = {
        params: {
          reflink_id: id,
          beg_dte: this.rangeDate[0],
          end_dte: this.rangeDate[1],
        },
      };
      backAPI.get('/agent/reflink-reg-list', params).then(Response => {
        this.currentRefData = Response.data.entries;
      });
    },
    // updateData() {
    //   console.log('Update');
    // },
    // resetData() {
    //   console.log('Reset Data');
    // },
    getSelectedDataRange() {
      const params = {
        params: {
          beg_dte: this.rangeDate[0],
          end_dte: this.rangeDate[1],
        },
      };
      backAPI.get('/agent/reflinks-summary-by-agent', params).then(Response => {
        Response.data.entries.forEach(type => {
          // eslint-disable-next-line no-underscore-dangle
          type._showDetails = false;
        });
        this.entries = Response.data.entries;
      });
    },
    clearDP() {
      console.log('Reset Data');
      this.showNewUserModal = false;
      this.currentRefData = [];
      this.currentRegInfo = '';
    },
    // clearDPReg() {
    //   console.log('Clear Reg Date');
    // },
    // regAction() {
    //   console.log('Registration');
    // },
  },
  computed: {
    all_links() {
      return this.entries.reduce((sum, type) => sum + type.cnt_links, 0);
    },
    all_reg() {
      return this.entries.reduce((sum, type) => sum + type.cnt_reg, 0);
    },
    all_conversion_pc() {
      return this.entries.reduce((sum, type) => sum + type.conversion_pc, 0);
    },
    all_sales() {
      return this.entries.reduce((sum, type) => sum + type.sale_cnt, 0);
    },
    all_sale_sum() {
      return this.entries.reduce((sum, type) => sum + type.sale_sum, 0);
    },
    all_returns() {
      return this.entries.reduce((sum, type) => sum + type.return_cnt, 0);
    },
    all_return_sum() {
      return this.entries.reduce((sum, type) => sum + type.return_sum, 0);
    },
    all_return_porcion() {
      return this.entries.reduce((sum, type) => sum + type.return_porcion, 0);
    },
  },
};
</script>
<style lang="scss" scoped>
.licevoischet__page {
  &__summ {
    text-align: center;
    background-color: #dee2f3;
    font-size: 14px;
    padding: 10px 0px;
    margin-bottom: 0;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 10px;
  }
}
.search_icons {
  position: relative;
  top: 5px;
  display: inline-block;
  width: 24px !important;
  height: 24px;
  background-image: url('../../public/icons/search.svg');
  background-size: contain;
  &.mobi {
    position: absolute;
    top: 20px;
    right: 15px;
  }
}
.organization__modal {
  position: relative;
  padding: 0px 0px;
  margin: 30px 0px;
  width: 100%;
  bottom: 0;

  & .edit {
    margin-top: 50px;
    input {
      // margin-bottom: 20px;
    }
    button {
      margin-top: 20px;
      width: 48%;
      border: 0;
      padding: 5px 30px;
      font-size: 16px;
      &:nth-of-type(1) {
        background-color: #32aaa7;
        color: white;
        border: 2px solid #32aaa7;
      }
      &:nth-of-type(2) {
        float: right;
        background-color: white;
        color: #32aaa7;
        border: 2px solid #32aaa7;
      }
    }
  }
}
</style>
<style>
.btn-secondary {
  color: black;
  background: none;
  border: 0;
  outline: none !important;
  box-shadow: none;
  font-weight: 500;
  font-size: 18px;
}
.btn-secondary:hover {
  color: black;
  background: transparent;
}
.btn-secondary:not(:disabled):not(.disabled):active,
.btn-secondary:not(:disabled):not(.disabled).active,
.show > .btn-secondary.dropdown-toggle {
  background-color: unset;
  outline: none !important;
}
.btn-secondary:not(:disabled):not(.disabled):active:focus,
.btn-secondary:not(:disabled):not(.disabled).active:focus,
.show > .btn-secondary.dropdown-toggle:focus {
  box-shadow: none;
}
.btn-secondary:focus,
.btn-secondary.focus {
  color: black;
  background-color: transparent;
  border: 0;
  box-shadow: none;
}
</style>
