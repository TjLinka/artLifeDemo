<template>
  <div class="container">
    <h1>Интернет-Магазин</h1>
    <!-- <div class="row">
      <div class="col-2">
        <el-select style="width: 100%;" placeholder="Категория">
          <el-option v-for="cat in categorys" :key="cat.id" :label="cat.name" :value="cat.id" />
        </el-select>
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
    </div> -->
    <div class="products_list">
      <product-card v-for="prod in products" :key="prod.id" :prod="prod" v-on:favor="favorAction" />
    </div>
  </div>
</template>

<script>
import GApi from '../assets/backApi';
// import GButton from '../components/Forms/GButton.vue';
import ProductCard from '../components/Shop/ProductCard.vue';

export default {
  components: {
    // GButton,
    ProductCard,
  },
  data() {
    return {
      categorys: [],
      products: [],
    };
  },
  async mounted() {
    await GApi.get('/api/Catalog/get-catalog-sections').then((Response) => {
      this.categorys = Response.data;
    });
    const products = await GApi.get('/api/Catalog/get-catalog');
    products.data.forEach((prod) => {
      // eslint-disable-next-line no-param-reassign
      prod.inFavor = false;
    });
    const favourites = await GApi.get('/api/Favourites/get-list');
    favourites.data.forEach((favor) => {
      products.data.forEach((prod) => {
        if (prod.id === favor.id) {
          // eslint-disable-next-line no-param-reassign
          prod.inFavor = true;
        }
      });
    });
    this.products = products.data;
  },
  methods: {
    favorAction(id) {
      const product = this.products.find((prod) => prod.id === id);
      if (product.inFavor) {
        product.inFavor = false;
      } else {
        product.inFavor = true;
      }
    },
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
