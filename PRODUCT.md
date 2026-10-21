# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

delegated: 沿用系列骨架 Vite + React 18 + TypeScript(strict) + zustand(persist) + framer-motion + canvas-confetti，纯前端 localStorage，端口 5195，GitHub Pages 子路径 `/slim-bistro/`。

## Users

[推断·沿用] 单一用户即需求提出者本人：晚饭后打卡；想要**休闲治愈风**——不打怪、不紧张，养小店、收集常客小动物。

## Product Purpose

休闲治愈减肥打卡「轻卡小馆」：你经营一家只做晚饭的Q版小馆。每天录四件"今日菜况"（几点吃 / 吃了多少 / 喝没喝饮料 / 动没动）= 今天的招牌菜出锅，评分越高菜品星级越高（≥2 分好评如潮、≥6 分满分招牌）；每天来蹭饭的**馋嘴常客**（Q版小动物）满意度和星级挂钩，常客图鉴随坚持解锁。连续好评推进「小店招牌」之路。无战斗、无血条、无失败羞辱——分数低只是"今天这道菜一般般，客人舔舔嘴巴走了"。成功 = 用户愿意每天晚饭后来"开一餐"，晚饭时间真实提前。

## Positioning

系列里唯一的**无战斗休闲版**：与 slim-quest/slim-stars/slim-hero 同核心评分规则、不同呈现（出餐代替打怪）。数据互不相通。周末来一位「神秘美食家」常客（BOSS 位），给出点评。

## Operating Context

每天晚饭后一键打卡；支持补历史营业日；本地存储 + 导出/导入。

## Capabilities and Constraints

- 已确认需求（用户原话）：休闲风格；与系列其余版本并行，都要。
- [推断] 复用 slim-hero 四维评分规则原样，文案小馆化；伤害/血条概念替换为"好评度/满意度"。
- [推断] 无账号/无后端/无推送。
- 技术约束：以 slim-hero 代码库为基座 fork（保留全部已修复逻辑），把战斗场景重制为出餐场景。

## Brand Commitments

用户钉住：休闲治愈、Q版小动物常客、搞笑温馨、绝不羞辱。常客与厨师全手绘 SVG。

## Product Principles

1. 一天一餐：只记四件小事。
2. 星级即数据：菜品卡就是今日评分的可视化，规则透明。
3. 无输赢压力：低分=客人舔嘴巴走了，明天再来。
4. 招牌即坚持：小店招牌之路从 1 关铺到 730。
5. 数据属于用户：本地 + 导出/导入。
