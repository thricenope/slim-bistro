import { useLevel, useStats } from '../store'
import { Icon } from './Icon'

/** 小馆顶栏：logo + 连续好评 + 等级 + 经验条 */
export const TopBar = () => {
  const streak = useStats().curStreak
  const lv = useLevel()

  return (
    <div>
      <header className="topbar">
        <div className="logo">
          <Icon name="chef" size={30} style={{ color: '#C24A2E' }} />
          <span className="name">轻卡小馆</span>
        </div>
        <div className="spacer" />
        <span className="chip-stat flame" title="连续好评天数">
          <Icon name="heart" size={16} />
          <span className="num">{streak}</span>
        </span>
        <span className="chip-stat" title={`${lv.title} · 距下一级 ${lv.need - lv.into} 经验`}>
          <Icon name="crown" size={16} style={{ color: '#e8a50f' }} />
          <span className="num">LV{lv.level}</span>
        </span>
      </header>
      <div
        className="xp-line"
        role="progressbar"
        aria-label="等级经验"
        aria-valuemin={0}
        aria-valuemax={lv.need}
        aria-valuenow={lv.into}
      >
        <i style={{ width: `${lv.into > 0 ? Math.max(4, lv.progress * 100) : 0}%` }} />
      </div>
    </div>
  )
}
