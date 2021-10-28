<template>
  <div class="box">
    <div class="btn-group">
      <div>列表</div>
      <Form ref="form" :model="form" :rules="rules" :label-width="100">
        <FormItem label="表格类型" prop="tableType">
          <RadioGroup v-model="form.tableType">
            <Radio label="one">单一表格</Radio>
            <Radio label="two" disabled>上下表格</Radio>
          </RadioGroup>
        </FormItem>
        <!-- 单一表格 -->
        <div v-show="form.tableType === 'one'">
          <FormItem label="是否需要查询条件" prop="needQuery">
            <RadioGroup v-model="form.needQuery">
              <Radio label="1">不需要</Radio>
              <Radio label="2">需要</Radio>
            </RadioGroup>
          </FormItem>
          <div v-show="form.needQuery === '2'">
            <FormItem label="行数" prop="rows">
              <InputNumber v-model="form.rows" :min="1" :max="10"></InputNumber>
            </FormItem>
            <FormItem label="列数" prop="cols">
              <InputNumber v-model="form.cols" :min="1" :max="10"></InputNumber>
            </FormItem>
            <FormItem label="">
              <Button type="primary" size="small" @click="createCols">生成列数据</Button>
            </FormItem>
            <div v-for="(item, index) in form.allCols" :key="index">
              <div>第{{index + 1}}列</div>
              <FormItem label="类型"
                prop="">
                <Select v-model="item.type">
                  <Option value="Input">输入框</Option>
                  <Option value="Select">下拉框</Option>
                  <Option value="Btns">按钮组</Option>
                </Select>
              </FormItem>
              <FormItem label="位置" prop="">
                <RadioGroup v-model="item.position">
                  <Radio label="start">居左</Radio>
                  <Radio label="center">居中</Radio>
                  <Radio label="end">居右</Radio>
                  <!-- <Radio label="space-around">spaceAround</Radio>
                  <Radio label="space-between">spaceBetween</Radio> -->
                </RadioGroup>
              </FormItem>
              <div v-if="item.type === 'Input'">
                <FormItem label="label" prop="">
                  <Input v-model="item.label" />
                </FormItem>
                <FormItem label="vModel值" prop="">
                  <Input v-model="item.input.vModel" />
                </FormItem>
                <FormItem label="placeholder" prop="">
                  <Input v-model="item.input.placeholder" />
                </FormItem>
                <FormItem label="是否可清除" prop="">
                  <RadioGroup v-model="item.input.canClear">
                    <Radio label="1">不需要</Radio>
                    <Radio label="2">需要</Radio>
                  </RadioGroup>
                </FormItem>
              </div>
              <div v-if="item.type === 'Btns'">
                <FormItem label="按钮个数" prop="">
                  <Input-Number v-model="item.count" />
                </FormItem>
                <div v-for="(btn, index) in item.btns" :key="'btn' + index">
                  <div>第{{index + 1}}个按钮</div>
                  <FormItem label="按钮名称" prop="">
                    <Input v-model="btn.label" />
                  </FormItem>
                  <FormItem label="按钮类型" prop="">
                    <Select v-model="btn.type">
                      <Option value="warning">橙色</Option>
                      <Option value="primary">蓝色</Option>
                      <Option value="success">绿色</Option>
                      <Option value="error">红色</Option>
                      <Option value="0">默认（无）</Option>
                    </Select>
                  </FormItem>
                  <FormItem label="方法名称" prop="">
                    <Input v-model="btn.fun" />
                  </FormItem>
                </div>
              </div>
            </div>
          </div>
          <FormItem label="表头信息" prop="tHead">
            <Input type="textarea" :rows="10" v-model="form.tHead" />
          </FormItem>
          <FormItem label="表体信息" prop="tBodyInfo">
            <Input type="textarea" :rows="10" v-model="form.tBodyInfo" />
          </FormItem>
          <FormItem v-show="form.tableType === 'one'" label="是否分页" prop="needPageOne">
            <RadioGroup v-model="form.needPageOne">
              <Radio label="1">否</Radio>
              <Radio label="2">是</Radio>
            </RadioGroup>
          </FormItem>
        </div>
        <!-- <FormItem label="是否分页" prop="needPageTwo">
          <RadioGroup v-model="form.needPageTwo">
            <Radio label="1">不需要分页</Radio>
            <Radio label="2">上表格分页</Radio>
            <Radio label="3">下表格分页</Radio>
            <Radio label="4">全表格分页</Radio>
          </RadioGroup>
        </FormItem> -->
      </Form>
      <Row type="flex" justify="center">
        <Button type="warning" @click="createPage" :loading="isLoadCreate">生成页面</Button>
        <Button class="ml10" type="success" @click="copy" :loading="isLoadCopy">复制到剪切板</Button>
      </Row>
    </div>
    <div class="content">
      <code-mirror :code="htmlStr"></code-mirror>
    </div>
  </div>
</template>
<script>
import CodeMirror from '@/components/codemirror'
// import parserBabel from '@babel/parser'
import { utils } from '@/assets/js/common.js'
// import prettier from 'prettier/standalone'
// import parserBabel from 'prettier/parser-babel'

// const inputObj = {
//   position: 'left', // 摆放方式：居左；居中；居右
//   type: 'Input', // 存放组件：单选，多选，输入，下拉，层级，时间
//   label: '', // 标题名称
//   input: { // 输入框相关内容
//     placeholder: '请输入',
//     canClear: '2',
//     vModel: ''
//   }
// }
// const btnsObj = {
//   position: 'left',
//   type: 'Btns',
//   label: '',
//   count: 3, // 按钮个数
//   btns: [
//     {
//       label: '', // 按钮名称
//       type: '', // 按钮类型
//       fun: '', // 按钮方法名
//     }
//   ]
// }
export default {
  name: 'createPage',
  components: {
    CodeMirror
  },
  data () {
    return {
      form: {
        tableType: 'one',
        needQuery: '2',
        rows: 2,
        cols: 2,
        allCols: [
          {
            position: 'left',
            type: 'Input',
            label: '测试1',
            input: {
              placeholder: '测1',
              canClear: '1',
              vModel: 'test1'
            }
          },
          {
            position: 'left',
            type: 'Input',
            label: '测试2',
            input: {
              placeholder: '测2',
              canClear: '2',
              vModel: 'test2'
            }
          },
          {
            position: 'left',
            type: 'Input',
            label: '测试3',
            input: {
              placeholder: '测3',
              canClear: '2',
              vModel: 'test3'
            }
          },
          {
            position: 'end',
            type: 'Btns',
            label: '测试4',
            count: 2,
            btns: [
              {
                label: '查询',
                type: 'success',
                fun: 'queryData'
              },
              {
                label: '新建',
                type: 'primary',
                fun: 'goCreate'
              }
            ]
          }
        ],
        tHead: `
        {
          key: 'id',
          title: 'ID'
        },
        {
          key: 'title',
          title: '标题'
        }
        `,
        tBodyInfo: '',
        needPageOne: '2',
        needPageTwo: ''
      },
      rules: {},
      htmlStr: '',
      isLoadCreate: false,
      isLoadCopy: false,
      btnsGroup: [] // 按钮数据
    }
  },
  methods: {
    async copy () {
      this.isLoadCopy = true
      try {
        await utils.copyToClipboard(this.htmlStr)
        console.log('复制成功')
      } catch (error) {
        console.log(error)
      } finally {
        this.isLoadCopy = false
      }
    },
    createPage () {
      this.isLoadCreate = true
      // 单一表格
      const tempAllCols = JSON.parse(JSON.stringify(this.form.allCols))
      if (this.form.tableType === 'one') {
        let str = '<template><div>'
        if (this.form.needQuery === '2') { // 需要查询条件
          str += '<Form ref="formListOne" :model="formListOne" :label-width="90">'
          for (let i = 1; i <= this.form.rows; i++) { // 行处理
            str += '<Row>'
            for (let j = 1; j <= this.form.cols; j++) { // 处理列
              str += `<i-col span="${parseInt(24 / this.form.cols)}">`
              const items = tempAllCols.splice(0, 1)
              if (items.length > 0) {
                const item = items[0]
                if (item) {
                  str += `<Form-item label="${item.label}">`
                  if (item.type === 'Input') { // 普通输入框
                    str += `<Input placeholder="${item.input.placeholder}" v-model.trim="formListOne.${item.input.vModel}"`
                    if (item.input.canClear === '2') {
                      str += ' clearable'
                    }
                    str += ' />'
                  } else if (item.type === 'Btns') { // 按钮列
                    if (item.position !== 'start') {
                      str += `<Row type="flex" justify="${item.position}">`
                    }
                    item.btns.forEach(btn => {
                      str += '<Button class="ml5"'
                      if (btn.type !== '') {
                        str += `type="${btn.type}"`
                      }
                      str += `@click="${btn.fun}"`
                      str += `>${btn.label}</Button>`
                    })
                    if (item.position !== 'start') {
                      str += '</Row>'
                    }
                  }
                  str += '</Form-item>'
                }
              }
              str += '</i-col>'
            }
            str += '</Row>'
          }
          str += '</Form>'
        }
        if (this.form.tHead) {
          str += '<Table border :columns="tHead" :loading="isLoad" :data="tData">'
          if (this.form.tBodyInfo) {
            str += this.form.tBodyInfo
          }
          str += '</Table>'
        }
        if (this.form.needPageOne === '2') { // 需要分页
          str += '<gk-admin-pages2 class="mt10" ref="pages" @changeSize="changeSize" @changePage="changePage"></gk-admin-pages2>'
        }
        str += '</div></template>'
        str += `<script>
        export default {`
        str += 'components: {},'
        str += 'props: {},'
        if (this.form.tableType === 'one') { // 单一表格
          str += 'data () {'
          str += 'return {'
          let hasBtns = false // 是否有操作按钮
          str += 'formList: {'
          this.btnsGroup = []
          if (this.form.allCols.length > 0) {
            console.log(this.form.allCols)
            this.form.allCols.forEach((item, index) => {
              if (item.type === 'Input') { // TODO 添加组件判断
                str += `${item.input.vModel}: ''`
                if (index !== this.form.allCols.length - 1) {
                  str += ','
                }
              }
              if (item.type === 'Btns') { // 有按钮组
                this.btnsGroup.push(item)
                hasBtns = true
              }
            })
          }
          str += '},'
          if (this.form.needPageOne === '2') { // 分页
            str += `currentPage: 1,
            pageSize: 10`
          }
          str += '}'
          str += '},'
          str += 'methods: {'
          let pageStr = ''
          if (this.form.needPageOne === '2') { // 分页
            pageStr += `
              changePage (pageNum) {
                this.currentPage = pageNum
                this.query()
              },
              changeSize (pageSize) {
                this.pageSize = pageSize
                this.queryData()
              },
              queryData () {
                this.currentPage = 1
                this.query()
              },
              async query () {
                this.isLoad = true
                let params = {}
                try {
                  let {list, page} = await xxx(params)
                  list.forEach(item => {

                  });
                  this.tData = list
                  this.$refs.pages.initPage({
                    ...page,
                    size: this.pageSize,
                    current: this.currentPage
                  })
                } catch (error) {
                  myUtil.errorPrompt(error)
                } finally {
                  this.isLoad = false
                }
              }
            `
          }
          if (hasBtns) { // 有查询等按钮
            this.btnsGroup.forEach(btns => {
              btns.btns.forEach((btn, index) => {
                // 是否方法名在页面中出现，出现不写入，没出现写入。
                // TODO !!!方法判断不严谨
                if (pageStr.indexOf(btn.fun) === -1) {
                  str += `${btn.fun}() {},`
                }
              })
            })
          }
          str += pageStr
          str += '},'
          str += `
            mounted () {
              this.queryData()
            },
            created () {}
          `
        }
        // eslint-disable-next-line
        str += `}<\/script>`
        this.htmlStr = ''
        console.log('str::', str)
        // this.htmlStr = prettier.format(str, {
        //   semi: false,
        //   parser: 'babel',
        //   plugins: [parserBabel]
        // })
        this.htmlStr = str
        this.isLoadCreate = false
      }
    },
    createCols () {
      // if (this.form.rows > 0 && this.form.cols > 0) {
      //   this.form.allCols = []
      //   for (let i = 0; i < (this.form.rows * this.form.cols); i++) {
      //     // this.form.allCols.push(JSON.parse(JSON.stringify(tempObj)))
      //   }
      // }
    }
  }
}
</script>
<style lang="less">
  .box {
    display: flex;
    height: 100%;
    .btn-group {
      width: 30%;
      height: 100%;
      overflow-y: auto;
      padding: 20px;
      border-right: 1px solid #ccc;
    }
    .content {
      width: 70%;
      padding: 10px;
    }
  }
</style>
