// 示例 7：widget 控件一览（index.html → panel-widgets）
import { AutoStore, configurable } from 'autostore'
import { html } from 'lit'
import type { AutostoreViewer } from '../../src/autostore-viewer'

// 创建示例 7：widget 控件一览（编辑控件由 schema.widget 决定，ADR-0023）
const store7 = new AutoStore({
  // —— 文本家族 ——
  text: {
    plain: configurable('AutoStore', {
      label: '文本',
      widget: 'text',
      help: '标准单行输入框（required：清空后控件下方实时显示红色错误）',
      placeholder: '请输入文本',
      required: true,
    }),
    email: configurable('user@example.com', {
      label: '邮箱',
      widget: 'email',
      help: '邮箱输入框 + validate 校验',
      validate: (val) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(val),
      errorMessage: '{label}格式无效',
    }),
    password: configurable('secret', { label: '密码', widget: 'password', help: '密码输入框' }),
    url: configurable('https://autostore.run', { label: '网址', widget: 'url', help: 'URL 输入框' }),
    multiline: configurable('第一行\n第二行', {
      label: '多行文本',
      widget: 'textarea',
      help: '多行文本域：Enter 换行，输入合法 JSON 即生效（本组为普通文本即时写入）',
      rows: 4,
      maxLength: 200,
    }),
  },

  // —— 数值与日期家族 ——
  value: {
    count: configurable(8, {
      label: '数量',
      widget: 'number',
      help: '数字输入框（min/max/step 原生透传）',
      min: 1,
      max: 100,
      step: 1,
    }),
    budget: configurable(5000, {
      label: '预算',
      widget: 'number',
      prefix: '¥',
      help: '值装饰 prefix/suffix：纯展示拼接在值文本前后，不属于值本身（编辑写回裸值）',
      min: 0,
      step: 100,
    }),
    volume: configurable(0.6, { label: '音量', widget: 'range', help: '滑块', min: 0, max: 1, step: 0.1 }),
    theme: configurable('#3b82f6', { label: '主题色', widget: 'color', help: '颜色选择器' }),
    birthday: configurable('2000-01-01', { label: '生日', widget: 'date', help: '日期选择器' }),
    alarm: configurable('08:30', { label: '闹钟', widget: 'time', help: '时间选择器' }),
    meeting: configurable('2026-01-01T09:00', { label: '会议', widget: 'datetime-local', help: '日期时间选择器' }),
    month: configurable('2026-01', { label: '月份', widget: 'month', help: '月份选择器' }),
    week: configurable('2026-W01', { label: '周数', widget: 'week', help: '周选择器' }),
  },

  // —— 选项家族 ——
  choice: {
    lang: configurable('ts', {
      label: '语言',
      widget: 'select',
      help: '下拉单选（候选项来自 choices，写回保留 value 原类型）',
      choices: [
        { label: 'TypeScript', value: 'ts' },
        { label: 'JavaScript', value: 'js' },
        { label: 'Python', value: 'py' },
      ],
    }),
    tags: configurable(['ts', 'go'], {
      label: '技术栈',
      widget: 'select',
      help: '下拉多选（multiple，值为所选 value 数组）',
      multiple: true,
      choices: [
        { label: 'TypeScript', value: 'ts' },
        { label: 'JavaScript', value: 'js' },
        { label: 'Go', value: 'go' },
        { label: 'Rust', value: 'rust' },
      ],
    }),
    level: configurable('mid', {
      label: '级别',
      widget: 'radio',
      help: '单选按钮组',
      choices: [
        { label: '初级', value: 'junior' },
        { label: '中级', value: 'mid' },
        { label: '高级', value: 'senior' },
      ],
    }),
    shell: configurable('zsh', {
      label: '默认 Shell',
      widget: 'combobox',
      help: '输入框 + datalist 候选项（可自由输入亦可选择）',
      choices: ['bash', 'zsh', 'fish', 'pwsh'],
    }),
    mode: configurable('on', {
      label: '开关',
      widget: 'checkbox',
      help: '带双值选项对的复选框（勾选=on / 取消=off，勾选框旁显示当前项 label）',
      choices: [
        { label: '开', value: 'on' },
        { label: '关', value: 'off' },
      ],
    }),
    boost: configurable('yes', {
      label: '加速',
      widget: 'checkbox',
      switchValues: ['yes', 'no'],
      help: 'switchValues 双值档位：勾选写回 yes / 取消写回 no，勾选框旁显示当前值（字符串项才有文案，boolean 档不显示）',
    }),
    autoSave: configurable(false, {
      label: '自动保存',
      widget: 'checkbox',
      checkLabel: '开启后自动写入',
      help: 'checkLabel 固定文案：查看/编辑两态均显示在勾选框旁，优先级高于 choices/switchValues',
    }),
    agree: configurable(false, { label: '同意条款', widget: 'checkbox', help: '普通 boolean 复选框（无任何文案）' }),
  },

  // —— 校验演示 ——
  valid: {
    requiredField: configurable('', {
      label: '必填字段',
      widget: 'text',
      help: 'required：确认为空值时控件下方显示红色错误，修正后错误隐藏',
      required: true,
    }),
    rangeField: configurable(5, {
      label: '范围字段',
      widget: 'number',
      help: 'validate：1~10 之外实时显示红色错误且暂不写入',
      validate: (val) => val >= 1 && val <= 10,
      errorMessage: '{label}须在 1 ~ 10 之间',
    }),
  },

  // —— 回落演示 ——
  fallback: {
    unknown: configurable('x', {
      label: '未知 widget',
      widget: 'cron',
      help: '未注册的 widget 一律回落为标准文本输入框',
    }),
    hidden: configurable('y', { label: 'hidden', widget: 'hidden', help: 'hidden 无编辑意义，回落文本输入框' }),
  },

  // —— 对象整体编辑 ——
  plainObject: configurable({
    note: '本对象无 configurable 成员',
    tips: '双击本行即进入 JSON 整体编辑（textarea）',
    ok: true,
  },{label:"简单对象"}),
  withConfigurable: {
    note: configurable('对象含 configurable 成员', { label: '说明' }),
    extra: 'configurable 容器同样渲染子节点，整容器与各成员均可编辑',
  },
  collapsedContainer: configurable(
    { host: 'localhost', port: 8080, debug: false },
    {
      label: '服务器配置',
      help: 'configurable 容器：子节点正常渲染，整容器双击进入 JSON 整体编辑',
    }
  ),
  iconDemo: configurable('home', {
    label: '自定义图标',
    widget: 'text',
    icon: 'home',
    help: 'schema.icon=home 不在内置库：自动经 icon-url 从 iconify 批量拉取（图标演示详见 Icons 图标 tab）',
  }),
  // —— 值渲染钩子（toView / toRender，ADR-0025）——
  toViewDemo: configurable('重要', {
    label: '自定义查看',
    widget: 'text',
    help: 'toView 返回 HTML 字符串：查看态渲染为红色加粗，双击仍进入标准编辑器',
    toView: (val: any) => `<b style="color:#dc2626">${val}</b>`,
  }),
  toRenderDemo: configurable('hello', {
    label: '自定义编辑',
    help: 'toRender 替代默认编辑器：自定义控件自理写回（直接改 store，即时生效）',
    toRender: (value: string) => html`<input
      class="edit-input"
      .value=${value}
      @input=${(e: Event) => {
        store7.state.toRenderDemo = (e.target as HTMLInputElement).value
      }}
    />`,
  }),
})

const viewer7 = document.getElementById('viewer7') as AutostoreViewer
viewer7.store = store7
