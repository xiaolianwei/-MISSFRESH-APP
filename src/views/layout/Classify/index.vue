<template>
  <div class="classify-wrap">
    <router-link :to="{name: 'Search'}" class="search-btn" tag="div">
      <van-icon name="search" style="vertical-align: -4px"/>
      <span>荔枝水果9.99</span>
    </router-link>
    <div class="tab-wrap" ref="tabWrap" @touchstart="move = false" @touchmove="move = true">
      <div
        class="tab-item"
        v-for="(menu, i) in menuList"
        :key="menu.title"
        :class="{active: menu.title===menuActive}"
        @touchend="tabClick(menu.title,i)"
        ref="tabItem"
      >
        <div class="img-box">
          <img :src="menu.imgURL">
        </div>
        <p>{{ menu.title }}</p>
      </div>
    </div>
    <div v-if="isShow" class="classify-content">
      <ul
        class="side-bar-wrap"
        ref="categoryWrap"
        @touchstart="move = false"
        @touchmove="move = true"
      >
        <li
          ref="category"
          v-for="(category, i) in categoryList"
          :key="category"
          :class="{active: category===categoryActive}"
          @touchend="categoryClick(category, i)"
        >{{ category }}</li>
      </ul>
    <div class="good-list-wrap" ref="goodListWrap">
      <ul class="list-header">
        <li
          v-for="goodsSort in goodsSortList"
          :key="goodsSort"
          :class="{
            active: goodsSort===goodsSortActive,
            price: goodsSort==='价格',
            'price-up': goodsSort==='价格' && goodsSortPrice==='up',
            'price-down': goodsSort==='价格' && goodsSortPrice==='down',
          }"
          @touchend="goodsSortClick(goodsSort)"
        >{{ goodsSort }}</li>
      </ul>
      <div class="list-content">
        <GoodList
          :type="type"
          :sort="sort"
          :sortPrice="goodsSortPrice"
        />
      </div>
    </div>
    </div>
    <van-loading size="110px" v-else type="spinner" />
  </div>
</template>

<script>
import { bufferMove } from '@/utils/tools';
import good from '@/api/good';
import GoodList from '../../GoodList.vue';

export default {
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (to.name === 'Classify' && from.name === 'Search') {
        vm.isLoading = false;
      }
    });
  },
  components: {
    GoodList,
  },
  data() {
    return {
      move: false,
      menuList: [
        {
          title: '时令水果',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/时令水果.jpg',
        },
        {
          title: '酒水冲调',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/酒水冲调.jpg',
        },
        {
          title: '安心乳品',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/安心乳品.jpg',
        },
        {
          title: '休闲零食',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/休闲零食.jpg',
        },
        {
          title: '肉蛋食材',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/肉蛋食材.jpg',
        },
        {
          title: '新鲜蔬菜',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/新鲜食材.jpg',
        },
        {
          title: '熟食餐饮',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/熟食餐饮.jpg',
        },
        {
          title: '海鲜水产',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/海鲜水产.jpg',
        },
        {
          title: '粮油调味',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/粮油调味.jpg',
        },
        {
          title: '某手美食',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/某手美食.jpg',
        },
        {
          title: '纸杯清洁',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/纸品清洁.jpg',
        },
        {
          title: '个人护理',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/个人护理.jpg',
        },
        {
          title: '美妆护肤',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/美妆护肤.jpg',
        },
        {
          title: '家居收纳',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/家居收纳.jpg',
        },
        {
          title: '家用电器',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/家用电器.jpg',
        },
        {
          title: '3C数码',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/3C数码.jpg',
        },
        {
          title: '母婴用品',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/母婴用品.jpg',
        },
        {
          title: '鲜花绿植',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/鲜花绿植.jpg',
        },
        {
          title: '宠物用品',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/宠物用品.jpg',
        },
        {
          title: '图书玩具',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/图书文具.jpg',
        },
        {
          title: '手表配饰',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/手表配饰.jpg',
        },
      ],
      menuActive: '时令水果',
      categorylist: [],
      categoryActive: '全部',
      goodsSortActive: '综合',
      goodsSortList: ['综合', '销量', '价格'],
      goodsSortPrice: 'up',
      isShow: true,
      isLoading: true,
    };
  },
  computed: {
    categoryList() {
      const arr = [...this.categorylist];
      arr.splice(0, 1, '全部');
      return arr;
    },
    type() {
      return this.categoryActive === '全部' ? this.categorylist[0] : this.categoryActive;
    },
    sort() {
      if (this.goodsSortActive === '综合') {
        return 'all';
      }
      if (this.goodsSortActive === '销量') {
        return 'sale';
      }
      if (this.goodsSortActive === '价格' && this.goodsSortPrice === 'up') {
        return 'price-up';
      }
      return 'price-down';
    },
  },
  methods: {
    tabClick(value, i) {
      if (this.move) return;
      const el = this.$refs.tabItem[i];
      const parentEl = this.$refs.tabWrap;
      this.menuActive = value;
      bufferMove(el, window.innerWidth / 2, parentEl, 'x');
      this.getsidebar();
      this.categoryActive = '全部';
      const dom = this.$refs.goodListWrap?.scrollTop;
      if (dom) this.$refs.goodListWrap.scrollTop = 0;
    },
    categoryClick(type, i) {
      if (this.move) return;
      const el = this.$refs.category[i];
      const parentEl = this.$refs.categoryWrap;
      this.categoryActive = type;
      bufferMove(el, parentEl.getBoundingClientRect().height / 2, parentEl, 'y');
      this.$refs.goodListWrap.scrollTop = 0;
    },
    goodsSortClick(sort) {
      if (sort === '价格' && this.goodsSortActive === '价格') {
        this.goodsSortPrice = this.goodsSortPrice === 'up' ? 'down' : 'up';
        return;
      }
      this.goodsSortActive = sort;
    },
    async getsidebar() {
      if (this.isLoading) this.isShow = false;
      const result = await good.getsidebar(this.menuActive);
      this.categorylist = result;
      setTimeout(() => {
        this.isShow = true;
      }, 250);
    },
  },
  mounted() {
    this.getsidebar();
  },
};
</script>

<style lang="scss" src="./index.scss" scoped></style>
