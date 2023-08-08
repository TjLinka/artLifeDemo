export default {
  namespaced: true,
  state: {
    cart: JSON.parse(localStorage.getItem('cart')) || [],
  },
  mutations: {
    addToCart: (state, payload) => {
      state.cart = [...state.cart, { ...payload, count: 1 }];
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    removeFromCart: (state, payload) => {
      console.log(payload);
      state.cart = state.cart.filter((prod) => prod.id !== payload);
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    clearCart: (state) => {
      state.cart = [];
      localStorage.setItem('cart', JSON.stringify([]));
    },
    decrCount: (state, payload) => {
      const product = state.cart.find((prod) => prod.id === payload);
      product.count -= 1;
      if (product.count === 0) {
        console.log('del');
        state.cart = state.cart.filter((prod) => prod.id !== payload);
      }
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    incrCount: (state, payload) => {
      const product = state.cart.find((prod) => prod.id === payload);
      product.count += 1;
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    manualChangeCount: (state, { id, count }) => {
      const product = state.cart.find((prod) => prod.id === id);
      product.count = count;
      if (product.count === 0 || product.count < 0) {
        console.log('del');
        state.cart = state.cart.filter((prod) => prod.id !== id);
      }
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
  },
  actions: {
    addToCart({ commit }, product) {
      commit('addToCart', product);
    },
    removeFromCart({ commit }, product) {
      commit('removeFromCart', product);
    },
    clearCart({ commit }) {
      commit('clearCart');
    },
    decrCount({ commit }, id) {
      commit('decrCount', id);
    },
    incrCount({ commit }, id) {
      commit('incrCount', id);
    },
    manualChangeCount({ commit }, payload) {
      commit('manualChangeCount', payload);
    },
  },
  getters: {
    cartProdCount: (state) => state.cart.length,
    cartProdAllCount: (state) => state.cart.reduce((acc, prod) => acc + prod.count, 0),
    cartProdSum: (state) => state.cart.reduce((acc, prod) => acc + (prod.price * prod.count), 0),
    cartProdPoints: (state) => state.cart.reduce((acc, prod) => acc + (prod.points * prod.count), 0),
    getProduct: (state) => (id) => state.cart.find((prod) => prod.id === id),
  },
};
