import { useLexicon } from 'lib/hooks/useTranslates';
import React from 'react';

const MatchesStatistics = () => {
  const l = useLexicon();
  return (
    <section className='MatchesStatistics'>
      <table className='MatchesStatistics__table'>
        <thead className='MatchesStatistics__table-head'>
          <tr>
            <th className='MatchesStatistics__table-header'>{l(10)}</th>
            <th className='MatchesStatistics__table-header'>{l(46)}</th>
            <th className='MatchesStatistics__table-header'>GOALS</th>
            <th className='MatchesStatistics__table-header'>{l(105)}</th>
            <th className='MatchesStatistics__table-header'>CHANCES</th>
            <th className='MatchesStatistics__table-header'>MISTAKES</th>
            <th className='MatchesStatistics__table-header'>YC</th>
          </tr>
        </thead>
        <tbody>
          <tr />
        </tbody>
      </table>
    </section>
  )
}

export default MatchesStatistics;
