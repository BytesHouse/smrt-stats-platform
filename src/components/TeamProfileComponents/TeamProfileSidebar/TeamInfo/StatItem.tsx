import { useLexicon } from 'lib/hooks/useTranslates';

interface StatItemProps {
  field: string,
  value: number,
}

export const StatItem = ({ field, value }: StatItemProps) => {
  const l = useLexicon()
  const arrStatistics = [
    { engl: 'Goals scored', id: l(102) },
    { engl: 'Red cards', id: l(103) },
    { engl: 'Yellow cards', id: l(104) },
    { engl: 'Assists', id: l(105) },
    { engl: 'Total passes', id: l(106) },
    { engl: 'Accurate passes', id: l(107) },
    { engl: 'Mistakes', id: l(17) },
    { engl: 'Inaccurate passes', id: l(47) },
    { engl: 'Accurate passes, %', id: l(108) }];
  const tmp = arrStatistics.find((item) => item.engl === field)
  const lexic = tmp?.engl ? tmp.id : field
  return (
    <li>
      {lexic}: {value}
    </li>
  )
}
