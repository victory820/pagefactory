<template>
  <codemirror class="codemirror-box"
    v-model="code"
    :options="cmOptions"
  ></codemirror>
</template>
<script>
import { codemirror } from 'vue-codemirror'
import 'codemirror/mode/javascript/javascript.js'
import 'codemirror/mode/vue/vue'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/lucario.css'

export default {
  name: 'codemirrorTool',
  components: {
    codemirror
  },
  props: {
    code: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      cmOptions: {
        tabSize: 4,
        // mode: 'text/javascript',
        mode: 'text/x-vue',
        lineNumbers: true,
        theme: 'lucario',
        readOnly: true,
        lineWrapping: true // 不出横行滚动条
      }
    }
  }
}
</script>
<style lang="less" scoped>
  .codemirror-box {
    width: 100%;
    height: 100%;
    /deep/ .CodeMirror {
      height: 100%;
    }
  }
</style>
