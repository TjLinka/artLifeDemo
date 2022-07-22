<template>
  <div class="container">
    <div class="row">
      <div class="col-1">
        <strong>Диалог</strong> # 1
      </div>
      <div class="col-1">
        <strong>Адресат</strong>: Петя
      </div>
      <div class="col-1">
        <strong>Тема</strong>: Бонусы
      </div>
    </div>
    <!-- СПИСОК СООБЩЕНИЙ -->
    <DialogMessage />
    <DialogMessage />
    <DialogMessage />
    <!-- НОВОЕ СООБЩЕНИЕ -->
    <p><strong>Новое сообщение</strong></p>
    <div class="row mt-3">
      <div class="col">
        <textarea
          class="new_message"
          name=""
          id=""
          cols="30"
          rows="10"
          style="width: 100%;"
          placeholder="Тест сообщения"
        ></textarea>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col">
        <g-button :width="'50%'">Прикрепить документ</g-button>
      </div>
      <div class="col">
        <g-button :width="'50%'" :primary="true" :right="true">Отправить</g-button>
      </div>
    </div>
  </div>
</template>

<script>
import GButton from '../components/Forms/GButton.vue';
import DialogMessage from '../components/Dialogs/DialogMessage.vue';

export default {
  components: {
    GButton,
    DialogMessage,
  },
  name: 'Dialog',
};
</script>

<style lang="scss" scoped>
.new_message{
    resize: none;
    padding: 10px;
    border: 1px solid lightgray;
}
</style>
