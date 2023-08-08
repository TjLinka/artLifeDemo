<template>
  <div>
    <h1>Сохранённые товары</h1>
    <div class="favourites_item_list mt-3">
      <favourites-item
        v-for="prod in FavouritesArray"
        :key="prod.id"
        :prod="prod"
        v-on:delete="deleteFromFavor"
      />
    </div>
  </div>
</template>

<script>
import GApi from '../assets/backApi';
import FavouritesItem from '../components/Favourites/FavouritesItem.vue';

export default {
  components: {
    FavouritesItem,
  },
  name: 'FavouritesProducts',
  data() {
    return {
      FavouritesArray: [],
    };
  },
  async mounted() {
    await this.getData();
  },
  methods: {
    async getData() {
      GApi.get('/api/Favourites/get-list').then((Response) => {
        this.FavouritesArray = Response.data;
      });
    },
    async deleteFromFavor(id) {
      await GApi.delete(`/api/Favourites/delete/${Number(id)}`);
      await this.getData();
    },
  },
};
</script>

<style></style>
