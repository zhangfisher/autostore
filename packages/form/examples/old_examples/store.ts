import { parsePadding, toPadding } from "./utils";
import { cars, lazyCars, onLazyLoad, orgTree } from "./data";
import { AutoStore, computed, configurable, delay } from "autostore";
import type { AutoForm } from "../src/form";
import areaData from "./0.json";
import areaData5 from "./pcas-code.json";

const store = new AutoStore(
	{
		price: 100,
		count: computed((scope) => scope.price * 2),
		transform: {
			name: configurable("voerkai18n", {
				label: "姓名",
				advanced: true,
				onValidate: (val) => val.length >= 5,
				// onFail: 'ignore'
			}),
			age: configurable(1, {
				label: "年龄",
				required: true,
				toInput: (value) => {
					return value === 1 ? "男" : "女";
				},
				toState: (value) => {
					return value === "男" ? 1 : 0;
				},
				styles: {
					".label": "color: red;padding: 5px;border:1px solid blue;",
				},
			}),
		},
		a: {
			b: {
				c: {
					name: configurable("fisher", {
						label: "名称",
						help: "管理员拥有所有权限",
					}),
					admin: configurable(true, {
						label: "管理员",
						help: "管理员拥有所有权限",
						widget: "switch",
					}),
				},
			},
		},
		b: {
			x: {
				padding: configurable("10px 5px", {
					widget: "combine",
					label: "内边距",
					toState: (values) => toPadding(values),
					group: "a",
					required: true,
					children: [
						{
							name: "top",
							label: "上",
							widget: "range",
							width: "50%",
							toInput: (value) => {
								return parsePadding(value).top;
							},
						},
						{
							name: "right",
							label: "右",
							widget: "range",
							width: "50%",
							toInput: (value) => parsePadding(value).right,
						},
						{
							name: "bottom",
							label: "下",
							widget: "range",
							width: "50%",
							toInput: (value) => parsePadding(value).bottom,
						},
						{
							name: "left",
							label: "左",
							widget: "range",
							width: "50%",
							toInput: (value) => parsePadding(value).left,
						},
					],
				}),
			},
		},
		select: {
			layout: configurable("经典式", {
				label: "懒加载",
				widget: "select",
				select: async () => {
					return [
						{ label: "简约风", tips: "极简设计，突出内容" },
						{ label: "经典式", tips: "传统布局，平衡稳重" },
						{ label: "卡片集", tips: "模块化卡片，灵活组合" },
						{ label: "瀑布流", enable: false, tips: "动态滚动，视觉延展" },
						{
							label: "分屏式",
							tips: "双栏对比，高效浏览双栏对比，高效浏览双栏对比，高效浏览双栏对比，高效浏览双栏对比，高效浏览",
						},
						{ label: "导航型", tips: "侧边主导，层级清晰" },
						{ label: "全屏化", tips: "沉浸体验，无界视觉" },
						{ label: "网格阵", tips: "整齐排列，规整直观" },
						{ label: "自由板", tips: "可拖拽定制，随心布局" },
					];
				},
			}),
		},
		user: {
			name: configurable("Fish", {
				label: "姓名",
				placeholder: "请输入姓名",
				onValidate: (value) => {
					return value.length > 5;
				},
				group: "a",
				invalidTips: "姓名长度必须大于3个字符",
				help: "中文姓名(http://www.autostore.com)",
				required: computed(
					async (state) => {
						await delay(2000);
						return state.user.admin;
					},
					["user.admin"],
				),
				actions: [
					{
						label: "验证",
						icon: "clipboard",
						onClick: (value, { update }) => {
							console.log("Action click:", value);
							update(`${value}*`);
						},
						variant: "success",
					},
					{
						label: "上传",
						icon: "clipboard",
						onClick: (value, { update }) => {
							console.log("Action click:", value);
							update(`${value}*`);
						},
					},
					{
						label: "更新",
						icon: "clipboard",
						type: "dropdown",
						pos: "before",
						syncMenu: true,
						items: [
							"a",
							"b",
							"c",
							"-",
							{
								label: "删除",
								icon: "delete",
								onClick: (value, ctx) => {
									console.log(value, ctx);
								},
							},
						],
					},
					{
						label: "前面",
						pos: "before",
						icon: "atom",
						onClick: (args) => {
							console.log("Action click:", args);
						},
					},
				],
			}),
			lazyCar: configurable("1#1-1", {
				label: "懒加载车型",
				widget: "cascader",
				placeholder: "选择车型",
				select: lazyCars,
				icon: "car",
				help: "选择id",
				delimiter: "#",
				onLoad: onLazyLoad,
				group: "car",
			}),
			car: configurable("1#1-1", {
				label: "车型",
				widget: "cascader",
				placeholder: "选择车型",
				select: cars,
				icon: "car",
				help: "选择id",
				delimiter: "#",
				group: "car",
			}),
			area0: configurable("泉州市/丰泽区", {
				label: "乡镇",
				widget: "cascader",
				placeholder: "选择行政地区",
				select: areaData5,
				icon: "map-pin",
				labelKey: "name",
				valueKey: "name",
				rootKey: "35",
				idKey: "code",
				delimiter: "/",
				maxLevel: 3,
				group: "car",
			}),
			area: configurable("福建省泉州市丰泽区", {
				label: "地区",
				widget: "cascader",
				placeholder: "选择行政地区",
				select: areaData,
				icon: "map-pin",
				rootKey: "0",
				labelKey: "n",
				valueKey: "n",
				idKey: "c",
				group: "car",
				actions: [
					{
						label: "验证",
						icon: "clipboard",
						onClick: (value, { update }) => {
							console.log("Action click:", value);
							update(value + "*");
						},
						variant: "success",
					},
					{
						icon: "settings",
						onClick: (value, { update }) => {
							console.log("Action click:", value);
							update(value + "*");
						},
					},
					{
						label: "前面",
						pos: "before",
						icon: "atom",
						onClick: (args) => {
							console.log("Action click:", args);
						},
					},
					{
						pos: "before",
						icon: "email",
						onClick: (args) => {
							console.log("Action click:", args);
						},
					},
				],
			}),
			homepage: configurable("http://www.autostore.com", {
				widget: "url",
				label: "主页",
				prefix: ["http://", "https://"],
				suffix: [
					{ label: "在新窗口打开", value: "?_blank" },
					{ label: "在当前窗口打开", value: "?_self" },
					"-",
					{ label: "空白", value: "" },
				],
				group: "network",
			}),
			daterange: configurable("2024-12-03#2025-12-03", {
				label: "日期范围",
				widget: "date-range",
				delimiter: "#",
				group: "network",
			}),
			datetime: configurable("2025-12-03T09:30", {
				label: "日期时间",
				widget: "datetime",
				group: "network",
			}),
			icons: configurable("help", {
				label: "图标",
				dropdown: true,
				widget: "icons",
				multiple: true,
				icons: "award,apple,alarm-clock,aperture,cassette-tape,chart-spline,combine,image,ear,lock,map,plus",
				actions: [
					{
						label: "验证",
						icon: "clipboard",
						onClick: (value, { update }) => {
							console.log("Action click:", value);
							update(value + "*");
						},
						variant: "success",
					},
				],
				group: "network",
			}),
			custom: configurable("admin@autostore.com", {
				label: "自定义",
				widget: "custom",
				dropdown: true,
				inputSelectors: "input",
				renderSelection: (values, html) => {
					const text = values[2] === true ? "已订阅" : "没有订阅";
					return html`<span
                        style="color:red;border:1px solid red;padding: 4px;border-radius: 4px;"
                    >
                        ${values[0]}@${values[1]}(${text})</span
                    >`;
				},
				renderContent: (values, html) => {
					return html` <div style="padding:1em">
                        <label>
                            电子邮件:
                            <input .value=${values[0]} />
                            @<input .value=${values[1]} />
                        </label>
                        <br />
                        <label> 订阅新闻:<input type="checkbox" ?checked=${values[3]} /> </label>
                    </div>`;
				},
				toState: (values) => {
					return `${values[0]}@${values[1]}(${values[2] ? "已订阅" : "没有订阅"})`;
				},
				toInput: (values) => {
					const matched = values.match(/\(([^)]+)\)[^)]*$/);
					const mail = matched ? values.substring(0, values.length - matched[0].length) : values;
					const checkText = matched ? matched[1] : "没有订阅";
					return [...mail.split("@"), checkText === "已订阅"];
				},
			}),
			padding: configurable("10px 5px", {
				widget: "combine",
				label: "内边距",
				toState: (values) => toPadding(values),
				renderSelection: (values, html) => {
					return html`<span style="border: 1px solid red;padding:4px;">
                        ${values}
                    </span>`;
				},
				children: [
					{
						name: "top",
						label: "上",
						widget: "range",
						width: "50%",
						toInput: (value) => parsePadding(value).top,
					},
					{
						name: "right",
						label: "右",
						widget: "range",
						width: "50%",
						toInput: (value) => parsePadding(value).right,
					},
					{
						name: "bottom",
						label: "下",
						widget: "range",
						width: "50%",
						toInput: (value) => parsePadding(value).bottom,
					},
					{
						name: "left",
						label: "左",
						width: "50%",
						widget: "number",
						toInput: (value) => parsePadding(value).left,
					},
				],
				actions: [
					{
						label: "验证",
						icon: "clipboard",
						onClick: (value, { update }) => {
							console.log("Action click:", value);
							update(value + "*");
						},
					},
				],
			}),
			admin: configurable("是", {
				label: "管理员",
				help: "管理员拥有所有权限",
				widget: "checkbox",
				// checkLabel: "是",
				switchValues: ["是", "否"],
				group: "admin",
			}),
			admin2: configurable(true, {
				label: "管理员",
				help: "管理员拥有所有权限",
				widget: "switch",
				group: "admin",
				// checkLabel: "是",
				// switchValues: ['是', '否']
			}),
			files: configurable(["aaa.png", "b.pdf", "/updates/a.png"], {
				label: "上传图片",
				widget: "upload",
				url: "api/upload",
				placeholder: "请选择规格为128*128的相片",
				fileFieldName: "files",
				help: "上传文件支持.pnp,.jpg,不能大于5M",
				preview: true,
				group: "admin",
				// multiple: false,
				// 当删除文件时向服务器发起删除请求
				onRemove: async (file) => {
					await delay(2000);
					console.log("delete file:", file);
				},
				actions: [
					{
						label: "验证",
						icon: "clipboard",
						onClick: (value, { update }) => {
							console.log("Action click:", value);
							update(value + "*");
						},
						variant: "primary",
					},
					{
						label: "前面",
						pos: "before",
						icon: "atom",
						onClick: (args) => {
							console.log("Action click:", args);
						},
					},
				],
			}),
			file: configurable(
				{ url: "/uploads/d.jpg" },
				{
					label: "上传图片",
					widget: "upload",
					url: "api/upload",
					placeholder: "请选择图片",
					fileFieldName: "files",
					multiple: false,
					onlyFileUrl: false,
					// selector: 'rectangle',
					// 当删除文件时向服务器发起删除请求
					onRemove: (file) => {},
					group: "admin",
				},
			),
			verifyCode: configurable("1265", {
				label: "邮件验证码",
				widget: "parts",
				delimiter: "-#", //当没有指定delimiter时，使用空格分隔
				includeDelimiter: true,
				// 约束字符
				// chars: "[0-9]",
				// 大小写
				caseType: "lower",
				// 模板字符串
				template: "00#00-00#00", // 每一组之间的分割符
				group: "safe",
			}),
			smsVerify: configurable(false, {
				label: "短信验证",
				widget: "switch",
				group: "safe",
				// checkLabel: "是",
				// switchValues: ['是', '否']
			}),
			smsCode: configurable("", {
				label: "短信验证码",
				placeholder: "请输入验证码",
				maxLength: 6,
				widget: "verifycode",
				timeout: 60 * 1000,
				template: "{timeout}秒后重试",
				group: "safe",
				onRequest: () => {
					console.log("发送短信");
				},
				visible: (state) => state.user.smsVerify,
			}),
			tcpFlags: configurable(3, {
				label: "TCP标识",
				widget: "checkbox-group",
				group: "network",
				select: [
					{ label: "URG", value: 1 },
					{ label: "ACK", value: 2 },
					{ label: "PSH", value: 4 },
					{ label: "RST", value: 8 },
					{ label: "SYN", value: 16 },
					{ label: "FIN", value: 32 },
					{ label: "CRC", value: 64 },
				],
				toInput: (value) => {
					const vals: number[] = [];
					if ((value & 1) > 0) vals.push(1);
					if ((value & 2) > 0) vals.push(2);
					if ((value & 4) > 0) vals.push(4);
					if ((value & 8) > 0) vals.push(8);
					if ((value & 16) > 0) vals.push(16);
					if ((value & 32) > 0) vals.push(32);
					if ((value & 64) > 0) vals.push(64);
					return vals;
				},
				toState: (vals) => {
					let value = 0;
					if (vals.includes(1)) value += 1;
					if (vals.includes(2)) value += 2;
					if (vals.includes(4)) value += 4;
					if (vals.includes(8)) value += 8;
					if (vals.includes(16)) value += 16;
					if (vals.includes(32)) value += 32;
					if (vals.includes(64)) value += 64;
					return value;
				},
			}),
			layout: configurable("卡片集", {
				// divider: true,
				label: "布局",
				required: true,
				widget: "radio",
				itemWidth: "33.33%",
				card: true,
				select: [
					{ label: "简约风", tips: "极简设计，突出内容" },
					{ label: "经典式", tips: "传统布局，平衡稳重" },
					{ label: "卡片集", tips: "模块化卡片，灵活组合" },
					{ label: "瀑布流", enable: false, tips: "动态滚动，视觉延展" },
					{
						label: "分屏式",
						tips: "双栏对比，高效浏览双栏对比，高效浏览双栏对比，高效浏览双栏对比，高效浏览双栏对比，高效浏览",
					},
					{ label: "导航型", tips: "侧边主导，层级清晰" },
					{ label: "全屏化", tips: "沉浸体验，无界视觉" },
					{ label: "网格阵", tips: "整齐排列，规整直观" },
					{ label: "自由板", tips: "可拖拽定制，随心布局" },
				],
			}),
			useLayout: configurable(["经典式", "全屏化"], {
				label: "可用布局",
				widget: "checkbox-group",
				itemWidth: "33.33%",
				valueKey: "label",
				group: "b",
				card: true,
				select: [
					{ label: "简约风", icon: "globe", tips: "极简设计，突出内容" },
					{ label: "经典式", icon: "user", tips: "传统布局，平衡稳重" },
					{ label: "卡片集", icon: "phone", tips: "模块化卡片，灵活组合" },
					{ label: "瀑布流", icon: "search", enable: false, tips: "动态滚动，视觉延展" },
					{
						label: "分屏式",
						icon: "datetime",
						tips: "双栏对比，高效浏览双栏对比，高效浏览双栏对比，高效浏览双栏对比，高效浏览双栏对比，高效浏览",
					},
					{ label: "导航型", icon: "email", tips: "侧边主导，层级清晰" },
					{ label: "全屏化", icon: "error", tips: "沉浸体验，无界视觉" },
					{ label: "网格阵", icon: "settings", tips: "整齐排列，规整直观" },
					{ label: "自由板", icon: "date", tips: "可拖拽定制，随心布局" },
				],
			}),
			products: configurable(["电脑"], {
				label: "产品",
				onValidate: (value) => {
					return value.length > 2;
				},
				widget: "list",
				group: "b",
				multiple: true,
				valueKey: "label", // 默认选择的是id
				labelKey: "label", // 用于显示，当showResults为true时，显示的是label
				invalidTips: "至少选择两个产品",
				height: "250px",
				showResults: true, // 是否显示结果框
				renderItem: "<span>{label}</span><span>{price}</span>",
				select: [
					{ id: 1, label: "手机", price: 1000, icon: "phone" },
					{ id: 2, label: "电脑", price: 2000, icon: "laptop" },
					{ id: 3, label: "手表", price: 3000, icon: "watch" },
					{ id: 4, label: "耳机", price: 4000, icon: "headphones" },
					{ id: 5, label: "鼠标", price: 5000, icon: "mouse" },
					{ id: 6, label: "键盘", price: 6000, icon: "keyboard" },
					{ id: 7, label: "鼠标垫", price: 7000, icon: "mousepad" },
					{ id: 8, label: "U盘", price: 8000, icon: "usb" },
					{ id: 9, label: "硬盘", price: 9000, icon: "hdd" },
					{ id: 10, label: "内存", price: 10000, icon: "memory" },
					{ id: 11, label: "硬盘盒", price: 11000, icon: "hdd-box" },
					{ id: 12, label: "固态硬盘", price: 12000, icon: "ssd" },
					{ id: 13, label: "机械硬盘", price: 13000, icon: "hard-drive" },
					{ id: 14, label: "显卡", price: 14000, icon: "gpu" },
					{ id: 15, label: "蓝牙耳机", price: 15000, icon: "bluetooth" },
					{ id: 16, label: "电视", price: 16000, icon: "tv" },
					{ id: 17, label: "空调", price: 17000, icon: "air-conditioner" },
					{ id: 18, label: "冰箱", price: 18000, icon: "fridge" },
					{ id: 19, label: "洗衣机", price: 19000, icon: "washing-machine" },
					{ id: 20, label: "微波炉", price: 20000, icon: "microwave-oven" },
					{ id: 21, label: "电饭煲", price: 21000, icon: "rice-cooker" },
					{ id: 22, label: "电风扇", price: 22000, icon: "fan" },
					{ id: 23, label: "电吹风", price: 23000, icon: "hair-dryer" },
					{ id: 24, label: "吸尘器", price: 24000, icon: "vacuum-cleaner" },
				],
				actions: [
					{
						label: "计算总价",
						pos: "before",
						onClick: (value, ctx) => {
							alert(value);
						},
					},
					{
						label: "帮助",
						pos: "after",
						onClick: (value, ctx) => {},
					},
				],
			}),
			salary: configurable(3000, {
				label: "工资",
				widget: "number",
				icon: "japanese-yen",
				group: "b",
				actions: [
					{
						label: "清空",
						icon: "trash",
						onClick: (_, { update }) => {
							update("");
						},
					},
				],
			}),
			captcha: configurable("", {
				label: "验证码",
				widget: "captcha",
				help: "单击刷新验证码",
				placeholder: "请输入验证码",
				url: "/captcha.png",
			}),
			birday: configurable("2025-11-01", { label: "生日", widget: "date" }),
			phone: configurable("138456789112", {
				label: "电话号码",
				widget: "phone",
				clearable: true,
				pattern: "13[0-9]{9}",
				maxLength: 11,
				width: "50%",
			}),
			search: configurable("", {
				label: "搜索",
				widget: "search",
				width: "50%",
			}),
			age: configurable(18, {
				widget: "number",
				onValidate: (value) => {
					return value > 0 && value < 24;
				},
				pill: true,
				label: "年龄",
				max: 100,
				min: 1,
				width: "50%",
				toView: (value: any) => `<span style="color:red;border:1px solid red;padding:4px;">${value}岁</span>`,
			}),
			password: configurable("18", {
				label: "密码",
				widget: "password",
				passwordToggle: true,
				maxLength: 6,
				minLength: 3,
				pill: true,
				width: "50%",
				required: true,
			}),
			sex: configurable("男", { label: "性别", widget: "radio", select: ["男", "女"] }),
			post: configurable("程序员", {
				label: "职业",
				widget: "select",
				renderItem: (item) => `<span>${item.label}</span><span>${item.salary}</span>`,
				select: [
					{ label: "程序员", icon: "square-code", salary: 8700 },
					{ label: "教师", icon: "user-round-pen", salary: 6200 },
					{ label: "医生", icon: "graduation-cap", salary: 12200 },
					{ label: "律师", icon: "scale", salary: 33400 },
					{ label: "其他", icon: "contact", salary: 5200 },
				],
			}),
			accessories: configurable(["耳机"], {
				label: "电脑配件",
				multiple: true,
				renderItem: "<span>{label}</span><span>{price}</span>",
				select: [
					{ id: 1, label: "手机", price: 1000, icon: "phone" },
					{ id: 2, label: "电脑", price: 2000, icon: "laptop" },
					{ id: 3, label: "手表", price: 3000, icon: "watch" },
					{ id: 4, label: "耳机", price: 4000, icon: "headphones" },
					{ id: 5, label: "鼠标", price: 5000, icon: "mouse" },
					{ id: 6, label: "键盘", price: 6000, icon: "keyboard" },
					{ id: 8, label: "U盘", price: 8000, icon: "usb" },
					{ id: 13, label: "机械硬盘", price: 13000, icon: "hdd" },
					{ id: 14, label: "显卡", price: 14000, icon: "gpu" },
					{ id: 15, label: "蓝牙耳机", price: 15000, icon: "bluetooth" },
				],
				actions: [
					{ label: "产品网站", pos: "before" },
					{ label: "增加" },
					{ label: "减少" },
					{ label: "清空" },
				],
			}),
			ip: configurable("192.168.6.112", { label: "网络地址", widget: "ipaddress" }),
			access: configurable(false, {
				label: "允许访问",
				widget: "switch",
			}),
			depts: configurable(["产品部"], {
				label: "部门",
				widget: "tree-select",
				multiple: true,
				valueKey: "label", // 默认选择的是id
				onlySelectLeaf: false, // 只选择叶子节点
				items: orgTree,
				// onSelectionChange: (selection) => {}
			}),
			org: configurable(["工程部", "市场部"], {
				label: "组织架构",
				widget: "tree-dropdown",
				valueKey: "label",
				multiple: true,
				showAsPath: true,
				items: Object.assign({}, orgTree),
			}),
			adminDept: configurable(undefined, {
				label: "管理部门",
				placeholder: "选择管理部门",
				widget: "tree-dropdown",
				showAsPath: true,
				valueKey: "label",
				onlySelectLeaf: true,
				items: Object.assign({}, orgTree),
			}),
			tags: configurable(["测试"], {
				label: "标签",
				widget: "radio",
				select: ["前端", "后端", "测试", "运维"],
			}),
			rating: configurable(1, { label: "评分", widget: "rating" }),
			level: configurable(2, {
				label: "级别",
				widget: "radio-button",
				select: [
					{ label: "初级", value: 1 },
					{ label: "中级", value: 2 },
					{ label: "高级", value: 3 },
					{ label: "专家", value: 4 },
				],
			}),
			version: configurable(["2.0"], {
				widget: "select",
				multiple: true,
				label: "版本",
				clearable: true,
				actions: [
					{
						label: "升级",
						onClick: (value, { update }) => {
							console.log("升级版本到:", JSON.stringify(value));
							update(["3.0", "4.0"]);
						},
					},
				],
				//
				placeholder: "请选择版本",
				select: [
					{ label: "1.0" },
					{ label: "2.0" },
					{ label: "3.0" },
					{ label: "4.0" },
					{ label: "5.0" },
					{ label: "6.0" },
					"-",
					{ label: "7.0" },
					{ label: "8.0" },
				],
			}),
			volume: configurable(18, {
				widget: "range",
				label: "音量",
				min: 0,
				max: 100,
				toView: (value: any) => `${value}%`,
			}),
			worktime: configurable("12:12:11", { label: "上班时间", widget: "time" }),
			certificate: configurable(1, {
				label: "证件类型",
				widget: "radio",
				valueKey: "label",
				select: [
					{ label: "身份证", value: 1 },
					{ label: "护照", value: 2 },
					{ label: "军官证", value: 3 },
					{ label: "其他", value: 4 },
				],
			}),
			email: configurable("admin@autostore.com", { label: "电子邮件", widget: "email" }),
			color: configurable("#ff0000", { label: "颜色", widget: "colorpicker" }),
			qrcode: configurable("www.voerkai18n.com", { label: "扫描二维码", widget: "qrcode" }),
			notes: configurable("输入简历", {
				label: "简历",
				widget: "textarea",
				enable: computed<boolean>((state) => {
					return state.user.admin;
				}),
			}),
			address: {
				city: configurable("北京", {
					required: true,
					label: "城市",
					pill: true,
					enable: computed<boolean>((state) => {
						return state.user.admin;
					}),
				}),
				street: "长安街",
			},
		},
		x: 1,
	},
	{
		resetable: true,
		debug: true,
	},
);

const forms = Array.from(document.querySelectorAll("auto-form")) as AutoForm[];

forms.forEach((form) => {
	// @ts-ignore
	form!.bind(store);
});

globalThis.store = store;

declare namespace global {
	var store: AutoStore<any>;
}
