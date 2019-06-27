<template>
  <div>
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb bg-light">
        <li class="breadcrumb-item">
          <router-link to="/">首頁</router-link>
        </li>
        <li class="breadcrumb-item">
          <router-link to="/productslist">產品列表</router-link>
        </li>
        <li class="breadcrumb-item">
          <router-link :to="{path: '/productsList', query: {category: product.category}}"
           class="text-primary">{{ product.category }}</router-link>
        </li>
        <li class="breadcrumb-item active">
          {{ product.title }}
        </li>
      </ol>
    </nav>
    <div class="row mb-3">
      <div class="col-md-4 mb-3">
        <div class="sticky-top clearfix" style="top: 10px">
          <h1 class="h3"> {{ product.title }} </h1>
          <div class="d-flex align-items-baseline" v-if="product.origin_price !== product.price">
            <del class="text-muted">售價：{{ product.origin_price | currency }}</del>
            <div class="ml-auto mb-0 h5 text-danger">
              <small>特價：</small>
              <strong>{{ product.price | currency }}</strong>
            </div>
          </div>
          <div class="d-flex align-items-baseline" v-if="product.origin_price == product.price">
            <div class="ml-auto mb-0 h5">
              <small>售價：</small>
              <strong>{{ product.price | currency }}</strong>
            </div>
          </div>
          <hr>
          <ul class="product-summary">
            <li>
              <a href="#"><i class="fas fa-ruler-horizontal"></i> 尺寸</a>
            </li>
            <li>
              <a href="#"><i class="fas fa-tshirt"></i> 試穿報告</a></li>
            <li>
              <a href="#"><i class="fas fa-heart"></i> 收藏商品</a>
            </li>
          </ul>

          <div class="input-group addcart">
            <select class="form-control" v-model="qty">
              <option value="0" disabled selected>請選擇數量</option>
              <option :value="num" v-for="num in 15" :key="num">
                {{ num }} {{ product.unit }}
              </option>
            </select>
            <button class="btn btn-primary" @click.prevent="addToCart(qty)">
              <i class="fas fa-plus"></i>
              加入購物車
            </button>
          </div>

          <router-link to="/coupongame" class="badge badge-warning float-right">
            折價卷適用
          </router-link>
        </div>
      </div>
      <div class="col-md-8 product-content">
        <img class="img-fluid" :src="product.imageUrl">
        <h3>商品介紹</h3>
        <p>{{ product.description }}</p>
        <img class="img-fluid" src="../../assets/image/product-1.jpg">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Pariatur doloribus, laudantium hic perferendis necessitatibus dolorem ipsam
        </p>
        <img class="img-fluid" src="../../assets/image/product-2.jpg">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Quibusdam rem sed vitae facilis modi maxime veniam similique eveniet.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      productId: '',
      product: [],
      qty: 0,
    };
  },
  methods: {
    getProduct() {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/product/${vm.productId}`;
      vm.$store.dispatch('updateLoading', true);
      vm.$http.get(url).then((response) => {
        if (response.data.success) {
          vm.product = response.data.product;
        } else {
          vm.$store.dispatch('updateMessage', { message: '找不到此商品', status: 'danger' });
        }
        vm.$store.dispatch('updateLoading', false);
      });
    },
    addToCart(qty) {
      this.$store.dispatch('addToCart', { id: this.productId, qty });
    },
  },
  created() {
    this.productId = this.$route.params.productId;
    this.getProduct();
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/_custom.scss';

.product-summary {
  display: flex;
  justify-content: space-around;
  margin-bottom: 1rem;
  font-size: 1rem;
  @media (max-width: 991px) {
    flex-direction: column;
    li {
      padding: 0.5rem;
    }
  }
  @media (max-width: 767px) {
    flex-direction: row;
    li {
      padding: 0rem;
    }
  }
}
.addcart {
  display: flex;
  margin-bottom: 0.5rem;
  button {
    margin-left: 0.5rem;
  }
  @media (max-width: 991px) {
    display: block;
    select {
      width: 100%;
      margin-bottom: 0.5rem;
    }
    button {
      width: 100%;
      margin-left: 0;
    }
  }
  @media (max-width: 767px) {
    display: flex;
    select {
      width: auto;
      margin-bottom: 0;
    }
    button {
      width: auto;
      margin-left: 0.5rem;
    }
  }
}
.product-content {
  text-align: center;
  img, p {
    margin-bottom: 1.5rem;
  }
  p {
    font-size: 1.25rem;
  }
}
</style>
