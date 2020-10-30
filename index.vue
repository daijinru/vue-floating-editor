<template>
  <div class="main-wrapper">
    <div contenteditable class="editor" id="editorWrapperA">
      吴兴号水晶宫，荷花盛丽。陈简斋云：“今年何以报君恩，一路荷花相送到青墩。”亦可见矣。丁未之夏，予游千岩，数往来红香中，自度此曲，以无射宫歌之。
    </div>
    <div contenteditable class="editor" id="editorWrapperB">
      簟枕邀凉，琴书换日，睡余无力。细洒冰泉，并刀破甘碧。墙头唤酒，谁问讯、城南诗客。岑寂，高柳晚蝉，说西风消息。
    </div>
  </div>
</template>

<script>
import Editor from './SelectEditorToolbar';
import 'element-ui/lib/theme-chalk/index.css';
const editor = new Editor();
export default {
  data: () => ({}),
  mounted () {
    editor.fromSelect('editorWrapperA');
    editor.fromSelect('editorWrapperB');
  }
}
</script>

<style scoped>
.main-wrapper {
  min-width: 300px;
  margin: 0 auto;
  margin-top: 32px;
}
.editor {
  min-height: 24px;
  border: 1px solid #ccc;
  margin-bottom: 16px;
  padding: 8px;
}
</style>
