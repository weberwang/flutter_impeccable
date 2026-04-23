---
name: pencil-design-restoration
description: "Restore a design稿, page, or component in a target .pen file with Pencil MCP and carry the change through the Flutter repo. Use when rebuilding from existing .pen structure, screenshots, benchmark references, or user instructions; assess non-display-layer impact first; restore the design-to-theme mapping before restoring pages or components; map Pencil layout safely to Flutter structure; avoid naive mistakes like making whole regions scrollable, restoring placeholders as final widgets, or mirroring design lists directly into ListView/GridView; then restore the design and execute the required Flutter code changes."
argument-hint: "描述目标 .pen 文件、要还原的范围（整个设计稿 / 页面 / 组件）、参考来源、对应 Flutter 落点，以及是否要求连带改 theme token、共享组件、provider、route、model、service、i18n 或测试"
user-invocable: true
---

# Pencil Design Restoration

## Common Error Assessment

- 最常见的结构性错误不是颜色或间距，而是把 Pencil 里的视觉分区直接一比一翻译成 Flutter 组件树。
- 高风险错误一：把整块页面区域都塞进单个滚动容器，只因为设计稿看起来是“一个长页面”；这会吞掉固定 header、bottom action、tab、filter bar 或局部可滚动区的真实边界。
- 高风险错误二：把设计稿里的占位组件、skeleton、mock 卡片、示例头像、示例文案或演示图表直接还原成最终 Flutter 组件，而不是先判断它们是占位态、空态、示意内容还是正式 UI。
- 高风险错误三：看见重复行、卡片列或表格块，就直接落成 ListView、GridView 或 builder；很多设计里的重复结构只是静态排版示意、小样本布局，真实实现可能应该是普通 Column、Wrap、分段 section 或仅一个可复用 item。
- 高风险错误四：为追求“截图像”，把多个滚动体嵌套起来，例如 SingleChildScrollView 包整页，再在内部放 ListView/GridView；这通常会引出约束错误、手势冲突和错误的可视层级。
- 高风险错误五：把组件实例里的 slot、占位区和数据槽位直接扁平化成固定子节点，导致后续 Flutter 无法用真实数据、状态或复用组件替换。
- 当前 skill 已覆盖“不要把样例数据当真值”，但还需要把这些 Pencil 到 Flutter 的结构映射错误显式写成硬规则与验证项。

## Purpose

- 用 Pencil MCP 还原设计稿，不把任务截断在视觉层。
- 先把设计稿中的视觉 token、组件模式和语义槽位映射回主题，再复用主题逐步还原页面和组件。
- 在任何设计修改前，先评估“完全还原设计稿”会逼出哪些非显示层代码调整。
- 先产出可执行的调整方案，再还原设计稿，最后继续执行 Flutter 仓库中的对应改动。
- 让 .pen 设计、Flutter 组件树和非显示层接线保持一致，而不是把视觉结构生硬复制成错误的实现结构。

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
- Flutter 落点优先从主题与共享组件入口开始，再看 lib/features 下对应 feature、lib/shared/presentation、lib/shared/data、lib/app.dart 和路由入口。
- 任何文案调整都要同步检查 lib/l10n。

## Pencil To Flutter Mapping Rules

- 在恢复任何页面或组件前，先把颜色、字体、字号层级、间距、圆角、描边、阴影、图标尺寸和常见容器模式映射到现有主题 token、变量或共享组件。
- 只有当差异是可复用、跨页面出现且无法被现有主题吸收时，才新增主题 token、变量或共享组件；不要为了单个局部视觉差异先扩主题。
- 先把 Pencil 节点分成四类：固定 chrome、主内容区、局部滚动区、覆盖层；不要把整个 frame 默认翻译成一个可滚动 body。
- Flutter 页面默认只应有一个主滚动拥有者；只有当设计明确存在独立滚动区域时，才引入第二个滚动体。
- 设计稿里的重复 item 先判断语义：它是数据驱动集合、静态展示组、还是占位示意；在语义未确认前，不要直接落成 ListView、GridView、CustomScrollView 或 Sliver 列表。
- 设计稿中的 placeholder、skeleton、灰块、示意头像、演示图表、假按钮或 mock 文案，先判断它们属于 loading、empty、demo data 还是最终 UI；不要直接当成最终组件实现。
- 组件实例优先保留 slot 和可替换区域语义；恢复设计时要为 Flutter 留出可复用 widget、builder 和状态分支，而不是把 slot 展平为固定子树。
- 如果一个区域在 Flutter 中最终会由真实数据驱动，设计恢复时优先还原 item 模式、section 边界、间距规则和状态槽位，并优先挂到主题和共享组件，而不是复制完整长列表。

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
- 在还原任何页面或组件前，必须先完成设计稿到主题的映射判断：哪些颜色、字体层级、间距、圆角、描边、阴影和组件模式应该复用现有主题，哪些需要新增 token，哪些只是局部例外。
- 设计稿中的数字、姓名、头像、列表项、标签、图表值、订单号或摘要文本可能只是数据填充位；在确认其真实语义前，不要把这些示例值逐字逐项还原成最终设计或代码常量。
- 如果某个视觉决策本应由主题 token、变量或共享组件承载，就不要把它先写死在页面、组件实例或单个 widget 上再回头抽取。
- 在设计与 Flutter 对齐时，先决定谁是固定区域、谁是滚动区域、谁是覆盖层；不要因为画布是纵向长图，就把整个页面都包进滚动容器。
- 在确认数据语义前，不要把设计稿中的重复结构直接实现为 ListView、GridView、SliverList、SliverGrid 或其他 builder 列表。
- 在确认占位语义前，不要把 placeholder、skeleton、mock 卡片、演示头像或样板按钮直接还原成最终 Flutter 组件。
- 默认避免嵌套滚动；如果必须存在多个滚动体，必须在方案里明确各自的滚动 owner、边界和手势关系。
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

### 3. Restore Design-To-Theme Mapping First

- 先从设计稿中提取颜色、字体层级、字号、字重、间距、圆角、阴影、描边、图标规格和高频容器模式，不急着直接画页面。
- 先检查目标 .pen 的变量与现有 Flutter 主题、共享组件，判断哪些 token 和模式已经存在，哪些只是命名不同，哪些确实缺失。
- 优先复用现有主题 token、变量和共享组件；只有当一个视觉规则会跨页面或跨组件复用时，才补新的主题映射。
- 如果主题映射本身还不稳定，就先停在主题层，不继续批量还原页面和组件细节。

### 4. Gather Code Context

- 从最小 Flutter 锚点开始：screen、widget、provider、route、repository 或 model，而不是先扫全仓库。
- 形成一个可证伪的本地假设：当前实现缺了什么，或者哪条代码路径控制了与设计不一致的行为。
- 只做一个便宜的区分性检查来验证这个假设，例如附近调用点、已有状态分支、邻近测试或最小 analyze。

### 5. Assess Non-Display Impact Before Design Restoration

- 在动设计前，明确“如果完全还原这个设计，哪些非显示层必须跟上”。
- 先明确主题映射会影响哪些层：Pencil variables、Flutter ThemeData、共享组件样式槽位，还是页面级局部视觉例外。
- 先决定 Pencil 里的固定区、主滚动区、局部滚动区和 overlay 如何映射到 Flutter 页面结构；这是设计恢复前必须完成的结构判断，不要后补。
- 先区分哪些是结构性 UI 元素，哪些更像数据填充位或样例内容；标题、导航、固定按钮文案通常直接还原，列表行、统计值、图表点、示例头像或业务编号则需要先判断真实数据来源。
- 对重复区域再做一次语义判断：静态小样本、可复用 item 模式、还是真正的数据列表；只有最后一种才默认指向 ListView、GridView 或 Sliver。
- 对 placeholder、skeleton、mock 内容再做一次状态判断：它属于 loading、empty、demo、preview 还是最终态；没有判断前，只恢复槽位和结构，不恢复成最终业务组件。
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

### 6. Restore The Design In Pencil

- 先落 Pencil variables、主题 token 对齐和可复用组件模式，再开始还原页面框架和局部组件。
- 使用 mcp_pencil_batch_design 分批恢复结构、内容和样式，优先搭骨架，再补细节。
- 恢复骨架时，先按 Flutter 目标结构确认固定区、主内容区、局部滚动区和 overlay，不按截图表象直接铺满一个纵向容器。
- 如果已有相近组件，优先复用、复制或替换，而不是从零散落创建。
- 组件恢复优先保持可复用结构；整页恢复优先按区域或模块分块推进。
- 页面和组件的颜色、字级、圆角、间距与容器样式优先引用已经确认过的主题映射，不在恢复过程中重新发明一套局部样式。
- 遇到疑似数据填充位时，优先恢复信息密度、排版模式、容器结构和数据槽位，不默认复制所有示例值。
- 遇到重复 item 时，优先恢复一个或少量代表性 item 与 section 结构，保留其重复模式；不要在 .pen 或 Flutter 中机械展开一整段长列表。
- 遇到 placeholder 或 skeleton 时，优先恢复其状态角色和占位边界，不默认把它升级为正式组件或真实数据块。
- 批量规范色彩、字体、圆角、间距时，优先考虑 search_all_unique_properties 与 replace_all_matching_properties。

### 7. Validate The Design Immediately

- 每一批关键设计修改后，都要立刻看一次截图或布局，不把错位积累到最后。
- 重点检查：重叠、裁切、对齐、占位结构、组件层级、视觉节奏、主题映射是否一致，以及固定区与滚动区边界是否清晰。
- 如果是从截图恢复，确保不是只像，而是结构上也支持后续代码实现。

### 8. Execute The Adjustment Plan In Flutter

- 设计恢复达到可用状态后，立即执行前面列出的非显示层调整方案。
- 改动顺序遵循最小拥有者与依赖方向：theme/shared component -> screen -> provider/state -> route -> data/model/service -> i18n/test。
- 所有表现层改动优先复用当前仓库已有主题、共享组件、导航和交互模式。
- 先把已确认的主题映射落到 Flutter 主题和共享组件，再用这些抽象逐步还原页面和组件；不要先把页面写满局部样式，最后再回抽主题。
- 页面实现时先确定唯一主滚动 owner；固定 header、filter、CTA、bottom bar、tab 或 overlay 不要因为设计稿是长页面就一起塞进滚动体。
- 重复视觉模式先落成可复用 item、section 或 builder 边界，再决定是否真的需要 ListView/GridView/Sliver；不要从设计稿直接推导出整页列表实现。
- 占位组件、skeleton、mock 内容只在对应状态分支里实现；不要把它们当成常驻正式 UI。
- 如果设计新增了状态、入口、提交动作或数据来源，不要把业务逻辑硬塞进 widget 本地变量。
- 高影响项只输出可执行落地方案与影响面，不默认自动提交实现。
- 只在确有需要时触发代码生成，并在总结里说明用户是否还需补跑生成链。

### 9. Run Focused Validation

- 设计侧至少保留一次最终截图或布局验证。
- 代码侧至少执行一次最小 analyze、test 或其他能覆盖主题与页面改动切片的验证。
- 如果验证失败但仍指向当前假设，先修同一切片并复跑，不要立刻扩面。

## Non-Display Checklist

- 设计稿到主题 token、变量与共享组件的映射是否先完成
- 固定区、主滚动区、局部滚动区与 overlay 的结构边界
- 列表、网格、section 与复用 item 的真实语义
- placeholder、skeleton、demo content 与正式 UI 的状态归属
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
- 设计稿到主题的映射已先稳定下来，页面和组件恢复建立在该主题映射之上，而不是事后回抽。
- 非显示层影响在设计修改前已经评估过，并形成了明确方案。
- 设计恢复完成后，方案中的必要代码调整已经继续执行，而不是被留空。
- 已明确区分固定区与滚动区，没有把整个区域误塞进单一滚动容器。
- 已尽量复用现有主题 token、变量和共享组件；只有跨页面复用的规则才新增主题层能力。
- 已区分重复视觉模式与真实数据列表，没有从设计稿直接机械生成 ListView、GridView 或长 builder 链路。
- 已区分固定展示内容与数据填充位，没有把样例数据误还原为最终常量、真实记录或错误的数据结构假设。
- 已区分占位组件与正式组件，没有把 skeleton、placeholder 或 mock 内容误还原为最终常驻 UI。
- 设计验证与代码验证至少各完成一次聚焦检查。
- 任何剩余阻塞都被显式列出，没有被静默跳过。

## Output Style

- 默认直接落设计和代码，不先输出冗长方案文档。
- 只有在目标页面、组件边界或业务规则缺失到足以阻塞实施时才提问。
- 收尾时只保留三类信息：还原了什么、为了完全还原补了哪些非显示层调整、验证结果如何。

## Example Prompts

- /pencil-design-restoration 用 docs/ardena.pen 还原 Daily Focus 页面，先把颜色、字级和间距映射到主题，再复用主题补齐页面、provider、route 和文案
- /pencil-design-restoration 在 docs/marketing_site.pen 还原首页 Hero 区域，先判断哪些视觉规则应该进入共享主题和组件，再执行页面恢复和代码调整
- /pencil-design-restoration 根据设计截图恢复一个统计卡片组件，先稳定 theme token 和 shared widget 映射，再判断数据模型是否要跟着改
- /pencil-design-restoration 完整还原一个 onboarding flow，先做主题映射和共享组件抽取，再分批恢复页面并执行 route、state、i18n、analytics 方案
- /pencil-design-restoration 还原一个带筛选栏和底部操作条的列表页，先判断主题、固定区和滚动区边界，再决定 Flutter 结构
- /pencil-design-restoration 根据截图恢复一个重复卡片区，先判断它是否应该成为主题化共享卡片，再决定它是静态 section 还是数据驱动列表