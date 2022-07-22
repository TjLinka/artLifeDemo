<template>
  <div class="container">
    <h1>Интернет-Магазин</h1>
    <div class="row">
      <div class="col-2">
        <el-select style="width: 100%;"></el-select>
      </div>
      <div class="col-2">
        <el-select style="width: 100%;"></el-select>
      </div>
      <div class="col-2">
        <el-select style="width: 100%;"></el-select>
      </div>
      <div class="col-2">
        <g-button>Сбросить всё</g-button>
      </div>
      <div class="col">
        Сортировка
      </div>
    </div>
    <div class="products_list">
      <product-card />
      <product-card />
      <product-card />
      <product-card />
      <product-card />
      <product-card />
      <product-card />
      <product-card />
      <product-card />
      <product-card />
      <product-card />
    </div>
  </div>
</template>

<script>
import GButton from '../components/Forms/GButton.vue';
import ProductCard from '../components/Shop/ProductCard.vue';

export default {
  components: {
    GButton,
    ProductCard,
  },
  name: 'Shop',
};
</script>

<style lang="scss" scoped>
.products_list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 30px;
}
</style>
