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

// 返回选区整棵节点树（除 #text）包含的元素标签
function getRangeNodesName (node) {
  const result = new Set();
  result.add(node.nodeName);
  recursiveChildNodes(node.parentNode);
  function recursiveChildNodes (node) {
    if (node.ariaLabel === 'select-editor-toolbar') {
      return;
    }
    result.add(node.nodeName);
    recursiveChildNodes(node.parentNode);
  }
  return Array.from(result);
}

export default {
  getRangeAbsPoi,
  loadStyle,
  getRangeNodesName,
};
