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
          <svg
            t="1603785291942"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="10821"
            aria-label="editor-toolbar"
          >
            <path aria-label="editor-toolbar" d="M832 896H730.56l-72.576-210.24H361.856L293.44 896H192l270.848-768h98.24L832 896zM629.504 598.976L522.112 279.68c-3.392-10.176-7.04-28.096-11.008-53.504H508.8c-3.392 23.168-7.232 40.96-11.456 53.504l-106.56 319.296h238.72z" p-id="10822" fill="#d81e06" />
          </svg>
        </div>
      </Tooltip>
      <Tooltip content="数据加密" placement="bottom" offset="20">
        <div
          class="format-btn v-format-action"
          data-format="underline"
          aria-label="editor-toolbar"
        >
        <svg
          t="1603787384143"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="3394"
          aria-label="editor-toolbar"
        >
            <path aria-label="editor-toolbar" d="M905.7 216.3c0-30.2-1.2-60-3.7-89.3-0.7-8.5-6.8-15.7-15.1-17.8C770.4 80 644 64 512 64s-258.4 16-375 45.3c-8.3 2.1-14.4 9.2-15.1 17.8-2.4 29.3-3.7 59.1-3.7 89.3 0 344.9 161.3 637.6 385.3 741.8 5.3 2.5 11.5 2.5 16.9 0 224-104.2 385.3-397 385.3-741.9z" p-id="3395" fill="#d81e06" />
        </svg>
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
    width: 22px;
    height: 22px;
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
