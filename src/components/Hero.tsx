import { motion } from 'framer-motion'

/** Q版厨师小熊：开饭时端盘上菜，平时待机呼吸 */
export const Hero = ({ attacking, size = 96 }: { attacking: boolean; size?: number }) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    aria-hidden="true"
    animate={
      attacking
        ? { x: [0, 26, 12], rotate: [0, 24, 10] }
        : { y: [0, -3, 0] }
    }
    transition={
      attacking
        ? { duration: 0.45, ease: 'easeOut' }
        : { duration: 2.4, repeat: Infinity, ease: 'easeInOut' }
    }
  >
    {/* 端起的餐盘（举在右上） */}
    <motion.g
      animate={attacking ? { rotate: [0, -80, 0] } : { rotate: 0 }}
      transition={attacking ? { duration: 0.45, ease: 'easeOut' } : { duration: 2.4, repeat: Infinity }}
      style={{ transformOrigin: '58px 40px' }}
    >
      {/* 热气 */}
      <path d="M64 26 q3 -4 0 -8 M74 26 q-3 -4 0 -8" stroke="#B79B85" strokeWidth="2.4" strokeLinecap="round" fill="none" />
      {/* 圆顶菜罩 */}
      <path d="M55 38 a16 13 0 0 1 32 0 z" fill="#FFD98E" stroke="#B8834A" strokeWidth="2.6" strokeLinejoin="round" />
      <circle cx="71" cy="22.5" r="2.8" fill="#B8834A" />
      {/* 盘子 */}
      <ellipse cx="71" cy="40" rx="19" ry="6.5" fill="#FFF6E8" stroke="#C9995E" strokeWidth="2.6" />
      <path d="M58 44 q13 6 26 0" stroke="#C9995E" strokeWidth="2" strokeLinecap="round" fill="none" />
    </motion.g>
    {/* 圆耳朵 */}
    <circle cx="29" cy="19" r="8" fill="#C89A6B" stroke="#8A5E33" strokeWidth="3" />
    <circle cx="63" cy="19" r="8" fill="#C89A6B" stroke="#8A5E33" strokeWidth="3" />
    <circle cx="29" cy="19" r="3.2" fill="#E8B98A" />
    <circle cx="63" cy="19" r="3.2" fill="#E8B98A" />
    {/* 圆肚身体 */}
    <circle cx="46" cy="63" r="26" fill="#C89A6B" stroke="#8A5E33" strokeWidth="3.2" />
    {/* 番茄红围裙 */}
    <path d="M33 55 q13 9 26 0 l3 21 q-16 8 -32 0 z" fill="#E86A4E" stroke="#C24A2E" strokeWidth="2.6" strokeLinejoin="round" />
    <path d="M38 52 q8 3 16 0" stroke="#C24A2E" strokeWidth="2.4" strokeLinecap="round" fill="none" />
    <rect x="39" y="70" width="14" height="9" rx="3" fill="#F5A623" stroke="#C24A2E" strokeWidth="2.2" />
    {/* 头 */}
    <circle cx="46" cy="36" r="20" fill="#C89A6B" stroke="#8A5E33" strokeWidth="3.2" />
    <ellipse cx="46" cy="41" rx="9" ry="7" fill="#F4E3C8" />
    <path d="M46 37.5 l-3 2.6 3 2.6 3 -2.6 z" fill="#4A3527" />
    <path d="M42.5 45 q3.5 3 7 0" stroke="#4A3527" strokeWidth="2.2" strokeLinecap="round" fill="none" />
    <circle cx="39" cy="33" r="2.7" fill="#4A3527" />
    <circle cx="53" cy="33" r="2.7" fill="#4A3527" />
    <circle cx="33" cy="40" r="3" fill="#E86A4E" opacity=".45" />
    <circle cx="59" cy="40" r="3" fill="#E86A4E" opacity=".45" />
    {/* 白厨师帽 */}
    <path d="M32 15 C27 15 24 12.4 24 9.2 C24 6.4 26.4 4.6 29 5.4 C30.2 3.2 33 2.4 35.4 3.6 C37.2 1.8 40.8 1.8 42.6 3.6 C45 2.4 47.8 3.2 49 5.4 C51.6 4.6 54 6.4 54 9.2 C54 12.4 51 15 46 15 z" fill="#FFFFFF" stroke="#C9B8A0" strokeWidth="2.4" strokeLinejoin="round" transform="translate(3.5 0)" />
    <rect x="34" y="14" width="21" height="6.5" rx="3.2" fill="#FFFFFF" stroke="#C9B8A0" strokeWidth="2.4" />
    {/* 小圆脚 */}
    <ellipse cx="37" cy="90" rx="8" ry="5" fill="#8A5E33" />
    <ellipse cx="55" cy="90" rx="8" ry="5" fill="#8A5E33" />
  </motion.svg>
)
