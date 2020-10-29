import Vue from 'vue';
import indexVue from './index.vue';
import utils from './utils';

class Editor {
  // 设定值
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
    const EditorCtor = Vue.extend(indexVue);
    if (!this.$instance) {
      this.$instance = new EditorCtor({
        el: document.createElement('div')
      });
    }
    document.body.appendChild(this.$instance.$el);
  }

  initButtonsEvent () {
    Array.from(document.getElementsByClassName('v-format-action')).forEach(action => {
      action.addEventListener('click', e => {
        console.log(e);
        const { currentRange } = this.selectionConfig;
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(currentRange);
        const format = e.currentTarget.dataset.format;

        // 如果选区文本包含 b 节点，并且当前使用加粗则清除其红色
        if (format === 'bold') {
          if (this.isRangeContainsBold()) {
            document.execCommand('foreColor', false, '#000');
          } else {
            document.execCommand('foreColor', false, '#e33e33');
          }
        } else if (format === 'underline') {
          document.execCommand(format);
        }
        this.container.focus();
      });
    });
  }

  isRangeContainsBold () {
    const { nodeNames, parentNode } = this.selectionConfig;
    return nodeNames.includes('b') || parentNode.color === '#e33e33';
  }

  // 主要方法，指定监听的元素
  // 需要确保被监听的元素已经渲染完毕，
  // 那么选中该元素内的文本（选区）将根据该元素的位置定位并且显示「浮动的编辑器」
  fromSelect (nodeName) {
    const node = document.getElementById(nodeName);
    if (!node) {
      throw new ReferenceError(`不存在 id 是 ${nodeName} 的 HTML 元素`);
    }
    this.initSelectNodeConfig(node);
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
      console.log(selection);
      console.log(this.selectionConfig);
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
      range,
      currentRange: this.createCurrentRange(selection),
      parentNode,
      nodeNames: utils.getRangeNodesName(range.cloneContents().childNodes),
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
