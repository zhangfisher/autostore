// 模拟数据

// 组织架构树数据
export const orgTree = {
	id: 1,
	label: '美一',
	user: {
		name: '',
		admin: false,
		address: {
			province: '广东省',
			city: '深圳市',
			street: '南山区',
		},
	},
	children: [
		{
			id: 1,
			label: '研发中心',
			children: [
				{ id: 11, label: '工程部' },
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
			children: [
				{ id: 21, label: '销售部' },
				{ id: 22, label: '市场部' },
				{ id: 23, label: '客服部' },
			],
		},
		{
			id: 3,
			label: '生产中心',
			children: [
				{ id: 31, label: '生产部' },
				{ id: 32, label: '采购部' },
				{ id: 33, label: '仓储部' },
				{ id: 34, label: '质检部' },
			],
		},
	],
};

// 车型数据
export const cars = [
	{
		label: '轿车',
		value: '1',
		children: [
			{ label: '宝马', value: '1-1', children: [{ label: '3系', value: '1-1-1' }, { label: '5系', value: '1-1-2' }] },
			{ label: '奥迪', value: '1-2', children: [{ label: 'A4', value: '1-2-1' }, { label: 'A6', value: '1-2-2' }] },
		],
	},
	{
		label: 'SUV',
		value: '2',
		children: [
			{ label: '宝马', value: '2-1', children: [{ label: 'X1', value: '2-1-1' }, { label: 'X3', value: '2-1-2' }] },
			{ label: '奥迪', value: '2-2', children: [{ label: 'Q3', value: '2-2-1' }, { label: 'Q5', value: '2-2-2' }] },
		],
	},
];

// 懒加载车型数据
export const lazyCars = [
	{
		label: '轿车',
		value: '1',
		children: undefined, // 懒加载
	},
	{
		label: 'SUV',
		value: '2',
		children: undefined,
	},
];

// 懒加载回调
export function onLazyLoad(node: any, callback: any) {
	console.log('懒加载节点:', node);
	setTimeout(() => {
		if (node.value === '1') {
			callback([
				{ label: '宝马', value: '1-1', children: [{ label: '3系', value: '1-1-1' }, { label: '5系', value: '1-1-2' }] },
				{ label: '奥迪', value: '1-2', children: [{ label: 'A4', value: '1-2-1' }, { label: 'A6', value: '1-2-2' }] },
			]);
		} else if (node.value === '2') {
			callback([
				{ label: '宝马', value: '2-1', children: [{ label: 'X1', value: '2-1-1' }, { label: 'X3', value: '2-1-2' }] },
				{ label: '奥迪', value: '2-2', children: [{ label: 'Q3', value: '2-2-1' }, { label: 'Q5', value: '2-2-2' }] },
			]);
		}
	}, 500);
}

// 产品列表数据
export const products = [
	{ id: 1, label: '手机', price: 1000, icon: 'phone' },
	{ id: 2, label: '电脑', price: 2000, icon: 'laptop' },
	{ id: 3, label: '手表', price: 3000, icon: 'watch' },
	{ id: 4, label: '耳机', price: 4000, icon: 'headphones' },
	{ id: 5, label: '鼠标', price: 5000, icon: 'mouse' },
	{ id: 6, label: '键盘', price: 6000, icon: 'keyboard' },
];

// 布局选项
export const layoutOptions = [
	{ label: '简约风', tips: '极简设计，突出内容' },
	{ label: '经典式', tips: '传统布局，平衡稳重' },
	{ label: '卡片集', tips: '模块化卡片，灵活组合' },
	{ label: '瀑布流', tips: '动态滚动，视觉延展' },
	{ label: '分屏式', tips: '双栏对比，高效浏览' },
	{ label: '导航型', tips: '侧边主导，层级清晰' },
	{ label: '全屏化', tips: '沉浸体验，无界视觉' },
	{ label: '网格阵', tips: '整齐排列，规整直观' },
	{ label: '自由板', tips: '可拖拽定制，随心布局' },
];

// TCP 标志位选项
export const tcpFlags = [
	{ label: 'URG', value: 1 },
	{ label: 'ACK', value: 2 },
	{ label: 'PSH', value: 4 },
	{ label: 'RST', value: 8 },
	{ label: 'SYN', value: 16 },
	{ label: 'FIN', value: 32 },
	{ label: 'CRC', value: 64 },
];