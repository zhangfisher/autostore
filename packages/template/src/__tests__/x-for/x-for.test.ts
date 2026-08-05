import { describe, expect, test } from "bun:test";
import "../setup";
import { mount, nextTick } from "../helpers";

describe("x-for 列表渲染（B 容器语义：直写普通元素）", () => {
    test("初始渲染 + 增项触发重建", async () => {
        const { root, store } = mount(
            `<ul x-for="item of items" :key="item.id"><li x-text="item.name"></li></ul>`,
            {
                items: [
                    { id: 1, name: "a" },
                    { id: 2, name: "b" },
                ],
            },
        );
        expect(root).toEqualHTML(`<div>
  <ul>
    <li>a</li>
    <li>b</li>
  </ul>
</div>`);
        store.state.items.push({ id: 3, name: "c" });
        await nextTick();
        expect(root).toEqualHTML(`<div>
  <ul>
    <li>a</li>
    <li>b</li>
    <li>c</li>
  </ul>
</div>`);
    });

    test("子项表达式绑定 item 并随项数据更新", async () => {
        const { root, store } = mount(
            `<ul x-for="item of items" :key="item.id"><li x-text="item.name + '!'"></li></ul>`,
            { items: [{ id: 1, name: "a" }] },
        );
        expect(root).toEqualHTML(`<div>
  <ul>
    <li>a!</li>
  </ul>
</div>`);
        store.state.items[0]!.name = "b";
        await nextTick();
        expect(root).toEqualHTML(`<div>
  <ul>
    <li>b!</li>
  </ul>
</div>`);
    });

    test("删项后列表同步缩短", async () => {
        const { root, store } = mount(
            `<ul x-for="item of items" :key="item.id"><li x-text="item.name"></li></ul>`,
            {
                items: [
                    { id: 1, name: "a" },
                    { id: 2, name: "b" },
                ],
            },
        );
        store.state.items.pop();
        await nextTick();
        expect(root).toEqualHTML(`<div>
  <ul>
    <li>a</li>
  </ul>
</div>`);
    });
});

describe("x-for 列表项响应式更新（项内容变更即时反映到 DOM）", () => {
    test("多项列表：改中间项内容，仅该项更新、其余项不串动", async () => {
        const { root, store } = mount(
            `<ul x-for="item of items" :key="item.id"><li x-text="item.name"></li></ul>`,
            {
                items: [
                    { id: 1, name: "a" },
                    { id: 2, name: "b" },
                    { id: 3, name: "c" },
                ],
            },
        );
        expect(root).toEqualHTML(`<div>
  <ul>
    <li>a</li>
    <li>b</li>
    <li>c</li>
  </ul>
</div>`);
        // 改中间项内容：仅第 2 项的 DOM 反映新值，首尾项内容不受影响（不串项）
        store.state.items[1]!.name = "B2";
        await nextTick();
        expect(root).toEqualHTML(`<div>
  <ul>
    <li>a</li>
    <li>B2</li>
    <li>c</li>
  </ul>
</div>`);
    });

    test("项内含多个响应式绑定元素：各自订阅、随项内容独立更新", async () => {
        // 项模板 <li> 内 <b x-text="item.name"> 与 <span x-text="item.age"> 两个响应式元素，
        // 经 compileSubtree 各自建 scope/订阅；改任一属性，仅对应元素反映新值。
        const { root, store } = mount(
            `<ul x-for="item of items" :key="item.id"><li><b x-text="item.name"></b><span x-text="item.age"></span></li></ul>`,
            { items: [{ id: 1, name: "a", age: 10 }] },
        );
        expect(root).toEqualHTML(`<div>
  <ul>
    <li>
      <b>a</b>
      <span>10</span>
    </li>
  </ul>
</div>`);
        // 改 age：仅 span 更新，b 保持原值（两绑定各自独立订阅同一项的不同属性）
        store.state.items[0]!.age = 20;
        await nextTick();
        expect(root).toEqualHTML(`<div>
  <ul>
    <li>
      <b>a</b>
      <span>20</span>
    </li>
  </ul>
</div>`);
        // 改 name：仅 b 更新，span 保持原值
        store.state.items[0]!.name = "A2";
        await nextTick();
        expect(root).toEqualHTML(`<div>
  <ul>
    <li>
      <b>A2</b>
      <span>20</span>
    </li>
  </ul>
</div>`);
    });
});

describe("x-for items 表达式", () => {
    test("items 为 filter 表达式：仅渲染筛选后的项", async () => {
        const { root, store } = mount(
            `<ul x-for="item of items.filter(x => x.active)" :key="item.id"><li x-text="item.name"></li></ul>`,
            {
                items: [
                    { id: 1, name: "a", active: true },
                    { id: 2, name: "b", active: false },
                    { id: 3, name: "c", active: true },
                ],
            },
        );
        expect(root).toEqualHTML(`<div>
  <ul>
    <li>a</li>
    <li>c</li>
  </ul>
</div>`);
        // 改某项 active：依赖变化触发重新筛选
        store.state.items[1]!.active = true;
        await nextTick();
        expect(root).toEqualHTML(`<div>
  <ul>
    <li>a</li>
    <li>b</li>
    <li>c</li>
  </ul>
</div>`);
    });

    test("items 为 map 表达式：自定义项变量名", async () => {
        const { root, store } = mount(
            `<ul x-for="name of items.map(x => x.name)" :key="name"><li x-text="name"></li></ul>`,
            {
                items: [
                    { id: 1, name: "a" },
                    { id: 2, name: "b" },
                ],
            },
        );
        expect(root).toEqualHTML(`<div>
  <ul>
    <li>a</li>
    <li>b</li>
  </ul>
</div>`);
        // 原数组变更触发重新 map
        store.state.items.push({ id: 3, name: "c" });
        await nextTick();
        expect(root).toEqualHTML(`<div>
  <ul>
    <li>a</li>
    <li>b</li>
    <li>c</li>
  </ul>
</div>`);
    });

    test("filter 表达式初始无匹配项：空容器", async () => {
        const { root, store } = mount(
            `<ul x-for="n of nums.filter(x => x > 5)" :key="n"><li x-text="n"></li></ul>`,
            { nums: [1, 2, 3] },
        );
        expect(root).toEqualHTML(`<div>
  <ul></ul>
</div>`);
        store.state.nums.push(8);
        await nextTick();
        expect(root).toEqualHTML(`<div>
  <ul>
    <li>8</li>
  </ul>
</div>`);
    });
});

describe("x-for 嵌套渲染", () => {
    test("二维矩阵：外层 row / 内层 cell，变量名互不冲突", async () => {
        const { root, store } = mount(
            `<ul x-for="row of matrix" :key="row.id"><li><b x-text="row.title"></b><ol x-for="cell of row.cells" :key="cell.id"><li x-text="cell.v"></li></ol></li></ul>`,
            {
                matrix: [
                    {
                        id: "r1",
                        title: "R1",
                        cells: [
                            { id: "c1", v: "a" },
                            { id: "c2", v: "b" },
                        ],
                    },
                    { id: "r2", title: "R2", cells: [{ id: "c3", v: "c" }] },
                ],
            },
        );
        expect(root).toEqualHTML(`<div>
  <ul>
    <li>
      <b>R1</b>
      <ol>
        <li>a</li>
        <li>b</li>
      </ol>
    </li>
    <li>
      <b>R2</b>
      <ol>
        <li>c</li>
      </ol>
    </li>
  </ul>
</div>`);
        // 内层数据变化：仅内层重建
        store.state.matrix[0]!.cells.push({ id: "c4", v: "d" });
        await nextTick();
        expect(root).toEqualHTML(`<div>
  <ul>
    <li>
      <b>R1</b>
      <ol>
        <li>a</li>
        <li>b</li>
        <li>d</li>
      </ol>
    </li>
    <li>
      <b>R2</b>
      <ol>
        <li>c</li>
      </ol>
    </li>
  </ul>
</div>`);
        // 外层数据变化：外层全量重建（内层随之重建）
        store.state.matrix.push({ id: "r3", title: "R3", cells: [{ id: "c5", v: "e" }] });
        await nextTick();
        expect(root).toEqualHTML(`<div>
  <ul>
    <li>
      <b>R1</b>
      <ol>
        <li>a</li>
        <li>b</li>
        <li>d</li>
      </ol>
    </li>
    <li>
      <b>R2</b>
      <ol>
        <li>c</li>
      </ol>
    </li>
    <li>
      <b>R3</b>
      <ol>
        <li>e</li>
      </ol>
    </li>
  </ul>
</div>`);
    });

    test("三级嵌套：group → row → cell", async () => {
        const { root } = mount(
            `<ul x-for="g of groups" :key="g.id"><li><i x-text="g.name"></i><ul x-for="r of g.rows" :key="r.id"><li><u x-text="r.name"></u><ol x-for="c of r.cells" :key="c"><li x-text="c"></li></ol></li></ul></li></ul>`,
            {
                groups: [
                    {
                        id: "g1",
                        name: "G1",
                        rows: [{ id: "r1", name: "R1", cells: ["a", "b"] }],
                    },
                ],
            },
        );
        expect(root).toEqualHTML(`<div>
  <ul>
    <li>
      <i>G1</i>
      <ul>
        <li>
          <u>R1</u>
          <ol>
            <li>a</li>
            <li>b</li>
          </ol>
        </li>
      </ul>
    </li>
  </ul>
</div>`);
    });
});

describe("x-for 嵌套作用域链（内层 body 引用外层变量）", () => {
    test("二层嵌套：内层 body 同时引用外层 row 与内层 cell", async () => {
        // 内层 li 属于 compileChild 创建的项作用域，localScope={cell,index}（无 _linkParent 继承），
        // `row` 只能经 getScopeContext 的 parent 链回退到外层项作用域解析。
        const { root, store } = mount(
            `<ul x-for="row of matrix" :key="row.id"><ol x-for="cell of row.cells" :key="cell.id"><li x-text="row.title + ':' + cell.v"></li></ol></ul>`,
            {
                matrix: [
                    {
                        id: "r1",
                        title: "R1",
                        cells: [
                            { id: "c1", v: "a" },
                            { id: "c2", v: "b" },
                        ],
                    },
                    { id: "r2", title: "R2", cells: [{ id: "c3", v: "c" }] },
                ],
            },
        );
        expect(root).toEqualHTML(`<div>
  <ul>
    <ol>
      <li>R1:a</li>
      <li>R1:b</li>
    </ol>
    <ol>
      <li>R2:c</li>
    </ol>
  </ul>
</div>`);
        // 外层变量变化：经 parent 链解析的读依赖被正确收集，内层 body 同步更新
        store.state.matrix[0]!.title = "R1x";
        await nextTick();
        expect(root).toEqualHTML(`<div>
  <ul>
    <ol>
      <li>R1x:a</li>
      <li>R1x:b</li>
    </ol>
    <ol>
      <li>R2:c</li>
    </ol>
  </ul>
</div>`);
        // 内层变量变化：局部更新
        store.state.matrix[0]!.cells[1]!.v = "B";
        await nextTick();
        expect(root).toEqualHTML(`<div>
  <ul>
    <ol>
      <li>R1x:a</li>
      <li>R1x:B</li>
    </ol>
    <ol>
      <li>R2:c</li>
    </ol>
  </ul>
</div>`);
    });

    test("三层嵌套：最内层 body 引用祖父 g / 父 r / 自身 c", async () => {
        // 每层项作用域均由 compileChild 创建、仅含自身局部变量（无继承），
        // g/r 只能经多级 parent 链逐层回退解析——decisive 的 parent 链回归用例。
        const { root } = mount(
            `<ul x-for="g of groups" :key="g.id">
                <ol x-for="r of g.rows" :key="r.id">
                    <li x-for="c of r.cells" :key="c">
                        <span x-text="g.name + '/' + r.name + '/' + c"></span>
                    </li>
                </ol>
            </ul>`,
            {
                groups: [
                    {
                        id: "g1",
                        name: "G",
                        rows: [
                            { id: "r1", name: "R1", cells: ["a1", "b1"] },
                            { id: "r2", name: "R2", cells: ["a2", "b2"] },
                            { id: "r3", name: "R3", cells: ["a3", "b3"] },
                        ],
                    },
                ],
            },
        );
        // B 容器语义：1 个 g → 1 个 ol（ol 既是 g 的项、又是 r 的容器）；
        // 该 ol 下 3 个 r → 3 个 li；每个 li 下 2 个 c → 2 个 span。
        // 最内层 span 经多级 parent 链解析：祖父 g.name="G" / 父 r.name="R1~R3" / 自身 c。
        expect(root).toEqualHTML(`<div>
  <ul>
    <ol>
      <li>
        <span>G/R1/a1</span>
        <span>G/R1/b1</span>
      </li>
      <li>
        <span>G/R2/a2</span>
        <span>G/R2/b2</span>
      </li>
      <li>
        <span>G/R3/a3</span>
        <span>G/R3/b3</span>
      </li>
    </ol>
  </ul>
</div>`);
    });

    test("变量遮蔽：内层同名 item 遮蔽外层 item", async () => {
        // 外层 item.v="OUT"，内层 item（item of item.inner）应遮蔽外层；
        // 内层 body 取到内层项的 v，验证每层 hasOwnProperty 优先于 parent 链。
        const { root } = mount(
            `<ul x-for="item of outer" :key="item.id"><ol x-for="item of item.inner" :key="item.id"><li x-text="item.v"></li></ol></ul>`,
            {
                outer: [
                    {
                        id: 1,
                        v: "OUT",
                        inner: [
                            { id: 10, v: "in1" },
                            { id: 11, v: "in2" },
                        ],
                    },
                ],
            },
        );
        expect(root).toEqualHTML(`<div>
  <ul>
    <ol>
      <li>in1</li>
      <li>in2</li>
    </ol>
  </ul>
</div>`);
    });
});

describe("x-for 与 x-if 等指令组合", () => {
    test("x-for 子项内嵌 x-if：按项数据条件显隐", async () => {
        const { root, store } = mount(
            `<ul x-for="item of items" :key="item.id"><li x-if="item.show" x-text="item.name"></li></ul>`,
            {
                items: [
                    { id: 1, name: "a", show: true },
                    { id: 2, name: "b", show: false },
                ],
            },
        );
        // b 的 li 存在但 display:none（x-if v1 不移除 DOM）
        expect(root).toEqualHTML(`<div>
  <ul>
    <li>a</li>
    <li style="display: none;">b</li>
  </ul>
</div>`);
        store.state.items[1]!.show = true;
        await nextTick();
        expect(root).toEqualHTML(`<div>
  <ul>
    <li>a</li>
    <li>b</li>
  </ul>
</div>`);
    });

    test("x-for + x-if + x-text 表达式：隐藏期间子树 watcher 仍累积最新值", async () => {
        const { root, store } = mount(
            `<ul x-for="item of items" :key="item.id"><li x-if="item.show" x-text="item.name + '!'"></li></ul>`,
            { items: [{ id: 1, name: "a", show: false }] },
        );
        // 初始隐藏
        expect(root).toEqualHTML(`<div>
  <ul>
    <li style="display: none;">a!</li>
  </ul>
</div>`);
        // 隐藏期间改 name：x-if v1 子树 watcher 仍存活，DOM 被 patch（不可见）
        store.state.items[0]!.name = "b";
        await nextTick();
        expect(root).toEqualHTML(`<div>
  <ul>
    <li style="display: none;">b!</li>
  </ul>
</div>`);
        // 显示：直接反映累积的最新值
        store.state.items[0]!.show = true;
        await nextTick();
        expect(root).toEqualHTML(`<div>
  <ul>
    <li>b!</li>
  </ul>
</div>`);
    });

    test("嵌套 x-for + x-if：内层按条件渲染部分 cell", async () => {
        const { root, store } = mount(
            `<ul x-for="row of matrix" :key="row.id"><li><b x-text="row.title"></b><ol x-for="cell of row.cells" :key="cell.id"><li x-if="cell.on" x-text="cell.v"></li></ol></li></ul>`,
            {
                matrix: [
                    {
                        id: "r1",
                        title: "R1",
                        cells: [
                            { id: "c1", v: "a", on: true },
                            { id: "c2", v: "b", on: false },
                            { id: "c3", v: "c", on: true },
                        ],
                    },
                ],
            },
        );
        // c2 的 li 存在但 display:none
        expect(root).toEqualHTML(`<div>
  <ul>
    <li>
      <b>R1</b>
      <ol>
        <li>a</li>
        <li style="display: none;">b</li>
        <li>c</li>
      </ol>
    </li>
  </ul>
</div>`);
        store.state.matrix[0]!.cells[1]!.on = true;
        await nextTick();
        expect(root).toEqualHTML(`<div>
  <ul>
    <li>
      <b>R1</b>
      <ol>
        <li>a</li>
        <li>b</li>
        <li>c</li>
      </ol>
    </li>
  </ul>
</div>`);
    });
});

describe("x-for B 语义新增能力", () => {
    test("无 :key：缺省用 index，增删项正常", async () => {
        const { root, store } = mount(
            `<ul x-for="item of items"><li x-text="item.name"></li></ul>`,
            {
                items: [{ name: "a" }, { name: "b" }],
            },
        );
        expect(root).toEqualHTML(`<div>
  <ul>
    <li>a</li>
    <li>b</li>
  </ul>
</div>`);
        store.state.items.push({ name: "c" });
        await nextTick();
        expect(root).toEqualHTML(`<div>
  <ul>
    <li>a</li>
    <li>b</li>
    <li>c</li>
  </ul>
</div>`);
        store.state.items.shift();
        await nextTick();
        expect(root).toEqualHTML(`<div>
  <ul>
    <li>b</li>
    <li>c</li>
  </ul>
</div>`);
    });

    test("x-for 与 x-show 同元素：x-show 控制整个容器显隐（保留项子树与 watcher）", async () => {
        // x-for + eager x-if 同元素已禁止（语义冲突）；控制整表显隐用 x-show（= x-if.keep）
        const { root, store } = mount(
            `<ul x-for="item of items" :key="item.id" x-show="show"><li x-text="item.name"></li></ul>`,
            {
                show: false,
                items: [
                    { id: 1, name: "a" },
                    { id: 2, name: "b" },
                ],
            },
        );
        // show=false：容器 display:none，项仍渲染在其内（x-show 不动子树）
        expect(root).toEqualHTML(`<div>
  <ul style="display: none;">
    <li>a</li>
    <li>b</li>
  </ul>
</div>`);
        store.state.show = true;
        await nextTick();
        expect(root).toEqualHTML(`<div>
  <ul>
    <li>a</li>
    <li>b</li>
  </ul>
</div>`);
    });

    test("容器有多个元素子节点：全部作为复合项一起循环", async () => {
        const { root, store } = mount(
            `<ul x-for="item of items" :key="item.id"><li x-text="item.name"></li><li x-text="'[' + item.name + ']'"></li></ul>`,
            {
                items: [
                    { id: 1, name: "a" },
                    { id: 2, name: "b" },
                ],
            },
        );
        // 每项渲染两个 li（复合项），按文档顺序连续插入
        expect(root).toEqualHTML(`<div>
  <ul>
    <li>a</li>
    <li>[a]</li>
    <li>b</li>
    <li>[b]</li>
  </ul>
</div>`);
        // 增项：新项的两个成员一起追加
        store.state.items.push({ id: 3, name: "c" });
        await nextTick();
        expect(root).toEqualHTML(`<div>
  <ul>
    <li>a</li>
    <li>[a]</li>
    <li>b</li>
    <li>[b]</li>
    <li>c</li>
    <li>[c]</li>
  </ul>
</div>`);
    });

    test("复合项含嵌套 x-for：每项多成员，其一为内层循环", async () => {
        // 关键风险点：每个外层迭代用同一 localScope 编译多个成员，
        // 其中 <ol x-for> 成员自身是结构指令、起自己的 render。
        // 验证：外层 row.title 与内层 cell.v 均正确，parent 链不串项，内外层增项各自正确重建。
        const { root, store } = mount(
            `<ul x-for="row of matrix" :key="row.id"><li x-text="row.title"></li><ol x-for="cell of row.cells" :key="cell.id"><li x-text="cell.v"></li></ol></ul>`,
            {
                matrix: [
                    {
                        id: "r1",
                        title: "R1",
                        cells: [
                            { id: "c1", v: "a" },
                            { id: "c2", v: "b" },
                        ],
                    },
                    { id: "r2", title: "R2", cells: [{ id: "c3", v: "c" }] },
                ],
            },
        );
        // 每个外层项 = 1 个 li（标题）+ 1 个 ol（内层循环容器，其内 N 个 li）
        expect(root).toEqualHTML(`<div>
  <ul>
    <li>R1</li>
    <ol>
      <li>a</li>
      <li>b</li>
    </ol>
    <li>R2</li>
    <ol>
      <li>c</li>
    </ol>
  </ul>
</div>`);
        // 内层增项：仅对应 ol 重建
        store.state.matrix[0]!.cells.push({ id: "c4", v: "d" });
        await nextTick();
        expect(root).toEqualHTML(`<div>
  <ul>
    <li>R1</li>
    <ol>
      <li>a</li>
      <li>b</li>
      <li>d</li>
    </ol>
    <li>R2</li>
    <ol>
      <li>c</li>
    </ol>
  </ul>
</div>`);
        // 外层增项：新项的 li + ol 一起追加
        store.state.matrix.push({ id: "r3", title: "R3", cells: [{ id: "c5", v: "e" }] });
        await nextTick();
        expect(root).toEqualHTML(`<div>
  <ul>
    <li>R1</li>
    <ol>
      <li>a</li>
      <li>b</li>
      <li>d</li>
    </ol>
    <li>R2</li>
    <ol>
      <li>c</li>
    </ol>
    <li>R3</li>
    <ol>
      <li>e</li>
    </ol>
  </ul>
</div>`);
    });
});

describe("x-for 循环变量注入（$index/$length/$begin/$end/$odd/$even）", () => {
    test("基本注入：$index 与 $odd/$even（对齐 CSS :nth-child）", async () => {
        const { root } = mount(
            `<ul x-for="n of nums"><li x-text="$index + ':' + n + '(' + ($odd ? 'O' : 'E') + ')'"></li></ul>`,
            { nums: ["a", "b", "c"] },
        );
        // $index 0-based；$odd 对齐 :nth-child → 第 1,3 行($index 0,2)为 O，第 2 行($index 1)为 E
        expect(root).toEqualHTML(`<div>
  <ul>
    <li>0:a(O)</li>
    <li>1:b(E)</li>
    <li>2:c(O)</li>
  </ul>
</div>`);
    });

    test("$begin/$end/$length：首末项与总长度，随增删项同步切换", async () => {
        const { root, store } = mount(
            `<ul x-for="n of nums"><li x-text="n + ($begin ? 'B' : '') + ($end ? 'L' : '') + $length"></li></ul>`,
            { nums: ["a", "b", "c"] },
        );
        // 3 项：首项 B、末项 L、$length=3
        expect(root).toEqualHTML(`<div>
  <ul>
    <li>aB3</li>
    <li>b3</li>
    <li>cL3</li>
  </ul>
</div>`);
        // 增项：$length→4，末项 L 转移到 d，c 不再是末项
        store.state.nums.push("d");
        await nextTick();
        expect(root).toEqualHTML(`<div>
  <ul>
    <li>aB4</li>
    <li>b4</li>
    <li>c4</li>
    <li>dL4</li>
  </ul>
</div>`);
        // 删首项：$begin 转移到原第二项 b
        store.state.nums.shift();
        await nextTick();
        expect(root).toEqualHTML(`<div>
  <ul>
    <li>bB3</li>
    <li>c3</li>
    <li>dL3</li>
  </ul>
</div>`);
    });

    test("$end + x-if：行间分隔线，末行隐藏（hr 为叶子，eager 退化为 display:none）", async () => {
        const { root, store } = mount(
            `<ul x-for="n of nums"><li x-text="n"></li><hr x-if="!$end"/></ul>`,
            { nums: ["a", "b", "c"] },
        );
        // hr 无子树：eager 销毁无对象，退化为 display:none；仅末项 hr 隐藏
        expect(root).toEqualHTML(`<div>
  <ul>
    <li>a</li>
    <hr>
    <li>b</li>
    <hr>
    <li>c</li>
    <hr style="display: none;">
  </ul>
</div>`);
        // 增项：原末项 c 的 hr 恢复显示，新末项 d 的 hr 隐藏（$end 切换 → 全量重建后正确）
        store.state.nums.push("d");
        await nextTick();
        expect(root).toEqualHTML(`<div>
  <ul>
    <li>a</li>
    <hr>
    <li>b</li>
    <hr>
    <li>c</li>
    <hr>
    <li>d</li>
    <hr style="display: none;">
  </ul>
</div>`);
    });

    test("单项列表：既是 $begin 又是 $end", async () => {
        const { root } = mount(
            `<ul x-for="n of nums"><li x-text="$begin + '|' + $end + '|' + $odd + '|' + $even + '|' + $length"></li></ul>`,
            { nums: ["only"] },
        );
        // 单项：index=0 → begin=T end=T(0===0) odd=T(0 为偶,对齐 :nth-child) even=F length=1
        expect(root).toEqualHTML(`<div>
  <ul>
    <li>true|true|true|false|1</li>
  </ul>
</div>`);
    });

    test("自定义 index 名与 $index 共存", async () => {
        // 用户把序号命名为 i，$index 仍作为固定别名同时注入
        const { root } = mount(`<ul x-for="n,i of nums"><li x-text="i + '/' + $index"></li></ul>`, {
            nums: ["a", "b"],
        });
        expect(root).toEqualHTML(`<div>
  <ul>
    <li>0/0</li>
    <li>1/1</li>
  </ul>
</div>`);
    });

    test("嵌套遮蔽：内层 $index 遮蔽外层", async () => {
        // 内层 $index 命中自身 localScope、遮蔽外层；跨层引用需自定义 index 名
        const { root } = mount(
            `<ul x-for="row of matrix"><ol x-for="cell of row.cells"><li x-text="$index"></li></ol></ul>`,
            {
                matrix: [{ cells: ["a", "b"] }, { cells: ["c"] }],
            },
        );
        expect(root).toEqualHTML(`<div>
  <ul>
    <ol>
      <li>0</li>
      <li>1</li>
    </ol>
    <ol>
      <li>0</li>
    </ol>
  </ul>
</div>`);
    });
});

/** 从 engine.scopes 反查元素对应的 scope（结构指令泄漏回归测试用） */
function scopeOf(engine: any, el: Element): any {
    for (const [ref, scope] of engine.scopes) {
        if (ref.deref() === el) return scope;
    }
    return undefined;
}

describe("x-for 结构变化无 children 泄漏（destroy 自移除父级）", () => {
    test("push/pop/整体替换/多次累积：binding.children.size 恒等于存活项数", async () => {
        const { root, store, engine } = mount(
            `<ul x-for="item of items" :key="item.id"><li x-text="item.name"></li></ul>`,
            {
                items: [
                    { id: 1, name: "a" },
                    { id: 2, name: "b" },
                ],
            },
        );
        const ul = root.querySelector("ul")!;
        const binding = scopeOf(engine, ul);
        expect(binding).toBeDefined();
        expect(binding.children.size).toBe(2);

        // push：2→3，旧 2 项重建后其 scope 必须从父级 children 移除（修复前 size 会涨到 5）
        store.state.items.push({ id: 3, name: "c" });
        await nextTick();
        expect(root.querySelectorAll("li").length).toBe(3);
        expect(binding.children.size).toBe(3);

        // pop：3→2
        store.state.items.pop();
        await nextTick();
        expect(binding.children.size).toBe(2);

        // 整体替换：旧项 scope 全清，新 3 项加入
        store.state.items = [
            { id: 4, name: "x" },
            { id: 5, name: "y" },
            { id: 6, name: "z" },
        ];
        await nextTick();
        expect(binding.children.size).toBe(3);

        // 多次 push 累积：size 必须始终 = 当前项数（修复前会线性增长 3→7→11→…）
        for (let i = 0; i < 5; i++) {
            store.state.items.push({ id: 100 + i, name: `n${i}` });
            await nextTick();
        }
        expect(root.querySelectorAll("li").length).toBe(8);
        expect(binding.children.size).toBe(8);
    });

    test("复合项（多项模板）：结构变化后各成员 scope 同步从父级脱离，无残留", async () => {
        // 复合项 dt+dd：每个成员各自经 compileChild 建独立 scope 并 addChild 到容器 binding.children，
        // 故 binding.children.size = 项数 × 成员模板数（此处 ×2）。
        // 结构变化重建时，旧项的全部成员 scope 都应从父级脱离（修复前会按"项数×成员数"线性堆积）。
        const { root, store, engine } = mount(
            `<dl x-for="item of items"><dt x-text="item.k"></dt><dd x-text="item.v"></dd></dl>`,
            {
                items: [
                    { k: "a", v: "1" },
                    { k: "b", v: "2" },
                ],
            },
        );
        const dl = root.querySelector("dl")!;
        const binding = scopeOf(engine, dl);
        expect(binding).toBeDefined();
        // 2 项 × 2 成员（dt+dd）= 4
        expect(binding.children.size).toBe(4);

        store.state.items.push({ k: "c", v: "3" });
        await nextTick();
        expect(root.querySelectorAll("dt").length).toBe(3);
        // 3 项 × 2 成员 = 6
        expect(binding.children.size).toBe(6);

        // 反复整体替换为单项：成员 scope 不堆积，恒为 1×2=2
        for (let i = 0; i < 4; i++) {
            store.state.items = [{ k: `k${i}`, v: `${i}` }];
            await nextTick();
        }
        expect(root.querySelectorAll("dt").length).toBe(1);
        expect(binding.children.size).toBe(2);
    });
});
