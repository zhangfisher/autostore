// 示例列表配置
export interface ExampleItem {
    id: string;
    title: string;
    description: string;
    difficulty?: "beginner" | "intermediate" | "advanced";
    tags?: string[];
    file?: string; // 对应的示例文件路径
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
                description: "基础的表单创建和绑定示例",
                difficulty: "beginner",
                tags: ["入门", "基础"],
                file: "../examples/basic/simple-form",
            },
            {
                id: "network-config",
                title: "网络配置",
                description: "IP地址、子网掩码、网关等网络配置示例",
                difficulty: "beginner",
                tags: ["入门", "网络", "配置"],
                file: "../examples/advanced/network-config",
            },
        ],
    },
    {
        category: "📝 基础组件",
        items: [
            {
                id: "input-widgets",
                title: "输入组件",
                description: "文本、数字、密码、邮箱等各种输入组件",
                difficulty: "beginner",
                tags: ["基础", "组件", "输入"],
            },
            {
                id: "selection-widgets",
                title: "选择组件",
                description: "单选、多选、下拉框等选择组件",
                difficulty: "beginner",
                tags: ["基础", "组件", "选择"],
            },
            {
                id: "validation",
                title: "表单验证",
                description: "客户端验证和错误处理示例",
                difficulty: "intermediate",
                tags: ["验证", "错误处理"],
            },
        ],
    },
    {
        category: "🔧 高级组件",
        items: [
            {
                id: "cascader-tree",
                title: "级联选择器",
                description: "车型选择、行政区划等级联数据示例",
                difficulty: "intermediate",
                tags: ["级联", "树形", "数据"],
            },
            {
                id: "data-sync",
                title: "数据同步",
                description: "表单数据同步和状态管理示例",
                difficulty: "advanced",
                tags: ["同步", "状态管理", "高级"],
            },
            {
                id: "form-groups",
                title: "表单分组",
                description: "标签页分组和折叠面板示例",
                difficulty: "intermediate",
                tags: ["分组", "UI组件"],
            },
        ],
    },
    {
        category: "⚙️ 高级功能",
        items: [
            {
                id: "data-transform",
                title: "数据转换",
                description: "toState、toInput、toView 数据转换示例",
                difficulty: "advanced",
                tags: ["转换", "数据处理"],
            },
            {
                id: "computed-fields",
                title: "计算属性",
                description: "自动计算字段和依赖关系示例",
                difficulty: "intermediate",
                tags: ["计算", "响应式"],
            },
            {
                id: "custom-widgets",
                title: "自定义组件",
                description: "自定义表单组件和渲染示例",
                difficulty: "advanced",
                tags: ["自定义", "高级", "渲染"],
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
