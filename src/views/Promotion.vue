<template>
  <div class="container">
    <div class="promotion_list">
      <promotion-item :id="1" />
      <promotion-item :id="2" />
      <promotion-item :id="3" />
      <promotion-item :id="4" />
    </div>
  </div>
</template>

<script>
import PromotionItem from '../components/Promotion/PromotionItem.vue';

export default {
  components: {
    PromotionItem,
  },
  name: 'Promotion',
};
</script>

<style lang="scss" scoped>
.promotion_list{}
</style>
