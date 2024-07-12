import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLexicon } from 'lib/hooks/useTranslates';
import cls from './TeamCard.module.css';

export const TeamCard = () => {
  const { t } = useTranslation()
  const l = useLexicon();
  return (
    <article className={cls.teamCard}>
      <div className={cls.container}>
        <img className={cls.teamImage} src='https://upload.wikimedia.org/wikipedia/en/thumb/8/88/Shandong_Taishan_Football_Club.svg/800px-Shandong_Taishan_Football_Club.svg.png' alt='team' />
        <p className={cls.teamName}>SHANDONG TAISHAN</p>
        <table className={cls.table}>
          <thead className={cls.tableHead}>
            <tr>
              <th className={cls.tableHeadItem}>{l(120)}</th>
            </tr>
          </thead>
          <tbody className={cls.tableBody}>
            <tr className={cls.tableRowItem}>
              <td className={cls.tableBodyItem}>{l(100)}</td>
            </tr>
            <tr className={cls.tableRowItem}>
              <td className={cls.tableBodyItem}>{t('matches_played_china')}</td>
              <td className={cls.tableBodyItem} />
            </tr>
            <tr className={cls.tableRowItem}>
              <td className={cls.tableBodyItem}>{l(101)}</td>
              <td className={cls.tableBodyItem} />
            </tr>
            <tr className={cls.tableRowItem}>
              <td className={cls.tableBodyItem}>{l(102)}</td>
              <td className={cls.tableBodyItem} />
            </tr>
            <tr className={cls.tableRowItem}>
              <td className={cls.tableBodyItem}>{t('goals_conceded')}</td>
              <td className={cls.tableBodyItem} />
            </tr>
            <tr className={cls.tableRowItem}>
              <td className={cls.tableBodyItem}>{t('chances')}</td>
              <td className={cls.tableBodyItem} />
            </tr>
            <tr className={cls.tableRowItem}>
              <td className={cls.tableBodyItem}>{l(17)}</td>
              <td className={cls.tableBodyItem} />
            </tr>
            <tr className={cls.tableRowItem}>
              <td className={cls.tableBodyItem}>{l(104)}</td>
              <td className={cls.tableBodyItem} />
            </tr>
            <tr className={cls.tableRowItem}>
              <td className={cls.tableBodyItem}>{l(103)}</td>
              <td className={cls.tableBodyItem} />
            </tr>
          </tbody>
        </table>
      </div>
    </article>
  );
}
