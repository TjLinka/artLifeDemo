<template>
  <div>
    <h1>Сохранённые товары</h1>
    <div class="favourites_item_list mt-3">
      <favourites-item :id="1"/>
      <favourites-item :id="2"/>
      <favourites-item :id="3"/>
    </div>
  </div>
</template>

<script>
import FavouritesItem from '../components/Favourites/FavouritesItem.vue';

export default {
  components: {
    FavouritesItem,
  },
  name: 'FavouritesProducts',
};
</script>

<style></style>
