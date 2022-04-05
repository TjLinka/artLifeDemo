<template>
  <div class="container">
    <h2 class="page_title">
      {{$t("Создание покупки")}}
    </h2>
    <h4 class="mt-3">
      {{userInfo.id}} - {{userInfo.name}}
    </h4>
    <div class="row mt-3">
      <div class="col-md-4">
        <span class="custom_label" v-if="search_user">
          {{$t("Склад")}}
        </span>
        <el-select
        v-model="selectedStock"
        clearable
        filterable
        @change="getCatalog"
        @clear="clearStock"
        style="width: 100%"
        :placeholder="`${$t('Склад')}`">
          <el-option
            v-for="stock in stockList"
            :key="stock.stock_id"
            :label="`${stock.stock_id} - ${stock.stock_name}`"
            :value="stock.stock_id">
          </el-option>
        </el-select>
        <p v-show="selectedStock === ''" style="color: red">
          {{$t("Для работы с каталогом выберите склад")}}
        </p>
      </div>
    </div>
    <!-- <div class="row mt-4" v-show="selectedUserInfo.agent_id">
      <div class="col">
        <p class="p-0 m-0 lbl">{{$t("Получатель баллов")}}:</p>
        <span>{{selectedUserInfo.partner_name}}</span>
      </div>
      <div class="col" v-show="selectedUserInfo.rank === 0">
        <p class="p-0 m-0 lbl">{{$t("Клиентская скидка")}}:</p>
        <span>{{selectedUserInfo.discount_pc === null ? 0 : selectedUserInfo.discount_pc}}</span>
      </div>
    </div> -->
    <!-- <div class="row mt-4 mb-4" v-show="selectedUserInfo.agent_stock_id === stock_id">
      <div class="col">
        <p class="p-0 m-0 lbl">
         {{$t("На счету у Партнера")}}
        </p>
        <span
        :class="selectedUserInfo.amount < 0 ? 'red' : ''"
        >
        <router-link
          class="link_part"
          :to="`/partner-details/${selectedUserInfo.agent_id}`">
          {{selectedUserInfo.amount === null ? 0 : selectedUserInfo.amount  | localInt}}</router-link>
        </span>
      </div>
    </div> -->
    <h3 class="mt-3">
      {{$t("Корзина")}}
    </h3>
    <div v-show="newCart.length > 0">
    <div class="row mt-4">
      <div class="col">
        <p class="p-0 m-0 lbl">{{$t("Сумма продажи")}}:</p>
        <span>{{cartInfo.priceAm | localInt}}</span>
      </div>
      <div class="col">
        <p class="p-0 m-0 lbl">{{$t("Всего едениц товара")}}:</p>
        <span>{{cartInfo.prodAm | localInt}}</span>
      </div>
    </div>
    <div class="row mt-4">
      <div class="col">
        <p class="p-0 m-0 lbl">{{$t("Сумма баллов")}}:</p>
        <span>{{cartInfo.pointsAm | localInt}}</span>
      </div>
      <div class="col">
        <p class="p-0 m-0 lbl">{{$t("Всего наименований")}}:</p>
        <span>{{cartInfo.nameAm | localInt}}</span>
      </div>
    </div>
    <div class="row">
    </div>
    <b-table
    responsive
    border
    outlined
    small
    class="mt-4"
    head-variant="light"
    :fields="cartFields"
    :tbody-tr-class="rowClass"
    :items="newCart">
      <template v-slot:cell(goods_count)="scope">
        <div v-if="!scope.item.isKit" class="custom_input col-md">
          <input
            type="text"
            :name="`status${scope.item.goods_id}`"
            :id="`status${scope.item.goods_id}`"
            required
            :placeholder="`${$t('Количество')}`"
            @keypress="checkInput($event, scope.item.goods_article)"
            @change="changeCount1($event, scope.item.articul)"
            :value="scope.item.goods_count"
          />
          <span class="clear_icon" @click="clearCount(scope.item.articul)"></span>
          <p class="countError" v-show="scope.item.goods_count > scope.item.items">Товаров недостаточно</p>
        </div>
        <div v-else class="custom_input col-md">
          <input
            type="text"
            :name="`status${scope.item.id}`"
            :id="`status${scope.item.id}`"
            required
            :placeholder="`${$t('Количество')}`"
            @keypress="checkInput($event, scope.item.id)"
            @change="kitChangeCount1($event, scope.item.id)"
            :value="scope.item.goods_count"
          />
          <span class="clear_icon" @click="clearCountKit(scope.item.id)"></span>
          <p class="countError" v-show="scope.item.goods_count > scope.item.items">Товаров недостаточно</p>
        </div>
      </template>
      <template v-slot:cell(price_all)="scope">
        {{scope.item.price_all | localInt}}
      </template>
      <template v-slot:cell(points_count)="scope">
        {{scope.item.points_count | localInt}}
      </template>
        <template v-slot:cell(articul)="row">
          <span>{{row.item.articul}}</span> <br>
          <span @click="show_details(row)" v-if="row.item.isKit" style="color: #32aaa7; cursor: pointer; display:inline-block; border-bottom: 1px dotted #32aaa7">
            {{ row.detailsShowing ? $t('Свернуть') : $t('Раскрыть') }}</span>
        </template>
      <template v-slot:row-details="row">
        <b-table
          :fields="returnFields"
          :items="return_details[row.item.id]"
          head-variant="light"
        >
          <template #cell()="data">
            {{ data.value }}
          </template>
        </b-table>
      </template>
    </b-table>
    <div class="row mt-3">
      <div class="col custom_input">
          <input type="text" name="comm" id="comm" required v-model="comm" />
          <label for="comm">
            {{$t('Комментарий')}}
          </label>
          <span class="clear_icon" @click="clearComm()"></span>
      </div>
    </div>
    <div class="row mt-4">
      <div class="col-md-6 sponsor_bot_btns">
        <button @click="createSale" :disabled="countCheck" :class="`${countCheck ? 'disabled' : ''}`">
          {{$t("Создать покупку")}}
        </button>
      </div>
    </div>
    </div>
    <footer class="container-fluid cust_modal sale_footer" :style="selectedStock !== '' ? '' : 'pointer-events: none;'">
      <div class="container-md">
        <div class="row desktop_search">
          <div
            class="col text-center search__btn"
            @click="showModal = !showModal"
            v-if="!showModal"
          >
            {{$t("Каталог")}} <i class="el-icon-search search_icon"></i>
          </div>
        </div>
        <div v-if="showModal" class="organization__modal">
          <h3>
            {{$t("Каталог")}} {{activeTab === 'goods' ? 'товаров' : 'комплектов'}}
            <span class="close_btn" @click="showModal = !showModal"></span>
          </h3>
          <el-tabs v-model="activeTab">
            <el-tab-pane :label="`${$t('ТОВАРЫ')}`" name='goods'>
          <b-row align-v="end" class="row mb-4">
            <div class="col custom_input">
              <input
                ref="prodSearch"
                type="text"
                name="modalFilter"
                id="modalFilter"
                required
                v-focus
                @keydown.enter="setRow"
              />
              <label for="modalFilter">
                {{$t("Поиск по наименованию или артикулу")}}
              </label>
              <span class="clear_icon" @click="clearModalFilter()"></span>
            </div>
            <div class="col-md sponsor_bot_btns">
                <button class="" @click="showModal = !showModal">
                  {{$t("Добавить")}}
                </button>
            </div>
          </b-row>
          <b-table
            responsive
            outlined
            small
            sticky-header
            :filter="modalFilter"
            :filter-included-fields="['articul', 'name']"
            head-variant="light"
            :fields="modalFields"
            :items="modalEntries"
          >
            <template v-slot:cell(goods_count)="scope">
              <div class="custom_input col-md">
                <input
                  :ref="`row${scope.index}`"
                  type="text"
                  :name="`status${scope.item.id}`"
                  :id="`status${scope.item.id}`"
                  required
                  v-currency="{
                    precision: 0,
                    currency: null,
                    valueAsInteger: false,
                    distractionFree: false,
                    allowNegative: false
                  }"
                  :placeholder="`${$t('Количество')}`"
                  @keydown.enter="changeCount($event, scope.item.articul)"
                  @keypress="checkInput($event, scope.item.goods_article)"
                  @change="changeCount1($event, scope.item.articul)"
                  :value="scope.item.goods_count"
                />
                <span class="clear_icon" @click="clearCount(scope.item.articul)"></span>
              </div>
            </template>
          </b-table>
            </el-tab-pane>
            <el-tab-pane :label="`${$t('КОМПЛЕКТЫ')}`" name="kits">
              <b-row align-v="end" class="row mb-4">
                <div class="col custom_input">
                  <input ref="prodSearchComp" v-focus type="text" name="modalFilterComp" id="modalFilterComp" required @keydown.enter="setRow1" />
                  <label for="modalFilterComp">
                    {{$t("Поиск по наименованию или артикулу")}}
                  </label>
                  <span class="clear_icon" @click="clearModalFilter()"></span>
                </div>
                <div class="col-md sponsor_bot_btns">
                  <button class="" @click="showModal = !showModal">
                    {{$t("Добавить")}}
                  </button>
                </div>
              </b-row>
              <div class="compecty">
              <b-table
                sticky-header
                :fields="modalKitFileds"
                :items="modalKitEntires"
                head-variant="light"
                class="sub_2"
                responsive
                outlined
                small
              >
                <template v-slot:cell(articul)="row">
                  <span>{{row.item.articul}}</span> <br>
                  <span @click="show_details(row)" style="color: #32aaa7; cursor: pointer; display:inline-block; border-bottom: 1px dotted #32aaa7">
                    {{ row.detailsShowing ? $t('Свернуть') : $t('Раскрыть') }}</span>
                </template>
                <template v-slot:row-details="row">
                  <b-table
                  :fields="returnFields"
                  :items="return_details[row.item.id]"
                  :sort-compare-options="{ numeric: false, sensitivity: 'base' }"
                  head-variant="light"
                  >
                    <template #cell()="data">
                      {{ data.value }}
                    </template>
                  </b-table>
                </template>
                <template v-slot:cell(goods_count)="scope">
                  <div class="custom_input col-md">
                    <input
                      :ref="`row${scope.index}`"
                      type="text"
                      :name="`status${scope.item.id}`"
                      :id="`status${scope.item.id}`"
                      required
                      v-currency="{
                        precision: 0,
                        currency: null,
                        valueAsInteger: false,
                        distractionFree: false,
                        allowNegative: false
                      }"
                      :placeholder="`${$t('Количество')}`"
                      @keydown.enter="kitChangeCount($event, scope.item.id)"
                      @keypress="checkInput($event, scope.item.id)"
                      @change="kitChangeCount1($event, scope.item.id)"
                      :value="scope.item.goods_count"
                    />
                    <span class="clear_icon" @click="clearCountKit(scope.item.id)"></span>
                  </div>
                </template>
              </b-table>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </footer>
  <b-modal id="bv-modal-example" hide-footer centered  :hide-header-close="true" :no-close-on-backdrop="true">
    <div class="d-block text-center">
      <h3>
        {{$t('Создание покупки')}}
      </h3>
      <p>{{$t("Пожалуйста подождите")}}...</p>
    </div>
  </b-modal>
  </div>
</template>

<script>
/* eslint-disable max-len */
/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
import { mapState } from 'vuex';
import $ from 'jquery';
import backAPI from '../assets/backApi';
// import backAPI from '../assets/backApi';
// import sortMix from '../mixins/sortMix';

export default {
  name: 'NewPurchase',
  // mixins: [sortMix],
  data() {
    return {
      activeTab: 'goods',
      tree_type: true,
      showModal: false,
      operError: false,
      boxTwo: '',
      cash: '',
      card: '',
      userInfo: {
        id: '',
        name: '',
      },
      modalFilter: '',
      search_user: '',
      selectedStock: '',
      stockList: [],
      selectedUserInfo: {},
      comm: '',
      keyD: 'price_retail',
      keyL: 'Цена Р',
      modalFields: [
        {
          key: 'articul',
          label: this.$t('Артикул'),
          sortable: true,
          formatter: (v) => String(v),
          sortByFormatted: true,
        },
        {
          key: 'name',
          label: this.$t('Наименование'),
          sortable: true,
        },
        {
          key: 'points',
          label: this.$t('Баллы'),
          sortable: true,
        },
        {
          key: 'price_retail',
          label: this.$t('Цена розничная'),
          sortable: true,
        },
        {
          key: 'price',
          label: this.$t('Цена фактическая'),
          sortable: true,
        },
        {
          key: 'price_discount',
          label: this.$t('Размер скидки'),
          sortable: true,
        },
        {
          key: 'price_discount_pc',
          label: this.$t('Размер скидки, %'),
          sortable: true,
        },
        {
          key: 'items',
          label: this.$t('В наличии'),
          sortable: true,
        },
        {
          key: 'goods_count',
          label: this.$t('Количество'),
        },
      ],
      cartFields: [
        {
          key: 'name',
          label: this.$t('Наименование'),
        },
        {
          key: 'articul',
          label: this.$t('Артикул'),
          sortable: true,
        },
        {
          key: 'points',
          label: this.$t('Баллы'),
        },
        {
          key: 'price_retail',
          label: this.$t('Цена розничная'),
          formatter(v) {
            if (v >= 0) {
              const formatter = new Intl.NumberFormat('ru');
              return formatter.format(v);
            }
            return null;
          },
        },
        {
          key: 'price',
          label: this.$t('Цена фактическая'),
          formatter(v) {
            if (v >= 0) {
              const formatter = new Intl.NumberFormat('ru');
              return formatter.format(v);
            }
            return null;
          },
        },
        {
          key: 'price_discount',
          label: this.$t('Размер скидки'),
          formatter(v) {
            if (v >= 0) {
              const formatter = new Intl.NumberFormat('ru');
              return formatter.format(v);
            }
            return null;
          },
        },
        {
          key: 'price_discount_pc',
          label: this.$t('Размер скидки, %'),
        },
        {
          key: 'items',
          label: this.$t('Остаток по складу'),
        },
        {
          key: 'goods_count',
          label: this.$t('Количество'),
        },
        {
          key: 'price_all',
          label: this.$t('Сумма'),
          formatter(v) {
            if (v >= 0) {
              const formatter = new Intl.NumberFormat('ru');
              return formatter.format(v);
            }
            return null;
          },
        },
        {
          key: 'points_count',
          label: this.$t('Сумма баллов'),
          formatter(v) {
            if (v >= 0) {
              const formatter = new Intl.NumberFormat('ru');
              return formatter.format(v);
            }
            return null;
          },
        },
      ],
      modalEntries: [],
      modalKitFileds: [
        {
          key: 'articul',
          label: this.$t('Артикул'),
          formatter: (v) => String(v),
          sortByFormatted: true,
          sortable: true,
        },
        {
          key: 'name',
          label: this.$t('Наименование'),
          sortable: true,
        },
        {
          key: 'points',
          label: this.$t('Баллы'),
          sortable: true,
        },
        {
          key: 'price_retail',
          label: this.$t('Цена розничная'),
          sortable: true,
        },
        {
          key: 'price',
          label: this.$t('Цена фактическая'),
          sortable: true,
        },
        {
          key: 'price_discount',
          label: this.$t('Размер скидки'),
          sortable: true,
        },
        {
          key: 'price_discount_pc',
          label: this.$t('Размер скидки, %'),
          sortable: true,
        },
        {
          key: 'items',
          label: this.$t('Остаток по складу'),
          sortable: true,
        },
        {
          key: 'goods_count',
          label: this.$t('Количество'),
        },
      ],
      modalKitEntires: [],
      returnFields: [
        {
          key: 'item_article',
          label: this.$t('Артикул'),
          sortable: true,
          formatter: (v) => v,
          sortByFormatted: true,
        },
        {
          key: 'item_name',
          label: this.$t('Наименование'),
          sortable: true,
        },
        {
          key: 'selling_distributor_price',
          label: this.$t('Дистр. цена'),
          sortable: true,
          formatter(v) {
            if (v >= 0) {
              const formatter = new Intl.NumberFormat('ru');
              return formatter.format(v);
            }
            return null;
          },
        },
        {
          key: 'retail_price',
          label: this.$t('Рознич. цена'),
          sortable: true,
          formatter(v) {
            if (v >= 0) {
              const formatter = new Intl.NumberFormat('ru');
              return formatter.format(v);
            }
            return null;
          },
        },
        {
          key: 'points',
          label: this.$t('Баллы за еденицу'),
          sortable: true,
          formatter(v) {
            if (v >= 0) {
              const formatter = new Intl.NumberFormat('ru');
              return formatter.format(v);
            }
            return null;
          },
        },
        {
          key: 'amount',
          label: this.$t('Кол-во в комлекте'),
          sortable: true,
          formatter(v) {
            if (v >= 0) {
              const formatter = new Intl.NumberFormat('ru');
              return formatter.format(v);
            }
            return null;
          },
        },
      ],
      return_details: [],
    };
  },
  metaInfo() {
    return {
      title: `${this.$t('ЛК Партнера')} - ${this.$t('Создание покупки')}`,
    };
  },
  mounted() {
    this.return_details = new Array(this.total_rows).fill(undefined);
    backAPI.get('/agent/sales/available-stocks').then((Response) => {
      this.stockList = Response.data.entries;
    });
    backAPI.get('/agent/profile').then((Response) => {
      this.userInfo = Response.data;
      this.selectedStock = Response.data.stock_id;
      backAPI.get('/agent/sales/catalog', { params: { stock_id: Response.data.stock_id } }).then((Response2) => {
        Response2.data.entries.forEach((i) => {
        // eslint-disable-next-line no-param-reassign
          i.goods_count = '';
        });
        this.modalEntries = Response2.data.entries;
      });
      backAPI.get('/agent/sales/complect-catalog', { params: { stock_id: Response.data.stock_id } }).then((Response2) => {
        // eslint-disable-next-line no-unused-expressions
        Response2.data.entries.forEach((kit) => {
          // eslint-disable-next-line no-param-reassign
          kit.goods_count = '';
          // eslint-disable-next-line no-param-reassign
          kit.isKit = true;
        });
        this.modalKitEntires = Response2.data.entries;
      });
    });
  },
  directives: {
    focus: {
      inserted: (el) => {
        el.focus();
      },
    },
  },
  watch: {
    distrKey(rank) {
      if (rank > 0) {
        this.modalFields[3].key = 'pricex';
        this.modalFields[3].label = this.$t('Цена Д');
      } else {
        this.modalFields[3].key = 'price_retail';
        this.modalFields[3].key = this.$t('Цена Р');
      }
    },
  },
  methods: {
    clearStock() {
      this.selectedStock = '';
      this.showModal = false;
    },
    getCatalog(stock) {
      if (stock !== '') {
        backAPI.get('/agent/sales/catalog', { params: { stock_id: stock } }).then((Response) => {
          Response.data.entries.forEach((i) => {
          // eslint-disable-next-line no-param-reassign
            i.goods_count = '';
          });
          this.modalEntries = Response.data.entries;
        });
        backAPI.get('/agent/sales/complect-catalog', { params: { stock_id: stock } }).then((Response) => {
          // eslint-disable-next-line no-unused-expressions
          Response.data.entries.forEach((kit) => {
            // eslint-disable-next-line no-param-reassign
            kit.goods_count = '';
            // eslint-disable-next-line no-param-reassign
            kit.isKit = true;
          });
          this.modalKitEntires = Response.data.entries;
        });
      }
    },
    rowClass(item, type) {
      console.log(item, type);
      if (!item || type !== 'row') return;
      // eslint-disable-next-line consistent-return
      if (item.isKit) return 'compectyCart';
    },
    show_details(row) {
      console.log(row);
      if (row.detailsShowing === true) {
        row.toggleDetails();
      } else if (!this.return_details[row.item.id]) {
        backAPI.get('/agent/sales/complect-catalog/detail/', { params: { complect_id: row.item.id } }).then((response) => {
          this.return_details[row.item.id] = response.data.entries;
          row.toggleDetails();
        });
      } else {
        row.toggleDetails();
      }
    },
    // eslint-disable-next-line consistent-return
    checkInput1(e) {
      console.log(e.which);
      if (e.which === 189 || e.which === 187 || e.which === 107 || e.which === 109) {
        // eslint-disable-next-line no-restricted-globals
        e.preventDefault();
        return false;
      }
    },
    qq() {
      this.showModal = false;
      this.search_user = '';
      this.selectedUserInfo = {};
      this.modalEntries = [];
      this.cash = '';
      this.card = '';
    },
    dd() {
      this.search_user = this.selectedUserInfo.value;
    },
    setCash() {
    },
    clearComm() {
      this.comm = '';
    },
    clearCash() {
      this.cash = '';
    },
    clearCard() {
      this.card = '';
    },
    clearModalFilter() {
      this.modalFilter = '';
    },
    clearCount(id) {
      const prod = this.modalEntries.find((item) => item.articul === id);
      prod.goods_count = '';
    },
    clearCountKit(id) {
      console.log(id);
      const prod = this.modalKitEntires.find((item) => item.id === id);
      prod.goods_count = '';
    },
    changeCount(e, id) {
      const prod = this.modalEntries.find((item) => item.articul === id);
      prod.goods_count = e.target.value;
      prod.price_all = Number(e.target.value.replace(/\s/g, '')) * parseFloat(prod.price);
      prod.points_count = Number(e.target.value.replace(/\s/g, '')) * parseFloat(prod.points);
      this.modalFilter = '';
      this.$refs.prodSearch.value = '';
      this.$refs.prodSearch.focus();
    },
    changeCount1(e, id) {
      const prod = this.modalEntries.find((item) => item.articul === id);
      prod.goods_count = e.target.value;
      prod.price_all = Number(e.target.value.replace(/\s/g, '')) * parseFloat(prod.price);
      prod.points_count = Number(e.target.value.replace(/\s/g, '')) * parseFloat(prod.points);
    },
    kitChangeCount(e, id) {
      const prod = this.modalKitEntires.find((item) => item.id === id);
      prod.goods_count = e.target.value;
      prod.price_all = Number(e.target.value.replace(/\s/g, '')) * parseFloat(prod.price);
      prod.points_count = Number(e.target.value.replace(/\s/g, '')) * parseFloat(prod.points);
      this.modalFilter = '';
      this.$refs.prodSearch.value = '';
      this.$refs.prodSearch.focus();
    },
    kitChangeCount1(e, id) {
      const prod = this.modalKitEntires.find((item) => item.id === id);
      prod.goods_count = e.target.value;
      prod.price_all = Number(e.target.value.replace(/\s/g, '')) * parseFloat(prod.price);
      prod.points_count = Number(e.target.value.replace(/\s/g, '')) * parseFloat(prod.points);
    },
    // eslint-disable-next-line consistent-return
    checkInput(evt) {
      console.log(evt.target.value);
      const regex = new RegExp('^[0-9]+$');
      const key = String.fromCharCode(!evt.charCode ? evt.which : evt.charCode);
      if (!regex.test(key)) {
        console.log('gggg');
        // eslint-disable-next-line no-restricted-globals
        evt.preventDefault();
        return false;
      }
    },
    setRow(e) {
      console.log('Hi');
      this.modalFilter = e.target.value;
      setTimeout(() => {
        // eslint-disable-next-line dot-notation
        if (this.$refs['row0']) {
          console.log($('table > tbody').eq(1).find('.custom_input')[0]);
          $('table > tbody').eq(1).find('.custom_input').eq(0)
            .find('input')
            .focus();
        }
      }, 200);
    },
    setRow1(e) {
      console.log('Hi2');
      this.modalFilterComp = e.target.value;
      setTimeout(() => {
        // eslint-disable-next-line dot-notation
        if (this.$refs['row0']) {
          // eslint-disable-next-line dot-notation
          this.$refs['row0'].focus();
        }
      }, 100);
    },
    async createSale() {
      console.log(this.cash, this.card);
      const res = await this.createMessageBox(this.$t('Вы уверены, что хотите создать покупку?'));
      if (res) {
        this.$bvModal.show('bv-modal-example');
        const goodsMass = this.newCart.map((item) => ({ goods_id: item.id, goods_quantity: Number(item.goods_count.replace(/\s/g, '')) }));
        try {
          const reuslt = await backAPI.post('/agent/sales/sale-create', {
            positions: goodsMass,
            stock_id: this.selectedStock,
            comm: this.comm,
          });
          if (reuslt.status === 200) {
            this.$bvModal.hide('bv-modal-example');
            await this.createMessageBoxError(this.$t("Покупка создана успешно. Вы будете перенаправлены на страницу 'Продажи'"));
            this.$router.push('/purchases-history');
          } else {
            this.$bvModal.hide('bv-modal-example');
            this.showToast(this.$t('Ошибка'), this.$t('Что-то пошло не так'), 'danger');
          }
        } catch (error) {
          this.$bvModal.hide('bv-modal-example');
          this.showToast(this.$t('Ошибка'), this.$t('Что-то пошло не так'), 'danger');
        }
      } else {
        this.$bvModal.hide('bv-modal-example');
      }
    },
    clear_search_user() {
      this.selectedUserInfo = {};
      this.modalEntries = [];
    },
    createMessageBox(messageText) {
      const h = this.$createElement;
      // More complex structure
      const messageVNode = h('div', { class: ['foobar'] },
        [
          h('h3', { class: ['text-center'] }, [messageText]),
        ]);
      // We must pass the generated VNodes as arrays
      return this.$bvModal.msgBoxConfirm([messageVNode], {
        buttonSize: 'md',
        centered: true,
        cancelTitle: 'Нет',
        okTitle: 'Да',
        size: 'xl',
      });
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
          h('strong', { class: 'mr-2' }, title),
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
    createMessageBoxError(messageText) {
      const h = this.$createElement;
      // More complex structure
      const messageVNode = h('div', { class: ['foobar'] }, [
        h('h5', { class: ['text-center'] }, [messageText]),
      ]);
      // We must pass the generated VNodes as arrays
      return this.$bvModal.msgBoxOk([messageVNode], {
        buttonSize: 'md',
        centered: true,
        cancelTitle: 'Нет',
        okTitle: 'OK',
        size: 'md',
      });
    },
  },
  computed: {
    ...mapState('auth', ['stock_id']),
    countCheck() {
      return this.newCart.some((item) => item.goods_count > item.items);
    },
    newCart() {
      console.log(this.modalKitEntires);
      return [...this.modalEntries.filter((item) => Number(item.goods_count.replace(/\s/g, '')) > 0), ...this.modalKitEntires.filter((kit) => Number(kit.goods_count.replace(/\s/g, '') > 0))];
    },
    cartInfo() {
      // eslint-disable-next-line radix
      const prodAmount = this.newCart.reduce((sum, elem) => sum + Number(elem.goods_count.replace(/\s/g, '')), 0);
      // eslint-disable-next-line radix
      const pointsAmount = this.newCart.reduce((sum, elem) => sum + (parseFloat(elem.points) * Number(elem.goods_count.replace(/\s/g, ''))), 0);
      const nameAmount = this.newCart.length;
      // eslint-disable-next-line radix
      const priceAmount = this.newCart.reduce((sum, elem) => sum + (parseFloat(elem.price) * Number(elem.goods_count.replace(/\s/g, ''))), 0);
      const licShet = ((this.cash === '' ? 0 : parseFloat(this.cash.replace(/\s/g, '').replace(/[,]/g, '.'))) + (this.card === '' ? 0 : parseFloat(this.card.replace(/\s/g, '').replace(/[,]/g, '.')))) - priceAmount;
      const cartData = {
        prodAm: prodAmount, pointsAm: pointsAmount, nameAm: nameAmount, priceAm: priceAmount, ls: licShet,
      };
      return cartData;
    },
  },
};
</script>

<style lang="scss" scoped>
.close_btn{
  top: unset;
}
.countError{
  padding: 0;
  margin: 0;
  color: red;
  font-weight: bold;
}
.red{
  color: red;
  font-weight: bold;
  & a {
    color: red;
  }
}
.pay{
  margin-left: 15px;
  margin-right: 10px;
  margin-bottom: 4px;
}
.act{
  color: black;
  font-size: 14px;
}
.organization__modal {
  position: relative;
  padding-top: 30px;
}
.link_part{
  color: black;
}
.organization__modal {
  //   position: absolute;
  // padding: 60px;
  width: 100%;
  bottom: 0;

  & .edit {
    input {
      // margin-bottom: 20px;
    }
    button {
      margin-top: 20px;
      width: 100%;
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
      &.disabled {
        color: #9a9a9a;
        background-color: #dee2f3;
      }
    }
  }
}
.lbl{
    font-size: 14px;
    line-height: 12px;
    color: #9A9A9A;
}
.sponsor_bot_btns {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  button {
    width: 48%;
    border-radius: 1px;
    outline: none;
    &:nth-of-type(1) {
      background-color: #32aaa7;
      color: white;
      font-weight: 500;
      border: 0;
      padding: 7px 50px;
      &.disabled{
        color: #9a9a9a;
        background-color: #dee2f3;
      }
    }
    &:nth-of-type(2) {
      color: #32aaa7;
      font-weight: 500;
      background: none;
      border: 1px solid #32aaa7;
      padding: 6px 50px;
    }
  }
}
</style>
<style>
.compecty .table .thead-light th{
  background-color: #32aaa7 !important
}
.compecty tbody td{
  background-color: #AED9D8 !important
}
.compecty table table {
  margin: 0;
}
.compecty input{
  background: transparent;
  border-bottom-color: black;
}
.compecty input::placeholder{
  color: black;
}
/* КОРЗИНА КОМПЛЕКТЫ */
.compectyCart td{
  background-color: #AED9D8 !important
}
.compectyCart ~ .b-table-details .table .thead-light th{
  background-color: #32aaa7 !important
}
.compectyCart ~ .b-table-details .table td{
  background-color: #AED9D8 !important
}
.compectyCart ~ .b-table-details .table{
  margin: 0;
}
.compectyCart input{
  background: transparent;
  border-bottom-color: black;
}
.compectyCart input::placeholder{
  color: black;
}
.sale_footer > .container-md.open{
    max-height: 70vh;
    min-height: 50vh;
}
.sale_footer .b-table-sticky-header{
  max-height: calc(100vh/3) !important;
}
</style>
