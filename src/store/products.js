import Vue from 'vue';
import axios from 'axios';

export default ({
  namespaced: true,
  state: {
    products: [],
  },
  actions: {
    getProducts(context, { isPagination, page }) {
      let api;
      if (isPagination) {
        api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/products?page=${page}`;
      } else {
        api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products/all`;
      }
      context.commit('LOADING', true, { root: true });
      axios.get(api).then((response) => {
        if (response.data.success) {
          context.commit('PRODUCTS', response.data.products);
          if (isPagination) {
            context.commit('PAGINATION', response.data.pagination, { root: true });
          }
          // 在 products 加入 is_favorite
          context.state.products.forEach((productItem, index) => {
            context.rootState.favoriteModules.favorites.forEach((favItem) => {
              if (productItem.id === favItem.id) {
                context.commit('UPDATEPRODUCTS', { index, isFavorite: true });
              }
            });
          });
        } else {
          context.dispatch('alertMessageModules/updateMessage', { message: response.data.message, status: 'danger' }, { root: true });
        }
        context.commit('LOADING', false, { root: true });
      });
    },
  },
  mutations: {
    PRODUCTS(state, payload) {
      state.products = payload;
    },
    UPDATEPRODUCTS(state, { index, isFavorite }) {
      Vue.set(state.products[index], 'is_favorite', isFavorite);
    },
  },
  getters: {
    products: state => state.products,
  },
});
