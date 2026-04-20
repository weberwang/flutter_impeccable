---
name: flutter-development
description: "Implement and modify features in the current Ardena Flutter repository. Use for screens, widgets, Riverpod providers, GoRouter routes, Drift database code, repository or service changes, Freezed or JSON models, localization updates, Firebase wiring, and build_runner-backed source changes in this workspace. Do not use for pure design critique, generic Flutter teaching, or work outside this repo."
argument-hint: "描述目标功能或缺陷，并注明落点（UI / Provider / Route / Database / Service / Model / i18n / Firebase）以及是否涉及代码生成"
user-invocable: true
---

# Ardena Flutter Development

## Purpose

- 把需求直接落到当前 Ardena Flutter 仓库，而不是输出通用建议。
- 默认采用整洁架构思路设计与实现，先分清 presentation、domain、data 的职责，再落最小改动。
- 以最小改动完成实现、修复或接线，并保持与当前仓库结构、工具链和插件配置一致。
- 优先做可验证的本地改动，避免顺手重构无关代码。
- 只要任务触及 UI、页面、组件、交互或其他表现层实现，优先复用当前仓库已有的页面结构、主题、共享组件与交互模式。

## When To Use

- 新增或修改某个 feature 下的 screen、widget、sheet、dialog、动画或页面交互。
- 新增或修复 Riverpod provider、异步加载状态、提交状态或局部业务编排。
- 调整 GoRouter 路由、页面入口、MainShell 分支或跳转链路。
- 修改 Drift table、DAO、database、repository、service 或与本地持久化相关的数据链路。
- 新增或调整 Freezed、JSON、请求响应、领域实体或映射逻辑。
- 增加用户可见文案、ARB key、主题/语言设置、Firebase 统计或崩溃上报接线。
- 任何会触发 build_runner、l10n 或其他生成链的 Flutter 仓库内实现型任务。

## Do Not Use

- 纯设计评审、视觉批评、交互打分或改稿拆单。
- 与当前仓库无关的通用 Flutter 问答。
- 只需要产出方案文档、不需要落代码的任务。
- 大范围架构迁移或技术选型讨论，但没有明确代码锚点的任务。

## Workspace Snapshot

### Current Stack

- 状态管理以 Riverpod 3 为核心，当前仓库使用 flutter_riverpod 和 hooks_riverpod。
- 导航使用 GoRouter，主路由入口在共享导航层。
- 动画实现统一优先使用 animations 包中的 Material motion 组件，不优先自写分散的页面切换动画。
- 本地结构化数据使用 Drift 与 drift_flutter。
- 网络访问使用 Dio。
- 模型与序列化使用 Freezed、json_annotation、json_serializable。
- 仓库已配置 build_runner、drift_dev、freezed、json_serializable 生成链。
- 国际化启用了 flutter generate，并有 l10n.yaml 与 lib/l10n 目录。
- 运行期集成了 Firebase Core、Analytics、Crashlytics。

### Directory Anchors

- 应用入口在 lib/main.dart，负责 Firebase 与数据库初始化，并在 ProviderScope 中启动应用。
- 应用壳层在 lib/app.dart，负责 ScreenUtilInit、MaterialApp.router、主题模式和语言设置。
- 功能代码采用 feature-first 组织，主目录为 lib/features/<feature>/。
- 跨 feature 共享能力位于 lib/shared/data、lib/shared/domain、lib/shared/presentation。
- 路由定义位于 lib/shared/presentation/navigation/app_router.dart 及其相邻导航文件。
- 本地化资源位于 lib/l10n/app_en.arb、lib/l10n/app_zh.arb 及生成文件。

## Hard Rules

### Architecture Boundaries

- 默认按整洁架构组织改动：presentation 负责展示与交互，domain 承载规则与用例，data 负责持久化、远端接线与实现细节。
- feature 内代码优先放入所属模块，不要把 feature 私有逻辑塞进 shared。
- shared 只承载跨模块复用的导航、主题、服务、数据库、基础组件与通用领域概念。
- 表现层负责渲染、交互和状态订阅，不直接承担数据库、网络或复杂业务编排。
- 数据访问、SDK 接线和持久化逻辑应留在 data 层或 shared service/repository 中。
- 改动从最小拥有者开始，先找真正控制行为的文件，不从外围接线层盲改到底层。

### UI And State Rules

- 处理任何 UI、screen、widget、sheet、dialog、交互或其他表现层改动时，优先复用当前仓库已有的页面结构、主题、共享组件与交互模式。
- 新 UI 默认优先使用 ConsumerWidget、HookConsumerWidget 或 HookWidget，与现有 Riverpod 接入方式保持一致。
- 临时 UI 状态留在页面内部，例如文本输入、焦点、滚动、选中态、动画控制或 sheet 展开状态。
- 业务状态、异步加载、提交流程和跨组件共享状态放入 Riverpod provider。
- 复用 shared/presentation 下的主题、导航、动画和基础组件，避免为单次场景发明新基类。
- 需要动画时，优先使用 animations: ^2.1.2 提供的 Material motion 原语，而不是先引入自定义 AnimationController 或第三方替代方案。
- 只在动画能提升层级、连续性、状态切换可理解性时使用动画；避免纯装饰性循环动画、重弹簧效果，避免在高频操作页堆叠多个同时进行的动效。
- 动画选型默认遵循以下映射：容器打开或卡片进详情优先 OpenContainer；同级页面或 tab 内容切换优先 SharedAxisTransition；列表/详情或主内容替换优先 FadeThroughTransition；局部子树切换优先 PageTransitionSwitcher。
- 默认保持短时长与低认知负担，常规转场优先控制在约 150-300ms；若现有页面已明确禁用或弱化动画，保持一致，不逆向放大动效存在感。
- 用户可见文本不得硬编码在最终实现里，新增文案必须同步到 ARB 并通过 AppLocalizations 读取。
- 应用壳层已使用 ScreenUtilInit，新增页面和组件不要写死只适配单一尺寸的布局假设。

### Navigation Rules

- 路由与重定向逻辑统一通过 GoRouter 入口维护，不在页面内分散复制导航规则。
- 新路由优先补充到 AppRoutes 常量和 app_router 路由表，再修改页面侧跳转调用。
- 涉及底部导航或主壳层流转时，同步检查 MainShell 与过渡动画辅助函数。
- 如果只是修改现有入口，不要额外引入第二套导航封装。

### Data, Model, And Generation Rules

- Drift table、DAO、database 与 repository 的改动按数据流顺序推进，不直接让 UI 绕过仓库访问底层。
- Freezed、JSON、数据库 schema、注解 provider 与 l10n 都属于源文件改动，生成文件不是手改目标。
- 任何修改注解、part 声明、Freezed 类、JSON 模型、Drift 表结构或 ARB 输入的任务，都应把代码生成影响面算入任务范围。
- 当前仓库已经存在基于注解与生成文件的实现模式，修改时优先匹配被触达文件附近的既有写法，不额外并行引入第二套风格。
- 除非用户明确要求，不要改依赖版本，不要顺手调整 pubspec 中无关依赖。

### Tooling Rules

- 能用 Dart MCP 工具完成的 analyze、format、fix、项目分析，优先不用 shell。
- 没有 MCP 对应能力时，再使用终端执行 Flutter、Dart 或 build_runner 命令。
- 生成、分析、格式化、测试只在与当前任务直接相关时运行，不扩大验证范围。

## Decision Flow

### 1. Classify The Request

- 先判断任务落在 UI、Provider、Route、Database、Service、Model、i18n、Firebase 的哪一层。
- 如果需求跨 presentation、domain、data 多层，先明确边界，再按整洁架构依赖方向逐层落地。
- 再判断是否触发生成链：Freezed、JSON、Drift、Riverpod 注解或 l10n。
- 如果跨多层，按当前数据流顺序处理，而不是从页面直接改到底层。

### 2. Choose The Smallest Anchor

- UI 任务优先从具体 screen、widget 或它 watch 的 provider 入手。
- 路由任务优先从 app_router、MainShell、页面跳转调用点入手。
- 数据任务优先从 repository、DAO、service、database 或模型源文件入手。
- 文案任务优先从 ARB 与具体消费该文案的组件入手。

### 3. Implement By Layer

#### UI Or Widget Change

- 这是强制规则：处理 presentation 或表现层代码时，优先复用当前仓库已有的页面结构、主题、共享组件与交互模式。
- 先复用现有页面结构、共享组件和主题样式。
- 若交互需要连续性表达，先判断是否能用 animations 包现成原语解决，再决定是否值得引入显式动画控制。
- 异步页面必须考虑 default、loading、empty、error、success 或任务特有边界状态。
- 只要业务状态开始跨组件共享，立即提升到 provider，不把业务状态塞进 widget 本地变量。

#### Provider Or State Change

- provider 放在所属 feature 或 shared 的就近位置。
- 让 provider 暴露清晰、最小的状态与动作接口，不把 UI 细节倒灌进状态层。
- watch 与 read 只订阅真正需要的依赖，避免无差别放大重建范围。

#### Route Change

- 先补 AppRoutes 与路由表，再补页面导航入口。
- 若页面位于主壳层，连同 shell 分支、过渡方式、重定向条件一并检查。
- 若改动会影响 onboarding、订阅或功能开关，检查 router redirect 和条件路由。

#### Data, Repository, Or Service Change

- 外部 SDK、数据库和网络接线保持在 service、repository、DAO 或 database 里。
- feature 级数据实现放在对应 feature/data，跨模块基础能力放在 shared/data。
- 字段或协议变化时，同步检查 mapper、repository 出口、provider 入参和 UI 消费链。

#### Model Or Schema Change

- 以注解类、实体、DTO、table、ARB 文件等源文件为真源。
- 修改时同步维护 import、part 声明、命名和所属层级。
- 不手改生成产物；需要生成时，明确执行或明确说明仍需生成。

#### i18n Change

- 同时更新 app_en.arb 与 app_zh.arb。
- UI 中统一通过 AppLocalizations 读取新文案。
- 若改动设置页、主题或语言切换，连同 app.dart 中的 locale/themeMode 接线一起检查。

### 4. Validate Immediately

- 第一次实质性编辑后，立刻做一次聚焦验证，不继续扩面。
- 优先验证被触达的文件、feature 或最小可执行切片。
- 能做窄范围 analyze 就先 analyze；能做窄范围测试就先跑窄范围测试；需要时再补 format。
- 若改动涉及生成链，运行生成命令或明确说明当前环境下尚需用户补跑生成步骤。

## Completion Checks

- 每一处改动都能直接追溯到当前任务，而不是顺手优化。
- 改动过程仍符合整洁架构边界，没有把业务规则塞进表现层，也没有让 data 依赖倒灌回上层。
- 文件落点符合当前仓库的 feature-first 与 shared 分层。
- 路由、文案、状态、映射、生成链与初始化接线没有遗漏相邻影响面。
- 若任务触及 UI 或表现层，已先核对现有页面结构、共享组件、主题与交互约束，再开始设计或实现。
- 若任务引入动画，已优先评估 animations 包原语是否足够，并说明所选动画是否服务于连续性、层级或状态理解。
- 没有手改生成文件，也没有引入与任务无关的新依赖或新模式。
- 总结时明确说明是否触发了代码生成、格式化、分析或测试。

## Output Style

- 默认直接改代码，不先输出长篇方案。
- 只在真正阻塞落地时提问，例如目标模块不明确、入口页面未知、数据契约缺失。
- 收尾时只保留实施摘要、关键影响面、验证结果和是否还需生成产物。

## Example Prompts

- /flutter-development 在 tasks 模块新增一个筛选状态，补齐 provider、列表 UI 和中英文文案
- /flutter-development 修复 settings 页面主题切换链路，只改 provider 与 app.dart 接线
- /flutter-development 给 weekly_reset 增加一个 Drift 字段，并补齐 repository 到 UI 的最小链路
- /flutter-development 新增一个 GoRouter 页面入口，保持现有 MainShell 结构不变
- /flutter-development 调整 ai_advisor 的加载和错误状态，保持现有数据源与导航不变
