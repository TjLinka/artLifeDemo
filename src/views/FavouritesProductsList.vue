<template>
  <div>
      <h1>Сохранённые списки товаров</h1>
      <div>
        <favourites-items-list :id="1"/>
        <favourites-items-list :id="2"/>
        <favourites-items-list :id="3"/>
      </div>
  </div>
</template>

<script>
import FavouritesItemsList from '../components/Favourites/FavouritesItemsList.vue';

export default {
  components: { FavouritesItemsList },
  name: 'FavouritesProductsList',
};
</script>

<style></style>
