/** 等级曲线：升到 L+1 需要 40 + 15·L 经验（累计递增） */
export const xpForLevel = (level: number): number => 40 + 15 * (level - 1)

export interface LevelInfo {
  level: number
  into: number // 当前级已得
  need: number // 升到下一级还差
  progress: number // 0~1
  title: string
}

const TITLES = [
  '后厨学徒', '路边摊主', '小推车掌柜', '木窗台店主', '街角小馆老板',
  '人气食堂店长', '金字招牌主理', '城南名店主厨', '米其林之友', '传奇店主',
]

export const titleFor = (level: number): string => {
  const idx = Math.min(Math.floor((level - 1) / 3), TITLES.length - 1)
  return TITLES[idx]
}

export const levelFromXp = (xp: number): LevelInfo => {
  let level = 1
  let rest = Math.max(0, xp)
  while (rest >= xpForLevel(level)) {
    rest -= xpForLevel(level)
    level += 1
  }
  const need = xpForLevel(level)
  return {
    level,
    into: rest,
    need,
    progress: rest / need,
    title: titleFor(level),
  }
}
