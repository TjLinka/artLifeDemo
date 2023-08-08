<template>
  <div>
    <h4 class="mt-4 mb-4">
      Основная информация
      <span class="colapse_btn" @click="isMainInfoShow = !isMainInfoShow">
        {{ isMainInfoShow ? 'Скрыть' : 'Развернуть' }}</span
      >
    </h4>
    <!-- ОСНОВНАЯ ИНФОРМАЦИЯ -->
    <div v-show="isMainInfoShow">
      <div class="row mt-4">
        <div class="col">
          <g-caption title="ID Партнёра" :text="agentInfo.id" />
        </div>
        <div class="col">
          <g-caption title="ФИО" :text="agentInfo.name" />
        </div>
      </div>
      <div class="row mt-4">
        <div class="col">
          <g-caption title="Пол" text="Муж." />
        </div>
        <div class="col">
          <g-caption
            title="Дата рождения"
            :text="new Date(agentInfo.birth_date).toLocaleDateString()"
          />
        </div>
      </div>
    </div>
    <!-- ДОПОЛНИТЕЛЬНАЯ ИНФОРМАЦИЯ -->
    <h4 class="mt-5 mb-4">
      Дополнительная информация
      <span class="colapse_btn" @click="isExtraInfoShow = !isExtraInfoShow">
        {{ isExtraInfoShow ? 'Скрыть' : 'Развернуть' }}</span
      >
    </h4>
    <div v-show="isExtraInfoShow">
      <div class="row">
        <div class="col">
          <g-caption
            title="Дата регистрации"
            :text="new Date(agentInfo.signup_date).toLocaleDateString()"
          />
        </div>
        <div class="col">
          <g-caption title="Страна" :text="agentInfo.country" />
          <span @click="editCountry" class="edit_btn">Редактировать</span>
        </div>
      </div>
      <div class="row mt-4">
        <div class="col">
          <g-caption title="Город" :text="agentInfo.city" />
          <span @click="editCity" class="edit_btn">Редактировать</span>
        </div>
        <div class="col">
          <g-caption title="Телефон" :text="agentInfo.mobile_phone" />
          <span @click="editPhone" class="edit_btn">Редактировать</span>
        </div>
      </div>
      <div class="row mt-4">
        <div class="col">
          <g-caption title="Электронная почта" :text="agentInfo.email" />
          <span @click="editEmail" class="edit_btn">Редактировать</span>
        </div>
        <div class="col">
          <g-caption title="Паспортные данные" text="11 11 111111" />
          <span @click="editPassport" class="edit_btn">Редактировать</span>
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
          <g-caption title="ID Партнёра" :text="sponsorInfo.id" />
        </div>
        <div class="col">
          <g-caption title="ФИО" :text="sponsorInfo.fullname" />
        </div>
      </div>
      <div class="row mt-4">
        <div class="col">
          <g-caption title="Пол" text="Муж." />
        </div>
        <div class="col">
          <g-caption
            title="Дата рождения"
            :text="new Date(sponsorInfo.bthdte).toLocaleDateString()"
          />
        </div>
      </div>
      <div class="row mt-4">
        <div class="col">
          <g-caption title="Телефон" :text="sponsorInfo.phone" />
        </div>
        <div class="col">
          <g-caption title="Электронная почта" :text="sponsorInfo.email" />
        </div>
      </div>
      <div class="row mt-4">
        <div class="col">
          <g-caption title="Страна" :text="sponsorInfo.country" />
        </div>
        <div class="col">
          <g-caption title="Город" :text="sponsorInfo.city" />
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
import GApi from '../assets/backApi';
import GCaption from '../components/Text/GCaption.vue';
import GNotification from '../mixins/Gnotifacation';

export default {
  components: {
    GCaption,
    // GModalEditCountry: () => ({
    //   component: import(
    //     /* webpackChunkName: "AsyncCountry" */ '../components/Modals/GModalEditCountry.vue'
    //   ),
    // }),
    GModalEditCity: () => ({
      component: import(
        /* webpackChunkName: "AsyncCity" */ '../components/Modals/GModalEditCity.vue'
      ),
    }),
    GModalEditEmail: () => ({
      component: import(
        /* webpackChunkName: "AsyncEmail" */ '../components/Modals/GModalEditEmail.vue'
      ),
    }),
    GModalEditPassport: () => ({
      component: import(
        /* webpackChunkName: "AsyncEmail" */ '../components/Modals/GModalEditPassport.vue'
      ),
    }),
    GModalEditPhone: () => ({
      component: import(
        /* webpackChunkName: "AsyncEmail" */ '../components/Modals/GModalEditPhone.vue'
      ),
    }),
  },
  mixins: [GNotification],
  name: 'PersonalData',
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
      agentInfo: {
        id: '',
        lastname: '',
        name: '',
        birth_date: '',
        signup_date: '',
        country: '',
        city: '',
        mobile_phone: '',
        email: '',
      },
      sponsorInfo: {
        id: '',
        fullname: '',
        bthdte: '',
        phone: '',
        email: '',
        city: '',
        country: '',
      },
    };
  },
  async mounted() {
    await this.getData();
  },
  methods: {
    async getData() {
      const response = await GApi.get('/api/Agent/get-agent-profile-info');
      const response2 = await GApi.get('/api/Agent/sponsor-get');
      this.agentInfo = response.data;
      this.sponsorInfo = response2.data;
    },
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
    async editCityAction(val) {
      this.agentInfo.city = val;
      this.isCityEdit = false;
      await this.editPartnerInfo();
      await this.getData();
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
    async editPartnerInfo() {
      GApi.post('/api/Agent/edit-agent-profile-info', {
        webpwd: '2',
        country: this.agentInfo.country,
        city: this.agentInfo.city,
        mobile_phone: '',
        email: this.agentInfo.email,
        passport: '11 11',
      });
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
