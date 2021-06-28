<template>
  <div class="shop-cart">
    <div class="top-nav">
      <van-nav-bar
        fixed
        title="购物车"
        right-text="删除"
        @click-right="onRemove"
      />
    </div>
    <template v-if="isLoading">
      <div class="card-list" v-if="goodsList.length">
        <van-checkbox-group @change="onChange" v-model="goodsCheckArr" ref="checkboxGroup">
          <div class="card-box" v-for="good in goodsList" :key="good.id">
            <van-checkbox :name="good.id" />
            <GoodCard
              :title="good.title"
              :desc="good.desc"
              :tags="good.tags"
              :price="good.price"
              :images="good.images"
              :id="good.id"
              :num="goodsData[good.id]"
            />
          </div>
        </van-checkbox-group>
      </div>
      <div class="card-none" v-else>
        <img
          src="https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/shopping_bg.jpg"
        />
      </div>
      <van-submit-bar :price="totalPrice" button-text="去结算" @submit="onSubmit">
        <van-checkbox @click="selectAll" v-model="all">全选</van-checkbox>
      </van-submit-bar>
    </template>
    <van-loading v-else size="110px" type="spinner" />
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { getStorage } from '@/utils/tools';
import good from '@/api/good';
import GoodCard from '@/components/GoodCard.vue';

export default {
  components: {
    GoodCard,
  },
  data() {
    return {
      all: true,
      goodsList: [],
      goodsCheckArr: [],
      totalPrice: 0,
      isLoading: false,
      firstRender: true,
    };
  },
  watch: {
    goodsData: {
      handler() {
        const data = getStorage('goods') || [];
        const goodsArr = Object.keys(data);
        good.getGoodsByIds(goodsArr).then((res) => {
          this.goodsList = res.list;
          if (this.firstRender) {
            this.goodsCheckArr.length = 0;
            for (let i = 0; i < res.list.length; i += 1) {
              this.goodsCheckArr.push(res.list[i].id);
            }
            this.firstRender = false;
          }
          this.initPrice(this.goodsCheckArr);
          if (this.goodsCheckArr.length === 0) this.all = false;
          setTimeout(() => {
            this.isLoading = true;
          }, 250);
        });
      },
      immediate: true,
    },
    goodsDataLen() {
      const arr = this.goodsCheckArr.filter((id) => this.goodsData[id]);
      this.goodsCheckArr = arr;
      this.onChange(arr);
    },
  },
  computed: {
    ...mapState(['goodsData']),
    ...mapGetters(['goodsDataLen']),
  },
  methods: {
    onChange(arr) {
      if (this.goodsCheckArr.length === this.goodsDataLen) {
        this.all = true;
      } else {
        this.all = false;
      }
      this.initPrice(arr);
    },
    onRemove() {
      if (this.all) {
        this.$dialog.confirm({
          message: '您是否要删除全部的商品',
          confirmButtonColor: '#1989fa',
          className: 'dialog',
        }).then(() => {
          this.$store.commit('removeStorageData', { key: 'goods' });
        }, () => {});
      } else if (this.goodsCheckArr.length !== 0) {
        this.$dialog.confirm({
          message: '您是否要已选中的商品',
          confirmButtonColor: '#1989fa',
          className: 'dialog',
        }).then(() => {
          this.$store.commit('removeStorageData', { key: 'goods', value: this.goodsCheckArr });
        }, () => {});
      } else {
        this.$toast.fail('您没有要删除的商品');
      }
    },
    selectAll() {
      if (this.$refs.checkboxGroup) {
        this.$refs.checkboxGroup.toggleAll(this.all);
      } else {
        this.$toast.fail('您没有商品');
        this.all = false;
      }
    },
    onSubmit() {},
    initPrice(arr) {
      let price = 0;
      arr.forEach((id) => {
        this.goodsList.forEach((goodObj) => {
          if (goodObj.id === id) {
            price += goodObj.price * this.goodsData[id];
          }
        });
      });
      this.totalPrice = price * 100;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/css/px2rem.scss';

.shop-cart {
  background: #eee;
  height: 100vh;

  .card-list{
    width: 100%;
    box-sizing: border-box;
    padding: px2rem(20) px2rem(20) px2rem(200);
    margin-top: px2rem(92);
    background-color: #fff;

    .card-box{
      display: flex;

      .van-checkbox{
        margin-right: px2rem(20);
        flex-shrink: 0;
      }
    }
  }

  .card-none {
    width: 100%;

    img{
      width: 100%;
    }
  }

  .van-submit-bar{
    bottom: px2rem(100);
  }

  .van-submit-bar{
    .go{
      color: #19A7E8;
    }
  }
}
</style>
