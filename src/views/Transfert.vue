<template>
  <div class="licevoischet__page">
    <div class="container">
      <h2 class="page__title">
                              <p class="mobile_back">
        <svg width="18" height="12" viewBox="0 0 18 12" fill="none" style="margin-right: 30px;" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 5H3.83L7.41 1.41L6 0L0 6L6 12L7.41 10.59L3.83 7H18V5Z" fill="#32AAA7"/>
        </svg>
      </p>
        Трансферт
        </h2>
      <h4 class="mt-4">Текущее состояние</h4>
      <div class="row transfert">
        <div class="col-md-6">
          <p>ЛО:</p>
          <p>{{ transfertInfo.lo }} баллов</p>
        </div>
        <div class="col-md-6 mt-4">
          <p>Резерв:</p>
          <p>{{ transfertInfo.reserve }} баллов</p>
        </div>
      </div>
      <h3 class="perevod">Перевод количества баллов</h3>
      <div class="row edit">
        <div class="col-md-6 mt-4">
          <el-input placeholder="Сумма" type="number" v-model="sum" clearable class="count">
          </el-input>
        </div>
      </div>
      <div class="row edit mt-4">
        <div class="col-md-6 trans_btns">
          <button @click="lo2reserve">Перевести в резерв</button>
          <button @click="reserve2lo">Перевести в трансферт</button>
        </div>
      </div>
    </div>
    <b-toast id="my-toast" variant="warning" solid>
      <template #toast-title>
        <div class="d-flex flex-grow-1 align-items-baseline">
          <b-img blank blank-color="#ff5555" class="mr-2" width="12" height="12"></b-img>
          <strong class="mr-auto">Ошибка!</strong>
          <!-- <small class="text-muted mr-2">42 seconds ago</small> -->
        </div>
      </template>
      Данные указаны не верно
    </b-toast>
  </div>
</template>

<script>
import backApi from '../assets/backApi';

export default {
  name: 'Transfert',
  data() {
    return {
      transfertInfo: {},
      sum: null,
      toastCount: 0,
    };
  },
  mounted() {
    backApi.get('/agent/profile').then((Response) => {
      this.transfertInfo = Response.data;
    });
  },
  methods: {
    makeToast(append = false) {
      // eslint-disable-next-line no-plusplus
      this.toastCount++;
      this.$bvToast.toast(`This is toast number ${this.toastCount}`, {
        title: 'BootstrapVue Toast',
        autoHideDelay: 5000,
        appendToast: append,
      });
    },
    async lo2reserve() {
      if (this.sum !== null && this.sum !== '') {
        await backApi
          .post('agent/transfert', {
            sum: this.sum,
            direction: 'lo2reserve',
          })
          .catch(() => {
            this.$bvToast.show('my-toast');
          });
        backApi.get('/agent/profile').then((Response) => {
          this.transfertInfo = Response.data;
        });
      }
    },
    async reserve2lo() {
      if (this.sum !== null && this.sum !== '') {
        await backApi
          .post('agent/transfert', {
            sum: this.sum,
            direction: 'reserve2lo',
          })
          .catch(() => {
            this.$bvToast.show('my-toast');
          });
        backApi.get('/agent/profile').then((Response) => {
          this.transfertInfo = Response.data;
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.transfert {
  margin-bottom: 30px;
  margin-top: 30px;
  & p {
    padding: 0;
    margin: 0;
  }
  & > .col-md-6 {
    p:nth-of-type(1) {
      color: #9a9a9a;
    }
    p:nth-of-type(2) {
      font-weight: bold;
    }
  }
}
.edit {
  & input {
    width: 100%;
    border: 0;
    border-bottom: 1px solid #dee2f3;
    padding-bottom: 10px;
    outline: none;
  }

  & button {
    width: 48%;
    padding: 8px 0px;
    background: white;
    color: #32aaa7;
    border: 1px solid #32aaa7;
    border-radius: 2px;
    font-weight: bold;
  }
}
.trans_btns {
  display: flex;
  justify-content: space-between;
}
@media (max-width: 425px) {
  .perevod {
    font-size: 18px;
    text-transform: uppercase;
  }
  .trans_btns {
    flex-direction: column;
    button {
      width: 100%;
      margin-bottom: 20px;
    }
  }
}
</style>
<style>

</style>
