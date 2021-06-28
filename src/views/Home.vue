<template>
  <div class="home">
    <router-view></router-view>
    <van-tabbar  route>
      <van-tabbar-item icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item
        name="classify"
        icon="apps-o"
        :to="{name: 'Classify'}"
      >分类</van-tabbar-item>
      <van-tabbar-item
        name="cart"
        icon="cart-o"
        :to="{name: 'Cart'}"
        id="shoppingCart"
        :badge="goodsNum"
      >购物车</van-tabbar-item>
      <van-tabbar-item icon="user-circle-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['goodsNum']),
  },
};
</script>

<style lang="scss" scoped>
.home{
  height: 100%;
}
</style>
