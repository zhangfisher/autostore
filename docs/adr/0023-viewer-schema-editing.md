# viewer 行内编辑的整体编辑规则与 UI 预校验

autostore-viewer 的 schema 化行内编辑（编辑控件由 schema.widget 决定，未声明时叶子按值类型回落，未知 widget 一律回落标准 input）包含两项有意为之、变更即破坏用户预期的决策：

## 一、对象/数组整体编辑

**所有对象/数组节点**（含 configurable 容器与 markRaw 对象）默认以 JSON 文本在 textarea 中整体编辑（缩进 2 序列化，输入合法即整体替换写回，即时生效）；configurable 容器照常渲染子节点，整容器与各成员的编辑并存。声明 schema.widget 的容器按声明控件渲染。computed/function 叶子无编辑语义，不可编辑。

修订记录：初版为"保护式"规则——后代存在 configurable 成员的容器不可整体编辑（避免绕过成员 widget/校验），configurable 容器折叠为整体节点不渲染后代。后按使用反馈放开：编辑在所有节点上生效，configurable 容器同样渲染子节点，整体编辑与成员编辑并存，保护代码已移除。

## 二、viewer UI 层预校验与 core 写入校验双轨（即时生效模式）

viewer 在**输入变化时即时**运行 required + schema.validate：值有效立即写入 store（无确认/取消），值无效不写入并在控件下方实时显示红色错误，修正后自动写入并隐藏。与 core 写入时校验（onInvalid/ValidateError）并存——看似重复，实为两层时机不同的防线：UI 层阻止无效值进入 store，core 层兜底其余写入通道。键盘语义随之简化：Enter 仅承担"前进到下一个可编辑节点"（当前值无效时不前进；textarea 的 Enter 为换行），Esc 不再拦截（无取消语义），失焦即退出编辑（值已写入，退出仅回填树显示）。原生 HTML 约束（pattern/minLength/min/max 等）仅透传为控件属性，不纳入红色错误体系，避免与 schema 校验双轨提示。

修订记录：初版为 confirm 模式（Enter/✓ 确认时校验写入，✗/Esc 取消丢弃）；后应交互简化需求改为即时生效模式，确认/取消概念整体移除。

**实现约束（非显而易见）**：编辑写入会触发 store watcher 重建树节点，若放行将重渲染编辑控件并重置输入光标。因此编辑期间该节点的树更新被冻结（watch 回调按路径跳过，外部更新也一并延迟），退出编辑/Enter 链式切换时从 state 回填该节点。
