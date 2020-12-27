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
          <button class="rempass" @click="remindPass">Восстановить пароль</button>
      </div>
    </div>
  </div>
</template>

<script>
import backApi from '../assets/backApi';

export default {
  name: 'RemindPassword',
  data() {
    return {
      email: '',
    };
  },
  methods: {
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
        autoHideDelay: 1000,
        variant: status,
      });
    },
    remindPass() {
      if (this.email !== '') {
        const data = {
          params: {
            email: this.email,
          },
        };
        backApi.get('/remind-password', data).then(() => {
          this.showToast('Восстановление пароля', 'На вашу почту пришло письмо!', 'success');
          setTimeout(() => { this.$router.push('/login'); }, 1500);
        }).catch(() => {
          this.showToast('Восстановление пароля', 'Почта указана не верно', 'danger');
        });
      }
    },
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
