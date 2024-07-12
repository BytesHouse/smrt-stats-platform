import { extractFirstCharacters } from '../TeamProfileMatchComponents/MatchPlayers/MatchPlayers'
import cls from './TeamProfileMatchesTable.module.css'

export const THTableItem = ({ array }) => array.map(({
  label,
  name,
  shortName,
  // eslint-disable-next-line max-len
}, index) => !array[index].checked || <th className={cls.thItem} key={name} title={shortName || name}>{extractFirstCharacters(shortName) || extractFirstCharacters(name)}</th>)
