<template>
  <div class="promotion_item shadow-sm" :data-id="id">
    <div class="promotion_item_header">
      <div class="promotion_item_header_title">
        Промоушен 1
      </div>
      <div class="promotion_item_header_date">
        {{ new Date().toLocaleDateString() }}
      </div>
      <div class="promotion_item_header_periods"></div>
    </div>
    <div class="promotion_item_content">
      <!-- <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. At veritatis sit dolores autem
        inventore neque! Illum eos nam fuga doloremque, quos omnis asperiores unde sint. Maxime
        reiciendis odio placeat inventore quaerat quibusdam numquam sapiente in similique nemo aut
        ut tenetur minima doloremque commodi perspiciatis, quo error. Voluptas veniam, illo delectus
        earum neque dolorem saepe recusandae quibusdam quae eveniet alias explicabo officia! Iusto,
        sit. Sequi, enim maiores. Illo a nesciunt repellendus vero sequi, nisi placeat ducimus natus
        sapiente deserunt est tempore soluta cumque sint veniam eveniet! Cumque at similique dolorem
        neque eaque nemo, nihil impedit eveniet enim magnam! Quasi, assumenda eos.
      </p> -->
      <MarketingPlan />
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import MarketingPlan from '../../views/MarketingPlan.vue';

export default {
  name: 'PromotionItem',
  props: ['id'],
  mounted() {
    $('div')
      .find(`[data-id='${this.id}']`)
      .find('.promotion_item_header')
      // eslint-disable-next-line func-names
      .click(function () {
        $(this)
          .next('.promotion_item_content')
          .slideToggle();
      });
  },
  components: { MarketingPlan },
};
</script>

<style lang="scss" scoped>
.promotion_item {
  padding: 20px;
  background: white;
  margin-bottom: 20px;
}
.promotion_item_header {
  display: flex;
  gap: 20px;
  cursor: pointer;
}
.promotion_item_content {
  display: none;
  margin-top: 20px;
}
</style>
