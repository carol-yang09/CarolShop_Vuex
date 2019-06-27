<template>
  <div class="container">
    <Loading :active.sync="isLoading"></Loading>
    <Alert/>
    <nav class="navbar navbar-expand-lg navbar-light bg-transparent px-0">
      <router-link class="navbar-brand logo" to="/">Carol's Shop</router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse"
       data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
       aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse toggle-menu" id="navbarSupportedContent">
        <ul class="navbar-nav align-items-center w-100">
          <li class="nav-item">
            <router-link class="nav-link" to="/" exact>Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/productslist"
             :class="{'active': $route.name === 'ProductsList' && 'router-link-active'}">
             Products
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/coupongame">Coupons</router-link>
          </li>
          <li class="nav-item ml-lg-auto pt-1">
            <router-link class="nav-link" to="/login">
              <i class="fas fa-user-circle fa-lg"></i>
            </router-link>
          </li>
        </ul>

        <div class="btn-group cart" :class="{'show': isCartShow}">
          <button type="button" class="btn cart-btn" data-toggle="dropdown">
            <i class="fas fa-shopping-cart fa-lg"></i>
            <span class="badge badge-pill badge-danger">{{ cartsLength }}</span>
          </button>
          <div class="dropdown-menu dropdown-menu-right" :class="{'show': isCartShow}">
            <div class="pt-2 px-3">
              <h5 class="text-center">購物車清單</h5>
              <table class="table mb-2" style="min-width:270px">
                <tbody>
                  <tr v-for="cart in carts.carts" :key="cart.id">
                    <td class="px-1">
                      <a href="#" class="text-danger" @click.prevent="removeCartItem(cart.id)">
                        <i class="fas fa-trash-alt"></i>
                      </a>
                    </td>
                    <td class="px-1">{{ cart.product.title }}</td>
                    <td class="px-1">{{ cart.qty }} {{ cart.product.unit }}</td>
                    <td class="text-right px-1">{{ cart.total | currency }}</td>
                  </tr>
                  <tr v-if="!carts.total">
                    <td class="text-center">購物車是空的</td>
                  </tr>
                </tbody>
              </table>
              <router-link to="/createorder" class="btn btn-primary d-block mb-2">
                <i class="fas fa-cart-arrow-down"></i> 結帳去
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <router-view></router-view>

    <!-- footer -->
    <div class="bg-light">
      <ul class="d-md-flex footer">
        <li class="px-4">
          <h5 class="footer-title">Carol's Shop</h5>
          <p class="text-muted">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Est recusandae fugiat,
            nemo harum nobis laborum expedita vero repellendus consectetur nostrum.
          </p>
        </li>
        <li>
          <h5 class="footer-title">Contact Us</h5>
          <ul>
            <li>
              <a href="tel:+1234567890" class="text-muted">TEL： 12345678910</a>
            </li>
            <li>
              <a href="mailto:carolshop@mail.com" class="text-muted">
                Mail： carolshop@mail.com
              </a>
            </li>
            <li class="text-muted">
              地址： 地球上的某一個角落
            </li>
          </ul>
        </li>
        <li>
          <h5 class="footer-title">Follow Us</h5>
          <ul>
            <li>
              <a href="#" class="text-primary">
                <span class="fa-stack fa-lg">
                  <i class="fas fa-circle fa-stack-2x"></i>
                  <i class="fab fa-facebook-f fa-stack-1x fa-inverse"></i>
                </span>
              </a>
              <a href="#" class="text-primary">
                <span class="fa-stack fa-lg">
                  <i class="fas fa-circle fa-stack-2x"></i>
                  <i class="fab fa-twitter fa-stack-1x fa-inverse"></i>
                </span>
              </a>
            </li>
            <li>
              <a href="#" class="text-primary">
                <span class="fa-stack fa-lg">
                  <i class="fas fa-circle fa-stack-2x"></i>
                  <i class="fab fa-instagram fa-stack-1x fa-inverse"></i>
                </span>
              </a>
              <a href="#" class="text-primary">
                <span class="fa-stack fa-lg">
                  <i class="fas fa-circle fa-stack-2x"></i>
                  <i class="fab fa-line fa-stack-1x fa-inverse"></i>
                </span>
              </a>
            </li>
          </ul>
        </li>
      </ul>

      <div class="copyright">
        ⓒ 2019 Carol's Shop by Carol
      </div>
    </div>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Alert from '@/components/AlertMessage';

export default {
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters(['isLoading', 'messages', 'carts', 'cartsLength', 'isCartShow']),
  },
  methods: {
    removeCartItem(id) {
      this.$store.dispatch('removeCartItem', id);
    },
    ...mapActions(['getCart', 'showCart']),
  },
  components: {
    Alert,
  },
  created() {
    this.$store.dispatch('getCart');
  },
};
</script>

<style scoped lang="scss">
// navbar
.logo {
  background-color: transparent;
  box-shadow: none;
  font-size: 1.25rem;
  font-weight: bold;
}
.dropdown-menu {
  z-index: 9999;
}
// navbar cart
.cart {
  float: right;
}
.cart-btn {
  float: right;
  position: relative;
  background-color: transparent;
  text-align: right;
  font-size: inherit;
  .badge {
    position: absolute;
    top: auto;
    bottom: 2px;
    right: -1px;
  }
}
// footer
.footer {
  margin: 0;
  padding: 2rem 2rem 0;
  line-height: 1.5rem;
  > li {
    flex: 1 1 0;
    margin-bottom: 2rem;
    text-align: center;
  }
}
.footer-title {
  margin-bottom: 1.25rem;
  font-weight: bold;
}
.copyright {
  padding: 1rem 0;
  border-top: 1px solid #ccc;
  text-align: center;
}
</style>
