import { isElement } from 'lodash';

// 返回 Range 选区在页面的绝对位置
function getRangeAbsPoi (range) {
  const rangeRect = range.getBoundingClientRect();
  return {
    top: rangeRect.bottom,
    left: rangeRect.right,
  };
}

// 将传入的样式文本包裹到 style 标签并 append 到 head 标签
function loadStyle (innerText) {
  const style = document.createElement('style');
  style.innerText = innerText;
  document.getElementsByTagName('head')[0].appendChild(style);
}

// 返回选区子节点包含的元素标签
function getRangeNodesName (childNodes) {
  const result = new Set();
  Array.from(childNodes).forEach(node => {
    // if (node.nodeType === 3) {
    //   node = node.parentNode;
    // }
    result.add(
      String.prototype.toLocaleLowerCase.call(node.nodeName)
    );
    if (result.childNodes) {
      getRangeNodesName(result.childNodes);
    }
  });
  return Array.from(result);
}

export default {
  getRangeAbsPoi,
  loadStyle,
  isElement,
  getRangeNodesName,
};
