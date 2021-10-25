<template>
  <div style="display: flex;">
    <div id="content" style="width: 70%; height: 100%; border: 1px solid #333;">
      <Row>
        <Row type="flex" justify="end">
          <i-col style="line-height: 32px;">
            共 {{ total }} 条数据,当前 {{ start }} - {{ end }} 条
          </i-col>
        </Row>
        <Table class="mt20" border :loading="isLoad" :columns="tHead" :data="tData">
          <template slot-scope="{ row }" slot="action">
            <Button type="primary" size="small" style="margin: 2px" @click="test(row)">test1</Button>
            <Button type="primary" size="small" style="margin: 2px" @click="test">test2</Button>
          </template>
        </Table>
        <Row type="flex" justify="end" style="margin-top: 20px;">
          <i-col>
              <Page :current="currentPage"
                    :total="total"
                    show-sizer
                    :page-size="pageSize"
                    :page-size-opts="pageSizeOpts"
                    @on-page-size-change="changePageSize"
                    @on-change="changePage"></Page>
          </i-col>
        </Row>
      </Row>
    </div>
    <div style="width: 30%; height: 100%; border: 1px solid red;">
      <Form ref="form" :model="form" :rules="rules" :label-width="80">
        <FormItem label="组件类型">
          <RadioGroup v-model="form.type">
            <Radio label="tablePage">表格带分页</Radio>
            <Radio label="tableNoPage">表格</Radio>
          </RadioGroup>
        </FormItem>
        <div>分页信息相关</div>
        <FormItem label="页码变更方法名">
          <Input v-model="form.pageName"/>
        </FormItem>
        <FormItem label="页size变更方法名">
          <Input v-model="form.pageSizeName"/>
        </FormItem>
        <div>表格信息相关</div>
        <FormItem label="表头变量名">
          <Input v-model="form.tHeadName"/>
        </FormItem>
        <FormItem label="表体变量名">
          <Input v-model="form.tBodyName"/>
        </FormItem>
        <div>表格内列信息</div>
        <FormItem :label="`第${index+1}列`" v-for="(item, index) in form.colInfos" :key="'col' + index">
          <div style="display: flex;">
            <div>
              <div class="every-col-info-box" style="">
                <span class="every-col-info-title" style="">title名:</span>
                <Input v-model="item.title"/>
              </div>
              <div class="every-col-info-box" style="">
                <span class="every-col-info-title" style="">key名:</span>
                <Input v-model="item.key" placeholder=""/>
              </div>
              <div class="every-col-info-box" style="">
                <span class="every-col-info-title" style="">solt名:</span>
                <Input v-model="item.solt"/>
              </div>
              <div class="every-col-info-box" style="">
                <span class="every-col-info-title" style="">显示依赖的字段:</span>
                <Input v-model="item.showCondition"/>
              </div>
              <div class="every-col-info-box" style="">
                <span class="every-col-info-title" style="">显示依赖的字段值:</span>
                <Input v-model="item.showCondition"/>
              </div>
            </div>
            <div style="width: 60px;">
              <Button type="error" size="small" @click="delCol(index)">删除</Button>
            </div>
          </div>
        </FormItem>
        <FormItem label="是否需要按钮列">
          <RadioGroup v-model="form.isNeedBtnCol">
            <Radio label="1">需要</Radio>
            <Radio label="2">不需要</Radio>
          </RadioGroup>
        </FormItem>
        <Button type="primary" @click="addCol">添加列信息</Button>
        <div>表格内按钮信息</div>
        <FormItem :label="`第${index+1}个按钮`" v-for="(item, index) in form.btns" :key="'btn' + index">
          <div style="display: flex;">
            <div>
              <div class="every-col-info-box" style="">
                <span class="every-col-info-title" style="">名称:</span>
                <Input v-model="item.name"/>
              </div>
              <div class="every-col-info-box" style="">
                <span class="every-col-info-title" style="">方法名:</span>
                <Input v-model="item.fun"/>
              </div>
            </div>
            <div style="width: 60px;">
              <Button type="error" size="small" @click="delBtn(index)">删除</Button>
            </div>
          </div>
        </FormItem>
        <Button type="primary" @click="addBtn">添加按钮信息</Button>
      </Form>
      <Row type="flex" justify="center">
        <Button type="warning" @click="submit">生成页面</Button>
      </Row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      isLoad: false,
      tHead: [
        {
          title: 'id',
          key: 'id',
          align: 'center'
        },
        {
          title: '姓名',
          key: 'name',
          align: 'center'
        },
        {
          title: '操作',
          slot: 'action',
          align: 'center',
          width: 200
        }
      ],
      tData: [
        {
          id: 1,
          name: 'zs'
        }
      ],
      pageSizeOpts: [10, 25, 50, 100],
      total: 0,
      start: 0,
      end: 0,
      pageSize: 10,
      currentPage: 1,
      // ===================================
      form: {
        type: '',
        pageName: 'changePage',
        pageSizeName: 'changePageSize',
        tHeadName: 'tHead',
        tBodyName: 'tData',
        colInfos: [
          // {
          //   title: '',
          //   key: '',
          //   slot: ''
          //   result
          // }
        ],
        isNeedBtnCol: '2', // 1需要2不需要
        btns: [
          // {
          //   name: '',
          //   fun: ''
          // }
        ]
      },
      rules: {},
      scriptTag: 'script'
    }
  },
  methods: {
    changePageSize () {},
    changePage () {},
    test () {},
    submit () {
      console.log('生成')
      const str = `
        <template>
          <Row>
            <Row type="flex" justify="end">
              <i-col style="line-height: 32px;">
                共 {{ total }} 条数据,当前 {{ start }} - {{ end }} 条
              </i-col>
            </Row>
            <Table class="mt20" border :loading="isLoad" :columns="${this.form.tHeadName}" :data="${this.form.tBodyName}">
              <template slot-scope="{ row }" slot="action">
                <Button type="primary" size="small" style="margin: 2px" @click="test(row)">test1</Button>
                <Button type="primary" size="small" style="margin: 2px" @click="test">test2</Button>
              </template>
            </Table>
            <Row type="flex" justify="end" style="margin-top: 20px;">
              <i-col>
                <Page :current="currentPage"
                      :total="total"
                      show-sizer
                      :page-size="pageSize"
                      :page-size-opts="pageSizeOpts"
                      @on-page-size-change="changePageSize"
                      @on-change="changePage"></Page>
              </i-col>
            </Row>
          </Row>
        </template>
        <${this.scriptTag}>
          export default {
            data () {
              isLoad: false,
              ${this.form.tHeadName}: [],
              ${this.form.tBodyName}: [],
              pageSizeOpts: [10, 25, 50, 100],
              total: 0,
              start: 0,
              end: 0,
              pageSize: 10,
              currentPage: 1,
            },
            methods {

            }
          }
        </${this.scriptTag}>
        <style lang="less"></style>
      `
      console.log(str)
    },
    addCol () {
      this.form.colInfos.push({
        title: '',
        key: '',
        slot: ''
      })
    },
    delCol (index) {
      this.form.colInfos.splice(index, 1)
    },
    addBtn () {
      this.form.btns.push({
        name: '',
        fun: ''
      })
    },
    delBtn (index) {
      this.form.btns.splice(index, 1)
    }
  },
  components: {

  }
}
</script>
<style lang="less">
  .every-col-info-box {
    display: flex;
    margin-bottom: 10px;
  }
  .every-col-info-title {
    width: 80px;
  }
</style>
