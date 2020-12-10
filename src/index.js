import Vue from 'vue';
import indexVue from './index.vue';
import utils from './utils';

class Editor {
  constructor () {
    this.editorPoi = {}; // 编辑器在页面中的绝对位置
    this.selectionConfig = {}; // getSelection 返回的对象
    this.container = null;
    this.$instance = null; // 编辑器实例 Vue

    this.initEditor();
    this.initButtonsEvent();

    document.addEventListener('mousedown', e => {
      if (this.$instance.visible && e.target.ariaLabel !== 'editor-toolbar') {
        this.$instance.visible = false;
        this.$instance.absPoi = {};
      }
    });
  }

  initEditor () {
    utils.loadStyle('::selection { background: rgb(33, 130, 249); color: #fff }');
    if (!this.$instance) {
      this.$instance = new (Vue.extend(indexVue))({
        el: document.createElement('div')
      });
    }
    document.body.appendChild(this.$instance.$el);
  }

  initButtonsEvent () {
    Array.from(document.getElementsByClassName('v-format-action')).forEach(action => {
      action.addEventListener('click', e => {
        this.restoreSelection();
        const format = e.target.dataset.format;
        // 在 OSX 系统下，无论是 WPS MSC 或者 HTML 都是以选区尾巴作为判断是否添加清除格式的标准
        // 当选区头部和尾巴都不包含格式时，则添加格式
        // 当选区头部和尾巴都包含或者不包含，而中间包含格式时，以中间是否包含为准
        const isRangeContainsBold = () => {
          const { startNodeNames, endNodeNames } = this.selectionConfig;
          const isStartIncluded = startNodeNames.includes('B') || startNodeNames.includes('FONT');
          const isEndIncluded = endNodeNames.includes('B') || startNodeNames.includes('FONT');
          if (isStartIncluded && !isEndIncluded) return true;
          if (!isStartIncluded && isEndIncluded) return false;
          if (isStartIncluded && isEndIncluded) return true;
          if (!isStartIncluded && !isEndIncluded) return false;
        }
        const { startNodeNames, endNodeNames } = this.selectionConfig;
        switch (format) {
          case 'bold':
            document.execCommand('bold');
            if (isRangeContainsBold()) {
              document.execCommand('foreColor', false, '#000');
            } else {
              document.execCommand('foreColor', false, '#e33e33');
            }
            break;
          case 'underline':
            document.execCommand('underline');
            break;
          case 'removeFormat':
            document.execCommand('removeFormat');
            break;
          default:
            document.execCommand(format);
        }
      });
    });
  }

  saveSelection () {
    this.selectionConfig.range = this.createCurrentRange(window.getSelection());
  }

  restoreSelection () {
    const { range } = this.selectionConfig;
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      selection.removeAllRanges();
    }
    selection.addRange(range);
  }

  // 主要方法，指定监听的元素
  // 需要确保被监听的元素已经渲染完毕，
  // 那么选中该元素内的文本（选区）将根据该元素的位置定位并且显示「浮动的编辑器」
  fromSelect (nodeName) {
    const node = document.getElementById(nodeName);
    if (!node) {
      throw new ReferenceError(`不存在 id 是 ${nodeName} 的 HTML 元素`);
    }
    node.ariaLabel = 'select-editor-toolbar'; // 用于遍历节点树返回 nodeNames 数组的边界
    this.initSelectNodeConfig(node);
  }

  fromSelects (nodeName) {
    const nodes = document.getElementsByClassName(nodeName);
    nodes.forEach(node => {
      node.ariaLabel = 'select-editor-toolbar';
      this.initSelectNodeConfig(node);
    })
  }

  initSelectNodeConfig (node) {
    node.addEventListener('mouseup', () => {
      const selection = window.getSelection();
      // range.collapsed 是内置的判断起点与终点是否在同一个位置
      // 如果是同一个位置那么判断为没有选中
      if (selection.isCollapsed) {
        return;
      }
      // 选中文本以后，浮动显示编辑器
      this.selectionConfig = this.getSelectionConfig(selection);
      this.editorPoi = utils.getRangeAbsPoi(this.selectionConfig.range);
      this.container = node;
      this.$instance.visible = true;
      this.$instance.absPoi = this.editorPoi;
    });
    // 阻止文本换行
    node.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.keyCode === 13) {
        e.preventDefault();
      }
    });
  }

  getSelectionConfig (selection) {
    const range = selection.getRangeAt(0);
    let parentNode = range.commonAncestorContainer;
    if (parentNode.nodeType === 3) {
      parentNode = parentNode.parentElement;
    }
    return {
      parentNode,
      range: this.createCurrentRange(selection),
      endNodeNames: utils.getRangeNodesName(range.endContainer), // 选区末尾节点包含的节点树
      startNodeNames: utils.getRangeNodesName(range.startContainer), // 选区开始节点包含的节点树
      fragment: range.cloneContents(),
      string: range.toString(),
    };
  }

  createCurrentRange (selection) {
    const { anchorNode, anchorOffset, focusNode, focusOffset } = selection;
    const range = document.createRange();
    range.setStart(anchorNode, anchorOffset);
    range.setEnd(focusNode, focusOffset);
    return range.cloneRange();
  }
}

export default Editor;
