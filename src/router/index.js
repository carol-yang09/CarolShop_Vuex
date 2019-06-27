import Vue from 'vue';
import VueRouter from 'vue-router';

import Dashboard from '@/views/Dashboard';
import Login from '@/views/Login';
import ProductsManage from '@/views/Admin/ProductsManage';
import CouponsManage from '@/views/Admin/CouponsManage';
import OrdersManage from '@/views/Admin/OrdersManage';
import Layout from '@/views/Layout';
import Home from '@/views/Front/Home';
import ProductsList from '@/views/Front/ProductsList';
import Product from '@/views/Front/Product';
import CouponGame from '@/views/Front/CouponGame';
import CreateOrder from '@/views/Front/CreateOrder';

Vue.use(VueRouter);

export default new VueRouter({
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '*',
      redirect: '/',
    },
    /* 後台路由 */
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/admin',
      // name: 'Dashboard',
      component: Dashboard,
      children: [
        {
          path: 'productsmanage',
          name: 'ProductsManage',
          component: ProductsManage,
          meta: { requiresAuth: true },
        },
        {
          path: 'couponsmanage',
          name: 'CouponsManage',
          component: CouponsManage,
          meta: { requiresAuth: true },
        },
        {
          path: 'ordersmanage',
          name: 'OrdersManage',
          component: OrdersManage,
          meta: { requiresAuth: true },
        },
      ],
    },
    /* 前台路由 */
    {
      path: '/',
      // name: 'Layout',
      component: Layout,
      children: [
        {
          path: '/',
          name: 'Home',
          component: Home,
        },
        {
          path: 'productslist',
          name: 'ProductsList',
          component: ProductsList,
        },
        {
          path: 'productslist/:productId',
          name: 'Product',
          component: Product,
        },
        {
          path: 'coupongame',
          name: 'CouponGame',
          component: CouponGame,
        },
        {
          path: 'createorder',
          name: 'CreateOrder',
          component: CreateOrder,
        },
      ],
    },
  ],
});
