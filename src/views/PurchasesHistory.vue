<template>
  <div class="licevoischet__page">
    <div class="container">
      <h2 class="page__title">История покупок</h2>
        <el-tag
        v-for="tag in tags"
        :key="tag.name"
        closable
        @close="handleClose($event, tag)"
        :type="tag.type"
        :disable-transitions="true"
      >
        {{ tag.name }}
      </el-tag>
      <p>
        <span class="mr-3">Печать</span>
        <span class="mr-3">Экспорт в xls</span>
        <span class="mr-3">Экспорт в pdf</span>
      </p>
      <b-table :fields="fields" :items="entries" head-variant="light">
        <template v-slot:cell(show_details)="row">
          <b-button size="sm" @click="show_details(row)" class="mr-2">
            {{ row.detailsShowing ? '-' : '+' }}
          </b-button>
        </template>
        <template v-slot:row-details="row">
          <b-table :fields="returnFields" :items="return_details[row.item.webshop_id]"
           head-variant="light"> </b-table>
        </template>
      </b-table>
      <div class="row">
        <div class="col text-center search__btn" @click="toggleSearch" v-if="!searchActive">
          Поиск партнера <i class="el-icon-search search_icon"></i>
        </div>
      </div>
      <div v-if="searchActive" class="organization__modal">
        <h3>Поиск партнера</h3>
        <span
            class="mr-1"
            @click="nextPeriod(-1)"
          >
            &lt;</span
          >
          <span>{{ currentPeriod.slice(0, -3) }}</span>
          <span class="ml-1" @click="nextPeriod(1)"> &gt;</span>
        <div class="row edit">
          <div class="col-sm-6">
            <input type="text" name="" id="art" placeholder="Артикул" v-model="articul" />
          </div>
          <div class="col-sm-6">
            <input type="text" name="" id="name" placeholder="Наименование" v-model="name" />
          </div>
        </div>
        <!-- <div class="row edit">
          <div class="col-sm-6">
            <input type="text" name="" id="" placeholder="Номер накладной" v-model="number" />
          </div>
        </div> -->
        <div class="row edit">
          <div class="col-sm-6">
            <button class="mr-2" @click="updateData">Показать</button
            ><button @click="clearSelectedFilters">Сбросить</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import backApi from '../assets/backApi';

export default {
  name: 'AccountDetail',
  data() {
    return {
      lang: {
        monthBeforeYear: false,
      },
      periods: [],
      periodIndex: 0,
      period_enabled: true,
      searchActive: false,
      name: null,
      articul: null,
      saleid: null,
      rangeDate: {},
      entries: [],
      return_details: [],
      tags: [],
      returnFields: [
        {
          key: 'articul',
          label: 'Артикул',
        },
        {
          key: 'itemname',
          label: 'Товар',
        },
        {
          key: 'points',
          label: 'Баллы',
        },
        {
          key: 'price',
          label: 'Цена',
        },
        {
          key: 'cnt',
          label: 'Кол-во',
        },
        {
          key: 'points_cnt  ',
          label: 'Сумма балов',
        },
        {
          key: 'price_cnt',
          label: 'Стоимость',
        },
      ],
      fields: [
        'show_details',
        {
          key: 'webshop_id',
          label: 'Номер соглашения',
          sortable: true,
        },
        {
          key: 'amount',
          label: 'Сумма',
          sortable: true,
        },
        {
          key: 'dte',
          label: 'Дата',
          sortable: true,
        },
        {
          key: 'delivery',
          label: 'Доставка',
          sortable: true,
        },
        {
          key: 'address',
          label: 'Адрес',
          sortable: true,
        },
        {
          key: 'contacts',
          label: 'Контакты',
          sortable: true,
        },
        {
          key: 'status',
          label: 'Статус',
          sortable: true,
        },
      ],
    };
  },
  mounted() {
    backApi.get('agent/bonus-detail/periods').then((Response) => {
      this.periods = Response.data.entries.sort((a, b) => {
        const result = a.comdte > b.comdte ? 1 : -1;
        return result;
      });
      this.periodIndex = this.periods.length - 1;
    });

    backApi.get('agent/sales').then((Response) => {
      this.entries = Response.data.entries;
      this.return_details = new Array(this.total_rows).fill(undefined);
    });
  },
  computed: {
    currentPeriod() {
      try {
        return this.periods[this.periodIndex].comdte;
      } catch (e) {
        return '';
      }
    },
  },
  methods: {
    nextPeriod(x) {
      this.period_enabled = true;
      this.periodIndex = (this.periodIndex + this.periods.length + x)
      % this.periods.length;
    },
    handleClose(event, tag) {
      // this.tags.splice(this.dynamicTags.indexOf(tag), 1);
      this.tags.splice(this.tags.indexOf(tag), 1);
      if (tag.key === 'articul') {
        this.articul = null;
      } else if (tag.key === 'name') {
        this.name = null;
      } else if (tag.key === 'period') {
        this.period_enabled = false;
      }
      this.updateData();
    },
    updateData() {
      const data = {
        params: {
          name: this.name,
          articul: this.articul,
          saleid: this.saleid,
          comdte: this.period_enabled ? this.currentPeriod : null,
        },
      };
      if (this.articul !== null) {
        const tag = this.tags.find((t) => t.key === 'articul');
        if (tag) {
          tag.name = this.articul;
        } else if (this.tree_type !== 'full') {
          this.tags.push({ name: this.articul, key: 'articul' });
        }
      }
      if (this.name !== null && this.name !== '') {
        const tag = this.tags.find((t) => t.key === 'name');
        if (tag) {
          tag.name = this.name;
        } else {
          this.tags.push({ name: this.name, key: 'name' });
        }
        data.params.agent_id = this.agent_id;
      }
      const tag = this.tags.find((t) => t.key === 'period');
      if (tag) {
        tag.name = this.currentPeriod.slice(0, -3);
      } else if (this.period_enabled) {
        this.tags.push({ name: this.currentPeriod.slice(0, -3), key: 'period' });
      }
      // const params = { name: this.name, articul: this.articul, saleid: this.number };
      backApi.get('agent/sales', data).then((Response) => {
        this.entries = Response.data.entries;
        this.return_details = new Array(this.total_rows).fill(undefined);
      });
    },
    clearSelectedFilters() {
      this.name = null;
      this.articul = null;
      this.number = null;
      this.tags = [];
      backApi.get('agent/sales').then((Response) => {
        this.entries = Response.data.entries;
        this.return_details = new Array(this.total_rows).fill(undefined);
      });
    },
    toggleSearch() {
      this.searchActive = !this.searchActive;
    },
    show_details(row) {
      if (row.detailsShowing === true) {
        row.toggleDetails();
      } else if (!this.return_details[row.item.webshop_id]) {
        backApi
          .get('/agent/sales-detail', { params: { id: row.item.webshop_id } })
          .then((response) => {
            this.return_details[row.item.webshop_id] = response.data.entries;
            row.toggleDetails();
          });
      } else {
        row.toggleDetails();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
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
  & .search__btn {
    cursor: pointer;
    margin-bottom: 30px;
    text-transform: uppercase;
    font-weight: bold;

    & .search_icon {
      color: #32aaa7;
    }
  }
  & .organization__modal {
    //   position: absolute;
    width: 100%;
    bottom: 0;

    & .edit {
      input {
        width: 100%;
        border: 0;
        border-bottom: 1px solid #dee2f3;
        padding-bottom: 10px;
        outline: none;
        margin-bottom: 20px;
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
