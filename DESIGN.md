---
name: 轻卡小馆 SlimBistro
description: 休闲治愈小馆主题的减肥打卡设计系统
colors:
  bg: "#FFF8EF"
  ink: "#4A3527"
  ink-2: "#8A6F5C"
  ink-3: "#B79B85"
  card: "#FFFFFF"
  line: "#F2E2CE"
  line-strong: "#E4CBB0"
  tomato: "#E86A4E"
  tomato-deep: "#C24A2E"
  cream: "#FFD98E"
  gold: "#F0B429"
  gold-deep: "#9A6A00"
  basil: "#6FA86B"
  basil-deep: "#41703E"
  honey: "#F5A623"
typography:
  display:
    fontFamily: "'ZCOOL QingKe HuangYou', 'PingFang SC', sans-serif"
  body:
    fontFamily: "ui-rounded, -apple-system, 'PingFang SC', sans-serif"
    fontSize: "15px"
  num:
    fontFamily: "'Baloo 2', sans-serif"
    fontWeight: 800
---

# Design System: 轻卡小馆 SlimBistro

## Overview

**Creative North Star: 「暖黄油色调的深夜食堂（但只开晚饭）」**

每天晚饭 = 小馆今天的那道招牌菜。奶油白底 + 番茄红（围裙/主行动）+ 罗勒绿（好评语义）+ 蜂蜜金（星级）。无战斗、无血条：出餐卡 + 星级 + 常客小动物满意反应。木质桌纹卡片、手写菜单感点缀。

**Key Characteristics:**
- 出餐卡：菜品大图（按日期轮换的Q版菜）+ 星级（1-5 星映射评分）+ 好评度条
- 常客反应：评分高=小动物眯眼捧碗转圈；评分低=舔舔嘴巴摆摆手走人（不沮丧）
- 常客图鉴：来过的常客亮起名牌，没来的="还没光临"
- 招牌之路 = 小店成长节点链（路边摊→小推车→木窗台→……→传奇小店）

## Art Direction

- Captain：Q版厨师小熊——白色厨师帽、番茄红围裙、圆肚子，出餐时端盘子上菜动画
- 6 位常客全手绘 SVG、参数化（happy/ok/meh 三态）：
  1. 仓鼠团子（腮帮鼓鼓捧碗）
  2. 橘猫大爷（眯眼趴台）
  3. 柴犬同学（尾巴摇成风车）
  4. 兔兔小姐（耳朵打蝴蝶结）
  5. 刺猬小子（背上扎着小叉子）
  6. 周末常客·神秘美食家（斗篷+单片眼镜的Q版鹅，给"米其林式"点评）
- 菜品池（按日期哈希轮换）：轻食沙拉碗 / 番茄汤面 / 彩蔬卷 / 冬阴功(轻版) / 小米粥套餐 / 果蔬拼盘 …

## Copy Map（世界观词汇表）

| 通用 | 小馆化 |
|---|---|
| 出手/攻击 | 开饭 / 出餐 |
| 怪物血量/伤害 | 好评度 / 好评 +N |
| 击退/暴击 | 好评如潮 / 满分招牌！ |
| 战败 | 今天这道菜一般般（客人摆摆手） |
| 地下城（日历） | 营业日历（每格一道当日菜） |
| 图鉴 | 常客图鉴 |
| 连击之路 | 小店招牌（成长链） |
| 公会 | 小店账本（经营统计） |
| 用户称呼 | 老板 |

## Views

1. 出餐（主视图）：出餐卡 + 四件菜况录入 + 实时星级 + 「开饭！」
2. 营业：日历即每日菜单，点任意天补开
3. 常客：6 位常客卡片网格
4. 招牌：小店成长链 + 徽章墙
5. 账本：大数字 + 14 日好评柱状图 + 月条 + 数据管理

## Do's and Don'ts

- **Do** 治愈温馨台词（"今天的汤，咸淡刚刚好～"）；满分必放蜂蜜金彩带。
- **Do** 评分规则与 slim-hero 完全一致，仅文案/呈现换皮。
- **Don't** 任何战斗/失败/羞辱元素；低分也要可爱。
- **Don't** 用 emoji 当控件图标（全部手绘 SVG；文案里可以）。
