<template>
  <div class="g_modal">
    <div class="g_modal_overlay">
      <div :class="`g_modal_content ${size}`">
        <h3 class="g_modal_content_title">
          Поделиться
        </h3>
        <div class="g_modal_content_body">
          <p style="text-align: center; font-size: 26px;">
            <strong>QR Code</strong>
          </p>
          <div style="text-align: center;">
            <qrcode-vue :value="qrURL" :size="200" level="H"></qrcode-vue>
          </div>
          <p style="text-align: center; font-size: 16px;" class="mt-3">
            <span style="margin-right: 10px;" id="ref-link">{{ qrURL }}</span>
            <copy-icon @click="copyLink" :height="'100%'" width="18px" />
          </p>
          <p style="text-align: center; font-size: 26px; margin: 0;">
            <strong>Поделиться</strong>
          </p>
          <br />
          <div class="share_links">
            <div class="share-buttons">
              <button
                class="vkontakte"
                :onClick="
                  `window.open('https://vkontakte.ru/share.php?url=${qrURL}','sharer','status=0,toolbar=0,width=650,height=500');`
                "
                title="Поделиться Вконтакте"
              ></button>
              <button
                class="telegram"
                :onClick="
                  `window.open('https://telegram.me/share/url?url=${qrURL}','sharer','status=0,toolbar=0,width=650,height=500')`
                "
                title="Поделиться в Телеграм"
              ></button>
              <button
                class="whatsapp"
                :onClick="
                  `window.open('https://api.whatsapp.com/send?text=${qrURL}','sharer','status=0,toolbar=0,width=650,height=500')`
                "
                title="Поделиться в Whatsapp"
              ></button>
            </div>
          </div>
        </div>
        <footer class="g_modal_content_footer">
          <g-button @click="$emit('close')" :primary="true" :width="'50%'" center>Закрыть</g-button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import QrcodeVue from 'qrcode.vue';
import GButton from '../Forms/GButton.vue';
import CopyIcon from '../Icons/CopyIcon.vue';

export default {
  name: 'GModalEditCountry',
  components: {
    QrcodeVue,
    GButton,
    CopyIcon,
  },
  props: {
    qrURL: {
      type: String,
      required: true,
    },
    isShow: {
      type: Boolean,
      default: false,
    },
    noCloseByClick: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: 'md',
    },
  },
  data() {
    return {};
  },
  mounted() {
    if (!this.noCloseByClick) {
      console.log('1');
      document.addEventListener('click', this.closeModal);
    }
  },
  beforeDestroy() {
    document.removeEventListener('click', this.closeModal);
  },
  methods: {
    closeModal(e) {
      if ($(e.target).hasClass('g_modal_overlay')) {
        this.$emit('close');
      }
    },
    copyLink() {
      console.log();
      const str = document.querySelector('#ref-link');
      const el = document.createElement('textarea');
      el.value = str.innerHTML;
      el.setAttribute('readonly', '');
      el.style.position = 'absolute';
      el.style.left = '-9999px';
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      str.classList.add('coped');
      document.body.removeChild(el);
      setTimeout(() => {
        str.classList.remove('coped');
      }, 1500);
    },
  },
};
</script>

<style lang="scss" scoped>
.g_modal {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  z-index: 100;
  &_overlay {
    width: 100%;
    height: 100vh;
    background: rgba(39, 39, 39, 0.644);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &_content {
    width: calc(100% / 3);
    height: auto;
    background-color: white;
    padding: 10px 20px;
    h4 {
      margin: 0;
      padding: 40px;
    }
    &.lg {
      width: calc(100% / 2);
      min-width: 500px;
    }
    &.md {
      width: calc(100% / 3.5);
      min-width: 500px;
    }
    &.sm {
      width: calc(100% / 5);
      min-width: 500px;
    }
    &_title {
      text-align: center;
      // border-bottom: 1px solid black;
    }
    &_body {
      // text-align: center;
      margin-top: 20px;
    }
    &_footer {
      margin-top: 40px;
      margin-bottom: 20px;
    }
  }
}
#ref-link {
  position: relative;
  &.coped::before {
    display: block;
  }
}
#ref-link::before {
  display: none;
  top: -35px;
  left: 50%;
  transform: translate(-40%, 0%);
  content: 'Ссылка скопирована';
  position: absolute;
  white-space: nowrap;
  border: 1px solid lightgray;
  padding: 2px 5px;
  color: black;
  pointer-events: none;
  background: white;
  box-shadow: 2px 0px 10px -5px black;
}
.share-buttons {
  display: flex;
  justify-content: center;
  gap: 10px;
  & > button {
    border: 0;
    width: 50px;
    height: 50px;
  }
}
.share-buttons .vkontakte {
  background: url('../../assets/imgs/vk_logo.svg');
  background-size: contain;
}

.share-buttons .telegram {
  background: url('../../assets/imgs/t_logo.svg') no-repeat;
  background-size: contain;
}
.share-buttons .whatsapp {
  background: url('../../assets/imgs/whatsapp_logo.svg') no-repeat;
  background-size: contain;
}
</style>
