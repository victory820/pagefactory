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
              <div v-show="item.type === 'Input'">
                <FormItem label="位置" prop="">
                  <RadioGroup v-model="item.position">
                    <Radio label="left">居左</Radio>
                    <Radio label="center">居中</Radio>
                    <Radio label="right">居右</Radio>
                  </RadioGroup>
                </FormItem>
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
        <Button type="warning" @click="createPage">生成页面</Button>
      </Row>
    </div>
    <div class="content">
      预览
      <div>{{htmlStr}}</div>
    </div>
  </div>
</template>
<script>
// const tempObj = {
//   position: 'left', // 摆放方式：居左；居中；居右
//   type: 'Input', // 存放组件：单选，多选，输入，下拉，层级，时间
//   label: '', // 标题名称
//   input: { // 输入框相关内容
//     placeholder: '请输入',
//     canClear: '2',
//     vModel: ''
//   }
// }
export default {
  name: 'createPage',
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
            position: 'left',
            type: 'Input',
            label: '测试4',
            input: {
              placeholder: '测4',
              canClear: '2',
              vModel: 'test4'
            }
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
      htmlStr: ''
    }
  },
  methods: {
    createPage () {
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
        str += '<script>'
        str += 'components: {},'
        str += 'props: {},'
        str += 'data () {'
        str += 'return {'
        let hasBtns = false // 是否有操作按钮
        if (this.form.tableType === 'one') { // 单一表格
          str += 'formList: {'
          if (this.form.allCols.length > 0) {
            this.form.allCols.forEach(item => {
              if (item.type === 'Input') { // TODO 添加组件判断
                str += `${item.vModel}`
              }
              if (item.type === 'Btns') { // 有按钮组
                hasBtns = true
              }
            })
          }
          str += '}'
          if (this.form.needPageOne === '2') { // 分页
            str += `currentPage: 1,
            pageSize: 10`
          }
          str += '}'
          str += '},'
          str += 'methods: {'
          if (hasBtns) {

          }
          if (this.form.needPageOne === '2') { // 分页
            str += `
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
          str += '},'
          str += `
            mounted () {},
            created () {}
          `
        }
        str += '</script>'
        this.htmlStr = ''
        this.htmlStr = str
        console.log(str)
      }
    },
    createCols () {
      if (this.form.rows > 0 && this.form.cols > 0) {
        this.form.allCols = []
        for (let i = 0; i < (this.form.rows * this.form.cols); i++) {
          // this.form.allCols.push(JSON.parse(JSON.stringify(tempObj)))
        }
      }
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
