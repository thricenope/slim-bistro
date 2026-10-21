import { motion } from 'framer-motion'
import { useStats } from '../store'
import { GUESTS } from '../logic/guests'
import { Icon } from './Icon'
import { Guest } from './Guest'

/** 常客图鉴：满意光临过的常客亮起名牌，没来的是剪影 */
export const CodexView = () => {
  const stats = useStats()
  const unlockedCount = Object.keys(stats.killsByMonster).length
  const totalKills = Object.values(stats.killsByMonster).reduce((a, b) => a + b, 0)

  return (
    <div>
      <div className="card" style={{ background: 'linear-gradient(150deg,#fff,#F2FBEE)', borderColor: '#CFE6C8' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Icon name="heart" size={40} style={{ color: 'var(--mint-deep)' }} />
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, lineHeight: 1.25 }}>
              常客图鉴收录 <span style={{ color: 'var(--mint-deep)', fontFamily: 'var(--font-num)', fontSize: 27 }}>{unlockedCount}</span>/{GUESTS.length} 位
              · 累计接待 {totalKills} 次
            </div>
            <div style={{ fontSize: 12.5, color: 'var(--ink-2)', marginTop: 2 }}>
              每天光临的常客不同 · 周末有贵宾美食家
            </div>
          </div>
        </div>
      </div>

      <div className="codex-grid">
        {GUESTS.map((m, i) => {
          const kills = stats.killsByMonster[m.id] ?? 0
          const got = kills > 0
          return (
            <motion.div
              key={m.id}
              className={`codex-card${got ? ' got' : ''}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(i * 0.05, 0.3) }}
            >
              <span className="codex-avatar">
                <Guest species={m.id} mood={got ? 'full' : 'silhouette'} size={92} />
                {!got && <span className="codex-unk">???</span>}
              </span>
              <span className="codex-name">{got ? m.name : '？？？'}</span>
              <span className="codex-title">{got ? m.title : '还没光临过'}</span>
              {got && (
                <span className="codex-kills">
                  <Icon name="heart" size={13} /> ×{kills}
                </span>
              )}
            </motion.div>
          )
        })}
      </div>

      <p className="empty-tip">好评如潮 = 当日 ≥2 分 · 满分招牌 = 当日 ≥6 分，常客们可都记得呢</p>
    </div>
  )
}
