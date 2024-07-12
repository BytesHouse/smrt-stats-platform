import { useLexicon } from 'lib/hooks/useTranslates';
import React from 'react';

const PlayerCard = () => {
  const l = useLexicon();
  return (
    <article className='PlayerCard'>
      <div className='PlayerCard__container'>
        <div className='PlayerCard__image-container'>
          <img className='PlayerCard__player-image' src='https://media.fckrasnodar.ru/fc/person/1329/8_gazinskyi_427x640.png' alt='player' />
          <div className='PlayerCard__team-container'>
            <img
              className='PlayerCard__flag-image'
              src='https://oir.mobi/uploads/posts/2021-03/1616978610_52-p-fon-trikolor-54.jpg'
              alt='flag'
            />
            <img
              className='PlayerCard__team-image'
              src='https://upload.wikimedia.org/wikipedia/ru/thumb/7/75/FC_Krasnodar_Logo.svg/1200px-FC_Krasnodar_Logo.svg.png'
              alt='team'
            />
          </div>
        </div>
        <table className='PlayerCard__table'>
          <thead className='PlayerCard__table-head'>
            <tr>
              <th className='PlayerCard__table-head-item'>{l(329)}</th>
              <th className='PlayerCard__table-head-item'>Lorem</th>
            </tr>
            <tr>
              <th className='PlayerCard__table-head-item'>Current Club & NT</th>
              <th className='PlayerCard__table-head-item'>Ipsum</th>
            </tr>
          </thead>
          <tbody className='PlayerCard__table-body'>
            <tr className='PlayerCard__table-row-item'>
              <td className='PlayerCard__table-body-item'>{l(110)}</td>
              <td className='PlayerCard__table-body-item' />
            </tr>
            <tr className='PlayerCard__table-row-item'>
              <td className='PlayerCard__table-body-item'>{l(111)}</td>
              <td className='PlayerCard__table-body-item' />
            </tr>
            <tr className='PlayerCard__table-row-item'>
              <td className='PlayerCard__table-body-item'>{l(112)}</td>
              <td className='PlayerCard__table-body-item' />
            </tr>
            <tr className='PlayerCard__table-row-item'>
              <td className='PlayerCard__table-body-item'>Heigt</td>
              <td className='PlayerCard__table-body-item' />
            </tr>
            <tr className='PlayerCard__table-row-item'>
              <td className='PlayerCard__table-body-item'>{l(114)}</td>
              <td className='PlayerCard__table-body-item' />
            </tr>
            <tr className='PlayerCard__table-row-item'>
              <td className='PlayerCard__table-body-item'>{l(115)}</td>
              <td className='PlayerCard__table-body-item' />
            </tr>
          </tbody>
        </table>
      </div>
    </article>
  )
}

export default PlayerCard;
