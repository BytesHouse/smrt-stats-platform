import { useLexicon } from 'lib/hooks/useTranslates';
import React from 'react'

const MatchesData = () => {
  const l = useLexicon();
  return (
    <section className='MatchesData'>
      <div className='MatchesData__title'>MATCHES</div>
      <div className='MatchesData__info-subtitle'>lorem ipsum</div>
      <div className='MatchesData__table-container'>
        <table className='MatchesData__table'>
          <caption className='MatchesData__table-caption'>Home team name</caption>
          <thead>
            <tr className='MatchesData__table-row'>
              <th>{l(319)}</th>
              <th>Position</th>
              <th>{l(346)}</th>
              <th>Goals</th>
              <th>{l(105)}</th>
              <th>Chances</th>
              <th>Mistakes</th>
              <th>YC</th>
              <th>RC</th>
            </tr>
          </thead>
          <tbody>
            <tr className='MatchesData__table-row'>
              <td>{l(319)}</td>
            </tr>
            <tr className='MatchesData__table-row'>
              <td>{l(319)}</td>
            </tr>
            <tr className='MatchesData__table-row'>
              <td>{l(319)}</td>
            </tr>
            <tr className='MatchesData__table-row'>
              <td>{l(319)}</td>
            </tr>
            <tr className='MatchesData__table-row'>
              <td>{l(319)}</td>
            </tr>
            <tr className='MatchesData__table-row'>
              <td>{l(319)}</td>
            </tr>
            <tr className='MatchesData__table-row'>
              <td>{l(319)}</td>
            </tr>
            <tr className='MatchesData__table-row'>
              <td>{l(319)}</td>
            </tr>
            <tr className='MatchesData__table-row'>
              <td>{l(319)}</td>
            </tr>
            <tr className='MatchesData__table-row'>
              <td>{l(319)}</td>
            </tr>
            <tr className='MatchesData__table-row'>
              <td>{l(319)}</td>
            </tr>
          </tbody>
        </table>
        <div className='MatchesData__competition-container'>
          <img className='MatchesData__team-image' src='https://upload.wikimedia.org/wikipedia/ru/thumb/7/75/FC_Krasnodar_Logo.svg/1200px-FC_Krasnodar_Logo.svg.png' alt='team-one' />
          <div className='MatchesData__competition' />
          <img className='MatchesData__team-image' src='https://upload.wikimedia.org/wikipedia/ru/thumb/7/75/FC_Krasnodar_Logo.svg/1200px-FC_Krasnodar_Logo.svg.png' alt='team-two' />
        </div>
        <table className='MatchesData__table'>
          <caption className='MatchesData__table-caption'>Away team name</caption>
          <thead>
            <tr className='MatchesData__table-row'>
              <th>{l(319)}</th>
              <th>Position</th>
              <th>{l(46)}</th>
              <th>Goals</th>
              <th>{l(105)}</th>
              <th>Chances</th>
              <th>Mistakes</th>
              <th>YC</th>
              <th>RC</th>
            </tr>
          </thead>
          <tbody>
            <tr className='MatchesData__table-row'>
              <td>{l(319)}</td>
            </tr>
            <tr className='MatchesData__table-row'>
              <td>{l(319)}</td>
            </tr>
            <tr className='MatchesData__table-row'>
              <td>{l(319)}</td>
            </tr>
            <tr className='MatchesData__table-row'>
              <td>{l(319)}</td>
            </tr>
            <tr className='MatchesData__table-row'>
              <td>{l(319)}</td>
            </tr>
            <tr className='MatchesData__table-row'>
              <td>{l(319)}</td>
            </tr>
            <tr className='MatchesData__table-row'>
              <td>{l(319)}</td>
            </tr>
            <tr className='MatchesData__table-row'>
              <td>{l(319)}</td>
            </tr>
            <tr className='MatchesData__table-row'>
              <td>{l(319)}</td>
            </tr>
            <tr className='MatchesData__table-row'>
              <td>{l(319)}</td>
            </tr>
            <tr className='MatchesData__table-row'>
              <td>{l(319)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default MatchesData;
