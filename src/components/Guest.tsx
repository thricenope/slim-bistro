import { motion } from 'framer-motion'
import type { GuestId } from '../logic/guests'

/** 三态沿用基座槽位：full=期待落座 / hurt=开心(眯眼捧碗) / faint=满足(瘫坐回味) / silhouette=还没光临 */
export type GuestMood = 'full' | 'hurt' | 'faint' | 'silhouette'

interface Palette {
  body: string
  bodyDark: string
  outline: string
  belly: string
  detail: string
}

const INK = '#4A3527'

const P: Record<GuestId, Palette> = {
  hamster: { body: '#FFD98E', bodyDark: '#F2BC5F', outline: '#B8834A', belly: '#FFF3D9', detail: '#F09A7E' },
  cat: { body: '#F5B868', bodyDark: '#E09B45', outline: '#A8682F', belly: '#FBE8CE', detail: '#E86A4E' },
  shiba: { body: '#EFB06A', bodyDark: '#D9924A', outline: '#A8682F', belly: '#FCF0DA', detail: '#C24A2E' },
  rabbit: { body: '#FFF2F6', bodyDark: '#F7D9E2', outline: '#C98A9E', belly: '#FFFFFF', detail: '#E86A4E' },
  hedgehog: { body: '#EBCB9F', bodyDark: '#D9AE79', outline: '#9A6B3F', belly: '#F9EDD8', detail: '#8A6B4A' },
  gourmet: { body: '#FFFFFF', bodyDark: '#EDE7DC', outline: '#8A7A5C', belly: '#FFFFFF', detail: '#6B5B8C' },
}

/** Q版常客小动物：物种 × 心情（期待/开心捧碗/满足回味） */
export const Guest = ({
  species,
  mood,
  size = 140,
}: {
  species: GuestId
  mood: GuestMood
  size?: number
}) => {
  const c = P[species] ?? P.hamster

  const eyes = () => {
    if (mood === 'faint') {
      // 满足：放松闭眼
      return (
        <g stroke={INK} strokeWidth="3.2" strokeLinecap="round" fill="none">
          <path d="M40 34 q6 5 12 0" />
          <path d="M68 34 q6 5 12 0" />
        </g>
      )
    }
    if (mood === 'hurt') {
      // 开心：眯眼 ^ ^
      return (
        <g stroke={INK} strokeWidth="3.4" strokeLinecap="round" fill="none">
          <path d="M40 36 q6 -7 12 0" />
          <path d="M68 36 q6 -7 12 0" />
        </g>
      )
    }
    // 期待：圆圆大眼（橘猫大爷自带下挂眼皮）
    return (
      <g fill={INK}>
        <circle cx="46" cy="33" r="4.4" />
        <circle cx="74" cy="33" r="4.4" />
        <circle cx="47.6" cy="31.4" r="1.6" fill="#fff" />
        <circle cx="75.6" cy="31.4" r="1.6" fill="#fff" />
        {species === 'cat' && (
          <g stroke={INK} strokeWidth="2.4" strokeLinecap="round" fill="none">
            <path d="M41 38.5 q5 2.6 10 0" />
            <path d="M69 38.5 q5 2.6 10 0" />
          </g>
        )}
      </g>
    )
  }

  const mouth = () => {
    const dy = species === 'cat' || species === 'shiba' ? 6 : 0
    const wrap = (children: React.ReactNode) => <g transform={`translate(0 ${dy})`}>{children}</g>
    if (mood === 'faint') {
      // 满足回味：小小的 w 嘴
      return wrap(
        <path d="M52 47 q4 4 8 0 q4 4 8 0" stroke={INK} strokeWidth="3" strokeLinecap="round" fill="none" />,
      )
    }
    if (mood === 'hurt') {
      // 开心：张嘴大笑
      return wrap(<path d="M50 45 q10 12 20 0 q-10 7 -20 0 z" fill={INK} />)
    }
    // 期待：小口「啊——」
    return wrap(
      <g>
        <ellipse cx="60" cy="47.5" rx="5.5" ry="6.5" fill={INK} />
        <path d="M56.5 50.5 q3.5 2.6 7 0" stroke="#FF9E86" strokeWidth="2.4" strokeLinecap="round" fill="none" />
      </g>,
    )
  }

  const speciesBody = () => {
    switch (species) {
      case 'hamster': // 仓鼠团子：腮帮鼓鼓
        return (
          <g>
            <circle cx="34" cy="24" r="8" fill={c.body} stroke={c.outline} strokeWidth="3" />
            <circle cx="86" cy="24" r="8" fill={c.body} stroke={c.outline} strokeWidth="3" />
            <circle cx="34" cy="24" r="3.4" fill={c.bodyDark} />
            <circle cx="86" cy="24" r="3.4" fill={c.bodyDark} />
            <path d="M60 18 C86 18 98 38 98 55 C98 73 82 84 60 84 C38 84 22 73 22 55 C22 38 34 18 60 18 z" fill={c.body} stroke={c.outline} strokeWidth="3.4" strokeLinejoin="round" />
            <path d="M42 25 q8 -7 17 -5" stroke="#fff" strokeWidth="4" strokeLinecap="round" fill="none" opacity=".65" />
            <ellipse cx="60" cy="64" rx="21" ry="14" fill={c.belly} />
            <ellipse cx="31" cy="47" rx="9" ry="11" fill={c.bodyDark} opacity=".4" />
            <ellipse cx="89" cy="47" rx="9" ry="11" fill={c.bodyDark} opacity=".4" />
            <ellipse cx="60" cy="43.5" rx="2.8" ry="2.2" fill={c.detail} />
          </g>
        )
      case 'cat': // 橘猫大爷：眯眼趴台
        return (
          <g>
            <path d="M96 64 q15 -3 12 -19 q-2 -9 -11 -8" stroke={c.outline} strokeWidth="7" fill="none" strokeLinecap="round" />
            <path d="M31 27 L25 8 L47 17 z" fill={c.body} stroke={c.outline} strokeWidth="3" strokeLinejoin="round" />
            <path d="M89 27 L95 8 L73 17 z" fill={c.body} stroke={c.outline} strokeWidth="3" strokeLinejoin="round" />
            <path d="M32 23 L29 13 L40 18 z" fill={c.bodyDark} />
            <path d="M88 23 L91 13 L80 18 z" fill={c.bodyDark} />
            <circle cx="60" cy="42" r="30" fill={c.body} stroke={c.outline} strokeWidth="3.4" />
            <path d="M50 15 q2 7 0 12 M60 13 q2 7 0 13 M70 15 q-2 7 0 12" stroke={c.bodyDark} strokeWidth="4" strokeLinecap="round" fill="none" />
            <ellipse cx="60" cy="56" rx="16" ry="10" fill={c.belly} />
            <path d="M57.5 44 h5 l-2.5 3.4 z" fill={c.detail} />
            <path d="M23 45 h8 M24 52 h7 M89 45 h-8 M88 52 h-7" stroke={c.bodyDark} strokeWidth="2" strokeLinecap="round" />
            <ellipse cx="42" cy="80" rx="10" ry="6" fill={c.belly} stroke={c.outline} strokeWidth="2.6" />
            <ellipse cx="78" cy="80" rx="10" ry="6" fill={c.belly} stroke={c.outline} strokeWidth="2.6" />
          </g>
        )
      case 'shiba': // 柴犬同学：卷尾摇成风车
        return (
          <g>
            <path d="M90 60 q13 -1 12 -13 q-1 -9 -10 -9 q-8 0 -8 8" fill={c.body} stroke={c.outline} strokeWidth="3" strokeLinejoin="round" />
            <path d="M33 30 L26 8 L50 19 z" fill={c.body} stroke={c.outline} strokeWidth="3" strokeLinejoin="round" />
            <path d="M87 30 L94 8 L70 19 z" fill={c.body} stroke={c.outline} strokeWidth="3" strokeLinejoin="round" />
            <path d="M35 25 L31 14 L44 19 z" fill={c.bodyDark} />
            <path d="M85 25 L89 14 L76 19 z" fill={c.bodyDark} />
            <circle cx="60" cy="42" r="30" fill={c.body} stroke={c.outline} strokeWidth="3.4" />
            <circle cx="46" cy="27" r="3" fill={c.bodyDark} />
            <circle cx="74" cy="27" r="3" fill={c.bodyDark} />
            <ellipse cx="60" cy="56" rx="17" ry="12" fill={c.belly} />
            <path d="M57.5 44 h5 l-2.5 3.4 z" fill={c.detail} />
            <ellipse cx="44" cy="82" rx="9" ry="5.5" fill={c.body} stroke={c.outline} strokeWidth="2.6" />
            <ellipse cx="76" cy="82" rx="9" ry="5.5" fill={c.body} stroke={c.outline} strokeWidth="2.6" />
          </g>
        )
      case 'rabbit': // 兔兔小姐：长耳朵 + 蝴蝶结
        return (
          <g>
            <ellipse cx="42" cy="17" rx="8" ry="19" fill={c.body} stroke={c.outline} strokeWidth="3" transform="rotate(-9 42 17)" />
            <ellipse cx="78" cy="17" rx="8" ry="19" fill={c.body} stroke={c.outline} strokeWidth="3" transform="rotate(9 78 17)" />
            <ellipse cx="42" cy="17" rx="3.6" ry="12" fill={c.bodyDark} transform="rotate(-9 42 17)" />
            <ellipse cx="78" cy="17" rx="3.6" ry="12" fill={c.bodyDark} transform="rotate(9 78 17)" />
            <circle cx="60" cy="46" r="26" fill={c.body} stroke={c.outline} strokeWidth="3.4" />
            <ellipse cx="60" cy="66" rx="17" ry="12" fill={c.belly} />
            <path d="M57.5 42 h5 l-2.5 3.2 z" fill={c.detail} />
            <path d="M60 22 L48 15 L49 27 z" fill={c.detail} stroke={c.outline} strokeWidth="2.4" strokeLinejoin="round" />
            <path d="M60 22 L72 15 L71 27 z" fill={c.detail} stroke={c.outline} strokeWidth="2.4" strokeLinejoin="round" />
            <circle cx="60" cy="22" r="4.2" fill={c.detail} stroke={c.outline} strokeWidth="2.4" />
          </g>
        )
      case 'hedgehog': // 刺猬小子：背刺 + 小叉子
        return (
          <g>
            <g fill={c.detail} stroke={c.outline} strokeWidth="2.4" strokeLinejoin="round">
              <path d="M60 6 L71 22 L49 22 z" />
              <path d="M75 10 L85 27 L63 25 z" />
              <path d="M45 10 L35 27 L57 25 z" />
              <path d="M87 22 L93 40 L72 31 z" />
              <path d="M33 22 L27 40 L48 31 z" />
            </g>
            <g transform="rotate(28 88 12)" stroke="#8C8272" strokeWidth="2.4" strokeLinecap="round" fill="none">
              <path d="M88 26 V13" />
              <path d="M84 9 v4 M88 8 v5 M92 9 v4" />
            </g>
            <ellipse cx="60" cy="54" rx="29" ry="25" fill={c.body} stroke={c.outline} strokeWidth="3.4" />
            <ellipse cx="60" cy="63" rx="18" ry="12" fill={c.belly} />
            <ellipse cx="60" cy="43.5" rx="2.8" ry="2.2" fill={c.outline} />
          </g>
        )
      default: // gourmet 神秘美食家：斗篷 + 单片眼镜的Q版鹅
        return (
          <g>
            <path d="M60 20 C86 20 98 44 99 72 L84 80 L60 84 L36 80 L21 72 C22 44 34 20 60 20 z" fill={c.detail} stroke="#4A3E66" strokeWidth="3.2" strokeLinejoin="round" />
            <path d="M38 32 q22 16 44 0" stroke="#E8E0F2" strokeWidth="5" fill="none" strokeLinecap="round" />
            <circle cx="60" cy="38" r="22" fill="#FFFFFF" stroke={c.outline} strokeWidth="3.2" />
            <path d="M80 40 l12 3 -12 5 z" fill="#F0A03C" stroke="#B8742A" strokeWidth="2.2" strokeLinejoin="round" />
            <circle cx="74" cy="33" r="8" fill="none" stroke="#B8860F" strokeWidth="2.4" />
            <path d="M80 40 q5 6 2 12" stroke="#B8860F" strokeWidth="2" fill="none" strokeLinecap="round" />
            <rect x="50" y="1" width="20" height="11" rx="2" fill="#4A3E66" />
            <rect x="50" y="7" width="20" height="4" fill="#B8860F" />
            <rect x="44" y="11" width="32" height="5" rx="2.5" fill="#4A3E66" />
          </g>
        )
    }
  }

  const extras = () => {
    const bits: React.ReactNode[] = []
    if (mood === 'hurt') {
      // 开心捧碗
      bits.push(
        <g key="bowl">
          <path d="M53 63 q3.5 -4.5 0 -9 M67 63 q-3.5 -4.5 0 -9" stroke="#B79B85" strokeWidth="2.4" strokeLinecap="round" fill="none" />
          <path d="M43 74 a17 12 0 0 0 34 0 z" fill="#F0B429" stroke="#9A6A00" strokeWidth="2.6" strokeLinejoin="round" />
          <ellipse cx="60" cy="74" rx="17" ry="4.6" fill="#FFF3D9" stroke="#9A6A00" strokeWidth="2.4" />
        </g>,
      )
      if (species === 'shiba') {
        // 尾巴摇成风车
        bits.push(
          <g key="wag" stroke={c.bodyDark} strokeWidth="2.2" strokeLinecap="round" fill="none" opacity=".8">
            <path d="M104 46 q4 4 3 9" />
            <path d="M108 38 q6 6 4 14" />
          </g>,
        )
      }
    }
    if (mood === 'full' && species === 'hamster') {
      bits.push(
        <g key="bounce" fill={c.bodyDark} opacity=".7">
          <circle cx="25" cy="66" r="4" />
          <circle cx="96" cy="63" r="3.2" />
        </g>,
      )
    }
    if (mood === 'full' && species === 'gourmet') {
      bits.push(
        <g key="spark">
          <path d="M12 30 l2.2 5.2 5.2 2.2 -5.2 2.2 -2.2 5.2 -2.2 -5.2 -5.2 -2.2 5.2 -2.2 z" fill="#F0B429" opacity=".9" />
          <path d="M106 46 l1.9 4.4 4.4 1.9 -4.4 1.9 -1.9 4.4 -1.9 -4.4 -4.4 -1.9 4.4 -1.9 z" fill="#F0B429" opacity=".7" />
        </g>,
      )
    }
    if (mood === 'faint') {
      // 满足腮红 + 回味小星星
      bits.push(
        <g key="blush" opacity=".8">
          <ellipse cx="32" cy="43" rx="5.4" ry="3.4" fill="#F2A48C" />
          <ellipse cx="88" cy="43" rx="5.4" ry="3.4" fill="#F2A48C" />
        </g>,
      )
      bits.push(
        <g key="soul" opacity=".9">
          <motion.text
            x="98" y="26" fontSize="20" fontWeight="800" fill="#E8A50F"
            animate={{ opacity: [0.2, 1, 0.2], y: [0, -6, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >★</motion.text>
        </g>,
      )
    }
    return bits
  }

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 120 96"
      aria-hidden="true"
      style={mood === 'silhouette' ? { filter: 'grayscale(1) brightness(0.45) opacity(0.55)' } : undefined}
      animate={
        mood === 'faint'
          ? { rotate: [-6, 6, -6], y: [0, 2, 0] }
          : mood === 'full'
            ? { y: [0, -4, 0], scaleY: [1, 0.96, 1] }
            : { y: [0, -2, 0] }
      }
      transition={{ duration: mood === 'full' ? 2.2 : 1.6, repeat: Infinity, ease: 'easeInOut' }}
    >
      {speciesBody()}
      {eyes()}
      {mouth()}
      {extras()}
    </motion.svg>
  )
}
