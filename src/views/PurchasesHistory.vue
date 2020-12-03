<template>
  <div class="licevoischet__page">
    <div class="container-fluid table_container">
      <h2 class="page__title">
        <p class="mobile_back" @click="back">
          <svg
            width="18"
            height="12"
            viewBox="0 0 18 12"
            fill="none"
            style="margin-right: 30px;"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M18 5H3.83L7.41 1.41L6 0L0 6L6 12L7.41 10.59L3.83 7H18V5Z" fill="#32AAA7" />
          </svg>
        </p>
        История покупок
      </h2>
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
      <div class="perchases_table">
        <b-table :fields="fields" :items="entries" head-variant="light" responsive outlined>
          <template v-slot:cell(nomer)="row">
            <b-button size="sm" @click="show_details(row)" class="mr-2">
              {{ row.detailsShowing ? '-' : '+' }}
            </b-button>
            <span>{{ row.item.webshop_id }}</span>
          </template>
          <template v-slot:row-details="row">
            <div class="sub_table">
              <b-table
                :fields="returnFields"
                :items="return_details[row.item.webshop_id]"
                head-variant="light"
              >
              </b-table>
            </div>
          </template>
        </b-table>
      </div>
      <footer class="container-fluid cust_modal">
        <div class="row">
          <div class="col text-center search__btn" @click="toggleSearch" v-if="!searchActive">
            Фильтр <i class="el-icon-search search_icon"></i>
          </div>
        </div>
        <div v-if="searchActive" class="organization__modal">
          <h3>Фильтр</h3>
          <BasePeriodPicker :currentPeriod="currentPeriod" v-on:next-period="nextPeriod" />
          <div class="row edit">
            <div class="col-sm-6">
              <el-input
                type="number"
                name=""
                id="art"
                placeholder="Артикул"
                clearable
                v-model="articul"
              />
            </div>
            <div class="col-sm-6">
              <el-input
                type="text"
                name=""
                id="name"
                placeholder="Наименование"
                clearable
                v-model="name"
              />
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
      </footer>
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
      months: [
        'Январь',
        'Ферваль',
        'Март',
        'Апрель',
        'Май',
        'Июнь',
        'Июль',
        'Августь',
        'Сентябрь',
        'Октябрь',
        'Ноябрь',
        'Декабрь',
      ],
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
          fomratter(v) {
            if (v !== null) {
              return v.toFixed(2);
            }
            return null;
          },
        },
        {
          key: 'price',
          label: 'Цена',
          fomratter(v) {
            if (v !== null) {
              return v.toFixed(2);
            }
            return null;
          },
        },
        {
          key: 'cnt',
          label: 'Кол-во',
          fomratter(v) {
            if (v !== null) {
              return v.toFixed(2);
            }
            return null;
          },
        },
        {
          key: 'points_all',
          label: 'Сумма балов',
          fomratter(v) {
            if (v !== null) {
              return v.toFixed(2);
            }
            return null;
          },
        },
        {
          key: 'price_total',
          label: 'Стоимость',
          fomratter(v) {
            if (v !== null) {
              return v.toFixed(2);
            }
            return null;
          },
        },
      ],
      fields: [
        {
          key: 'nomer',
          label: 'Номер документа',
          sortable: true,
        },
        // {
        //   key: 'webshop_id',
        //   label: 'Номер соглашения',
        //   sortable: true,
        // },
        {
          key: 'amount',
          label: 'Сумма',
          sortable: true,
          fomratter(v) {
            if (v !== null) {
              return v.toFixed(2);
            }
            return null;
          },
        },
        {
          key: 'dte',
          label: 'Дата',
          sortable: true,
          formatter(v) {
            return new Date(v).toLocaleDateString();
          },
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
    back() {
      this.$router.go(-1);
    },
    nextPeriod(x) {
      this.period_enabled = true;
      this.periodIndex = (this.periodIndex + this.periods.length + x) % this.periods.length;
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
        tag.name = `${this.months[new Date(this.currentPeriod).getMonth()]} ${new Date(
          this.currentPeriod,
        ).getFullYear()}`;
      } else if (this.currentPeriod !== this.periods[this.periods.length - 1].comdte) {
        this.tags.push({
          name: `${this.months[new Date(this.currentPeriod).getMonth()]} ${new Date(
            this.currentPeriod,
          ).getFullYear()}`,
          key: 'period',
        });
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
      this.searchActive = !this.searchActive;
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
    padding-top: 20px;
    cursor: pointer;
    margin-bottom: 30px;
    text-transform: uppercase;
    font-weight: 500;

    & .search_icon {
      color: #32aaa7;
    }
  }
  & .organization__modal {
    //   position: absolute;
    padding: 60px;
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
.btn {
  border: 0 !important;
}
.btn-secondary {
  color: black;
  background: none;
  border: 0;
  outline: none !important;
  box-shadow: none;
  font-weight: 500;
  font-size: 18px;
}
.btn-secondary:not(:disabled):not(.disabled):active,
.btn-secondary:not(:disabled):not(.disabled).active,
.show > .btn-secondary.dropdown-toggle {
  background-color: unset;
  outline: none;
}
.btn-secondary:not(:disabled):not(.disabled):active:focus,
.btn-secondary:not(:disabled):not(.disabled).active:focus,
.show > .btn-secondary.dropdown-toggle:focus {
  box-shadow: none;
}
.cust_modal{
  position: fixed;
    bottom: 0;
    left: 0;
    z-index: 10;
    width: 100%;
    padding-left: 120px;
    box-sizing: border-box;
    background: #FFFFFF;
    box-shadow: 0px 4px 12px 2px rgba(0, 0, 0, 0.24);
}
</style>
<style>
table[aria-colcount='7'] > tbody > tr.b-table-has-details > td {
  background: #32aaa7;
  color: white !important;
  margin-bottom: 0;
}
.sub_table > table > tbody > tr > td {
  background: white !important;
  color: black !important;
}
.sub_table > table {
  margin-bottom: 0;
}
/* .refound_table table[aria-colcount="6"]{
  margin-bottom: 0;
}
.refound_table table[aria-colcount="6"] td{
  background-color: #D4D5D7;
}
.refound_table table[aria-colcount="6"] td[aria-colindex='1']{
  width: 20%;
}
.refound_table table[aria-colcount="2"] td[aria-colindex='1']{
  width: 20% !important;
}
.refound_table table[aria-colcount="2"] > thead > tr > th[role="columnheader"]:nth-of-type(1){
  width: 20% !important;
} */
.perchases_table table[aria-colcount='7'] tr[tabindex='-1'] > td {
  padding: 0;
  /* padding-top: 10px !important; */
}
</style>
