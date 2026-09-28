// 示例 6：docker run 命令行参数（index.html → panel-docker）
import { AutoStore, configurable } from 'autostore'
import type { AutostoreViewer } from '../../src/autostore-viewer'

// 创建示例 6：docker run 命令行参数（分组 + configurable schema）
const store6 = new AutoStore({
  // —— 基础参数 ——
  basic: configurable({
    name: configurable('my-container', {
      label: '容器名称',
      icon: "badge",
      group: '基础',
      widget: 'text',
      help: 'docker run --name，为容器指定一个名称',
      placeholder: 'my-container',
      required: true,
      validate: (val) => /^[a-zA-Z0-9][a-zA-Z0-9_.-]*$/.test(val),
      errorMessage: '{label}仅允许字母、数字、下划线、点和连字符',
      order: 1
    }),
    hostname: configurable('', {
      label: '主机名',
      icon: "dns",
      group: '基础',
      widget: 'text',
      help: 'docker run --hostname，设置容器内主机名',
      placeholder: 'container-host',
      order: 2
    }),
    workdir: configurable('/app', {
      label: '工作目录',
      icon: "folder",
      group: '基础',
      widget: 'text',
      help: 'docker run -w，设置容器内工作目录',
      placeholder: '/app',
      order: 3
    }),
    image: configurable('nginx:latest', {
      label: '镜像',
      icon: "inventory_2",
      group: '基础',
      widget: 'text',
      help: 'docker run 最后指定的镜像名:标签',
      required: true,
      validate: (val) => val.includes(':'),
      errorMessage: '{label}需包含标签，如 nginx:latest',
      order: 0
    }),
    command: configurable('', {
      label: '启动命令',
      icon: "terminal",
      group: '基础',
      widget: 'text',
      help: 'docker run 覆盖镜像默认 CMD 的命令',
      placeholder: 'docker-entrypoint.sh',
      order: 4
    }),
    envColor: configurable('#3b82f6', {
      label: '环境标识色',
      icon: "palette",
      group: '基础',
      widget: 'color',
      help: 'widget=color：查看态渲染为条形色块，编辑态为颜色选择器',
      order: 5
    })
  },{
      icon:"tune", label:"基础"
  }),

  // —— 网络参数 ——
  network: configurable({
    mode: configurable('bridge', {
      label: '网络模式',
      icon: "settings_ethernet",
      group: '网络',
      widget: 'select',
      help: 'docker run --network',
      choices: [
        { label: 'bridge（桥接）', value: 'bridge' },
        { label: 'host（宿主机）', value: 'host' },
        { label: 'none（无网络）', value: 'none' },
        { label: '自定义网络', value: 'custom' }
      ],
      order: 10
    }),
    publish: configurable('8080:80', {
      label: '端口映射',
      icon: "swap_horiz",
      group: '网络',
      widget: 'text',
      help: 'docker run -p，宿主机端口:容器端口',
      placeholder: '宿主机端口:容器端口',
      validate: (val) => /^\d+:\d+(\/(tcp|udp))?$/.test(val),
      errorMessage: '{label}格式应为 8080:80 或 53:53/udp',
      order: 11
    }),
    expose: configurable([80, 443], {
      label: '暴露端口',
      icon: "export",
      group: '网络',
      widget: 'text',
      help: 'docker run --expose，仅声明不映射的端口',
      order: 12
    }),
    dns: configurable(['8.8.8.8', '114.114.114.114'], {
      label: 'DNS 服务器',
      icon: "dns",
      group: '网络',
      help: 'docker run --dns；双击整行进入 IP 列表编辑（换行/逗号/分号/空格分隔，自动解析为数组）；展开后逐项编辑同样校验 IPv4',
      order: 13,
      // 整体校验（容器行编辑写回时把关）
      validate: (val) =>
        Array.isArray(val) &&
        val.length > 0 &&
        val.every((item: string) => /^((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.){3}(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)$/.test(item)),
      // 逐项校验（子项自身无 schema 时沿祖先回溯命中）
      itemValidate: (item: string) => /^((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.){3}(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)$/.test(item),
      errorMessage: '{label}每项须为合法 IPv4 地址（0-255 四段，如 8.8.8.8）',
      // 容器整体编辑的文本形态：数组 ⇄ 分隔文本（viewer 编辑链经 toInput/toState 消费）
      toInput: (val: any) => (Array.isArray(val) ? val.join('\n') : String(val ?? '')),
      toState: (text: string) => String(text).split(/[\s,;]+/).map((s) => s.trim()).filter(Boolean),
    })
  },{icon:"lan", label:"网络"}),

  // —— 存储参数 ——
  storage: configurable({
    volumes: configurable(['/host/data:/container/data'], {
      label: '数据卷挂载',
      icon: "save",
      group: '存储',
      widget: 'text',
      help: 'docker run -v，宿主机路径:容器路径[:ro|rw]',
      placeholder: '/host/path:/container/path',
      order: 20
    }),
    readOnlyRoot: configurable(false, {
      label: '根文件系统只读',
      icon: "lock",
      group: '存储',
      widget: 'checkbox',
      help: 'docker run --read-only，容器根目录挂载为只读',
      checkLabel: '--read-only',
      order: 21
    }),
    tmpfs: configurable(['/tmp'], {
      label: 'tmpfs 挂载',
      icon: "memory",
      group: '存储',
      widget: 'text',
      help: 'docker run --tmpfs，内存临时文件系统',
      order: 22
    }),
    volumeDriver: configurable('local', {
      label: '卷驱动',
      icon: "database",
      group: '存储',
      widget: 'select',
      help: 'docker run --volume-driver',
      choices: [
        { label: 'local（本地）', value: 'local' },
        { label: 'nfs', value: 'nfs' },
        { label: 'azure-file', value: 'azure-file' }
      ],
      order: 23
    })
  },{icon:"storage", label:"存储"}),

  // —— 环境变量 ——
  env: configurable({
    vars: configurable(['NODE_ENV=production', 'TZ=Asia/Shanghai'], {
      label: '环境变量',
      icon: "data_object",
      group: '环境',
      widget: 'text',
      help: 'docker run -e KEY=VALUE',
      placeholder: 'KEY=VALUE',
      validate: (val) => Array.isArray(val) && val.every((item) => /^[A-Za-z_][A-Za-z0-9_]*=/.test(item)),
      errorMessage: '{label}每项须为 KEY=VALUE 形式且 KEY 以字母或下划线开头',
      order: 30
    }),
    envFile: configurable('', {
      label: '环境变量文件',
      icon: "description",
      group: '环境',
      widget: 'text',
      help: 'docker run --env-file，从文件批量读取变量',
      placeholder: '.env',
      order: 31
    })
  },{
      icon:"list_alt", label:"环境变量"
  }),

  // —— 资源限制 ——
  resource: configurable({
    memory: configurable(512, {
      label: '内存限制',
      icon: "memory",
      group: '资源',
      widget: 'number',
      suffix: ' MB',
      help: 'docker run -m，容器可用内存上限——suffix 为值装饰：拼在值文本后，不属于值本身',
      min: 64,
      max: 16384,
      step: 64,
      errorMessage: '{label}须在 64 ~ 16384 MB 之间',
      validate: (val) => val >= 64 && val <= 16384,
      order: 40
    }),
    cpus: configurable(1, {
      label: 'CPU 限额',
      icon: "developer_board",
      group: '资源',
      widget: 'number',
      suffix: ' 核',
      help: 'docker run --cpus，允许使用的 CPU 核数',
      min: 0.1,
      max: 64,
      step: 0.1,
      validate: (val) => val >= 0.1 && val <= 64,
      errorMessage: '{label}须在 0.1 ~ 64 之间',
      order: 41
    }),
    shmSize: configurable(64, {
      label: '/dev/shm 大小',
      icon: "sd_card",
      group: '资源',
      widget: 'number',
      suffix: ' MB',
      help: 'docker run --shm-size——同 memory：单位由 suffix 值装饰呈现',
      min: 16,
      max: 2048,
      step: 16,
      order: 42
    }),
    cpuShares: configurable(1024, {
      label: 'CPU 权重',
      icon: "equalizer",
      group: '资源',
      widget: 'number',
      help: 'docker run --cpu-shares，相对权重（默认 1024）',
      min: 2,
      max: 262144,
      step: 2,
      order: 43
    })
  },{
      icon:"speed", label:"资源限制"
  }),

  // —— 运行行为 ——
  runtime: configurable({
    detach: configurable(true, {
      label: '后台运行',
      icon: "visibility_off",
      group: '运行',
      widget: 'checkbox',
      help: 'docker run -d，以守护进程方式运行',
      checkLabel: '-d, --detach',
      order: 50
    }),
    interactive: configurable(false, {
      label: '交互模式',
      icon: "keyboard",
      group: '运行',
      widget: 'checkbox',
      help: 'docker run -i，保持标准输入打开',
      checkLabel: '-i, --interactive',
      order: 51
    }),
    tty: configurable(false, {
      label: '伪终端',
      icon: "terminal",
      group: '运行',
      widget: 'checkbox',
      help: 'docker run -t，分配伪 TTY',
      checkLabel: '-t, --tty',
      order: 52
    }),
    rm: configurable(true, {
      label: '退出后自动删除',
      icon: "delete_sweep",
      group: '运行',
      widget: 'checkbox',
      help: 'docker run --rm，容器退出后自动删除',
      checkLabel: '--rm',
      order: 53
    }),
    restartPolicy: configurable('no', {
      label: '重启策略',
      icon: "restart_alt",
      group: '运行',
      widget: 'select',
      help: 'docker run --restart',
      choices: [
        { label: 'no（不重启）', value: 'no' },
        { label: 'always（总是重启）', value: 'always' },
        { label: 'on-failure（失败时）', value: 'on-failure' },
        { label: 'unless-stopped（除非停止）', value: 'unless-stopped' }
      ],
      order: 54
    })
  },{icon:"play_circle", label:"运行时"}),

  // —— 安全与日志 ——
  security: configurable({
    privileged: configurable(false, {
      label: '特权模式',
      icon: "admin_panel_settings",
      group: '安全',
      widget: 'checkbox',
      help: 'docker run --privileged，授予全部 Linux 能力（慎用）',
      checkLabel: '--privileged',
      order: 60
    }),
    user: configurable('', {
      label: '运行用户',
      icon: "person",
      group: '安全',
      widget: 'text',
      help: 'docker run -u，如 root、1000:1000、appuser',
      placeholder: 'uid[:gid] 或用户名',
      order: 61
    }),
    capAdd: configurable(['NET_ADMIN'], {
      label: '新增能力',
      icon: "add_moderator",
      group: '安全',
      widget: 'text',
      help: 'docker run --cap-add，如 NET_ADMIN、SYS_TIME',
      order: 62
    }),
    capDrop: configurable(['ALL'], {
      label: '移除能力',
      icon: "remove_moderator",
      group: '安全',
      widget: 'text',
      help: 'docker run --cap-drop，如 ALL',
      order: 63
    }),
    logDriver: configurable('json-file', {
      label: '日志驱动',
      icon: "receipt_long",
      group: '日志',
      widget: 'select',
      help: 'docker run --log-driver',
      choices: [
        { label: 'json-file（默认）', value: 'json-file' },
        { label: 'syslog', value: 'syslog' },
        { label: 'journald', value: 'journald' },
        { label: 'none（不记录）', value: 'none' },
        { label: 'fluentd', value: 'fluentd' }
      ],
      order: 70
    }),
    logMaxSize: configurable('10m', {
      label: '日志文件上限',
      icon: "straighten",
      group: '日志',
      widget: 'text',
      help: 'docker run --log-opt max-size',
      placeholder: '10m / 100k / 1g',
      validate: (val) => /^\d+[kmg]$/i.test(val),
      errorMessage: '{label}格式应为数字+k/m/g，如 10m',
      order: 71
    }),
    logMaxFile: configurable(3, {
      label: '日志文件数量',
      icon: "format_list_numbered",
      group: '日志',
      widget: 'number',
      suffix: ' 个',
      help: 'docker run --log-opt max-file——suffix 量词装饰',
      min: 1,
      max: 100,
      step: 1,
      order: 72
    })
  },{icon:"security", label:"安全与日志"})
})

const viewer6 = document.getElementById('viewer6') as AutostoreViewer
viewer6.store = store6
