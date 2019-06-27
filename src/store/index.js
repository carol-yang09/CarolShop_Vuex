import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true, // 嚴謹模式
  state: {
    isLoading: false,
    messages: [],
    products: [],
    pagination: {},
    carts: {},
    cartsLength: 0,
    isCartShow: false,
  },
  actions: {
    // isLoading
    updateLoading(context, status) {
      context.commit('LOADING', status);
    },
    // alert
    updateMessage(context, { message, status }) {
      const timestamp = Math.floor(new Date() / 1000);
      context.commit('PUSH_MESSAGE', {
        message,
        status,
        timestamp,
      });
      context.dispatch('removeMessageWithTiming', timestamp);
    },
    removeMessage(context) {
      context.commit('REMOVE_MESSAGE');
    },
    removeMessageWithTiming(context, timestamp) {
      const msg = [...context.state.messages];
      setTimeout(() => {
        msg.forEach((item, index) => {
          if (item.timestamp === timestamp) {
            context.commit('REMOVE_MESSAGE', index);
          }
        });
      }, 1500);
    },
    // products
    getProducts(context, { url, isPagination }) {
      context.commit('LOADING', true);
      axios.get(url).then((response) => {
        if (response.data.success) {
          context.commit('PRODUCTS', response.data.products);
          if (isPagination) {
            context.commit('PAGINATION', response.data.pagination);
          }
        } else {
          context.dispatch('updateMessage', { message: response.data.message, status: 'danger' });
        }
        context.commit('LOADING', false);
      });
    },
    // cart
    getCart(context) {
      // const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      axios.get(url).then((response) => {
        context.commit('CART', response.data.data);
        context.commit('CART_LENGTH', response.data.data.carts.length);
      });
    },
    addToCart(context, { id, qty }) {
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      const cart = {
        product_id: id,
        qty,
      };
      axios.post(url, { data: cart }).then((response) => {
        context.dispatch('getCart');
        if (response.data.success) {
          context.dispatch('showCart');
          context.dispatch('updateMessage', { message: response.data.message, status: 'success' });
        } else {
          context.dispatch('updateMessage', { message: response.data.message, status: 'danger' });
        }
      });
    },
    removeCartItem(context, id) {
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${id}`;
      axios.delete(url).then((response) => {
        context.dispatch('getCart');
        context.dispatch('updateMessage', { message: response.data.message, status: 'warning' });
      });
    },
    showCart(context) {
      context.commit('ISCART_SHOW', true);
      setTimeout(() => {
        context.commit('ISCART_SHOW', false);
      }, 5000);
    },
  },
  mutations: {
    // isLoading
    LOADING(state, status) {
      state.isLoading = status;
    },
    // alert
    PUSH_MESSAGE(state, msg) {
      state.messages.push(msg);
    },
    REMOVE_MESSAGE(state, num) {
      state.messages.splice(num, 1);
    },
    // pooducts
    PRODUCTS(state, payload) {
      state.products = payload;
    },
    PAGINATION(state, payload) {
      state.pagination = payload;
    },
    // cart
    CART(state, payload) {
      state.carts = payload;
    },
    CART_LENGTH(state, payload) {
      state.cartsLength = payload;
    },
    ISCART_SHOW(state, payload) {
      state.isCartShow = payload;
    },
  },
  getters: {
    isLoading: state => state.isLoading,
    messages: state => state.messages,
    products: state => state.products,
    pagination: state => state.pagination,
    carts: state => state.carts,
    cartsLength: state => state.cartsLength,
    isCartShow: state => state.isCartShow,
  },
});
