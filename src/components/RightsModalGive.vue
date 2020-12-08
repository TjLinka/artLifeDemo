<template>
  <div class="licevoischet__page">
    <div class="container">
      <h4 class="mt-4">Забрать права
        <span v-on:click="$emit('enlarge-text')"
        style="display: inline-block; float: right; color: #32aaa7; cursor: pointer">X</span>
      </h4>
      <div class="row transfert mt-5">
        <div class="col-md-6">
            <input type="text" name="userId" id="userId" required v-model="userId" />
            <label for="userId">Номер:</label>
            <span class="clear_icon" @click="clearID('userId')">X</span>
        </div>
        <div class="col-md-6">
            <input type="text" name="userFio" id="userFio" required v-model="userFio" />
            <label for="userFio">Фамилия:</label>
            <span class="clear_icon" @click="clearFio('userFio')">X</span>
        </div>
      </div>
      <div class="row edit mt-5">
        <div class="col-md-6">
        </div>
        <div class="col-md-6 trans_btns">
          <button @click="lo2reserve">Забрать права</button>
          <button @click="reserve2lo">Сбросить</button>
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
  name: 'RightsModalGive',
  data() {
    return {
      userId: null,
      userFio: null,
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
    clearID() {
      this.userId = null;
    },
    clearFio() {
      this.userFio = null;
    },
    back() {
      this.$router.go(-1);
    },
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
      font-weight: 500;
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
    font-weight: 500;
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
.col-md-6,
.col-md {
  position: relative;
  span {
    display: none;
    position: absolute;
    right: 18px;
    top: 10px;
    color: #32aaa7;
    cursor: pointer;
  }
  label {
    position: absolute;
    top: 5px;
    left: 20px;
    transition: 0.15s ease-in-out;
    color: #9a9a9a;
    font-size: 14px;
    z-index: 10;
  }
  input {
    width: 100%;
    border: 0;
    height: 35px;
    border-radius: 0;
    border-bottom: 1px solid #dee2f3;
    outline: none;
    padding-left: 5px;
    font-size: 14px;
    &:focus ~ label,
    &:valid ~ label {
      font-size: 12px;
      top: -10px;
    }
    &:valid ~ span {
      display: block;
    }
  }
}
</style>
<style>

</style>
