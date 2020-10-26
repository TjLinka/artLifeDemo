<template>
  <div class="licevoischet__page">
    <div class="container">
      <h2 class="page__title">Трансферт</h2>
      <h3>Текущее состояние</h3>
      <div class="row">
        <div class="col">
          <p>ЛО:</p>
          <p>{{ transfertInfo.lo }}</p>
        </div>
        <div class="col">
          <p>Резерв:</p>
          <p>{{ transfertInfo.reserve }}</p>
        </div>
      </div>
      <h3>Перевод количества баллов</h3>
      <div class="row edit">
        <div class="col-sm-6">
          <input type="text" name="" id="number" placeholder="Номер" v-model="sum" />
        </div>
      </div>
      <div class="row edit mt-3">
        <div class="col-sm-6 d-flex justify-content-between">
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
      console.log(Response.data);
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
          .catch((error) => {
            console.log(error);
            this.$bvToast.show('my-toast');
          });
        backApi.get('/agent/profile').then((Response) => {
          console.log(Response.data);
          this.transfertInfo = Response.data;
        });
      }
      console.log('l2r');
    },
    async reserve2lo() {
      if (this.sum !== null && this.sum !== '') {
        await backApi
          .post('agent/transfert', {
            sum: this.sum,
            direction: 'reserve2lo',
          })
          .catch((error) => {
            console.log(error);
            this.$bvToast.show('my-toast');
          });
        backApi.get('/agent/profile').then((Response) => {
          console.log(Response.data);
          this.transfertInfo = Response.data;
        });
      }
      console.log('r2l');
    },
  },
};
</script>
<style lang="scss" scoped>
.licevoischet__page {
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
    width: 49%;
    padding: 2px 0px;
    background: white;
    color: #32aaa7;
    border: 1px solid #32aaa7;
    border-radius: 2px;
  }
}
</style>
<style></style>
