---
name: pencil-design-restoration
description: "Restore an Ardena design稿, page, or component in any target .pen file with mcp_pencil_batch_design and carry the change through the Flutter repo. Use when you need to rebuild a .pen file from the existing .pen structure, screenshots, benchmark references, or user instructions; assess non-display-layer impact first (provider, route, model, service, database, i18n, assets, analytics, tests); create an adjustment plan; restore the design in Pencil; then execute the required Flutter code changes."
argument-hint: "描述目标 .pen 文件、要还原的范围（整个设计稿 / 页面 / 组件）、参考来源、对应 Flutter 落点，以及是否要求连带改 provider、route、model、service、i18n 或测试"
user-invocable: true
---

# Pencil Design Restoration

## Purpose

- 用 Pencil MCP 还原当前 Ardena 仓库中的设计稿，不把任务截断在视觉层。
- 在任何设计修改前，先评估“完全还原设计稿”会逼出哪些非显示层代码调整。
- 先产出可执行的调整方案，再还原设计稿，最后继续执行 Flutter 仓库中的对应改动。
- 让 .pen 设计、表现层代码和非显示层接线保持一致，而不是各自漂移。

## When To Use

- 需要用 mcp_pencil_batch_design 还原整个设计稿、单个页面或单个组件。
- 参考源来自现有 .pen 结构、截图、竞品或用户说明，需要在任意目标 .pen 文件中重建设计结构。
- 任务不只是改界面，还要求提前判断 provider、route、model、service、database、i18n、theme、asset、analytics 或测试是否需要跟着调整。
- 希望设计恢复完成后，继续把 Flutter 仓库里为完全还原所需的代码链路补齐。

## Do Not Use

- 纯视觉评审、打分或设计 critique，没有要求落盘 .pen 或改代码。
- 纯 Flutter 代码实现，不涉及设计稿恢复或 Pencil MCP。
- 只需要产出讨论方案，不需要实际修改设计稿或仓库代码。

## Workspace Anchors

- 目标 .pen 文件优先遵循用户显式指定的路径；未指定时优先使用当前激活的 .pen 文档。
- Flutter 落点优先从 lib/features 下对应 feature 开始，再看 lib/shared/presentation、lib/shared/data、lib/app.dart 和路由入口。
- 任何文案调整都要同步检查 lib/l10n。

## Default Boundaries

- 如果用户显式指定了 .pen 文件，就只操作该目标文件。
- 如果用户未指定 .pen 文件但当前已有激活的 .pen 文档，默认操作当前激活文档。
- 如果既未指定目标文件，也没有激活的 .pen 文档，再回退到 docs/ardena.pen。
- 如果用户要求“整个设计稿”还原，默认按页面或模块分批推进，而不是一次性全量铺开。
- 如果完全还原设计会牵出 schema、接口契约、远端 API、核心业务规则或跨 feature 大范围数据链路调整，先完成影响评估与执行方案，再请求确认；不要在这些高影响改动上默认自动落地。
- 如果所需改动仍在当前锚点附近的表现层、共享组件、provider、route、i18n 或局部 service/repository 接线范围内，则按方案继续自动实施。

## Hard Rules

- 读取或修改 .pen 文件时，只能使用 Pencil MCP 工具，不能用普通文件读取、grep 或文本编辑工具直接碰 .pen。
- 默认不检查设计文档、PRD 或其他说明文档；除非用户明确要求，否则只基于目标 .pen 文件及直接提供的可视参考推进。
- 设计稿中的数字、姓名、头像、列表项、标签、图表值、订单号或摘要文本可能只是数据填充位；在确认其真实语义前，不要把这些示例值逐字逐项还原成最终设计或代码常量。
- 在第一次设计修改前，必须先明确最小代码锚点，并写出非显示层调整方案。
- 如果设计完全还原会牵出未定义的业务规则、接口或数据结构，先把阻塞点写清楚，再决定分阶段实施，不要默默脑补规则。
- 设计恢复按可验证的小批次推进；单次 mcp_pencil_batch_design 操作列表尽量控制在 25 条以内。
- 第一次实质性编辑后，下一步必须先做聚焦验证：设计侧看截图或布局，代码侧跑最小分析或测试。
- 代码调整必须从拥有行为的最小抽象开始，避免只改外围接线层。
- 不手改生成文件；如果触发 l10n、Freezed、JSON、Drift 或其他生成链，要把生成影响面明确算入任务。

## Decision Flow

### 1. Define Scope

- 先判断还原对象是整个设计稿、单页面还是单组件。
- 识别参考来源：现有 .pen、截图、竞品或用户文字说明。
- 映射到 Flutter 锚点：对应 screen、widget、shared component、provider、route 或数据链路。
- 如果用户没有给出目标页面或组件，先在设计与代码两侧各找一个最近锚点，再继续实施。

### 2. Gather Design Context

- 先调用 mcp_pencil_get_editor_state(include_schema: true) 确认当前打开的 .pen 文档和选区。
- 如果用户指定了目标 .pen 文件，先打开该文件；否则优先沿用当前活动 .pen 文档；两者都没有时再打开 docs/ardena.pen。
- 用 mcp_pencil_batch_get 读取目标 frame、组件和邻近结构，必要时补 mcp_pencil_get_variables 看 token。
- 用 mcp_pencil_snapshot_layout 确认布局骨架；需要视觉核对时用 mcp_pencil_get_screenshot。
- 如果是整页或整稿恢复，先确定分批边界，不一次性铺满整个画布。

### 3. Gather Code Context

- 从最小 Flutter 锚点开始：screen、widget、provider、route、repository 或 model，而不是先扫全仓库。
- 形成一个可证伪的本地假设：当前实现缺了什么，或者哪条代码路径控制了与设计不一致的行为。
- 只做一个便宜的区分性检查来验证这个假设，例如附近调用点、已有状态分支、邻近测试或最小 analyze。

### 4. Assess Non-Display Impact Before Design Restoration

- 在动设计前，明确“如果完全还原这个设计，哪些非显示层必须跟上”。
- 先区分哪些是结构性 UI 元素，哪些更像数据填充位或样例内容；标题、导航、固定按钮文案通常直接还原，列表行、统计值、图表点、示例头像或业务编号则需要先判断真实数据来源。
- 至少检查以下类别：
- route 与入口参数
- 本地状态与 Riverpod provider 边界
- loading、empty、error、success、submit 等状态覆盖
- model、DTO、entity、serializer 或 Drift schema
- repository、service、use case 或远端/本地数据接线
- l10n 文案与 ARB key
- theme token、asset、图标或共享组件能力
- analytics、权限、feature flag 或埋点
- 相关测试、生成链和验证命令
- 如果某些内容更像样例数据，优先恢复它们的布局槽位、格式规则、重复模式和状态覆盖，而不是把示例值本身当成最终业务真值。
- 产出一个顺序明确的调整方案：哪些是设计前已知依赖，哪些在设计恢复后立即执行，哪些可以保留为后续项。
- 如果方案触及 schema、接口契约、远端 API 或跨 feature 核心规则，把这些项标记为高影响项，并在执行前单独等待确认。
- 如果评估结果是“不需要非显示层改动”，也要明确写出来，而不是省略。

### 5. Restore The Design In Pencil

- 使用 mcp_pencil_batch_design 分批恢复结构、内容和样式，优先搭骨架，再补细节。
- 如果已有相近组件，优先复用、复制或替换，而不是从零散落创建。
- 组件恢复优先保持可复用结构；整页恢复优先按区域或模块分块推进。
- 遇到疑似数据填充位时，优先恢复信息密度、排版模式、容器结构和数据槽位，不默认复制所有示例值。
- 批量规范色彩、字体、圆角、间距时，优先考虑 search_all_unique_properties 与 replace_all_matching_properties。

### 6. Validate The Design Immediately

- 每一批关键设计修改后，都要立刻看一次截图或布局，不把错位积累到最后。
- 重点检查：重叠、裁切、对齐、占位结构、组件层级和视觉节奏。
- 如果是从截图恢复，确保不是只像，而是结构上也支持后续代码实现。

### 7. Execute The Adjustment Plan In Flutter

- 设计恢复达到可用状态后，立即执行前面列出的非显示层调整方案。
- 改动顺序遵循最小拥有者与依赖方向：shared component 或 screen -> provider/state -> route -> data/model/service -> i18n/test。
- 所有表现层改动优先复用当前仓库已有主题、共享组件、导航和交互模式。
- 如果设计新增了状态、入口、提交动作或数据来源，不要把业务逻辑硬塞进 widget 本地变量。
- 高影响项只输出可执行落地方案与影响面，不默认自动提交实现。
- 只在确有需要时触发代码生成，并在总结里说明用户是否还需补跑生成链。

### 8. Run Focused Validation

- 设计侧至少保留一次最终截图或布局验证。
- 代码侧至少执行一次最小 analyze、test 或其他能覆盖改动切片的验证。
- 如果验证失败但仍指向当前假设，先修同一切片并复跑，不要立刻扩面。

## Non-Display Checklist

- 路由入口、深链、参数与跳转链路
- Provider 状态边界与依赖关系
- 异步状态覆盖是否完整
- Model、DTO、entity、mapper、schema 与序列化
- Repository、service、use case 与数据流向
- 国际化文案与本地化键
- Theme token、asset 和共享组件能力
- 埋点、权限、功能开关与运行期开关
- 测试、格式化、分析和代码生成影响面

## Completion Checks

- 设计稿已在 .pen 中恢复到可验证状态，而不是停留在口头方案。
- 非显示层影响在设计修改前已经评估过，并形成了明确方案。
- 设计恢复完成后，方案中的必要代码调整已经继续执行，而不是被留空。
- 已区分固定展示内容与数据填充位，没有把样例数据误还原为最终常量、真实记录或错误的数据结构假设。
- 设计验证与代码验证至少各完成一次聚焦检查。
- 任何剩余阻塞都被显式列出，没有被静默跳过。

## Output Style

- 默认直接落设计和代码，不先输出冗长方案文档。
- 只有在目标页面、组件边界或业务规则缺失到足以阻塞实施时才提问。
- 收尾时只保留三类信息：还原了什么、为了完全还原补了哪些非显示层调整、验证结果如何。

## Example Prompts

- /pencil-design-restoration 用 docs/ardena.pen 还原 Daily Focus 页面，先评估 provider、route 和中英文文案是否要调整，再把代码链路补齐
- /pencil-design-restoration 在 docs/marketing_site.pen 还原首页 Hero 区域，先评估 route、共享组件和文案影响，再执行代码调整
- /pencil-design-restoration 根据设计截图恢复一个统计卡片组件，先判断 shared widget、theme token 和数据模型是否要跟着改
- /pencil-design-restoration 完整还原一个 onboarding flow，先列出 route、state、i18n、analytics 的影响，再分批恢复设计并执行代码方案