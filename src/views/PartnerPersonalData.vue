<template>
  <div>
    <h4 class="mt-4 mb-4">
      Данные партнёра
      <span class="colapse_btn" @click="isMainInfoShow = !isMainInfoShow">
        {{ isMainInfoShow ? 'Скрыть' : 'Развернуть' }}</span
      >
    </h4>
    <!-- Данные партнёра -->
    <div v-show="isMainInfoShow">
      <div class="row mt-4">
        <div class="col">
          <g-caption title="ID Партнёра" :text="'1010101'" />
        </div>
        <div class="col">
          <g-caption title="ФИО" text="Иванов Иван Иванович" />
        </div>
      </div>
      <div class="row mt-4">
        <div class="col">
          <g-caption title="Пол" text="Муж." />
        </div>
        <div class="col">
          <g-caption title="Дата рождения" text="10.10.1990" />
        </div>
      </div>
    </div>
    <!-- ДАННЫЕ СПОНСОРА -->
    <h4 class="mt-5 mb-4">
      Данные спонсора
      <span class="colapse_btn" @click="isSponsorInfoShow = !isSponsorInfoShow">
        {{ isSponsorInfoShow ? 'Скрыть' : 'Развернуть' }}</span
      >
    </h4>
    <div v-show="isSponsorInfoShow">
      <div class="row mt-4">
        <div class="col">
          <g-caption title="ID Партнёра" text="12345" />
        </div>
        <div class="col">
          <g-caption title="ФИО" text="Иванов Иван Иванович" />
        </div>
      </div>
      <div class="row mt-4">
        <div class="col">
          <g-caption title="Пол" text="Муж." />
        </div>
        <div class="col">
          <g-caption title="Дата рождения" :text="new Date().toLocaleDateString()" />
        </div>
      </div>
    </div>
    <!-- Модальные окна -->
    <!-- Редактирование страны -->
    <g-modal-edit-country
      noCloseByClick
      v-if="isCountryEdit"
      @edit="editCountryAction"
      @close="isCountryEdit = false"
      :size="'sm'"
    />
    <!-- Редактирование города -->
    <g-modal-edit-city
      v-if="isCityEdit"
      @edit="editCityAction"
      @close="isCityEdit = false"
      :size="'md'"
    />
    <g-modal-edit-email
      v-if="isEmailEdit"
      @edit="editEmailAction"
      @close="isEmailEdit = false"
      :size="'md'"
    />
    <g-modal-edit-passport
      v-if="isPassportEdit"
      @edit="editPassportAction"
      @close="isPassportEdit = false"
      :size="'md'"
    />
    <g-modal-edit-phone
      v-if="isPhoneEdit"
      @edit="editPhoneAction"
      @close="isPhoneEdit = false"
      :size="'md'"
    />
  </div>
</template>

<script>
import GCaption from '../components/Text/GCaption.vue';
import GNotification from '../mixins/Gnotifacation';

export default {
  components: {
    GCaption,
    GModalEditCountry: () => ({
      component: import(/* webpackChunkName: "AsyncCountry" */ '../components/Modals/GModalEditCountry.vue'),
    }),
    GModalEditCity: () => ({
      component: import(/* webpackChunkName: "AsyncCity" */ '../components/Modals/GModalEditCity.vue'),
    }),
    GModalEditEmail: () => ({
      component: import(/* webpackChunkName: "AsyncEmail" */ '../components/Modals/GModalEditEmail.vue'),
    }),
    GModalEditPassport: () => ({
      component: import(/* webpackChunkName: "AsyncEmail" */ '../components/Modals/GModalEditPassport.vue'),
    }),
    GModalEditPhone: () => ({
      component: import(/* webpackChunkName: "AsyncEmail" */ '../components/Modals/GModalEditPhone.vue'),
    }),
  },
  mixins: [GNotification],
  name: 'PartnerPersonalData',
  data() {
    return {
      isMainInfoShow: true,
      isExtraInfoShow: true,
      isSponsorInfoShow: false,
      isCountryEdit: false,
      isCityEdit: false,
      isEmailEdit: false,
      isPassportEdit: false,
      isPhoneEdit: false,
    };
  },
  methods: {
    editCity() {
      this.isCityEdit = true;
    },
    editEmail() {
      this.isEmailEdit = true;
    },
    editCountry() {
      this.isCountryEdit = true;
    },
    editPassport() {
      this.isPassportEdit = true;
    },
    editPhone() {
      this.isPhoneEdit = true;
    },
    editCountryAction() {
      this.isCountryEdit = false;
      this.showToast('Редактирование страны', 'Страна успешно изменена', 'success');
    },
    editCityAction() {
      this.isCityEdit = false;
      this.showToast('Редактирование города', 'Город успешно изменен', 'success');
    },
    editEmailAction() {
      this.isEmailEdit = false;
      this.showToast('Редактирование E-mail', 'E-mail успешно изменён', '');
    },
    editPassportAction() {
      this.isPassportEdit = false;
      this.showToast('Редактирование паспорта', 'Паспортные данные успешно изменены', '');
    },
    editPhoneAction() {
      this.isPhoneEdit = false;
      this.showToast('Редактирование телефона', 'Телефон успешно изменён', '');
    },
    saveCountry() {
      this.inAction = true;
      setTimeout(() => {
        this.inAction = false;
        this.isCountryEdit = false;
      }, 2000);
    },
  },
};
</script>

<style lang="scss" scoped>
.colapse_btn {
  color: var(--main-green);
  font-size: 18px;
  cursor: pointer;
  margin-left: 20px;
}
.edit_btn {
  color: var(--main-green);
  cursor: pointer;
}
</style>
