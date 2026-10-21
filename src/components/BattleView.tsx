import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { DayRecord, Verdict } from '../types'
import { useGame, useStats, useTodayRecord, dayXp } from '../store'
import { EMPTY_RECORD, VERDICT_META, damageOf, evaluate, isRecorded, isWin } from '../logic/scoring'
import { computeStats, missedRecent } from '../logic/stats'
import { today, dateCn } from '../logic/dates'
import { guestById, guestOf, dishOf } from '../logic/guests'
import { comboTitle } from '../logic/quests'
import { titleFor } from '../logic/level'
import { bigCelebration, burstAt } from '../celebrate'
import { Guest } from './Guest'
import { Hero } from './Hero'
import { DayEditor } from './DayEditor'
import { Icon } from './Icon'

const BATTLE_LINES: Record<Verdict, string[]> = {
  pending: ['常客已落座，老板录完菜况就开饭～', '今天做什么菜？录完四件小事就知道啦！', '先点一点选项嘛，锅都热好了！'],
  perfect: ['哇——满分招牌！小馆今天飘金字啦！', '这道菜值得写进店里的招牌菜单！', '常客们捧着碗转圈圈，好评刷刷来！'],
  win: ['好评如潮～常客吃得眯起了眼睛！', '今天的汤咸淡刚刚好，掌声在哪里！', '小馆今日营业顺利，明天也加油呀！'],
  plain: ['唔……今天这道菜一般般，客人舔舔嘴巴。', '差一点点就是好评啦，明天再香一点！', '味道及格啦，常客说：明天还来。'],
  fail: ['客人摆摆手走了……没关系，锅还热着！', '今天这道菜一般般，明晚再来一餐！', '常客可爱地离开啦：明天见，老板！'],
}

/** 今日评分 → 星级（1~5 星） */
const starsOf = (score: number): number =>
  score >= 6 ? 5 : score >= 4 ? 4 : score >= 2 ? 3 : score >= 0 ? 2 : 1

export const BattleView = ({ onGoDungeon }: { onGoDungeon: () => void }) => {
  const saved = useTodayRecord()
  const setDay = useGame((s) => s.setDay)
  const clearDay = useGame((s) => s.clearDay)
  const stats = useStats()

  const t = today()
  const [draft, setDraft] = useState<DayRecord>(saved ?? EMPTY_RECORD(t))
  const [attacking, setAttacking] = useState(false)
  const [hit, setHit] = useState<{ id: number; text: string; crit: boolean } | null>(null)
  const [shake, setShake] = useState(0)
  const [combo, setCombo] = useState<{ n: number; title: string } | null>(null)
  const [levelUp, setLevelUp] = useState<number | null>(null)
  const ctaRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    setDraft(saved ?? EMPTY_RECORD(t))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t, saved?.date])

  const ev = useMemo(() => evaluate(draft), [draft])
  const meta = VERDICT_META[ev.verdict]
  const touched = isRecorded(draft)
  const recordedToday = !!saved
  const savedEv = evaluate(saved)

  const monsterId = guestOf(t)
  const skin = guestById(monsterId)
  const dish = dishOf(t)
  // 已结算后展示以入库结果为准（改草稿只影响下方实时预览卡，不再同屏两套战果）
  const showEv = recordedToday ? savedEv : ev
  const showMeta = VERDICT_META[showEv.verdict]
  // 好评度：未记录=还没开饭；录了按分数累积好评；好评如潮=满格
  const hpLeft = recordedToday
    ? isWin(saved)
      ? 0
      : Math.max(8, 100 - damageOf(savedEv.score))
    : touched && ev.score > 0
      ? Math.max(8, 100 - damageOf(ev.score))
      : 100
  const praise = 100 - hpLeft // 展示层的好评度（与基座血量互补，数值随分数单调上涨）
  const starsShown = touched || recordedToday ? starsOf(showEv.score) : 0
  const mood = !touched && !recordedToday ? 'full' : showEv.verdict === 'fail' || showEv.verdict === 'plain' ? 'full' : showEv.verdict === 'win' ? 'hurt' : 'faint'
  const line = recordedToday
    ? showEv.verdict === 'fail'
      ? skin.win
      : showEv.verdict === 'plain'
        ? '唔……今天这道菜一般般，明天再香一点！'
        : showEv.verdict === 'pending'
          ? skin.taunt
          : skin.lose
    : touched && ev.score >= 2
      ? '咦？菜还没上就闻到香味啦？快按「开饭！」呀～'
      : skin.taunt

  const missed = useMemo(() => missedRecent(useGame.getState().records), [recordedToday, stats.totalDays])

  const doFight = () => {
    const oldXp = dayXp(saved)
    const result = setDay(t, draft)
    const gained = dayXp(draft) - oldXp

    setAttacking(true)
    setTimeout(() => setAttacking(false), 600)
    setShake((n) => n + 1)

    const dmg = damageOf(result.score)
    setHit({
      id: Date.now(),
      text: result.verdict === 'perfect' ? '满分招牌！' : result.verdict === 'fail' ? '客人摆摆手…' : `好评 +${dmg}`,
      crit: result.verdict === 'perfect',
    })
    setTimeout(() => setHit(null), 1400)

    if (result.verdict === 'win' || result.verdict === 'perfect') {
      bigCelebration()
      burstAt(ctaRef.current)
      const streak = computeStats(useGame.getState().records).curStreak
      if (streak >= 2) {
        setCombo({ n: streak, title: comboTitle(streak) })
        setTimeout(() => setCombo(null), 1900)
      }
    } else if (gained > 0) {
      burstAt(ctaRef.current)
    }

    if (result.levelAfter > result.levelBefore) {
      setTimeout(() => setLevelUp(result.levelAfter), 700)
    }
  }

  return (
    <div>
      {stats.totalDays === 0 && (
        <div className="card guide-card">
          <div className="g-title">欢迎来到轻卡小馆！</div>
          <ol>
            <li>每天晚饭后回来，<b>点几下</b>记录今日菜况</li>
            <li>按「开饭！」——评分越高，这道菜的<b>好评度</b>越高</li>
            <li>≥2 分好评如潮，≥6 分满分招牌；连续好评推进<b>小店招牌</b></li>
          </ol>
        </div>
      )}

      {missed && !recordedToday && (
        <div className="done-banner" style={{ background: '#fff8ec', borderColor: '#ffe2b8' }}>
          <Icon name="calendar" size={20} style={{ color: '#c26a12' }} />
          <span className="t" style={{ color: '#9a6410' }}>
            {dateCn(missed)}还没开张
          </span>
          <button className="cal-today-btn" onClick={onGoDungeon}>
            去补开
          </button>
        </div>
      )}

      <div className="card battle-card">
        <div className="dish-head">
          <span className="dish-name">今日菜品 · {dish}</span>
          <span className="dish-stars" role="img" aria-label={`今日星级 ${starsShown} 星`}>
            {[0, 1, 2, 3, 4].map((i) => (
              <Icon
                key={i}
                name="star"
                size={15}
                style={{ color: i < starsShown ? 'var(--gold)' : 'var(--line-strong)' }}
              />
            ))}
          </span>
        </div>
        <div className="battle-scene">
          <div className="battle-cloud" aria-hidden="true" />
          <div className="battle-hero">
            <Hero attacking={attacking} size={92} />
          </div>
          <motion.div
            key={shake}
            className="battle-monster"
            initial={shake > 0 ? { x: 0 } : false}
            animate={shake > 0 ? { x: [0, -8, 7, -5, 0] } : undefined}
            transition={{ duration: 0.4 }}
          >
            <Guest species={monsterId} mood={mood} size={158} />
          </motion.div>
          <AnimatePresence>
            {hit && (
              <motion.div
                key={hit.id}
                className={`dmg-float${hit.crit ? ' crit' : ''}`}
                initial={{ y: 10, opacity: 0, scale: 0.6 }}
                animate={{ y: -46, opacity: 1, scale: 1.15 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              >
                {hit.text}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="hp-row">
          <span className="hp-name">
            {skin.name}
            {skin.boss && <b className="boss-tag">贵宾</b>}
          </span>
          <div className="hp-track" role="img" aria-label={`好评度 ${Math.round(praise)}%`}>
            <motion.div className="hp-fill" animate={{ width: `${praise}%` }} transition={{ type: 'spring', stiffness: 120, damping: 16 }} />
            {[25, 50, 75].map((p) => (
              <span key={p} className="hp-tick" style={{ left: `${p}%` }} />
            ))}
          </div>
          <span className="hp-num">{Math.round(praise)}%</span>
        </div>

        <div className="bubble">
          <AnimatePresence mode="wait">
            <motion.div
              key={line}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22 }}
            >
              <div className="hi">{line}</div>
              <div className="sub">
                {recordedToday ? `今日出餐：${showMeta.title}` : touched ? '试菜预览中 · 按「开饭！」上菜' : '常客等着呢 · 录完菜况就开饭'}
                {stats.curStreak > 0 && ` · 连续好评 ${stats.curStreak} 天`}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {recordedToday && (
        <div className="done-banner">
          <Icon name="check" size={20} style={{ color: '#41703E' }} />
          <span className="t">今日已开饭：{showMeta.title}</span>
          <span className="s">{savedEv.score} 分</span>
        </div>
      )}

      <DayEditor value={draft} onChange={(p) => setDraft((d) => ({ ...d, ...p }))} />

      <div className="card live-verdict">
        <div className="row">
          <span className={`vpill ${meta.cls}`}>{meta.title}</span>
          <span
            className={`score-num ${ev.score > 0 ? 'pos' : ev.score < 0 ? 'neg' : 'zero'}`}
            aria-label={`今日评分 ${ev.score}`}
          >
            {ev.score > 0 ? `+${ev.score}` : ev.score}
          </span>
        </div>
        {ev.parts.length > 0 ? (
          <div className="parts">
            {ev.parts.map((p, i) => (
              <div className="p" key={i}>
                <span>{p.label}</span>
                <b className={p.pts > 0 ? 'plus' : p.pts < 0 ? 'minus' : 'zero'}>
                  {p.pts > 0 ? `+${p.pts}` : p.pts}
                </b>
              </div>
            ))}
            <div className="p">
              <span style={{ color: 'var(--ink-3)' }}>≥ 2 分好评如潮 · ≥ 6 分满分招牌</span>
            </div>
          </div>
        ) : (
          <div className="parts">
            <div className="p">
              <span style={{ color: 'var(--ink-3)' }}>≥ 2 分好评如潮 · ≥ 6 分满分招牌</span>
            </div>
          </div>
        )}
      </div>

      <motion.button
        ref={ctaRef}
        type="button"
        className="cta"
        whileTap={{ scale: 0.97 }}
        disabled={!touched}
        onClick={doFight}
      >
        <Icon name="plate" size={22} />
        {recordedToday ? '重新出餐' : '开饭！'}
      </motion.button>

      {recordedToday && (
        <div style={{ textAlign: 'center' }}>
          <button
            className="ghost-link"
            onClick={() => {
              if (window.confirm('撤回今天的出餐记录吗？')) {
                clearDay(t)
                setDraft(EMPTY_RECORD(t))
              }
            }}
          >
            <Icon name="trash" size={14} /> 撤回今日记录
          </button>
        </div>
      )}

      <AnimatePresence>
        {combo && (
          <motion.div
            className="combo-banner"
            initial={{ scale: 0.3, opacity: 0, rotate: -6 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0.6, opacity: 0, y: -30 }}
            transition={{ type: 'spring', stiffness: 380, damping: 18 }}
          >
            ×{combo.n} 天连续好评！
            <small>{combo.title}</small>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {levelUp !== null && (
          <motion.div
            className="cele-mask z-top"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLevelUp(null)}
          >
            <motion.div
              className="cele-card"
              initial={{ scale: 0.5, y: 60 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 320, damping: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="rays" />
              <div className="cele-kind">小 馆 升 级</div>
              <motion.div
                className="cele-emoji"
                initial={{ rotate: -20, scale: 0.4 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 12, delay: 0.15 }}
              >
                <Icon name="crown" size={72} style={{ color: '#e8a50f' }} />
              </motion.div>
              <div className="cele-title">LV {levelUp}</div>
              <div className="cele-desc">获得称号「{titleFor(levelUp)}」</div>
              <div className="cele-xp">继续开饭，继续升！</div>
              <button type="button" className="cta mint" onClick={() => setLevelUp(null)}>
                太棒了！
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export { BATTLE_LINES }
