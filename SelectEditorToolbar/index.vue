<template>
  <div
    id="selectEditorToolbar"
    :class="{ 'hidden': !visible }"
    :style="poi"
  >
    <Card>
      <Tooltip content="红色强调" placement="bottom" offset="20">
        <div
          class="format-btn v-format-action"
          data-format="bold"
          aria-label="editor-toolbar"
        >
          强调
        </div>
      </Tooltip>
      <Tooltip content="数据加密" placement="bottom" offset="20">
        <div
          class="format-btn v-format-action"
          data-format="underline"
          aria-label="editor-toolbar"
        >
          脱敏
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
  z-index: 99;
  position: fixed;
  height: auto;

  &.hidden {
    display: none;
  }

  .format-btn {
    // width: 22px;
    // height: 22px;
    margin: 4px;

    display: inline-block;
    cursor: pointer;

    &:hover {
      background-color: #a6a9ad;
    }
  }

  .icon {
    width: 100%;
  }
}
</style>

<style>
#selectEditorToolbar .el-card__body {
  padding: 4px;
}
</style>
