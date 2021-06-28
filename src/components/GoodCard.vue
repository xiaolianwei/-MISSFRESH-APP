<template>
  <div class="good-card van-hairline--bottom">
    <div class="card-img">
      <img ref="img" :src="images[0]">
    </div>
    <div class="card-content">
      <div class="title van-ellipsis">{{ title }}</div>
      <div class="desc van-ellipsis">{{ desc }}</div>
      <div class="tags">
        <div v-for="(tag, i) in tags" :key="i">{{ tag }}</div>
      </div>
      <div class="prices">
        <div class="price">￥{{ price }}</div>
        <div class="counter">
          <template v-if="num">
            <div class="reduce" @touchend="goodReduce">
              <img src="https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/rec.png">
            </div>
          <div class="num">{{ num }}</div>
          </template>
          <div class="add" @touchend="goodAdd">
            <img src="https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/add.png">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import flyCart from '@/utils/FlyCart';
import { mapState } from 'vuex';

export default {
  props: ['title', 'desc', 'tags', 'price', 'images', 'num', 'id'],
  methods: {
    goodAdd() {
      const imgBCR = this.$refs.img.getBoundingClientRect();
      const cardBCR = document.getElementById('shoppingCart').getBoundingClientRect();
      this.$store.commit('setStorageData', { key: 'goods', value: this.id, mode: 1 });
      flyCart({
        left: imgBCR.left + imgBCR.width / 2,
        top: imgBCR.top + imgBCR.height / 2,
        tarLeft: cardBCR.left + cardBCR.width / 2,
        tarTop: cardBCR.top + cardBCR.height / 2,
        imgSrc: this.images[0],
      });
    },
    goodReduce() {
      if (this.$route.name === 'Cart' && this.goodsData[this.id] === 1) {
        this.$dialog.confirm({
          message: '您是否要删除这个的商品',
          confirmButtonColor: '#1989fa',
          className: 'dialog',
        }).then(() => {
          this.$store.commit(
            'setStorageData',
            { key: 'goods', value: this.id, mode: -1 },
          );
        }, () => {});
      } else {
        this.$store.commit(
          'setStorageData',
          { key: 'goods', value: this.id, mode: -1 },
        );
      }
    },
  },
  computed: {
    ...mapState(['goodsData']),
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/css/px2rem.scss';

.good-card{
  width: 100%;
  box-sizing: border-box;
  height: px2rem(200);
  display: flex;

  .card-img{
    width: px2rem(180);
    height: px2rem(200);
    margin-right: px2rem(40);

    img{
      width: px2rem(180);
      height: px2rem(180);
    }
  }

  .card-content{
    position: relative;
    flex: 1;

    .title{
      width: px2rem(340);
      font-size: 13px;
      color: #1a1a1a;
      margin-top: px2rem(10);
    }

    .desc{
      width: px2rem(340);
      font-size: 12px;
      color: #aaa;
      margin-top: px2rem(10);
    }

    .tags{
      display: flex;
      margin-top: px2rem(8);

      div{
        font-size: 10px;
        border: px2rem(2) solid #aaa;
        padding: px2rem(2) px2rem(4) px2rem(4) px2rem(4);
        color: #aaa;
        border-radius: 4px;
        margin-right: px2rem(10);
      }
    }

    .prices{
      display: flex;
      justify-content: space-between;
      margin-bottom: px2rem(8);

      .price{
        font-size: 14px;
        color: #ff1a90;
        font-weight: 600;
      }

      .counter{
        display: flex;
        justify-content: flex-end;
        align-items: center;
        margin-right: px2rem(30);

        .add,.reduce{
          width: px2rem(32);
          height: px2rem(32);

          img{
            width: 100%;
          }
        }

        .num{
          height: px2rem(44);
          line-height: px2rem(44);
          padding: 0 px2rem(10);
        }
      }
    }
  }
}
</style>
