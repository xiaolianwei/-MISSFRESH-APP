<template>
  <div id="app">
    <transition :name="$router.animationName" mode="in-out">
      <router-view></router-view>
    </transition>
  </div>
</template>

<style>
#app{
  position: relative;
  width: 100vw;
  height: 100vh;
}

.left-enter, .right-leave-to,
.left-enter .search-head-wrap, .right-leave-to .search-head-wrap{
  left: 100vw !important;
}
.left-enter-to, .right-leave,
.left-enter-to .search-head-wrap, .right-leave .search-head-wrap{
  left: 0 !important;
}
.left-enter-active, .right-leave-active{
  transition: all .5s;
  position: absolute;
  top: 0;
  z-index: 3;
}
.left-leave-active, .right-enter{
  position: absolute;
  z-index: -1;
}
.left-enter-active  .search-head-wrap, .right-leave-active  .search-head-wrap{
  transition: all .5s;
}

</style>
