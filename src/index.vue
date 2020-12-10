<template>
  <div
    id="selectEditorToolbar"
    :class="{ 'hidden': !visible }"
    :style="poi"
  >
    <Card>
      <Tooltip content="红色强调" placement="bottom">
        <div
          class="format-btn v-format-action"
          data-format="bold"
          aria-label="editor-toolbar"
        >
          <img
            data-format="bold"
            aria-label="editor-toolbar"
            class="icon"
            src="./icons/emphasis.png">
        </div>
      </Tooltip>
      <Tooltip content="数据加密" placement="bottom" v-if="settings.underline.show">
        <div
          class="format-btn v-format-action"
          data-format="underline"
          aria-label="editor-toolbar"
        >
          <img
            data-format="underline"
            aria-label="editor-toolbar"
            class="icon"
            src="./icons/desensitization.png">
        </div>
      </Tooltip>
      <Tooltip content="清除格式" placement="bottom">
        <div
          class="format-btn v-format-action"
          data-format="removeFormat"
          aria-label="editor-toolbar"
        >
          <img
            data-format="removeFormat"
            aria-label="editor-toolbar"
            class="icon"
            src="./icons/removeFormat.png">
        </div>
      </Tooltip>
    </Card>
  </div>
</template>

<script>
import {
  Card,
  Tooltip,
  Button,
} from 'element-ui';
export default {
  components: {
    Card,
    Tooltip,
    // Button,
  },
  data () {
    return {
      absPoi: {
        left: 0,
        top: 0,
      },
      visible: false,
      settings: {
        underline: {
          show: true,
        },
      }
    };
  },
  computed: {
    poi () {
      return {
        left: this.absPoi.left + 'px',
        top: this.absPoi.top + 'px',
      };
    }
  }
};
</script>

<style lang="scss" scoped>
#selectEditorToolbar {
  z-index: 10000;
  position: fixed;
  height: auto;

  &.hidden {
    display: none;
  }

  .format-btn {
    margin: 4px;

    display: inline-block;
    cursor: pointer;

    &:hover {
      background-color: #a6a9ad;
    }

    img.icon {
      display: inline-block;
      width: 32px;
    }
  }
}
</style>

<style>
#selectEditorToolbar .el-card__body {
  padding: 4px;
}
</style>
