import type { Stats } from '../types'

export type AchKind = 'streak' | 'total' | 'special'

/** 每级徽章奖励经验（发放与弹窗展示共用） */
export const XP_PER_TIER = 25

export interface Achievement {
  id: string
  name: string
  desc: string
  kind: AchKind
  tier: number // 奖励经验 = tier * XP_PER_TIER
  goal: number
  value: (s: Stats) => number
  /** 小店招牌路上的成长站点 */
  onRoad?: boolean
}

export const ACHIEVEMENTS: Achievement[] = [
  // —— 小店招牌（连续好评阶梯）
  { id: 's1', name: '开张第一碗', desc: '拿下第 1 个好评日，小店开张了', kind: 'streak', tier: 1, goal: 1, value: (s) => s.maxStreak, onRoad: true },
  { id: 's2', name: '回头客来了', desc: '连续 2 天好评，锅气刚好', kind: 'streak', tier: 1, goal: 2, value: (s) => s.maxStreak, onRoad: true },
  { id: 's3', name: '三日连香', desc: '连续 3 天好评，常客开始记挂这口', kind: 'streak', tier: 1, goal: 3, value: (s) => s.maxStreak, onRoad: true },
  { id: 's4', name: '街坊都夸', desc: '连续 4 天好评，街坊开始打听', kind: 'streak', tier: 1, goal: 4, value: (s) => s.maxStreak, onRoad: true },
  { id: 's5', name: '五日小灶', desc: '连续 5 天好评，工作日全飘香', kind: 'streak', tier: 2, goal: 5, value: (s) => s.maxStreak, onRoad: true },
  { id: 'wk1', name: '周末贵宾宴', desc: '一个周六周日都好评，神秘美食家也点头', kind: 'special', tier: 2, goal: 1, value: (s) => s.weekendPairs },
  { id: 's7', name: '一周满堂彩', desc: '连续 7 天好评，小店门口开始排队', kind: 'streak', tier: 2, goal: 7, value: (s) => s.maxStreak, onRoad: true },
  { id: 's14', name: '双周好口碑', desc: '连续 14 天好评，熟客带新客来', kind: 'streak', tier: 3, goal: 14, value: (s) => s.maxStreak, onRoad: true },
  { id: 's21', name: '三周好味道', desc: '连续 21 天好评，手艺成了习惯', kind: 'streak', tier: 3, goal: 21, value: (s) => s.maxStreak, onRoad: true },
  { id: 's30', name: '满月招牌', desc: '连续 30 天好评，金字招牌挂上门头', kind: 'streak', tier: 4, goal: 30, value: (s) => s.maxStreak, onRoad: true },
  { id: 's100', name: '百日老字号', desc: '连续 100 天好评，老字号认证', kind: 'streak', tier: 5, goal: 100, value: (s) => s.maxStreak, onRoad: true },
  { id: 's365', name: '周年名店', desc: '连续 365 天好评，整条街为你挂灯笼', kind: 'streak', tier: 6, goal: 365, value: (s) => s.maxStreak, onRoad: true },
  { id: 's730', name: '传奇小店', desc: '连续 730 天好评，传奇小店就是这里', kind: 'streak', tier: 7, goal: 730, value: (s) => s.maxStreak, onRoad: true },

  // —— 累计好评
  { id: 't10', name: '十日好评', desc: '累计 10 天好评如潮', kind: 'total', tier: 1, goal: 10, value: (s) => s.winDays },
  { id: 't30', name: '三十日飘香', desc: '累计 30 天好评如潮', kind: 'total', tier: 2, goal: 30, value: (s) => s.winDays },
  { id: 't100', name: '百天好口碑', desc: '累计 100 天好评如潮', kind: 'total', tier: 4, goal: 100, value: (s) => s.winDays },
  { id: 't365', name: '年度账本红', desc: '累计 365 天好评如潮', kind: 'total', tier: 6, goal: 365, value: (s) => s.winDays },

  // —— 特色徽章
  { id: 'p3', name: '满分小灶', desc: '做出 3 次满分招牌（≥6 分）', kind: 'special', tier: 2, goal: 3, value: (s) => s.perfectDays },
  { id: 'p10', name: '招牌主厨', desc: '做出 10 次满分招牌', kind: 'special', tier: 3, goal: 10, value: (s) => s.perfectDays },
  { id: 'e10', name: '饭后百步', desc: '累计运动打卡 10 次', kind: 'special', tier: 1, goal: 10, value: (s) => s.exerciseCount },
  { id: 'e50', name: '后厨铁人', desc: '累计运动打卡 50 次', kind: 'special', tier: 3, goal: 50, value: (s) => s.exerciseCount },
  { id: 'early20', name: '早市食光', desc: '20 次 17 点前吃好晚饭', kind: 'special', tier: 2, goal: 20, value: (s) => s.earlyDinners },
  { id: 'm6', name: '常客满座', desc: '6 位常客全部满意光临过至少一次', kind: 'special', tier: 3, goal: 6, value: (s) => Object.keys(s.killsByMonster).length },
]

export const achById = (id: string): Achievement | undefined =>
  ACHIEVEMENTS.find((a) => a.id === id)

/** 小店招牌之路：只放连续类站点 */
export const ROAD = ACHIEVEMENTS.filter((a) => a.onRoad)

/** 找到下一个未点亮的招牌节点（用于「还差 N 天」） */
export const nextRoad = (s: Stats, unlocked: Record<string, string>): Achievement | undefined =>
  ROAD.find((a) => !unlocked[a.id] && a.goal > s.maxStreak) ?? ROAD.find((a) => !unlocked[a.id])

/** 连续好评称号 */
export const comboTitle = (n: number): string => {
  if (n >= 30) return '月度金字招牌'
  if (n >= 21) return '招牌主厨'
  if (n >= 14) return '双周好口碑'
  if (n >= 10) return '十日连席'
  if (n >= 7) return '一周满堂彩'
  if (n >= 5) return '五日小灶'
  if (n >= 3) return '三日连香'
  if (n >= 2) return '回头客来了'
  if (n >= 1) return '开张第一碗'
  return ''
}
