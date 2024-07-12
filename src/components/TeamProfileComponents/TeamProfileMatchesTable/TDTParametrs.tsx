/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
import { CheckBox } from 'components/ui/CheckBox/CheckBox';
import { useLexicon } from 'lib/hooks/useTranslates';
import { useEffect, useState } from 'react';
import { Parametr } from 'lib/helpers/getGroupedAndSortedParametrs';
import cls from './TeamProfileMatchesTable.module.css';

interface TDTParametrsProps {
  array: Array<Parametr>,
  callback: (item: Record<string, string>, checked: boolean) => void,
  title: string,
}

// interface IParametr {
//   checked: boolean,
//   groupe?: string,
//   id: number,
//   label: string,
//   lexic_id?: number,
//   shortName?: string,
//   symbol?: string,
// }

export const TDTParametrs = ({
  array,
  callback,
  title,
}: TDTParametrsProps | any) => {
  const l = useLexicon();
  const [groupChecked, setGroupChecked] = useState(true);
  useEffect(() => {
    if (array.filter((item: any) => !item.checked).length) {
      setGroupChecked(false)
    }
  }, [array])
  const handleClickTitle = () => {
    array.forEach((item: any) => {
      groupChecked
        ? item.checked = false
        : item.checked = true
    })
    setGroupChecked(!groupChecked);
  }
  return (
    <div className={cls.parametrsColumn}>
      <div className={cls.title}>{title} <CheckBox checked={groupChecked} style={{ marginLeft: 10 }} onChange={handleClickTitle} /></div>
      {array.map((parametr: any) => {
        const lexic = parametr.lexic ? l(parametr.lexic) : parametr.name;
        return (
          <div className={cls.flex} key={parametr.id}>
            <span>{lexic} {parametr.symbol ? parametr.symbol : ''}</span>
            <CheckBox
              style={{ marginLeft: 10 }}
              item={parametr}
              checked={parametr.checked}
              onChange={callback}
            />
          </div>
        )
      })}
    </div>
  )
}
