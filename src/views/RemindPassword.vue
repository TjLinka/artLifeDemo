<template>
  <div class="container">
    <h2 class="page__title">
      Восстановить пароль
    </h2>
    <div class="row mt-4">
      <div class="col-md-3 custom_input">
        <input type="text" name="email" id="email" required v-model="email" />
        <label for="email">Email</label>
        <span class="clear_icon" @click="clearInput()"></span>
      </div>
    </div>
    <div class="row mt-4">
      <div class="col-md-6 ">
          <button class="rempass">Восстановить пароль</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RemindPassword',
  data() {
    return {
      email: '',
    };
  },
  methods: {
    clearInput() {
      this.email = '';
    },
  },
};
</script>

<style lang="scss" scoped>
.rempass{
    color: #32AAA7;
    padding: 2px 50px;
    background-color: white;
    border: 1px solid #32AAA7;
    &:hover{
        color: #FFF;
        background: #32AAA7;
        // padding: 8px 50px;
    }
}
</style>
