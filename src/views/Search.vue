<template>
  <div class="search-wrap">
    <div class="search-head-wrap">
      <div class="search-head">
        <van-icon name="arrow-left" @touchend="$router.push({name: 'Classify'})"/>
        <van-search
          v-model="value"
          show-action
          placeholder="草莓"
          @search="onSearch(value)"
          @input="onInput"
          @focus="isShowGoodsCard = false"
        >
          <template #action>
            <div @click="onSearch(value)" :style="{display: 'flex', alignItems: 'center'}">
              <van-icon
                v-if="isShowGoodsCard"
                name="shopping-cart-o"
                id="shoppingCart"
                :badge="goodsNum"
                @touchend="$router.push({name: 'Cart'})"
              />
              <span v-else>搜索</span>
            </div>
          </template>
        </van-search>
      </div>
    </div>
    <div class="goods-card" v-if="isShowGoodsCard">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <GoodCard
          v-for="good in goodList"
          :key="good.id"
          :title="good.title"
          :desc="good.desc"
          :tags="good.tags"
          :price="good.price"
          :images="good.images"
          :id="good.id"
          :num="goodsData[good.id]"
        />
      </van-list>
    </div>
    <div class="like-search" v-if="isShowLikeSearch">
      <van-list>
        <van-cell
          v-for="search in searchList"
          :key="search"
          @click="onSearch(search)"
        >
          <template #title>
            <span class="custom-title">
              {{ search.split(value)[0]
              }}<span class="red">{{ value }}</span>{{ search.split(value)[1] }}
            </span>
          </template>
        </van-cell>
      </van-list>
    </div>
    <div v-if="!isShowLikeSearch && !isShowGoodsCard" class="history">
      <h4>历史记录</h4>
      <div
        v-for="his in historysData"
        :key="his.value"
        class="his-item"
        @touchend="onSearch(his.value)"
      >{{ his.value }}</div>
    </div>
  </div>
</template>

<script>
import good from '@/api/good';
import { mapState, mapGetters } from 'vuex';
import GoodCard from '@/components/GoodCard.vue';

export default {
  components: {
    GoodCard,
  },
  data() {
    return {
      value: '',
      timeId: null,
      searchList: [],
      goodList: [],
      // 是否显示商品列表
      isShowGoodsCard: false,
      // 是否显示搜索列表
      isShowLikeSearch: false,
      // 是否处于懒加载状态中
      loading: false,
      // 是否已加载完所有数据
      finished: false,
      page: 1,
    };
  },
  methods: {
    async onSearch(type) {
      type = type === '' ? '草莓' : type;
      this.value = type;
      this.goodList = [];
      this.page = 1;
      this.finished = false;
      this.loading = true;
      clearTimeout(this.timeId);
      // setStoring('searchList', type);
      this.$store.commit('setStorageData', { key: 'historysData', value: this.value });
      this.onLoad();
    },
    onInput(value) {
      clearTimeout(this.timeId);
      if (value === '') {
        this.searchList = [];
        this.isShowLikeSearch = false;
        return;
      }
      this.timeId = setTimeout(async () => {
        const { result } = await good.likeSearch(value);
        this.searchList = result;
        if (result.length !== 0) {
          this.isShowLikeSearch = true;
        }
      }, 500);
    },
    async onLoad() {
      const result = await good.search({
        type: this.value,
        page: this.page,
        size: 7,
      });
      this.goodList.push(...result.list);
      this.page += 1;
      this.loading = false;
      this.isShowGoodsCard = true;
      this.isShowLikeSearch = false;
      if (this.goodList.length >= result.total) {
        this.finished = true;
      }
    },
  },
  computed: {
    ...mapState(['goodsData', 'historysData']),
    ...mapGetters(['goodsNum']),
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/css/px2rem.scss";

.search-wrap {
  width: 100vw;
  height: 100vh;
  background-color: #fff;
  padding-top: px2rem(108);
  box-sizing: border-box;

  .search-head-wrap{
    position: fixed;
    width: 100%;
    z-index: 5;
    background: #fff;
    display: flex;
    justify-content: center;
    top: 0;

    .search-head {
      width: px2rem(690);
      display: flex;
      align-items: center;

      .van-icon {
        font-size: px2rem(44);
      }
      .van-search {
        flex: 1;
      }
    }
  }

  .goods-card{
    width: px2rem(690);
    margin: 0 auto;
  }

  .like-search{
    padding-left: px2rem(60);
  }

  .history{
    width: px2rem(700);
    margin: px2rem(30) px2rem(20) 0;

    .his-item{
      padding: px2rem(30);
      margin: 0 0 px2rem(20) px2rem(20);
      background-color: #eee;
      border-radius: px2rem(20);
      display: inline-block;
    }
  }
}
</style>
