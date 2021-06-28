<template>
  <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
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
        :num="goodsData[good.id]"
        :id="good.id"
      />
    </van-list>
  </van-pull-refresh>
</template>

<script>
import GoodCard from '@/components/GoodCard.vue';
import good from '@/api/good';
import { mapState } from 'vuex';

export default {
  props: ['type', 'sort'],
  components: {
    GoodCard,
  },
  data() {
    return {
      goodList: [],
      // 是否处于懒加载状态中
      loading: false,
      // 是否已加载完所有数据
      finished: false,
      // 是否处于下拉刷新状态中
      refreshing: false,
      // 每一次请求数据的页码数
      page: 1,
      key: true,
    };
  },
  // mounted() {
  //   console.log(this.goodsData);
  // },
  computed: {
    ...mapState(['goodsData']),
  },
  watch: {
    type() {
      if (this.key) return;
      this.switch();
    },
    sort() {
      // console.log(this.sort);
      this.switch();
    },
  },
  methods: {
    async onLoad() {
      // 初次加载的时候this.type为undefined，加一个锁让它初次渲染不走到最后
      const key = this.type;
      const result = await this.getGoodDate();

      this.loading = false;
      // 当this.type有值的时候在往后执行
      if (!key) return;
      // 往this.goodList里添数据
      this.goodList.push(...result.list);
      this.key = false;
      this.page += 1;
      // 如果已经加载了全部的数据就不继续懒加载了
      if (this.goodList.length >= result.total) {
        console.log('agagse');
        this.finished = true;
      }
    },
    async onRefresh() {
      // 清空列表数据
      this.finished = false;
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;

      this.switch(true);
    },
    async getGoodDate() {
      const params = {
        type: this.type,
        page: this.page,
        size: 7,
        sort: this.sort,
      };
      const result = await good.getGoodsList(params);
      return result;
    },
    async switch(isDown) {
      this.page = 1;
      const result = await this.getGoodDate();
      this.goodList = result.list;
      this.page += 1;
      this.finished = false;
      if (isDown) {
        this.refreshing = false;
        this.loading = false;
        this.$toast('刷新成功');
      }
    },
  },
};
</script>

<style scoped>
.van-pull-refresh{
  overflow: unset;
}
</style>
