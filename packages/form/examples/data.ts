export const orgTree = {
    id: 1,
    label: '美一',
    icon: 'phone',
    children: [
        {
            id: 1,
            label: '研发中心',
            icon: 'email',
            children: [
                {
                    id: 11, label: '工程部', onLoad: async () => {
                        return [
                            { id: 111, label: '前端组' },
                            { id: 112, label: '后端组' },
                            { id: 113, label: '测试组' },
                            { id: 114, label: '运维组' },
                        ]
                    }
                },
                { id: 12, label: '产品部' },
                { id: 13, label: '测试部' },
                { id: 14, label: '运维部' },
                { id: 15, label: '系统部' }
            ]
        },
        {
            id: 2,
            label: "营销中心",
            selected: true,
            icon: 'globe',
            children: [
                { id: 21, label: '销售部' },
                { id: 22, label: '市场部' },
                { id: 23, label: '客服部' }
            ]
        },
        {
            id: 3,
            label: '生产中心',
            icon: 'user',
            children: [
                { id: 31, label: '生产部' },
                { id: 32, label: '采购部' },
                { id: 33, label: '仓储部' },
                { id: 34, label: '质检部' }
            ]

        }
    ]
}
