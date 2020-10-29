import { isElement } from 'lodash';

// 计算 HTML 元素在页面的绝对位置
function getNodeAbsPoi (node) {
  if (!isElement(node)) {
    throw new TypeError(`${node} is not a HTML Node`);
  }
  const position = {
    top: 0,
    left: 0,
  };
  while (node) {
    position.top += node.offsetTop;
    position.left += node.offsetLeft;
    node = node.offsetParent;
  }
  return position;
}

function loadStyle (innerText) {
  const style = document.createElement('style');
  style.innerText = innerText;
  document.getElementsByTagName('head')[0].appendChild(style);
}

function findNodesName (childNodes) {
  const result = new Set();
  Array.from(childNodes).forEach(node => {
    result.add(
      String.prototype.toLocaleLowerCase.call(node.nodeName)
    );
    if (result.childNodes) {
      findNodesName(result.childNodes);
    }
  });
  return Array.from(result);
}

export default {
  getNodeAbsPoi,
  loadStyle,
  isElement,
  findNodesName,
};
