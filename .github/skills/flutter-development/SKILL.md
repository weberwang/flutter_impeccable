---
name: flutter-development
description: "Implement and modify features in a Flutter repository while following its existing architecture, tooling, and UI conventions. Use for screens, widgets, state, routes, services, models, persistence, localization, platform wiring, and source-generation-backed changes."
version: 2.1.1
argument-hint: "[目标或缺陷] [落点: UI / State / Route / Data / Model / i18n / Platform] [是否涉及代码生成]"
user-invocable: true
---

# Implement Flutter Features Within Repository Constraints

## Mandatory Preparation

- 对用户可见 UI 或交互有改动时，先查看目标页面、路由入口、附近共享组件和相关状态文件，再决定改动落点和复用边界。
- 先读 `pubspec.yaml`、应用入口、路由入口和任务附近的 feature 文件，再决定改动落点。
- 先判断任务是否涉及代码生成、本地化、测试、原生配置或运行时初始化。

## Purpose

- 在当前 Flutter 仓库里直接实现或修改功能，而不是退回到泛化 Flutter 建议。
- 先识别并复用该仓库现有的架构、状态管理、导航、主题、目录组织和工具链。
- 用最小改动完成实现、修复或接线，并把验证范围控制在被触达的切片内。

## When To Use

- 新增或修改 screen、page、widget、dialog、sheet、表单、列表、详情页或完整交互流程。
- 新增或修复状态管理逻辑，例如 provider、bloc、cubit、controller、notifier、view model 或其他既有状态层实现。
- 调整路由、页面入口、守卫、重定向、壳层导航或页面跳转链路。
- 修改 repository、service、data source、缓存、数据库、本地持久化、网络请求或平台通道接线。
- 新增或调整模型、序列化、映射、schema、领域实体、配置对象或其他源文件驱动的数据结构。
- 增加用户可见文案、语言切换、主题设置、通知、深链、Firebase 或其他 Flutter 平台接线。
- 任何会触发 build_runner、gen-l10n、资源生成或其他生成链的 Flutter 实现型任务。

## Do Not Use

- 纯设计评审、视觉批评、交互打分或改稿拆单。
- 纯 Flutter 教学、框架解释或 API 问答。
- 只需要方案文档、不需要改代码的任务。
- 没有代码锚点的宽泛架构讨论或技术选型讨论。

## Repository Profiling

### Read First

- `pubspec.yaml`，确认依赖、SDK 约束、代码生成器和插件。
- 应用入口，例如 `lib/main.dart`、`lib/app.dart` 或等价壳层文件。
- 路由入口、主题入口、依赖注入入口、错误处理入口和环境配置文件。
- 任务附近的页面、状态、数据层、共享组件和测试文件。
- 任何生成源文件，例如 ARB、Freezed、JSON 注解类、数据库 schema、router 配置或 build 配置。

### Detect Before Assuming

- 先识别项目现用状态管理模式，例如 Riverpod、Bloc、Cubit、Provider、GetX、MobX、ValueNotifier 或自定义控制层。
- 先识别项目现用导航模式，例如 Navigator、GoRouter、AutoRoute、Beamer、Routemaster 或自定义封装。
- 先识别网络、缓存、数据库和平台能力，例如 Dio、http、GraphQL、Retrofit、Drift、Hive、Isar、sqflite、shared_preferences、secure_storage、Firebase、Supabase 或平台通道。
- 先识别模型和生成链是否使用 Freezed、json_serializable、built_value、retrofit_generator、injectable、riverpod_generator、drift_dev、flutter_gen 或 gen-l10n。
- 先识别测试和验证方式，例如 flutter_test、integration_test、golden tests、lint、analyze、脚本或 CI 命令。

### Choose The Owning Slice

- UI 任务优先从具体 page、screen、widget 或它依赖的状态入口入手。
- 路由任务优先从路由表、导航壳层和页面跳转调用点入手。
- 数据任务优先从 repository、service、DAO、database、mapper 或模型源文件入手。
- 平台任务优先从插件初始化、原生配置、权限声明或桥接调用点入手。

## Implementation Flow

### 1. Classify The Request

- 先判断任务落在 UI、State、Route、Data、Model、i18n、Platform 的哪一层。
- 先找出直接控制行为的文件或拥有者层，再补相邻影响面。
- 先判断是否触发代码生成、本地化更新、测试或原生配置修改。

### 2. Reuse Repository Patterns

- 匹配当前仓库已有的目录组织、命名方式、组件组合、状态封装和依赖注入习惯。
- 优先复用现有共享组件、主题、服务、导航辅助和状态模型，不平行引入第二套模式。
- 如果仓库没有明确强约定，优先使用最简单、最 Flutter-native、且与附近实现一致的做法。

### 3. Edit In The Owning Layer

#### UI Or Widget Change

- 临时 UI 状态留在页面内部，例如输入、焦点、滚动、选中态、展开态和局部动画控制。
- 复用现有页面结构、主题和共享组件，不为单次场景发明新的 UI 基类。
- 异步页面至少覆盖任务相关的 loading、empty、error、success 或 refresh 状态。

#### State Change

- 状态接口保持清晰、最小，不把 UI 细节倒灌到状态层。
- 订阅只覆盖真正需要的依赖，避免无差别放大重建范围。
- 共享异步状态和业务编排放在项目既有状态层，而不是塞回 widget。

#### Route Change

- 先补路由常量、路由表、守卫或 redirect，再补页面侧调用。
- 若改动位于壳层导航、分支导航或嵌套路由，连同容器页和守卫条件一起检查。

#### Data Or Model Change

- I/O、数据库、缓存、平台 SDK 和网络接线保持在 service、repository、DAO、data source 或等价数据层。
- 协议、字段或 schema 变化时，顺着 model -> mapper -> repository -> state -> UI 的链路检查影响面。
- 修改源文件，不手改生成文件。

#### i18n Or Platform Change

- 若仓库已启用本地化，新增用户可见文案应进入本地化资源而不是硬编码。
- 平台配置只在任务需要时修改，并同步检查权限、初始化、错误回退和运行时入口。

### 4. Validate Immediately

- 第一次实质性编辑后，立刻做一次最窄验证，不继续扩面。
- 优先执行被触达切片最相关的 analyze、test、format 或生成命令。
- 验证失败时，先修当前切片并复跑同一验证，再决定是否扩大范围。

## Hard Rules

### Repository-First Rules

- 先匹配当前仓库的真实实现模式，再开始写代码。
- 从最小拥有者开始改，不从外围接线层盲改到底层。
- 不做与任务无关的重构，不顺手改依赖版本或替换项目既有模式。

### UI And Interaction Rules

- 页面与组件优先复用当前仓库已有的壳层、主题、共享组件和交互模式。
- 顶层页面遵循当前项目的安全区、滚动、布局和适配约定。
- 若仓库已启用本地化，新增用户可见文本应走既有 i18n 机制。

### State And Routing Rules

- 不并行引入第二套状态管理或导航模型。
- 页面局部状态就近管理；跨组件或跨页面状态才进入共享状态层。
- 路由、重定向和页面入口统一回到项目既有导航入口维护。

### Data, Generation, And Platform Rules

- 数据访问和外部接线留在数据层，不让 UI 直接穿透到底层实现。
- 模型、注解类、schema、ARB、router 配置和其他源文件是真源；生成产物不是手改目标。
- 只有在任务需要时才改 Android、iOS、Web、macOS、Windows、Linux 配置。

### Verification Rules

- 优先使用仓库真实存在的 Flutter、Dart、build_runner、gen-l10n、测试和格式化命令。
- 有更窄的可执行验证时，不用 diff 代替。
- 如果当前环境无法完成验证，明确说明还需要补跑什么命令。

## Verify

检查：

- 被触达文件在可行范围内通过 analyze、test、format 或生成验证。
- 若涉及生成链，生成产物已刷新或已明确说明仍需补跑。
- UI、状态、路由、数据和平台接线之间的最小链路仍然闭合。
- 用户可见文案、权限、初始化和错误路径没有因改动脱节。

## Output Style

- 默认直接落代码，不先输出长篇方案。
- 只在真正阻塞实施时提问，例如代码锚点不明确、入口未知或数据契约缺失。
- 收尾只保留实施摘要、关键影响面、验证结果和仍需补跑的步骤。

## Example Prompts

- /flutter-development 在某个 feature 下新增一个筛选状态，并补齐列表 UI 和状态链路
- /flutter-development 修复一个设置页的主题或语言切换，只改最小接线
- /flutter-development 给某个模型新增字段，并补齐序列化、状态和 UI 消费链
- /flutter-development 新增一个页面路由入口，保持现有导航架构不变
- /flutter-development 给某个功能接入本地持久化，只补最小 repository 到页面链路
