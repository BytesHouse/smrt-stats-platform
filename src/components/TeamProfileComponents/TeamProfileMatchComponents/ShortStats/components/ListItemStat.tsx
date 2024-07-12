import cls from '../ShortStats.module.css'

export const ListItemStat = ({
  away,
  home,
  title,
}: { away?: number | string, home?: number | string, title?: string }) => (
  <li className={cls.paramsItem}>
    <div>{home}</div>
    <div style={{ textAlign: 'center', width: '60%' }}>{title}</div>
    <div>{away}</div>
  </li>
)
