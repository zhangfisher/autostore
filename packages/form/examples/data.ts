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
                    id: 11,
                    label: '工程部',
                    onLoad: async () => {
                        return [
                            { id: 111, label: '前端组' },
                            { id: 112, label: '后端组' },
                            { id: 113, label: '测试组' },
                            { id: 114, label: '运维组' },
                        ];
                    },
                },
                { id: 12, label: '产品部' },
                { id: 13, label: '测试部' },
                { id: 14, label: '运维部' },
                { id: 15, label: '系统部' },
            ],
        },
        {
            id: 2,
            label: '营销中心',
            selected: true,
            icon: 'globe',
            children: [
                { id: 21, label: '销售部' },
                { id: 22, label: '市场部' },
                { id: 23, label: '客服部' },
            ],
        },
        {
            id: 3,
            label: '生产中心',
            icon: 'user',
            children: [
                { id: 31, label: '生产部' },
                { id: 32, label: '采购部' },
                { id: 33, label: '仓储部' },
                { id: 34, label: '质检部' },
            ],
        },
    ],
};

export const cars = {
    label: '汽车',
    id: '0',
    children: [
        {
            label: '乘用车',
            id: '1',
            children: [
                {
                    label: '轿车',
                    id: '1-1',
                    children: [
                        { label: '紧凑型轿车', id: '1-1-1' },
                        { label: '中型轿车', id: '1-1-2' },
                        { label: '豪华轿车', id: '1-1-3' },
                    ],
                },
                {
                    label: 'SUV',
                    id: '1-2',
                    children: [
                        { label: '小型SUV', id: '1-2-1' },
                        { label: '中型SUV', id: '1-2-2' },
                        { label: '大型SUV', id: '1-2-3' },
                    ],
                },
                {
                    label: 'MPV',
                    id: '1-3',
                    children: [
                        { label: '家用MPV', id: '1-3-1' },
                        { label: '商务MPV', id: '1-3-2' },
                    ],
                },
            ],
        },
        {
            label: '商用车',
            id: '2',
            children: [
                {
                    label: '客车',
                    id: '2-1',
                    children: [
                        { label: '小型客车', id: '2-1-1' },
                        { label: '中型客车', id: '2-1-2' },
                        { label: '大型客车', id: '2-1-3' },
                    ],
                },
                {
                    label: '货车',
                    id: '2-2',
                    children: [
                        { label: '轻型货车', id: '2-2-1' },
                        { label: '重型货车', id: '2-2-2' },
                    ],
                },
            ],
        },
        {
            label: '新能源车',
            id: '3',
            children: [
                {
                    label: '纯电动车',
                    id: '3-1',
                    children: [
                        { label: '微型电动车', id: '3-1-1' },
                        { label: '家用电动车', id: '3-1-2' },
                    ],
                },
                {
                    label: '混合动力车',
                    id: '3-2',
                    children: [
                        { label: '插电式混动', id: '3-2-1' },
                        { label: '油电混动', id: '3-2-2' },
                    ],
                },
            ],
        },
    ],
};

export const lazyCars = {
    label: '汽车',
    id: '0',
    children: [
        {
            label: '乘用车',
            id: '1',
            lazy: true,
        },
        {
            label: '商用车',
            id: '2',
            lazy: true,
        },
        {
            label: '新能源车',
            id: '3',
            lazy: true,
        },
    ],
};

export async function onLazyLoad(id: string): Promise<Record<string, any>[]> {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    if (id === '1') {
        return [
            { id: '1-1', label: '轿车' },
            { id: '1-2', label: 'SUV' },
            { id: '1-3', label: 'MPV' },
        ];
    } else if (id === '2') {
        return [
            { id: '2-1', label: '客车' },
            { id: '2-2', label: '货车' },
        ];
    } else if (id === '3') {
        return [
            { id: '3-1', label: '纯电动车' },
            { id: '3-2', label: '混合动力车' },
        ];
    } else if (id === '1-1') {
        return [
            { id: '1-1-1', label: '紧凑型轿车' },
            { id: '1-1-2', label: '中型轿车' },
            { id: '1-1-3', label: '豪华轿车' },
        ];
    } else if (id === '1-2') {
        return [
            { id: '1-2-1', label: '小型SUV' },
            { id: '1-2-2', label: '中型SUV' },
            { id: '1-2-3', label: '大型SUV' },
        ];
    } else if (id === '1-3') {
        return [
            { id: '1-3-1', label: '家用MPV' },
            { id: '1-3-2', label: '商务MPV' },
        ];
    } else if (id === '2-1') {
        return [
            { id: '2-1-1', label: '小型客车' },
            { id: '2-1-2', label: '中型客车' },
            { id: '2-1-3', label: '大型客车' },
        ];
    } else if (id === '2-2') {
        return [
            { id: '2-2-1', label: '轻型货车' },
            { id: '2-2-2', label: '重型货车' },
        ];
    } else if (id === '3-1') {
        return [
            { id: '3-1-1', label: '微型电动车' },
            { id: '3-1-2', label: '家用电动车' },
        ];
    } else if (id === '3-2') {
        return [
            { id: '3-2-1', label: '插电式混动' },
            { id: '3-2-2', label: '油电混动' },
        ];
    } else {
        return [];
    }
}
