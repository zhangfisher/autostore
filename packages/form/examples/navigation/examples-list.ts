// 示例列表配置
export interface ExampleItem {
    id: string;
    title: string;
    description: string;
    difficulty?: "beginner" | "intermediate" | "advanced";
    tags?: string[];
    file?: string;
}

// 子分类：分类内按功能维度二次分组（如"字段"下按输入功能分组）
export interface ExampleSubCategory {
    subcategory: string;
    items: ExampleItem[];
}

export interface ExampleCategory {
    category: string;
    // 直接条目（与 subcategories 二选一）
    items?: ExampleItem[];
    // 子分类条目
    subcategories?: ExampleSubCategory[];
}

export const examplesList: ExampleCategory[] = [
    {
        category: "表单",
        items: [
            {
                id: "simple-form",
                title: "简单表单",
                description: "基础表单创建、字段绑定和表单重置",
                difficulty: "beginner",
                tags: ["入门", "基础"],
            },

            {
                id: "computed-fields",
                title: "计算属性",
                description: "自动计算字段和依赖关系，实时更新计算结果",
                difficulty: "intermediate",
                tags: ["计算", "响应式"],
            },
            {
                id: "field-width",
                title: "字段宽度",
                description: "通过 width 配置一行展示多个字段，支持等宽与混合列宽",
                difficulty: "beginner",
                tags: ["布局", "宽度"],
            },
            {
                id: "field-help",
                title: "字段帮助信息",
                description: "为字段添加帮助提示信息，支持纯文本和带链接的帮助文字",
                difficulty: "beginner",
                tags: ["帮助", "提示"],
            },
            {
                id: "custom-icons",
                title: "自定义图标",
                description: "通过 registerIcons 注册本地图标与远程图标源，输入框前缀、图标选择候选集、操作按钮均可引用",
                difficulty: "beginner",
                tags: ["图标", "自定义"],
            },
            {
                id: "validation",
                title: "表单验证",
                description: "必填验证、长度验证、自定义验证和错误提示",
                difficulty: "beginner",
                tags: ["验证", "错误处理"],
            },
            {
                id: "field-linkage",
                title: "字段联动",
                description: "字段间的联动关系：显示/隐藏、启用/禁用、值联动",
                difficulty: "beginner",
                tags: ["联动", "交互"],
            },
            {
                id: "widget-actions",
                title: "字段操作按钮",
                description: "beforeActions 前置按钮和 afterActions 后置按钮的使用",
                difficulty: "intermediate",
                tags: ["按钮", "操作"],
            },
            {
                id: "form-groups",
                title: "表单分组",
                description: "标签页分组和折叠面板分组",
                difficulty: "intermediate",
                tags: ["分组", "UI组件"],
            },
            {
                id: "network-config",
                title: "网络配置",
                description: "DHCP切换、IP地址配置和数据转换（秒↔毫秒）",
                difficulty: "intermediate",
                tags: ["网络", "配置"],
            },
            {
                id: "data-sync",
                title: "数据同步",
                description: "跨表单双向数据同步和状态管理",
                difficulty: "advanced",
                tags: ["同步", "状态管理"],
            },
        ],
    },
    {
        category: "字段",
        subcategories: [
            {
                subcategory: "文本输入",
                items: [
                    {
                        id: "widget-text",
                        title: "文本输入(text)",
                        description: "文本输入框组件，支持占位符、最大长度等",
                        difficulty: "beginner",
                        tags: ["基础", "输入"],
                    },
                    {
                        id: "widget-textarea",
                        title: "多行文本(textarea)",
                        description: "多行文本输入组件，支持行数配置",
                        difficulty: "beginner",
                        tags: ["基础", "输入"],
                    },
                    {
                        id: "widget-password",
                        title: "密码输入(password)",
                        description: "密码输入组件，支持显示/隐藏密码",
                        difficulty: "beginner",
                        tags: ["基础", "输入"],
                    },
                    {
                        id: "widget-email",
                        title: "邮箱输入(email)",
                        description: "邮箱输入组件，自动验证邮箱格式",
                        difficulty: "beginner",
                        tags: ["基础", "输入"],
                    },
                    {
                        id: "widget-phone",
                        title: "电话输入(phone)",
                        description: "电话号码输入组件，支持手机号格式",
                        difficulty: "beginner",
                        tags: ["基础", "输入"],
                    },
                    {
                        id: "widget-url",
                        title: "网址输入(url)",
                        description: "URL网址输入组件，支持https格式验证",
                        difficulty: "beginner",
                        tags: ["基础", "输入"],
                    },
                    {
                        id: "widget-search",
                        title: "搜索输入(search)",
                        description: "搜索输入组件，默认带搜索图标，支持清空和验证",
                        difficulty: "beginner",
                        tags: ["基础", "输入"],
                    },
                    {
                        id: "widget-ipaddress",
                        title: "IP地址输入(ipaddress)",
                        description: "IP地址输入组件",
                        difficulty: "beginner",
                        tags: ["基础", "网络"],
                    },
                    {
                        id: "widget-verifycode",
                        title: "验证码输入(verifycode)",
                        description: "验证码输入组件，支持发送验证码和倒计时",
                        difficulty: "beginner",
                        tags: ["基础", "输入"],
                    },
                ],
            },
            {
                subcategory: "数值输入",
                items: [
                    {
                        id: "widget-number",
                        title: "数字输入(number)",
                        description: "数字输入组件，支持最小值、最大值和步长",
                        difficulty: "beginner",
                        tags: ["基础", "输入"],
                    },
                    {
                        id: "widget-range",
                        title: "范围滑块(range)",
                        description: "范围滑块组件，支持最小值、最大值和步长",
                        difficulty: "beginner",
                        tags: ["基础", "滑块"],
                    },
                    {
                        id: "widget-rating",
                        title: "评分(rating)",
                        description: "评分组件，支持半星评分",
                        difficulty: "beginner",
                        tags: ["基础", "评分"],
                    },
                ],
            },
            {
                subcategory: "选择输入",
                items: [
                    {
                        id: "widget-select",
                        title: "下拉选择(select)",
                        description: "下拉选择组件，支持搜索和清空",
                        difficulty: "beginner",
                        tags: ["基础", "选择"],
                    },
                    {
                        id: "widget-radio",
                        title: "单选按钮(radio)",
                        description: "单选按钮组件，支持卡片样式",
                        difficulty: "beginner",
                        tags: ["基础", "选择"],
                    },
                    {
                        id: "widget-radio-button",
                        title: "单选按钮组(radio-button)",
                        description: "单选按钮组组件，类似标签页样式",
                        difficulty: "beginner",
                        tags: ["基础", "选择"],
                    },
                    {
                        id: "widget-checkbox",
                        title: "单个复选框(checkbox)",
                        description: "单个复选框组件，用于开关类型选项",
                        difficulty: "beginner",
                        tags: ["基础", "选择"],
                    },
                    {
                        id: "widget-checkbox-group",
                        title: "复选框组(checkbox-group)",
                        description: "多选复选框组件，支持多选项选择",
                        difficulty: "beginner",
                        tags: ["基础", "选择"],
                    },
                    {
                        id: "widget-switch",
                        title: "开关(switch)",
                        description: "开关切换组件",
                        difficulty: "beginner",
                        tags: ["基础", "选择"],
                    },
                    {
                        id: "widget-icons",
                        title: "图标选择(icons)",
                        description: "图标选择器组件，支持单选和多选",
                        difficulty: "beginner",
                        tags: ["基础", "图标"],
                    },
                    {
                        id: "widget-color-picker",
                        title: "颜色选择器(color-picker)",
                        description: "颜色选择器组件，支持预设颜色和透明度",
                        difficulty: "beginner",
                        tags: ["基础", "颜色"],
                    },
                    {
                        id: "widget-list",
                        title: "列表选择(list)",
                        description: "列表选择组件，支持单选/多选、异步候选项、自定义渲染和已选结果面板",
                        difficulty: "beginner",
                        tags: ["基础", "选择", "列表"],
                    },
                ],
            },
            {
                subcategory: "日期时间",
                items: [
                    {
                        id: "widget-date",
                        title: "日期选择(date)",
                        description: "日期选择器组件",
                        difficulty: "beginner",
                        tags: ["基础", "日期"],
                    },
                    {
                        id: "widget-datetime",
                        title: "日期时间选择(datetime)",
                        description: "日期时间选择器组件，支持日期和时间同时选择",
                        difficulty: "beginner",
                        tags: ["基础", "日期"],
                    },
                    {
                        id: "widget-date-range",
                        title: "日期范围选择(date-range)",
                        description: "日期范围选择器组件，支持起止日期选择",
                        difficulty: "beginner",
                        tags: ["基础", "日期"],
                    },
                    {
                        id: "widget-time",
                        title: "时间选择(time)",
                        description: "时间选择器组件",
                        difficulty: "beginner",
                        tags: ["基础", "时间"],
                    },
                    {
                        id: "widget-cron",
                        title: "cron表达式(cron)",
                        description: "cron 表达式编辑组件，支持秒/年/月/周/日/时/分多维编辑",
                        difficulty: "intermediate",
                        tags: ["高级", "选择"],
                    },
                ],
            },
            {
                subcategory: "复合字段",
                items: [
                    {
                        id: "widget-parts",
                        title: "分段输入(parts)",
                        description: "分段输入组件，适用于验证码、IP地址、电话号码等场景",
                        difficulty: "intermediate",
                        tags: ["分段", "输入"],
                    },
                    {
                        id: "widget-combine",
                        title: "组合字段(combine)",
                        description: "组合多种子 widget（range/number/select/switch 等）共同输入一个状态值",
                        difficulty: "intermediate",
                        tags: ["组合", "聚合"],
                    },
                    {
                        id: "cascader",
                        title: "级联选择器(cascader)",
                        description: "多层级联数据选择，支持自定义分隔符和异步加载",
                        difficulty: "intermediate",
                        tags: ["级联", "数据"],
                    },
                    {
                        id: "tree-select",
                        title: "树形选择(tree-select)",
                        description: "树形结构数据选择，支持单选和多选",
                        difficulty: "intermediate",
                        tags: ["树形", "选择"],
                    },
                    {
                        id: "tree-dropdown",
                        title: "树形下拉选择(tree-dropdown)",
                        description: "下拉面板内嵌树形选择，多选以标签展示，支持路径显示与仅叶子可选",
                        difficulty: "intermediate",
                        tags: ["树形", "选择", "下拉"],
                    },
                    {
                        id: "widget-upload",
                        title: "文件上传(upload)",
                        description: "文件上传组件，支持多文件、图片预览、拖拽上传和后端处理",
                        difficulty: "intermediate",
                        tags: ["上传", "文件"],
                    },
                    {
                        id: "widget-custom",
                        title: "自定义字段(custom)",
                        description: "renderContent 自定义渲染、多输入值聚合、下拉/内联展示、验证与联动",
                        difficulty: "advanced",
                        tags: ["自定义", "渲染"],
                    },
                ],
            },
        ],
    },
];

// 通过ID查找示例
export function findExampleById(id: string): ExampleItem | undefined {
    for (const category of examplesList) {
        const found = category.items?.find((item) => item.id === id);
        if (found) return found;
        for (const sub of category.subcategories ?? []) {
            const foundSub = sub.items.find((item) => item.id === id);
            if (foundSub) return foundSub;
        }
    }
    return undefined;
}

// 获取所有示例的扁平列表
export function getAllExamples(): ExampleItem[] {
    return examplesList.flatMap((category) => [
        ...(category.items ?? []),
        ...(category.subcategories ?? []).flatMap((sub) => sub.items),
    ]);
}
