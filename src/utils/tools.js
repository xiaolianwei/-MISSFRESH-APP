/**
 * @param {Element} el 移动的元素
 * @param {Number} target 要移动到的位置
 * @param {Element} parentEl 移动元素的父级
 * @param {String} mode x方向的移动还是y方向的移动
 */
let bufferMoveTimeId = null;
export function bufferMove(el, target, parentEl, mode = 'x') {
  clearInterval(bufferMoveTimeId);
  let iSeep = null;
  let last = null;
  bufferMoveTimeId = setInterval(() => {
    const elBCR = el.getBoundingClientRect();
    if (mode === 'x') {
      iSeep = (elBCR.left + elBCR.width / 2 - target) / 7;
      iSeep = iSeep > 0 ? Math.floor(iSeep) : Math.ceil(iSeep);
      parentEl.scrollLeft += iSeep;
    } else if (mode === 'y') {
      const parentElBCR = parentEl.getBoundingClientRect();
      iSeep = (elBCR.top + elBCR.height / 2 - parentElBCR.top - target) / 7;
      iSeep = iSeep > 0 ? Math.floor(iSeep) : Math.ceil(iSeep);
      parentEl.scrollTop += iSeep;
    }
    if (parentEl.scrollLeft === last) {
      clearInterval(bufferMoveTimeId);
      return;
    }
    last = parentEl.scrollLeft;
  }, 16);
}

/**
 * @param {string} key 要获取数据的key值
 */
export function getStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

export function setStoring(key, value, mode) {
  let data = getStorage(key);
  if (key === 'goods') {
    data = data || {};
    if (!data[value]) {
      data[value] = 1;
    } else {
      data[value] += mode;
      if (data[value] <= 0) {
        delete data[value];
      }
    }
  }
  if (key === 'historysData') {
    data = data || [];
    const len = data.findIndex((item) => item.value === value);
    if (len !== -1) {
      data[len].time = new Date().getTime();
    } else {
      data.push({ value, time: new Date().getTime() });
    }
    data.sort((a, b) => b.time - a.time);
  }
  localStorage.setItem(key, JSON.stringify(data));
}

export function removeStoring(key, arr) {
  let data = getStorage(key);
  if (key === 'goods') {
    if (arr) {
      for (let i = 0; i < arr.length; i += 1) {
        const id = arr[i];
        delete data[id];
      }
    } else {
      data = {};
    }
  }
  localStorage.setItem(key, JSON.stringify(data));
}

export function debounce(fn) {
  let timeId = null;
  return function foo(...argu) {
    clearTimeout(timeId);
    timeId = setTimeout(() => {
      fn(...argu);
    }, 500);
  };
}

export default {};
