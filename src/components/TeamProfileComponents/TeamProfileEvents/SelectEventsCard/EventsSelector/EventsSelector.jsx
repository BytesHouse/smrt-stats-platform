/* eslint-disable max-len */
import React, {
  useEffect,
  useMemo,
  // useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLexicon } from 'lib/hooks/useTranslates';
import { teamEventsParams } from 'config/parametrs/events/teamEventsParams';
// import { $api } from '../../../../../config/api';
import { playerGkEventsParams } from 'config/parametrs/events/playerGkEventsParams';
import { playerEventsParams } from 'config/parametrs/events/playerEventsParams';
import { teamActions } from '../../../../../store/team/teamSlice';
import { CheckBox } from '../../../../ui/CheckBox/CheckBox';
import cls from './EventsSelector.module.css';

export const EventsSelector = ({
  isPlayerGoalkeeper,
  isTeamPage,
}) => {
  const dispatch = useDispatch();
  const tabs = useSelector((state) => state.team.eventTabs);
  const activeTab = useSelector((state) => state.team.activeTab);
  // eslint-disable-next-line no-nested-ternary
  const serverActionGroups = isTeamPage ? teamEventsParams : isPlayerGoalkeeper ? playerGkEventsParams : playerEventsParams;
  const l = useLexicon();
  // const arrLexics = ['Attacks', l(17), l(18), l(19), l(20), l(21), l(22), l(23), l(24), 'Match period']
  // const modifArr = tabs.map((item, index) => ({ ...item, lexic: arrLexics[index] }));
  // useEffect(() => {
  //   const fetchActionGroups = async () => {
  //     try {
  //       const response = await $api.get('/platform/action_group/');
  //       if (response.data.results) {
  //         setServerActionGroups(response.data.results);
  //       }
  //     } catch (e) {
  //       // eslint-disable-next-line no-console
  //       console.log('get actions group err', e.message);
  //     }
  //   };

  //   fetchActionGroups();
  // }, []);

  const initialTabs = useMemo(() => {
    if (serverActionGroups?.length > 0) {
      return serverActionGroups.map((group) => ({
        id: group.id,
        label: l(group.lexic_id) || group.title,
        options:
            group?.actions?.length > 0
              ? group.actions.map((action) => ({
                checked: false,
                id: action.id,
                label: action.title,
                lexic: action.lexic_id,
              }))
              : [],
      }));
    }
    return [];
  }, [serverActionGroups]);

  useEffect(() => {
    if (initialTabs) {
      dispatch(teamActions.setEventTabs(initialTabs));
    }
  }, [initialTabs, dispatch]);

  const handleCheckEvent = (
    checked,
    id,
    option_id,
  ) => {
    dispatch(teamActions.toggleCheckEvent({
      checked,
      id,
      option_id,
    }));
  };

  const content = useMemo(() => {
    const tabIndex = tabs.findIndex((tab) => tab.id === activeTab);
    const options = tabIndex >= 0 ? tabs?.[tabIndex]?.options : [];

    if (options?.length > 0) {
      return (
        <>
          {options.map((option) => (
            <div key={option.id}>
              <span>{l(option.lexic) || option.label}</span>
              <CheckBox
                checked={option.checked}
                onChange={(value) => handleCheckEvent(
                  value,
                  tabs[tabIndex].id,
                  option.id,
                )}
              />
            </div>
          ))}
        </>
      );
    }
    return <div>{l(25)}</div>;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, tabs]);

  const handleChangeTab = (id) => {
    dispatch(teamActions.setActiveTab(id));
  };

  return (
    <div className={cls.eventsSelectorContainer}>
      <div className={cls.eventsTabs}>
        {tabs.map((tab) => (
          <div
            key={tab.id}
            onClick={() => handleChangeTab(tab.id)}
            className={`${cls.tab}${
              activeTab === tab.id ? ` ${cls.activeTab}` : ''
            }`}
          >
            {l(tab.lexic_id) || tab.label}
          </div>
        ))}
      </div>
      <div className={cls.eventsContent}>
        <h3>{l(9)}</h3>
        <div className={cls.eventsList}>{content}</div>
      </div>
    </div>
  );
};
