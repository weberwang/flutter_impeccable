# Flutter Impeccable

这是一个将开源项目 [pbakaus/impeccable](https://github.com/pbakaus/impeccable) 做 Flutter 化适配的技能仓库。

原项目 Impeccable 面向通用前端设计，核心目标是给 AI 提供更强的设计判断、审美约束和反模式规避能力；本仓库在保留这套方法论和命令结构的基础上，把它改写为更贴近 Flutter 应用开发的表达方式，重点覆盖页面结构、组件组织、主题系统、状态反馈、移动端适配，以及 Flutter 项目中的实际落地流程。

## 项目定位

- 这不是对上游仓库的逐字复制，而是面向 Flutter 场景的再组织与再约束。
- 目标是让一组偏 Web/Frontend 的设计与审查技能，能够在 Flutter 项目里更自然地使用。
- 除了设计相关 skill，这个仓库也补充了面向 Flutter 项目代码落地的开发骨架，例如 [skills/flutter-development/SKILL.md](skills/flutter-development/SKILL.md)。

## 与上游项目的关系

- 上游项目: [pbakaus/impeccable](https://github.com/pbakaus/impeccable)
- 上游强调的是 AI 驱动的前端设计质量、视觉判断和反模式约束。
- 本仓库强调的是将这套能力迁移到 Flutter 应用开发语境中。
- 如果你想了解原始方法论、命令体系和整体背景，建议先阅读上游 README。

## 这个仓库包含什么

当前仓库以 skill 集合为主，位于 [skills](skills)。

已包含的主要能力有：

- [skills/impeccable/SKILL.md](skills/impeccable/SKILL.md): Flutter 设计主 skill，用于统一设计上下文和工作方式
- [skills/audit/SKILL.md](skills/audit/SKILL.md): Flutter UI 技术审查
- [skills/critique/SKILL.md](skills/critique/SKILL.md): 设计批评与体验评估
- [skills/polish/SKILL.md](skills/polish/SKILL.md): 最终打磨与发版前润色
- [skills/layout/SKILL.md](skills/layout/SKILL.md): 布局、层级和节奏优化
- [skills/typeset/SKILL.md](skills/typeset/SKILL.md): 字体、层级和信息可读性优化
- [skills/colorize/SKILL.md](skills/colorize/SKILL.md): 配色强化
- [skills/animate/SKILL.md](skills/animate/SKILL.md): 动效增强
- [skills/adapt/SKILL.md](skills/adapt/SKILL.md): 适配不同设备与场景
- [skills/flutter-development/SKILL.md](skills/flutter-development/SKILL.md): Flutter 项目实施型开发骨架

## Flutter 化的核心方向

相较于上游偏前端页面与通用 UI 的描述，这个仓库更关注以下内容：

- Flutter 页面和组件的组织方式
- 主题、颜色、字体、间距等设计令牌在 Flutter 中的落点
- 移动端扫描效率、SafeArea、尺寸适配与交互反馈
- 状态管理、导航、数据链路与 UI 实现之间的协作边界
- 将设计评审类命令和真正的 Flutter 落地开发连接起来

## 适用场景

- 你希望把 Impeccable 的设计方法迁移到 Flutter 项目中
- 你在做 Flutter 页面改版、体验优化、视觉审查或交互梳理
- 你希望 AI 在 Flutter 项目里少给出 Web 味过重的建议
- 你需要一套更接近 Flutter 实战的设计与开发 skill 骨架

## 当前状态

- 本仓库目前主要是 skill 资产集合。
- 其中部分 skill 已经按具体项目做过定制，部分则保留为可复用骨架。
- 如果要迁移到新的 Flutter 项目，通常需要根据该项目的技术栈、目录结构、状态管理方式、导航方案和生成链路继续补充内容。

## 使用方式

你可以把这个仓库视为一个 Flutter 场景下的 skill 来源库，根据自己的 AI 工具链和项目规范进行接入。

推荐使用方式：

1. 先阅读 [skills/impeccable/SKILL.md](skills/impeccable/SKILL.md)，理解主 skill 的设计边界。
2. 再按任务类型选择审查、设计或实施型 skill。
3. 若用于新的 Flutter 项目，优先补充 [skills/flutter-development/SKILL.md](skills/flutter-development/SKILL.md) 中的项目专属技术约束。

## 说明

- 本仓库是对上游开源项目思路的 Flutter 化迁移与整理，不是上游官方发布物。
- 上游项目的完整背景、安装方式和生态支持，请参考 [pbakaus/impeccable](https://github.com/pbakaus/impeccable)。