<template>
  <img
    ref="img"
    v-if="show"
    :src="imgSrc"
    :style="{left: left+'px', top: top+'px'}"
  />
</template>

<script>
export default {
  data() {
    return {
      show: true,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/css/px2rem.scss';

img{
  position: fixed;
  width: px2rem(180);
  height: px2rem(180);
  transition: all 0.5s;
  z-index: 5;
  transform: translate(-50%, -50%);
  z-index: 100;
}
</style>
