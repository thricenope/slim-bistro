/** 常客名册：每天按日期哈希轮换一位光临，周末贵宾席有神秘美食家 */
export type GuestId = 'hamster' | 'cat' | 'shiba' | 'rabbit' | 'hedgehog' | 'gourmet'

export interface GuestSkin {
  id: GuestId
  name: string
  title: string
  taunt: string // 落座点单时的期待台词
  lose: string // 吃饱喝足的满足台词（当日好评如潮）
  win: string // 今天这道菜一般般时的可爱告别
  boss: boolean
}

export const GUESTS: GuestSkin[] = [
  {
    id: 'hamster', name: '仓鼠团子', title: '腮帮永远鼓鼓的小吃货',
    taunt: '老板老板，今天有什么热乎的？我腮帮子都腾好啦！',
    lose: '唔哇——好满足！团子要打包一份幸福回家～',
    win: '舔舔嘴巴……今天这口一般般，明天再来看你呀！',
    boss: false,
  },
  {
    id: 'cat', name: '橘猫大爷', title: '眯眼趴台的常任美食监督',
    taunt: '哼，今天的手艺，本大爷要趴着慢慢品。',
    lose: '呼噜呼噜……这顿可以，本大爷批准明天继续。',
    win: '（眯眼）一般般啦，本大爷明晚再来验收。',
    boss: false,
  },
  {
    id: 'shiba', name: '柴犬同学', title: '尾巴摇成风车的干饭委员',
    taunt: '报告老板！我今天超——饿的！',
    lose: '汪呜！好吃到尾巴根本停不下来啦！',
    win: '呜……今天就差一点点，明天我一定还来！',
    boss: false,
  },
  {
    id: 'rabbit', name: '兔兔小姐', title: '耳朵系蝴蝶结的沙拉爱好者',
    taunt: '老板，今天的蔬菜新鲜吗？兔兔可是冲着这个来的～',
    lose: '水灵灵的！这餐要写进兔兔的美食手账。',
    win: '嗯……今天稍微逊色一点点，兔兔不挑嘴，明天再来。',
    boss: false,
  },
  {
    id: 'hedgehog', name: '刺猬小子', title: '背上扎着小叉子的资深食客',
    taunt: '叉子我已经背来啦！就等老板这一口！',
    lose: '连背上的叉子都吃热乎了，扎到的全是幸福！',
    win: '（小声）叉子今天没派上用场……没关系，明天再来！',
    boss: false,
  },
  {
    id: 'gourmet', name: '神秘美食家', title: '周末贵宾席的Q版鹅评论家',
    taunt: '本评论家的单片眼镜，已经在等待惊喜了。',
    lose: '嗯——今日招牌，值得写进本周的小馆指南。',
    win: '（记在小本本上）今天嘛……一般般，期待下次。',
    boss: true,
  },
]

export const guestById = (id: GuestId): GuestSkin =>
  GUESTS.find((m) => m.id === id) ?? GUESTS[0]

export const hash = (s: string): number => {
  let h = 0
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0
  return h
}

/** 某天光临的常客：按日期稳定哈希，贵宾席周末才开放（工作日池 5 位 + 周末贵宾位） */
export const guestOf = (date: string): GuestId => {
  const w = new Date(Number(date.slice(0, 4)), Number(date.slice(5, 7)) - 1, Number(date.slice(8, 10))).getDay()
  const pool = w === 0 || w === 6 ? ['gourmet', 'cat', 'rabbit', 'shiba'] : ['hamster', 'cat', 'shiba', 'rabbit', 'hedgehog']
  return pool[Math.abs(hash(date)) % pool.length] as GuestId
}

/** 今日菜品：按日期哈希轮换的小馆菜单 */
export const DISHES = ['轻食沙拉碗', '番茄汤面', '彩蔬卷', '冬阴功轻版', '小米粥套餐', '果蔬拼盘']

export const dishOf = (date: string): string =>
  DISHES[Math.abs(hash(date)) % DISHES.length]
