// 示例列表配置
export interface ExampleItem {
    id: string;
    title: string;
    description: string;
    difficulty?: "beginner" | "intermediate" | "advanced";
    tags?: string[];
    file?: string;
}

export interface ExampleCategory {
    category: string;
    items: ExampleItem[];
}

export const examplesList: ExampleCategory[] = [
    {
        category: "🚀 快速开始",
        items: [
            {
                id: "simple-form",
                title: "简单表单",
                description: "基础表单创建、字段绑定和表单重置",
                difficulty: "beginner",
                tags: ["入门", "基础"],
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
                id: "computed-fields",
                title: "计算属性",
                description: "自动计算字段和依赖关系，实时更新计算结果",
                difficulty: "intermediate",
                tags: ["计算", "响应式"],
            },
        ],
    },
    {
        category: "📝 基础组件",
        items: [
            {
                id: "widget-text",
                title: "文本输入",
                description: "文本输入框组件，支持占位符、最大长度等",
                difficulty: "beginner",
                tags: ["基础", "输入"],
            },
            {
                id: "widget-number",
                title: "数字输入",
                description: "数字输入组件，支持最小值、最大值和步长",
                difficulty: "beginner",
                tags: ["基础", "输入"],
            },
            {
                id: "widget-password",
                title: "密码输入",
                description: "密码输入组件，支持显示/隐藏密码",
                difficulty: "beginner",
                tags: ["基础", "输入"],
            },
            {
                id: "widget-email",
                title: "邮箱输入",
                description: "邮箱输入组件，自动验证邮箱格式",
                difficulty: "beginner",
                tags: ["基础", "输入"],
            },
            {
                id: "widget-phone",
                title: "电话输入",
                description: "电话号码输入组件，支持手机号格式",
                difficulty: "beginner",
                tags: ["基础", "输入"],
            },
            {
                id: "widget-url",
                title: "网址输入",
                description: "URL网址输入组件，支持https格式验证",
                difficulty: "beginner",
                tags: ["基础", "输入"],
            },
            {
                id: "widget-textarea",
                title: "多行文本",
                description: "多行文本输入组件，支持行数配置",
                difficulty: "beginner",
                tags: ["基础", "输入"],
            },
            {
                id: "widget-date",
                title: "日期选择",
                description: "日期选择器组件",
                difficulty: "beginner",
                tags: ["基础", "输入"],
            },
            {
                id: "widget-radio",
                title: "单选按钮",
                description: "单选按钮组件，支持卡片样式",
                difficulty: "beginner",
                tags: ["基础", "选择"],
            },
            {
                id: "widget-checkbox-group",
                title: "复选框组",
                description: "多选复选框组件，支持多选项选择",
                difficulty: "beginner",
                tags: ["基础", "选择"],
            },
            {
                id: "widget-select",
                title: "下拉选择",
                description: "下拉选择组件，支持搜索和清空",
                difficulty: "beginner",
                tags: ["基础", "选择"],
            },
            {
                id: "widget-switch",
                title: "开关",
                description: "开关切换组件",
                difficulty: "beginner",
                tags: ["基础", "选择"],
            },
        ],
    },
    {
        category: "🔧 高级组件",
        items: [
            {
                id: "cascader",
                title: "级联选择器",
                description: "多层级联数据选择，支持自定义分隔符和异步加载",
                difficulty: "intermediate",
                tags: ["级联", "数据"],
            },
            {
                id: "tree-select",
                title: "树形选择",
                description: "树形结构数据选择，支持单选和多选",
                difficulty: "intermediate",
                tags: ["树形", "选择"],
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
];

// 通过ID查找示例
export function findExampleById(id: string): ExampleItem | undefined {
    for (const category of examplesList) {
        const found = category.items.find((item) => item.id === id);
        if (found) return found;
    }
    return undefined;
}

// 获取所有示例的扁平列表
export function getAllExamples(): ExampleItem[] {
    return examplesList.flatMap((category) => category.items);
}
