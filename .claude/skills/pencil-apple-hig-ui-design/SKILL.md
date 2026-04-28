---
name: pencil-apple-hig-ui-design
description: "Design Apple-platform UI/UX in a .pen file with Pencil MCP. Use for AI-generated page previews, reusable components, sheets, popovers, alerts, tab/navigation structures, and annotated non-page presentations. Follows Apple Human Interface Guidelines for hierarchy, layout, safe areas, modality, and adaptation. Do not use for code-only tasks, design restoration, or non-Apple design systems."
argument-hint: "描述目标 .pen 文件、目标平台（默认 iOS，可含 iPadOS / macOS / visionOS）、要设计的范围（页面预览 / 组件库 / 弹出组件 / 整个 flow）、参考来源，以及是否需要标注触发关系、状态和 Apple HIG 依据"
user-invocable: true
---

# Pencil Apple HIG UI Design

## Purpose

- 用 Pencil MCP 直接在 .pen 文件中生成 Apple 平台风格的 UI/UX 设计，而不是只写设计建议。
- 产出不只包含页面预览，还包含复用组件、弹出组件、瞬时呈现层和必要注释。
- 严格以 Apple Human Interface Guidelines 为最高约束，而不是以截图像不像或视觉堆料为目标。
- 让页面层、组件层和非页面呈现层分开设计、分开标注，避免它们被混进同一张页面预览里。

## What This Skill Produces

- 页面预览板块：用于展示主流程页面、主要导航层级和关键状态。
- 复用组件板块：用于沉淀按钮、输入框、卡片、列表 item、工具栏、标签、筛选控件等可复用资产。
- 弹出与瞬时呈现板块：用于设计 sheet、popover、alert、action sheet、confirmation UI、menu、transient overlay 等不常驻在页面中的组件。
- 注释板块：用于标注触发源、呈现方式、关闭方式、状态归属、复用关系和 HIG 依据。

## When To Use

- 需要在 .pen 文件中为 Apple 平台生成新的 UI/UX 方案。
- 需要用 AI 快速设计页面预览，但又不想丢掉组件体系和弹出层设计。
- 需要把页面组件、复用组件、sheet、popover、alert 这些不同层级的设计资产同时设计出来并明确区分。
- 需要强制遵守 Apple HIG 的层级、布局、安全区、模态、导航和适配规则。

## Do Not Use

- 纯 Flutter 或纯代码实现任务，不涉及 .pen 设计。
- 现有设计稿恢复任务；这种场景优先使用 pencil-design-restoration。
- 非 Apple 设计系统，或刻意偏离 Apple 平台交互惯例的品牌实验稿。
- 只需要一张静态效果图，不关心组件拆分、弹出层或交互结构的任务。

## Default Scope

- 如果用户没指定平台，默认主目标是 iPhone 上的 iOS 紧凑宽度竖屏体验。
- 如果任务涉及导航变化、分栏、复杂编辑、宽屏信息架构或模态行为差异，补一个 iPadOS 规则宽度预览或适配板。
- 如果页面包含新增、编辑、筛选、排序、分享、确认、删除、选择或上下文操作，默认同时设计对应的 sheet、popover、alert 或 action sheet，而不是只画主页面。
- 如果一个模式在多个页面重复出现，默认抽成复用组件，不在页面预览里重复手工画满。

## Apple HIG Guardrails

### Layout And Hierarchy

- 保持清晰视觉层级，让控件和内容可以被一眼区分。
- 尊重 safe area、系统栏、摄像头区域、Dynamic Island 和窗口边界，不让关键内容贴边或被系统 UI 吃掉。
- 内容和背景可以 full-bleed，但控件默认保持系统感的内边距与可点击空间。
- 默认避免 iPhone 风格里生硬的全宽按钮；只有在任务场景确实需要时才使用，并让它与安全区和硬件圆角协调。
- 通过分组、留白、对齐和 progressive disclosure 组织内容，不靠视觉噪音制造层级。

### Adaptation

- 设计必须考虑紧凑宽度和规则宽度差异，而不是只画一张固定尺寸页面。
- 设计时默认考虑 Dynamic Type、文案长度变化、国际化和横竖屏带来的结构变化。
- 当布局变窄时，尽量延后切换到压缩方案，避免界面在临界点过早跳形。

### Navigation

- tab bar 只用于顶层导航，不用于承载动作。
- toolbar、filters、search、edit、sort 等动作不应伪装成 tab。
- tab 项数量默认保持克制，避免溢出到 More 之类的低可发现性结构。
- 模态覆盖 tab bar 是允许的，但页面本身不应靠隐藏 tab bar 造成导航迷失。

### Modality And Transient UI

- 只有在打断当前上下文确实更清晰时才使用 modal。
- 一次只设计并呈现一个主 modal；不要级联多个 sheet 或 popover。
- sheet 适合与当前上下文强相关、范围清晰的任务；复杂长流程再考虑 full-screen modal。
- popover 只用于少量临时信息或少量操作；在紧凑宽度下默认改用 sheet 或全屏 modal，而不是硬保留 popover。
- alert 只用于关键、可行动的中断，不用来承载普通信息说明，也不要在启动时就弹。
- 所有 modal、sheet、popover、alert 都必须有明确关闭路径。

## Required Design Separation

- 页面预览不等于全部设计资产；它只展示用户默认看到的页面结构和主要状态。
- 复用组件必须单独建板，不要把它们只藏在页面里。
- 弹出组件、popover、sheet、alert、action sheet、menu 这类不常驻在页面中的组件，也必须单独设计出来并显式标注。
- 如果一个组件只通过点击、长按、溢出菜单、编辑态或错误态出现，它仍然需要自己的设计 frame 和注释。
- 页面里只保留这些瞬时组件的触发点和上下文，不把它们作为永久可见 UI 画进主页面。

## Annotation Rules

- 每个设计板块都要有明确类型标签，例如 [Page Preview]、[Reusable Component]、[Presentation]、[State Variant]。
- 每个弹出或瞬时组件都要至少标注四项：Trigger、Presentation Type、Dismissal、Scope。
- 每个复用组件都要标注其复用范围、主要 variants、可替换 slot 和禁用直接拷贝的页面特例。
- 每个页面预览都要标注其目标平台、主要导航位置和与其他弹出组件的关系。
- 如果某个设计决定直接来源于 Apple HIG，优先加一句短注释说明依据，例如 “Popover only in regular width” 或 “Tab bar for navigation, not actions”。

## Hard Rules

- 读取和修改 .pen 文件时，只能使用 Pencil MCP 相关工具。
- 开始设计前，先确认目标平台和输出资产类型，不要直接落笔画页面。
- 默认同时产出三类资产：页面预览、复用组件、弹出与瞬时呈现组件；除非用户明确缩小范围。
- 不要把 sheet、popover、alert、menu、toast、confirmation UI 直接画成常驻页面的一部分。
- 不要把组件库和页面预览混在同一块区域里，导致后续无法区分“页面实例”和“组件定义”。
- 不要只画主页面而省略实际会出现的弹出层、确认层、错误提示和关键状态。
- 不要为了追求效果图完整，把页面上不会常驻的内容永久摆在页面上。
- 发生平台选择歧义时，优先遵循 Apple HIG 的平台惯例，而不是任意混搭 iOS、iPadOS、macOS 的模式。

## Procedure

### 1. Define The Design Contract

- 先确认目标 .pen 文件、目标平台和本次范围是页面、组件、弹出层还是整个 flow。
- 如果用户没有给平台，默认按 iOS iPhone 设计；如果任务涉及宽屏导航或复杂交互，再补 iPadOS 适配。
- 在开始绘制前，先列出本次必须产出的资产清单：页面预览、复用组件、弹出组件、状态变体、注释。

### 2. Inspect The Pencil Context

- 先读取当前 editor state，确认活动文档、选区和 schema。
- 如果已有目标 .pen 文件或相关结构，优先复用已有画布和组件体系；如果没有，再建立新区域。
- 用布局快照和必要的截图核对当前结构，避免直接在未知画布上叠加内容。

### 3. Plan Separate Boards Before Drawing

- 在画布上先划分顶层区域：Page Previews、Reusable Components、Presentations、State Variants。
- 每个区域都使用清晰标题和标签，而不是等设计完成后再补命名。
- 非页面组件默认放在独立区域，不放进页面 frame 内部伪装成页面内容。

### 4. Design Page Previews

- 先搭主页面骨架，确认导航层级、safe area、scroll ownership、toolbar、tab bar 和主要信息分组。
- 页面预览只负责表达主流程、信息架构和关键状态，不负责穷举全部组件变体。
- 若交互会打开别的瞬时组件，页面预览中只保留触发点和触发语义。

### 5. Extract Reusable Components

- 把跨页面复用或页面内重复出现的控件和结构抽成复用组件。
- 组件设计至少覆盖默认态，以及任务明确需要的 hover、pressed、selected、disabled、error、loading 等状态。
- 对有 slot 的组件，保留其内容替换能力，不要把示例内容写死成唯一实现。

### 6. Design Transient And Non-Page Components

- 针对每个新增、编辑、确认、筛选、排序、分享、删除、选择、说明、错误、权限相关触发点，判断它应属于 sheet、popover、alert、action sheet、full-screen modal 还是非模态补充视图。
- 每个这类组件都单独设计 frame，并标注它是从哪里触发、如何关闭、在什么平台或宽度下出现。
- popover 默认只在规则宽度下保留；紧凑宽度下改为 sheet 或其他更符合 HIG 的呈现方式。
- alert 默认只覆盖关键且可行动的中断；普通说明优先内联化或放到更低打断性的结构中。

### 7. Validate Against Apple HIG

- 检查 hierarchy、harmony、consistency 是否成立，避免为了“好看”破坏平台习惯。
- 检查 safe area、边距、控件间距、对齐、文本可读性和 Dynamic Type 适配空间。
- 检查导航是否把 action 混进 tab bar，或把 transient UI 误当成 page-level UI。
- 检查 modal 是否过度、popover 是否过大、alert 是否承担了不该承担的内容。

### 8. Finalize Annotation And Output

- 给页面预览、组件、弹出层和状态变体全部补齐类型标签。
- 对所有不在页面常驻显示的组件，明确标注 “Not visible in default page preview”。
- 如有需要，输出截图或导出节点，但不要在导出前省略注释和资产分类。

## Completion Checks

- 已产出页面预览，而不是只画零散组件。
- 已产出复用组件板，而不是把所有组件只埋在页面实例里。
- 已产出不常驻页面的弹出组件，并且这些组件被单独标注出来。
- 页面、组件、弹出层、状态变体之间的边界清晰，没有混成一张效果图。
- 关键设计决定符合 Apple HIG 的布局、导航、安全区和模态原则。
- 没有把 alert 当普通说明层，没有把 popover 用在紧凑宽度常规主流程里，也没有把 tab bar 用成操作栏。

## Output Style

- 默认直接用 Pencil MCP 落设计，不先输出长篇视觉概念文档。
- 先搭结构和板块，再补视觉细节，不先沉迷配色和装饰。
- 收尾时只保留三类信息：画了哪些页面预览、沉淀了哪些复用组件、补齐了哪些不常驻页面的呈现组件与注释。

## Example Prompts

- /pencil-apple-hig-ui-design 在 docs/app.pen 里设计一个 iOS 设置页，除了页面预览，再补齐复用 cell、切换项和退出确认 alert
- /pencil-apple-hig-ui-design 设计一个 Apple HIG 风格的创建任务 flow，包含主页面、表单组件、编辑 sheet 和删除确认 alert
- /pencil-apple-hig-ui-design 为一个带 tab bar 的 iPhone 应用设计首页和搜索页，同时补齐筛选 popover 或其紧凑宽度替代方案
- /pencil-apple-hig-ui-design 设计一个 iPadOS 内容浏览页面，区分页面预览、复用卡片组件和不常驻页面的详情 popover