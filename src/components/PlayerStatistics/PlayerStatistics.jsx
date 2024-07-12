import { useLexicon } from 'lib/hooks/useTranslates';
import React from 'react';

const PlayerStatistics = () => {
  const l = useLexicon();
  return (
    <article className='PlayerStatistics'>
      <table className='PlayerStatisticks__table'>
        <caption className='PlayerStatisticks__caption'>{l(99)}</caption>
        <tbody className='PlayerStatisticks__table-body'>
          <tr>
            <td className='PlayerStatisticks__table-body-title'>{l(100)}</td>
          </tr>
          <tr className='PlayerStatisticks__table-row'>
            <td className='PlayerStatisticks__table-body-item'>Russian Premier League</td>
            <td className='PlayerStatisticks__table-body-index'>11</td>
          </tr>

          <tr className='PlayerStatisticks__table-row'>
            <td className='PlayerStatisticks__table-body-item'>Russian Cup</td>
            <td className='PlayerStatisticks__table-body-index'>3</td>
          </tr>
          <tr className='PlayerStatisticks__table-row'>
            <td className='PlayerStatisticks__table-body-item'>Champions League</td>
            <td className='PlayerStatisticks__table-body-index'>2</td>
          </tr>
          <tr>
            <td className='PlayerStatisticks__table-body-title'>Minutes played per competition:</td>
          </tr>
          <tr>
            <tr className='PlayerStatisticks__table-row'>
              <td className='PlayerStatisticks__table-body-item'>Russian Premier League</td>
              <td className='PlayerStatisticks__table-body-index'>936</td>
            </tr>
            <tr className='PlayerStatisticks__table-row'>
              <td className='PlayerStatisticks__table-body-item'>Russian Cup</td>
              <td className='PlayerStatisticks__table-body-index'>270</td>
            </tr>
            <tr className='PlayerStatisticks__table-row'>
              <td className='PlayerStatisticks__table-body-item'>Champions League</td>
              <td className='PlayerStatisticks__table-body-index'>52</td>
            </tr>

          </tr>
          <tr>
            <td className='PlayerStatisticks__table-body-title'>{l(101)}</td>
          </tr>
          <tr>
            <tr className='PlayerStatisticks__table-row'>
              <td className='PlayerStatisticks__table-body-item'>Goals</td>
              <td className='PlayerStatisticks__table-body-index'>2</td>
            </tr>
            <tr className='PlayerStatisticks__table-row'>
              <td className='PlayerStatisticks__table-body-item'>{l(105)}</td>
              <td className='PlayerStatisticks__table-body-index'>5</td>
            </tr>
            <tr className='PlayerStatisticks__table-row'>
              <td className='PlayerStatisticks__table-body-item'>Chances</td>
              <td className='PlayerStatisticks__table-body-index'>7</td>
            </tr>
            <tr className='PlayerStatisticks__table-row'>
              <td className='PlayerStatisticks__table-body-item'>Mistakes</td>
              <td className='PlayerStatisticks__table-body-index'>3</td>
            </tr>
            <tr className='PlayerStatisticks__table-row'>
              <td className='PlayerStatisticks__table-body-item'>{l(104)}</td>
              <td className='PlayerStatisticks__table-body-index'>6</td>
            </tr>
            <tr className='PlayerStatisticks__table-row'>
              <td className='PlayerStatisticks__table-body-item'>{l(103)}</td>
              <td className='PlayerStatisticks__table-body-index'>1</td>
              <td />
            </tr>
          </tr>
        </tbody>
      </table>
    </article>
  )
}

export default PlayerStatistics;
