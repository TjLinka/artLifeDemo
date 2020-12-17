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
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M18 5H3.83L7.41 1.41L6 0L0 6L6 12L7.41 10.59L3.83 7H18V5Z" fill="#32AAA7" />
          </svg>
        </p>
        Управление трансфертами структуры
      </h2>
      <div class="row">
        <div class="col">
          Теги
        </div>
      </div>
      <h2>История организации</h2>
      <div class="row">
        <div class="col-md-6 mt-4">
          <button class="update">Трансферт</button>
          <p class="exp_print">
            <!-- <span class="mr-3">Печать</span> -->
            <span class="mr-3">Экспорт в xls</span>
            <span class="mr-3">Экспорт в pdf</span>
          </p>
        </div>
      </div>
      <div class="transmaneg_table">
        <b-table outlined responsive head-variant="light"
        :fields="fields" :items="entries" class="mt-5">
          <template v-slot:cell(id)="row">
            <p>
              <span class="mr-4">{{ row.item.lvl }} УР</span>
              <img :src="`../icons/${row.item.rank_end}.svg`"
              :title="row.item.rank_end" class="rank_icon" />
              <span style="display: inline-block; float:right">{{ row.item.id }}</span><br>
              <span
              style="display: inline-block; float:right; text-align: right; margin-top: 10px">
              {{row.item.name}}</span>
            </p>
            <p style="text-align: right">{{ row.item.fio }}</p>
          </template>
        </b-table>
      </div>
    </div>
      <footer class="container-fluid cust_modal">
      <div class="row desk_trans">
        <div class="col text-center search__btn"
        @click="searchActive = !searchActive" v-if="!searchActive">
          Настройки трансфера <i class="el-icon-s-tools search_icon"></i>
        </div>
      </div>
      <div v-if="searchActive" class="organization__modal container">
        <span @click="searchActive = !searchActive" class="close_btn"></span>
        <h3 class="mt-4">Поиск партнёра</h3>
        <div class="row mt-5">
          <div class="col-md-6">
            <b-form-group label="" class="flex-radio">
              <b-form-radio
                v-model="filterData.points_type"
                name="some-radios-1"
                value="0"
                class="radio mr-3"
                >Резерв</b-form-radio
              >
              <b-form-radio
                v-model="filterData.points_type"
                name="some-radios-1"
                value="1"
                class="radio mr-3"
                >ЛО</b-form-radio
              >
              <b-form-radio
                v-model="filterData.points_type"
                name="some-radios-1"
                :value="null"
                class="radio"
                >Все</b-form-radio
              >
            </b-form-group>
          </div>
          <div class="col-md-6">
            <b-form-checkbox
              id="checkbox-1"
              v-model="filterData.status"
              name="checkbox-1"
              value="accepted"
              unchecked-value="not_accepted"
            >
              Показывать терминированных
            </b-form-checkbox>
          </div>
        </div>
        <div class="row mt-5">
          <div class="col-md-6 custom_input">
            <input type="text" name="userId" id="userId" required v-model="filterData.agent_id"/>
            <label for="userId">Номер:</label>
            <span class="clear_icon" @click="clearFio('userId')"></span>
          </div>
          <div class="col-md-6 custom_input">
            <input type="text" name="userFio" id="userFio" required v-model="filterData.name"/>
            <label for="userFio">ФИО:</label>
            <span class="clear_icon" @click="clearFio('userFio')"></span>
          </div>
        </div>
        <div class="row mt-5">
          <div class="col-md-6">
            <el-select v-model="filterData.area" placeholder="Территория">
              <el-option
                v-for="item in areaList"
                :key="item.area_id"
                :label="item.area_name"
                :value="item.area_id">
              </el-option>
            </el-select>
          </div>
          <div class="col-md-6 custom_input">
            <input type="text" name="userStore" id="userStore" required v-model="filterData.store"/>
            <label for="userStore">Город склада обслуживания:</label>
            <span class="clear_icon" @click="clearFio('userStore')"></span>
          </div>
        </div>
        <div class="row mt-5">
          <div class="col-md-6">
            <el-select v-model="filterData.rank_beg" placeholder="Ранг на начало">
              <el-option
                v-for="item in rankList"
                :key="item.rankname"
                :label="item.rankname"
                :value="item">
              </el-option>
            </el-select>
          </div>
          <div class="col-md-6">
            <el-select v-model="filterData.rank_end" placeholder="Ранг на конец">
              <el-option
                v-for="item in rankList"
                :key="item.rankname"
                :label="item.rankname"
                :value="item">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="row mt-5">
          <div class="col-md-6">
            <el-select v-model="filterData.rank_calc" placeholder="Расчётный ранг">
              <el-option
                v-for="item in rankList"
                :key="item.rankname"
                :label="item.rankname"
                :value="item">
              </el-option>
            </el-select>
          </div>
          <div class="col-md-6 custom_input">
            <button class="mr-2 update">Применить</button>
          </div>
        </div>
      </div>
      </footer>
  </div>
</template>

<script>
import backApi from '../assets/backApi';

export default {
  name: 'TransferManagement',
  data() {
    return {
      searchActive: false,
      filterData: {},
      rankList: [],
      areaList: [],
      entries: [],
      fields: [
        {
          key: 'id',
          label: 'P/номер / Ранг / ФИО',
          formater: (item) => `УР ${item.depth}<br>${item.rank_beg}<br>${item.id}<br>${item.name}`,
        },
        {
          key: 'noact',
          label: 'не активность',
          formater: (item) => item.noact,
        },
        {
          key: 'lo',
          label: 'ЛО',
          formater: (item) => item.lo,
        },
        {
          key: 'go',
          label: 'ГО',
          formater: (item) => item.go,
        },
        {
          key: 'ngo',
          label: 'НГО',
          formater: (item) => item.ngo,
        },
        {
          key: 'oo',
          label: 'ОО',
          formater: (item) => item.oo,
        },
        {
          key: 'ko',
          label: 'КО',
          formater: (item) => item.ko,
        },
        {
          key: 'rank_beg',
          label: 'ранг на начало',
          formater: (item) => item.rank_beg,
        },
        {
          key: 'rank_calc',
          label: 'расчетный ранг',
          formater: (item) => item.rank_calc,
        },
        {
          key: 'reserve',
          label: 'балы в резерве',
          formater: (item) => item.reserve,
        },
      ],
    };
  },
  mounted() {
    backApi.get('/agent/rank-list').then((Response) => {
      console.log(Response.data);
      this.rankList = Response.data.entries;
    });
    backApi.get('/agent/area-list').then((Response) => {
      console.log(Response.data);
      this.areaList = Response.data.entries;
    });
    backApi.get('/agent/flat_genealogy', {
      params: {
        comdte: '2020-03-01',
      },
    }).then((Response) => {
      console.log(Response.data);
      this.entries = Response.data.entries;
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
.el-select{
  width: 100%;
  top: -5.5px;
}
.exp_print {
    display: inline;
    span {
      color: #32aaa7;
      cursor: pointer;
    }
}
.update{
  display: block;
  float: right;
  width: 100%;
  border: 0;
  padding: 5px 30px;
  font-size: 16px;
  margin-bottom: 20px;
  background-color: #32aaa7;
  color: white;
  &:nth-of-type(1){
    width: 40%;
    float: none;
    display: inline;
    margin-right: 10px;
  }
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
.organization__modal {
    position: relative;
    // padding: 60px;
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
.close_btn {
    position: absolute;
    right: 0;
    top: 0px;
    font-size: 25px;
    font-weight: 500;
    color: #32aaa7;
    cursor: pointer;
}
@media (min-width: 770px) {
  .radio{
    display: inline;
  }
}
</style>
<style>
.transmaneg_table th[aria-colindex='1']{
    width: 15%;
}
</style>
