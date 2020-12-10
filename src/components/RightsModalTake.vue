<template>
  <div class="licevoischet__page">
    <div class="container">
      <h4 class="mt-4 modal_title">Передача прав
        <span v-on:click="$emit('enlarge-text')"
        style="display: inline-block; float: right; color: #32aaa7; cursor: pointer">X</span>
      </h4>
      <div class="row transfert mt-5 edit">
        <div class="col-md-6">
          <el-autocomplete
            v-model="state"
            :fetch-suggestions="querySearchAsync"
            placeholder="Партнер получатель"
            @select="handleSelect"
            style="width: 100%"
          ></el-autocomplete>
        </div>
        <div class="col-md-6 trans_btns">
          <button @click="giveRights">Передать права</button>
          <button @click="resetData">Сбросить</button>
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
  name: 'RightsModalTake',
  data() {
    return {
      state: '',
      selectedUser: null,
    };
  },
  mounted() {
    backApi.get('/agent/profile').then((Response) => {
      this.transfertInfo = Response.data;
    });
  },
  methods: {
    querySearchAsync(queryString, cb) {
      const qr = queryString === '' ? 'а' : queryString;
      backApi.get('/agent/agent-list', { params: { q: qr } }).then((Response) => {
        Response.data.entries.forEach((u) => {
          // eslint-disable-next-line no-param-reassign
          u.value = `${u.agent_id}-${u.name}`;
        });
        cb(Response.data.entries.slice(0, 10));
      });
    },
    handleSelect(item) {
      this.selectedUser = item.agent_id;
    },
    resetData() {
      this.selectedUser = null;
      this.$emit('enlarge-text');
    },
    giveRights() {
      backApi.post('/agent/share-transfert', { agent_to: this.selectedUser });
      this.$emit('enlarge-text');
      this.$emit('toast');
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
div[role='combobox']{
  width: 100%;
}
</style>
