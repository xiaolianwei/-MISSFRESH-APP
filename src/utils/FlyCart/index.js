/* eslint no-unused-expressions: off */
import Vue from 'vue';
import flyCart from './index.vue';

const FlyCart = Vue.extend(flyCart);

const showFlyCart = ({
  left,
  top,
  tarLeft,
  tarTop,
  imgSrc,
}) => {
  const app = new FlyCart({
    data() {
      return {
        left,
        top,
        imgSrc,
      };
    },
    el: document.createElement('div'),
  });
  document.body.appendChild(app.$el);
  window.getComputedStyle(app.$el).left;
  app.$el.style.borderRadius = '50%';
  app.$el.style.transform = 'translate(-50%, -50%) scale(0.3)';
  app.$el.style.left = `${tarLeft}px`;
  app.$el.style.top = `${tarTop}px`;
  setTimeout(() => {
    app.show = false;
  }, 500);
};

export default showFlyCart;
