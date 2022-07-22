<template>
  <div class="container">
    <!-- КНОПКИ -->
    <div class="row mb-3">
      <div class="col">
        <g-button :primary="true" :width="'50%'" @click="isDialogCreate = !isDialogCreate">Создать диалог</g-button>
      </div>
      <div class="col">
        <g-grouped-button v-if="selectedDialog">
          <g-button @click="$router.push(`/dialog/${selectedDialog.id}`)"
            >Просмотр диалога</g-button
          >
          <g-button>Закрыть диалог</g-button>
        </g-grouped-button>
      </div>
    </div>
    <!-- ФИЛЬТРЫ ТАБЛИЦЫ -->
    <g-radio
      label="Статус диалога"
      :id="'dialog_status'"
      :radios="dialog_status_radios"
      v-model="dialog_status"
    />
    <!-- ТАБЛИЦА ДИАЛОГОВ -->
    <b-table
      select-mode="single"
      selectable
      @row-selected="onRowSelected"
      bordered
      responsive
      head-variant="light"
      :fields="tableFields"
      :items="demoDialogsData"
    >
      <template v-slot:cell(theme)="scope">
        <router-link :to="`/dialog/${scope.item.id}`">
          <span style="text-decoration: underline; color: black;">{{ scope.item.theme }}</span>
        </router-link>
      </template>
    </b-table>
    <g-modal-create-dialog
    v-if="isDialogCreate"
    @close="isDialogCreate = false"
    />
  </div>
</template>

<script>
import GButton from '../components/Forms/GButton.vue';
import GRadio from '../components/Forms/GRadio.vue';
import GGroupedButton from '../components/Forms/GGroupedButton.vue';
import GModalCreateDialog from '../components/Modals/GModalCreateDialog.vue';

export default {
  components: {
    GButton,
    GGroupedButton,
    GRadio,
    GModalCreateDialog,
  },
  name: 'Dialogs',
  data() {
    return {
      selectedDialog: null,
      dialog_status: 1,
      isDialogCreate: false,
      dialog_status_radios: [
        {
          key: 1,
          label: 'Открытые',
          value: 1,
        },
        {
          key: 2,
          label: 'Закрытые',
          value: 2,
        },
        {
          key: 3,
          label: 'Все',
          value: 0,
        },
      ],
      tableFields: [
        {
          key: 'id',
          label: 'ID диалога',
        },
        {
          key: 'recipient',
          label: 'Адресат',
        },
        {
          key: 'theme',
          label: 'Тема сообщения',
        },
        {
          key: 'last_message',
          label: 'последнее сообщение',
        },
        {
          key: 'status',
          label: 'Статус',
        },
      ],
      demoDialogsData: [
        {
          id: 1,
          recipient: 'Петя',
          theme: 'Начисление бонусов',
          last_message: new Date().toLocaleDateString(),
          status: 'Ожидает вашего ответа',
        },
        {
          id: 2,
          recipient: 'Вася',
          theme: 'Цена на товар',
          last_message: new Date().toLocaleDateString(),
          status: 'Ожидает ответа партнёра',
        },
        {
          id: 3,
          recipient: 'Иван',
          theme: 'Повышение ранга',
          last_message: new Date().toLocaleDateString(),
          status: 'Диалог закрыт',
        },
      ],
    };
  },
  methods: {
    onRowSelected(rows) {
      // eslint-disable-next-line prefer-destructuring
      this.selectedDialog = rows[0];
    },
  },
};
</script>

<style></style>
