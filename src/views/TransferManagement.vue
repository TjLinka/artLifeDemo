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
        Управление трансфертами структуры
      </h2>
      <div class="row">
        <div class="col">
          Теги
        </div>
      </div>
      <h2>История организации</h2>
      <div class="row">
        <div class="col">
          <button>Трансферт</button>
          <span>Печать</span><span>Экспорт в xls</span><span>Экспорт в pdf</span>
        </div>
      </div>
      <div class="transmaneg_table">
        <b-table outlined responsive head-variant="light"
        :fields="fields" :items="entries" class="mt-5">
          <template v-slot:cell(id)="row">
            <p>
              <span class="mr-4">{{ row.item.level }} УР</span>
              <img :src="`../icons/${row.item.rank}.svg`" alt="" class="rank_icon" />
              <span style="display: inline-block; float:right">{{ row.item.id }}</span>
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
      <div v-if="searchActive" class="organization__modal">
        <span @click="searchActive = !searchActive" class="close_btn">X</span>
        <h3 class="mt-4">Настройка автоматической подачи баллов в трансферт</h3>
        <div class="row">
          <div class="col-md-6">
            <input type="text" name="userFio" id="userFio" required/>
            <label for="userFio">Номер:</label>
            <span class="clear_icon" @click="clearFio('userFio')">X</span>
          </div>
          <div class="col-md-6">
            <input type="text" name="userFio" id="userFio" required/>
            <label for="userFio">Фамилия:</label>
            <span class="clear_icon" @click="clearFio('userFio')">X</span>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <input type="text" name="userFio" id="userFio" required/>
            <label for="userFio">Номер:</label>
            <span class="clear_icon" @click="clearFio('userFio')">X</span>
          </div>
          <div class="col-md-6">
            <input type="text" name="userFio" id="userFio" required/>
            <label for="userFio">Фамилия:</label>
            <span class="clear_icon" @click="clearFio('userFio')">X</span>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <input type="text" name="userFio" id="userFio" required/>
            <label for="userFio">Номер:</label>
            <span class="clear_icon" @click="clearFio('userFio')">X</span>
          </div>
          <div class="col-md-6">
            <input type="text" name="userFio" id="userFio" required/>
            <label for="userFio">Фамилия:</label>
            <span class="clear_icon" @click="clearFio('userFio')">X</span>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <input type="text" name="userFio" id="userFio" required/>
            <label for="userFio">Номер:</label>
            <span class="clear_icon" @click="clearFio('userFio')">X</span>
          </div>
          <div class="col-md-6">
            <input type="text" name="userFio" id="userFio" required/>
            <label for="userFio">Фамилия:</label>
            <span class="clear_icon" @click="clearFio('userFio')">X</span>
          </div>
        </div>
        <div class="row edit mt-4">
          <div class="col-sm-12">
            <!-- <button class="mr-2 update" @click="updateData">Применить</button> -->
          </div>
        </div>
      </div>
      </footer>
  </div>
</template>

<script>
// import backApi from '../assets/backApi';

export default {
  name: 'TransferManagement',
  data() {
    return {
      searchActive: false,
      entries: [
        {
          id: 12345,
          fio: 'Александр Христорождественский Христорождественский',
          noact: '1/2/3',
          lo: 444,
          go: 111,
          ngo: 222,
          oo: 333,
          ko: 91,
          rank_beg: 'Кол',
          rank_calc: 'Рок',
          reserve: 15554,
          level: 4,
          rank: 'Директор',
        },
      ],
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
  mounted() {},
  methods: {
    back() {
      this.$router.go(-1);
    },
  },
};
</script>
<style lang="scss" scoped>
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
.close_btn {
    position: absolute;
    right: 0;
    top: 0px;
    font-size: 25px;
    font-weight: 500;
    color: #32aaa7;
    cursor: pointer;
  }
.search__btn {
    padding-top: 20px;
    cursor: pointer;
    margin-bottom: 30px;
    text-transform: uppercase;
    font-weight: 500;

    & .search_icon {
      color: #32aaa7;
    }
  }
</style>
<style>
.transmaneg_table th[aria-colindex='1']{
    width: 50%;
}
</style>
