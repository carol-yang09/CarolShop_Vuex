import axios from 'axios';

export default({
  namespaced: true,
  state: {
    products: [],
  },
  actions: {
    getProducts(context, { url, isPagination }) {
      context.commit('LOADING', true, { root: true });
      axios.get(url).then((response) => {
        if (response.data.success) {
          context.commit('PRODUCTS', response.data.products);
          if (isPagination) {
            context.commit('PAGINATION', response.data.pagination, { root: true });
          }
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
  },
  getters: {
    products: state => state.products,
  },
});
